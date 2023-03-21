import moment from "moment";
import axios from "axios";

export function multiAxiosCall(axiosArr, callbackFunc){
  axios.all(axiosArr).then(axios.spread(function (...args) {
    callbackFunc(args)
  })).catch(error => console.log(error))
}

export function responseFormatData(returnVal) {
  if(returnVal === null) return null;
  if(returnVal.success){
    return returnVal.data;
  } else if(returnVal.data.success) {
    return returnVal.data.data;
  }else {
    return null;
  }
}

export function responseFormatMessage(returnVal) {
  if(returnVal === null) return null;
  return returnVal
}

export function responseFormatBoolean(returnVal) {
  if(returnVal === null) return false;
  return returnVal.success;
}


export const toDay = () => {
  return moment(new Date());
}

export const oneYearsAgoDay = () => {
  return moment(new Date()).subtract(1,'years');
}

export const yearsOption = () => {
  let minYear = 1980
  let maxYear = moment(new Date()).year()
  let years = Array.from({length: maxYear - (minYear-1)}, ()=> maxYear -- )
  return years.map((y, idx)=><option key={idx} value={y}>{y}</option>);
}

export const monthOption = (selectYear) => {
  let maxMonth = selectYear === toDay().year() ? toDay().month()+1 : 12
  let months = Array.from({length: maxMonth}, (_, i)=> i + 1 )

  return months.map((m, idx)=><option key={idx} value={m < 10 ? '0' + m : m }>{m < 10 ? '0' + m : m }</option>);
}

//string 형식 날짜 포맷
export const stringDateFormat = (stringDate, dateformat) => {
  if(stringDate == null) return '';
  let returnVal = stringDate;
  if (stringDate.length === 8) {
    returnVal = stringDate.replace(/(\d{4})(\d{2})(\d{2})/g, `$1-$2-$3`)
  }
  return moment(new Date(returnVal)).format(dateformat);
}
//array 형식 날짜 포맷
export const arrayDateFormat = (arrayDate, dateformat) => {
  if(arrayDate == null) return '';
  let returnVal = arrayDate[0] + '-'
    + (arrayDate[1]<10 ? '0' : '')+ arrayDate[1]
    + '-' + (arrayDate[2]<10 ? '0' : '')+ arrayDate[2]
    + 'T' + (arrayDate[3]<10 ? '0' : '') + arrayDate[3]
    + ':' + (arrayDate[4]<10 ? '0' : '') + arrayDate[4];
  return  moment(new Date(returnVal)).format(dateformat);
}

//date 형식 날짜 포맷
export const dateFormat = (date, dateformat) => {
  if(date == null) return '';
  return moment(new Date(date)).format(dateformat);
}

//date 형식 날짜 포맷
export const isDateOver = (date) => {
  if(date == null) return '';
  return arrayDateFormat(date, 'YYYYMMDDHHmmss') > moment(new Date()).format('YYYYMMDDHHmmss');
}
//D-day return (D-day 표시 나중에 사용예정)
export const compareDday = (date) => {

  const dday = moment(new Date(date)).diff(moment(new Date()).format('YYYY-MM-DD'), 'days');
  let returnVal = '';
  if(dday === 0){
    returnVal = '오늘 마감'
  } else if(dday > 0){
    if(dday === 1){
      returnVal = '내일 마감';
    }else if(dday < 6){
      returnVal = 'D-'+dday;
    }
  }

  return returnVal;
}

//나이 번호 포맷
export const birthDateFormat = (birthDate) => {
  let returnVal = birthDate;
  if (birthDate.length === 8) {
    let yearVal = birthDate.substring(0, 4) + '년생';
    let birthCalc = (moment().month()+1) - birthDate.substring(5, 6)
    let ageVal
    if(birthCalc < 0 || (birthCalc === 0 && moment().date() < parseInt(birthDate.substring(7, 8)))){
      ageVal = ' (만 ' + (moment().year() - (parseInt(birthDate.substring(0, 4)) + 1)) + '세)';
    }else{
      ageVal = ' (만 ' + (moment().year() - birthDate.substring(0, 4)) + '세)';
    }

    returnVal = yearVal + ageVal;
  }
  return returnVal;
}
//핸드폰 번호 포맷
export const phoneNumFormat = (phoneNum) => {
  let returnVal = phoneNum;
  if (phoneNum.length === 11) {
    returnVal = phoneNum.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
  }
  return returnVal;
}
export const removeStr = (str) => {
  str = String(str);
  return str.replace(/[^\d]+/g, '');
}

//통화 포멧 JSC 코어 인터네셔널 버전 재정의 RN > 0/62 & /app/build.gradle -> def jscFlavor = 'org.webkit:android-jsc-intl:+' 수정
export const decimalFormat = (money) => {
  if(money == null || money === 0) return 0;
  if(money !== 0){
    return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }else{
    return '0';
  }
}

export const dateLineFormat = (date) => {
  if(date == null) return '';
  if(date === 0) return '';
  if(date !== 0){
    return date.toString().replace(/(\d{4})(\d{2})/g, '$1.$2' );
  }else{
    return '';
  }
}

export const dateValidation = (date) => {
  let momentDate = moment(date, "YYYY-MM-DD");
  if (momentDate.isValid() && date.length === 6) {
    return true;
  } else {
    return false;
  }
}
export const compareDate = (startDate, endDate) => {
  let momentStartDate = moment(startDate, "YYYY-MM-DD");
  let momentEndDate = moment(endDate, "YYYY-MM-DD");

  if(momentStartDate > momentEndDate){
    return true;
  }else{
    return false;
  }
}

export const passwordValid = (text) => {
  if(text == null) return '';
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!#%*?&])[A-Za-z\d@$!#%*?&]{8,16}$/
  if(passwordRegex.test(text)){
    return true;
  }else{
    return false;
  }
}

/**
 * 카멜케이스로 변환
 * @param json
 * @returns {{}|*}
 */
/*
function snakeToCamel(json) {
  /!**
   * string, number, null, undefined, boolean, ...
   *!/
  if (!json || typeof json !== 'object') {
    return json;
  }

  /!**
   * Array
   *!/
  if (json.constructor.name === 'Array') {
    return json.map((item) => (snakeToCamel(item)));
  }

  /!**
   * JSON
   *!/
  let output = {};

  Object.keys(json).forEach((key) => {
    let value = json[key];
    let newKey = key.includes('_') ? _.string.camelize(key) : key;

    output[newKey] = snakeToCamel(value);
  });

  return output;
}*/
