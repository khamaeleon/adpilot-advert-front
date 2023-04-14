import {
  AgentType,
  BoardSearchDetail,
  CalendarBox,
  CalendarIcon,
  ChartContainer,
  ChartLabel,
  ColSpan0,
  ColSpan1,
  ColSpan3,
  ColTitle,
  CustomDatePicker,
  DashBoardBody,
  DashBoardCard,
  DashBoardHeader,
  DateContainer,
  defaultStyle,
  Input,
  RangePicker,
  RelativeDiv,
  RowSpan,
  SearchButton
} from "../../assets/GlobalStyles";
import {ResponsiveLine} from '@nivo/line'
import React, {useCallback, useEffect, useState} from "react";
import {HorizontalRule} from "../../components/common/Common";
import {useAtom} from "jotai/index";
import {dataTotalInfo} from "../../components/common/entity";
import {
  getLastDay,
  getLastMonth,
  getLastThirtyDay,
  getLastWeekDay,
  getThisMonth,
  getToDay
} from "../../common/DateUtils";
import ko from "date-fns/locale/ko";
import Select from "react-select";
import Checkbox from "../../components/common/Checkbox";
import {
  cloneLineDataAtom,
  lineDataAtom, onOffStatus,
  platformStatusAtom,
  platformStatusType,
  platformTotalCont, toolTipLabel
} from "./entity/Chart";
import {adverListColumn, adverStatusAtom, adverStatusDetailAtom, adverStatusDetailColumn,} from "./entity/Campaign";
import {productType, searchConditionAtom} from "./entity/Common";
import {
  retrieveAdverOverview,
  retrieveOverview,
} from "../../services/dash_board/ChartAxios";
import {tokenResultAtom} from "../login/entity/Common";
import TableDetail from "../../components/table/TableDetail";
import {
  retrieveAdvertiserCampaignStatus,
  retrieveAdvertiserStatus
} from "../../services/dash_board/ManageCampaignAxios";
import {decimalFormat, moneyToFixedFormat, numberToFixedFormat} from "../../common/StringUtils";
import {DashBoardCondition} from "../../components/Platform/Condition";

/** 플래폼 현황 차트 **/
function PlatformResponsiveBar(props) {
  const {dataType, dataType2, platformData, onOff} = props
  let clickData = [], exposureData = [], totalConversionData = [], userData = [], totalExposureData = [],
    totalClickData = [], clickRateData = [], costAmountData = [], cpcData = [], conversionRateData = [],
    costPerConversionData = [], avgConversionAmountData = [], sessionRoasData = [], directRoasData = [], exposureRoasData = [], totalRoasData = [], ecpmData = [];
  const [, setLineData] = useAtom(lineDataAtom)
  const [cloneLineData, setCloneLineData] = useAtom(cloneLineDataAtom)
  const [label] = useState(toolTipLabel)

  useEffect(() => {
    let lineDataMap={}
    if (platformData !== null) {
      platformData.map((data, index) => {
        clickData = [...clickData, {x: data.historyDate, y: data.clickCount}]
        exposureData = [...exposureData, {x: data.historyDate, y: data.exposureCount}]
        totalConversionData = [...totalConversionData, {x: data.historyDate, y: data.totalConversionCount}]
        userData = [...userData, {x: data.historyDate, y: data?.userCount}]
        totalExposureData = [...totalExposureData, {x: data.historyDate, y: data?.totalExposureCount}]
        totalClickData = [...totalClickData, {x: data.historyDate, y: data?.totalClickCount}]
        clickRateData = [...clickRateData, {x: data.historyDate, y: data.clickCount / (data.exposureCount*100)}]
        costAmountData = [...costAmountData, {x: data.historyDate, y: data?.costAmount}]
        cpcData = [...cpcData, {x: data.historyDate, y: data?.costAmount / data.clickCount}]
        conversionRateData = [...conversionRateData, {x: data.historyDate, y: data.totalConversionCount / (data.clickCount*100)}]
        costPerConversionData = [...costPerConversionData, {x: data.historyDate, y: data?.costAmount / data.totalConversionCount}]
        avgConversionAmountData = [...avgConversionAmountData, {x: data.historyDate, y: data.totalConversionAmount / data.totalConversionCount}]
        sessionRoasData = [...sessionRoasData, {x: data.historyDate, y: data.sessionConversionAmount / (data.costAmount *100)}]
        directRoasData = [...directRoasData, {x: data.historyDate, y: data.directConversionAmount / (data.costAmount *100)}]
        exposureRoasData = [...exposureRoasData, {x: data.historyDate, y: data.exposureConversionAmount / (data.costAmount *100)}]
        totalRoasData = [...totalRoasData, {x: data.historyDate, y: data.totalConversionAmount / (data.costAmount *100)}]
        ecpmData = [...ecpmData, {x: data.historyDate, y: data?.costAmount / (data.exposureCount*1000)}]
      })
      lineDataMap = [
          {id: 'clickCount', data: clickData, yFormatted: '원'}, //클릭수
          {id: 'exposureCount', data: exposureData},//노출수
          {id: 'totalConversionCount', data: totalConversionData},//전환수
          {id: "userCount", data: userData},//광고주수
          {id: "totalExposureCount", data: totalExposureData},//총 노출 수
          {id: "totalClickCount", data: totalClickData},//총 클릭 수
          {id: "clickRate", data: clickRateData},//클릭률
          {id: "costAmount", data: costAmountData},//비용
          {id: "cpc", data: cpcData},//평균 CPC
          {id: "conversionRate", data: conversionRateData},//전환율
          {id: "costPerConversion", data: costPerConversionData},//전환 단가
          {id: "avgConversionAmount", data: avgConversionAmountData},//평균 구매액
          {id: "sessionRoas", data: sessionRoasData},//세션매출
          {id: "directRoas", data: directRoasData},//직접매출
          {id: "exposureRoas", data: exposureRoasData},//노출매출
          {id: "totalRoas", data: totalRoasData},//총매출
          {id: "ecpm", data: ecpmData},//ecpm
        ]

      setLineData([
        lineDataMap[0],
        lineDataMap[1],
        lineDataMap[2],
        lineDataMap.find(value => value.id === dataType),
        lineDataMap.find(value => value.id === dataType2),
      ])

      setCloneLineData([
        lineDataMap[0],
        lineDataMap[1],
        lineDataMap[2],
        lineDataMap.find(value => value.id === dataType),
        lineDataMap.find(value => value.id === dataType2),
      ])
    }
  }, [platformData]);

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
    <div style={{height: 300}}>
      <ResponsiveLine
        data={cloneLineData}
        margin={{top: 30, right: 50, bottom: 30, left: 50}}
        padding={0.75}
        yScale={{
          base: 10,
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: false,
          reverse: false
        }}
        //colors={[,,,,]}
        axisLeft={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 15,
          tickRotation: 0,
          legendOffset: 32,
        }}
        enableGridY={false}
        useMesh={true}
        enableCrosshair={false}
        enableSlices={'x'}
        sliceTooltip={(props) => {
          console.log(props)
          const toolTip = props.slice.points?.map((data, key) => {
            return <p key={key}>
              <span style={{color: data.serieColor}}>{label[data.serieId]} : </span><span>{yFormatted(data)}</span>
            </p>
          })
          return (
            <div style={{
              background: '#fff',
              padding: '3px 10px',
              border: '1px solid #ccc',
              borderRadius: '3px',
            }}>
              {toolTip}
            </div>
          )
        }}
      />
    </div>

  )
}

/** 대시보드 **/
function DashBoardIndex() {
  const [tokenUserInfo] = useAtom(tokenResultAtom)
  const [searchCondition, setSearchCondition] = useState(searchConditionAtom)
  const [totalInfo, setTotalInfo] = useState(dataTotalInfo)
  const [adverStatusData, setAdverStatusData] = useAtom(adverStatusAtom)
  const [platformStatusData, setPlatformStatusData] = useAtom(platformStatusAtom)
  const [lineData, setLineData] = useAtom(lineDataAtom)
  const [cloneLineData, setCloneLineData] = useAtom(cloneLineDataAtom)
  const [platformChartTotal, setPlatformChartTotal] = useState(platformTotalCont)
  const [dataType, setDataType] = useState('cpc')
  const [dataType2, setDataType2] = useState('costAmount')
  const [onOff, setOnOff] = useState(onOffStatus)


  useEffect(() => {
    setOnOff({
      ...onOff,
      [dataType]: true,
      [dataType2]: true,
    })
  },[])

  useEffect(() => {
    if(tokenUserInfo.role !== 'NORMAL') {
      //플랫폼 현황 조회
      retrieveOverview(searchCondition).then(response => {
        handlePlatformData(response)
      })
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
    } else {
      //특정 광고주 광고 현황 조회
      retrieveAdverOverview(tokenUserInfo.id, searchCondition).then(response => {
        handlePlatformData(response)
      })
      //특정 광고주 캠페인 기준 조회

    }
  }, [searchCondition])

  useEffect(() => {
    if(cloneLineData !== null){
      let dummyArray = lineData
      if (!onOff.clickCount) {
        dummyArray = dummyArray.filter(value => value.id !== 'clickCount')
      }
      if (!onOff.exposureCount) {
        dummyArray = dummyArray.filter(value => value.id !== 'exposureCount')
      }
      if (!onOff.totalConversionCount) {
        dummyArray = dummyArray.filter(value => value.id !== 'totalConversionCount')
      }
      if(!onOff[dataType]) {
        dummyArray = dummyArray.filter(value => value.id !== dataType)
      }
      if(!onOff[dataType2]) {
        dummyArray = dummyArray.filter(value => value.id !== dataType2)
      }
      setCloneLineData(dummyArray)
    }
  },[onOff])



  const handlePlatformData = (response) => {
    let clickCount, exposureCount, totalConversionCount, userCount, totalExposureCount, totalClickCount, costAmount,
      conversionAmount, sessionConversionAmount, directConversionAmount, exposureConversionAmount, totalConversionAmount
    if (response) {
      setPlatformStatusData(response)
      clickCount = response.reduce((prev, next) => {
        return prev + next.clickCount
      }, 0);
      exposureCount = response.reduce((prev, next) => {
        return prev + next.exposureCount
      }, 0);
      totalConversionCount = response.reduce((prev, next) => {
        return prev + next.totalConversionCount
      }, 0);
      userCount = response.reduce((prev, next) => {
        return prev + next.userCount
      }, 0);
      totalExposureCount = response.reduce((prev, next) => {
        return prev + next.totalExposureCount
      }, 0);
      totalClickCount = response.reduce((prev, next) => {
        return prev + next.totalClickCount
      }, 0);
      costAmount = response.reduce((prev, next) => {
        return prev + next.costAmount
      }, 0);
      conversionAmount = response.reduce((prev, next) => {
        return prev + next.conversionAmount
      }, 0);
      totalConversionAmount = response.reduce((prev, next) => {
        return prev + next.totalConversionAmount
      }, 0);
      exposureConversionAmount = response.reduce((prev, next) => {
        return prev + next.exposureConversionAmount
      }, 0);
      directConversionAmount = response.reduce((prev, next) => {
        return prev + next.directConversionAmount
      }, 0);
      sessionConversionAmount  = response.reduce((prev, next) => {
        return prev + next.sessionConversionAmount
      }, 0);

      setPlatformChartTotal({
        ...platformChartTotal,
        clickCountTotal: decimalFormat(clickCount), //클릭수(유효) 합산
        exposureCountTotal: decimalFormat(exposureCount), //노출수 합산
        totalConversionCount: decimalFormat(totalConversionCount), //전환수 합산
        userCount: decimalFormat(userCount), //광고주 수 합산
        totalExposureCount: decimalFormat(totalExposureCount), //총 노출수 합산
        totalClickCount: decimalFormat(totalClickCount), //총 클릭수(유효,무효) 합산
        clickRate: numberToFixedFormat(clickCount / (exposureCount * 100)) +' %', // 클릭률 평균( 클릭수 / (노출수 * 100) )
        costAmount: moneyToFixedFormat(costAmount) +' 원', //비용 합산
        cpc: moneyToFixedFormat(costAmount / totalClickCount) +' 원', //cpc 평균(총비용 / 총클릭)
        conversionRate: numberToFixedFormat(totalConversionCount / clickCount) +' %',// 전환율 평균 (전환 수 / 클릭 수)
        costPerConversion: moneyToFixedFormat(costAmount / totalConversionCount) +' 원',// 전환 단가 평균 (비용 / 전환수)
        avgConversionAmount: moneyToFixedFormat(conversionAmount / totalConversionCount) +' 원', //평균 구매액 (총 수익 / 전환 수)
        sessionRoas: moneyToFixedFormat(sessionConversionAmount / costAmount) +' 원', // roas 평균 (총 수익 / 비용)
        directRoas: moneyToFixedFormat(directConversionAmount / costAmount) +' 원', // roas 평균 (총 수익 / 비용)
        exposureRoas: moneyToFixedFormat(exposureConversionAmount / costAmount) +' 원', // roas 평균 (총 수익 / 비용)
        totalRoas: moneyToFixedFormat(totalConversionAmount  / costAmount) +' 원', // roas 평균 (총 수익 / 비용)
        ecpm: moneyToFixedFormat(conversionAmount / (exposureCount * 1000)) +' 원', // ecpm 평균 (수익 / 노출 * 1000)
      })
    } else {
      setPlatformStatusData([])
    }
  }


  /**
   * 검색 버튼
   * @param searchCondition
   */
  const handleData = () => {
    console.log(searchCondition)
  }

  /**
   * 차트 셀렉트 항목
   * @param
   */
  const handleChangeChartKey = (type) => {
    setDataType(type.value)
    setOnOff({
      ...onOff,
      [type.value]: !onOff[type.value]
    })
  }
  const handleChangeChartKey2 = (type) => {
    setDataType2(type.value)
    setOnOff({
      ...onOff,
      [type.value]: !onOff[type.value]
    })
  }

  const chartOnOff = (id) => {
    setOnOff({
      ...onOff,
      [id]: !onOff[id]
    })
  }

  const handleFetchDetailData = useCallback(async ({userId}) => {
    return await retrieveAdvertiserCampaignStatus(userId, searchCondition)
  },[])

  return (
    <>
      <DashBoardCard>
        <DashBoardCondition role={tokenUserInfo.role} searchType={productType} searchCondition={searchCondition} setSearchCondition={setSearchCondition} handleData={handleData}/>
      </DashBoardCard>
      <DashBoardCard>
        <DashBoardHeader>플랫폼 현황</DashBoardHeader>
        <DashBoardBody>
          <ChartContainer>
            <ChartLabel>
              <div className={onOff['clickCount'] ? null : 'off'} onClick={() => chartOnOff('clickCount')}>
                <p>클릭수</p>
                <span>{platformChartTotal.clickCountTotal}</span>
              </div>
              <div className={onOff['exposureCount'] ? null : 'off'} onClick={() => chartOnOff('exposureCount')}>
                <p>노출수</p>
                <span>{platformChartTotal.exposureCountTotal}</span>
              </div>
              <div className={onOff['totalConversionCount'] ? null : 'off'} onClick={() => chartOnOff('totalConversionCount')}>
                <p>전환수</p>
                <span>{platformChartTotal.totalConversionCount}</span>
              </div>
              <div className={onOff[dataType] ? null : 'off'}>
                <Select styles={defaultStyle}
                        isDisabled={!onOff[dataType]}
                        components={{IndicatorSeparator: () => null}}
                        options={platformStatusType}
                        value={platformStatusType.filter(options => options.value === dataType)}
                        isOptionDisabled={option => option.value === dataType2}
                        onChange={handleChangeChartKey}
                />
                <span onClick={() => chartOnOff(dataType)}>{platformChartTotal[dataType]}</span>
              </div>
              <div className={onOff[dataType2] ? null : 'off'}>
                <Select styles={defaultStyle}
                        isDisabled={!onOff[dataType2]}
                        components={{IndicatorSeparator: () => null}}
                        options={platformStatusType}
                        value={platformStatusType.filter(options => options.value === dataType2)}
                        isOptionDisabled={option => option.value === dataType}
                        onChange={handleChangeChartKey2}
                />
                <span onClick={() => chartOnOff(dataType2)}>{platformChartTotal[dataType2]}</span>
              </div>
            </ChartLabel>
            <PlatformResponsiveBar dataType={dataType} dataType2={dataType2} onOff={onOff}
                                   platformData={platformStatusData}/>
          </ChartContainer>
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