import {atom} from "jotai";
import {decimalFormat, moneyToFixedFormat, numberToFixedFormat} from "../../../common/StringUtils";
import React from "react";
import {Icon, SwitchComponent} from "../../../components/table";
import {updatePixelInterlock} from "../../../services/header/ManagePixelAxios";
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
    header: '캠페인 수',
    minWidth: 100,
    render: ({value}) => <p>{decimalFormat(value)}</p>,
    showColumnMenuTool: false
  },
  {
    name: 'exposureCount',
    header: '노출 수',
    minWidth: 100,
    render: ({value}) => <p>{decimalFormat(value)}</p>,
    showColumnMenuTool: false
  },
  {
    name: 'validClickCount',
    header: '클릭 수',
    minWidth: 100,
    render: ({value}) => <p>{decimalFormat(value)}</p>,
    showColumnMenuTool: false
  },
  {
    name: 'clickRate',
    header: '클릭률',
    minWidth: 100,
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
    render: ({value}) => <p className={'won'}>{decimalFormat(value)}</p>,
    showColumnMenuTool: false
  },
  {
    name: 'cpc',
    header: 'CPC',
    minWidth: 100,
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
    render: ({value}) => <p>{decimalFormat(value)}</p>,
    showColumnMenuTool: false
  },
  {
    name: 'conversionRate',
    header: '전환률',
    minWidth: 100,
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
    render: ({data}) => {
      let value = data.totalConversionCount !== 0 ? data.totalConversionAmount / data.totalConversionCount : 0;
      return <p className={'won'}>{moneyToFixedFormat(value)}</p>
    },
    showColumnMenuTool: false
  },
  {
    name: 'sessionRoas',
    minWidth: 150,
    header: () => {
      return(
        <div><p>세션매출</p><p>(ROAS)</p></div>
      )
    },
    render: ({data}) => {
      let value = data.costAmount !== 0 ? (data.sessionConversionAmount / data.costAmount) * 100 : 0;
      return <p className={'won'}>{moneyToFixedFormat(value)}</p>
    },
    showColumnMenuTool: false
  },
  {
    name: 'directRoas',
    minWidth: 150,
    header: () => {
      return(
        <div><p>직접매출</p><p>(ROAS)</p></div>
      )
    },
    render: ({data}) => {
      let value = data.costAmount !== 0 ? (data.directConversionAmount / data.costAmount) * 100 : 0;
      return <p className={'won'}>{moneyToFixedFormat(value)}</p>
    },
    showColumnMenuTool: false
  },
  {
    name: 'exposureRoas',
    minWidth: 150,
    header: () => {
      return(
        <div><p>노출매출</p><p>(ROAS)</p></div>
      )
    },
    render: ({data}) => {
      let value = data.costAmount !== 0 ? (data.exposureConversionAmount / data.costAmount) * 100 : 0;
      return <p className={'won'}>{moneyToFixedFormat(value)}</p>
    },
    showColumnMenuTool: false
  },
  {
    name: 'totalRoas',
    minWidth: 150,
    header: () => {
      return(
        <div><p>총매출</p><p>(ROAS)</p></div>
      )
    },
    render: ({data}) => {
      let value = data.costAmount !== 0 ? (data.totalConversionAmount / data.costAmount) * 100 : 0;
      return <p className={'won'}>{moneyToFixedFormat(value)}</p>
    },
    showColumnMenuTool: false
  },
  {
    name: 'ecpm',
    header: 'ECPM',
    minWidth: 100,
    render: ({value}) => <p className={'won'}>{moneyToFixedFormat(value)}</p>,
    showColumnMenuTool: false
  }
]

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
        textDecoration: 'underline'
      }
    },
    render: ({data, value}) => {
      return <Link to={'/board/campaignLookOver'} state={{campaignId: data?.campaignId}}>{value}</Link>
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
    name: 'campaignBudgetDesc',
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
      let valueFormat = value < 0 ? '무제한': <p>{decimalFormat(value)} 원</p>
      return  <Link to={'/board/campaignTwo'} state={{campaignId: data?.campaignId, userId: data?.userId }}>{valueFormat}</Link>
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
      return <Link to={'/board/campaignThree'} state={{campaignId: data?.campaignId}}>{value}</Link>
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
      return <Link to={'/board/campaignFour'} state={{campaignId: data?.campaignId, creativeType: data?.creativeType, productType: data.productType}}>{value}</Link>
    }
  },
  {
    name: 'exposureCount',
    header: '노출수',
    minWidth: 150,
    showColumnMenuTool: false,
    textAlign: 'center',
    render: ({value}) => <p>{decimalFormat(value)}</p>,
  },
  {
    name: 'validClickCount',
    header: '클릭수',
    minWidth: 150,
    showColumnMenuTool: false,
    textAlign: 'center',
    render: ({value}) => <p>{decimalFormat(value)}</p>,
  },
  {
    name: 'clickRate',
    header: '클릭률',
    minWidth: 150,
    textAlign: 'center',
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
    textAlign: 'center',
    render: ({value}) => <p className={'won'}>{decimalFormat(value)}</p>,
    showColumnMenuTool: false
  },
  {
    name: 'cpc',
    header: 'CPC',
    minWidth: 150,
    textAlign: 'center',
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
    textAlign: 'center',
    render: ({value}) => <p>{decimalFormat(value)}</p>,
    showColumnMenuTool: false
  },
  {
    name: 'conversionRate',
    header: '전환률',
    minWidth: 100,
    textAlign: 'center',
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
    textAlign: 'center',
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
    textAlign: 'center',
    render: ({data}) => {
      let value = data.totalConversionCount !== 0 ? data.totalConversionAmount / data.totalConversionCount : 0;
      return <p className={'won'}>{moneyToFixedFormat(value)}</p>
    },
    showColumnMenuTool: false
  },
  {
    name: 'sessionRoas',
    textAlign: 'center',
    minWidth: 150,
    header: () => {
      return(
        <div><p>세션매출</p><p style={{fontSize: 12}}>(ROAS)</p></div>
      )
    },
    render: ({data}) => {
      let value = data.costAmount !== 0 ? (data.sessionConversionAmount / data.costAmount) * 100 : 0;
      return <p className={'won'}>{moneyToFixedFormat(value)}</p>
    },
    showColumnMenuTool: false
  },
  {
    name: 'directRoas',
    textAlign: 'center',
    minWidth: 150,
    header: () => {
      return(
        <div><p>직접매출</p><p style={{fontSize: 12}}>(ROAS)</p></div>
      )
    },
    render: ({data}) => {
      let value = data.costAmount !== 0 ? (data.directConversionAmount / data.costAmount) * 100 : 0;
      return <p className={'won'}>{moneyToFixedFormat(value)}</p>
    },
    showColumnMenuTool: false
  },
  {
    name: 'exposureRoas',
    textAlign: 'center',
    minWidth: 150,
    header: () => {
      return(
        <div><p>노출매출</p><p style={{fontSize: 12}}>(ROAS)</p></div>
      )
    },
    render: ({data}) => {
      let value = data.costAmount !== 0 ? (data.exposureConversionAmount / data.costAmount) * 100 : 0;
      return <p className={'won'}>{moneyToFixedFormat(value)}</p>
    },
    showColumnMenuTool: false
  },
  {
    name: 'totalRoas',
    textAlign: 'center',
    minWidth: 150,
    header: () => {
      return(
        <div><p>총매출</p><p style={{fontSize: 12}}>(ROAS)</p></div>
      )
    },
    render: ({data}) => {
      let value = data.costAmount !== 0 ? (data.totalConversionAmount / data.costAmount) * 100 : 0;
      return <p className={'won'}>{moneyToFixedFormat(value)}</p>
    },
    showColumnMenuTool: false
  },
  {
    name: 'ecpm',
    textAlign: 'center',
    minWidth: 150,
    header: 'ECPM',
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
      return <Link to={'/board/campaignLookOver'} state={{campaignId: data?.campaignId}}>{value}</Link>
    }
  },
  {
    name: 'campaignBudgetDesc',
    header: '예산설정',
    minWidth: 150,
    textAlign: 'center',
    showColumnMenuTool: false,
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
    textAlign: 'center',
    render: ({value}) => <p>{decimalFormat(value)}</p>,
  },
  {
    name: 'validClickCount',
    header: '클릭수',
    minWidth: 150,
    showColumnMenuTool: false,
    textAlign: 'center',
    render: ({value}) => <p>{decimalFormat(value)}</p>,
  },
  {
    name: 'clickRate',
    header: '클릭률',
    minWidth: 150,
    textAlign: 'center',
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
    textAlign: 'center',
    render: ({value}) => <p className={'won'}>{decimalFormat(value)}</p>,
    showColumnMenuTool: false
  },
  {
    name: 'cpc',
    header: 'CPC',
    minWidth: 150,
    textAlign: 'center',
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
    textAlign: 'center',
    render: ({value}) => <p>{decimalFormat(value)}</p>,
    showColumnMenuTool: false
  },
  {
    name: 'conversionRate',
    header: '전환률',
    minWidth: 100,
    textAlign: 'center',
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
    textAlign: 'center',
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
    textAlign: 'center',
    render: ({data}) => {
      let value = data.totalConversionCount !== 0 ? data.totalConversionAmount / data.totalConversionCount : 0;
      return <p className={'won'}>{moneyToFixedFormat(value)}</p>
    },
    showColumnMenuTool: false
  },
  {
    name: 'totalRoas',
    textAlign: 'center',
    minWidth: 150,
    header: () => {
      return(
        <div><p>총매출</p><p style={{fontSize: 12}}>(ROAS)</p></div>
      )
    },
    render: ({data}) => {
      let value = data.costAmount !== 0 ? (data.totalConversionAmount / data.costAmount) * 100 : 0;
      return <p className={'won'}>{moneyToFixedFormat(value)}</p>
    },
    showColumnMenuTool: false
  },
  {
    name: 'ecpm',
    textAlign: 'center',
    minWidth: 150,
    header: 'ECPM',
    render: ({data}) => {
      let value = data.exposureCount !== 0 ? (data.totalConversionAmount / data.exposureCount) * 1000 : 0;
      return <p className={'won'}>{moneyToFixedFormat(value)}</p>
    },
    showColumnMenuTool: false
  }
]

