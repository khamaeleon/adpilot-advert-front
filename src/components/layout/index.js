import styled from "styled-components";

export function BoardBody (props) {
  const {children} = props
  return (
    <Body>
      <TableContainer>
        {children}
      </TableContainer>
    </Body>
  )
}

export function ListHead (props) {
  return(
    <TableHeader>
      {props.children}
    </TableHeader>
  )
}

export function ListBody (props) {
  return(
    <TableDefault>
      {props.children}
    </TableDefault>
  )
}

const Body = styled.div`
  padding: 15px 0;
  border-bottom: 1px solid #dddddd;
`

const TableContainer = styled.ul`
  font-size: 16px;
  & li {
    padding: 15px 0;
    width: 100%;
    display: flex;
    align-items: center;
  }
`

const TableHeader = styled.div`
  width: 190px;
`

const TableDefault = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  & > * {
    margin-right: 10px;
  }
  & > input[type='text'] {
    padding: 0 20px;
    height: 45px;
    border-radius: 5px;
    border: 1px solid #e5e5e5;
    vertical-align: bottom;
    outline: none;
  }
  & div > input[type='radio'] + label {
    margin: 0 15px 0 0px;
  }
  & select {
    padding: 0 20px;
    min-width: 200px;
    height: 45px;
    border-radius: 5px;
    border: 1px solid #e5e5e5;
    outline: none;
  }
`