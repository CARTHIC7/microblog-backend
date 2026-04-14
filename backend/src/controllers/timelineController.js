import redis from '../config/redis.js';
import Follow from '../models/Follow.js';
import Post from '../models/Post.js';

export const getTimeline = async (req, res) => {
    try {
        const userId = req.user;

        const feedKey = `feed:${userId}`;

        // 🔥 STEP 1: Try Redis feed (push model)
        const feedData = await redis.lrange(feedKey, 0, 50);

        if (feedData.length > 0) {
            console.log("Serving from Redis FEED ⚡");
            return res.json(feedData.map(p => JSON.parse(p)));
        }

        // 🔥 STEP 2: Fallback (your old logic)
        console.log("Fallback to DB 🐢");

        const following = await Follow.find({ follower: userId }).select('following');
        const followingIds = following.map(f => f.following);
        followingIds.push(userId);

        const posts = await Post.find({
            user: { $in: followingIds }
        }).sort({ createdAt: -1 });

        // 🔥 OPTIONAL: store in cache (backup)
        await redis.set(`timeline:${userId}`, JSON.stringify(posts), 'EX', 60);

        res.json(posts);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};  