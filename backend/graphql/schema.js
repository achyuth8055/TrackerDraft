const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLNonNull } = require('graphql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// User Type
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    token: { type: GraphQLString }, // We'll generate and send a token
  }),
});

// Root Query (for fetching data, e.g., get current user)
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // This is a placeholder for a query that might get the logged-in user's data
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return User.findById(args.id);
            }
        }
    }
});

// Mutations (for creating/updating/deleting data)
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
        // Check if user already exists
        const existingUser = await User.findOne({ email: args.email });
        if (existingUser) {
          throw new Error('User already exists with that email.');
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(args.password, salt);

        const user = new User({
          name: args.name,
          email: args.email,
          password: hashedPassword,
        });

        const savedUser = await user.save();

        // Create JWT
        const token = jwt.sign({ id: savedUser.id }, process.env.JWT_SECRET, {
          expiresIn: '30d',
        });

        return {
            id: savedUser.id,
            name: savedUser.name,
            email: savedUser.email,
            token,
        };
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
                throw new Error('Invalid credentials');
            }

            const isMatch = await bcrypt.compare(args.password, user.password);
            if (!isMatch) {
                throw new Error('Invalid credentials');
            }

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: '30d',
            });

            return {
                id: user.id,
                name: user.name,
                email: user.email,
                token,
            };
        }
    }
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});