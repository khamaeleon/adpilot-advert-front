import {useAtom} from "jotai";
import {atomWithReset, useResetAtom} from "jotai/utils";
import TableDragSelect from "react-table-drag-select";
import "../../assets/dragSelect.css"
import {useEffect, useState} from "react";

const cellsAtom = atomWithReset([
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
])
const weeksInfo = {
  1:'월',
  2:'화',
  3:'수',
  4:'목',
  5:'금',
  6:'토',
  7:'일'
}
export default function DragToSelect({userId, reset, readOnly}) {
  const resetCells = useResetAtom(cellsAtom)
  const [cells, setCells] = useAtom(cellsAtom)//[0] 은 요일, 시간
  const [cellEnabled, setCellEnabled] = useState(false)
  useEffect(() => {
    if(readOnly) {
      setCellEnabled(true)
    }
  },[])
  useEffect(() => {
    cells.map((weeks, key) => {
      weeks.map((day, idx) => {
        if(day){
          console.log(`요일:${weeksInfo[key]}, 시간:${idx}시`)
        }
      })
    })
  }, [cells]);

  useEffect(() => {
    resetCells()
  },[reset])

  return(
    <TableDragSelect
      value={cells}
      onChange={cells => setCells(cells)}
    >
      <tr>
        <td disabled />
        <td disabled>1시</td>
        <td disabled>2시</td>
        <td disabled>3시</td>
        <td disabled>4시</td>
        <td disabled>5시</td>
        <td disabled>6시</td>
        <td disabled>7시</td>
        <td disabled>8시</td>
        <td disabled>9시</td>
        <td disabled>10시</td>
        <td disabled>11시</td>
        <td disabled>12시</td>
        <td disabled>13시</td>
        <td disabled>14시</td>
        <td disabled>15시</td>
        <td disabled>16시</td>
        <td disabled>17시</td>
        <td disabled>18시</td>
        <td disabled>19시</td>
        <td disabled>20시</td>
        <td disabled>21시</td>
        <td disabled>22시</td>
        <td disabled>23시</td>
        <td disabled>24시</td>
      </tr>
      <tr>
        <td disabled>월</td>
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
        <td disabled>화</td>
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
        <td disabled>수</td>
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
        <td disabled>목</td>
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
        <td disabled>금</td>
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
        <td disabled>토</td>
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
        <td disabled>일</td>
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