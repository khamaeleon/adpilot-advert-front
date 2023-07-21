import React, {useCallback, useEffect, useState} from "react";
import ReactDataGrid from '@inovua/reactdatagrid-enterprise';
import '@inovua/reactdatagrid-enterprise/base.css';
import '../../assets/default-light.scss'
import styled from "styled-components";
import {ColSpan2, RowSpan} from "../../assets/GlobalStyles";

function TableDetail (props) {
  const {columns, data, settings, groups, rowExpandHeight } = props
  const [gridRef, setGridRef] = useState(null);
  const [, setGridDetailRef] = useState(null);
  const gridStyle = { minHeight: 550 }

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
    columns.map(item =>
      Object.assign(item, settings.default)
    )
    settings.setColumns.map(item => {
      Object.assign(columns[item.target],item.value)
      Object.assign(columns[item.target],item.function)
      return null
    })
  }

  /**
   * 기본 세팅 시작 설정
   */
  useEffect(() => {
    if(settings !== undefined) {
      columnData()
    } else {
      columns.map(item =>
        Object.assign(item, {textAlign: 'center'})
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  const renderContactsGrid = useCallback(({data}) => {
    return (
      <ReactDataGrid
        handle={setGridDetailRef}
        dataSource={props.detailData(data)}
        columns={props.detailColumn}
        enableColumnAutosize={true}
        groups={props.detailGroups}
        emptyText={emptyText}
        rowHeight={45}
        activeCell={null}
        showHoverRows={false}
        style={{minHeight: 45}}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[props])

  return(
    <>
      <RowSpan>
        <ColSpan2 style={{paddingLeft: 0}}>
          {props.totalCount && <TotalCount><span/>총 <span>{props?.totalCount[0]}</span> 건의 {props?.totalCount[1]}</TotalCount> }
        </ColSpan2>
        <Small>* shift를 누른 상태에서 스크롤시 좌우 스크롤이 가능합니다.</Small>
      </RowSpan>
      <ReactDataGrid
        licenseKey={process.env.REACT_APP_DATA_GRID_LICENSE_KEY}
        handle={setGridRef}
        style={gridStyle}
        rowExpandHeight={rowExpandHeight}
        rowHeights={null}
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
        showHoverRows={false}
        multiRowExpand={false}
        activeCell={null}
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
  display: flex;
  align-items: center;
  & > span:first-child {
    width: 3px;
    height: 12px;
    background-color: #222;
    margin: 2px 8px 0 0;
    display: inline-block;
  }
  & > span:last-child {
    margin-left: 3px;
    color: #f5811f;
  }
`