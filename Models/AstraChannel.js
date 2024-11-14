import { Schema, model } from "mongoose";

const astraChannelSchema= Schema({
   url: {type: String, required: true},
   name: { type: String, required: true},
   
},
{
    timestamps: true,
})
const AstraChannel=model('astraChannel',astraChannelSchema);
export default AstraChannel;