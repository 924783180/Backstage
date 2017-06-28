let mongoose = require('mongoose');
let url = require('./config').url;
mongoose.connect(url);
let UserSchema = new mongoose.Schema({
    notice:String,
    id:Number,
    h2:String,
    abstract:String,
    data:[
        {
            title:String,
            upContent:[
                {
                    subTitle:String,
                    content:[String],
                    demo:[String]
                }
            ]
        }
    ],
    date:String,
    name:String,
    number:String,
    type:String,

},{collection:'json'});
exports.Notice = mongoose.model('notice',UserSchema);

