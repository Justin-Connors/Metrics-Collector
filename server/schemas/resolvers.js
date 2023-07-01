const { AuthenticationError } = require("apollo-server-express");
const { User, Metrics } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        return user;
      }

      throw new AuthenticationError("Not logged in");
    },
    userById: async (parent, args, context) => {
      const user = await User.findById(args.userId).select("-email");
      return user;
    },
    metrics: async (parent, args) => {
      const result = await Metrics.find();
      return result;
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }
      throw new AuthenticationError("Not logged in");
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    addMetric: async (parent, args, context) => {
      if (context.user) {
        const result = await Metrics.create({
          ...args,
        });
        return result;
      }
      throw new AuthenticationError("Not logged in");
    },
  },
};

module.exports = resolvers;
