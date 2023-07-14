import {useAtom} from "jotai";
import TableDragSelect from "react-table-drag-select";
import "../../assets/dragSelect.css"
import {useEffect, useState} from "react";
import {
  timeBudgetDetailDataAtom,
  timesInfo, weeksInfo
} from "../../pages/settings/entity/BudgetTime";
import styled from "styled-components";


export default function DragToSelect({readOnly}) {
  const [timeBudgetDetailDataState, setTimeBudgetDetailDataState] = useAtom(timeBudgetDetailDataAtom)
  const [cellEnabled, setCellEnabled] = useState(false)
  useEffect(() => {
    if (readOnly) {
      setCellEnabled(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onChangeCells = (cells) => {
    setTimeBudgetDetailDataState({
      ...timeBudgetDetailDataState,
      allowTimes:cells
    })
  }

  function trtd() {
    let arr=[];
    for(let i = 0; i < 7; i++) {
      let colArr=[];
      for(let j = 0; j < 24; j++) {
        colArr.push(<td key={j} disabled={cellEnabled} className={'col' + j}/>)
      }
      arr.push(<tr key={i}>{colArr}</tr>)
    }
    return arr;
  }

  return (
    <TimeTableContainer>
      <TimeContainer>
        {timesInfo.map((data, index) => {
          return <div key={index}>{data.time + data.label}</div>
        })}
      </TimeContainer>
      <div style={{display: "flex"}}>
        <WeekDiv>
          {weeksInfo.map((data, index) => {
            return <div key={index}>{data.week}</div>
          })}
        </WeekDiv>
        <TableDragSelect
          value={timeBudgetDetailDataState.allowTimes}
          onChange={cells => onChangeCells(cells)}
        >
          {trtd()}
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