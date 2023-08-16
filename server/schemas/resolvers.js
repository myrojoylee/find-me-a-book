const { User } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user };
    },

    saveBook: async (parent, { bookToSave }, context) => {
      if (context.user) {
        const result = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { savedBooks: bookToSave } },
          {
            new: true,
            runValidators: true,
          }
        );
        console.log(context);
        return await User.findOne({ id: context.user._id }).populate(
          "savedBooks"
        );
      }

      throw AuthenticationError;
    },

    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const result = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $pull: {
              savedBooks: { bookId },
            },
          },
          { new: true }
        );
        return await User.findOne({ id: context.user._id }).populate(
          "savedBooks"
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
