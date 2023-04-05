import {atom} from "jotai";
import {dateFormat, decimalFormat} from "../../../common/StringUtils";
import {getToDay} from "../../../common/DateUtils";
import React from "react";

/**
 * 결재 관리 리스트 Atom
 * @type {Atom<unknown>}
 */
//export const paymentDataAtom = atom(null)
export const paymentDataAtom = atom([{
  name: 'id',
}])

export const searchPaymentType = [
  {id: "0", value: "All", label: "전체"},
  {id: "1", value: "ADVER_NAME", label: "광고주명"},
  {id: "2", value: "USERNAME", label: "광고주 아이디"},
  {id: "3", value: "PRODUCT_NAME", label: "신청 아이디"}
]


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