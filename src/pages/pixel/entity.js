import {atom} from "jotai/index";
import React from "react";
import {Icon, SwitchComponent} from "../../components/table";
import {PixelAdd, PixelModal} from "./PixelList";
import {Link} from "react-router-dom";
import {HorizontalRule} from "../../components/common/Common";

/**
 * 픽셀 관리 리스트 Atom
 * @type {Atom<unknown>}
 */
export const pixelDataAtom = atom(null)

export const pixelInfoListAtom = atom(null)


export const pixelDetailDataAtom = atom([
  {
    name: 'groupName',
  }
])

export const statusTypeAll = [
  {key:0, value:'NORMAL', label:'수집중', color: '#6fa1db'},
  {key:1, value:'STOPPED', label:'수집 중지', color: '#777'},
  {key:2, value:'WAITING', label:'수집 전', color: '#db6f6f'},
  {key:3, value:'PENDING', label:'확인 필요', color: '#db6f6f'}
]

/**
 * 픽셀 관리 리스트 컬럼세팅
 * @type {[{defaultFlex: number, name: string, cellProps: {style: {textDecoration: string}}, header: string, render: (function(*): *)},{defaultFlex: number, resizable: boolean, name: string, header: string},{defaultFlex: number, resizable: boolean, name: string, header: string},{defaultFlex: number, resizable: boolean, name: string, header: string}]}
 */
export const pixelColumns = [
  {
    name: 'adverName',
    header: '광고주명',
    defaultFlex: 2,
    showColumnMenuTool: false,
  },
  {
    name: 'userId',
    header:'',
    defaultVisible: false

  },
  {
    name: 'pixelCnt',
    header: '등록된 픽셀',
    defaultFlex: 1,
    showColumnMenuTool: false,
    resizable: false,
  },
  {
    name: 'username',
    header: '아이디',
    defaultFlex: 1,
    showColumnMenuTool: false,
    resizable: false,
  },
  {
    name: 'managerName',
    header: '담당자 명',
    defaultFlex: 1,
    showColumnMenuTool: false,
    resizable: false
  },
  {
    name: 'count',
    header: '픽셀 추가',
    width: 100,
    resizable: false,
    showColumnMenuTool: false,
    sortable: false,
    render: ({value, cellProps}) => {
      return (
        <PixelModal title={'추가'} data={cellProps.data}/>
      )
    }
  }
]

/**
 * 픽셀 관리 리스트 상세 리스트 컬럼 세팅
 * @type {[{defaultFlex: number, name: string, header: string},{defaultFlex: number, resizable: boolean, name: string, header: string, render: (function({value: *}): *)},{defaultFlex: number, resizable: boolean, name: string, header: string, render: (function({value: *}): *)},{defaultFlex: number, resizable: boolean, name: string, header: string, render: (function({value: *}): *)},{defaultFlex: number, resizable: boolean, name: string, header: string, render: (function({value: *}): *)},null,null]}
 */
export const pixelDetailColumns = [
  {
    name: 'interlock',
    header: '연동 상태',
    minWidth:90,
    maxWidth:90,
    showColumnMenuTool: false,
    sortable: false,
    render: ({value, cellProps}) => {
      return (
        <SwitchComponent value={value} cellProps={cellProps} eventClick={false}/>
      );
    }
  },
  {
    name: 'pixelName',
    header: '이벤트명',
    defaultFlex: 1,
    cellProps: {
      style: {
        textDecoration: 'underline'
      }
    },
    render: (props) => {
      return (
        <Link to={'/board/pixelDetail'} state={{id: props.data.pixelId}}>{props.value}</Link>
      )
    }
  },
  {
    name: 'linkUrl',
    header: '연동 URL',
    defaultFlex: 2,
    showColumnMenuTool: false,
    resizable: false,
  },
  {
    name: 'status',
    header: '이벤트 수집 상태',
    defaultFlex: 1,
    resizable: false,
    showColumnMenuTool: false,
    render: ({value}) => {
      return (
        <span>{statusTypeAll.find(type => type.value === value).label}</span>
      )
    }
  }
]

export const pixelDetailInfoColumns = [
  {
    name: 'interlock',
    header: '연동 상태',
    minWidth:120,
    maxWidth:120,
    showColumnMenuTool: false,
    sortable: false,
    render: ({value, cellProps}) => {
      return (
        <div style={{display: "flex", alignItems: 'center', justifyContent: 'center'}}>
          <SwitchComponent value={value} cellProps={cellProps} eventClick={()=> console.log('연동상태')}/>
        </div>
      );
    }
  },
  {
    name: 'eventName',
    header: '이벤트명',
    defaultFlex: 1,
    cellProps: {
      style: {
        textDecoration: 'underline'
      }
    },
    render: (props) => {
      return (
        <Link to={'/board/pixelDetail'} state={{id: props.data.pixelId}}>{props.value}</Link>
      )
    }
  },
  // {
  //   name: 'status',
  //   header: '이벤트 수집 상태',
  //   defaultFlex: 1,
  //   resizable: false,
  //   showColumnMenuTool: false,
  //   render: ({value}) => {
  //     return (
  //
  //     )
  //   }
  // },
  {
    name: 'script',
    header: '이벤트 수집 상태',
    defaultWidth: 300,
    showColumnMenuTool: false,
    render: ({data, cellProps}) => {
      let textColor = {color: statusTypeAll.find(type => type.value === data.status).color};
      return (
        <div style={{display: "flex", alignItems: 'center', justifyContent: 'center'}}>
          <span style={textColor}>{data.status !== undefined && statusTypeAll.find(type => type.value === data.status).label}</span>
          <HorizontalRule style={{margin: '0 10px'}} />
          <Icon icon={'script'} cellProps={cellProps} title={'스크립트 보기'}/>
        </div>
      )
    }
  }
]