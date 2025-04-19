import { Plant, User } from "../models/index.js";
import { signToken, AuthenticationError } from "../utils/auth.js";

const resolvers = {
  Query: {
    users: async () => {
      return User.find().select("-password -email").exec();
    },
    searchUsers: async (parent, { username }) => {
      try {
        console.log("Searching for users with username:", username); // Debug log
        const users = await User.find({
          username: { $regex: username, $options: "i" },
        });
        console.log("Found users:", users); // Debug log
        return users;
      } catch (err) {
        console.error("Error searching users:", err);
        throw new Error("Failed to search users");
      }
    },
    user: async (_parent, { username }) => {
      return User.findOne({ username }).select("-password -email").exec();
    },

    // Query to get the authenticated user's information
    // The 'me' query relies on the context to check if the user is authenticated
    me: async (_parent, _args, context) => {
      // If the user is authenticated, find and return the user's information
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('garden');
      }
      // If the user is not authenticated, throw an AuthenticationError
      throw new AuthenticationError("Could not authenticate user.");
    },
  },

  Mutation: {
    addUser: async (_parent, { input }) => {
      // Create a new user with the provided username, email, and password
      const user = await User.create({ ...input });
      const garden = await Garden.create({ userId: user._id });
      user.findByIdAndUpdate(userId, { garden });
      // Sign a token with the user's information
      const token = signToken(user.username, user.email, user._id);
      // Return the token and the user
      return { token, user };
    },
    login: async (_parent, { email, password }) => {
      // Find a user with the provided email
      const user = await User.findOne({ email });
      // If no user is found, throw an AuthenticationError
      if (!user) {
        throw new AuthenticationError("Could not authenticate user.");
      }
      // Check if the provided password is correct
      const correctPw = await user.isCorrectPassword(password);
      // If the password is incorrect, throw an AuthenticationError
      if (!correctPw) {
        throw new AuthenticationError("Could not authenticate user.");
      }
      // Sign a token with the user's information
      const token = signToken(user.username, user.email, user._id);
      // Return the token and the user
      return { token, user };
    },

    // Create a new garden for a user
    updateGarden: async (_parent, { userId, plants }) => {
      const updatedGarden = [];

      // for each plant, update the plant and
      // create the plant in the database if it doesn't exist already:
      for (const plant of plants) {
        const newPlant = await Plant.findOneAndUpdate(
          { plantApiId: plant.plantApiId },
          { ...plant },
          { upsert: true, new: true }
        );

        // add the created plant to the update
        // list for the User document:
        updatedGarden.push(newPlant);
      }

      // Optionally update the user with this new garden reference
      const updatedUser = await User.findByIdAndUpdate(userId, {
        garden: updatedGarden, // note that mongoose only adds the ObjectIds
      });

      return updatedUser;
    },

    addFriend: async (_parent, { friendId }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $addToSet: { friends: friendId } },
          { new: true }
        ).populate("friends");

        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    removeFriend: async (_parent, { friendId }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $pull: { friends: friendId } },
          { new: true }
        ).populate("friends");

        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

export default resolvers;
