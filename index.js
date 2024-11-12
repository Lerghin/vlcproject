// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cors from 'cors';
import errorHandler from './Middleware/errorHandler';
import notFoundHandler from './Middleware/notFoundHandler';

dotenv.config(); 


const app = express();

// Middleware
app.use(express.json()); 
app.use(cors()); 
app.use('/api', (req, res, next) =>{
console.log("you have done a request", req.url, res.url, 'time: ', newDate().toLocaleString());
next();
}, indexeRouter, errorHandler
)

app.get('/', (req, res, next) =>{
  response.send('Welcomo to server /')
})

app.use(errorHandler)
app.use(notFoundHandler)

// Configurar el puerto
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
