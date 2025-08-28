const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLNonNull } = require('graphql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const StudyGroup = require('../models/StudyGroup'); // <-- Import StudyGroup model
const { appendToSheet } = require('../services/googleSheetsService');

// User Type
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    token: { type: GraphQLString },
  }),
});

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return User.findById(args.id);
            }
        }
    }
});

// Mutations
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // Register User
    register: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const existingUser = await User.findOne({ email: args.email });
        if (existingUser) {
          throw new Error('User already exists with that email.');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(args.password, salt);

        const user = new User({
          name: args.name,
          email: args.email,
          password: hashedPassword,
        });

        const savedUser = await user.save();

        // --- ADDED LOGIC ---
        // Automatically add the new user to the "GrowTogether" group
        try {
            const defaultGroup = await StudyGroup.findOne({ name: 'GrowTogether' });
            if (defaultGroup) {
                defaultGroup.members.push(savedUser._id);
                await defaultGroup.save();
            }
        } catch (error) {
            console.error("Failed to add user to default group:", error);
        }
        // --- END OF ADDED LOGIC ---
        
        const token = jwt.sign({ id: savedUser.id }, process.env.JWT_SECRET, {
          expiresIn: '30d',
        });
        
        appendToSheet(savedUser.name);

        return { id: savedUser.id, name: savedUser.name, email: savedUser.email, token };
      },
    },
    // Login User
    login: {
        type: UserType,
        args: {
            email: { type: new GraphQLNonNull(GraphQLString) },
            password: { type: new GraphQLNonNull(GraphQLString) },
        },
        async resolve(parent, args) {
            const user = await User.findOne({ email: args.email }).select('+password');
            if (!user) {
                throw new Error('No user found with this email.');
            }

            const isMatch = await bcrypt.compare(args.password, user.password);
            if (!isMatch) {
                throw new Error('Password incorrect.');
            }

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: '30d',
            });
            
            return { id: user.id, name: user.name, email: user.email, token };
        }
    }
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});