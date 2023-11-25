import mongoose, { Schema } from "mongoose"


const  CartSchema  = new Schema({
    userId:{
        type:String,
        required:true
    },
    items:{
        type:Array,
        default : [],
    }
})

const cartModal = mongoose.model("cartItem",CartSchema);

export default cartModal;


