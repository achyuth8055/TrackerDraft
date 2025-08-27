const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');
const connectDB = require('./config/db');

// Import Models for seeding
const StudyGroup = require('./models/StudyGroup');

// Connect to Database and Seed initial data
const startServer = async () => {
  await connectDB();
  await StudyGroup.seed(); // Seed initial groups if the collection is empty
};
startServer();


const app = express();
const PORT = process.env.PORT || 5001;

// Middlewares
app.use(cors());
app.use(express.json());

// --- GraphQL Endpoint ---
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
}));


// --- REST API Routes ---
const taskRoutes = require('./routes/taskRoutes');
const studyPlanRoutes = require('./routes/studyPlanRoutes');
const studyGroupRoutes = require('./routes/studyGroupRoutes'); // <-- Import new routes

app.use('/api/tasks', taskRoutes);
app.use('/api/studyplan', studyPlanRoutes);
app.use('/api/groups', studyGroupRoutes); // <-- Use new routes


// Start the Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});