import {atom} from "jotai/index";
import {Link} from "react-router-dom";
import React from "react";
import store from "../../../store";
import {cellsAtom} from "../../../components/common/DragToSelect";



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

export const budgetTimeListAtom = atom(null)
export const userIdAtom = atom(null)
export const budgetTimes = [
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
]

export const budgetTimesDirect = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]

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
        <Link to={'/board/budgetTimeList'} state={{id: props.data.userId}}>{props.value}</Link>
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
    header: '이벤트 예산 그룹',
    defaultFlex: 1,
    resizable: false
  }
]

const exposeTimeTypeAll =[
  {id: "1", value: "EQUAL_DISTRIBUTION", label: "균등분배"},
  {id: "2", value: "FAST_EXHAUSTION", label: "빠른소진"},
  {id: "3", value: "DIRECT_SETTINGS", label: "직접설정"}
]

const dayOfWeeksAll =[
  {id: "1", value: "MONDAY", label: "월"},
  {id: "2", value: "TUESDAY", label: "화"},
  {id: "3", value: "WEDNESDAY", label: "수"},
  {id: "4", value: "THURSDAY", label: "목"},
  {id: "5", value: "FRIDAY", label: "금"},
  {id: "6", value: "SATURDAY", label: "토"},
  {id: "7", value: "SUNDAY", label: "일"},
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
    render: (props) => {
      return (
        <Link to={'/board/budgetTimeDetail'} state={{id: props.data.userId,groupId:props.data.eventId}}>{props.value}</Link>
      )
    }
  },
  {
    name: 'exposeTimeType',
    header: '예산 소진 설정',
    defaultFlex: 1,
    resizable: false,
    render: ({value}) => {
      return (
        <span>{exposeTimeTypeAll.find(type => type.value === value).label}</span>
      )
    }
  },
  {
    name: 'dayOfWeeks',
    header: '요일설정',
    defaultFlex: 1,
    resizable: false,
    render: ({value, cellProps}) => {
      return (
        <span>{
          value.map((data) => dayOfWeeksAll.find(type => type.value === data).label).join(',')
        }</span>
      )
    }
  }
]
