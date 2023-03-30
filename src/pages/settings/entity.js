import {decimalFormat} from "../../common/StringUtils";
import {atom} from "jotai/index";
import {Link} from "react-router-dom";
import React from "react";
import {Icon} from "../../components/table";
export const saveTypeAtom =atom('create')
/**
 * 이벤트 단가 광고주 리스트 Atom
 * @type {Atom<unknown>}
 */
export const eventUnitPriceDataAtom = atom(null)

/**
 * 이벤트 단가 광고주별 상세 리스트 Atom
 * @type {Atom<unknown>}
 */
export const eventUnitPriceDetailDataAtom = atom(null)

/**
 * 이벤트 단가 광고주 리스트 컬럼세팅
 * @type {[{defaultFlex: number, name: string, cellProps: {style: {textDecoration: string}}, header: string, render: (function(*): *)},{defaultFlex: number, resizable: boolean, name: string, header: string},{defaultFlex: number, resizable: boolean, name: string, header: string},{defaultFlex: number, resizable: boolean, name: string, header: string}]}
 */
export const adverEventPriceColumns = [
  {
    name: 'adverName',
    header: '광고주명',
    defaultFlex: 1,
    cellProps: {
      style: {
        textDecoration: 'underline'
      }
    },
    render: (props) => {
      return (
        <Link to={'/board/settingsDetail'} state={{id: props.data.userId}}>{props.value}</Link>
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

/**
 * 이벤트 단가 광고주별 상세 리스트 컬럼 세팅
 * @type {[{defaultFlex: number, name: string, header: string},{defaultFlex: number, resizable: boolean, name: string, header: string, render: (function({value: *}): *)},{defaultFlex: number, resizable: boolean, name: string, header: string, render: (function({value: *}): *)},{defaultFlex: number, resizable: boolean, name: string, header: string, render: (function({value: *}): *)},{defaultFlex: number, resizable: boolean, name: string, header: string, render: (function({value: *}): *)},null,null]}
 */
export const eventUnitPriceDetailColumns = [ //이벤트 단가 상세 컬럼
  {
    name: 'groupName',
    header: '이벤트 단가 그룹명',
    defaultFlex: 1,
    render: (props) => {
      return (
        <div style={{display: "flex", alignItems: 'center'}}>
          <p>{props.value}</p>
          <Icon saveType={'edit'} cellProps={props.cellProps.data} label={'won'}/>
        </div>
      )
    }
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

/**
 * 이벤트 예산 광고주 리스트 Atom
 * @type {Atom<unknown>}
 */
export const budgetEventDataAtom = atom(null)

/**
 * 이벤트 예산 광고주 상세 리스트 Atom
 * @type {Atom<unknown>}
 */
export const eventBudgetDetailDataAtom = atom(null)

/**
 * 이벤트 예산 광고주 리스트 컬럼세팅
 * @type {[{defaultFlex: number, name: string, cellProps: {style: {textDecoration: string}}, header: string, render: (function(*): *)},{defaultFlex: number, resizable: boolean, name: string, header: string},{defaultFlex: number, resizable: boolean, name: string, header: string},{defaultFlex: number, resizable: boolean, name: string, header: string}]}
 */
export const adverEventBudgetColumns = [ //이벤트 단가 컬럼
  {
    name: 'adverName',
    header: '광고주명',
    defaultFlex: 1,
    cellProps: {
      style: {
        textDecoration: 'underline'
      }
    },
    render: (props) => {
      return (
        <Link to={'/board/budgetEventDetail'} state={{id: props.data.userId}}>{props.value}</Link>
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

/**
 * 이벤트 예산 광고주 상세 리스트 컬럼세팅
 * @type {[{defaultFlex: number, name: string, header: string},{defaultFlex: number, resizable: boolean, name: string, header: string, render: (function({value: *}): *)},{defaultFlex: number, resizable: boolean, name: string, header: string, render: (function({value: *}): *)},{defaultFlex: number, resizable: boolean, name: string, header: string, render: (function({value: *}): *)},{defaultFlex: number, resizable: boolean, name: string, header: string, render: (function({value: *}): *)},null,null]}
 */
export const budgetEventDetailColumns = [ //이벤트 예산 상세 컬럼
  {
    name: 'groupName',
    header: '이벤트 단가 그룹명',
    defaultFlex: 1,
    render: (props) => {
      return (
        <div style={{display: "flex", alignItems: 'center'}}>
          <p>{props.value}</p>
          <Icon saveType={'edit'} cellProps={props.cellProps.data} label={'pct'}/>
        </div>
      )
    }
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

/**
 * 시간 예산 광고주 리스트 Atom
 * @type {Atom<unknown>}
 */
export const budgetTimeDataAtom = atom(null)

/**
 * 시간 예산 광고주 상세 리스트 Atom
 * @type {Atom<unknown>}
 */
export const timeBudgetDetailDataAtom = atom(null)

/**
 * 시간 예산 광고주 리스트 컬럼세팅
 * @type {[{defaultFlex: number, name: string, cellProps: {style: {textDecoration: string}}, header: string, render: (function(*): *)},{defaultFlex: number, resizable: boolean, name: string, header: string},{defaultFlex: number, resizable: boolean, name: string, header: string},{defaultFlex: number, resizable: boolean, name: string, header: string}]}
 */
export const adverTimeBudgetColumns = [ //시간 단가 컬럼
  {
    name: 'adverName',
    header: '광고주명',
    defaultFlex: 1,
    cellProps: {
      style: {
        textDecoration: 'underline'
      }
    },
    render: (props) => {
      return (
        <Link to={'/board/budgetTime/detail'} state={{id: props.data.userId}}>{props.value}</Link>
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

/**
 * 시간 예산 광고주 상세 리스트 컬럼세팅
 * @type {[{defaultFlex: number, name: string, header: string},{defaultFlex: number, resizable: boolean, name: string, header: string, render: (function({value: *}): *)},{defaultFlex: number, resizable: boolean, name: string, header: string, render: (function({value: *}): *)},{defaultFlex: number, resizable: boolean, name: string, header: string, render: (function({value: *}): *)},{defaultFlex: number, resizable: boolean, name: string, header: string, render: (function({value: *}): *)},null,null]}
 */
export const budgetTimeDetailColumns = [ //시간 예산 상세 컬럼
  {
    name: 'groupName',
    header: '시간별 예산 그룹명',
    defaultFlex: 1,
    render: ({value, cellProps}) => {
      return (
        <div style={{display: "flex", alignItems: 'center'}}><p>{value}</p><Icon saveType={'edit'} cellProps={cellProps.data} label={'pct'} /></div>
      )
    }
  },
  {
    name: 'shopperMatching',
    header: '00:00 – 03:59',
    defaultFlex: 1,
    resizable: false,
    render: ({ value })=> <p className={'pct'}>{value}</p>
  },
  {
    name: 'cartRecommendations',
    header: '04:00 – 07:59',
    defaultFlex: 1,
    resizable: false,
    render: ({ value })=> <p className={'pct'}>{value}</p>
  },
  {
    name: 'productRecommendations',
    header: '08:00 – 11:59',
    defaultFlex: 1,
    resizable: false,
    render: ({ value })=> <p className={'pct'}>{value}</p>
  },
  {
    name: 'userMatching',
    header: '12:00 – 15:59',
    defaultFlex: 1,
    resizable: false,
    render: ({ value })=> <p className={'pct'}>{value}</p>
  },
  {
    name: 'audience',
    header: '16:00 – 19:59',
    defaultFlex: 1,
    resizable: false,
    render: ({ value })=> <p className={'pct'}>{value}</p>
  },
  {
    name: 'userOptimization',
    header: '20:00 – 23:59',
    defaultFlex: 1,
    resizable: false,
    render: ({ value })=> <p className={'pct'}>{value}</p>
  }
]
