const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');
const connectDB = require('./config/db');
const contactRoutes = require('./routes/contactRoutes');
// Import Models for seeding
const StudyGroup = require('./models/StudyGroup');

// Connect to Database and Seed initial data
const startServer = async () => {
  await connectDB();
  await StudyGroup.seed();
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
const studyGroupRoutes = require('./routes/studyGroupRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes'); // This will now work
const aiRoutes = require('./routes/aiRoutes');

app.use('/api/tasks', taskRoutes);
app.use('/api/studyplan', studyPlanRoutes);
app.use('/api/groups', studyGroupRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/contact', contactRoutes);
// Start the Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});