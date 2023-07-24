import {Link} from "react-router-dom";
import React from "react";
import {
  BoardSearchDetail,
  ColSpan4,
  GraySearchButton,
  Input,
  RowSpan,
  SearchInput,
  selectStyle,
} from "../../../assets/GlobalStyles";
import Select from "react-select";
import styled, {keyframes} from "styled-components";

export const campaignColumns = [
  {
    name: 'revisionId',
    defaultVisible: false
  },
  {
    name: 'adverName',
    header: '광고주명',
    textAlign: 'center'
  },
  {
    name: 'username',
    header: '광고주아이디',
    textAlign: 'center'
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
    render: (props) =>{
      return (
        <div style={{textAlign:'center'}}>{props.value === 'ADD' ? '추가' : (props.value === 'DEL' ? '삭제' : '수정')}</div>
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
  pageSize : 100,
  currentPage : 1,
  searchStartDate : null,
  searchEndDate : null,
  sortType : null,
  searchKeywordType : 'DEFAULT',
  searchKeyword : ''
}

export function HistorySearchCondition (props) {
  const {option,searchCondition,handleChangeSearchKeyword, handleChangeSearchKeywordType, handleClickSearch} = props

  return (
    <BoardSearchDetail>
      <div style={{marginRight: 10}}>
        <RowSpan style={{justifyContent: 'flex-start', marginTop:0}}>
          <ColSpan4>
            {/*<Span2>검색어</Span2>*/}
              <Select styles={selectStyle}
                      options={option}
                      width={133}
                      value={searchCondition.searchKeywordType !== null ? option.find(item => item.value === searchCondition.searchKeywordType) : option[0]}
                      onChange={handleChangeSearchKeywordType}/>
            <SearchInput>
              <Input type={'text'}
                     placeholder={'검색어를 입력해주세요.'}
                     value={searchCondition.searchKeyword}
                     style={{marginRight: 0}}
                     readOnly={searchCondition.searchKeywordType === 'DEFAULT'}
                     onKeyDown={e => (e.key === 'Enter') && handleClickSearch()}
                     onChange={handleChangeSearchKeyword}/>
            </SearchInput>
          </ColSpan4>
        </RowSpan>
      </div>
      <GraySearchButton onClick={handleClickSearch}>검색</GraySearchButton>
    </BoardSearchDetail>
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