import React, {useCallback, useState} from "react";
import styled from "styled-components";
import {reportsStaticsAll, reportsStaticsAllColumn, reportsStaticsAtom} from "./entity";
import {Board, BoardHeader, BoardSearchResult, ChartContainer} from "../../assets/GlobalStyles";

import {useAtom, useAtomValue} from "jotai/index";
import Table from "../../components/table";
import {ReportsCondition} from "../../components/reports/Condition";

import {VerticalRule} from "../../components/common/Common";
import {selectReportsStaticsAll} from "../../services/ReportsAxios";
import {ResponsiveBar} from "@nivo/bar";


/** 일자별 차트 **/
function MyResponsiveBar(props) {
  return (
    <ResponsiveBar
      data={props.data.rows?.length > 20 ? props.data.rows.slice(-21,-1) : props.data.rows}
      keys={[props?.chartKey]}
      indexBy="historyDate"
      margin={{top: 40, right: 40, bottom: 130, left: 40}}
      padding={0.75}
      valueScale={{type: 'linear'}}
      indexScale={{type: 'band', round: true}}
      colors={["#f5811f"]}
      axisLeft={false}
      axisBottom={{
        tickSize: 0,
        tickPadding: 15,
        tickRotation: -45,
        legendOffset: 32,
      }}
      enableLabel={false}
      enableGridY={false}
    />
  )
}
/** 기간별 보고서 **/
export default function ReportsPeriod(){
  const [searchCondition, setSearchCondition] = useAtom(reportsStaticsAtom)
  const dataStaticsAll = useAtomValue(reportsStaticsAll)
  const [chartKey, setChartKey] = useState('proceedsAmount')
  const [totalCount, setTotalCount] = useState(0)
  const activeStyle = {borderBottom:'4px solid #f5811f'}

  /**
   * 아코디언 데이타 페칭
   * @param event
   */
  const handleSearchCondition = async() => {
    if(localStorage.getItem('role') !== 'NORMAL'){
      const fetchData = await selectReportsStaticsAll(searchCondition)
      setTotalCount(fetchData.totalCount)
      return fetchData.rows
    } else {
      return dataStaticsAll.rows
    }
  }

  const dataSource = useCallback(handleSearchCondition,[searchCondition]);

  /**
   * 차트 키값 선택
   * @param event
   */
  const handleChangeChartKey = (key) => {
    setChartKey(key)
  }

  return(
    <Board>
      <BoardHeader>기간별 보고서</BoardHeader>
      <ReportsCondition searchCondition={searchCondition} setSearchCondition={setSearchCondition}/>
      <ChartContainer style={{height:250}}>
        <ChartLabel>
          <div onClick={() => handleChangeChartKey('proceedsAmount')} style={chartKey==='proceedsAmount' ? activeStyle : null}>수익금</div>
          <div onClick={() => handleChangeChartKey('requestCount')} style={chartKey==='requestCount' ? activeStyle : null}>요청수</div>
          <div onClick={() => handleChangeChartKey('responseCount')} style={chartKey==='responseCount' ? activeStyle : null}>응답수</div>
          <div onClick={() => handleChangeChartKey('exposureCount')} style={chartKey==='exposureCount' ? activeStyle : null}>노출수</div>
          <div onClick={() => handleChangeChartKey('clickCount')} style={chartKey==='clickCount' ? activeStyle : null}>클릭수</div>
          <div onClick={() => handleChangeChartKey('costAmount')} style={chartKey==='costAmount' ? activeStyle : null}>비용</div>
        </ChartLabel>
        <VerticalRule style={{backgroundColor:'#e5e5e5'}}/>
        {dataStaticsAll?.rows?.length !== 0 &&
          <MyResponsiveBar data={dataStaticsAll} selectKey={chartKey}/>
        }
      </ChartContainer>
      <BoardSearchResult>
        <Table columns={reportsStaticsAllColumn}
               totalCount={[totalCount,'보고서']}
               data={dataSource}/>
      </BoardSearchResult>
    </Board>
  )
}
/** 스티일 시트 **/
const ChartLabel = styled.div`
  display: flex;
  gap: 30px;
  padding: 0 40px;
  & div {
    display: flex;
    align-items: center;
    height: 45px;
    cursor: pointer;
  }
`