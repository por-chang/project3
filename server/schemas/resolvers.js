const { AuthenticationError } = require("apollo-server-express");
const { User, Bark } = require("../models");
const { signToken } = require("../utils/auth");
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

const resolvers = {
  Query: {
    user: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(_id).populate('barks' );

        return user;
      }

      throw new AuthenticationError("Not logged in");
    },
    users: async (parent, args, context) => {
      if (context.user) {
        const users = await User.find({}).populate(
          "barks"
        );
        return users;
      }
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('barks');
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    bark: async (parent, { _id }, context) => {
      if (context.user) {
        const bark = await Bark.findById(_id);

        return bark;
      }

      throw new AuthenticationError("Not logged in");
    },
    barks: async (parent, args, context) => {
      if (context.user) {
        const barks = await Bark.find({});
        return barks;
      }
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    createBark: async (parent, args, context) => {
      if (context.user) {
        const bark = await Bark.create({
          ...args,
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $push: { barks: bark._id },
          },
          {
            new: true,
          }
        );
        return bark;
      }

      throw new AuthenticationError("Not logged in");
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError("Not logged in");
    },
    deleteUser: async (parent, args, context) => {
      return User.findOneAndDelete({_id: context.user._id} );
    },
    deleteBark: async (parent, { id }, context) => {
      if(context.user){
      const removeBark = await User.findOneAndUpdate(
        { _id: context.user._id},
        { $pull: { 
          barks: {
            id,
          },
         },
        },
        { new: true }

      );
      return removeBark;
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
  },
};

module.exports = resolvers;
