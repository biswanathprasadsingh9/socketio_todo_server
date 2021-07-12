const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSocketSchema = new Schema({
  status:{
    type:Boolean,
    default:false
  },
  name:{
    type:String
  },
  subject:{
    type:String
  },
  message:{
    type:String
  }
},{timestamps:true})

const TodoSocket = mongoose.model('TodoSocket',TodoSocketSchema);
module.exports=TodoSocket;
