import {atom} from "jotai";
import {decimalFormat, moneyToFixedFormat, numberToFixedFormat} from "../../../common/StringUtils";
import React from "react";
import {Icon, SwitchComponent} from "../../../components/table";
import {Link} from "react-router-dom";
import {updateCampaignPublish} from "../../../services/campaign/CreativeAxios";

/*광고주 현황 리스트 데이터*/
export const adverStatusAtom = atom([])
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
    textAlign: 'center',
    showColumnMenuTool: false,
  },
  {
    name: 'username',
    header: '광고주 아이디',
    minWidth: 150,
    textAlign: 'center',
    showColumnMenuTool: false,
  },
  {
    name: 'campaignCount',
    header: '캠페인 수',
    minWidth: 100,
    textAlign: 'center',
    render: ({value}) => <p>{decimalFormat(value)}</p>,
    showColumnMenuTool: false
  },
  {
    name: 'exposureCount',
    header: '노출 수',
    minWidth: 100,
    textAlign: 'end',
    render: ({value}) => <p>{decimalFormat(value)}</p>,
    showColumnMenuTool: false
  },
  {
    name: 'validClickCount',
    header: '클릭 수',
    minWidth: 100,
    textAlign: 'end',
    render: ({value}) => <p>{decimalFormat(value)}</p>,
    showColumnMenuTool: false
  },
  {
    name: 'clickRate',
    header: '클릭률',
    minWidth: 100,
    textAlign: 'end',
    cellDOMProps: (cellProps) => ({ style: {color: '#1E8E3E'} }),
    render: ({data}) => {
      let value = data.exposureCount !== 0 ? (data.validClickCount / data.exposureCount) * 100 : 0;
      return <p className={'pct'}>{numberToFixedFormat(value)}</p>
    },
    showColumnMenuTool: false
  },
  {
    name: 'costAmount',
    header: '비용',
    minWidth: 180,
    textAlign: 'end',
    cellDOMProps: (cellProps) => ({ style: {color: '#D93025'} }),
    render: ({value}) => <p className={'won'}>{decimalFormat(value)}</p>,
    showColumnMenuTool: false
  },
  {
    name: 'cpc',
    header: 'CPC',
    minWidth: 100,
    textAlign: 'end',
    cellDOMProps: (cellProps) => ({ style: {color: '#7325D9'} }),
    render: ({data}) => {
      let value = data.validClickCount !== 0 ? data?.costAmount / data.validClickCount : 0;
      return <p className={'won'}>{moneyToFixedFormat(value)}</p>
    },
    showColumnMenuTool: false
  },
  {
    name: 'totalConversionCount',
    header: '전환 수',
    minWidth: 100,
    textAlign: 'end',
    cellDOMProps: (cellProps) => ({ style: {color: '#D93025'} }),
    render: ({value}) => <p>{decimalFormat(value)}</p>,
    showColumnMenuTool: false
  },
  {
    name: 'conversionRate',
    header: '전환율',
    minWidth: 100,
    textAlign: 'end',
    cellDOMProps: (cellProps) => ({ style: {color: '#1E8E3E'} }),
    render: ({data}) => {
      let value = data.validClickCount !== 0 ? (data.totalConversionCount / data.validClickCount) * 100 : 0;
      return <p className={'pct'}>{numberToFixedFormat(value)}</p>
    },
    showColumnMenuTool: false
  },
  {
    name: 'costPerConversion',
    header: '전환 단가',
    minWidth: 100,
    textAlign: 'end',
    cellDOMProps: (cellProps) => ({ style: {color: '#1A73E8'} }),
    render: ({data}) => {
      let value = data.totalConversionCount !== 0 ? data?.costAmount / data.totalConversionCount : 0;
      return <p className={'won'}>{moneyToFixedFormat(value)}</p>
    },
    showColumnMenuTool: false
  },
  {
    name: 'avgConversionAmount',
    header: '평균 구매액',
    minWidth: 150,
    textAlign: 'end',
    cellDOMProps: (cellProps) => ({ style: {color: '#1A73E8'} }),
    render: ({data}) => {
      let value = data.totalConversionCount !== 0 ? data.totalConversionAmount / data.totalConversionCount : 0;
      return <p className={'won'}>{moneyToFixedFormat(value)}</p>
    },
    showColumnMenuTool: false
  },
  {
    name: 'sessionConversionAmount',
    minWidth: 150,
    textAlign: 'end',
    cellDOMProps: (cellProps) => ({ style: {color: '#1A73E8'} }),
    header: () => {
      return(
        <div><p>세션매출</p><small>(ROAS)</small></div>
      )
    },
    render: ({value,data}) => {
      let pctValue = data.costAmount !== 0 ? (value / data.costAmount) * 100 : 0;
      return <><p className={'won'}>{moneyToFixedFormat(value)}</p><small style={{color: '#1E8E3E'}}>({numberToFixedFormat(pctValue)} %)</small></>
    },
    showColumnMenuTool: false
  },
  {
    name: 'directConversionAmount',
    minWidth: 150,
    textAlign: 'end',
    cellDOMProps: (cellProps) => ({ style: {color: '#1A73E8'} }),
    header: () => {
      return(
        <div><p>직접매출</p><small>(ROAS)</small></div>
      )
    },
    render: ({value,data}) => {
      let pctValue = data.costAmount !== 0 ? (value / data.costAmount) * 100 : 0;
      return <><p className={'won'}>{moneyToFixedFormat(value)}</p><small style={{color: '#1E8E3E'}}>({numberToFixedFormat(pctValue)} %)</small></>
    },
    showColumnMenuTool: false
  },
  // {
  //   name: 'exposureConversionAmount',
  //   minWidth: 150,
  //   textAlign: 'end',
  //   cellDOMProps: (cellProps) => ({ style: {color: '#1A73E8'} }),
  //   header: () => {
  //     return(
  //       <div><p>노출매출</p><small>(ROAS)</small></div>
  //     )
  //   },
  //   render: ({value,data}) => {
  //     let pctValue = data.costAmount !== 0 ? (value / data.costAmount) * 100 : 0;
  //     return <><p className={'won'}>{moneyToFixedFormat(value)}</p><small style={{color: '#1E8E3E'}}>({numberToFixedFormat(pctValue)} %)</small></>
  //   },
  //   showColumnMenuTool: false
  // },
  {
    name: 'totalConversionAmount',
    textAlign: 'end',
    minWidth: 150,
    cellDOMProps: (cellProps) => ({ style: {color: '#1A73E8'} }),
    header: () => {
      return(
        <div><p>총매출</p><small>(ROAS)</small></div>
      )
    },
    render: ({value,data}) => {
      let pctValue = data.costAmount !== 0 ? (value / data.costAmount) * 100 : 0;
      return <><p className={'won'}>{moneyToFixedFormat(value)}</p><small style={{color: '#1E8E3E'}}>({numberToFixedFormat(pctValue)} %)</small></>
    },
    showColumnMenuTool: false
  },
  {
    name: 'ecpm',
    header: 'ECPM',
    minWidth: 100,
    textAlign: 'end',
    cellDOMProps: (cellProps) => ({ style: {color: '#7325D9'} }),
    render: ({data}) => {
      let value = data.exposureCount !== 0 ? (data.totalConversionAmount / data.exposureCount) * 1000 : 0;
      return <p className={'won'}>{moneyToFixedFormat(value)}</p>
    },
    showColumnMenuTool: false
  }
]
/*광고주 현황 디테일 리스트 데이터*/
export const adverStatusDetailAtom = atom([])
/**
 * 광고주 현황 리스트 디테일 컬럼 설정
 */

export const adverStatusDetailColumn = [
  {
    name: 'userId',
    header:'',
    defaultVisible: false
  },
  {
    name: 'publishYn',
    header: '게재 여부',
    textAlign: 'center',
    minWidth: 100,
    maxWidth: 100,
    showColumnMenuTool: false,
    sortable: false,
    render: ({value, cellProps}) => {
      const valueYn = (value === 'Y');
      return (
        <div style={{display: "flex", alignItems: 'center', justifyContent: 'center'}}>
          <SwitchComponent value={valueYn} type={'publish'} cellProps={cellProps} eventClick={()=> updateCampaignPublish(cellProps.data.campaignId, !valueYn)}/>
        </div>
      );
    }
  },
  {
    name: 'campaignName',
    header: '캠페인명',
    textAlign: 'center',
    minWidth: 150,
    showColumnMenuTool: false,
    cellProps: {
      style: {
        textDecoration: 'underline',
      }
    },
    render: ({data, value}) => {
      return <Link to={'/board/campaignLookOver'} state={{campaignId: data?.campaignId, adverInfo: data?.adverInfo}} className={'line-clamp_2'}>{value}</Link>
    }
  },
  {
    name: 'campaignId',
    header: '캠페인 코드',
    textAlign: 'center',
    sortable: false,
    minWidth: 90,
    maxWidth: 90,
    showColumnMenuTool: false,
    render: ({value}) => {
      return  <Icon icon={'copyCode'} value={value} />
    }
  },
  {
    name: 'dailyAvgBudget',
    header: '예산설정',
    minWidth: 150,
    textAlign: 'center',
    showColumnMenuTool: false,
    cellProps: {
      style: {
        textDecoration: 'underline'
      }
    },
    render: ({value, data}) => {
      let valueFormat = data.infiniteBudgetYn !== 'N' ? '무제한': <p>{decimalFormat(value)} 원</p>
      return  <Link to={'/board/campaignTwo'} state={{campaignId: data?.campaignId, userId: data?.userId, adverInfo: data?.adverInfo}}>{valueFormat}</Link>
    }
  },
  {
    name: 'advertiseGroupName',
    header: '광고 그룹',
    textAlign: 'center',
    minWidth: 150,
    showColumnMenuTool: false,
    cellProps: {
      style: {
        textDecoration: 'underline'
      }
    },
    render: ({value, data}) => {
      return <Link to={'/board/campaignThree'} state={{campaignId: data?.campaignId, adverInfo: data?.adverInfo}} className={'line-clamp_2'}>{value}</Link>
    }
  },
  {
    name: 'creativeName',
    header: '크리에이티브',
    textAlign: 'center',
    minWidth: 150,
    showColumnMenuTool: false,
    cellProps: {
      style: {
        textDecoration: 'underline'
      }
    },
    render: ({value, data}) => {
      return <Link to={'/board/campaignFour'} state={{campaignId: data?.campaignId, creativeType: data?.creativeType, productType: data.productType, adverInfo: data?.adverInfo}} className={'line-clamp_2'}>{value}</Link>
    }
  },
  {
    name: 'exposureCount',
    header: '노출수',
    minWidth: 150,
    showColumnMenuTool: false,
    textAlign: 'end',
    render: ({value}) => <p>{decimalFormat(value)}</p>,
  },
  {
    name: 'validClickCount',
    header: '클릭수',
    minWidth: 150,
    showColumnMenuTool: false,
    textAlign: 'end',
    render: ({value}) => <p>{decimalFormat(value)}</p>,
  },
  {
    name: 'clickRate',
    header: '클릭률',
    minWidth: 150,
    textAlign: 'end',
    cellDOMProps: (cellProps) => ({ style: {color: '#1E8E3E'} }),
    render: ({data}) => {
      let value = data.exposureCount !== 0 ? (data.validClickCount / data.exposureCount) * 100 : 0;
      return <p className={'pct'}>{numberToFixedFormat(value)}</p>
    },
    showColumnMenuTool: false
  },
  {
    name: 'costAmount',
    header: '비용',
    minWidth: 150,
    textAlign: 'end',
    cellDOMProps: (cellProps) => ({ style: {color: '#D93025'} }),
    render: ({value}) => <p className={'won'}>{decimalFormat(value)}</p>,
    showColumnMenuTool: false
  },
  {
    name: 'cpc',
    header: 'CPC',
    minWidth: 150,
    textAlign: 'end',
    cellDOMProps: (cellProps) => ({ style: {color: '#7325D9'} }),
    render: ({data}) => {
      let value = data.validClickCount !== 0 ? data?.costAmount / data.validClickCount : 0;
      return <p className={'won'}>{moneyToFixedFormat(value)}</p>
    },
    showColumnMenuTool: false
  },
  {
    name: 'totalConversionCount',
    header: '전환 수',
    minWidth: 100,
    textAlign: 'end',
    cellDOMProps: (cellProps) => ({ style: {color: '#D93025'} }),
    render: ({value}) => <p>{decimalFormat(value)}</p>,
    showColumnMenuTool: false
  },
  {
    name: 'conversionRate',
    header: '전환율',
    minWidth: 100,
    textAlign: 'end',
    cellDOMProps: (cellProps) => ({ style: {color: '#1E8E3E'} }),
    render: ({data}) => {
      let value = data.validClickCount !== 0 ? (data.totalConversionCount / data.validClickCount) * 100 : 0;
      return <p className={'pct'}>{numberToFixedFormat(value)}</p>
    },
    showColumnMenuTool: false
  },
  {
    name: 'costPerConversion',
    header: '전환 단가',
    minWidth: 150,
    textAlign: 'end',
    cellDOMProps: (cellProps) => ({ style: {color: '#1A73E8'} }),
    render: ({data}) => {
      let value = data.totalConversionCount !== 0 ? data?.costAmount / data.totalConversionCount : 0;
      return <p className={'won'}>{moneyToFixedFormat(value)}</p>
    },
    showColumnMenuTool: false
  },
  {
    name: 'avgConversionAmount',
    header: '평균 구매액',
    minWidth: 150,
    textAlign: 'end',
    cellDOMProps: (cellProps) => ({ style: {color: '#1A73E8'} }),
    render: ({data}) => {
      let value = data.totalConversionCount !== 0 ? data.totalConversionAmount / data.totalConversionCount : 0;
      return <p className={'won'}>{moneyToFixedFormat(value)}</p>
    },
    showColumnMenuTool: false
  },
  {
    name: 'sessionConversionAmount',
    minWidth: 150,
    textAlign: 'end',
    cellDOMProps: (cellProps) => ({ style: {color: '#1A73E8'} }),
    header: () => {
      return(
        <div><p>세션매출</p><small>(ROAS)</small></div>
      )
    },
    render: ({value,data}) => {
      let pctValue = data.costAmount !== 0 ? (value / data.costAmount) * 100 : 0;
      return <><p className={'won'}>{moneyToFixedFormat(value)}</p><small style={{color: '#1E8E3E'}}>({numberToFixedFormat(pctValue)} %)</small></>
    },
    showColumnMenuTool: false
  },
  {
    name: 'directConversionAmount',
    minWidth: 150,
    textAlign: 'end',
    cellDOMProps: (cellProps) => ({ style: {color: '#1A73E8'} }),
    header: () => {
      return(
        <div><p>직접매출</p><small>(ROAS)</small></div>
      )
    },
    render: ({value,data}) => {
      let pctValue = data.costAmount !== 0 ? (value / data.costAmount) * 100 : 0;
      return <><p className={'won'}>{moneyToFixedFormat(value)}</p><small style={{color: '#1E8E3E'}}>({numberToFixedFormat(pctValue)} %)</small></>
    },
    showColumnMenuTool: false
  },
  // {
  //   name: 'exposureConversionAmount',
  //   minWidth: 150,
  //   textAlign: 'end',
  //   cellDOMProps: (cellProps) => ({ style: {color: '#1A73E8'} }),
  //   header: () => {
  //     return(
  //       <div><p>노출매출</p><small>(ROAS)</small></div>
  //     )
  //   },
  //   render: ({value,data}) => {
  //     let pctValue = data.costAmount !== 0 ? (value / data.costAmount) * 100 : 0;
  //     return <><p className={'won'}>{moneyToFixedFormat(value)}</p><small style={{color: '#1E8E3E'}}>({numberToFixedFormat(pctValue)} %)</small></>
  //   },
  //   showColumnMenuTool: false
  // },
  {
    name: 'totalConversionAmount',
    minWidth: 150,
    textAlign: 'end',
    cellDOMProps: (cellProps) => ({ style: {color: '#1A73E8'} }),
    header: () => {
      return(
        <div><p>총매출</p><small>(ROAS)</small></div>
      )
    },
    render: ({value,data}) => {
      let pctValue = data.costAmount !== 0 ? (data.totalConversionAmount / data.costAmount) * 100 : 0;
      return <><p className={'won'}>{moneyToFixedFormat(value)}</p><small style={{color: '#1E8E3E'}}>({numberToFixedFormat(pctValue)} %)</small></>
    },
    showColumnMenuTool: false
  },
  {
    name: 'ecpm',
    minWidth: 150,
    header: 'ECPM',
    textAlign: 'end',
    cellDOMProps: (cellProps) => ({ style: {color: '#7325D9'} }),
    render: ({data}) => {
      let value = data.exposureCount !== 0 ? (data.totalConversionAmount / data.exposureCount) * 1000 : 0;
      return <p className={'won'}>{moneyToFixedFormat(value)}</p>
    },
    showColumnMenuTool: false
  }
]

/**
 * 특정 광고주 캠페인 현황 리스트 컬럼
 */
export const userCampaignListColumn = [
  {
    name: 'publishYn',
    header: '게재 여부',
    textAlign: 'center',
    minWidth: 100,
    maxWidth: 100,
    showColumnMenuTool: false,
    sortable: false,
    render: ({value}) => <p>{value !== 'N' ? 'ON' : 'OFF'}</p>
  },
  {
    name: 'campaignName',
    header: '캠페인명',
    textAlign: 'center',
    minWidth: 150,
    showColumnMenuTool: false,
    cellProps: {
      style: {
        textDecoration: 'underline'
      }
    },
    render: ({data, value}) => {
      return <Link to={'/board/campaignLookOver'} state={{campaignId: data?.campaignId, adverInfo: data?.adverInfo}}>{value}</Link>
    }
  },
  {
    name: 'dailyAvgBudget',
    header: '예산설정',
    minWidth: 150,
    textAlign: 'center',
    showColumnMenuTool: false,
    render: ({value, data}) => {
      let valueFormat = data.infiniteBudgetYn !== 'N' ? '무제한': <p>{decimalFormat(value)} 원</p>
      return valueFormat
    }
  },
  {
    name: 'advertiseGroupName',
    header: '광고 그룹',
    textAlign: 'center',
    minWidth: 150,
    showColumnMenuTool: false,
  },
  {
    name: 'creativeName',
    header: '크리에이티브',
    textAlign: 'center',
    minWidth: 150,
    showColumnMenuTool: false,
  },
  {
    name: 'exposureCount',
    header: '노출수',
    minWidth: 150,
    showColumnMenuTool: false,
    cellDOMProps: (cellProps) => ({ style: {textAlign: 'right'} }),
    render: ({value}) => <p>{decimalFormat(value)}</p>,
  },
  {
    name: 'validClickCount',
    header: '클릭수',
    minWidth: 150,
    showColumnMenuTool: false,
    cellDOMProps: (cellProps) => ({ style: {textAlign: 'right'} }),
    render: ({value}) => <p>{decimalFormat(value)}</p>,
  },
  {
    name: 'clickRate',
    header: '클릭률',
    minWidth: 150,
    cellDOMProps: (cellProps) => ({ style: {color: '#1E8E3E', textAlign: 'right'} }),
    render: ({data}) => {
      let value = data.exposureCount !== 0 ? (data.validClickCount / data.exposureCount) * 100 : 0;
      return <p className={'pct'}>{numberToFixedFormat(value)}</p>
    },
    showColumnMenuTool: false
  },
  {
    name: 'costAmount',
    header: '비용',
    minWidth: 150,
    cellDOMProps: (cellProps) => ({ style: {color: '#D93025', textAlign: 'right'} }),
    render: ({value}) => <p className={'won'}>{decimalFormat(value)}</p>,
    showColumnMenuTool: false
  },
  {
    name: 'cpc',
    header: 'CPC',
    minWidth: 150,
    cellDOMProps: (cellProps) => ({ style: {color: '#7325D9', textAlign: 'right'} }),
    render: ({data}) => {
      let value = data.validClickCount !== 0 ? data?.costAmount / data.validClickCount : 0;
      return <p className={'won'}>{moneyToFixedFormat(value)}</p>
    },
    showColumnMenuTool: false
  },
  {
    name: 'totalConversionCount',
    header: '전환 수',
    minWidth: 100,
    cellDOMProps: (cellProps) => ({ style: {color: '#D93025', textAlign: 'right'} }),
    render: ({value}) => <p>{decimalFormat(value)}</p>,
    showColumnMenuTool: false
  },
  {
    name: 'conversionRate',
    header: '전환율',
    minWidth: 100,
    cellDOMProps: (cellProps) => ({ style: {color: '#1E8E3E', textAlign: 'right'}}),
    render: ({data}) => {
      let value = data.validClickCount !== 0 ? (data.totalConversionCount / data.validClickCount) * 100 : 0;
      return <p className={'pct'}>{numberToFixedFormat(value)}</p>
    },
    showColumnMenuTool: false
  },
  {
    name: 'costPerConversion',
    header: '전환 단가',
    minWidth: 150,
    cellDOMProps: (cellProps) => ({ style: {color: '#1A73E8', textAlign: 'right'}}),
    render: ({data}) => {
      let value = data.totalConversionCount !== 0 ? data?.costAmount / data.totalConversionCount : 0;
      return <p className={'won'}>{moneyToFixedFormat(value)}</p>
    },
    showColumnMenuTool: false
  },
  {
    name: 'avgConversionAmount',
    header: '평균 구매액',
    minWidth: 150,
    cellDOMProps: (cellProps) => ({ style: {color: '#1A73E8', textAlign: 'right'}}),
    render: ({data}) => {
      let value = data.totalConversionCount !== 0 ? data.totalConversionAmount / data.totalConversionCount : 0;
      return <p className={'won'}>{moneyToFixedFormat(value)}</p>
    },
    showColumnMenuTool: false
  },
  {
    name: 'totalConversionAmount',
    minWidth: 150,
    cellDOMProps: (cellProps) => ({ style: {color: '#1A73E8', textAlign: 'right'}}),
    header: () => {
      return(
        <div><p>총매출</p><small>(ROAS)</small></div>
      )
    },
    render: ({value,data}) => {
      let pctValue = data.costAmount !== 0 ? (data.totalConversionAmount / data.costAmount) * 100 : 0;
      return <><p className={'won'}>{moneyToFixedFormat(value)}</p><small style={{color: '#1E8E3E'}}>({numberToFixedFormat(pctValue)} %)</small></>
    },
    showColumnMenuTool: false
  },
  {
    name: 'ecpm',
    minWidth: 150,
    header: 'ECPM',
    cellDOMProps: (cellProps) => ({ style: {color: '#7325D9', textAlign: 'right'}}),
    render: ({data}) => {
      let value = data.exposureCount !== 0 ? (data.totalConversionAmount / data.exposureCount) * 1000 : 0;
      return <p className={'won'}>{moneyToFixedFormat(value)}</p>
    },
    showColumnMenuTool: false
  }
]

export const lockedRows = [
  {
    position: 'start',
    cellStyle : ({ column }) => {
      const style = {
        justifyContent: 'flex-end',
        minHeight: '50px',
        fontWeight: 600
      }
      if(column.name === 'adverName'){
        style.fontSize ='15px';
        style.justifyContent = 'center'
      }
      if(column.name === 'username' || column.name === 'campaignCount' ) {style.justifyContent = 'center'}
      if(column.name === 'costAmount' || column.name === 'totalConversionCount') {style.color = '#D93025'}
      if(column.name === 'clickRate' || column.name === 'conversionRate') {style.color = '#1E8E3E'}
      if(column.name === 'cpc' || column.name === 'ecpm') {style.color = '#7325D9'}

      if(column.name === 'costPerConversion' || column.name === 'avgConversionAmount' || column.name === 'sessionConversionAmount' || column.name === 'directConversionAmount' || column.name === 'exposureConversionAmount' || column.name === 'totalConversionAmount' ) {style.color = '#1A73E8'}

      return style
    },
    // colspan: {
    //   adverName: 2
    // },
    // colspan:  ({ column }) => {
    //   if(column.id === '__row-expand-column') return 2
    // },
    render: {
      adverName: 'Total',
      username: ({ summary }) => <p>{decimalFormat(summary.username)}</p>,
      campaignCount: ({ summary }) => <p>{decimalFormat(summary.campaignCount)}</p>,
      exposureCount: ({ summary }) => <p>{decimalFormat(summary.exposureCount)}</p>,
      validClickCount: ({ summary }) => <p>{decimalFormat(summary.validClickCount)}</p>,
      clickRate: ({ summary }) => <p className={'pct'}>{summary.exposureCount !== 0 ? numberToFixedFormat((summary.validClickCount / summary.exposureCount) * 100) : 0}</p>,
      costAmount: ({ summary }) => <p className={'won'}>{moneyToFixedFormat(summary.costAmount)}</p>,
      cpc: ({ summary }) => <p className={'won'}>{summary.validClickCount !== 0 ? moneyToFixedFormat(summary.costAmount / summary.validClickCount) : 0}</p>,
      totalConversionCount: ({ summary }) => <p>{decimalFormat(summary.totalConversionCount)}</p>,
      conversionRate: ({ summary }) => <p className={'pct'}>{summary.validClickCount !== 0 ? numberToFixedFormat((summary.totalConversionCount / summary.validClickCount) * 100) : 0}</p>,
      costPerConversion: ({ summary }) => <p className={'won'}>{summary.totalConversionCount !== 0 ? moneyToFixedFormat(summary.costAmount / summary.totalConversionCount) : 0}</p>,
      avgConversionAmount: ({ summary }) => <p className={'won'}>{summary.totalConversionCount !== 0 ? moneyToFixedFormat(summary.totalConversionAmount / summary.totalConversionCount) : 0}</p>,
      sessionConversionAmount: ({ summary }) => {
        let pctValue = summary.costAmount !== 0 ? (summary.sessionConversionAmount / summary.costAmount) * 100 : 0;
        return (
          <div style={{display: 'flex', flexDirection : 'column', alignItems: 'flex-end'}}>
            <p className={'won'}>{moneyToFixedFormat(summary.sessionConversionAmount)}</p>
            <small style={{color: '#1E8E3E'}}>({numberToFixedFormat(pctValue)} %)</small>
          </div>
        )
      },
      directConversionAmount: ({ summary }) => {
        let pctValue = summary.costAmount !== 0 ? (summary.directConversionAmount / summary.costAmount) * 100 : 0;
        return (
          <div style={{display: 'flex', flexDirection : 'column', alignItems: 'flex-end'}}>
            <p className={'won'}>{moneyToFixedFormat(summary.directConversionAmount)}</p>
            <small style={{color: '#1E8E3E'}}>({numberToFixedFormat(pctValue)} %)</small>
          </div>
        )
      },
      exposureConversionAmount: ({ summary }) => {
        let pctValue = summary.costAmount !== 0 ? (summary.exposureConversionAmount / summary.costAmount) * 100 : 0;
        return (
          <div style={{display: 'flex', flexDirection : 'column', alignItems: 'flex-end'}}>
            <p className={'won'}>{moneyToFixedFormat(summary.exposureConversionAmount)}</p>
            <small style={{color: '#1E8E3E'}}>({numberToFixedFormat(pctValue)} %)</small>
          </div>
        )
      },
      totalConversionAmount: ({ summary }) => {
        let pctValue = summary.costAmount !== 0 ? (summary.totalConversionAmount / summary.costAmount) * 100 : 0;
        return (
          <div style={{display: 'flex', flexDirection : 'column', alignItems: 'flex-end'}}>
            <p className={'won'}>{moneyToFixedFormat(summary.totalConversionAmount)}</p>
            <small style={{color: '#1E8E3E'}}>({numberToFixedFormat(pctValue)} %)</small>
          </div>
        )
      },
      ecpm: ({ summary }) => <p className={'won'}>{summary.exposureCount !== 0 ? moneyToFixedFormat((summary.totalConversionAmount / summary.exposureCount) * 1000) : 0}</p>,
    }
  }
]
export const summaryReducer = {
  initialValue: {
    campaignCount: 0,
    exposureCount: 0,
    validClickCount: 0,
    costAmount: 0,
    totalConversionCount: 0,
    totalConversionAmount: 0,
    sessionConversionAmount: 0,
    directConversionAmount: 0,
    exposureConversionAmount: 0,
  },
  reducer: (accumulator, item) => {
    if(item !== null) {
      accumulator.campaignCount += item.campaignCount
      accumulator.exposureCount += item.exposureCount
      accumulator.validClickCount += item.validClickCount
      accumulator.costAmount += item.costAmount
      accumulator.totalConversionCount += item.totalConversionCount
      accumulator.totalConversionAmount += item.totalConversionAmount
      accumulator.sessionConversionAmount += item.sessionConversionAmount
      accumulator.directConversionAmount += item.directConversionAmount
      accumulator.exposureConversionAmount += item.exposureConversionAmount
    }
    return accumulator
  },
  complete: (accumulator, arr) => {
    accumulator.username = arr.length
    return accumulator
  }
};

