//get /update//delet//post
//api route
const router = require("express").Router();
const {
	getAllUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
	addFriend,
	removeFriend,
    // /api/users
    // /api/users/<id>
    // /api/users/<userId>/friends
} = require("../../controllers/user-controller");
router.route("/")
	.get(getAllUsers)
	.post(createUser);
router.route("/:id")
	.get(getUserById)
	.put(updateUser)
	.delete(deleteUser);
router.route("/:userId/friends/:friendId")
	.post(addFriend)
	.delete(removeFriend);


module.exports = router;