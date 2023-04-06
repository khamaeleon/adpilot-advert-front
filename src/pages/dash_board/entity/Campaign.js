import {atom} from "jotai";
import {decimalFormat} from "../../../common/StringUtils";
import React from "react";
import {SwitchComponent} from "../../../components/table";
import {updatePixelInterlock} from "../../../services/header/ManagePixelAxios";
import {Link} from "react-router-dom";
import {statusTypeAll} from "../../pixel/entity/Pixel";

/*광고주 현황 리스트 데이터*/
//export const adverStatusAtom = atom([])
export const adverStatusAtom = atom([
  {
    name: 'adverName',
  }
])
/**
 * 광고주 현황 리스트 컬럼 설정
 */
export const adverListColumn = [
  {
    name: 'userId',
    header:'',
    defaultVisible: false

  },
  {
    name: 'adverName',
    header: '광고주명',
    minWidth: 150,
    showColumnMenuTool: false,
  },
  {
    name: 'username',
    header: '광고주 아이디',
    minWidth: 150,
    showColumnMenuTool: false,
  },
  {
    name: 'campaignCount',
    header: '캠패인 수',
    minWidth: 100,
    render: ({value}) => <p>{decimalFormat(value)}</p>,
    showColumnMenuTool: false
  },
  {
    name: 'groupCount',
    header: '그룹 수',
    minWidth: 100,
    render: ({value}) => <p>{decimalFormat(value)}</p>,
    showColumnMenuTool: false
  },
  {
    name: 'creativeCount',
    header: '크리에이티브 수',
    minWidth: 150,
    render: ({value}) => <p>{decimalFormat(value)}</p>,
    showColumnMenuTool: false
  },
  {
    name: 'mediaExposureCount',
    header: '노출 수',
    minWidth: 100,
    render: ({value}) => <p>{decimalFormat(value)}</p>,
    showColumnMenuTool: false
  },
  {
    name: 'clickCount',
    header: '클릭 수',
    minWidth: 100,
    render: ({value}) => <p>{decimalFormat(value)}</p>,
    showColumnMenuTool: false
  },
  {
    name: 'clickRate',
    header: '클릭률',
    minWidth: 100,
    render: ({ value })=> <p className={'pct'}>{value}</p>,
    showColumnMenuTool: false
  },
  {
    name: 'costAmount',
    header: '비용',
    minWidth: 180,
    render: ({value}) => <p className={'won'}>{decimalFormat(value)}</p>,
    showColumnMenuTool: false
  },
  {
    name: 'cpc',
    header: 'CPC',
    minWidth: 100,
    render: ({value}) => <p>{decimalFormat(value)}</p>,
    showColumnMenuTool: false
  },
  {
    name: 'conversionCount',
    header: '전환 수',
    minWidth: 100,
    render: ({value}) => <p>{decimalFormat(value)}</p>,
    showColumnMenuTool: false
  },
  {
    name: 'conversion',
    header: '전환률',
    minWidth: 100,
    render: ({ value })=> <p className={'pct'}>{value}</p>,
    showColumnMenuTool: false
  },
  {
    name: 'conversion',
    header: '전환 단가',
    minWidth: 100,
    render: ({value}) => <p className={'won'}>{decimalFormat(value)}</p>,
    showColumnMenuTool: false
  },
  {
    name: 'groupCnt',
    header: '평균 구매액',
    minWidth: 150,
    render: ({value}) => <p className={'won'}>{decimalFormat(value)}</p>,
    showColumnMenuTool: false
  },
  {
    name: 'groupCnt',
    minWidth: 150,
    header: () => {
      return(
        <div><p>세션매출</p><p>(ROAS)</p></div>
      )
    },
    render: ({value}) => <p className={'won'}>{decimalFormat(value)}</p>,
    showColumnMenuTool: false
  },
  {
    name: 'groupCnt',
    minWidth: 150,
    header: () => {
      return(
        <div><p>직접매출</p><p>(ROAS)</p></div>
      )
    },
    render: ({value}) => <p className={'won'}>{decimalFormat(value)}</p>,
    showColumnMenuTool: false
  },
  {
    name: 'groupCnt',
    minWidth: 150,
    header: () => {
      return(
        <div><p>총매출</p><p>(ROAS)</p></div>
      )
    },
    render: ({value}) => <p className={'won'}>{decimalFormat(value)}</p>,
    showColumnMenuTool: false
  },
  {
    name: 'groupCnt',
    minWidth: 150,
    header: () => {
      return(
        <div><p>노출매출</p><p>(ROAS)</p></div>
      )
    },
    render: ({value}) => <p className={'won'}>{decimalFormat(value)}</p>,
    showColumnMenuTool: false
  },
  {
    name: 'epcm',
    header: 'EPCM',
    minWidth: 100,
    render: ({value}) => <p>{decimalFormat(value)}</p>,
    showColumnMenuTool: false
  },
]
export const adverStatusDetailColumn = [
  {
    name: 'interlock',
    header: '연동 상태',
    minWidth:200,
    maxWidth:200,
    textAlign: 'center',
    showColumnMenuTool: false,
    sortable: false,
    render: ({value, cellProps}) => {
      return (
        <div style={{display: "flex", alignItems: 'center', justifyContent: 'center'}}>
          <SwitchComponent value={value} cellProps={cellProps} eventClick={()=> updatePixelInterlock(cellProps.data.pixelId,{interlock:cellProps.data.interlock})}/>
        </div>
      );
    }
  },
  {
    name: 'pixelName',
    header: '이벤트명',
    defaultFlex: 1,
    textAlign: 'center',
    showColumnMenuTool: false,
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

