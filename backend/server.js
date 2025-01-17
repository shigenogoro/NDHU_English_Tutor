import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import userAuthRouter from './routes/auth.js';
import problemRouter from './routes/getProblem.js';

const app = express();
const PORT = process.env.PORT || 3000;

/**
 * Middleware
 */
app.use(cors());
app.use(bodyParser.json());
app.use('/auth', userAuthRouter)
app.use('/problems', problemRouter);

/**
 * Define Route for the root URL
 */

app.get('/', (req, res) => {
    res.status.send('<h1 style="text-align-center; margin-top: 50px;" >NDHU English Tutoring API</h1>');
})

// 404 Error
app.get('*', (req, res) => {
  res.status(404).send('404 Page Not Found');
})

/**
 * Start the server
 */
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
})