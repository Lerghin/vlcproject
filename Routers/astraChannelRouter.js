import { Router } from "express";

import astraChannelController from "../Contollers/astraChannelController.js";

const astraChannelRouter = Router();


astraChannelRouter.get('/', astraChannelController.getAllChannels);
astraChannelRouter.get('/:id', astraChannelController.getOneChannel);
astraChannelRouter.post('/', astraChannelController.createChannel);
astraChannelRouter.put('/:id', astraChannelController.updateChannel);
astraChannelRouter.delete('/:id', astraChannelController.deleteChannel);

export default astraChannelRouter;
