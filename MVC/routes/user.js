const express = require('express');
const {handleGetAllUsers,
  handleGetUserById,
  handleUpdateUerById,
  handleDeleteUerById,
  handleCreateNewUser} = require('../controllers/user')

const router = express.Router();

router.route("/")
.get(handleGetAllUsers)
.post(handleCreateNewUser);

router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUerById)
  .delete(handleDeleteUerById);

module.exports = router;