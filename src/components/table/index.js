import React, {useEffect, useState} from "react";
import {
  CancelButton,
  ColSpan2,
  ColTitle,
  CopyCode,
  RowSpan, SaveExcelButton,
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
import {navigationName} from "../common/entity";
import moment from "moment";
import {useLocation} from "react-router-dom";
import {light} from "../../assets/theme";
import {hostList} from "../../pages/signup/entity/Common";

export function SwitchComponent(props){
  const {value, cellProps, type, eventClick} = props
  const [select, setSelect] = useState(value)
  const [, setModal] = useAtom(modalController)
  const background = !select ? {background: light.color.lightGray} : {background: light.color.mainColor};
  const position = select ? {left: ' calc(100% - 4px)', transform: 'translateX(-100%)'} : null

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
    textarea.style.top = 0;
    textarea.style.left = 0;
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
  const location = useLocation()
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

  const downloadBlob = (blob, fileName = `${navigationName[location.pathname].split('/')[2]}-${moment().format('DDmmss')}.csv`) => {
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    link.style.position = 'absolute';
    link.style.visibility = 'hidden';

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };
  const exportCSV = () => {

    const columns = gridRef.current.visibleColumns;
    const header = columns.map((c) =>
        typeof c.header === 'string' ? c.header : c.label).join(',');
    const rows = gridRef.current.data.map((data) =>
      columns.map((c) => {
        switch (c.id){
          case 'userCompanyProfile': return data['userCompanyProfile'].companyName;
          case 'adverType': return data['adverType'] === 'ADVER' ? "광고주" : "대행사";
          case 'hostType': return hostList.find(obj => obj.value === data['hostType']).label;
          case 'status': return data['status'] !== 'NORMAL' ? "미사용" : "사용";
          case 'productImages': return data['productImages'][0] !== undefined ? data['productImages'][0].imageUrl : '';
          case 'productImages1': return data['productImages'][1] !== undefined ? data['productImages'][1]?.imageUrl: '';
          case 'productImages2': return data['productImages'][2] !== undefined ? data['productImages'][2]?.imageUrl: '';
          case 'productCategorys': return data['productCategorys'][0]?.name;
          case 'productCategorys1': return data['productCategorys'][1]?.name;
          case 'productCategorys2': return data['productCategorys'][2]?.name;
          default: return data[c.id];
        }
      }).join(',')
    );
    const uFEFF = "\uFEFF"

    // Office 2007 이전에는 ANSI 1252 인코딩을 기본 값, BOM을 추가하면 Office 2007 이후 버전
    // 하여 해결책으로 제시하는 바는
    // 1. csv 파일의 포맷을 컴퓨터에서 바꾼다 (매번 변경해줘야하는 번거로움이 생김)
    // 2. 거의 모든 엑셀은 utf든 ansi든 표시할 기능을 갖추고 있음. 엑셀 기본 인코딩 설정을 변경 (뷰어에서 설정을 바꿀수있지만 컴퓨터에 능숙하지 않은 사람에게 교육시키는 일이 어려움)
    // 3. csv를 ANSI로 작성한다 (디코딩 기본값이 utf8인 엑셀을 사용한다면 오히려 ansi로 작성한 파일을 열었을때 깨질수 있음)
    // 4. 구글시트, 폴라리스, 넘버스 등은 자동으로 파일의 인코딩을 잘 알아내는데 반하여 엑셀일부는
    // 가끔 인코딩을 식별하지 못하기 때문에 엑셀에서도 인식할 수 있도록 csv에 인코딩을 표시해준다.
    // (문서의 맨 앞에 /ufeff 문자열을 추가 하면 해당 내용이 어떤 문자열로 인코딩 되었는지 표현하는 식별자.
    // 이것을 맨 앞에 적어 놓으면 엑셀 프로그램은 파일의 인코딩을 이해하고 그에 맞게 출력한다.)

    const contents = [header].concat(rows.map(r=>r.replace('\n',''))).join('\n');
    const blob = new Blob([uFEFF+contents], { encoding: 'UTF-8', type: 'text/csv;charset=utf-8;' });

    downloadBlob(blob);
  };

  /** 국제화 **/
  const i18n = Object.assign({}, ReactDataGrid.defaultProps.i18n, {
    sortAsc: '오름차순',
    sortDesc: '내림차순',
    autoSizeToFit: '자동맞춤',
    autoresizeThisColumn:'이 컬럼에 맞춤',
    autoresizeAllColumns:'전체 컬럼에 맞춤',
    columns: '컬럼'
  })

  const gridElement = (
    <ReactDataGrid
      licenseKey={process.env.REACT_APP_DATA_GRID_LICENSE_KEY}
      idProperty={props.idProperty}
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
      style={gridStyle}
      pagination={props.paginations}
      showHoverRows={false}
      activeCell={null}
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


