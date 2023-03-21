import {Icon, LinkRef} from "../../components/table";
import {Link} from "react-router-dom";
import {ReportsMediaModal} from "../reports/Media";
import React from "react";
import {productTypeInfo} from "../media_manage/entity";
import moment from "moment";

/**
 * 매체 타입
 * @type {[{id: string, label: string, value: string},{id: string, label: string, value: string},{id: string, label: string, value: string}]}
 */
export const mediaType = [
  {id: "1", value: "ALL", label: "전체"},
  {id: "2", value: "DIRECT", label: "직매체"},
  {id: "3", value: "AGENCY", label: "대행사"},
]
/**
 * 매체 계정 사용여부
 * @type {[{id: string, label: string, value: string},{id: string, label: string, value: string},{id: string, label: string, value: string}]}
 */
export const selectAccountUseInfo = [
  {id: "1", value: "ALL", label: "전체"},
  {id: "2", value: "Y", label: "사용중"},
  {id: "3", value: "N", label: "미사용"},
]
/**
 * 매체 계정 검색 타입
 * @type {[{id: string, label: string, value: string},{id: string, label: string, value: string},{id: string, label: string, value: string}]}
 */
export const selectMediaSearchType = [
  {id: "1", value: "MEDIA_NAME", label: "매체명"},
  {id: "2", value: "MEDIA_ID", label: "아이디"},
  {id: "3", value: "PHONE", label: "연락처"}
]
/**
 * 검색 조건
 * @type {{activeYn: {id: string, label: string, value: string}, phoneNumber: string, siteName: string, mediaType: {id: string, label: string, value: string}, selectAdminType: {id: string, label: string, value: string}, userId: string, mediaSearchType: {id: string, label: string, value: string}}}
 */
export const searchAccountInfo = {
  mediaType: '',
  selectAdminType: '',
  mediaSearchType: '',
  username: '',
  siteName: '',
  phoneNumber: '',
  activeYn: '',
  pageSize: 1000,
  currentPage: 1,
  searchText: ''
}
/**
 * 사용자 리스트 컬럼 설정
 * @type {[{name: string, header: string},{name: string, header: string, render: (function({value: *}): *)},{name: string, header: string, render: (function(*): *)},{name: string, header: string},{name: string, header: string},null,null]}
 */
export const columnUserData = [
  {
    name: 'siteName',
    header: '매체명'
  },
  {
    name: 'mediaType',
    header: '매체타입',
    render: ({value}) => {
      return (
        <>{value === 'DIRECT' ? "직매체" : "대행사"}</>
      )
    }
  },
  {
    name: 'username',
    header: '아이디',
    render: (props) => {
      return (
        <Link to={'/board/platform/detail'} state={{id: props.data.id}}>{props.value}</Link>
      )
    }
  },
  {
    name: 'managerName1',
    header: '담당자명'
  },
  {
    name: 'managerPhone1',
    header: '연락처'
  },
  {
    name: 'createdAt',
    header: '생성 일시',
    render: ({value}) => {
      return (
        <span>{moment(value).format('YYYY년 MM월 DD일')}</span>
      )
    }
  },
  {
    name: 'status',
    header: '사용 여부',
    render: ({value}) => {
      return (
        <>{value === 'NORMAL' ? "사용중" : "중지"}</>
      )
    }
  },
]


/**
 * 어드민 관리 검색 파라미터
 * @type {{searchText: string, pageSize: number, currentPage: number}}
 */
export const searchAdminParams = {
  pageSize: 1000,
  currentPage: 1,
  searchText: ''
}

/**
 * 어드민 등록 form
 * @type {{activeYn: string, password: string, phoneNumber: string, name: string, confirmPassword: string, email: string}}
 */
export const adminInfo = {
  email: '',
  password: '',
  confirmPassword: '',
  name: '',
  phoneNumber: '',
  activeYn: 'Y'
}

/**
 * 관리자 리스트 컬럼 세팅
 * @type {[{name: string, header: string, render: (function(*): *)},{name: string, header: string},{name: string, header: string},{name: string, header: string},{name: string, header: string, render: (function({value: *}): *)}]}
 */
export const columnAdminData = [
  {
    name: 'email',
    header: '아이디',
    render: (props) => {
      return (
        <Link to={'/board/platform2/detail'} state={{id: props.data.email}}>{props.value}</Link>
      )
    }
  },
  {
    name: 'name',
    header: '담당자명',
  },
  {
    name: 'phoneNumber',
    header: '연락처',
  },
  {
    name: 'createdAt',
    header: '생성 일시',
    render: ({value}) => {
      return (
        <span>{moment(value).format('YYYY년 MM월 DD일')}</span>
      )
    }
  },
  {
    name: 'status',
    header: '사용 여부',
    render: ({value}) => {
      return (
        <>{value === 'NORMAL' ? "사용중" : "중지"}</>
      )
    }
  },
]
export const eventTypeAll = [
  {key: "1", value: 'SAW_THE_PRODUCT', label: '본상품'},
  {key: "2", value: "CART_THE_PRODUCT", label: "장바구니"},
  {key: "3", value: 'DOMAIN_MATCHING', label: '리턴매칭'}
]


export const columnHistoryData = [
  {
    name: 'inventoryName',
    header: '지면명',
    textAlign: 'center',
    defaultWidth: 220, //가변 사이즈
    resizeable: true, //리사이징
    textEllipsis: false, // ... 표시
    cellProps: {
      style: {
        textDecoration: 'underline'
      }
    },
    render: ({value, cellProps}) => {
      return (
        <Link to={"/board/platform3/detail"} state={cellProps.data.revisionId}>{value}</Link>
      )
    }
  },
  {
    name: 'inventoryId',
    header: '지면 코드',
    textAlign: 'center',
    width: 80,
    sortable: false, //정렬
    resizeable: false,
    showColumnMenuTool: false,
    render: ({value, cellProps}) => {
      return <Icon icon={'copyCode'} value={value} cellProps={cellProps}/>
    }
  },
  {
    name: 'publish',
    header: '게재상태',
    render: ({value, cellProps}) => {
      console.log(cellProps.data.publishChanged)
      return (
        <span>{cellProps.data.publishChanged ? (value === true) ? 'ON' : 'OFF' : '-'}</span>
      )
    }
  },
  {
    name: 'allowEvents',
    header: '이벤트 설정',
    render: ({value, cellProps}) => {
      return (
        <span>{
          cellProps.data.allowEventsChanged ?
            value.map((data, index) => {
              return (
                <p key={index}>{eventTypeAll.find(type => type.value === data.eventType).label + ':' + data.exposureWeight}</p>
              )
            }) : '-'
        }</span>
      )
    }
  },
  {
    name: 'feeCalculation',
    header: '정산 설정',
    render: ({value, cellProps}) => {
      return (
        <span>{cellProps.data.feeCalculation.calculationValueChanged ? value.calculationType + '-' + value.calculationValue : '-'}</span>
      )
    }
  },
  {
    name: 'noExposedConfigType',
    header: '대체광고',
    render: ({value, cellProps}) => {
      console.log(cellProps.data)
      return (
        <span>
          <p>{cellProps.data.noExposedConfigTypeChanged ? value : '-'}</p>
          <p>{cellProps.data.noExposedConfigValueChanged ? cellProps.data.noExposedConfigValue : '-'}</p>
        </span>
      )
    }
  },
  {
    name: 'modifiedAt',
    header: '변경일시',
    defaultWidth: 220, //가변 사이즈
    render: ({value}) => {
      return (
        <span>{moment(value).format('YYYY년 MM월 DD일  HH시mm분ss초')}</span>
      )
    }
  },
  {
    name: 'modifiedBy',
    header: '변경자',
  }
]

export const mediaSearchTypeByHistory = [
  {id: "1", value: "INVENTORY_NAME", label: "지면명"},
  {id: "2", value: "USER_ID", label: "아이디"},
  {id: "3", value: "INVENTORY_ID", label: "지면코드"},
  {id: "4", value: "MODIFIED_BY", label: "변경자"}
]

export const searchRevisionTypes = [
  {id: "1", value: "MODIFIED_PUBLISH", label: "게재 상태"},
  {id: "2", value: "MODIFIED_PRODUCT", label: "광고 상품 설정"},
  {id: "3", value: "MODIFIED_FEE_CALCULATION", label: "정산 정보 설정"},
  {id: "4", value: "MODIFIED_DETAIL_SETTINGS", label: "지면 상세 설정"}
]


export const searchHistoryParams = {
  pageSize: 10,
  currentPage: 1,
  searchRevisionTypes: [],
  searchStartDay: new Date(),
  searchEndDay: new Date(),
  searchKeywordType: null,
  searchKeyword: '',
  sortType: null
}
export const searchAdExChangeParams = {
  pageSize: 10,
  currentPage: 1,
  searchRevisionTypes: [],
  searchStartDay: new Date(),
  searchEndDay: new Date(),
  searchKeywordType: null,
  searchKeyword: '',
  sortType: null
}

export const searchAdExChangeRevisionTypes = [
  {id: "1", value: "EXCHANGE_CONFIG", label: "연동 설정"},
  {id: "2", value: "KEY_VALUE", label: "KEY/VALUE 설정"},
  {id: "3", value: "SORT_NUMBER", label: "송출 순서"}
]

export const columnAdExChangeData = [
  {
    name: 'inventoryName',
    header: '지면명',
  },
  {
    name: 'inventoryCode',
    header: '지면코드',
  },
  {
    name: 'adExchangeConfig',
    header: '연동 설정',
  },
  {
    name: 'paramsConfig',
    header: 'KEY/VALUE 설정',
  },
  {
    name: 'rankingConfig',
    header: '송출 순서 설정',
  },
  {
    name: 'updateDate',
    header: '변경일시',
  },
  {
    name: 'userName',
    header: '변경자',
  }
]

export const adExChangeListInfo = [
  {
    inventoryName: '네이트 날개배너',
    inventoryCode: 'c123123ho',
    adExchangeConfig: 'ON',
    paramsConfig: 'key=zoneId \n value=23123',
    rankingConfig: 'YES',
    updateDate: '20220101',
    userName: '조규홍'
  },
  {
    inventoryName: '네이트 날개배너',
    inventoryCode: 'c12321823ho',
    adExchangeConfig: 'ON',
    paramsConfig: 'ke=:mediaKeyId \n value=23123',
    rankingConfig: 'YES',
    updateDate: '20220101',
    userName: '한란민'
  }
]

export const columnAdExChangeSetting = {
  default: {
    textAlign: "center"
  },
  setColumns: [
    {
      target: 0,
      function: LinkRef("/board/platform4/detail"),
      value: {
        width: 300,
      },
    },
    {
      target: 1,
      value: {
        width: 100,
      },
    },
    {
      target: 2,
      value: {
        width: 100,
      },
    },
    {
      target: 3,
      value: {
        width: 500,
      },
    },
    {
      target: 4,
      value: {
        width: 100,
      },
    },
    {
      target: 5,
      value: {
        width: 100,
      },
    }
  ]
}


export const adExChangeDetailInfo = {
  inventoryName: '네이트 중아',
  accountId: 'nate',
  inventoryCode: '213123',
  beforeUpdateDate: '2023-01-01',
  beforeUpdateName: '한란민',
  lastUpdateDate: '2023-01-01',
  lastUpdateName: '조규홍',
  adExChangeConfig: [
    {
      adExChangeName: '크리테오',
      beforePublication: false,
      lastPublication: true
    },
    {
      adExChangeName: '와이더플래닛',
      beforePublication: false,
      lastPublication: false
    },
  ],
  ParamsConfig: [
    {
      adExChangeName: '크리테오',
      beforeKey: '123123',
      beforeValue: '213213',
      lastKey: '123123',
      lastValue: '213213'
    },
    {
      adExChangeName: '와이더플래닛',
      beforeKey: 'mediaKey',
      beforeValue: '213213',
      lastKey: 'sdfsdf',
      lastValue: '2132sdfadf13'
    },
  ],
  rankingConfig: [
    {
      adExChangeName: '크리테오',
      beforeRankingValue: 1,
      lastRankingValue: 2,
    },
    {
      adExChangeName: '와이더플래닛',
      beforeRankingValue: 2,
      lastRankingValue: 3,
    },
    {
      adExChangeName: '아이엠',
      beforeRankingValue: 3,
      lastRankingValue: 1,
    }
  ]
}

