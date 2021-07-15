const User = require('../models/user');
const axios = require('axios');

const Query = {
  user: async (parent, args, { accessToken }, info) => {
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
    let user = await User.findOne({ lineId: line.userId });

    if (user.pictureUrl !== line.pictureUrl) {
      await User.findByIdAndUpdate(user.id, {
        pictureUrl: line.pictureUrl,
      });
    }

    return User.findOne({ lineId: line.userId });
  },
  users: async (parent, args, context, info) => {
    return User.find({});
  },
};

module.exports = Query;
