import {AdverAxios} from "../../../common/Axios";

const ACTION_URL = '/payments/ADVERTISE/payment-request';

/**
 * 결제 요청
 * @returns {Promise<null>}
 */
export async function paymentRequest( param ) {
    let returnVal = null;
    console.log(param)
    await AdverAxios('POST', ACTION_URL, param)
        .then((response) => {
          console.log(response)
            if (response.responseCode.statusCode === 200) {
                returnVal = response.data
            } else {
                returnVal = null
            }
        }).catch(() => returnVal = null)
    return returnVal;
}