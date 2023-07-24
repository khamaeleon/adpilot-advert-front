import {Board, BoardHeader, BoardSearchDetail, BoardSearchResult} from "../../assets/GlobalStyles";
import React, {useEffect, useState} from "react";
import Table from "../../components/table";
import {findRevisionTargetingPriceList} from "../../services/Platform/HistoryAxios";
import {budgetPriceColumns, HistorySearchCondition, searchConditionData} from "./entity/History";

const option = [
  {key: 0, value: 'DEFAULT', label: '전체'},
  {key: 1, value: 'ADVER_NAME', label: '광고주명'},
  {key: 2, value: 'USER_NAME', label: '광고주 아이디'},
  {key: 3, value: 'TARGETING_PRICE_GROUP_NAME', label: '이벤트 단가 그룹명'},
  {key: 4, value: 'MODIFIED_BY', label: '변경자 아이디'}
]

export function HistoryPriceManage () {
  const [searchCondition, setSearchCondition] = useState(searchConditionData)
  const [dataSource, setDataSource] = useState([])

  useEffect(() => {
    findRevisionTargetingPriceList(searchCondition).then(response =>{
      if(response) {
        setDataSource(response.rows)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeSearchKeywordType = (e) => {
    if(e.value === 'DEFAULT') {
      setSearchCondition({
        ...searchCondition,
        searchKeywordType: e.value,
        searchKeyword: ''
      })
    } else {
      setSearchCondition({
        ...searchCondition,
        searchKeywordType: e.value
      })
    }
  }

  const handleChangeSearchKeyword = (e) => {
    setSearchCondition({
      ...searchCondition,
      searchKeyword: e.target.value
    })
  }

  const handleClickSearch = () =>{
    findRevisionTargetingPriceList(searchCondition).then(response =>{
      setDataSource(response.rows)
    })
  }
  return (
    <Board>
      <BoardHeader>이벤트 단가 이력 현황</BoardHeader>
      <BoardSearchDetail column={true}>
        <HistorySearchCondition
          option={option}
          searchCondition={searchCondition}
          setSearchCondtion={setSearchCondition}
          handleChangeSearchKeyword={handleChangeSearchKeyword}
          handleChangeSearchKeywordType={handleChangeSearchKeywordType}
          handleClickSearch={handleClickSearch}/>
      </BoardSearchDetail>
      <BoardSearchResult>
        <Table columns={budgetPriceColumns}
               data={dataSource}
               downloadList={true}
               emptyText={'이벤트 단가 변경 내역이 없습니다.'}/>
      </BoardSearchResult>
    </Board>
  )
}