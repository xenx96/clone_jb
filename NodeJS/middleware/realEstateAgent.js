import axios from "axios";
import { NullExceptionError } from "./increaseError.js";

const API_KEY = "";

const getDataURL = (boss, companyName) => {
  let url = `http://openapi.nsdi.go.kr/nsdi/EstateBrkpgService/attr/getEBBrokerInfo?ldCode=&
    bsnmCmpnm=${companyName}&
    brkrNm=${boss}&
    format=json&
    numOfRows=10&
    pageNo=1`; //+API_KEY, 아직 미발급, 발급신청중.

  return url;
};

export const getDataRealEstate = async (boss, companyName) => {
  let url = getDataURL(boss, companyName);
  try {
    let res = await axios.get(url);
    await NullExceptionError(res);
    return res.data;
  } catch (e) {
    return e;
  }
};
