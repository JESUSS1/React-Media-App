import {Schema,model} from 'mongoose'

const PlayList = new Schema({
    songs:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'songs',
        }
    ]
})