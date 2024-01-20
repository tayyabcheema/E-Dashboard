const mongoose= require('mongoose')
const ProductSchema= new mongoose.Schema({
    name:String,
    price:String,
    category:String,
    userId:String, // mongoose.Schema.Types.ObjectId,
    brand:String
});

module.exports= mongoose.model('Product', ProductSchema);