const { User, Thought } = require('../models');

module.exports = {
  // Function to get all of the Users by invoking the find() method with no arguments.
  // Then we return the results as JSON, and catch any errors. Errors are sent as JSON with a message and a 500 status code
  getAllUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Gets a single User using the findOneAndUpdate method. 
  getUserById(req, res) {
    User.findOne({ _id: req.params.userId })
      .then((users) =>
        !users
          ? res.status(404).json({ message: 'No User with that ID' })
          : res.json(users)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Creates a new User. 
  createUser(req, res) {
    User.create(req.body)
      .then((users) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { user: user._id } },
          { new: true }
        );
      })
      .then((users) =>
        !users
          ? res.status(404).json({
              message: 'User created, but found no user with that ID',
            })
          : res.json('Created the User 🎉')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Updates and User using the findOneAndUpdate method. Uses the ID, and the $set operator in mongodb to inject the request body. Enforces validation.
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((users) =>
        !users
          ? res.status(404).json({ message: 'No User with this id!' })
          : res.json(users)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Deletes an User from the database. 
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((users) =>
        !users
          ? res.status(404).json({ message: 'No User with this id!' })
          : User.findOneAndUpdate(
              { users: req.params.userId },
              { $pull: { users: req.params.userId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res.status(404).json({
              message: 'User created but no user with this id!',
            })
          : res.json({ message: 'User successfully deleted!' })
      )
      .catch((err) => res.status(500).json(err));
  },
  // Adds a friend to an User.
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friend: req.body } },
      { runValidators: true, new: true }
    )
      .then((users) =>
        !users
          ? res.status(404).json({ message: 'No User with this id!' })
          : res.json(users)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove User's Friend. 
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friend: { friendId: req.params.friendId } } },
      { runValidators: true, new: true }
    )
      .then((users) =>
        !users
          ? res.status(404).json({ message: 'No User with this id!' })
          : res.json(users)
      )
      .catch((err) => res.status(500).json(err));
  },
};
