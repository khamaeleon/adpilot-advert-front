import moment from "moment";

/**
 * 이번달 구하기
 * @returns {{startDay: string, endDay: string}}
 */
export function getThisMonth(){
  const date = new Date();
  const year = date.getFullYear();
  let month =  new String(date.getMonth() + 1)
  month = month >= 10 ? month : '0' + month
  const rangeDay ={
    startDay:moment(year+month+'01').format('YYYY-MM-DD'),
    endDay:moment(new Date()).format('YYYY-MM-DD')
  }
  return rangeDay
}

/**
 * 지난달 구하기
 * @returns {{startDay: string, endDay: string}}
 */
export function getLastMonth(){

  const year = moment().format('YYYY');
  const month = moment().subtract(1,'months').format('MM');

  const rangeDay ={
    startDay:moment(year+month+'01').format('YYYY-MM-DD'),
    endDay:moment().subtract(1,'months').endOf('month').format('YYYY-MM-DD')
  }
  return rangeDay
}

/**
 * 오늘 날짜 구하기
 * @returns {string}
 */
export function getToDay(){
  const day = moment().format('YYYY-MM-DD');
  return day
}

/**
 * 어제날짜 구하기
 * @returns {string}
 */
export function getLastDay(){
  const day = moment().subtract(1,'days').format('YYYY-MM-DD');
  return day
}

/**
 * 지난 7일
 * @returns {{startDay: string, endDay: string}}
 */
export function getLastWeekDay(){
  const rangeDay ={
    startDay:moment().subtract(7,'days').format('YYYY-MM-DD'),
    endDay:moment().subtract(1,'days').format('YYYY-MM-DD')
  }
  return rangeDay
}

/**
 * 지난 30일
 * @returns {{startDay: string, endDay: string}}
 */
export function getLastThirtyDay(){
  const rangeDay ={
    startDay:moment().subtract(30,'days').format('YYYY-MM-DD'),
    endDay:moment().subtract(1,'days').format('YYYY-MM-DD')
  }
  return rangeDay
}

/**
 * 지난 90일
 * @returns {{startDay: string, endDay: string}}
 */
export function getLastNinetyDay(){
  const rangeDay ={
    startDay:moment().subtract(90,'days').format('YYYY-MM-DD'),
    endDay:moment().subtract(1,'days').format('YYYY-MM-DD')
  }
  return rangeDay
}



