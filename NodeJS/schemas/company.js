import mongoose from 'mongoose';
// schema
const { Schema } = mongoose;
const companySchema = new Schema(
    {
        CID: {
            // CID : 부동산 등록번호
            type: String,
            unique: true,
            required: [true, 'CID is Required!'],
        },
        ID: {
            // ID : 아이디
            type: String,
            unique: true,
            required: [true, 'ID is Required!'],
        },
        PW: {
            // PW : 패스워드
            type: String,
            required: [true, 'PW is Required!'],
        },
        NM: {
            // Name : 대표 명
            type: String,
            required: [true, 'Name is Required!'],
        },
        ADR: {
            // Address : 부동산 주소
            type: String,
            required: [true, 'Address is required!'],
        },
        PN: {
            // PhoneNumber : 휴대전화 번호
            type: String,
            required: [true, 'PhoneNumber is required!'],
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
    { collection: 'company' }
);

export const model = mongoose.model('company', companySchema, 'company');
