const { User, Friends, Thoughts } = require("../models");
const userController = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
      const userId = req.params.userId;
      const getSingleUser = await User.findOne({
        _id: userId,
      })
    .populate("thoughts")
    if (!getSingleUser) {
      return res.status(404).json({ message: 'No user with this id!' });
    }
      res.status(200).json(getSingleUser);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async createUser(req, res) {
    try {
      const newUser = await User.create(req.body);
      res.status(201).json(newUser);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async createFriend(req, res) {
    try {
      const userId = req.params.userId;
      const friendId = req.params.friendId;
      const user = await User.findOne({_id: userId});
      const friend = await User.findOne({_id: friendId})
      if(!user || !friend ){
        res.status(404).json("user or friend not found")
      }
     await User.findByIdAndUpdate(userId, {$push: {friends: friendId}});
     await User.findByIdAndUpdate(friendId, {$push: {friends: userId}});
     res.status(200).json("friend created")
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }
      res.json(user)

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async deleteFriend(req, res) {
    try {
      const userId = req.params.userId;
      const friendId = req.params.friendId;
      const user = await User.findOne({_id: userId});
      const friend = await User.findOne({_id: friendId})
      if(!user || !friend ){
        res.status(404).json("user or friend not found")
      }
      user.friends = user.friends.filter(x => x != friendId);
      friend.friends = friend.friends.filter(x => x != userId);
      await user.save();
      await friend.save();
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};

module.exports = userController;