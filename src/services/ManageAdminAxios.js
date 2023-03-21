import {AdminAxios} from "../common/Axios";

const ACTION_URL = '/admin';

const RESIST_ADMIN = ACTION_URL
const UPDATE_ADMIN = ACTION_URL
const LIST_ADMIN = ACTION_URL + '/list';
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
      if(response.responseCode.statusCode ===200){
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
  await AdminAxios('GET', INFO_ADMIN)
    .then((response) => {
      if(response.responseCode.statusCode ===200){
        returnVal = response.data
      }else{
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};


