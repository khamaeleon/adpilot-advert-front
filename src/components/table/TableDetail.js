import React, {useCallback, useEffect, useRef, useState} from "react";
import ReactDataGrid from '@inovua/reactdatagrid-enterprise';
import '@inovua/reactdatagrid-enterprise/base.css';
import '../../assets/default-light.scss'
import styled from "styled-components";
import {ColSpan2, RowSpan} from "../../assets/GlobalStyles";
const accountExpandHeight = 400


function TableDetail (props) {
  const {columns, data, settings, groups } = props
  const [activeCell, setActiveCell] = useState([0]);
  const [gridRef, setGridRef] = useState(null);
  const [gridDetailRef, setGridDetailRef] = useState(null);
  const gridStyle = { minHeight: 550 }
  const [accountRowHeights, setAccountRowHeights] = useState({})

  /**
   * ...빈 데이터 텍스트
   * @type {JSX.Element}
   */
  const emptyText = <p style={{
    fontSize: 16,
  }}>{props.emptyText !== undefined ? props.emptyText : '데이터가 없습니다.' }</p>

  /**
   * 컬럼 기본 세팅
   */
  const columnData = () => {
    columns.map(item => {
      Object.assign(item, settings.default)
    })
    settings.setColumns.map(item => {
      Object.assign(columns[item.target],item.value)
      Object.assign(columns[item.target],item.function)
    })
  }

  /**
   * 기본 세팅 시작 설정
   */
  useEffect(() => {
    if(settings !== undefined) {
      columnData()
    } else {
      columns.map(item => {
        Object.assign(item, {textAlign: 'center'})
      })
    }
    setActiveCell([data.length])
  }, []);

  /**
   * ...reference react data grid
   * auto size column size to fit
   */
  useEffect(() => {
    if(gridRef){
      gridRef.current.setColumnSizesToFit()
    }
  },[gridRef])

  /**
   * ...펼쳐보기
   * @param data
   * @returns {JSX.Element}
   */
  const renderContactsGrid = useCallback(({data, dataSource,rowId,remoteRowIndex}) => {
    console.log(data, dataSource,rowId,remoteRowIndex)
    return (
      <ReactDataGrid
        handle={setGridDetailRef}
        dataSource={props.detailData(data)}
        columns={props.detailColumn}
        enableColumnAutosize={true}
        groups={props.detailGroups}
        emptyText={emptyText}
        rowHeight={null}
      />
    );
  },[props])

  return(
    <>
      <RowSpan>
        <ColSpan2>
          {props.totalCount && <TotalCount><span/>총 <span>{props?.totalCount[0]}</span> 건의 {props?.totalCount[1]}</TotalCount> }
        </ColSpan2>
        <Small>* shift를 누른 상태에서 스크롤시 좌우 스크롤이 가능합니다.</Small>
      </RowSpan>
      <ReactDataGrid
        licenseKey={process.env.REACT_APP_DATA_GRID_LICENSE_KEY}
        handle={setGridRef}
        style={gridStyle}
        rowExpandHeight={accountExpandHeight}
        rowHeights={accountRowHeights}
        renderDetailsGrid={renderContactsGrid}
        enableColumnAutosize={true}
        emptyText={emptyText}
        idProperty={props.idProperty}
        dataSource={data}
        columns={columns}
        groups={groups}
        pagination={props.pagination}
        livePagination={props.livePagination}
        scrollThreshold={props.scrollThreshold}
        limit={30}
      />
    </>
  )
}

export default TableDetail

const Small = styled.small`
  display: inline-block;
  width: 100%;
  text-align: right;
  padding: 10px;
`

export const TotalCount = styled.div`
  vertical-align: middle;
  & > span:first-child {
    display: inline-block;
    width: 3px;
    height: 12px;
    background-color: #222;
  }
  & > span:last-child {
    margin: 0;
    color: #f5811f;
  }
`