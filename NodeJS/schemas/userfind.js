const mongoose = require('mongoose');

// schema
const { Schema } = mongoose;
const userfindSchema = new Schema({
    UID : {          // UserID : 유저 아이디
        type : String,
        required :[true,'UserID is Required!']
    },
    BK : {          // BuildingKind : 건물종류 (0 = APT, 1= BigCon, 2= OneCon, 3= OP, 4=BRoom)
        type : Number,
        required :[true,'BuildingKind is Required!']
    },
    BID : {          // BuildingID : 건물 아이디
        type : String,
        required :[true,'BuildingID is Required!']
    },
    LK: {          // Like : 찜하기 (T = 찜, F = 없음)
        type: Boolean,
        required: [true, 'Like is required!']
    },
    CA: {           // CreateAt : 첫조회일자
        type: Date,
        required: [true, 'CreateAt is required!'],
        default: Date.now()
    },
    UA: {           // UpdateAt : 재조회일자
        type: Date
    }
}, { collection: 'userfind' });

module.exports = mongoose.model('userfind', userfindSchema, 'userfind');