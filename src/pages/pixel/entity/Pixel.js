import {atom, useAtomValue} from "jotai";
import React from "react";
import {Link} from "react-router-dom";
import {PixelModal, SubCategory} from "../PixelList";
import {Icon, SwitchComponent} from "../../../components/table";
import {updateEventInterlock, updatePixelInterlock} from "../../../services/header/ManagePixelAxios";
import {HorizontalRule} from "../../../components/common/Common";
import {
  retrieveSubLevelCategoryKeyValue,
  retrieveTopLevelCategoryKeyValue
} from "../../../services/Platform/CategoryAxios";
import {topLevelCategoryListAtom} from "../../platform_manage/entity/Category";
import {hostList} from "../../signup/entity/Common";

/**
 * 픽셀 관리 리스트 Atom
 */
export const pixelDataAtom = atom(null)

export const pixelInfoListAtom = atom(null)


export const pixelDetailDataAtom = atom([
  {
    name: 'groupName',
  }
])

export const statusTypeAll = [
  {key:0, value:'NORMAL', label:'정상 수집', color: '#6fa1db'},
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
        <PixelModal title={'추가'} data={cellProps.data} />
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
    name: 'interlockYn',
    header: '연동 상태',
    minWidth:200,
    maxWidth:200,
    textAlign: 'center',
    showColumnMenuTool: false,
    sortable: false,
    render: ({value, cellProps}) => {
      const valueYn = (value === 'Y');
      return (
        <div style={{display: "flex", alignItems: 'center', justifyContent: 'center'}}>
          <SwitchComponent value={valueYn} cellProps={cellProps} eventClick={()=> updatePixelInterlock(cellProps.data.pixelId, !valueYn)}/>
        </div>
      );
    }
  },
  {
    name: 'pixelName',
    header: '픽셀명',
    defaultFlex: 1,
    textAlign: 'center',
    showColumnMenuTool: false,
    cellProps: {
      style: {
        textDecoration: 'underline'
      }
    },
    resizable: false,
    render: (props) => {
      return (
        <Link to={'/board/pixelDetail'} state={{id: props.data.pixelId}}>{props.value}</Link>
      )
    }
  },
  {
    name: 'mainCategoryLabel',
    header: '카테고리',
    textAlign: 'center',
    showColumnMenuTool: false,
    resizable: false,
    render: (props) => {
      return (
        <span>{props.value}</span>
      )
    }
  },
  {
    name: 'subCategoryCode',
    header: '하위 카테고리',
    textAlign: 'center',
    showColumnMenuTool: false,
    resizable: false,
    render: ({value, data}) => {
      return (
        <SubCategory topLevelCategory={data.mainCategoryCode} subs={value}/>
      )
    }
  },
  {
    name: 'hostType',
    header: '호스팅',
    defaultFlex: 1,
    textAlign: 'center',
    showColumnMenuTool: false,
    resizable: false,
    render: ({value}) => {
      return (
        <span>{hostList.find(host => host.value === value).label}</span>
      )
    }
  },
  {
    name: 'linkUrl',
    header: '연동 URL',
    defaultFlex: 2,
    textAlign: 'center',
    showColumnMenuTool: false,
    resizable: false,
  },
  {
    name: 'status',
    header: '이벤트 수집 상태',
    defaultFlex: 1,
    textAlign: 'center',
    resizable: false,
    showColumnMenuTool: false,
    render: ({value}) => {
      let textColor = {color: statusTypeAll.find(type => type.value === value).color};
      return (
        <span style={textColor}>{statusTypeAll.find(type => type.value === value).label}</span>
      )
    }
  }
]

export const pixelDetailInfoColumns = [
  {
    name: 'interlockYn',
    header: '연동 상태',
    minWidth:90,
    maxWidth:90,
    showColumnMenuTool: false,
    sortable: false,
    render: ({value, cellProps}) => {
      const valueYn = (value === 'Y');
      return (
        <div style={{display: "flex", alignItems: 'center', justifyContent: 'center'}}>
          <SwitchComponent value={valueYn} cellProps={cellProps} eventClick={()=> updateEventInterlock(cellProps.data.eventId, !valueYn)}/></div>
      );
    }
  },
  {
    name: 'eventName',
    header: '이벤트명',
    defaultFlex: 1,
    showColumnMenuTool: false,
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
    minWidth:300,
    maxWidth:300,
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

export const pixelDetailAdverInfoColumns = [
  {
    name: 'interlockYn',
    header: '연동 상태',
    minWidth:90,
    maxWidth:90,
    showColumnMenuTool: false,
    sortable: false,
    render: ({value, cellProps}) => {
      const valueYn = (value === 'Y' ? '연동' : '중지');
      return (
        <div style={{display: "flex", alignItems: 'center', justifyContent: 'center'}}>
          {valueYn}
        </div>
      );
    }
  },
  {
    name: 'eventName',
    header: '이벤트명',
    defaultFlex: 1,
    showColumnMenuTool: false,
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
    minWidth:300,
    maxWidth:300,
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

/**
 * 픽셀 관리 리스트 상세 리스트 컬럼 세팅
 * @type {[{defaultFlex: number, name: string, header: string},{defaultFlex: number, resizable: boolean, name: string, header: string, render: (function({value: *}): *)},{defaultFlex: number, resizable: boolean, name: string, header: string, render: (function({value: *}): *)},{defaultFlex: number, resizable: boolean, name: string, header: string, render: (function({value: *}): *)},{defaultFlex: number, resizable: boolean, name: string, header: string, render: (function({value: *}): *)},null,null]}
 */
export const pixelAdverDetailColumns = [
  {
    name: 'interlockYn',
    header: '연동 상태',
    minWidth:200,
    maxWidth:200,
    textAlign: 'center',
    showColumnMenuTool: false,
    sortable: false,
    render: ({value, cellProps}) => {
      const valueYn = (value === 'Y' ? '연동 중' : '연동 중지');
      return (
        <span>{valueYn}</span>
      );
    }
  },
  {
    name: 'pixelName',
    header: '픽셀명',
    defaultFlex: 1.2,
    textAlign: 'center',
    showColumnMenuTool: false,
    cellProps: {
      style: {
        textDecoration: 'underline'
      }
    },
    resizable: false,
    render: (props) => {
      return (
        <Link to={'/board/pixelDetail'} state={{id: props.data.pixelId}}>{props.value}</Link>
      )
    }
  },
  {
    name: 'mainCategoryLabel',
    header: '카테고리',
    textAlign: 'center',
    showColumnMenuTool: false,
    resizable: false,
    render: (props) => {
      console.log(props)
      return (
        <span>{props.value}</span>
      )
    }
  },
  {
    name: 'subCategoryCode',
    header: '하위 카테고리',
    textAlign: 'center',
    showColumnMenuTool: false,
    resizable: false,
    render: ({value, data}) => {
      return (
        <SubCategory topLevelCategory={data.mainCategoryCode} subs={value}/>
      )
    }
  },
  {
    name: 'hostType',
    header: '호스팅',
    defaultFlex: 1,
    textAlign: 'center',
    showColumnMenuTool: false,
    resizable: false,
    render: ({value}) => {
      return (
        <span>{hostList.find(host => host.value === value).label}</span>
      )
    }
  },
  {
    name: 'linkUrl',
    header: '연동 URL',
    defaultFlex: 2,
    textAlign: 'center',
    showColumnMenuTool: false,
    resizable: false,
  },
  {
    name: 'status',
    header: '이벤트 수집 상태',
    defaultFlex: 1,
    textAlign: 'center',
    resizable: false,
    showColumnMenuTool: false,
    render: ({value}) => {
      let textColor = {color: statusTypeAll.find(type => type.value === value).color};
      return (
        <span style={textColor}>{statusTypeAll.find(type => type.value === value).label}</span>
      )
    }
  }
]
