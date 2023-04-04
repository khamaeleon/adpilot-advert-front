import {AdminAxios} from "../../common/Axios";

const PRODUCT = '/product'

/**
 * 상품 관리
 * @returns {Promise<null>}
 */
export async function retrieveProduct(searchCondition) {
  let returnVal = null;
  await AdminAxios('POST', PRODUCT, searchCondition)
    .then((response) => {
      const {responseCode, data} = response
      if (responseCode.statusCode === 200) {
        returnVal = data
      } else {
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}