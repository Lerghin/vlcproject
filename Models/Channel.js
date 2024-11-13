import { Schema, model } from "mongoose";

const channelSchema= Schema({
   url: {type: String, required: true},
   name: { type: String, required: true},
   
},
{
    timestamps: true,
})
const Channel=model('channel',channelSchema);
export default Channel;