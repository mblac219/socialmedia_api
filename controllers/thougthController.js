const { Tags, Post } = require('../models');

module.exports = {
    // get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .select('-__v')
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  //get one thought by id
  getThoughtById(req, res) {
    Tags.findOne({ _id: req.params.id })
      .select('-__v')
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: 'No tag with that ID' })
          : res.json(tag)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new tag
  createThought(req, res) {
    Thought.create(req.body)
      .then((thoughts) => {
        return Post.findOneAndUpdate(
          { _id: req.body.postId },
          { $addToSet: { tags: tag._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'Tag created, but found no post with that ID' })
          : res.json('Created the tag 🎉')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};
