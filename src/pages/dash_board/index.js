import Navigator from "../../components/common/Navigator";
import {
  AgentType,
  BoardContainer,
  BoardSearchDetail,
  CalendarBox,
  CalendarIcon,
  ChartContainer,
  ChartLabel,
  ColSpan0,
  ColSpan1,
  ColSpan2,
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
  SearchButton,
  TitleContainer
} from "../../assets/GlobalStyles";
import {ResponsiveLine} from '@nivo/line'
import React, {useEffect, useState} from "react";
import {HorizontalRule} from "../../components/common/Common";
import {useAtom} from "jotai/index";
import Table from "../../components/table";
import {dataTotalInfo} from "../../components/common/entity";
import {
  getLastDay,
  getLastMonth,
  getLastNinetyDay,
  getLastThirtyDay,
  getLastWeekDay,
  getThisMonth,
  getToDay
} from "../../common/DateUtils";
import ko from "date-fns/locale/ko";
import Select from "react-select";
import Checkbox from "../../components/common/Checkbox";
import {platformStatusAtom, platformStatusType} from "./entity/Chart";
import {adverListColumn, adverStatusAtom} from "./entity/Campaign";
import {productType, searchConditionAtom} from "./entity/Common";

const activeBottomStyle = {borderBottom:'4px solid #f5811f'}
const activeRightStyle = {borderRight: activeBottomStyle.borderBottom, color: '#f5811f'}

/** 플래폼 현황 차트 **/
function PlatformResponsiveBar(props) {
  const {dataType} = props
  const [platformStatusData, setPlatformStatusData] = useAtom(platformStatusAtom)

  // useEffect(() => {
  //   if(userId !== '') {
  //     dashboardPeriodStatus(dataType, userId).then(response => {
  //       if (response) {
  //         setProceedPeriod(response)
  //       }
  //     })
  //   }
  // }, [userId,dataType]);

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
    <ResponsiveLine
      data={platformStatusData}
      keys={["count"]}
      indexBy={"date"}
      margin={{top: 40, right: 40, bottom: 130, left: 40}}
      padding={0.75}
      yScale={{type: 'linear'}}
      colors={[getColor()]}
      axisLeft={false}
      axisBottom={{
        tickSize: 0,
        tickPadding: 15,
        tickRotation: 0,
        legendOffset: 32,
      }}
      enableGridY={false}
      isInteractive={true}
    />
  )
}

/** 대시보드 **/
export default function DashBoard(){
  const [totalInfo,setTotalInfo] = useState(dataTotalInfo)
  const [adverStatusData,setAdverStatusData] = useAtom(adverStatusAtom)
  const [searchCondition, setSearchCondition] = useState(searchConditionAtom)
  const [dateRange, setDateRange] = useState([ new Date(getThisMonth().startDay), new Date(getToDay())]);
  const [startDate, endDate] = dateRange;
  const [productTypeSelect] = useState(productType)
  const [platformStatusTypeSelect] = useState(platformStatusType)
  const [isCheckedAll, setIsCheckedAll] = useState(true)
  const [dataType, setDataType] = useState('PROCEEDS')

  useEffect(()=>{
    setTotalInfo({
      totalCount: 1
    })
  },[])

  useEffect(() => {
    if(searchCondition.agentType.length === 4) {
      setIsCheckedAll(true)
    } else {
      setIsCheckedAll(false)
    }
  }, [searchCondition.agentType]);

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
    } else if (rangeType === 'lastNinetyDay') {
      setSearchCondition({
        ...searchCondition,
        searchStartDate: getLastNinetyDay().startDay,
        searchEndDate: getLastNinetyDay().endDay
      })
      setDateRange([new Date(getLastNinetyDay().startDay), new Date(getLastNinetyDay().endDay)])
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
        agentType: ['WEB','WEB_APP','MOBILE_WEB','MOBILE_NATIVE_APP']
      })
    } else{
      setSearchCondition({
        ...searchCondition,
        agentType: []
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
        agentType: searchCondition.agentType.concat(event.currentTarget.value)
      })
    }else{
      setSearchCondition({
        ...searchCondition,
        agentType: searchCondition.agentType.filter(id => id !== event.currentTarget.value)
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
    console.log(searchCondition)
  }

  /**
   * 차트 셀렉트 항목
   * @param
   */
  const handleChangeChartKey = (type) => {
    //setDataType(type)
  }

  return(
    <main>
      <BoardContainer>
        <TitleContainer>
          <h1>대시보드</h1>
          <Navigator depth={2}/>
        </TitleContainer>
        <DashBoardCard>
          <BoardSearchDetail>
            <RowSpan style={{marginTop: 0, justifyContent: 'flex-start'}}>
              <ColSpan0 style={{marginRight: 20}}>
                <ColTitle style={{paddingLeft: 0}}>광고 상품</ColTitle>
                <Select components={{IndicatorSeparator: () => null}}
                        options={productTypeSelect}
                        value={searchCondition.productType.value !== '' ? productTypeSelect.find(value => value.value === searchCondition.productType) : ''}
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
                              isChecked={isCheckedAll}
                              onChange={handleChangeCheckAll}
                    />
                    <Checkbox label={'PC 웹'}
                              type={'c'}
                              id={'WEB'}
                              value={'WEB'}
                              isChecked={searchCondition.agentType.includes('WEB') ? true : false}
                              onChange={handleChangeCheck}/>
                    <Checkbox label={'PC 어플리케이션'}
                              type={'c'}
                              id={'WEB_APP'}
                              value={'WEB_APP'}
                              isChecked={searchCondition.agentType.includes('WEB_APP') ? true : false}
                              onChange={handleChangeCheck}/>
                    <Checkbox label={'모바일 웹'}
                              type={'c'}
                              id={'MOBILE_WEB'}
                              value={'MOBILE_WEB'}
                              isChecked={searchCondition.agentType.includes('MOBILE_WEB') ? true : false}
                              onChange={handleChangeCheck}/>
                    <Checkbox label={'모바일 어플리케이션'}
                              type={'c'}
                              id={'MOBILE_NATIVE_APP'}
                              value={'MOBILE_NATIVE_APP'}
                              isChecked={searchCondition.agentType.includes('MOBILE_NATIVE_APP') ? true : false}
                              onChange={handleChangeCheck}/>
                  </AgentType>
                </RelativeDiv>
              </ColSpan3>
            </RowSpan>
            <RowSpan style={{justifyContent: 'flex-start', marginTop: 20}}>
              <ColSpan2>
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
                    <HorizontalRule style={{margin: "0 10px"}}/>
                    <div onClick={() => handleRangeDate('lastNinetyDay')}>지난90일</div>
                  </RangePicker>
                </div>
              </ColSpan2>
              <ColSpan1>
                <ColTitle style={{paddingLeft: 0}}>검색어</ColTitle>
                <Input type={'text'}
                       placeholder={'광고주명 및 아이디 검색'}
                       value={searchCondition.keyword}
                       onChange={handleSearchValue}
                />
                <SearchButton onClick={handleData}>검색</SearchButton>
              </ColSpan1>
            </RowSpan>
          </BoardSearchDetail>
        </DashBoardCard>
        <DashBoardCard>
          <DashBoardHeader>플랫폼 현황</DashBoardHeader>
          <DashBoardBody>
            <ChartContainer style={{height:250}}>
              <ChartLabel>
                <div>
                  <p>클릭수</p>
                  <span>123456789</span>
                </div>
                <div>
                  <p>노출수</p>
                  <span>123456789</span>
                </div>
                <div>
                  <p>전환수</p>
                  <span>123456789</span>
                </div>
                <div>
                  <Select styles={defaultStyle}
                          components={{IndicatorSeparator: () => null}}
                          options={platformStatusTypeSelect}
                          value={platformStatusTypeSelect[0]}
                          onChange={handleChangeChartKey}
                  />
                  <span>123456789</span>
                </div>
                <div>
                  <Select styles={defaultStyle}
                          components={{IndicatorSeparator: () => null}}
                          options={platformStatusTypeSelect}
                          value={platformStatusTypeSelect[0]}
                          onChange={handleChangeChartKey}
                  />
                  <span>123456789</span>
                </div>
              </ChartLabel>
              <PlatformResponsiveBar dataType={dataType} />
            </ChartContainer>
          </DashBoardBody>
          <DashBoardHeader style={{marginTop: 30}}>광고주 현황</DashBoardHeader>
          <DashBoardBody>
            <Table columns={adverListColumn}
                   totalCount={[totalInfo.totalCount, '광고주']}
                   data={adverStatusData}/>
          </DashBoardBody>
        </DashBoardCard>
      </BoardContainer>
    </main>
  )
}