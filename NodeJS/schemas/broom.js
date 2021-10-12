const mongoose = require('mongoose');

// schema
const { Schema } = mongoose;
const broomSchema = new Schema({
    CID : {         // CID : 부동산 등록번호
        type : String,
        unique: true,
        required :[true,'CID is Required!']
    },
    NM : {          // Name : 상가 명 
        type : String,
        required :[true,'Name is Required!']
    },
    ADR: {          // Address : 상가 주소
        type: String,
        required: [true, 'Address is required!']
    },
    FL: {           // Floor : 층수 (0 = 저층, 1 = 중층, 2 = 고층)
        type: Number,
        required :[true,'Floor is Required!']
    },
    KD: {           // Kind : 거래종류 (0 = 매매, 1 = 전세, 2 = 월세)
        type: Number,
        required: [true, 'Kind is required!']
    },
    DOC: {          // Document : 설명
        type: String
    },
    SD: {           // Solded : 거래여부 (0 = N, 1 = Y)
        type: Number,
        required: [true, 'Solded is required!']
    },
    DP: {           // Deposit : 보증금 (매매/전세/월세 매매는 매매가)
        type: Number,
        required: [true, 'Deposit is required!']
    },
    PR: {           // Price : 월세가 (월세만)
        type: Number
    },
    CA: {           // CreateAt : 생성일자
        type: Date,
        required: [true, 'CreateAt is required!'],
        default: Date.now()
    },
    UA: {           // UpdateAt : 수정일자
        type: Date
    }
}, { collection: 'broom' });

module.exports = mongoose.model('broom', broomSchema, 'broom');