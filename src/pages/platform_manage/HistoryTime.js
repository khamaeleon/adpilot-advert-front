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
  {key: 2, value: 'eventTimeGroup', label: '시간별 예산 그룹명'},
  {key: 3, value: 'changer', label: '변경자 아이디'},
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
    name: 'eventTimeGroup',
    header: '시간별 예산 그룹명',
    render: ({value, cellProps})=> {
      return (
        <Link to={'/board/historyTimeDetail'} state={cellProps.id}>{value}</Link>
      )
    }
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
export function HistoryTimeManage () {
  const dataSource = [
    {
      name: '나이키',
      id:'Nike12',
      eventTimeGroup:'쇼핑 극대화 그룹',
      date:'YYYY.MM.DD HH:MM',
      changer:' gildong12@gmail.com',
    }
  ]
  return (
    <Board>
      <BoardHeader>시간별 예산 이력 관리</BoardHeader>
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