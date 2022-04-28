const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  removeThought,
  addReaction,
  removeReaction
} = require('../../controllers/thougthController');

// /api/thoughts
router.route('/').get(getAllThoughts).post(createThought);

// /api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getThoughtById)
  .put(updateThought)
  .delete(removeThought)

// /api/thought/:thoughtId/reaction
router.route('/:thoughtId/reactions').post(addReaction);

// /api/thought/:thoughtId/reaction/:reactionId
router.route('/:thoughtId/reaction/:reactionId').delete(removeReaction);

module.exports = router;
