import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY || '';

export const authenticateToken = ({ req }) => {
    const token = req.headers.authorization?.split(' ')[1];
    const { operationName } = req.body;

    // Allow public access to addUser and login operations
    if (operationName === 'addUser' || operationName === 'login') {
        return req;
    }

    if (!token) {
        throw new GraphQLError('No token provided');
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
    }

    catch (err) {
        console.error(err);
        throw new GraphQLError('Invalid or expired token');
    }
    
    return req;
};

export const signToken = (username, email, _id) => {
    const payload = { username, email, _id };
    return jwt.sign(payload, secretKey, { expiresIn: '24h' });
};

export class AuthenticationError extends GraphQLError {
    constructor(message) {
        const options = {
            extensions: { code: 'UNAUTHENTICATED' },
        };
        super(message, options);
        Object.defineProperty(this, 'name', { value: 'AuthenticationError' });
    }
};