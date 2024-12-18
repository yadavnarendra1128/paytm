const mongoose = require("mongoose")
mongoose.connect(
  "mongodb+srv://123321yn:YygYIIOhkq6tyumO@cluster0.kwuo6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);
const userSchema = mongoose.Schema({
  firstName: {type:String, required:true},
  lastName: {type:String, required: true},
  password: { type: String, required: true }
});
const users = mongoose.model('users',userSchema);

module.exports={
    users:users
}