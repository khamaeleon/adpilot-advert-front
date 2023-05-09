import {atom} from "jotai/index";
import {Link} from "react-router-dom";
import {Icon} from "../../../components/table";
import React from "react";

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
    name: 'cartRecommendation',
    header: '카트 추천',
    defaultFlex: 1,
    resizable: false,
    render: ({ value })=> <p className={'pct'}>{value}</p>
  },
  {
    name: 'productRecommendation',
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

