const { User, Thought } = require('../models');

module.exports = {
    getUser(req, res) {
        User.find()
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) {
        User.findOne({ __id: req.params.userId })
            .select('__v')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No such user exists' })
                    : Thought.findOneAndDelete({ _id: {$in: user.thought } })
                )
                .then((user) =>
                    !user
                        ? res.status(404).json({ message: 'User deleted, but no thoughts found' })
                        : res.json({ message: 'User successfully deleted' })
                )
                .catch((err) => {
                    console.log(err);
                    res.status(500).json(err);
                });
    },
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res
                        .status(404)
                        .json({ message: 'No user found with that ID' })
                    : res.json(user)
            )
            .catch ((err) => res.status(500).json(err));
    },
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { reaction: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true}
        )
            .then ((user) =>
                !user
                    ? res
                        .status(404)
                        .json({ message: 'No user found with that ID'})
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
};