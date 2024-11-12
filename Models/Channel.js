import { Schema, model } from "mongoose";

const channelSchema= Schema({
   url: {type: String, required: true},
   status: { type: String, default:'active'},
   lastChecked: { type: Date, default: Date.now },


},
{
    timestamps: true,
})
const Channel=model('channel',channelSchema);
export default Channel;