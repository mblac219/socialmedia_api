const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  removeUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getAllUsers).post(createUser);

// /api/users/:userId
router
  .route('/:userId')
  .get(getUserById)
  .put(updateUser)
  .delete(removeUser);

// /api/user/:userId/friend
router.route('/:userId/friend').post(addFriend);

// /api/user/:userId/fiend/:friendId
router.route('/:userId/friend/:friendId').delete(removeFriend);

module.exports = router;
