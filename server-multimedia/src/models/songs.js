const {Schema,model} =require("mongoose");

const SongShema = new Schema({
    idfile:{type:String,required:true,unique:true},
    title:{type:String,required:true},
    genre:{type:Array},
    year:{type:String},
    album:{type:String},
    artist:{type:String},
    imageMusic:{type:String,default:""},
    imageAlbun:{type:String,default:""},
},{
    timestamps:true
});

module.exports = model("songs",SongShema)