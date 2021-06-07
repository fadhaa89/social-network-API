// const { Thought, User } = require("../models/");
// module.exports = thoughtController;
const { Thought, User } = require("../models/");

const thoughtController = {
	//req and res to get all thoughts
    //res.json(dbThoughtData))
	getAllThoughts(req, res) {
		Thought.find({})
			.select("-__v")
			.sort({ _id: -1 })
			.then((dbThoughtData) => res.json(dbThoughtData))
			.catch((err) => {
				console.log(err);
                //res.status(404)
                //res.status(400)
				res.status(400).json(err);
			});
	},
	// params to get specific thought
	getThoughtById({ params }, res) {
		Thought.findOne({ _id: params.thoughtId })
			.select("-__v")
			.then((dbThoughtData) => {
				if (!dbThoughtData) {
                    //no thought found!!
					res.status(404).json({ message: "there is no thought found with this ID!" });
					return;
				}
				res.json(dbThoughtData);
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},
	// create a thought// (findOneAndUpdate)
	createThought({ params, body }, res) {
		Thought.create(body)
			.then(({ _id }) => {
				return User.findOneAndUpdate(
					{ _id: params.userId },
					{ $push: { thoughts: _id } },
					{ new: true }
				);
			})
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({ message: "No user found !!!" });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => res.json(err));
	},
	// -------update tne thought---//
	updateThought({ params, body }, res) {
		Thought.findOneAndUpdate({ _id: params.thoughtId }, body, {
			new: true,
			runValidators: true,
		})
			.then((dbThoughtData) => {
				if (!dbThoughtData) {
					res.status(404).json({ message: "No thought found!!!" });
					return;
				}
				res.json(dbThoughtData);
			})
			.catch((err) => res.status(400).json(err));
	},
	//--- delete thought---//
	deleteThought({ params }, res) {
		Thought.findOneAndDelete({ _id: params.thoughtId })
			.then((deletedThought) => {
				if (!deletedThought) {
					res.status(404).json({ message: "No thought found!!!" });
				}
				return User.findOneAndUpdate(
					{ _id: params.userId },
					{ $pull: { thoughts: params.thoughtId } },
					{ new: true }
				);
			})
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({ message: "No user found with this ID!" });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => res.json(err));
	},
	// add
	// addreaction({ params, body }, res ,req) {
	// 	Thought.findOneAndUpdate(
	// 		{ _id: params.thoughtId },
	// 		{ $push: { reactions: body } },
	addReaction({ params, body }, res) {
		Thought.findOneAndUpdate(
			{ _id: params.thoughtId },
			{ $push: { reactions: body } },
			{ new: true, runValidators: true }
		)
			.then((dbUserData) => {
				console.log("userdata: " , dbUserData);
				if (!dbUserData) {
					res.status(404).json({ message: "No user found with this ID!" });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => res.json(err));
	},
	// delet a reaction
//     deletReaction({ params }, res) {
// 		Thought.findOneAndUpdate(
// 			{ _id: params.thoughtId },
// 			{ $pull: { reactions: { reactionId: params.reactionId } } },
// 		)
// 			.catch((err) => res.json(err));
// 	},
// };
    
	removeReaction({ params }, res) {
		Thought.findOneAndUpdate(
			{ _id: params.thoughtId },
			{ $pull: { reactions: { reactionId: params.reactionId } } },
			{ new: true }
		)
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => res.json(err));
	},
};

module.exports = thoughtController;