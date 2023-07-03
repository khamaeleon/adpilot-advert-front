import {
  Board,
  BoardHeader,
  BoardSearchDetail,
  BoardSearchResult,
  ColSpan1, ColSpan3, Input,
  RowSpan,
  selectStyle
} from "../../assets/GlobalStyles";
import React from "react";
import Select from "react-select";
import {SearchButton} from "./styles/common";
import Table from "../../components/table";
import {Link} from "react-router-dom";

const option = [
  {key: 0, value: 'name', label: '광고주명'},
  {key: 1, value: 'userId', label: '광고주 아이디'},
  {key: 2, value: 'campaign', label: '캠페인명'},
  {key: 3, value: 'changer', label: '변경자 아이디'},
  {key: 4, value: 'code', label: '캠페인 코드'},
]

const columns = [
  {
    name: 'name',
    header: '광고주명',
  },
  {
    name: 'id',
    header: '광고주아이디',
  },
  {
    name: 'campaignCode',
    header: '캠페인 코드',
  },
  {
    name: 'campaignName',
    header: '캠페인 명',
    render: (props) =>{
      return (
        <Link to={'/board/historyCampaignDetail'} state={props.cellProps.id}>{props.value}</Link>
      )
    }
  },{
    name: 'history',
    header: '변경 항목',
  },
  {
    name: 'date',
    header: '변경 일시',
  },
  {
    name: 'changer',
    header: '변경인 아이디',
  },
]

export function HistoryCampaignManage () {
  const dataSource = [
    {
      name: '김김김',
      id: '아이디',
      campaignCode: '1234',
      campaignName: '나이키 특별 기획전',
      history:'예산 설정',
      date: 'yyyy-mm-dd',
      changer: '누구야'
    },
  ]
  return (
    <Board>
      <BoardHeader>캠페인 이력 관리</BoardHeader>
      <BoardSearchDetail column={true}>
        <RowSpan>
          <ColSpan1>
            <Select styles={selectStyle} options={option} onChange={(e) => console.log(e.value)}/>
          </ColSpan1>
          <ColSpan3>
            <Input/>
            <SearchButton>검색</SearchButton>
          </ColSpan3>
        </RowSpan>
      </BoardSearchDetail>
      <BoardSearchResult>
        <Table columns={columns}
               data={dataSource}
               downloadList={true}
               emptyText={'캠페인 이력 변경 내역이 없습니다.'}/>
      </BoardSearchResult>
    </Board>
  )
}