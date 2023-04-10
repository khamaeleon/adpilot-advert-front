import {atom} from "jotai";
import {decimalFormat} from "../../../common/StringUtils";
import React from "react";
import {Icon, SwitchComponent} from "../../../components/table";
import {updatePixelInterlock} from "../../../services/header/ManagePixelAxios";
import {Link} from "react-router-dom";

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

/**
 * 광고주 현황 리스트 디테일 컬럼 설정
 */
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
    name: 'linkUrl',
    header: '캠페인명',
    defaultFlex: 1,
    textAlign: 'center',
    showColumnMenuTool: false,
    resizable: false,
    cellProps: {
      style: {
        textDecoration: 'underline'
      }
    },
    render: ({value, cellProps}) => {
      return (
        <Link to={'/board/campaignInfoDetail'} state={{id: cellProps.userId}}>{'캠페인 설정 상세'}</Link>
      )
    }
  },
  {
    name: 'linkUrl',
    header: '캠페인 코드',
    defaultFlex: 1,
    textAlign: 'center',
    showColumnMenuTool: false,
    resizable: false,
    render: ({value, cellProps}) => {
      return (
        <div style={{display: "flex", alignItems: 'center', justifyContent: 'center'}}>
          <span>{'캠페인 코드'}</span>
          <Icon icon={'script'} data={cellProps.data} />
        </div>
      )
    }
  },
  {
    name: 'pixelName',
    header: '예산설정',
    defaultFlex: 1,
    textAlign: 'center',
    showColumnMenuTool: false,
    cellProps: {
      style: {
        textDecoration: 'underline'
      }
    },
    render: ({value, cellProps}) => {
      return (
        <Link to={'/board/campaignBudgetDetail'} state={{id: cellProps.userId}}>{'예산 설정 상세'}</Link>
      )
    }
  },
  {
    name: 'pixelName',
    header: '광고 그룹',
    defaultFlex: 1,
    textAlign: 'center',
    showColumnMenuTool: false,
    cellProps: {
      style: {
        textDecoration: 'underline'
      }
    },
    render: ({value, cellProps}) => {
      return (
        <Link to={'/board/campaignGroupDetail'} state={{id: cellProps.userId}}>{'광고 설정 상세'}</Link>
      )
    }
  },
  {
    name: 'pixelName',
    header: '크리에이티브 설정 상세',
    defaultFlex: 1,
    textAlign: 'center',
    showColumnMenuTool: false,
    cellProps: {
      style: {
        textDecoration: 'underline'
      }
    },
    render: ({value, cellProps}) => {
      return (
        <Link to={'/board/campaignCreativeDetail'} state={{id: cellProps.userId}}>{'크리에이티브 설정 상세'}</Link>
      )
    }
  }
]

