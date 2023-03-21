import {MediaAxios} from "../common/Axios";

const ACTION_URL = '/inventory';
const CONVERT_PUBLISH_URL = ACTION_URL + '/{inventoryId}/publish/{publish}';
const CONVERT_EXAMINATION_URL = ACTION_URL + '/{inventoryId}/examination/{examinationStatus}';
const BANNER_SIZE_URL = ACTION_URL + '/banner/size';
const CATEGORY_ONEDEPTH_URL = ACTION_URL + '/category';
const CATEGORY_TWODEPTH_URL = ACTION_URL + '/category/{mediaCategory1}';
const INVENTORY_TYPE_URL = ACTION_URL + '/inventoryType';
const EVENT_TYPE_URL = ACTION_URL + '/eventType';

const SLASH = '/';

/**
 * 인벤토리 리스트 조회 api
 * @returns {Promise<null>}
 */
export async function selInventoryList(props) {
  let returnVal = null;
  const {deviceType, calculationType, searchKeywordType, keyword} = props;

  let params = '';

  if(deviceType.value && deviceType.value !== 'ALL') {
    params += params !== '' ? '&' : '?';
    params += 'deviceType=' + deviceType.value;
  }
  if(calculationType.value && calculationType.value !== 'ALL') {
    params += params !== '' ? '&' : '?';
    params += 'calculationType=' + calculationType.label;
  }
  if(searchKeywordType.value && searchKeywordType.value !== 'ALL'&& keyword) {
    params += params !== '' ? '&' : '?';
    params += 'searchKeywordType=' + searchKeywordType.value;
  }
  if(keyword) {
    params += params !== '' ? '&' : '?';
    params += 'keyword=' + keyword;
  }

  await MediaAxios('GET', ACTION_URL + params , null)
  .then((response) => {
    const {responseCode, data, message} = response;
    if(responseCode.statusCode === 200){
      returnVal = data
    }else{
      console.log(message)
    }
  }).catch((e) => returnVal = false)
  return returnVal;
};

/**
 * 인벤토리 상세 조회 api
 * @returns {Promise<null>}
 */
export async function selInventory(inventoryId) {
  let returnVal = null;
  await MediaAxios('GET', ACTION_URL + SLASH + inventoryId, null)
    .then((response) => {
      const {responseCode, data, message} = response;
      if(responseCode.statusCode === 200){
        returnVal = data
      }else{
        console.log(message)
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};

/**
 * 인벤토리 등록 api
 * @returns {Promise<null>}
 */
export async function createInventory(params) {
  let returnVal = null;

  await MediaAxios('POST', ACTION_URL + SLASH + (params.productType === 'POP_UNDER' ? 'cover':'banner'), params)
    .then((response) => {
      const {responseCode, data, message} = response;
      if(responseCode.statusCode === 201)
      {
        returnVal = data;
      }else{
        console.log(message);
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};
/**
 * 인벤토리 수정 api
 * @returns {Promise<null>}
 */
export async function updateInventory(inventoryId, params) {
  let returnVal = null;
  await MediaAxios('PUT', ACTION_URL + SLASH + inventoryId, params)
    .then((response) => {
      const {responseCode, message} = response;
      if(responseCode.statusCode === 200)
      {
        returnVal = responseCode;
      }else{
        console.log(message);
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};

/** 인벤토리 게재 여부 수정 api
 * @returns {Promise<null>}
 */
export async function convertInventoryPublish(inventoryId, publish) {
  let returnVal = null;
  await MediaAxios('PUT',
      CONVERT_PUBLISH_URL.replace('{inventoryId}', inventoryId).replace('{publish}', publish),
      null)
    .then((response) => {
      if(response.success){
        returnVal = response.data;
      }
      returnVal = response;
    }).catch((e) => returnVal = false)
  return returnVal;
};

/** 인벤토리 심사 상태 수정 api
 * @returns {Promise<null>}
 */
export async function convertInventoryExamination(inventoryId, examinationStatus) {
  let returnVal = null;
  await MediaAxios('PUT', CONVERT_EXAMINATION_URL.replace('{inventoryId}', inventoryId).replace('{examinationStatus}', examinationStatus),
      null)
    .then((response) => {
      const {responseCode, message} = response;
      if(responseCode.statusCode === 200)
      {
        returnVal = responseCode;
      }else{
        console.log(message);
      }
    }).catch((e) => returnVal = false)
  return returnVal;
};

/** 지면 사이즈 api
 * @returns {Promise<null>}
 */
export async function bannerSizeList() {
  let returnVal = null;
  await MediaAxios('GET', BANNER_SIZE_URL, null)
  .then((response) => {
    const {responseCode, data, message} = response;
    if(responseCode.statusCode === 200)
    {
      returnVal = data;
    }else{
      console.log(message);
    }
  }).catch((e) => returnVal = false)
  return returnVal;
};


/** 지면 카테고리 api
 * @returns {Promise<null>}
 */
export async function bannerCategoryOneDepthList() {
  let returnVal = null;
  await MediaAxios('GET', CATEGORY_ONEDEPTH_URL, null)
  .then((response) => {
    const {responseCode, data, message} = response;
    if(responseCode.statusCode === 200)
    {
      returnVal = data;
    }else{
      console.log(message);
    }
  }).catch((e) => returnVal = false)
  return returnVal;
};

/** 지면 카테고리 api
 * @returns {Promise<null>}
 */
export async function bannerCategoryTwoDepthList(mediaCategory1) {
  let returnVal = null;
  await MediaAxios('GET', CATEGORY_TWODEPTH_URL.replace('{mediaCategory1}', mediaCategory1), null)
  .then((response) => {
    const {responseCode, data, message} = response;
    if(responseCode.statusCode === 200)
    {
      returnVal = data;
    }else{
      console.log(message);
    }
  }).catch((e) => returnVal = false)
  return returnVal;
};

/** 지면 타입 api
 * @returns {Promise<null>}
 */
export async function inventoryTypeList() {
  let returnVal = null;
  await MediaAxios('GET', INVENTORY_TYPE_URL, null)
  .then((response) => {
    const {responseCode, data, message} = response;
    if(responseCode.statusCode === 200)
    {
      returnVal = data;
    }else{
      console.log(message);
    }
  }).catch((e) => returnVal = false)
  return returnVal;
};
/** 이벤트 타입 api
 * @returns {Promise<null>}
 */
export async function eventTypeList() {
  let returnVal = null;
  await MediaAxios('GET', EVENT_TYPE_URL, null)
  .then((response) => {
    const {responseCode, data, message} = response;
    if(responseCode.statusCode === 200)
    {
      returnVal = data;
    }else{
      console.log(message);
    }
  }).catch((e) => returnVal = false)
  return returnVal;
};

