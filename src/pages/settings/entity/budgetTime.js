import {atom} from "jotai/index";
import {Link} from "react-router-dom";
import {Icon} from "../../../components/table";
import React from "react";


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
