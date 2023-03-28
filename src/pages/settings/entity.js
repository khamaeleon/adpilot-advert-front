import {decimalFormat} from "../../common/StringUtils";
import {atom} from "jotai/index";
import {Link} from "react-router-dom";
import React from "react";

export const eventUnitPriceDataAtom = atom(null)
export const eventUnitPriceDetailDataAtom = atom(null)

export const adverEventPriceColumns = [ //이벤트 단가 컬럼
  {
    name: 'brandName',
    header: '광고주명',
    defaultFlex: 1,
    cellProps: {
      style: {
        textDecoration: 'underline'
      }
    },
    render: (props) => {
      return (
        <Link to={'/board/settings/detail'} state={{id: props.data.username}}>{props.value}</Link>
      )
    }
  },
  {
    name: 'username',
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
    name: 'count',
    header: '등록된 이벤트 단가 그룹',
    defaultFlex: 1,
    resizable: false
  }
]


export const eventUnitPriceDetailColumns = [ //이벤트 단가 상세 컬럼
  {
    name: 'priceEventName',
    header: '이벤트 단가 그룹명',
    defaultFlex: 1,
  },
  {
    name: 'shopperMatching',
    header: '쇼퍼 맞춤',
    defaultFlex: 1,
    resizable: false,
    render: ({ value })=> <p className={'won'}>{decimalFormat(value)}</p>
  },
  {
    name: 'cartRecommendations',
    header: '카트 추천',
    defaultFlex: 1,
    resizable: false,
    render: ({ value })=> <p className={'won'}>{decimalFormat(value)}</p>
  },
  {
    name: 'productRecommendations',
    header: '상품 추천',
    defaultFlex: 1,
    resizable: false,
    render: ({ value })=> <p className={'won'}>{decimalFormat(value)}</p>
  },
  {
    name: 'userMatching',
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
    name: 'userOptimization',
    header: '유저 최적화',
    defaultFlex: 1,
    resizable: false,
    render: ({ value })=> <p className={'won'}>{decimalFormat(value)}</p>
  }
]
export const budgetEventDataAtom = atom(null)
export const eventBudgetDetailDataAtom = atom(null)

export const adverEventBudgetColumns = [ //이벤트 단가 컬럼
  {
    name: 'brandName',
    header: '광고주명',
    defaultFlex: 1,
    cellProps: {
      style: {
        textDecoration: 'underline'
      }
    },
    render: (props) => {
      return (
        <Link to={'/board/budgetEvent/detail'} state={{id: props.data.username}}>{props.value}</Link>
      )
    }
  },
  {
    name: 'username',
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
    name: 'count',
    header: '등록된 이벤트 단가 그룹',
    defaultFlex: 1,
    resizable: false
  }
]
export const budgetEventDetailColumns = [ //이벤트 예산 상세 컬럼
  {
    name: 'budgetEventName',
    header: '이벤트 단가 그룹명',
    defaultFlex: 1,
  },
  {
    name: 'shopperMatching',
    header: '쇼퍼 맞춤',
    defaultFlex: 1,
    resizable: false,
    render: ({ value })=> <p className={'pct'}>{value}</p>
  },
  {
    name: 'cartRecommendations',
    header: '카트 추천',
    defaultFlex: 1,
    resizable: false,
    render: ({ value })=> <p className={'pct'}>{value}</p>
  },
  {
    name: 'productRecommendations',
    header: '상품 추천',
    defaultFlex: 1,
    resizable: false,
    render: ({ value })=> <p className={'pct'}>{value}</p>
  },
  {
    name: 'userMatching',
    header: '유저매치',
    defaultFlex: 1,
    resizable: false,
    render: ({ value })=> <p className={'pct'}>{value}</p>
  },
  {
    name: 'audience',
    header: '오디언스',
    defaultFlex: 1,
    resizable: false,
    render: ({ value })=> <p className={'pct'}>{value}</p>
  },
  {
    name: 'userOptimization',
    header: '유저 최적화',
    defaultFlex: 1,
    resizable: false,
    render: ({ value })=> <p className={'pct'}>{value}</p>
  }
]
