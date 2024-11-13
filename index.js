import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import errorHandler from './Middleware/errorHandler.js';
import notFoundHandler from './Middleware/notFoundHandler.js';
import indexRouter from './Routers/indexRouter.js';

// Initialize dotenv
dotenv.config();


const app = express();


app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Conectado a MongoDB');
})
.catch((error) => {
  console.error('Error al conectar a MongoDB:', error.message);
});

app.use('/api', (req, res, next) => {
    console.log("You have made a request:", req.url, 'Time:', new Date().toLocaleString());
    next();
});

app.use('/api', indexRouter); 


app.get('/', (req, res) => {
    res.send('Welcome to the server /');
});


app.use(errorHandler);  // Custom error handler
app.use(notFoundHandler);  // 404 handler for unknown routes

// Configure the server port
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
