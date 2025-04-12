import { User, Garden, Plant } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js';

const resolvers = {
    Query: {
        users: async () => {
            return User.find().select("-password -email").exec();
        },
        user: async (_parent, { username }) => {
            return User.findOne({ username }).select("-password -email").exec();
        },

        // Query to get the authenticated user's information
        // The 'me' query relies on the context to check if the user is authenticated
        me: async (_parent, _args, context) => {
            // If the user is authenticated, find and return the user's information
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            }
            // If the user is not authenticated, throw an AuthenticationError
            throw new AuthenticationError('Could not authenticate user.');
        },

        // Get a specific garden by ID
        garden: async (_parent, { gardenId }) => {
            return Garden.findById(gardenId).populate('plants').populate('user');
        },

        // Get all gardens
        gardens: async () => {
            return Garden.find().populate('plants').populate('user');
        }
    },

    Mutation: {
        addUser: async (_parent, { input }) => {
            // Create a new user with the provided username, email, and password
            const user = await User.create({ ...input });
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
                throw new AuthenticationError('Could not authenticate user.');
            }
            // Check if the provided password is correct
            const correctPw = await user.isCorrectPassword(password);
            // If the password is incorrect, throw an AuthenticationError
            if (!correctPw) {
                throw new AuthenticationError('Could not authenticate user.');
            }
            // Sign a token with the user's information
            const token = signToken(user.username, user.email, user._id);
            // Return the token and the user
            return { token, user };
        },

        // Create a new garden for a user
        addGarden: async (_parent, { input }) => {
            const { userId, plantIds } = input;

            const garden = await Garden.create({
                user: userId,
                plants: plantIds || []
            });

            // Optionally update the user with this new garden reference
            await User.findByIdAndUpdate(userId, { garden: garden._id });

            return garden.populate('plants').populate('user');
        },

        // Add a plant to a garden
        addPlantToGarden: async (_parent, { gardenId, plantId }) => {
            const updatedGarden = await Garden.findByIdAndUpdate(
                gardenId,
                { $addToSet: { plants: plantId } },
                { new: true }
            ).populate('plants').populate('user');
            return updatedGarden;
        },

        // Remove a plant from a garden
        removePlantFromGarden: async (_parent, { gardenId, plantId }) => {
            const updatedGarden = await Garden.findByIdAndUpdate(
                gardenId,
                { $pull: { plants: plantId } },
                { new: true }
            ).populate('plants').populate('user');
            return updatedGarden;
        }
    }
};

export default resolvers;
