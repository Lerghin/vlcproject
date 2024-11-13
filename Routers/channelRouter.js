import { Router } from "express";
import channelController from "../Contollers/channelController.js";  

const channelRouter = Router();


channelRouter.get('/', channelController.getAllChannels);
channelRouter.get('/:id', channelController.getOneChannel);
channelRouter.post('/', channelController.createChannel);
channelRouter.put('/:id', channelController.updateChannel);
channelRouter.delete('/:id', channelController.deleteChannel);

export default channelRouter;
