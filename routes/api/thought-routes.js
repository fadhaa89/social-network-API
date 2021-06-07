const router = require("express").Router();
const {
	getAllThoughts,
	getThoughtById,
	createThought,
	updateThought,
	deleteThought,
	addReaction,
	removeReaction,
} = require("../../controllers/thought-controller");


// api/thoughts ////// get allthoughts
//get
router.route("/")
	.get(getAllThoughts);

// api/thoughts ///////to get and update thought by id
router.route("/:thoughtId")
	.get(getThoughtById)
	.put(updateThought);

// api/thoughts /////////////creatThought
//post
router.route("/:userId")
	.post(createThought);

// /api/thoughts /////////////deletThought
//delet
router.route("/:userId/:thoughtId")
	.delete(deleteThought);

// /api/thoughts the ID for reactions
//post
router.route("/:thoughtId/reactions")
	.post(addReaction)

// /api/thoughts ///////////removeReaction/thoughtId
//delet
router.route("/:thoughtId/reactions/:reactionId")
	.delete(removeReaction);


module.exports = router;