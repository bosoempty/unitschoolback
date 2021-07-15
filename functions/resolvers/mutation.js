const axios = require('axios');
const User = require('../models/user');

const Mutation = {
  signinWithAccessToken: async (parent, { accessToken }, context, info) => {
    if (!accessToken) res.send({ message: 'No AccessToken' });

    let line;
    await axios
      .get('https://api.line.me/v2/profile', {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        line = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    // if (!line) {
    //   const data = {
    //     id: 'guess',
    //     firstName: '',
    //     lastName: '',
    //     email: '',
    //     phone: '',
    //     rank: '',
    //     position: '',
    //     serviceId: '',
    //     base: '',
    //     pictureUrl: '',
    //     state: 'guess',
    //   };
    //   return data;
    // }
    const user = await User.findOne({ lineId: line.userId });

    if (user) {
      if (user.pictureUrl !== line.pictureUrl) {
        await User.findByIdAndUpdate(user.id, {
          pictureUrl: line.pictureUrl,
        });
      }

      const updatedUser = await User.findById(user.id);
      return updatedUser;
    } else {
      const createUser = await User.create({
        id: 'guess',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        rank: '',
        position: '',
        serviceId: '',
        base: '',
        pictureUrl: line.pictureUrl,
        state: 'student0',
        lineId: line.userId,
      });
      return User.findById(createUser.id);
    }
  },
  register: async (
    parent,
    { firstName, lastName, email, phone, rank, position, base, serviceId },
    { accessToken },
    info
  ) => {
    if (!accessToken) throw new Error('Access Token is not defined');
    console.log(firstName);
    let line;
    await axios
      .get('https://api.line.me/v2/profile', {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        line = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    if (!line) throw new Error('Something wrong while calling Line Profile');

    await User.findOneAndUpdate(
      { lineId: line.userId },
      {
        firstName,
        lastName,
        email,
        phone,
        rank,
        position,
        serviceId,
        base,
        state: 'student1',
      }
    );
    const user = await User.findOne({ lineId: line.userId });
    return user;
  },
};

module.exports = Mutation;
