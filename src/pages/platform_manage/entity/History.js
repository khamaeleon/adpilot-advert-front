import {Link} from "react-router-dom";
import React from "react";
import {ColSpan1, ColSpan3, Input, RowSpan, selectStyle} from "../../../assets/GlobalStyles";
import Select from "react-select";
import {SearchButton} from "../styles/common";
import styled, {keyframes} from "styled-components";

export const campaignColumns = [
  {
    name: 'revisionId',
    defaultVisible: false
  },
  {
    name: 'adverName',
    header: '광고주명',
  },
  {
    name: 'username',
    header: '광고주아이디',
  },
  {
    name: 'campaignId',
    header: '캠페인 코드',
  },
  {
    name: 'campaignName',
    header: '캠페인 명',
    minWidth: 350,
    render: (props) =>{
      return (
        <Link to={'/board/historyCampaignDetail'} state={props.cellProps.data.revisionId} style={{wordBreak: 'break-word'}}>{props.value}</Link>
      )
    }
  },
  {
    name: 'revisionType',
    header: '변경 항목',
  },
  {
    name: 'revisionDateTime',
    header: '변경 일시',
  },
  {
    name: 'modifiedBy',
    header: '변경인 아이디',
  },
]

export const budgetPriceColumns = [
  {
    name: 'revisionId',
    defaultVisible: false
  },
  {
    name: 'adverName',
    header: '광고주명',
  },
  {
    name: 'username',
    header: '광고주아이디',
  },
  {
    name: 'groupName',
    header: '이벤트 단가 그룹명',
    render: ({value, cellProps}) => {
      console.log(cellProps)
      return (
        <Link to={'/board/historyPriceDetail'} state={cellProps.data.revisionId}>{value}</Link>
      )
    }
  },
  {
    name: 'revisionDateTime',
    header: '변경 일시',
  },
  {
    name: 'modifiedBy',
    header: '변경인 아이디',
  },
]

export const targetingColumns = [
  {
    name: 'revisionId',
    defaultVisible: false
  },
  {
    name: 'adverName',
    header: '광고주명',
  },
  {
    name: 'username',
    header: '광고주아이디',
  },
  {
    name: 'groupName',
    header: '이벤트 예산 그룹명',
    render: ({value, cellProps}) => {
      return (
        <Link to={'/board/historyEventDetail'} state={cellProps.data.revisionId}>{value}</Link>
      )
    }
  },
  {
    name: 'revisionDateTime',
    header: '변경 일시',
  },
  {
    name: 'modifiedBy',
    header: '변경인 아이디',
  },
]

export const budgetTimeColumns = [
  {
    name: 'revisionId',
    defaultVisible: false,
  },
  {
    name: 'adverName',
    header: '광고주명',
  },
  {
    name: 'username',
    header: '광고주아이디',
  },
  {
    name: 'groupName',
    header: '시간별 예산 그룹명',
    render: ({value, cellProps})=> {
      return (
        <Link to={'/board/historyTimeDetail'} state={cellProps.data.revisionId}>{value}</Link>
      )
    }
  },
  {
    name: 'revisionDateTime',
    header: '변경 일시',
  },
  {
    name: 'modifiedBy',
    header: '변경인 아이디',
  },
]

export const searchConditionData = {
  pageSize : 10,
  currentPage : 1,
  searchStartDate : null,
  searchEndDate : null,
  sortType : null,
  searchKeywordType : null,
  searchKeyword : null
}

export function HistorySearchCondition (props) {
  const {option,searchCondition,handleChangeSearchKeyword, handleChangeSearchKeywordType, handleClickSearch} = props

  return (
    <RowSpan>
      <ColSpan1>
        <Select styles={selectStyle} options={option} value={option.find(item => item.value === searchCondition.searchKeywordType)} onChange={handleChangeSearchKeywordType}/>
      </ColSpan1>
      <ColSpan3>
        <Input type={'text'} value={searchCondition.searchKeyword || ''} onChange={handleChangeSearchKeyword}/>
        <SearchButton onClick={handleClickSearch}>검색</SearchButton>
      </ColSpan3>
    </RowSpan>
  )
}

const opacity = keyframes`
	0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

export const Loading = styled.div`
  animation: ${opacity} 1s;
`