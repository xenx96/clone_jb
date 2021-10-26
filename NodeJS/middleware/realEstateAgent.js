import axios from "axios";

const getDataURL = (boss, companyName) => {
  let url = `http://openapi.nsdi.go.kr/nsdi/EstateBrkpgService/attr/getEBBrokerInfo?ldCode=&
    bsnmCmpnm=${companyName}&
    brkrNm=${boss}&
    format=json&
    numOfRows=10&
    pageNo=1`;

  return url;
};

export const getDataRealEstate = async (boss, companyName) => {
  let url = getDataURL(boss, companyName);
  try {
    let res = await axios.get(url);
    console.log(res.data);
    return res.data;
  } catch (e) {
    return e;
  }
};
