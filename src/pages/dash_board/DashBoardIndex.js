import {
  ChartContainer,
  ChartLabel,
  ChartLabels,
  ChartTooltip,
  DashBoardBody,
  DashBoardCard,
  DashBoardHeader,
  defaultStyle
} from "../../assets/GlobalStyles";
import {ResponsiveLine} from '@nivo/line'
import React, {useCallback, useEffect, useState} from "react";
import {useAtom} from "jotai/index";
import {dataTotalInfo} from "../../components/common/entity";
import {chartDataAtom, commonProperties, platformStatusType} from "./entity/Chart";
import {adverListColumn, adverStatusAtom, adverStatusDetailColumn,} from "./entity/Campaign";
import {productType, searchConditionAtom} from "./entity/Common";
import {retrieveAdverOverview, retrieveOverview,} from "../../services/dash_board/ChartAxios";
import {tokenResultAtom} from "../login/entity/Common";
import TableDetail from "../../components/table/TableDetail";
import {
  retrieveAdvertiserCampaignStatus,
  retrieveAdvertiserStatus
} from "../../services/dash_board/ManageCampaignAxios";
import {decimalFormat, moneyToFixedFormat, numberToFixedFormat} from "../../common/StringUtils";
import Select from "react-select";
import {DashBoardCondition} from "../../components/dashBoard/Condition";

/** 플래폼 현황 차트 **/
function ChartComponent() {
  const [tokenUserInfo] = useAtom(tokenResultAtom)
  const [chartData, setChartData] = useAtom(chartDataAtom);
  const [searchCondition, setSearchCondition] = useState(searchConditionAtom)
  const [dataType, setDataType] = useState('userCount')
  const [dataType2, setDataType2] = useState('costAmount')
  const [chartDataInfo, setChartDataInfo] = useState([])
  const [chartList, setChartList] = useState([{id: 'clickCount', data:[]}])

  useEffect(()=>{
    if(tokenUserInfo.role !== 'NORMAL') {
      retrieveOverview(searchCondition).then(response => {
        let data = response
        if(response !== null) {
          data.map((item,key) => {
            Object.assign(data[key],{clickRate: item.clickCount !== 0 ? (item.clickCount / item.exposureCount) *100 : 0})
            Object.assign(data[key],{cpc:item.costAmount !== 0 ? item?.costAmount / item.clickCount : 0})
            Object.assign(data[key],{costPerConversion: item.costAmount !== 0 ? item?.costAmount / item.totalConversionCount : 0})
            Object.assign(data[key],{avgConversionAmount: item.totalConversionAmount !== 0 ? item.totalConversionAmount / item.totalConversionCount : 0})
            Object.assign(data[key],{sessionRoas: item.sessionConversionAmount !== 0 ? (item.sessionConversionAmount / item.costAmount) *100 : 0})
            Object.assign(data[key],{directRoas: item.directConversionAmount !== 0 ? (item.directConversionAmount / item.costAmount) *100 : 0})
            Object.assign(data[key],{exposureRoas: item.exposureConversionAmount !== 0 ? (item.exposureConversionAmount / item.costAmount) *100 : 0})
            Object.assign(data[key],{totalRoas: item.totalConversionAmount !== 0 ? (item.totalConversionAmount / item.costAmount) *100 : 0})
            Object.assign(data[key],{ecpm: item.costAmount !== 0 ? (item?.costAmount / item.exposureCount) *1000 : 0},)
            Object.assign(data[key],{conversionRate: item.totalConversionCount !== 0 ? (item.totalConversionCount / item.clickCount) *100 : 0})
          })
          setChartDataInfo(data)
        }
      })
    } else {
      retrieveAdverOverview(tokenUserInfo.id, searchCondition).then(response => {
        let data = response
        if(response !== null) {
          data.map((item,key) => {
            Object.assign(data[key],{clickRate: item.clickCount !== 0 ? (item.clickCount / item.exposureCount) *100 : 0})
            Object.assign(data[key],{cpc:item.costAmount !== 0 ? item?.costAmount / item.clickCount : 0})
            Object.assign(data[key],{costPerConversion: item.costAmount !== 0 ? item?.costAmount / item.totalConversionCount : 0})
            Object.assign(data[key],{avgConversionAmount: item.totalConversionAmount !== 0 ? item.totalConversionAmount / item.totalConversionCount : 0})
            Object.assign(data[key],{sessionRoas: item.sessionConversionAmount !== 0 ? (item.sessionConversionAmount / item.costAmount) *100 : 0})
            Object.assign(data[key],{directRoas: item.directConversionAmount !== 0 ? (item.directConversionAmount / item.costAmount) *100 : 0})
            Object.assign(data[key],{exposureRoas: item.exposureConversionAmount !== 0 ? (item.exposureConversionAmount / item.costAmount) *100 : 0})
            Object.assign(data[key],{totalRoas: item.totalConversionAmount !== 0 ? (item.totalConversionAmount / item.costAmount) *100 : 0})
            Object.assign(data[key],{ecpm: item.costAmount !== 0 ? (item?.costAmount / item.exposureCount) *1000 : 0},)
            Object.assign(data[key],{conversionRate: item.totalConversionCount !== 0 ? (item.totalConversionCount / item.clickCount) *100 : 0})
          })
          setChartDataInfo(data)
        }
      })
    }
  },[])

  useEffect(() => {
    makeChartData()
  }, [chartData,chartDataInfo]);

  function calculateSum(property) {
    let calc =  chartDataInfo.reduce((prev, next) => {
      return prev + next[property]
    }, 0)
    let value;
    if (['clickRate','conversionRate'].includes(property)) {
      value = numberToFixedFormat(calc)+'%'
    } else if(['clickCount','exposureCount','totalConversionCount','userCount','totalExposureCount','totalClickCount'].includes(property)) {
      value = decimalFormat(calc)
    } else {
      value = moneyToFixedFormat(calc)+'원'
    }
    return value
  }

  const handleOnChangeChartStatus = (statusId) => {
    console.log(statusId)
    setChartData({
      ...chartData,
      [statusId]: {
        ...chartData[statusId],
        status: !chartData[statusId].status
      }
    })
  }

  // const handleChangeDataType = (e) => {
  //   console.log(e.value)
  //   setChartData({
  //     ...chartData,
  //     [e.value]: {
  //       ...chartData[e.value],
  //       status: !chartData[e.value].status
  //     }
  //   })
  //   setDataType(e.value)
  // }
  //
  // const handleChangeDataType2 = (e) => {
  //   setChartData({
  //     ...chartData,
  //     [e.value]: {
  //       ...chartData[e.value],
  //       status: !chartData[e.value].status
  //     }
  //   })
  //   setDataType2(e.value)
  // }

  const handleChangeDataType = (e) => {
    setChartData((prevChartData) => {
      const newData = {};
      Object.keys(prevChartData).forEach((key) => {
        newData[key] = {
          ...prevChartData[key],
          status:
              key === e.value ||
              (['clickCount', 'exposureCount', 'totalConversionCount'].includes(
                      key
                  ) &&
                  prevChartData[key].status) ||
              (prevChartData[key].status && key === dataType2),
        };
      });
      return newData;
    });
    setDataType(e.value);
  };

  const handleChangeDataType2 = (e) => {
    setChartData((prevChartData) => {
      const newData = {};
      Object.keys(prevChartData).forEach((key) => {
        newData[key] = {
          ...prevChartData[key],
          status:
              key === e.value ||
              (['clickCount', 'exposureCount', 'totalConversionCount'].includes(
                      key
                  ) &&
                  prevChartData[key].status) ||
              (prevChartData[key].status && key === dataType),
        };
      });
      return newData;
    });
    setDataType2(e.value);
  };

  const makeChartData = () => {
    let list = []
    Object.entries(chartData).map(([id,key]) => {
      if(chartData[id].status){
        list.push({
          id: id,
          data: chartDataInfo.map(item => { return {x: item.historyDate, y: item[id] === NaN ? 0 : item[id]}})
        })
      }
    })
    setChartList(list)
  }

  const yFormatted = (data) => {
    let value;
    if (['clickRate','conversionRate'].includes(data.serieId)) {
      value = numberToFixedFormat(data.data.y)+'%'
    } else if(['clickCount','exposureCount','totalConversionCount','userCount','totalExposureCount','totalClickCount'].includes(data.serieId)) {
      value = decimalFormat(data.data.y)
    } else {
      value = moneyToFixedFormat(data.data.y)+'원'
    }
    return value
  }

  return (
    <ChartContainer>
      <ChartLabels>
        <ChartLabel active={chartData['clickCount'].status} onClick={() => handleOnChangeChartStatus('clickCount')}>
          <p>클릭수</p>
          <span>{decimalFormat(calculateSum('clickCount'))}</span>
        </ChartLabel>
        <ChartLabel active={chartData['exposureCount'].status} onClick={() => handleOnChangeChartStatus('exposureCount')}>
          <p>노출수</p>
          <span>{decimalFormat(calculateSum('exposureCount'))}</span>
        </ChartLabel>
        <ChartLabel active={chartData['totalConversionCount'].status} onClick={() => handleOnChangeChartStatus('totalConversionCount')}>
          <p>전환수</p>
          <span>{decimalFormat(calculateSum('totalConversionCount'))}</span>
        </ChartLabel>
        <ChartLabel active={chartData[dataType].status}>
          <Select styles={defaultStyle}
                  isDisabled={!chartData[dataType].status}
                  components={{IndicatorSeparator: () => null}}
                  options={platformStatusType}
                  value={platformStatusType.filter(options => options.value === dataType)}
                  isOptionDisabled={option => option.value === dataType2}
                  onChange={handleChangeDataType}
          />
          <span onClick={() => handleOnChangeChartStatus(dataType)}>{calculateSum(dataType)}</span>
        </ChartLabel>
        <ChartLabel active={chartData[dataType2].status}>
          <Select styles={defaultStyle}
                  isDisabled={!chartData[dataType2].status}
                  components={{IndicatorSeparator: () => null}}
                  options={platformStatusType}
                  value={platformStatusType.filter(options => options.value === dataType2)}
                  isOptionDisabled={option => option.value === dataType}
                  onChange={handleChangeDataType2}
          />
          <span onClick={() => handleOnChangeChartStatus(dataType2)}>{calculateSum(dataType2)}</span>
        </ChartLabel>
      </ChartLabels>
      <div style={{height: 300}}>
        <ResponsiveLine
          {...commonProperties}
          data={chartList}
          sliceTooltip={(props) => {
            return (
              <ChartTooltip>
                {props.slice.points?.map((data, key) => {
                  return (
                    <p key={key}>
                      <span style={{color: data.serieColor}}>{chartData[data.serieId].label} : </span><span>{yFormatted(data)}</span>
                    </p>
                  )
                })}
              </ChartTooltip>
            )
          }}
        />
      </div>
    </ChartContainer>
  )
}

/** 대시보드 **/
function DashBoardIndex() {
  const [tokenUserInfo] = useAtom(tokenResultAtom)
  const [totalInfo, setTotalInfo] = useState(dataTotalInfo)
  const [adverStatusData, setAdverStatusData] = useAtom(adverStatusAtom)
  const [searchCondition, setSearchCondition] = useState(searchConditionAtom)
  const [keyword, setKeyword] = useState('')
  useEffect(() => {
    if(tokenUserInfo.role !== 'NORMAL') {
      //광고주 현황 조회
      retrieveAdvertiserStatus(searchCondition).then(response => {
        if(response !== null) {
          setAdverStatusData(response)
          setTotalInfo({
            totalCount: response?.length
          })
        } else {
          setAdverStatusData([])
        }
      })
    }
  }, [searchCondition])

  /**
   * 검색 버튼
   */
  const handleData = () => {
    setSearchCondition({
      ...searchCondition,
      keyword: keyword
    })
  }

  const handleFetchDetailData = useCallback(async ({userId}) => {
    return await retrieveAdvertiserCampaignStatus(userId, searchCondition)
  },[])

  return (
    <>
      <DashBoardCard>
        <DashBoardCondition role={tokenUserInfo.role} searchType={productType} searchCondition={searchCondition} setSearchCondition={setSearchCondition} handleData={handleData} keyword={keyword} setKeyword={setKeyword}/>
      </DashBoardCard>
      <DashBoardCard>
        <DashBoardHeader>플랫폼 현황</DashBoardHeader>
        <DashBoardBody>
          <ChartComponent/>
        </DashBoardBody>
        <DashBoardHeader style={{marginTop: 30}}>광고주 현황</DashBoardHeader>
        <DashBoardBody>
          <TableDetail columns={adverListColumn}
                       totalCount={[totalInfo.totalCount, '광고주']}
                       showHoverRows={false}
                       activeCell={[0]}
                       data={adverStatusData}
                       detailData={handleFetchDetailData}
                       detailColumn={adverStatusDetailColumn}
                       detailGroups={false}
                       idProperty={'userId'}
                       groups={false}/>
        </DashBoardBody>
      </DashBoardCard>
    </>
  )
}
export default DashBoardIndex