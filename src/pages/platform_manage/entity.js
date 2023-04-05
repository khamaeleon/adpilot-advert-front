import {Icon, LinkRef} from "../../components/table";
import {Link} from "react-router-dom";
import React from "react";
import moment from "moment";
import {atom} from "jotai";
import {dateFormat, decimalFormat, phoneNumFormat} from "../../common/StringUtils";
import {Check} from "../../assets/GlobalStyles";
import {getThisMonth, getToDay} from "../../common/DateUtils";
import {ImageView} from "./ProductManage";
import {hostList} from "../signup/entity";

export const accountInfoAtom = atom(null)
export const adminInfoAtom = atom({})

/**
 * 상품 수집 기간 검색 아톰
 * @type {PrimitiveAtom<{endDate: string, stateDate: string}> & WithInitialValue<{endDate: string, stateDate: string}>}
 */
export const searchConditionAtom = {
  searchStartDate: getThisMonth().startDay,
  searchEndDate: getThisMonth().endDay,
  searchType: 'DEFAULT',
  keyword: '',
  pageSize: 1000,
  currentPage:1,
  username:''
}

export const searchConversionType = [
  {id: "1", value: "DEFAULT", label: "기본"},
  {id: "2", value: "ADVER_NAME", label: "광고주명"},
  {id: "3", value: "ADVER_ID", label: "광고주아이디"}
]
export const conversionListDataAtom = atom(null)

export const columnConversionData = [
  {
    name: 'conversionId',
    header:'',
    defaultVisible: false

  },
  {
    name: 'username',
    header: '광고주 아이디'
  },
  {
    name: 'adverName',
    header: '광고주 명',
  },
  {
    name: 'conversionCode',
    header: '전환 코드',
    render: ({value, cellProps}) => {
      return <Icon icon={'copyCode'} value={value} cellProps={cellProps}/>
    }
  },
  {
    name: 'orderCode',
    header: '주문 번호'
  },
  {
    name: 'totalPurchasePrice',
    header: '총 결제 금액',
    render: ({value}) => <p className={'won'}>{decimalFormat(value)}</p>
  },
  {
    name: 'totalProductCount',
    header: '총 상품수',
    render: ({value}) => <p>{decimalFormat(value)}</p>
  },
  {
    name: 'conversionDateTime',
    header: '전환 일시',
    render: ({value}) => {
      return (
        <span>{moment(value).format('YYYY년 MM월 DD일')}</span>
      )
    }
  },
  {
    name: 'purchaseType',
    header: '전환 타입',
  },
]

export const columnConversionDetailData = [
  {
    name: 'conversionId',
    header:'',
    defaultVisible: false

  },
  {
    name: 'conversionDateTime',
    header: '액션 일시',
    render: ({value}) => {
      return (
        <span>{moment(value).format('YYYY년 MM월 DD일')}</span>
      )
    }
  },
  {
    name: 'clickDateTime',
    header: '광고 클릭 일시',
    render: ({value}) => {
      return (
        <span>{moment(value).format('YYYY년 MM월 DD일')}</span>
      )
    }
  },
  {
    name: 'campaignId',
    header: '캠페인 코드',
    render: ({value, cellProps}) => {
      console.log(cellProps)
      return <Icon icon={'copyCode'} value={value} cellProps={cellProps}/>
    }
  },
  {
    name: 'inventoryId',
    header: '지면 코드',
    render: ({value, cellProps}) => {
      return <Icon icon={'copyCode'} value={value} cellProps={cellProps}/>
    }
  },
  {
    name: 'eventInfo',
    header: '이벤트 정보',
  },
  {
    name: 'productCode',
    header: '상품 코드',
  },
  {
    name: 'purchasePrice',
    header: '결제 금액',
    render: ({value}) => <p className={'won'}>{decimalFormat(value)}</p>
  },
  {
    name: 'purchaseCount',
    header: '구매 수',
    render: ({value}) => <p>{decimalFormat(value)}</p>
  },
  {
    name: 'productName',
    header: '상품 명',
  }
]

/**
 * 호스트 타입
 * @type
 */
export const hostType = [
  {key: 100, value: "ALL", label: "전체"},
  ...hostList
]
/**
 * 매체 타입
 * @type {[{id: string, label: string, value: string},{id: string, label: string, value: string},{id: string, label: string, value: string}]}
 */
export const adverType = [
  {key: "1", value: "ALL", label: "전체"},
  {key: "2", value: "ADVER", label: "광고주"},
  {key: "3", value: "AGENCY", label: "대행사"},
]
/**
 * 매체 계정 사용여부
 * @type {[{id: string, label: string, value: string},{id: string, label: string, value: string},{id: string, label: string, value: string}]}
 */
export const selectAccountUseInfo = [
  {key: "1", value: "ALL", label: "전체"},
  {key: "2", value: "NORMAL", label: "사용중"},
  {key: "3", value: "SUSPEND", label: "미사용"},
]
/**
 * 매체 계정 검색 타입
 * @type {[{label: string, value: string, key: string},{label: string, value: string, key: string},{label: string, value: string, key: string},{label: string, value: string, key: string},{label: string, value: string, key: string}]}
 */
export const selectKeywordType = [
  {key:"1",value:"ADVER_NAME",label:"광고주명"},
  {key:"2",value:"USERNAME",label:"아이디"},
  {key:"3",value:"COMPANY_NAME",label:"상호명"},
  {key:"4",value:"MANAGER_NAME",label:"담당자명"},
  {key:"5",value:"MANAGER_EMAIL",label:"담당자 이메일"}
]
/**
 * 검색 조건
 * @type {{activeYn: {id: string, label: string, value: string}, phoneNumber: string, siteName: string, mediaType: {id: string, label: string, value: string}, selectAdminType: {id: string, label: string, value: string}, userId: string, mediaSearchType: {id: string, label: string, value: string}}}
 */
export const searchAccountInfo = {
  pageSize: 50,
  currentPage: 1,
  adverType: null,
  hostType: null,
  accountStateType: null,
  searchKeywordType: null,
  keyword: null
}
export const userInfoAtom = atom([])
/**
 * 사용자 리스트 컬럼 설정
 * @type {[{name: string, header: string},{name: string, header: string, render: (function({value: *}): *)},{name: string, header: string, render: (function(*): *)},{name: string, header: string},{name: string, header: string},null,null]}
 */
export const columnUserData = [
  {
    name: 'adverName',
    header: '광고주명'
  },
  {
    name: 'adverType',
    header: '광고주 구분',
    render: ({value}) => {
      return (
        <>{value === 'ADVER' ? "광고주" : "대행사"}</>
      )
    }
  },
  {
    name: 'hostType',
    header: '솔루션 타입',
    render: ({value}) => {
      return (
        <>{hostList.find(obj => obj.value === value).label}</>
      )
    }
  },
  {
    name: 'username',
    header: '아이디',
    cellProps: {
      style: {
        textDecoration: 'underline'
      }
    },
    render: (props) => {
      return (
        <Link to={'/board/platformDetail'} state={{id: props.data.id}}>{props.data?.username}</Link>
      )
    }
  },
  {
    name: 'userCompanyProfile',
    header: '상호명',
    render: ({value})=> {
      return (
        <span>{value.companyName}</span>
      )
    }
  },
  {
    name: 'managerName',
    header: '담당자명'
  },
  {
    name: 'managerEmail',
    header: '이메일',
  },
  {
    name: 'createdAt',
    header: '가입 일시',
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
        <>{value !== 'NORMAL' ? "미사용" : "사용"}</>
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
 * 상품 수집 관리 리스트 Atom
 * @type {Atom<unknown>}
 */
export const productListDataAtom = atom(null)

export const searchProductType = [
  {id: "1", value: "DEFAULT", label: "기본"},
  {id: "2", value: "PRODUCT_CODE", label: "상품코드"},
  {id: "3", value: "PRODUCT_NAME", label: "상품명"}
]

/**
 * 상품 수집 관리 리스트 컬럼 설정
 */
export const productListColumn = [
  {
    name: 'username',
    header: '광고주 아이디',
    textAlign: 'center',
    minWidth: 80,
    showColumnMenuTool: false,
  },
  {
    name: 'productCode',
    header: '상품 코드',
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
    name: '',
    header: '등록 일시',
    textAlign: 'center',
    width: 90,
    resizeable: false,
    showColumnMenuTool: false,
    render: ({value}) => {
      return <p>{dateFormat(value, 'YYYY.MM.DD HH:mm')}</p>
    }
  },
  {
    name: 'productStatusType',
    header: () => {
      return (
        <div><p>중지/품절</p><p>여부</p></div>
      )
    },
    textAlign: 'center',
    width: 100,
    resizeable: false,
    showColumnMenuTool: false,
    render: ({value}) => {
      return <Check/>
    }
  },
  {
    name: 'productImages',
    header: '상품 이미지1',
    textAlign: 'center',
    minWidth: 100,
    maxWidth: 100,
    showColumnMenuTool: false,
    sortable: false,
    render: (props) => {
      return (
        <>
          {props.cellProps.data.productImages.length !== 0 &&
            <ImageView url={props.cellProps.data.productImages[0]}/>
          }
        </>
      )
    }
  },
  {
    name: 'productImages2',
    header: '상품 이미지2',
    textAlign: 'center',
    minWidth: 100,
    maxWidth: 100,
    showColumnMenuTool: false,
    sortable: false,
    render: (props) => {
      return (
        <>
          {props.cellProps.data.productImages.length > 1 &&
            <ImageView url={props.cellProps.data.productImages[1]}/>
          }
        </>
      )
    }
  },
  {
    name: 'productImages3',
    header: '상품 이미지3',
    textAlign: 'center',
    minWidth: 100,
    maxWidth: 100,
    showColumnMenuTool: false,
    sortable: false,
    render: (props) => {
      return (
        <>
          {props.cellProps.data.productImages.length > 2 &&
            <ImageView url={props.cellProps.data.productImages[2]}/>
          }
        </>
      )
    }
  },
  {
    name: 'productCategorys',
    header: () => {
      return (
        <div><p>표준 카테고리</p><p>(seq)</p></div>
      )
    },
    textAlign: 'center',
    showColumnMenuTool: false,
    render: (props) => {
      return (
        <>
          {props.cellProps.data.productCategorys.length !== 0 &&
            <span>{props.cellProps.data.productCategorys[0].name}</span>
          }
        </>
      )
    }
  },
  {
    name: 'productCategorys1',
    header: () => {
      return (
        <div><p>상품</p><p>카테고리1</p></div>
      )
    },
    textAlign: 'center',
    showColumnMenuTool: false,
    render: (props) => {
      return (
        <>
          {props.cellProps.data.productCategorys.length > 1 &&
            <span>{props.cellProps.data.productCategorys[1].name}</span>
          }
        </>
      )
    }
  },
  {
    name: 'productCategorys2',
    header: () => {
      return (
        <div><p>상품</p><p>카테고리2</p></div>
      )
    },
    textAlign: 'center',
    showColumnMenuTool: false,
    render: (props) => {
      return (
        <>
          {props.cellProps.data.productCategorys.length > 2 &&
            <span>{props.cellProps.data.productCategorys[2].name}</span>
          }
        </>
      )
    }
  },
  {
    name: 'price',
    header: '원가',
    textAlign: 'center',
    showColumnMenuTool: false,
    render: ({value}) => <p className={'won'}>{decimalFormat(value)}</p>
  },
  {
    name: 'discountRate',
    header: '할인가',
    textAlign: 'center',
    showColumnMenuTool: false,
    render: (props) => {
      const price = parseFloat(props.cellProps.data.price)
      const discount = parseFloat(props.cellProps.data.discountRate)
      const value = price - (price / discount)
      return (
        <p className={'won'}>{decimalFormat(value)}</p>
      )
    }
  },
  {
    name: 'productUrl',
    header: '사이트',
    textAlign: 'center',
    sortable: false,
    showColumnMenuTool: false,
    render: ({value, cellProps}) => {
      return <div style={{display: 'flex', alignItems: 'center'}}><p>이동</p> <Icon icon={'url'} value={value}
                                                                                  cellProps={cellProps}/></div>
    }
  },
  {
    name: 'ratingPoint',
    header: '평점',
    textAlign: 'center',
    showColumnMenuTool: false
  },
  {
    name: 'reviewCnt',
    header: '리뷰수',
    textAlign: 'center',
    showColumnMenuTool: false
  },
  {
    name: 'keyword',
    header: '키워드',
    textAlign: 'center',
    showColumnMenuTool: false
  }
]

/**
 * 전환 관리 리스트 Atom
 * @type {Atom<unknown>}
 */
//export const exchangeDataAtom = atom(null)
export const exchangeDataAtom = atom([{
  name: 'id',
}])

/**
 * 전환 관리 리스트 컬럼 설정
 */
export const exchangeColumns = [
  {
    name: 'id',
    defaultVisible: false
  },
  {
    name: 'username',
    header: '광고주 아이디',
    textAlign: 'center',
    defaultFlex: 1,
    showColumnMenuTool: false,
  },
  {
    name: 'username',
    header: '광고주명',
    textAlign: 'center',
    defaultFlex: 1,
    showColumnMenuTool: false,
  },
  {
    name: 'inventoryId',
    header: '전환 코드',
    textAlign: 'center',
    showColumnMenuTool: false,
    textEllipsis: false,
    defaultFlex: 1,
    render: ({value, cellProps}) => {
      return <Icon icon={'copyCode'} value={value} cellProps={cellProps}/>
    }
  },
  {
    name: 'examinationStatus',
    header: '주문 번호',
    textAlign: 'center',
    defaultFlex: 1,
    showColumnMenuTool: false
  },
  {
    name: 'script',
    header: '총결재 금액',
    textAlign: 'center',
    showColumnMenuTool: false,
    defaultFlex: 1,
    render: ({value}) => <p className={'won'}>{decimalFormat(value)}</p>
  },
  {
    name: 'examinationStatus',
    header: '상품수',
    textAlign: 'center',
    defaultFlex: 1,
    showColumnMenuTool: false
  },
  {
    name: 'username',
    header: '전환 일시',
    textAlign: 'center',
    width: 150,
    resizeable: false,
    showColumnMenuTool: false,
    render: ({value}) => {
      return <p>{dateFormat(value, 'YYYY.MM.DD HH:mm')}</p>
    }
  },
  {
    name: 'deviceType',
    header: '전환 구분',
    textAlign: 'center',
    minWidth: 100,
    maxWidth: 100,
    showColumnMenuTool: false,
    sortable: false
  }
]

export const searchPaymentType = [
  {id: "0", value: "All", label: "전체"},
  {id: "1", value: "ADVER_NAME", label: "광고주명"},
  {id: "2", value: "USERNAME", label: "광고주 아이디"},
  {id: "3", value: "PRODUCT_NAME", label: "신청 아이디"}
]

/**
 * 결재 관리 리스트 Atom
 * @type {Atom<unknown>}
 */
//export const paymentDataAtom = atom(null)
export const paymentDataAtom = atom([{
  name: 'id',
}])

/**
 * 결재 관리 리스트 컬럼 설정
 */

export const paymentColumns = [
  {
    name: 'id',
    header: 'id',
    defaultVisible: false,
  },
  {
    name: 'recordMonth',
    header: '신청 일시',
    width: 150,
    showColumnMenuTool: false,
    render: ({value}) => {
      return <p>{dateFormat(value, 'YYYY.MM.DD HH:mm')}</p>
    }
  },
  {
    name: 'status',
    header: '신청 상태',
    width: 120,
    showColumnMenuTool: false,
    render: ({value}) => <>{value.label}</>
  },
  {
    name: 'username',
    header: '결재/환불 정보',
    defaultFlex: 1,
    showColumnMenuTool: false,
  },
  {
    name: 'username',
    header: '광고주명',
    showColumnMenuTool: false,
  },
  {
    name: 'requesterId',
    header: '광고주 아이디',
    showColumnMenuTool: false,
  },
  {
    name: 'requesterId',
    header: '신청 아이디',
    showColumnMenuTool: false,
  },
  {
    name: 'revenueAmount',
    header: '광고비',
    showColumnMenuTool: false,
    render: ({value}) => <p className={'won'}>{decimalFormat(value)}</p>
  },
  {
    name: 'requestAmountVAT',
    header: '결재 금액(VAT포함)',
    width: 160,
    showColumnMenuTool: false,
    render: ({data}) => {
      let vat = data.requestAmount + (data.requestAmount / 10)
      return (
        <span className={'won'}>{decimalFormat(vat)}</span>
      )
    }
  },
  {
    name: 'updateAt',
    header: '상태 변경일',
    width: 120,
    showColumnMenuTool: false,
  },
  {
    name: 'etc',
    header: '비고',
    width: 180,
    sortable: false,
    showColumnMenuTool: false,
  }
]

/**
 * 결재 관리 상태 수정
 */
export const updatePaymentStatus = {
  paymentIdList: [],
  paymentStatus: "",
}

/**
 * 결재 관리 현황 조회
 */
export const searchPaymentParams = atom({
  startAt: dateFormat(getToDay(), 'YYYY-MM'),
  endAt: dateFormat(getToDay(), 'YYYY-MM'),
  statusList: ['INVOICE_REQUEST', 'EXAMINED_COMPLETED', 'REJECT', 'PAYMENT_COMPLETED', 'WITHHELD_PAYMENT', 'REVENUE_INCREASE', 'REVENUE_DECREASE'],
  searchType: 'DEFAULT',
  search: ''
})