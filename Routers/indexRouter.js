import { Router } from "express";
import channelRouter from "./channelRouter.js";  // Ensure path is correct

const indexRouter = Router();


indexRouter.get('/', (request, response, next) => {
    response.send('Welcome to my server /api');
});


indexRouter.use('/channels', channelRouter);

export default indexRouter;
