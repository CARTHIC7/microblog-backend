import { Worker } from 'bullmq';
import Follow from '../models/Follow.js';
import redis from '../config/redis.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);
console.log("MongoDB Connected (Worker)");

console.log("🔥 NEW WORKER CODE RUNNING");

const worker = new Worker(
    'postQueue',
    async job => {
        if (job.name === 'newPost') {
            const { userId, content, postId } = job.data;

            console.log("Processing job:", job.name);

            const followers = await Follow.find({ following: userId });

            console.log("Followers found:", followers.length);

            for (let f of followers) {
                const feedKey = `feed:${f.follower}`;

                await redis.lpush(
                    feedKey,
                    JSON.stringify({ postId, userId, content })
                );
            }

            console.log(`Updated feeds for ${followers.length} followers`);
        }
    },
    {
        connection: {
            host: '127.0.0.1',
            port: 6379
        }
    }
);