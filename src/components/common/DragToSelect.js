import {useAtom} from "jotai/index";
import {atomWithReset} from "jotai/utils";
import TableDragSelect from "react-table-drag-select";
import "../../assets/dragSelect.css"

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
export default function DragToSelect() {
  const [cells, setCells] = useAtom(cellsAtom)
  return(
    <TableDragSelect
      value={cells}
      onChange={cells => setCells(cells)}
    >
      <tr>
        <td disabled />
        <td disabled>0시</td>
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
      </tr>
      <tr>
        <td disabled>월</td>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
      </tr>
      <tr>
        <td disabled>화</td>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
      </tr>
      <tr>
        <td disabled>수</td>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
      </tr>
      <tr>
        <td disabled>목</td>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
      </tr>
      <tr>
        <td disabled>금</td>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
      </tr>
      <tr>
        <td disabled>토</td>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
      </tr>
      <tr>
        <td disabled>일</td>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
        <td/>
      </tr>
    </TableDragSelect>
  )
}