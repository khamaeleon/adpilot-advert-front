import {dateFormat, decimalFormat} from "../../common/StringUtils";
import {getToDay} from "../../common/DateUtils";
import React, {useState} from "react";
import {atom} from "jotai/index";

export const accountInfoRevenue = atom({ // 정산 수익 현황
  "username" : "",
  "revenueAmount" : 0,
  "revenueBalance" : 0,
  "totalCarryOver" : 0,
  "invoiceRequestAmount" : 0,
  "examinedCompletedAmount" : 0,
  "paymentCompletedAmount" : 0
})

export const accountProfile = { // 매체 계정 프로필 조회
  "username" : "",
  "managerName" : "",
  "managerEmail" : "",
  "managerPhone" : "",
  "bankAccountNumber" : "",
  "bankType" : "",
  "accountHolder" : "",
  "passbookCopy" : "",
  "grossCalculate" : 0,
  "businessName" : "",
  "businessNumber" : "",
  "businessLicenseCopy" : "",
  "business" : "",
  "businessType" : "",
  "ceoName" : "",
  "address" : "",
  "taxYn" : 'Y',
  "mediaType" : ""
}

export const accountCreateInvoice = { // 정산 이력 추가
  "username" : "",
  "invoiceStatus" : "INVOICE_REQUEST",
  "requesterId" : "",
  "requestAmount" : 0,
  "etc" : ""
}

export const accountInfoColumns = [
  {
    name: 'statsMonth',
    header: '연월',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1
  },
  {
    name: 'requestCount',
    header: '요청수',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1,
    render: ({ value })=> decimalFormat(value),
  },
  {
    name: 'responseCount',
    header: '응답수',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1,
    render: ({ value })=> decimalFormat(value),
  },
  {
    name: 'mediaExposureCount',
    header: '노출수',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1,
    render: ({ value })=> decimalFormat(value),
  },
  {
    name: 'clickCount',
    header: '클릭수',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1,
    render: ({ value })=> decimalFormat(value),
  },
  {
    name: 'clickRate',
    header: '클릭률',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1,
    render: ({ value })=> <p className={'pct'}>{decimalFormat(value)}</p>,
  },
  {
    name: 'costAmount',
    header: '비용',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1,
    render: ({ value })=> <p className={'won'}>{decimalFormat(value)}</p>,
  },
  {
    name: 'revenue',
    header: '수익금',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1,
    render: ({ value })=> <p className={'won'}>{decimalFormat(value)}</p>,
  },
  {
    name: 'completedPaymentAmount',
    header: '지급 완료',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1,
    render: ({ value })=> <p className={'won'}>{decimalFormat(value)}</p>,
  },
  {
    name: 'totalCarryOverAmount',
    header: '이월금',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1,
    render: ({ value })=> <p className={'won'}>{decimalFormat(value)}</p>,
  }
]

export const searchAccountChecked = {}

export const accountInfoSetting = {
  default: {
    textAlign: "center",

  },
  setColumns: [
    {
      target: 0,
      value: {
      },
    },
    {
      target: 1,
      value: {}
    }
  ]
}

export const accountInfoList = [
  {
    "statsMonth" : '2023-1',
    "username" : '',
    "requestCount" : 0,
    "responseCount" : 0,
    "mediaExposure_count" : 0,
    "clickCount" : 0,
    "clickRate": 0,
    "costAmount" : 0,
    "revenue" : 0,
    "requestAmount" : 0,
    "totalCarryOverAmount" : 0,
    "scheduledPaymentAmount" : 0,
    "completedPaymentAmount" : 0
  }
]

export const searchAccountParams = {// 정산 이력 조회
  startAt: dateFormat(getToDay(), 'YYYY-MM'),
  endAt: dateFormat(getToDay(), 'YYYY-MM'),
  statusList: ['INVOICE_REQUEST', 'EXAMINED_COMPLETED', 'REJECT', 'PAYMENT_COMPLETED', 'WITHHELD_PAYMENT', 'REVENUE_INCREASE', 'REVENUE_DECREASE'],
  searchType: 'DEFAULT',
  search: ''
}

export const searchAccountType = [
  {id: "1", value: "DEFAULT", label: "전체"},
  {id: "2", value: "MEDIA_NAME", label: "매체명"},
  {id: "3", value: "MEDIA_ID", label: "매체 아이디"},
  {id: "4", value: "REQUESTER_ID", label: "신청 아이디"},
]

const status = {
  "ALL" : "전체",
  "INVOICE_REQUEST" :"정산 신청",
  "EXAMINED_COMPLETED" :"심사 완료",
  "REJECT" :"반려",
  "PAYMENT_COMPLETED" : "지급 완료",
  "WITHHELD_PAYMENT" :"지급 보류",
  "REVENUE_INCREASE" : "수익 증가",
  "REVENUE_DECREASE" :"수익 감소",
}

export const accountHistoryColumns = [ //정산 이력 테이블
  {
    name: 'recordMonth',
    header: '정산연월',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1
  },
  {
    name: 'status',
    header: '신청 상태',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1,
    render: ({ value })=> <>{status[value]}</>
  },
  {
    name: 'mediaName',
    header: '매체명',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1
  },
  {
    name: 'username',
    header: '매체 아이디',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1
  },
  {
    name: 'requesterId',
    header: '신청 아이디',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1
  },
  {
    name: 'requestAmount',
    header: '신청 금액',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1,
    render: ({ value })=> <p className={'won'}>{decimalFormat(value)}</p>
  },
  {
    name: 'updateAt',
    header: '상태 변경일',
    maxWidth: 180,
    resizeable: false,
    defaultFlex: 2
  },
  {
    name: 'etc',
    header: '비고',
    maxWidth: 447,
    resizeable: false,
    defaultFlex: 3
  }
]


export const accountHistoryDataAtom = atom([])


export const accountHistorySetting = {
  default: {
    textAlign: "center",
  },
  setColumns: [
    {
      target: 0,
      value: {
      },
    }
  ]
}

export const accountUpdateInvoiceStatus = { // 정산 이력 수정
  invoiceIdList : [],
  invoiceStatus : ""
}
export const accountConfirmColumns = [ //정산 심사 테이블
  {
    name: 'id',
    header: 'id',
    maxWidth: 0,
    defaultVisible: false,
    resizeable: false,
  },
  {
    name: 'recordMonth',
    header: '정산연월',
    maxWidth: 100,
    resizeable: false,
    defaultFlex: 1
  },
  {
    name: 'status',
    header: '신청 상태',
    maxWidth: 100,
    resizeable: false,
    defaultFlex: 1,
    render: ({ value })=> <>{status[value]}</>
  },
  {
    name: 'mediaName',
    header: '매체명',
    maxWidth: 100,
    resizeable: false,
    defaultFlex: 1
  },
  {
    name: 'username',
    header: '매체 아이디',
    maxWidth: 100,
    resizeable: false,
    defaultFlex: 1
  },
  {
    name: 'requesterId',
    header: '신청 아이디',
    maxWidth: 100,
    resizeable: false,
    defaultFlex: 1
  },
  {
    name: 'revenueAmount',
    header: '수익금',
    maxWidth: 100,
    resizeable: false,
    defaultFlex: 1,
    render: ({ value })=> <p className={'won'}>{decimalFormat(value)}</p>
  },
  {
    name: 'requestAmount',
    header: '신청 금액(VAT별도)',
    maxWidth: 100,
    resizeable: false,
    defaultFlex: 1,
    render: ({ value })=> <p className={'won'}>{decimalFormat(value)}</p>
  },
  {
    name: 'requestAmountVAT',
    header: '신청 금액(VAT포함)',
    maxWidth: 100,
    resizeable: false,
    defaultFlex: 1,
    render: ({data}) => {
      let vat = data.taxYn === 'Y' ? data.requestAmount+(data.requestAmount/10): data.requestAmount;
      return (
        <span className={'won'}>{decimalFormat(vat)}</span>
      )
    }
  },
  {
    name: 'revenueBalance',
    header: '수익 잔액',
    maxWidth: 100,
    resizeable: false,
    defaultFlex: 1,
    render: ({ value })=> <p className={'won'}>{decimalFormat(value)}</p>
  },
  {
    name: 'taxYn',
    header: '과세 여부',
    maxWidth: 70,
    resizeable: false,
    defaultFlex: 1,
    render: ({ value })=> value === 'Y' ? '과세' : '면세'
  },
  {
    name: 'grossCalculate',
    header: '그로스 정산% / 그로스 정산금',
    maxWidth: 100,
    resizeable: false,
    defaultFlex: 1,
    render: ({data}) => {
      return (
        <>
          <p>{data.grossCalculate}% /</p>
          <p>{data?.grossSettlement}</p>
        </>
      )
    }
  },
  {
    name: 'grossFee',
    header: '그로스 수수료',
    maxWidth: 120,
    resizeable: false,
    defaultFlex: 1
  },
  {
    name: 'updateAt',
    header: '상태 변경일',
    maxWidth: 100,
    resizeable: false,
    defaultFlex: 1
  },
  {
    name: 'etc',
    header: '비고',
    maxWidth: 200,
    resizeable: false,
    defaultFlex: 1
  }
]

export const accountConfirmSetting = {
  default: {
    textAlign: "center",
  },
  setColumns: [
    {
      target: 0,
      value: {
      }
    }
  ]
}

export const accountDataColumns = [ //정산 데이터 관리 테이블
  {
    name: 'recordMonth',
    header: '정산연월',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1
  },
  {
    name: 'status',
    header: '신청 상태',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1,
    render: ({ value })=> <>{status[value]}</>
  },
  {
    name: 'mediaName',
    header: '매체명',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1
  },
  {
    name: 'username',
    header: '매체 아이디',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1
  },
  {
    name: 'requesterId',
    header: '신청 아이디',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1
  },
  {
    name: 'requestAmount',
    header: '신청 금액',
    maxWidth: 155,
    resizeable: false,
    defaultFlex: 1,
    render: ({ value })=> <p className={'won'}>{decimalFormat(value)}</p>
  },
  {
    name: 'updateAt',
    header: '상태 변경일',
    maxWidth: 180,
    resizeable: false,
    defaultFlex: 2
  },
  {
    name: 'etc',
    header: '비고',
    maxWidth: 447,
    resizeable: false,
    defaultFlex: 3
  }
]