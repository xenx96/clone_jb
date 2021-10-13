const mongoose = require('mongoose');

// schema
const { Schema } = mongoose;
const userSchema = new Schema(
    {
        ID: {
            // ID : 이메일 혹은 ID
            type: String,
            unique: true,
            required: [true, 'ID is Required!'],
        },
        PW: {
            // PW : 비밀번호
            type: String,
            required: [true, 'PW is Required!'],
        },
        OA: {
            // OAuth : 플랫폼Oauth (0 =  직접, 1 = 카카오톡, 2 = 페이스북, 3 = 구글)
            type: String,
            required: [true, 'OAuth is required!'],
        },
        CA: {
            // CreateAt : 생성일자
            type: Date,
            required: [true, 'CreateAt is required!'],
            default: Date.now(),
        },
        UA: {
            // UpdateAt : 수정일자
            type: Date,
        },
    },
    { collection: 'user' }
);

module.exports = mongoose.model('user', userSchema, 'user');
