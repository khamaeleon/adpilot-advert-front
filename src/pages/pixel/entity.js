import {atom} from "jotai/index";
import React from "react";
import {Icon, SwitchComponent} from "../../components/table";
import {PixelAdd, PixelModal} from "./PixelList";
import {Link} from "react-router-dom";

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
  {key:0, value:'NORMAL', label:'수집중'},
  {key:1, value:'STOPPED', label:'수집 중지'},
  {key:2, value:'WAITING', label:'수집 전'},
  {key:3, value:'PENDING', label:'확인 필요'}
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
        <SwitchComponent value={value} cellProps={cellProps} eventClick={()=> console.log('연동상태')}/>
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
    minWidth:90,
    maxWidth:90,
    showColumnMenuTool: false,
    sortable: false,
    render: ({value, cellProps}) => {
      return (
        <SwitchComponent value={value} cellProps={cellProps} eventClick={()=> console.log('연동상태')}/>
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
  {
    name: 'status',
    header: '이벤트 수집 상태',
    defaultFlex: 1,
    resizable: false,
    showColumnMenuTool: false,
    render: ({value}) => {
      console.log(value)
      return (
        <span>{value !==undefined && statusTypeAll.find(type => type.value === value).label}</span>
      )
    }
  },
  {
    name: 'script',
    header: '스크립트',
    textAlign: 'center',
    defaultWidth: 100,
    render: ({value, cellProps}) => {
      return <Icon icon={'script'} value={value} cellProps={cellProps}/>
    }
  }
]