import {AdminAxios} from "../../common/Axios";

const isInit = false;

const ACTION_URL = '/admin';
const UPDATE_ADMIN = ACTION_URL
const INFO_ADMIN = 'admin-user/me'

/**
 * 어드민 계정 수정
 * @param adminInfo
 * @returns {Promise<null>}
 */
export async function updateAdmin(adminInfo) {
  let returnVal = null;
  await AdminAxios('PUT', UPDATE_ADMIN, adminInfo)
    .then((response) => {
      const {data, statusCode} = response;
      if(statusCode ===200){
        returnVal = true
      }else{
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};


/**
 * 어드민 단건 조회
 * @param adminId
 * @returns {Promise<null>}
 */
export async function selAdminInfo() {
  let returnVal = null;
  if(isInit){
    return {
       id: "ytkim_advert",//          Admin id.
       email: "ytkim@adpilot.co.kr",//       email.
       name: "김용태",//        이름.
       phoneNumber: "01025308548",// 폰번호.
       role: "ADMIN",//        권한 (Admin).
       status: "Y",//      상태.
       createdAt: "20250808",//   생성 시간.
    }
  }
  await AdminAxios('GET', INFO_ADMIN)
    .then((response) => {
      const {data, statusCode} = response;
      if(statusCode ===200){
        returnVal = data
      }else{
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};


