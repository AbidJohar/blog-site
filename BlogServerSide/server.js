import dotenv from 'dotenv';
import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js';
import authRouter from './routes/auth.routes.js';
import blogRouter from './routes/blog.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//__________( Connect to MongoDB )________________
connectDB();


//___________( Middlewares )__________________
app.use(express.json());
app.use(cors());


//____________( main Routes )__________________
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/blogs', blogRouter);


// Health check
app.get('/', (_, res) => {
  res.json({ message: 'Blog API is running' });
});


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});