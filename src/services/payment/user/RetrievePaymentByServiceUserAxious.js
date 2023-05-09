import {AdverAxios} from "../../../common/Axios";

const ACTION_URL = '/payments/ADVERTISE/';
const LIST = '/list'

/**
 * 결제 요청
 * @returns {Promise<null>}
 */
export async function paymentListRequest(skip, limit, userId, param ) {
    let returnVal = null;

    await AdverAxios('POST', ACTION_URL + userId + LIST + '?skip=' + skip + '&limit=' + limit , param)
        .then((response) => {
            if (response.responseCode.statusCode === 200) {
                returnVal = response.data
            } else {
                returnVal = null
            }
        }).catch((e) => returnVal = null)
    return returnVal;
}