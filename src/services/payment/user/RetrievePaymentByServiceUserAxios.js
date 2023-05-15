import {AdverAxios} from "../../../common/Axios";

const ACTION_URL = '/payments/ADVERTISE/';
const LIST = '/list'

/**
 * 특정 유저 결제 정보 요청
 * @returns {Promise<null>}
 */
export async function paymentListRequest( userId, param ) {
    let returnVal = null;
    await AdverAxios('POST', ACTION_URL + userId + LIST , param)
        .then((response) => {
            if (response.responseCode.statusCode === 200) {
                returnVal = response.data
            } else {
                returnVal = null
            }
        }).catch((e) => returnVal = null)
    return returnVal;
}