import AstraChannel from "../Models/AstraChannel.js";



const astraChannelController = {
getAllChannels: async (request, response, next) => {
let channels;
let error = null;
let success= true;
try {
    channels = await AstraChannel.find();
    response.status(201).json({
        response: channels
    })
    } catch (error) {
    response.status(500).json({ error})
     }
    },

 getOneChannel: async (request, response, next) => {
    console.log(request.params);
    const {id}= request.params;
    console.log(id);
    let channel;
    let error = null;
    let success= true;
    try {
      channel = await AstraChannel.findById({_id:id});
    } catch (e) {
        console.log(e);
        success = false;
        error = e;
    }
    response.json(
        {
            response: channel,
            success,
            error


        }
    );

},

createChannel: async (request, response, next) => { try {
    const channel = await AstraChannel.create(request.body);
    response.status(201).json({
        response: channel
    })} catch (err) {
        response.status(500).json({ error: err })
    }
},

updateChannel: async (request, response, next) => { 
    const { id } = request.params;
    let channel;
    let error = null;
    let success= true;
    try {
        channel = await AstraChannel.findByIdAndUpdate({_id: id}, request.body, { new: true });
    } catch (e) {
        console.log(e);
        success = false;
        error = e;
    }
    response.json(
        {
            response: channel,
            success,
            error
        }
    );

},

deleteChannel: async (request, response, next) => {
    const { id } = request.params;
    let channel;
    let error = null;
    let success= true;
   
   try{
    channel= await AstraChannel.findOneAndDelete({_id: id});
    response.json({response: channel, success: true});
   }catch (e) {
  console.log(e);
  success= false;
  error=e;
  next(e);
    }
}
}

export default astraChannelController;