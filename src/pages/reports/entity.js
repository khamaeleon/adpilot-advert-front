import React from "react";
import {atom} from "jotai";
import {ReportsMediaModal} from "./Media";
import { ReportsInventoryModal} from "./Page";
import {getThisMonth} from "../../common/DateUtils";
/* 리스트 기본값 */
export const defaultCondition = {
  productType: [{key:"0",value:null,label:'전체'},{key:"1",value:'BANNER',label:'배너'}, {key:"2",value:'POP_UNDER',label:'팝 언더'}],
  eventType: [{key:"0",value:null,label:'전체'},{key:"1",value:'SAW_THE_PRODUCT',label:'본상품'}, {key:"2",value:"CART_THE_PRODUCT",label:"장바구니"}, {key:"3",value:'DOMAIN_MATCHING',label:'리턴매칭'}],
  isAdExchange: [{key:"0",value:null,label:'전체'},{key:"1",value:"ALL",label:"전체"}, {key:"2",value:"IN_COMING",label:"수신"}, {key:"3",value:"OUT_GOING",label:"송출"}, {key:"4",value:"EXCEPTION",label:""}],
  deviceType: [{key:"0",value:null,label:'전체'},{key:"1",value:"PC",label:"PC"}, {key:"2",value:"MOBILE",label:"모바일"}, {key:"3",value:"RESPONSIVE_WEB",label:"반응형웹"}],
  agentType:  [{key:"1",value:"WEB",label:"PC 웹"}, {key:"2",value:"WEB_APP",label:"PC 어플리케이션"}, {key:"3",value:"MOBILE_WEB",label:"모바일 웹"}, {key:"4",value:"MOBILE_NATIVE_APP",label:"모바일 어플리케이션"}],
  sortType: ['BY_DATE','BY_SITE_NAME','BY_INVENTORY_NAME']
}

/* 기간별보고서 상태관리 */
export const reportsStaticsAtom = atom({
  pageSize: 30,
  currentPage:1,
  searchStartDate: getThisMonth().startDay,
  searchEndDate: getThisMonth().endDay,
  productType: null,
  eventType: null,
  isAdExchange: null,
  deviceType: null,
  agentType: ['WEB','WEB_APP','MOBILE_WEB','MOBILE_NATIVE_APP'],
  sortType: null
})

/* 매체별보고서 상태관리 */
export const reportsMediaAtom = atom({
  pageSize: 30,
  currentPage:1,
  searchStartDate: getThisMonth().startDay,
  searchEndDate: getThisMonth().endDay,
  productType: null,
  eventType: null,
  isAdExchange: null,
  deviceType: null,
  agentType: ['WEB','WEB_APP','MOBILE_WEB','MOBILE_NATIVE_APP'],
  sortType: null
})

/* 매체별 상세보고서 상태관리 */
export const reportsMediaDetailAtom = atom({
  pageSize: 30,
  currentPage:1,
  searchStartDate: getThisMonth().startDay,
  searchEndDate: getThisMonth().endDay,
  productType: null,
  eventType: null,
  isAdExchange: null,
  deviceType: null,
  agentType: ['WEB','WEB_APP','MOBILE_WEB','MOBILE_NATIVE_APP'],
  sortType: null
})

/* 지면별보고서 상태관리 */
export const reportsInventoryAtom = atom({
  pageSize: 30,
  currentPage:1,
  searchStartDate: getThisMonth().startDay,
  searchEndDate: getThisMonth().endDay,
  productType: null,
  eventType: null,
  isAdExchange: null,
  deviceType: null,
  agentType: ['WEB','WEB_APP','MOBILE_WEB','MOBILE_NATIVE_APP'],
  sortType: null
})
/* 지면별 상세보고서 상태관리 */
export const reportsInventoryDetailAtom = atom({
  pageSize: 30,
  currentPage:1,
  searchStartDate: getThisMonth().startDay,
  searchEndDate: getThisMonth().endDay,
  productType: null,
  eventType: null,
  isAdExchange: null,
  deviceType: null,
  agentType: ['WEB','WEB_APP','MOBILE_WEB','MOBILE_NATIVE_APP'],
  sortType: null
})

/* 외부연동수신보고서 상태관리 */
export const reportsAdExchangeAtom = atom({
  pageSize: 30,
  currentPage:1,
  searchStartDate: getThisMonth().startDay,
  searchEndDate: getThisMonth().endDay,
  productType: null,
  eventType: null,
  isAdExchange: null,
  deviceType: null,
  agentType: ['WEB','WEB_APP','MOBILE_WEB','MOBILE_NATIVE_APP'],
  sortType: null
})

/* 기간별보고서 컬럼 */
export const reportsStaticsAllColumn = [
  {name: 'historyDate', header: '통계일'},
  {name: 'requestCount',header: '요청수'},
  {name: 'responseCount',header: '응답수'},
  {name: 'exposureCount',header: '노출수'},
  {name: 'clickCount',header: '클릭수'},
  {name: 'clickRate',header: '클릭율',
    render: ({data}) => <span>{data.clickCount && data.exposureCount && ((data.clickCount / data.exposureCount) * 100).toFixed(2)}%</span>
  },
  {name: 'costAmount',header: '비용'},
  {name: 'proceedsAmount',header: '수익금'},
  {name: 'validClickCount',header: '총 클릭 수'}
]

/* 기간별보고서 결과 리스트 */
export const reportsStaticsAll = atom({
  totalCount: 0,
  totalPage:0,
  currentPage:1,
  rows:[]
})
/* 매체별보고서 컬럼 */
export const reportsStaticsMediaColumn = [
  {name: 'userId',header: '지면 아이디'},
  {name: 'siteName',header: '지면 명', minWidth: 150,
    render: ({value, cellProps}) => {
      return (
        <div style={{display:'flex', alignItems:'center'}}>
          <div>{value}</div>
          <ReportsMediaModal userId={cellProps.data.userId}/>
        </div>
      )
    }
  },
  {name: 'requestCount',header: '요청수',type: 'number'},
  {name: 'responseCount',header: '응답수',type: 'number'},
  {name: 'exposureCount',header: '노출수',type: 'number'},
  {name: 'clickCount',header: '클릭수',type: 'number'},
  {name: 'clickRate',header: '클릭율',
    render: ({data}) => <span>{data.clickCount && data.exposureCount && ((data.clickCount / data.exposureCount) * 100).toFixed(2)}%</span>
  },
  {name: 'costAmount',header: '비용',},
]
/* 매체별보고서 리스트 결과 */
export const reportsStaticsMedia = atom({
  "totalCount" : 0,
  "totalPages" : 0,
  "currentPage" : 1,
  "rows" : []
})

/* 매체별보고서 아코디언 컬럼 */
export const reportsStaticsInventoryByMediaColumn = [
  {name: 'inventoryId', header: '지면아이디'},
  {name: 'inventoryName', header: '지면명'},
  {name: 'requestCount', header: '요청수', type: 'number'},
  {name: 'responseCount', header: '응답수', type: 'number'},
  {name: 'exposureCount', header: '노출수', type: 'number'},
  {name: 'clickCount', header: '클릭수', type: 'number'},
  {name: 'clickRate',header: '클릭율',
    render: ({data}) => <span>{data.clickCount && data.exposureCount && ((data.clickCount / data.exposureCount) * 100).toFixed(2)}%</span>
  },
  {name: 'costAmount', header: '비용'},
  {name: 'proceedsAmount', header: '수익금'}
]
/* 매체별보고서 아코디언 결과 */
export const reportsStaticsInventoryByMedia = atom({
  "totalCount" : 0,
  "totalPages" : 0,
  "currentPage" : 1,
  "rows" : []
})

/* 매체별보고서 아코디언 컬럼 */
export const reportsStaticsMediaDetailColumn = [
  {name: 'historyDate', header: '통계 일'},
  {name: 'validClickCount', header: '총 클릭수'},
  {name: 'requestCount', header: '요청수', type: 'number'},
  {name: 'responseCount', header: '응답수', type: 'number'},
  {name: 'exposureCount', header: '노출수', type: 'number'},
  {name: 'clickCount', header: '클릭수', type: 'number'},
  {name: 'clickRate',header: '클릭율',
    render: ({data}) => <span>{data.clickCount && data.exposureCount && ((data.clickCount / data.exposureCount) * 100).toFixed(2)}%</span>
  },
  {name: 'costAmount', header: '비용'},
  {name: 'proceedsAmount', header: '수익금'},
]
/* 매체별보고서 아코디언 결과 */
export const reportsStaticsMediaDetail = atom({
  "totalCount" : 0,
  "totalPages" : 0,
  "currentPage" : 1,
  "rows" : []
})

/* 지면별보고서 컬럼 */
export const reportsStaticsInventoryColumn = [
  {name: 'inventoryId', header: '지면아이디' },
  {name: 'inventoryName', header: '지면명', minWidth: 180,
    render: ({value,cellProps}) => {
      return (
        <div style={{display:'flex', alignItems:'center'}}>
          <div>{value}</div>
          <ReportsInventoryModal inventoryId={cellProps.data.inventoryId}/>
        </div>
      )
    }
  },
  {name: 'responseCount', header: '응답수'},
  {name: 'exposureCount', header: '노출수'},
  {name: 'clickCount', header: '클릭수'},
  {name: 'clickRate',header: '클릭율',
    render: ({data}) => <span>{data.clickCount && data.exposureCount && ((data.clickCount / data.exposureCount) * 100).toFixed(2)}%</span>
  },
  {name: 'costAmount', header: '비용'},
  {name: 'proceedsAmount', header: '수익금'},
  {name: 'validClickCount', header: '총 클릭 수'}
]
/* 지면별보고서 리스트 결과 */
export const reportsStaticsInventory = atom({
  "totalCount" : 0,
  "totalPages" : 0,
  "currentPage" : 1,
  "rows" : []
})
/* 지면별보고서 모달 컬럼 */
export const reportsStaticsInventoryDetailColumn = [
  {name: 'inventoryId',header: '지면아이디'},
  {name: 'inventoryName',header: '지면명'},
  {name: 'requestCount',header: '요청수', type: 'number'},
  {name: 'responseCount',header: '응답수', type: 'number'},
  {name: 'exposureCount',header: '노출수', type: 'number'},
  {name: 'clickCount',header: '클릭수', type: 'number'},
  {name: 'clickRate',header: '클릭율',
    render: ({data}) => <span>{data.clickCount && data.exposureCount && ((data.clickCount / data.exposureCount) * 100).toFixed(2)}%</span>
  },
  {name: 'costAmount',header: '비용'},
  {name: 'proceedsAmount',header: '수익금'},
]
/* 지면별보고서 모달 리스트 결과 */
export const reportsStaticsInventoryDetail = atom({
  "totalCount" : 0,
  "totalPages" : 0,
  "currentPage" : 1,
  "rows" : []
})
/* 외부연동수신보고서 리스트 컬럼 */
export const reportsStaticsAdExchangeColumn = [
  {name: "inventoryName", header: "지면명"},
  {name: "inventoryId", header: "지면번호"},
  {name: "exchangePlatformType", header: "연동사"},
  {name: "countByExchangePlatform", header: "연동사수"},
  {name: "requestCount", header: "요청수", group:"defaultData"},
  {name: "exposureCount", header: "노출수", group:"defaultData"},
  {name: "clickCount", header: "클릭수", group:"defaultData"},
  {name: 'clickRate',header: '클릭율', group:"defaultData",
    render: ({data}) => <span>{data.clickCount && data.exposureCount && ((data.clickCount / data.exposureCount) * 100).toFixed(2)}%</span>
  },
  {name: "requestCountOfPlatform", header: "요청수", group:"platformData"},
  {name: "exposureCountOfPlatform", header: "노출수", group:"platformData"},
  {name: "clickCountOfPlatform", header: "클릭수", group:"platformData"},
  {name: 'clickRateOfPlatform',header: '클릭율',group:"platformData",
    render: ({data}) => <span>{data.clickCountOfPlatform && data.exposureCountOfPlatform &&((data.clickCountOfPlatform / data.exposureCountOfPlatform) * 100).toFixed(2)}%</span>
  },
  {name: "proceedsAmountOfPlatform", header: "수익금", group:"platformData"},
]

/* 외부연동수신보고서 아코디언 리스트 결과 */
export const reportsStaticsAdExchange = atom({
  "totalCount" : 0,
  "totalPages" : 0,
  "currentPage" : 1,
  "rows" : []
})

/* 외부연동수신보고서 아코디언 컬럼 */
export const reportsStaticsAdExchangeByInventoryColumn = [
  {name: "inventoryName", header: "지면명"},
  {name: "inventoryId", header: "지면번호"},
  {name: "exchangePlatformType", header: "연동사"},
  {name: "countByExchangePlatform", header: "연동사수"},
  {name: "requestCount", header: "요청수", group:"defaultData"},
  {name: "exposureCount", header: "노출수", group:"defaultData"},
  {name: "clickCount", header: "클릭수", group:"defaultData"},
  {name: 'clickRate',header: '클릭율', group:"defaultData",
    render: ({data}) => <span>{((data.clickCount / data.exposureCount) * 100).toFixed(2)}%</span>
  },
  {name: "requestCountOfPlatform", header: "요청수", group:"platformData"},
  {name: "exposureCountOfPlatform", header: "노출수", group:"platformData"},
  {name: "clickCountOfPlatform", header: "클릭수", group:"platformData"},
  {name: 'clickRateOfPlatform',header: '클릭율',group:"platformData",
    render: ({data}) => <span>{((data.clickCountOfPlatform / data.exposureCountOfPlatform) * 100).toFixed(2)}%</span>
  },
  {name: "proceedsAmountOfPlatform", header: "수익금", group:"platformData"},
]

/* 외부연동수신보고서 아코디언 리스트 결과 */
export const reportsStaticsAdExchangeByInventory = atom({
  "totalCount" : 0,
  "totalPages" : 0,
  "currentPage" : 1,
  "rows" : []
})