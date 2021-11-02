import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

//routes
import postRouter from './routes/post.js';
const app = express();

dotenv.config();
// console.log(bodyParser.json)
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb', extended: true }));
app.use(cors());

const CONNECT_URL = process.env.DB_CONNECTION;
const PORT = process.env.PORT || 5000;
mongoose.connect(CONNECT_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
  // useFindAndModify: false,}
});
const connection = mongoose.connection;

connection.once('open', function () {
  console.log('MongoDB database connection established successfully');
});
app.use('/posts', postRouter);
app.get('/', (req, res) => {
  res.send('HElLO HEROKU API MEMORIES');
});
app.listen(PORT);
