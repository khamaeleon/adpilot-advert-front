import {useAtom} from "jotai";
import TableDragSelect from "react-table-drag-select";
import "../../assets/dragSelect.css"
import {useEffect, useState} from "react";
import {budgetTimes, timeBudgetDetailDataAtom} from "../../pages/settings/entity/BudgetTime";
import styled from "styled-components";


export default function DragToSelect({reset, readOnly}) {
  const [timeBudgetDetailDataState, setTimeBudgetDetailDataState] = useAtom(timeBudgetDetailDataAtom)
  const [cellEnabled, setCellEnabled] = useState(false)
  useEffect(() => {
    console.log(timeBudgetDetailDataState)
    if (readOnly) {
      setCellEnabled(true)
    }
  }, [])

  const onChangeCells = (cells) => {
    setTimeBudgetDetailDataState({
      ...timeBudgetDetailDataState,
      allowTimes:cells
    })
    console.log(cells)
    // let allowTimes =[]
    // let timeList =[]
    // cells.map((weeks, key) => {
    //   weeks.map((day, idx) => {
    //     if(day){
    //       timeList=[...timeList,{time:idx}]
    //     }
    //   })
    //   if(weeks.find(value =>value===true)){
    //     allowTimes=[...allowTimes,{dayOfWeek:key,timeList:timeList}]
    //   }
    //   timeList =[]
    //   console.log(allowTimes)
    //   //
    // })
  }
  return (
    <TimeTableContainer>
      <TimeContainer>
        <div>&nbsp;</div>
        <div>1시</div>
        <div>2시</div>
        <div>3시</div>
        <div>4시</div>
        <div>5시</div>
        <div>6시</div>
        <div>7시</div>
        <div>8시</div>
        <div>9시</div>
        <div>10시</div>
        <div>11시</div>
        <div>12시</div>
        <div>13시</div>
        <div>14시</div>
        <div>15시</div>
        <div>16시</div>
        <div>17시</div>
        <div>18시</div>
        <div>19시</div>
        <div>20시</div>
        <div>21시</div>
        <div>22시</div>
        <div>23시</div>
        <div>24시</div>
      </TimeContainer>
      <div style={{display: "flex"}}>
        <WeekDiv>
          <div>월</div>
          <div>화</div>
          <div>수</div>
          <div>목</div>
          <div>금</div>
          <div>토</div>
          <div>일</div>
        </WeekDiv>
        <TableDragSelect
          value={timeBudgetDetailDataState !==null && timeBudgetDetailDataState.allowTimes}
          onChange={cells => onChangeCells(cells)}
        >
          <tr>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
          </tr>
          <tr>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
          </tr>
          <tr>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
          </tr>
          <tr>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
          </tr>
          <tr>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
          </tr>
          <tr>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
          </tr>
          <tr>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
            <td disabled={cellEnabled}/>
          </tr>
        </TableDragSelect>
      </div>
    </TimeTableContainer>

  )
}

const TimeTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const TimeContainer = styled.div`
  display: flex;
  justify-content:space-between;
  border-top: 2px solid transparent;
  border-left: 2px solid transparent;
  border-right: 2px solid transparent;
  width: 100%;
  gap: 2px;
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    width: 100%;
    height: 100%;
    padding: 5px;
  }
`

const WeekDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  width: 4.1%;
  height: 100%;
  border-left: 2px solid transparent;
  border-top: 2px solid transparent;
  border-bottom: 2px solid transparent;
  gap: 2px;
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-color: #fff;
  }
`