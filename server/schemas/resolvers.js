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
    metricById: async (parent, args, context) => {
      try {
        const metric = await Metrics.findById(args.metricId);
        return metric;
      } catch (err) {
        console.log("Error in metric Resolver:", err);
      }
    },
    metrics: async () => {
      try {
        const metrics = await Metrics.find();
        return metrics;
      } catch (err) {
        console.log("Error in metrics Resolver:", err);
      }
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
    addMetric: async (_, { name, labels, values }) => {
      try {
        const metric = await Metrics.create({ name, labels, values });
        return metric;
      } catch (err) {
        console.log("Error in addMetric Resolver:", err);
      }
    },
  },
};

module.exports = resolvers;
