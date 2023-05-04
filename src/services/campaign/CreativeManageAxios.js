import {AdminAxios} from "../../common/Axios";

export async function findCreativeGroupList(keyword) {
  let returnVal = null;
  await AdminAxios('POST', `/adver/creative/list` ,keyword)
    .then((response) => {
      const { responseCode } = response
      if(responseCode.statusCode ===200){
        returnVal = responseCode.statusCode === 200 ? response.data : null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};

export async function retrieveCreativeByUserId(userId) {
  let returnVal = null;
  await AdminAxios('GET', `/adver/creative/${userId}` ,null)
    .then((response) => {
      const {responseCode} =response
      if(responseCode.statusCode ===200){
        returnVal = responseCode.statusCode === 200 ? response.data : null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};