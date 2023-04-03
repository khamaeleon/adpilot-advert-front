import React, {useEffect, useState} from "react";
import {
  ColSpan2,
  ColTitle,
  CopyCode,
  RowSpan,
  SaveExcelButton,
  Script,
  Site,
  SubmitButton,
} from "../../assets/GlobalStyles";
import {Link} from "react-router-dom";
import ReactDataGrid from '@inovua/reactdatagrid-enterprise';
import '@inovua/reactdatagrid-enterprise/base.css';
import '../../assets/default-light.scss'
import {useAtom} from "jotai";
import styled from "styled-components";
import {modalController} from "../../store";
import {ModalBody, ModalFooter, ModalHeader} from "../modal/Modal";
import {TotalCount} from "./TableDetail";
import SettingAdd from "../common/SettingModal";

export function SwitchComponent(props){
  const {value, cellProps, eventClick} = props
  const [select, setSelect] = useState(value)
  const [, setModal] = useAtom(modalController)
  const background = !select ? {background: '#ddd'} : {background: '#f5811f'};
  const position = select ? {left: ' calc(100% - 4px)', transform: 'translateX(-100%)'} : null

  const handleClick = (confirm) => {
    if(confirm){
      cellProps.data.publish = !cellProps.data.publish;
      eventClick();
    }
    setSelect(cellProps.data.publish)
    setModal({isShow:false});
    // return (
    //   <UseAtom objects={cellProps.data}/>
    // )
  }
  return(
    <SwitchBox
      style={background}
      onClick={() => handleClick(true)}
    >
      <label style={position}/>
      {select ? <On>ON</On>:  <Off>OFF</Off>}
    </SwitchBox>
  )
}

export const LinkRef = (link) => {
  const renderer = {
    render: ({value}) => {
      return(
        <Link to={link}>{value}</Link>
      )
    }
  }
  return renderer
}

function ScriptComponent(props){
  const {cellProps} = props
  const[modal, setModal] = useAtom(modalController)
  const handleCopyClipBoard = async (text) => {
    console.log(text)
    try {
      await navigator.clipboard.writeText(text);
      alert('클립보드에 복사되었습니다.');
    } catch (error) {
      alert('클립보드 복사에 실패하였습니다.');
    }
  };
  const handleClick = () => {
    setModal({
      isShow: true,
      width: 800,
      modalComponent: () => {
        return (
          <div>
            <ModalHeader title={'스크립트 보기'}/>
            <ModalBody>
              <RowSpan>
                <ColTitle style={{paddingTop: 10}}>이벤트명</ColTitle>
                <BorderBox>{cellProps.data.eventName}</BorderBox>
              </RowSpan>
              <RowSpan>
                  <ColTitle style={{paddingTop: 10}}>
                    <p>스크립트</p>
                    <SubmitButton onClick={() => handleCopyClipBoard(cellProps.data.script)} style={{width: '100%', marginTop: 8, padding: '5px 0'}}>
                      복사
                    </SubmitButton>
                  </ColTitle>
                  <BorderBox><pre>{cellProps.data.script}</pre></BorderBox>
              </RowSpan>
            </ModalBody>
            <ModalFooter>
              <PreviewSubmit onClick={() => setModal({isShow: false})}>확인</PreviewSubmit>
            </ModalFooter>
          </div>
        )
      }
    })
  }
  return(
    <Script onClick={e => {
      e.stopPropagation()
      handleClick()
    }}/>
  )
}

export function Icon(props) {
  const handleCopyClipBoard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('클립보드에 복사되었습니다.');
    } catch (error) {
      alert('클립보드 복사에 실패하였습니다.');
    }
  };

  return(
    <>
      {props.saveType === 'edit' &&
        <SettingAdd data={props.cellProps} saveType={props.saveType} label={props.label} onSubmit={props.onSubmit}/>
      }
      {props.icon === 'script' &&
        <ScriptComponent cellProps={props.cellProps} />
      }
      {props.icon === 'url' &&
        <a href={props.value} target={'_blank'}>
          <Site/>
        </a>
      }
      {props.icon === 'copyCode' &&
        <CopyCode onClick={() => handleCopyClipBoard(props.value)}/>
      }
    </>
  )
}

function ExportButton({ onExport, children }) {
  const [exporting, setExporting] = useState(false);
  return (
    <SaveExcelButton disabled={exporting}
                     onClick={async () => {
                       setExporting(true);
                       await onExport();
                       setExporting(false);
                     }}>{exporting ? '저장 중' : children}
    </SaveExcelButton>
  );
}

function Table (props) {
  const {columns, data, settings, groups, titleTotal, historyBtn, handleModalComponent} = props
  const [activeCell, setActiveCell] = useState([0]);
  const [gridRef, setGridRef] = useState(null);
  const gridStyle = { minHeight: 550, border: '1px solid #dddddd' }
  const [loading, setLoading] = useState(false)
  const columnData = () => {
    columns.map(item => {
      Object.assign(item, {headerProps: {style: {backgroundColor: '#fafafa', color:'#b2b2b2'}}})
      Object.assign(item, settings.default)
    })
    settings.setColumns.map(item => {
      Object.assign(columns[item.target],item.value)
      Object.assign(columns[item.target],item.function)
    })
  }

  useEffect(() => {
    if(settings !== undefined) {
      columnData()
    } else {
      columns.map(item => {
        Object.assign(item, {headerProps: {style: {backgroundColor: '#fafafa', color:'#b2b2b2'}}})
        Object.assign(item, {textAlign: 'center'})
      })
    }
    setActiveCell([data.length])
  }, []);

  const renderRowContextMenu = (menuProps, { rowProps, cellProps }) => {
    menuProps.autoDismiss = true
    menuProps.items = [
      {
        label: '원하는 메뉴'
      }
    ]
  }

  const emptyText = <p style={{
    fontSize: 16,

  }}>{props.emptyText !== undefined ? props.emptyText : '데이터가 없습니다.' }</p>

  useEffect(() => {
    if(gridRef){
      gridRef.current.setColumnSizesToFit()
    }
  },[gridRef])

  const gridElement = (
    <ReactDataGrid
        licenseKey={process.env.REACT_APP_DATA_GRID_LICENSE_KEY}
        idProperty={props.idProperty}
        handle={setGridRef}
        columns={columns}
        dataSource={data}
        rowHeight={null}
        headerHeight={48}
        showZebraRows={true}
        showCellBorders={'horizontal'}
        groups={groups !== null ? groups : false}
        enableColumnAutosize={true}
        renderRowContextMenu={renderRowContextMenu}
        showColumnMenuLockOptions={false}
        showColumnMenuGroupOptions={false}
        emptyText={emptyText}
        limit={30}
        style={gridStyle}
        {...props}
      />
  )
  return(
    <>
    {/*   <BoardSearchResultTitle>
        <ColSpan3>
          {titleTotal !== false && <>총 <span>{JSON.stringify(activeCell)}</span>건의 매체</>}
        </ColSpan3>
        <ColSpan1 style={{justifyContent: "flex-end"}}>
          {historyBtn !== undefined && historyBtn}
          <ExportButton onExport={() => exportToXlsx(gridElement, 'CommonFeatures.xlsx')}>
            XSLX 저장
          </ExportButton>
        </ColSpan1>
      </BoardSearchResultTitle>*/}
      <RowSpan>
        <ColSpan2>
          {props.totalCount && <TotalCount><span/>총 <span>{props?.totalCount[0]}</span> 건의 {props?.totalCount[1]}</TotalCount>}
        </ColSpan2>
        <Small>* shift를 누른 상태에서 스크롤시 좌우 스크롤이 가능합니다.</Small>
      </RowSpan>
      {gridElement}
    </>
  )
}

export default Table


export const SwitchBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: 68px;
  height: 30px;
  background: #ddd;
  border-radius: 68px;
  position: relative;
  transition: background-color .2s;
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  & > label {
    content: '';
    position: absolute;
    top: 4px;
    left: 4px;
    width: 22px;
    height: 22px;
    border-radius: 22px;
    transition: 0.2s;
    background: #fff;
    box-shadow: 0 2px 3px 0 rgba(10, 10, 10, 0.4);
  }
`

export const On = styled.span`
  display: inline-block;
  width: 50%;
  margin-left: 10px;
  font-size: 12px;
  font-weight: 500;
  color: #fff
`

export const Off = styled.span`
  display: inline-block;
  width: 100%;
  text-align: right;
  margin-right: 8px;
  font-weight: 300;
  font-size: 12px;
  color: #999
`

const BorderBox = styled.div`
  border: 1px solid #e5e5e5;
  margin-left: 15px;
  width: 100%;
  min-height: 45px;
  max-height: 120px; 
  padding: 10px 5px 10px 10px;
  overflow-y: auto;
`

const PreviewSubmit = styled.button`
  padding: 18px 20px;
  width: 200px;
  background-color: #525252;
  color: #fff;
`

const Small = styled.small`
  display: inline-block;
  width: 100%;
  text-align: right;
  padding: 10px;
`