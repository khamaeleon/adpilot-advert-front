import styled from "styled-components";

function Cells(props) {
  const handleTouchStart = (e) => {
    console.log(e)
    props.onTouchStart(e)
  }
  const handleTouchMove = (e) => {
    console.log(e)
    props.onTouchMove(e)
  }
  return (
    <Cell
      onMouseDown={handleTouchStart}
      onMouseMove={handleTouchMove}>
    </Cell>
  )
}
export default function DragToSelect(props) {
  const { value } = props
  const onTouchStartCell = (e) => {

  }

  const onTouchStartMove = (e) => {

  }

  return (
    <DragSelect>
      {value.map((item, i) => {
        return(
          <div key={i}>
            {item.map((cell, j) => {
              return (
                <Cells
                  key={j}
                  onTouchStart={onTouchStartCell}
                  onTouchMove={onTouchStartMove}
                />
              )
            })}
          </div>
        )
      })}
    </DragSelect>
  )
}

const DragSelect = styled.div`
  display: flex;
  flex-direction: column;
  & div {
    display: flex;
  }
`

const Cell = styled.div`
  width: 100%;
  height: 30px;
  border: 1px solid #ddd;
`