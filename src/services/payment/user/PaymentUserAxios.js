import {AdverAxios} from "../../../common/Axios";

const isInit = true;
const ACTION_URL = '/payments/ADVERTISE/payment-request';

/**
 * 결제 요청
 * @returns {Promise<null>}
 */
export async function paymentRequest( param ) {
    let returnVal = null;
    console.log(param)
    if(isInit){
        return {authPageUrl: "https://test.com"};
    }
    await AdverAxios('POST', ACTION_URL, param)
        .then((response) => {
            const { data, statusCode, message } = response;
            if(statusCode === 200) {
                returnVal = data;
            }else{
                returnVal = null;
            }
        }).catch(() => returnVal = null)
    return returnVal;
}