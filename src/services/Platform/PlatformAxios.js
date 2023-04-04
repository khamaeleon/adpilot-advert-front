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
      if (response.responseCode.statusCode === 200) {
        returnVal = response.data
      } else {
        returnVal = null
      }
    }).catch((e) => returnVal = false)
  return returnVal;
}