import DragToSelect from "../../components/common/DragToSelect";
import {atom, useAtom} from "jotai/index";
import {atomWithReset} from "jotai/utils";

const cellsAtom = atomWithReset([
  [false, false, false, false, false, false, false, false, false, false,false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false,false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false,false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false,false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false,false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false,false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false,false, false, false, false, false, false, false, false, false, false, false, false, false, false]
])
export default function CreateCreative() {
  const [cells, setCells] = useAtom(cellsAtom)
  const handleChangeDrag = (cells) => {
    console.log(cells)
    setCells(cells)
  }

  return(
    <>
      <DragToSelect value={cells}/>
    </>
  )
}