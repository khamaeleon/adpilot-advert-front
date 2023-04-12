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
import {platformStatusAtom, platformStatusType, platformTotalCont} from "./entity/Chart";
import {adverListColumn, adverStatusAtom, adverStatusDetailColumn,} from "./entity/Campaign";
import {productType, searchConditionAtom} from "./entity/Common";
import TableDetail from "../../components/table/TableDetail";
import {retrievePlatformStatus, retrieveUserPlatformStatus} from "../../services/dash_board/ChartAxios";
import {tokenResultAtom} from "../login/entity/Common";

/** 플래폼 현황 차트 **/
function PlatformResponsiveBar(props) {
  const {onOff, dataType, dataType2, platformData} = props
  let clickData=[], exposureData=[], conversionData=[], userData=[], totalExposureData=[], totalClickData=[], clickRateData=[], costAmountData=[], cpcData=[], conversionRateData=[], conversionPerSalesData=[], avgConversionAmountData=[], roasData=[], ecpmData=[];
  const [lineData,setLineData] = useState([])

  useEffect(() => {
    let lineDataMap=[]
    if (platformData !== null) {
      platformData.map((data,index) =>{
        clickData = [...clickData, {x:data.historyDate,y:data.clickCount}]
        exposureData = [...exposureData, {x:data.historyDate,y:data.exposureCount}]
        conversionData = [...conversionData, {x:data.historyDate,y:data.conversionCount}]
        userData = [...userData, {x:data.historyDate,y:data?.userCount}]
        totalExposureData = [...totalExposureData, {x:data.historyDate,y:data?.totalExposureCount}]
        totalClickData = [...totalClickData, {x:data.historyDate,y:data?.totalClickCount}]
        clickRateData = [...clickRateData, {x:data.historyDate,y:data?.clickRate}]
        costAmountData = [...costAmountData, {x:data.historyDate,y:data?.costAmount}]
        cpcData = [...cpcData, {x:data.historyDate,y:data?.cpc}]
        conversionRateData = [...conversionRateData, {x:data.historyDate,y:data?.conversionRate}]
        conversionPerSalesData = [...conversionPerSalesData, {x:data.historyDate,y:data?.conversionPerSales}]
        avgConversionAmountData = [...avgConversionAmountData, {x:data.historyDate,y:data?.avgConversionAmount}]
        roasData = [...roasData, {x:data.historyDate,y:data?.roas}]
        ecpmData = [...ecpmData, {x:data.historyDate,y:data?.ecpm}]
      })
      lineDataMap = [
        {id: 'clickCount', data: clickData}, //클릭수
        {id: 'exposureCount', data:exposureData},//노출수
        {id: 'conversionCount', data:conversionData},//전환수
        {id: "userCount", data: userData},//광고주수
        {id: "totalExposureCount", data: totalExposureData},//총 노출 수
        {id: "totalClickCount", data: totalClickData},//총 클릭 수
        {id: "clickRate", data: clickRateData},//클릭률
        {id: "costAmount", data: costAmountData},//비용
        {id: "cpc", data: cpcData},//평균 CPC
        {id: "conversionRate", data: conversionRateData},//전환율
        {id: "conversionPerSales", data: conversionPerSalesData},//전환 단가
        {id: "avgConversionAmount", data: avgConversionAmountData},//평균 구매액
        {id: "roas", data: roasData},//Roas
        {id: "ecpm", data: ecpmData},//Ecpm
      ]
      console.log(onOff['clickCount'])
        setLineData([
          lineDataMap[0],
          lineDataMap[1],
          lineDataMap[2],
          lineDataMap.find(value => value.id === dataType),
          lineDataMap.find(value => value.id === dataType2),
        ])

    }
  }, [platformData, dataType, dataType2, onOff]);

  const getColor = () => {
    const color = {
      PROCEEDS: '#f5811f',
      REQUEST_COUNT: '#f25108',
      EXPOSURE_COUNT: '#ffd1af',
      CLICK_COUNT: '#fecfcf',
      CLICK: '#fecfcf'
    }
    return color[dataType]
  }

  return (
    <div style={{height: 300}}>
      <ResponsiveLine
        data={lineData}
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
        //colors={[getColor()]}
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
          const toolTip = props.slice.points?.map( data => {
            return <p>
                    <span style={{color: data.serieColor}}>{data.serieId} : </span><span>{data.data.y}</span>
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
function DashBoardIndex(){
  const [tokenUserInfo] = useAtom(tokenResultAtom)
  const [totalInfo,setTotalInfo] = useState(dataTotalInfo)
  const [adverStatusData,setAdverStatusData] = useAtom(adverStatusAtom)
  const [searchCondition, setSearchCondition] = useState(searchConditionAtom)
  const [dateRange, setDateRange] = useState([ new Date(getThisMonth().startDay), new Date(getToDay())]);
  const [startDate, endDate] = dateRange;
  const [productTypeSelect] = useState(productType)
  const [platformStatusTypeSelect] = useState(platformStatusType)
  const [platformStatusData, setPlatformStatusData] = useAtom(platformStatusAtom)
  const [platformChartTotal, setPlatformChartTotal] = useState(platformTotalCont)
  const [isCheckedAll, setIsCheckedAll] = useState(true)
  const [dataType, setDataType] = useState('userCount')
  const [dataType2, setDataType2] = useState('costAmount')
  const [onOff, setOnOff] = useState({clickCount: true, exposureCount: true, conversionCount: true})

  useEffect(()=>{
    tokenUserInfo.role !== 'NORMAL' ? retrievePlatformStatus(searchCondition).then( response => {
      handlePlatformData(response)
    }) : retrieveUserPlatformStatus(tokenUserInfo.id, searchCondition).then( response => {
      handlePlatformData(response)
    })
    setTotalInfo({
      totalCount: 1
    })
  },[])

  useEffect(() => {
    if(searchCondition.agentTypes.length === 4) {
      setIsCheckedAll(true)
    } else {
      setIsCheckedAll(false)
    }
  }, [searchCondition.agentTypes]);
 const handlePlatformData = (response) => {
    let clickCount, exposureCount, conversionCount, userCount, totalExposureCount, totalClickCount, costAmount, conversionAmount
    if (response) {
      setPlatformStatusData(response)
      //response?.map(data => {
      //   clickCount += data.clickCount
      //   exposureCount += data.exposureCount
      //   conversionCount += data.conversionCount
      //   userCount += data?.userCount
      //   totalExposureCount += data.totalExposureCount
      //   totalClickCount += data.totalClickCount
      //   costAmount += data.costAmount
      //   conversionAmount += data.conversionAmount
      //})
      clickCount = response.reduce((prev, next) => {return prev + next.clickCount},0);
      exposureCount = response.reduce((prev, next) => {return prev + next.exposureCount},0);
      conversionCount = response.reduce((prev, next) => {return prev + next.conversionCount},0);
      userCount = response.reduce((prev, next) => {return prev + next.userCount},0);
      totalExposureCount = response.reduce((prev, next) => {return prev + next.totalExposureCount},0);
      totalClickCount = response.reduce((prev, next) => {return prev + next.totalClickCount},0);
      costAmount = response.reduce((prev, next) => {return prev + next.costAmount},0);
      conversionAmount = response.reduce((prev, next) => {return prev + next.conversionAmount},0);

      setPlatformChartTotal({
        ...platformChartTotal,
        clickCountTotal: clickCount, //클릭수(유효) 합산
        exposureCountTotal: exposureCount, //노출수 합산
        conversionCountTotal: conversionCount, //전환수 합산
        userCount: userCount, //광고주 수 합산
        totalExposureCount: totalExposureCount, //총 노출수 합산
        totalClickCount: totalClickCount, //총 클릭수(유효,무효) 합산
        clickRate: clickCount / (exposureCount * 100), // 클릭률 평균( 클릭수 / (노출수 * 100) )
        costAmount: costAmount, //비용 합산
        cpc: costAmount/totalClickCount, //cpc 평균(총비용 / 총클릭)
        conversionRate: conversionCount/clickCount,// 전환율 평균 (전환 수 / 클릭 수)
        conversionPerSales: costAmount/conversionCount,// 전환 단가 평균 (비용 / 전환수)
        avgConversionAmount: conversionAmount/conversionCount, //평균 구매액 (총 수익 / 전환 수)
        roas: conversionAmount/costAmount, // roas 평균 (총 수익 / 비용)
        ecpm: conversionAmount/( exposureCount * 1000 ), // ecpm 평균 (수익 / 노출 * 1000)
      })
    }
  }
  /**
   * 날짜 레인지 선택
   * @param rangeType
   */
  const handleRangeDate = (rangeType) => {
    if (rangeType === 'thisMonth') {
      setSearchCondition({
        ...searchCondition,
        searchStartDate: getThisMonth().startDay,
        searchEndDate: getThisMonth().endDay
      })
      setDateRange([new Date(getThisMonth().startDay), new Date(getThisMonth().endDay)])
    } else if (rangeType === 'lastMonth') {
      setSearchCondition({
        ...searchCondition,
        searchStartDate: getLastMonth().startDay,
        searchEndDate: getLastMonth().endDay
      })
      setDateRange([new Date(getLastMonth().startDay), new Date(getLastMonth().endDay)])
    } else if (rangeType === 'today') {
      setSearchCondition({
        ...searchCondition,
        searchStartDate: getToDay(),
        searchEndDate: getToDay()
      })
      setDateRange([new Date(), new Date()])
    } else if (rangeType === 'lastDay') {
      setSearchCondition({
        ...searchCondition,
        searchStartDate: getLastDay(),
        searchEndDate: getLastDay()
      })
      setDateRange([new Date(getLastDay()), new Date(getLastDay())])
    } else if (rangeType === 'lastWeekDay') {
      setSearchCondition({
        ...searchCondition,
        searchStartDate: getLastWeekDay().startDay,
        searchEndDate: getLastWeekDay().endDay
      })
      setDateRange([new Date(getLastWeekDay().startDay), new Date(getLastWeekDay().endDay)])
    } else if (rangeType === 'lastThirtyDay') {
      setSearchCondition({
        ...searchCondition,
        searchStartDate: getLastThirtyDay().startDay,
        searchEndDate: getLastThirtyDay().endDay
      })
      setDateRange([new Date(getLastThirtyDay().startDay), new Date(getLastThirtyDay().endDay)])
    }
  }
  /**
   * 광고 상품 선택
   * @param productType
   */
  const handleProductType = (selectProductType) => {
    setSearchCondition({
      ...searchCondition,
      productType: selectProductType.value
    })
  }
  const handleChangeCheckAll = (event) => {
    if(event.target.checked){
      setSearchCondition({
        ...searchCondition,
        agentTypes: ['WEB', 'WEB_APP', 'MOBILE_WEB', 'MOBILE_NATIVE_APP']
      })
    } else{
      setSearchCondition({
        ...searchCondition,
        agentTypes: []
      })
    }
    setIsCheckedAll(event.target.checked)
  }
  /**
   * 에이전트 타입 체크
   * @param event
   */
  const handleChangeCheck = (event) => {
    if(event.currentTarget.checked){
      setSearchCondition({
        ...searchCondition,
        agentTypes: searchCondition.agentTypes.concat(event.currentTarget.value)
      })
    }else{
      setSearchCondition({
        ...searchCondition,
        agentTypes: searchCondition.agentTypes.filter(id => id !== event.currentTarget.value)
      })
    }
  }

  /**
   * 검색어
   * @param keyword
   */
  const handleSearchValue = (event) => {
    setSearchCondition({
      ...searchCondition,
      keyword: event.target.value
    })
  }

  /**
   * 검색 버튼
   * @param searchCondition
   */
  const handleData = () => {
    console.log(searchCondition.keyword)
  }

  /**
   * 차트 셀렉트 항목
   * @param
   */
  const handleChangeChartKey = (type) => {
    setDataType(type.value)
  }
  const handleChangeChartKey2 = (type) => {
    setDataType2(type.value)
  }

  const chartOnOff = (e) => {
    e.stopPropagation()
    let keyTarget = e.currentTarget.id
    setOnOff({
      ...onOff,
      [keyTarget] : !onOff[keyTarget]
    })
  }

  // const handleFetchDetailData = useCallback(async ({}) => {
  //   return selAdverPixelDetailList(userId)
  // },[])

  const handleFetchDetailData = useCallback(async ({}) => {
    return [
      {
        name: 'linkUrl',
      }
    ]
  },[])

  return(
    <>
      <DashBoardCard>
        <BoardSearchDetail>
          <RowSpan style={{marginTop: 0, justifyContent: 'flex-start'}}>
            <ColSpan0 style={{marginRight: 20}}>
              <ColTitle style={{paddingLeft: 0}}>광고 상품</ColTitle>
              <Select components={{IndicatorSeparator: () => null}}
                      options={productTypeSelect}
                      value={productTypeSelect.find(value => value.value === searchCondition.productType)}
                      onChange={handleProductType}
                      styles={{
                        input: (baseStyles, state) => (
                          {
                            ...baseStyles,
                            width: "100px",
                          })
                      }}
              />
            </ColSpan0>
            <ColSpan3>
              <ColTitle style={{paddingLeft: 0}}>에이전트</ColTitle>
              <RelativeDiv>
                <AgentType>
                  <Checkbox label={'전체'}
                            type={'c'}
                            id={'all'}
                            value={'All'}
                            isChecked={isCheckedAll}
                            onChange={handleChangeCheckAll}
                  />
                  <Checkbox label={'PC 웹'}
                            type={'c'}
                            id={'WEB'}
                            value={'WEB'}
                            isChecked={searchCondition.agentTypes.includes('WEB') ? true : false}
                            onChange={handleChangeCheck}/>
                  <Checkbox label={'PC 어플리케이션'}
                            type={'c'}
                            id={'WEB_APP'}
                            value={'WEB_APP'}
                            isChecked={searchCondition.agentTypes.includes('WEB_APP') ? true : false}
                            onChange={handleChangeCheck}/>
                  <Checkbox label={'모바일 웹'}
                            type={'c'}
                            id={'MOBILE_WEB'}
                            value={'MOBILE_WEB'}
                            isChecked={searchCondition.agentTypes.includes('MOBILE_WEB') ? true : false}
                            onChange={handleChangeCheck}/>
                  <Checkbox label={'모바일 어플리케이션'}
                            type={'c'}
                            id={'MOBILE_NATIVE_APP'}
                            value={'MOBILE_NATIVE_APP'}
                            isChecked={searchCondition.agentTypes.includes('MOBILE_NATIVE_APP') ? true : false}
                            onChange={handleChangeCheck}/>
                </AgentType>
              </RelativeDiv>
            </ColSpan3>
          </RowSpan>
          <RowSpan style={{justifyContent: 'flex-start', marginTop: 20}}>
            <ColSpan0>
              <ColTitle style={{paddingLeft: 0}}>기간</ColTitle>
              <div>
                <DateContainer>
                  <CalendarBox>
                    <CalendarIcon/>
                  </CalendarBox>
                  <CustomDatePicker
                    selectsRange={true}
                    startDate={startDate}
                    endDate={endDate}
                    minDate={new Date(getLastThirtyDay().startDay)}
                    maxDate={new Date()}
                    onChange={(date) => setDateRange(date)}
                    dateFormat="yyyy-MM-dd"
                    locale={ko}
                    isClearable={false}
                  />
                </DateContainer>
              </div>
              <div>
                <RangePicker>
                  <div onClick={() => handleRangeDate('thisMonth')}>이번달</div>
                  <HorizontalRule style={{margin: "0 10px"}}/>
                  <div onClick={() => handleRangeDate('lastMonth')}>지난달</div>
                  <HorizontalRule style={{margin: "0 10px"}}/>
                  <div onClick={() => handleRangeDate('today')}>오늘</div>
                  <HorizontalRule style={{margin: "0 10px"}}/>
                  <div onClick={() => handleRangeDate('lastDay')}>어제</div>
                  <HorizontalRule style={{margin: "0 10px"}}/>
                  <div onClick={() => handleRangeDate('lastWeekDay')}>지난7일</div>
                  <HorizontalRule style={{margin: "0 10px"}}/>
                  <div onClick={() => handleRangeDate('lastThirtyDay')}>지난30일</div>
                </RangePicker>
              </div>
            </ColSpan0>
            {tokenUserInfo.role !== 'NORMAL' &&
              <ColSpan1 style={{marginLeft: 20}}>
                <ColTitle style={{paddingLeft: 0}}>검색어</ColTitle>
                <Input type={'text'}
                       placeholder={'광고주명 및 아이디 검색'}
                       value={searchCondition.keyword}
                       onChange={handleSearchValue}
                />
                <SearchButton onClick={handleData}>검색</SearchButton>
              </ColSpan1>
            }
          </RowSpan>
        </BoardSearchDetail>
      </DashBoardCard>
      <DashBoardCard>
        <DashBoardHeader>플랫폼 현황</DashBoardHeader>
        <DashBoardBody>
          <ChartContainer>
            <ChartLabel>
              <div id='clickCount' onClick={(e)=> chartOnOff(e)}>
                <p>클릭수</p>
                <span>{platformChartTotal.clickCountTotal}</span>
              </div>
              <div id='exposureCount' onClick={(e)=> chartOnOff(e)}>
                <p>노출수</p>
                <span>{platformChartTotal.exposureCountTotal}</span>
              </div>
              <div id='conversionCount' onClick={(e)=> chartOnOff(e)}>
                <p>전환수</p>
                <span>{platformChartTotal.conversionCountTotal}</span>
              </div>
              <div>
                <Select styles={defaultStyle}
                        components={{IndicatorSeparator: () => null}}
                        options={platformStatusTypeSelect}
                        value={platformStatusTypeSelect.filter(options => options.value === dataType)}
                        isOptionDisabled={option=> option.value === dataType2}
                        onChange={handleChangeChartKey}
                />
                <span>{platformChartTotal[dataType]}</span>
              </div>
              <div>
                <Select styles={defaultStyle}
                        components={{IndicatorSeparator: () => null}}
                        options={platformStatusTypeSelect}
                        value={platformStatusTypeSelect.filter(options => options.value === dataType2)}
                        isOptionDisabled={option=> option.value === dataType}
                        onChange={handleChangeChartKey2}
                />
                <span>{platformChartTotal[dataType2]}</span>
              </div>
            </ChartLabel>
            <PlatformResponsiveBar dataType={dataType} dataType2={dataType2} onOff={onOff} platformData={platformStatusData}/>
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