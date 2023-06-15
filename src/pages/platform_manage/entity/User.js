import {atom} from "jotai";
import {hostList} from "../../signup/entity/Common";
import {Link} from "react-router-dom";
import moment from "moment";
import React from "react";

export const accountInfoAtom = atom(null)
export const userInfoAtom = atom(null)

/**
 * 광고주 타입
 * @type {[{label: string, value: string, key: string},{label: string, value: string, key: string},{label: string, value: string, key: string}]}
 */
export const adverType = [
  {key: "1", value: "ALL", label: "전체"},
  {key: "2", value: "ADVER", label: "광고주"},
  {key: "3", value: "AGENCY", label: "대행사"},
]

/**
 * 광고주 계정 사용여부
 * @type {[{id: string, label: string, value: string},{id: string, label: string, value: string},{id: string, label: string, value: string}]}
 */
export const selectAccountUseInfo = [
  {key: "1", value: "ALL", label: "전체"},
  {key: "2", value: "NORMAL", label: "사용중"},
  {key: "3", value: "SUSPEND", label: "미사용"},
]


/**
 * 광고주 계정 검색 타입
 * @type {[{label: string, value: string, key: string},{label: string, value: string, key: string},{label: string, value: string, key: string},{label: string, value: string, key: string},{label: string, value: string, key: string}]}
 */
export const selectKeywordType = [
  {key:"1",value:"ADVER_NAME",label:"광고주명"},
  {key:"2",value:"USERNAME",label:"아이디"},
  {key:"3",value:"COMPANY_NAME",label:"상호명"},
  {key:"4",value:"MANAGER_NAME",label:"담당자명"},
  {key:"5",value:"MANAGER_EMAIL",label:"담당자 이메일"}
]

/**
 * 검색 조건
 * @type {{activeYn: {id: string, label: string, value: string}, phoneNumber: string, siteName: string, mediaType: {id: string, label: string, value: string}, selectAdminType: {id: string, label: string, value: string}, userId: string, mediaSearchType: {id: string, label: string, value: string}}}
 */
export const searchAccountInfo = {
  pageSize: 50,
  currentPage: 1,
  adverType: null,
  hostType: null,
  accountStateType: null,
  searchType: null,
  keyword: null
}




/**
 * 사용자 리스트 컬럼 설정
 * @type {[{name: string, header: string},{name: string, header: string, render: (function({value: *}): *)},{name: string, header: string, render: (function(*): *)},{name: string, header: string},{name: string, header: string},null,null]}
 */
export const columnUserData = [
  {
    name: 'adverName',
    header: '광고주명'
  },
  {
    name: 'adverType',
    header: '광고주 구분',
    render: ({value}) => {
      return (
        <>{value === 'ADVER' ? "광고주" : "대행사"}</>
      )
    }
  },
  {
    name: 'hostType',
    header: '호스팅',
    render: ({value}) => {
      return (
        <>{hostList.find(obj => obj.value === value).label}</>
      )
    }
  },
  {
    name: 'username',
    header: '아이디',
    cellProps: {
      style: {
        textDecoration: 'underline'
      }
    },
    render: (props) => {
      return (
        <Link to={'/board/platformDetail'} state={{id: props.data.id}}>{props.data?.username}</Link>
      )
    }
  },
  {
    name: 'userCompanyProfile',
    header: '상호명',
    render: ({value})=> {
      return (
        <span>{value.companyName}</span>
      )
    }
  },
  {
    name: 'managerName',
    header: '담당자명'
  },
  {
    name: 'managerEmail',
    header: '이메일',
  },
  {
    name: 'createdAt',
    header: '가입 일시',
    render: ({value}) => {
      return (
        <span>{moment(value).format('YYYY년 MM월 DD일')}</span>
      )
    }
  },
  {
    name: 'status',
    header: '사용 여부',
    render: ({value}) => {
      return (
        <>{value !== 'NORMAL' ? "미사용" : "사용"}</>
      )
    }
  },
]


