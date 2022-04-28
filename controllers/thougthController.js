const { Thought, User } = require('../models');

module.exports = {
  // Function to get all of the Thoughts by invoking the find() method with no arguments.
  // Then we return the results as JSON, and catch any errors. Errors are sent as JSON with a message and a 500 status code
  getAllThoughts(req, res) {
    User.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Gets a single Thought using the findOneAndUpdate method. We pass in the ID of the Thought and then respond with it, or an error if not found
  getThoughtById(req, res) {
    User.findOne({ _id: req.params.thoughtId })
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: 'No Thought with that ID' })
          : res.json(thoughts)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Creates a new Thought. 
  createThought(req, res) {
    Thought.create(req.body)
      .then((thoughts) => {
        return Thought.findOneAndUpdate(
          { _id: req.body.thoughId },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({
              message: 'Thought created, but found no user with that ID',
            })
          : res.json('Created the Thought 🎉')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Updates and Thought using the findOneAndUpdate method. Uses the ID, and the $set operator in mongodb to inject the request body. Enforces validation.
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: 'No Thought with this id!' })
          : res.json(thoughts)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Deletes an Thought from the database. 
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: 'No Thought with this id!' })
          : Thought.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { Thoughts: req.params.ThoughtId } },
              { new: true }
            )
      )
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({
              message: 'Thought created but no user with this id!',
            })
          : res.json({ message: 'Thought successfully deleted!' })
      )
      .catch((err) => res.status(500).json(err));
  },
  // Adds a reaction to an Thought. 
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reaction: req.body } },
      { runValidators: true, new: true }
    )
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: 'No Thought with this id!' })
          : res.json(thoughts)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove Thought's Reaction.
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reaction: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: 'No Thought with this id!' })
          : res.json(thoughts)
      )
      .catch((err) => res.status(500).json(err));
  },
};
