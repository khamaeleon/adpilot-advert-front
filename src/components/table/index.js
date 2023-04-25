import React, {useEffect, useState} from "react";
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
import {useAtom} from "jotai";
import {modalController} from "../../store";
import {ModalBody, ModalFooter, ModalHeader} from "../modal/Modal";
import {TotalCount} from "./TableDetail";
import SettingAdd from "../common/SettingModal";
import {BorderBox, Off, On, PreviewSubmit, ScriptSubject, Small, SwitchBox, TitColor} from "./styles";

export function SwitchComponent(props){
  const {value, cellProps, eventClick} = props
  const [select, setSelect] = useState(value)
  const [, setModal] = useAtom(modalController)
  const background = !select ? {background: '#ddd'} : {background: '#f5811f'};
  const position = select ? {left: ' calc(100% - 4px)', transform: 'translateX(-100%)'} : null

  const handleClick = (confirm) => {
    if(confirm){
      cellProps.data.interlock = !cellProps.data.interlock;
      eventClick();
    }
    setSelect(cellProps.data.interlock)
    setModal({isShow:false});
  }
  const showModal = () => {
    setSelect(!cellProps.data.interlock)
    setModal({
      isShow: true,
      width: 660,
      modalComponent: () => {
        return (
          <div>
            <ModalHeader title={'연동 상태 변경'}/>
            <ModalBody>
              <ScriptSubject>
                {!cellProps.data.interlock ?
                  <div>연동을 사용 하시겠습니까?<br/>
                  </div>
                  :
                  <div>연동을 중지 하시겠습니까?<br/>
                  </div>
                }
              </ScriptSubject>
            </ModalBody>
            <ModalFooter>
              <CancelButton onClick={()=>handleClick(false)}>취소</CancelButton>
              <PreviewSubmit onClick={()=>handleClick(true)}>확인</PreviewSubmit>
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

function ScriptComponent(props){
const {title, cellProps} = props
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
        <ScriptComponent cellProps={props.cellProps} title={props.title}/>
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

function Table(props) {
  const {columns, data, settings, groups } = props
  const [activeCell, setActiveCell] = useState([0]);
  const [gridRef, setGridRef] = useState(null);
  const gridStyle = {minHeight: 550}
  const [loading, setLoading] = useState(false)
  const columnData = () => {
    columns.map(item => {
      Object.assign(item, settings.default)
    })
    settings.setColumns.map(item => {
      Object.assign(columns[item.target], item.value)
      Object.assign(columns[item.target], item.function)
    })
  }

  useEffect(() => {
    if (settings !== undefined) {
      columnData()
    } else {
      columns.map(item => {
        Object.assign(item, {textAlign: 'center'})
      })
    }
    setActiveCell([data.length])
  }, []);

  const emptyText = <p style={{
    fontSize: 16,

  }}>{props.emptyText !== undefined ? props.emptyText : '데이터가 없습니다.'}</p>

  useEffect(() => {
    if (gridRef) {
      gridRef.current.setColumnSizesToFit()
      console.info('grid reference',gridRef.current)
    }
  }, [gridRef])

  const gridElement = (
    <ReactDataGrid
      licenseKey={process.env.REACT_APP_DATA_GRID_LICENSE_KEY}
      idProperty={props.idProperty}
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
      limit={30}
      style={gridStyle}
      {...props}
    />
  )
  return (
    <>
      <RowSpan>
        <ColSpan2>
          {props.totalCount &&
            <TotalCount><span/>총 <span>{props?.totalCount[0]}</span> 건의 {props?.totalCount[1]}</TotalCount>}
        </ColSpan2>
        <Small>* shift를 누른 상태에서 스크롤시 좌우 스크롤이 가능합니다.</Small>
      </RowSpan>
      {gridElement}
    </>
  )
}

export default Table


