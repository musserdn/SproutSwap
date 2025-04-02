import express from 'express';
import path from 'node:path';
import db from './config/connection.js';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './schemas/index.js';
import { authenticateToken } from './utils/auth.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = new ApolloServer({
    typeDefs,
    resolvers
});

const PERENUAL_API_KEY = process.env.PERENUAL_API_KEY;
const PERENUAL_BASE_URL = 'https://perenual.com/api/v2';

const fetchFromPerenual = async (endpoint, params = {}) => {
    const queryParams = new URLSearchParams({ key: PERENUAL_API_KEY, ...params });
    const url = `${PERENUAL_BASE_URL}${endpoint}?${queryParams}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Perenual API error: ${response.statusText}`);
    }
    return response.json();
};

const startApolloServer = async () => {
    await server.start();
    await db();

    const PORT = process.env.PORT || 3001;
    const app = express();

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.use('/graphql', expressMiddleware(server, {
        context: authenticateToken
    }));

    app.get('/api/species-list', async (req, res) => {
        try {
            const data = await fetchFromPerenual('/species-list', req.query);
            res.json(data);
        } catch (error) {
            console.error('Error fetching species list:', error);
            res.status(500).json({ error: 'Failed to fetch species list' });
        }
    });

    app.get('/api/species/details/:id', async (req, res) => {
        const { id } = req.params; // Extract the plant ID from the path parameter
        try {
            const data = await fetchFromPerenual(`/species/details/${id}`);
            res.json(data);
        } catch (error) {
            console.error('Error fetching plant details:', error);
            res.status(500).json({ error: 'Failed to fetch plant details' });
        }
    });

    // REST API route for plant care guides
    app.get('/api/species-care-guide-list', async (req, res) => {
        try {
            // Use the fetchFromPerenual helper to make the API request
            const data = await fetchFromPerenual('/species-care-guide-list', req.query);
            res.json(data); // Return the data to the client
        } catch (error) {
            console.error('Error fetching plant care guides:', error);
            res.status(500).json({ error: 'Failed to fetch plant care guides' });
        }
    });

    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../../client/dist')));

        app.get('*', (_req, res) => {
            res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
        });
    }

    app.listen(PORT, () => {
        console.log(`API server running at http://localhost:${PORT}/api/`);
        console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
};

startApolloServer();
