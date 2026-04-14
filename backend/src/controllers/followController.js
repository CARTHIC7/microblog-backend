import Follow from '../models/Follow.js';

export const followUser = async (req, res) => {
    try {
        const follow = await Follow.create({
            follower: req.user,
            following: req.params.id
        });

        res.json(follow);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};