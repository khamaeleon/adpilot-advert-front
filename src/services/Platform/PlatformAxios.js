import {AdminAxios} from "../../common/Axios";

const PRODUCT = '/adver/product'

/**
 * 상품 관리
 * @returns {Promise<null>}
 */
export async function retrieveProduct(searchCondition) {
  let returnVal = null;
  await AdminAxios('POST', PRODUCT, searchCondition)
    .then((response) => {
      const { data, statusCode, message } = response;
      if(statusCode === 200) {
        returnVal = data;
      }else{
        returnVal = null;
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}