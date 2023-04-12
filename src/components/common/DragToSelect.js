import {useAtom} from "jotai";
import TableDragSelect from "react-table-drag-select";
import "../../assets/dragSelect.css"
import {useEffect, useState} from "react";
import {budgetTimes, timeBudgetDetailDataAtom} from "../../pages/settings/entity/BudgetTime";


export default function DragToSelect({reset, readOnly}) {
  const [timeBudgetDetailDataState, setTimeBudgetDetailDataState] = useAtom(timeBudgetDetailDataAtom)
  const [cellEnabled, setCellEnabled] = useState(false)
  useEffect(() => {
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
    <TableDragSelect
      value={timeBudgetDetailDataState.allowTimes}
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
  )
}