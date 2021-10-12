const mongoose = require('mongoose');

// schema
const { Schema } = mongoose;
const sessiondbSchema = new Schema({
    LID : {          // LoginID : 로그인 아이디
        type : String,
        required :[true,'LoginID is Required!']
    },
    AT : {          // AccessToken : 접근 토큰 (Oauth 혹은 직접시 AccessToken 직접생성)
        type : String,
        unique: true,
        required :[true,'AccessToken is Required!']
    },
    AU : {          // Auth : 접근 권한 (0 = 유저, 1 = 부동산)
        type : Number,
        required :[true,'Auth is Required!']
    },
    CF: {          // Config : 로그인 수단 (0 = 직접, 1 = 카카오, 2 = 페이스북, 3 = 구글, 부동산은 0)
        type: Number,
        required: [true, 'Config is required!']
    },
    CA: {           // CreateAt : 첫 로그인 시간
        type: Date,
        required: [true, 'CreateAt is required!'],
        default: Date.now()
    },
    LC: {           // Last Connection : 마지막 접속 시간 (세션 조회시마다 LC Update)
        type: Date,
        required: [true, 'Last Connection is required!']
    }
}, { collection: 'sessiondb' });

module.exports = mongoose.model('sessiondb', sessiondbSchema, 'sessiondb');