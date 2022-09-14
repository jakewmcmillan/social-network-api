const { createPromptModule } = require('inquirer');

module.exports = {
    getThought(req, res) {
        Thought.find()
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('__v')
            .then((Thought) => 
                !Thought
                    ? res.status(404).json({ message: 'No thought with this ID'})
                    : res.json(thought)

            )
            .catch((err) => res.status(500).json(err));
    },
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => res.json(thought))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err)
            });
    },
    deleteThought(req, res) {
        Thought.findOneAndDelete({ __id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : User.deleteMany({ __id: { $in: thought.user } })
            )
            .then(() => res.json({ message: 'Thought and user deleted!' }))
            .catch((err) => res.status(500).json(err));
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { __id: req.params.ThoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought with this ID!"})
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    createReaction(req, res) {
        Reaction.create(req.body)
            .then((reaction) => res.json(reaction))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err)
            });
    },
    deleteReaction(req, res) {
        Reaction.findOneAndDelete({ __id: req.params.reactionId })
            .then((reaction) =>
                !reaction
                    ? res.status(404).json({ message: 'No reaction with that ID!' })
                    : User.deleteMany({ __id: { $in: thought.reaction} })
            )
            .then(() => res.json({ message: 'Reaction and user deleted!' }))
            .catch((err) => res.status(500).json(err));
    },
};