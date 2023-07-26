import React, {useCallback, useEffect, useState} from "react";
import {
  CancelButton,
  ColSpan2,
  ColTitle,
  CopyCode,
  RowSpan,
  Script,
  Site,
  SubmitButton,
} from "../../assets/GlobalStyles";
import ReactDataGrid from '@inovua/reactdatagrid-enterprise';
import '@inovua/reactdatagrid-enterprise/base.css';
import '../../assets/default-light.scss'
import {useAtom, useSetAtom} from "jotai";
import {modalController} from "../../store";
import {ModalBody, ModalFooter, ModalHeader} from "../modal/Modal";
import {TotalCount} from "./TableDetail";
import SettingAdd from "../common/SettingModal";
import {BorderBox, Off, On, PreviewSubmit, Small, SwitchBox, TitColor} from "./styles";
import {light} from "../../assets/theme";
import PaginationToolbar from '@inovua/reactdatagrid-community/packages/PaginationToolbar'
export function SwitchComponent(props){
  const {value, cellProps, type, eventClick} = props
  const [select, setSelect] = useState(value)
  const [, setModal] = useAtom(modalController)
  const background = !select ? {background: light.color.lightGray} : {background: light.color.mainColor};
  const position = select ? {left: ' calc(100% - 4px)', transform: 'translateX(-100%)'} : null
  useEffect(()=>{
    return ()=> {
      setModal({
        isShow: false
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect(() => {
    if(type === 'publish') {
      setSelect(cellProps.data.publishYn === 'Y')
    } else {
      setSelect(cellProps.data.interlockYn === 'Y')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  
  const handleClick = (confirm) => {
    if(confirm){
      eventClick();
      setSelect(!select)
      if(type === 'publish'){
        cellProps.data.publishYn = cellProps.data.publishYn === 'Y' ? 'N' : 'Y';
      }else{
        cellProps.data.interlockYn = cellProps.data.interlockYn === 'Y' ? 'N' : 'Y';
      }
    }else{
      setSelect(select)
    }
    setModal({isShow:false});
  }
  const showModal = () => {
    const btnSmall = { width: 100, height: 42 }
    setModal({
      isShow: true,
      width: 400,
      modalComponent: () => {
        return (
          <div>
            {type !== 'publish' && <ModalHeader title={'연동 상태 변경'} closeButton/>}
            <ModalBody>
              <p style={{fontSize: 16, paddingTop: 10}}>
                {type !== 'publish' ? (!select ? '연동을 사용 하시겠습니까?'
                  : '연동을 중지 하시겠습니까?') : '게재 상태를 변경하시겠습니까?'}
              </p>
            </ModalBody>
            <ModalFooter style={{borderTop: 0, paddingTop: 5}}>
              <CancelButton style={btnSmall} onClick={()=>handleClick(false)}>취소</CancelButton>
              <PreviewSubmit style={btnSmall} onClick={()=>handleClick(true)}>확인</PreviewSubmit>
            </ModalFooter>
          </div>
        )
      }
    })
  }

  return (
    <SwitchBox
        style={background}
        onClick={() => showModal()}
    >
        <label style={position}/>
        {select ? <On>ON</On>:  <Off>OFF</Off>}
    </SwitchBox>
  )
}
const handleCopyClipBoard = async (text) => {
  console.log(text)

  if(navigator.clipboard){
    navigator.clipboard
    .writeText(text)
    .then(()=>{alert('클립보드에 복사되었습니다.')})
    .catch(()=>{alert('복사를 다시 시도해 주세요.')});
  } else {
    if (!document.queryCommandSupported("copy")) {
      return alert("복사하기가 지원되지 않는 브라우저입니다.");
    }

    // 흐름 3.
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.top = '0';
    textarea.style.left = '0';
    textarea.style.position = "fixed";

    // 흐름 4.
    document.body.appendChild(textarea);
    // focus() -> 사파리 브라우저 서포팅
    textarea.focus();
    // select() -> 사용자가 입력한 내용을 영역을 설정할 때 필요
    textarea.select();
    // 흐름 5.
    document.execCommand("copy");
    // 흐름 6.
    document.body.removeChild(textarea);
    alert("클립보드에 복사되었습니다.");
  }
};

function ScriptComponent(props){
  const {title, cellProps} = props
  const setModal = useSetAtom(modalController)

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
                <ColTitle style={{paddingTop: 10}}>픽셀명</ColTitle>
                <BorderBox>{cellProps.data.eventName}</BorderBox>
              </RowSpan>
              <RowSpan>
                  <ColTitle style={{paddingTop: 10}}>
                    <p style={{whiteSpace: 'nowrap'}}>스크립트</p>
                    <SubmitButton onClick={() => handleCopyClipBoard(cellProps.data.script)} style={{width: '100%', marginTop: 8, padding: '5px 0'}}>
                      복사
                    </SubmitButton>
                  </ColTitle>
                  <BorderBox>
                    <pre>{cellProps.data.script}</pre>
                  </BorderBox>
                </RowSpan>
              </ModalBody>
              <ModalFooter>
                <PreviewSubmit onClick={() => setModal({isShow: false, modalComponent: null, reRender: false})}>확인</PreviewSubmit>
              </ModalFooter>
            </div>
          )
        }
      })
    }

  return(
    <>
      {title !== undefined ?
        <TitColor onClick={e => {
          e.stopPropagation()
          handleClick()
        }}>{title}
          <Script />
        </TitColor>
        :
        <Script onClick={e => {
          e.stopPropagation()
          handleClick()
        }}/>
      }
    </>
  )
}

export function Icon(props) {

  return(
    <>
      {props.saveType === 'edit' &&
        <SettingAdd data={props.cellProps} saveType={props.saveType} label={props.label} onSubmit={props.onSubmit}/>
      }
      {props.icon === 'script' &&
        <ScriptComponent cellProps={props.cellProps} title={props.title}/>
      }
      {props.icon === 'url' &&
        <a href={props.value} target={'_blank'} rel="noreferrer">
          <Site/>
        </a>
      }
      {props.icon === 'copyCode' &&
        <CopyCode onClick={() => handleCopyClipBoard(props.value)}/>
      }
    </>
  )
}

function Table(props) {
  const {columns, data, settings, groups, noDirectives, defaultLimit } = props
  const [, setActiveCell] = useState([0]);
  const [gridRef, setGridRef] = useState(null);
  const gridStyle = {minHeight: 550}
  const columnData = () => {
    columns.map(item => {
      Object.assign(item, settings.default)
      return null
    })
    settings.setColumns.map(item => {
      Object.assign(columns[item.target], item.value)
      Object.assign(columns[item.target], item.function)
      return null
    })
  }

  useEffect(() => {
    if (settings !== undefined) {
      columnData()
    } else {
      columns.map(item => {
        Object.assign(item, {textAlign: 'center'})
        return null
      })
    }
    setActiveCell([data.length])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const emptyText = <p style={{
    fontSize: 16,
  }}>{props.emptyText !== undefined ? props.emptyText : '데이터가 없습니다.'}</p>

  useEffect(() => {
    if (gridRef) {
      gridRef.current.setColumnSizesToFit()
    }
  }, [gridRef])

  /** 국제화 **/
  const i18n = Object.assign({}, ReactDataGrid.defaultProps.i18n, {
    sortAsc: '오름차순',
    sortDesc: '내림차순',
    autoSizeToFit: '자동맞춤',
    autoresizeThisColumn:'이 컬럼에 맞춤',
    autoresizeAllColumns:'전체 컬럼에 맞춤',
    columns: '컬럼'
  })

  const renderPaginationToolbar = useCallback((paginationProps) => {
    console.log(paginationProps)
    const i18n = Object.assign({}, ReactDataGrid.defaultProps.i18n, {
      page: '페이지'
    })
    return(
      <div style={{ height: 89 }}>
        <PaginationToolbar i18n={i18n}{...paginationProps} bordered={false} />
      </div>
      )
  }, [])

  const gridElement = (
    <ReactDataGrid
      licenseKey={process.env.REACT_APP_DATA_GRID_LICENSE_KEY}
      i18n={i18n}
      handle={setGridRef}
      columns={columns}
      dataSource={data}
      headerHeight={48}
      showZebraRows={true}
      showCellBorders={'horizontal'}
      groups={groups !== null ? groups : false}
      enableColumnAutosize={true}
      showColumnMenuLockOptions={false}
      showColumnMenuGroupOptions={false}
      emptyText={emptyText}
      defaultLimit={defaultLimit}
      pagination={props.pagination}
      style={gridStyle}
      showHoverRows={false}
      activeCell={null}
      renderPaginationToolbar={renderPaginationToolbar}
      {...props}
    />
  )
  return (
    <>
      {props.downloadList &&
        <RowSpan style={{justifyContent: 'flex-end'}}>
          {/*<SaveExcelButton onClick={exportCSV}>엑셀 저장</SaveExcelButton>*/}
        </RowSpan>
      }
      <RowSpan>
        <ColSpan2 style={{paddingLeft: 0}}>
          {props.totalCount &&
            <TotalCount><span/>총 <span>{props?.totalCount[0]}</span> 건의 {props?.totalCount[1]}</TotalCount>}
        </ColSpan2>
        {noDirectives === true ? null : <Small>* shift를 누른 상태에서 스크롤시 좌우 스크롤이 가능합니다.</Small>}
      </RowSpan>
      {gridElement}
    </>
  )
}

export default Table


