import {dateFormat, decimalFormat} from "../../common/StringUtils";
import {getToDay} from "../../common/DateUtils";
import {atom} from "jotai/index";
import {Icon} from "../../components/table";
import {Link} from "react-router-dom";
import React from "react";

export const accountProfile = atom({ // 매체 계정 프로필 조회
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
})


export const accountInfoSetting = {
  default: {
    textAlign: "center",
    showColumnMenuTool: false,
  },
  setColumns: [
    {
      target: 0,
      value: {
      },
    }
  ]
}

export const accountInfoTable = atom([])

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
export const eventUnitPriceDataAtom = atom([//이벤트 단가 데이타
  {
    mediaName: '네이트',
    mediaId: 'nate9988',
    managerName: '홍길동',
    eventUnitGroup: 10
  }
])

export const eventUnitPriceColumns = [ //이벤트 단가 컬럼
  {
    name: 'mediaName',
    header: '광고주명',
    defaultFlex: 1,
    cellProps: {
      style: {
        textDecoration: 'underline'
      }
    },
    render: (props) => {
      return (
        <Link to={'/board/settings/detail'} state={{id: props.data.id}}>{props.value}</Link>
      )
    }
  },
  {
    name: 'mediaId',
    header: '아이디',
    defaultFlex: 1,
    resizable: false,
  },
  {
    name: 'managerName',
    header: '담당자',
    defaultFlex: 1,
    resizable: false,
  },
  {
    name: 'eventUnitGroup',
    header: '등록된 이벤트 단가 그룹',
    defaultFlex: 1,
    resizable: false,
  }
]

export const eventUnitPriceSetting = {
  default: {
    textAlign: "center",
    showColumnMenuTool: false,
  },
  setColumns: [
    {
      target: 0,
      value: {
      },
    }
  ]
}

export const eventUnitPriceDetailDataAtom = atom([//이벤트 단가 데이타
  {
    groupName: '고단가 그룹',
  }
])

export const eventUnitPriceDetailColumns = [ //이벤트 단가 상세 컬럼
  {
    name: 'groupName',
    header: '이벤트 단가 그룹명',
    defaultFlex: 1,
  },
  {
    name: 'shopper',
    header: '쇼퍼 맞춤',
    defaultFlex: 1,
    resizable: false,
    render: ({ value })=> <p className={'won'}>{decimalFormat(value)}</p>
  },
  {
    name: 'cart',
    header: '카트 추천',
    defaultFlex: 1,
    resizable: false,
    render: ({ value })=> <p className={'won'}>{decimalFormat(value)}</p>
  },
  {
    name: 'product',
    header: '상품 추천',
    defaultFlex: 1,
    resizable: false,
    render: ({ value })=> <p className={'won'}>{decimalFormat(value)}</p>
  },
  {
    name: 'userMatch',
    header: '유저매치',
    defaultFlex: 1,
    resizable: false,
    render: ({ value })=> <p className={'won'}>{decimalFormat(value)}</p>
  },
  {
    name: 'audience',
    header: '오디언스',
    defaultFlex: 1,
    resizable: false,
    render: ({ value })=> <p className={'won'}>{decimalFormat(value)}</p>
  },
  {
    name: 'userOptimize',
    header: '유저 최적화',
    defaultFlex: 1,
    resizable: false,
    render: ({ value })=> <p className={'won'}>{decimalFormat(value)}</p>
  }
]

export const eventUnitPriceDetailSetting = {
  default: {
    textAlign: "center",
    showColumnMenuTool: false,
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
  invoiceStatus : "",
  etc : ""
}
export const accountConfirmColumns = [ //정산 심사 테이블
  {
    name: 'id',
    header: 'id',
    defaultVisible: false,
  },
  {
    name: 'recordMonth',
    header: '정산연월',
    width: 120,
  },
  {
    name: 'status',
    header: '신청 상태',
    width: 120,
    render: ({ value })=> <>{value.label}</>
  },
  {
    name: 'mediaName',
    header: '매체명',
  },
  {
    name: 'username',
    header: '매체 아이디',
  },
  {
    name: 'requesterId',
    header: '신청 아이디',
  },
  {
    name: 'revenueAmount',
    header: '수익금',
    render: ({ value })=> <p className={'won'}>{decimalFormat(value)}</p>
  },
  {
    name: 'requestAmount',
    header: '신청 금액(VAT별도)',
    width: 160,
    render: ({ value })=> <p className={'won'}>{decimalFormat(value)}</p>
  },
  {
    name: 'requestAmountVAT',
    header: '신청 금액(VAT포함)',
    width: 160,
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
    render: ({ value })=> <p className={'won'}>{decimalFormat(value)}</p>
  },
  {
    name: 'taxYn',
    header: '과세 여부',
    width: 100,
    render: ({ value })=> value === 'Y' ? '과세' : '면세'
  },
  {
    name: 'grossCalculate',
    header: () => {
      return(
        <div><p>그로스 정산% /</p><p>그로스 정산금</p></div>
      )
    },
    width: 135,
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
    width: 130,
  },
  {
    name: 'updateAt',
    header: '상태 변경일',
    width: 120,
  },
  {
    name: 'etc',
    header: '비고',
    width: 50,
    sortable: false,
    render: ({ value, cellProps, props }) => {
      return <Icon icon={'memo'} value={value} cellProps={cellProps}/>
    }
  }
]

export const accountConfirmSetting = {
  default: {
    textAlign: "center",
    showColumnMenuTool: false,
  },
  setColumns: [
    {
      target: 1,
      value: {
      }
    }
  ]
}

export const accountDataColumns = [ //정산 데이터 관리 테이블
  {
    name: 'recordMonth',
    header: '정산연월',
    defaultWidth: 120,
    resizable: false,
  },
  {
    name: 'status',
    header: '신청 상태',
    minWidth: 120,
    maxWidth: 120,
    render: ({ value })=> <>{value.label}</>
  },
  {
    name: 'mediaName',
    header: '매체명',
    defaultFlex: 1,
  },
  {
    name: 'username',
    header: '매체 아이디',
    defaultFlex: 1,
  },
  {
    name: 'requesterId',
    header: '신청 아이디',
    defaultFlex: 1,
  },
  {
    name: 'requestAmount',
    header: '신청 금액',
    defaultFlex: 1,
    render: ({ value })=> <p className={'won'}>{decimalFormat(value)}</p>
  },
  {
    name: 'updateAt',
    header: '상태 변경일',
    minWidth: 120,
    maxWidth: 120,
  },
  {
    name: 'etc',
    header: '비고',
    defaultFlex: 2,
  }
]

export const accountDataSetting = {
  default: {
    textAlign: "center",
    showColumnMenuTool: false,
  },
  setColumns: [
    {
      target: 0,
      value: {
      }
    }
  ]
}

export const grossCalculateOption = [
  {id: "1", value: 1.1, label: "1.1%"},
  {id: "2", value: 2.2, label: "2.2%"},
  {id: "3", value: 3.3, label: "3.3%"},
  {id: "4", value: 4.4, label: "4.4%"},
]