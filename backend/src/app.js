import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/post.js';
import followRoutes from './routes/follow.js';
import timelineRoutes from './routes/timeline.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use('/follow', followRoutes);
app.use('/timeline', timelineRoutes);

app.get('/', (req, res) => {
    res.send('API running');
});

export default app;