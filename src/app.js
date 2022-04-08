import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './routes';
import './database';

// express app
const app = express();

// body parser configuration
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api', router);

// Error handling to catch 404
app.all('*', (_req, res) => {
  res.status(404).json({
    error: 'address Not found',
  });
});

export default app;
