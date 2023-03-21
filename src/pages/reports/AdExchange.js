import React, {useCallback, useState} from "react";
import {useAtom, useAtomValue} from "jotai/index";
import {Board, BoardHeader, BoardSearchResult,} from "../../assets/GlobalStyles";
import {
  reportsAdExchangeAtom,
  reportsStaticsAdExchange,
  reportsStaticsAdExchangeByInventoryColumn,
  reportsStaticsAdExchangeColumn,
} from "./entity";
import {selectReportsStaticsAdExchange, selectReportsStaticsAdExchangeByInventory} from "../../services/ReportsAxios";
import TableDetail from "../../components/table/TableDetail";
import {ReportsCondition} from "../../components/reports/Condition";

/**
 * 스타일
 * @param event
 */
const groupStyle = {
  textAlign: 'center',
  backgroundColor: '#fafafa',
  color: '#b2b2b2'
}

const groups = [
  {name: 'defaultData', header: '연동 데이터', headerStyle: groupStyle},
  {name: 'platformData', header: '플랫폼 데이터', headerStyle: groupStyle},
]
/** 외부연동수신 보고서 **/
export default function ReportsReception() {
  const [searchCondition, setSearchCondition] = useAtom(reportsAdExchangeAtom)
  const dataStaticsAdExchange = useAtomValue(reportsStaticsAdExchange)
  const [totalCount, setTotalCount] = useState(0)
  /**
   * 아코디언 데이타 페칭
   * @param event
   */
  const handleFetchDetailData = async ({inventoryId}) => {
    const fetchData = await selectReportsStaticsAdExchangeByInventory(inventoryId, searchCondition)
    if (fetchData !== false) {
      return fetchData.rows
    } else {
      return dataStaticsAdExchange.rows
    }
  }
  /**
   * 기본 데이타
   * @param event
   */
  const dataSource = useCallback(async ({skip, sortInfo, limit}) => {
    const condition = {
      ...searchCondition,
      pageSize: 10,
      currentPage: 1,
      sortType: null
    }
    const fetchData = await selectReportsStaticsAdExchange(condition).then(response => {
      const data = response.rows
      setTotalCount(response.totalCount)
      return {data, count: response.totalCount}
    });
    return fetchData
  }, [searchCondition]);

  return (
    <Board>
      <BoardHeader>외부 연동 수신 보고서</BoardHeader>
      <ReportsCondition searchCondition={searchCondition} setSearchCondition={setSearchCondition}/>
      <BoardSearchResult>
        <TableDetail columns={reportsStaticsAdExchangeColumn}
                     data={dataSource}
                     detailData={handleFetchDetailData}
                     detailColumn={reportsStaticsAdExchangeByInventoryColumn}
                     detailGroups={groups}
                     idProperty={'inventoryId'}
                     totalCount={[totalCount, '보고서']}
                     groups={groups}/>
      </BoardSearchResult>
    </Board>
  )
}
