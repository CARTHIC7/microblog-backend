import Post from '../models/Post.js';
import queue from '../jobs/queue.js';
import redis from '../config/redis.js';

export const createPost = async (req, res) => {
    try {
        const post = await Post.create({
            user: req.user,
            content: req.body.content
        });

        // add job
        await queue.add('newPost', {
            userId: req.user,
            content: req.body.content,
            postId: post._id
        });

        // clear cache
        await redis.del(`timeline:${req.user}`);

        res.status(201).json(post);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};