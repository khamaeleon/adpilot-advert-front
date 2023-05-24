import {atom} from "jotai";
import {dateFormat, decimalFormat} from "../../../common/StringUtils";
import {getThisMonth, getToDay} from "../../../common/DateUtils";
import React from "react";
import moment from "moment/moment";

/**
 * 결재 관리 리스트 Atom
 * @type {Atom<unknown>}
 */
//export const paymentDataAtom = atom(null)
export const paymentDataAtom = atom([{
  name: 'id',
}])

export const searchPaymentType = [
  {id: "0", value: "ALL", label: "전체"},
  {id: "1", value: "ADVER_NAME", label: "광고주명"},
  {id: "2", value: "USERNAME", label: "광고주 아이디"},
  // {id: "3", value: "MODIFIEDAT", label: "신청 아이디"}
]

export const searchPointType = [
  {id: "0", value: "ALL", label: "전체"},
  {id: "1", value: "ADVER_NAME", label: "광고주명"},
  {id: "2", value: "USERNAME", label: "광고주 아이디"},
  {id: "3", value: "MODIFIED_BY", label: "신청 아이디"}
  // {id: "3", value: "USERNAME", label: "신청 아이디"}
]

export const refundReceivedAtomData = atom(false);

/**
 * 결재 관리 리스트 컬럼 설정
 */
export const paymentColumns = [
  {
    name: 'createdAt',
    header: '신청 일시',
    width: 150,
    showColumnMenuTool: false,
    textAlign: 'center',
    render: ({value}) => {
      return <p>{dateFormat(value, 'YYYY.MM.DD')}</p>
    }
  },
  {
    name: 'progressType',
    header: '신청 상태',
    width: 120,
    showColumnMenuTool: false,
    textAlign: 'center',
    render: ({ value })=> {
      let valueType = {
        REGISTRATION_TRADE: { label: '결제 신청', color: 'blue' },
        AUTHENTICATION_TRADE: { label: '결제 인증', color: 'orange' },
        APPROVAL_TRADE: { label: '결제 완료', color: 'green' },
        REVISE_TRADE: { label: '결제 개정', color: 'pink' },
        ERROR: { label: 'ERROR', color: 'red' }
      }[value] || { label: '', color: '' };
      return (
        <p style={{ color: valueType.color }}>{valueType.label}</p>
      )
    }
  },
  {
    name: 'creditCardType',
    header: '결제 정보',
    defaultFlex: 1,
    showColumnMenuTool: false,
    textAlign: 'center',
    render: ({value, cellProps}) =>{
      return (
        cellProps.data.bankType !== null ?
          (<p>{cellProps.data.bankType}</p>) :
          cellProps.data.creditCardType !== null ?
            (
              <>
                <p>{cellProps.data.creditCardType}</p>
                <p>{cellProps.data.cardNo}</p>
              </>
            ) : "-"
      )
    }
  },
  {
    name: 'value1',
    header: '광고주명',
    showColumnMenuTool: false,
    textAlign: 'center',
  },
  {
    name: 'value2',
    header: '광고주 아이디',
    showColumnMenuTool: false,
    textAlign: 'center',
  },
  {
    name: 'amount',
    header: '광고비',
    showColumnMenuTool: false,
    textAlign: 'center',
    render: ({value}) => <p className={'won'}>{decimalFormat(value)}</p>
  },
  {
    //광고비, 결제 금액 api 구분이 없음 일단 name값이 겹치면 오류가 생겨서 다른 값으로 설정 함..
    name: 'remainAmount',
    header: '결제 금액(VAT포함)',
    width: 160,
    showColumnMenuTool: false,
    textAlign: 'center',
    render: ({data}) => {
      let vat = data.remainAmount - (data.remainAmount / 1.1)
      let result = data.remainAmount - Math.floor(vat)
      return (
        <span className={'won'}>{decimalFormat(result)}</span>
      )
    }
  },
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
  startAt: getThisMonth().startDay,
  endAt: getThisMonth().endDay,
  statusList: ['PAYMENT_COMPLETED', 'PAYMENT_FAILED'],
  searchType: 'ALL',
  search: ''
})
