import {atom} from "jotai";
import {Icon} from "../../../components/table";
import {decimalFormat} from "../../../common/StringUtils";
import moment from "moment/moment";
import React from "react";

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