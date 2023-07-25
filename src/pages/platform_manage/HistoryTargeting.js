import {Board, BoardHeader, BoardSearchDetail, BoardSearchResult} from "../../assets/GlobalStyles";
import React, { useCallback, useState} from "react";
import Table from "../../components/table";
import {  findRevisionTargetingBudgetList} from "../../services/Platform/HistoryAxios";
import {HistorySearchCondition, searchConditionData, targetingColumns} from "./entity/History";
import {dataTotalInfo} from "../../components/common/entity";

const option = [
  {key: 0, value: 'DEFAULT', label: '전체'},
  {key: 1, value: 'ADVER_NAME', label: '광고주명'},
  {key: 2, value: 'USER_NAME', label: '광고주 아이디'},
  {key: 3, value: 'TARGETING_BUDGET_GROUP_NAME', label: '이벤트 예산 그룹명'},
  {key: 4, value: 'MODIFIED_BY', label: '변경자 아이디'},
]

export function HistoryTargetingManage () {
  const [searchCondition, setSearchCondition] = useState(searchConditionData);
  const [totalInfo, setTotalInfo] = useState(dataTotalInfo);
  const [isSearch, setIsSearch] = useState(false);

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
    setIsSearch(true)
  }

  const loadData = ({skip, limit}) => {
    let params = {
      ...searchCondition,
      currentPage: skip/limit + 1,
      pageSize: limit
    }

    return findRevisionTargetingBudgetList(params).then(response => {
      const totalCount = response.totalCount;
      setIsSearch(false);
      setTotalInfo({
        totalCount: response.totalCount,
        currentPage: response.currentPage,
        totalPages: response.totalPages
      });
      return {data: response.rows, count: parseInt(totalCount)};
    })
  }
  const dataSource = useCallback(loadData, [searchCondition.currentPage, isSearch])

  return (
    <Board>
      <BoardHeader>이벤트 예산 이력 현황</BoardHeader>
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
        <Table columns={targetingColumns}
               downloadList={true}
               totalCount={[totalInfo.totalCount, '이벤트 예산 이력']}
               emptyText={'이벤트 예산 변경 내역이 없습니다.'}
               defaultLimit={searchCondition.pageSize}
               data={dataSource}
               pagination
        />
      </BoardSearchResult>
    </Board>
  )
}