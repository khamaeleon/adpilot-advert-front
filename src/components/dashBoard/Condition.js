import {
  AgentType,
  BoardSearchDetail,
  CalendarBox,
  CalendarIcon,
  ColSpan0, ColSpan4,
  ColTitle,
  CustomDatePicker,
  DateContainer,
  GraySearchButton,
  Input,
  RangePicker,
  RelativeDiv,
  RowSpan,
  selectStyle
} from "../../assets/GlobalStyles";
import ko from "date-fns/locale/ko";
import {HorizontalRule} from "../common/Common";
import React, {useEffect, useState} from "react";
import {
  getLastDay,
  getLastMonth,
  getLastThirtyDay,
  getLastWeekDay,
  getThisMonth,
  getToDay
} from "../../common/DateUtils";
import Checkbox from "../common/Checkbox";
import Select from "react-select";
import moment from "moment";

export function DashBoardCondition(props) {
  const {role, keyword, setKeyword, handleData, productType, targetingType, searchState, setSearchState} = props
  const [dateRange, setDateRange] = useState([new Date(getThisMonth().startDay), new Date(getToDay())]);
  const [startDate, endDate] = dateRange;
  const [isDeviceCheckedAll, setIsDeviceCheckedAll] = useState(true)
  const [pickedDate, setPickedDate] = useState('thisMonth')
  // const [isAgentCheckedAll, setIsAgentCheckedAll] = useState(true)

  // useEffect(() => {
  //   if (searchState?.agentTypes.length === 5) {
  //     setIsAgentCheckedAll(true)
  //   } else {
  //     setIsAgentCheckedAll(false)
  //   }
  // }, [searchState?.agentTypes]);

  useEffect(() => {
    if (searchState?.deviceTypes.length === 4) {
      setIsDeviceCheckedAll(true)
    } else {
      setIsDeviceCheckedAll(false)
    }
  }, [searchState?.deviceTypes]);

  /**
   * 날짜 레인지 선택
   * @param rangeType
   */
  const handleRangeDate = (rangeType) => {
    setPickedDate(rangeType)
    if (rangeType === 'thisMonth') {
      setSearchState({
        ...searchState,
        searchStartDate: getThisMonth().startDay,
        searchEndDate: getThisMonth().endDay
      })
      setDateRange([new Date(getThisMonth().startDay), new Date(getThisMonth().endDay)])
    } else if (rangeType === 'lastMonth') {
      setSearchState({
        ...searchState,
        searchStartDate: getLastMonth().startDay,
        searchEndDate: getLastMonth().endDay
      })
      setDateRange([new Date(getLastMonth().startDay), new Date(getLastMonth().endDay)])
    } else if (rangeType === 'today') {
      setSearchState({
        ...searchState,
        searchStartDate: getToDay(),
        searchEndDate: getToDay()
      })
      setDateRange([new Date(), new Date()])
    } else if (rangeType === 'lastDay') {
      setSearchState({
        ...searchState,
        searchStartDate: getLastDay(),
        searchEndDate: getLastDay()
      })
      setDateRange([new Date(getLastDay()), new Date(getLastDay())])
    } else if (rangeType === 'lastWeekDay') {
      setSearchState({
        ...searchState,
        searchStartDate: getLastWeekDay().startDay,
        searchEndDate: getLastWeekDay().endDay
      })
      setDateRange([new Date(getLastWeekDay().startDay), new Date(getLastWeekDay().endDay)])
    } else if (rangeType === 'lastThirtyDay') {
      setSearchState({
        ...searchState,
        searchStartDate: getLastThirtyDay().startDay,
        searchEndDate: getLastThirtyDay().endDay
      })
      setDateRange([new Date(getLastThirtyDay().startDay), new Date(getLastThirtyDay().endDay)])
    }
  }

  const handelChangeDateRange = (date) => {
    if(date[1] !== null){
      setSearchState({
        ...searchState,
        searchStartDate: moment(date[0]).format('YYYY-MM-DD'),
        searchEndDate: moment(date[1]).format('YYYY-MM-DD')
      })
      setPickedDate('')
    }
    setDateRange(date)
  }

  /**
   * 광고 상품 선택
   * @param productType
   */
  const handleProductType = (selectProductType) => {
    setSearchState({
      ...searchState,
      productType: selectProductType.value
    })
  }

  /**
   * 타겟팅 타입 선택
   * @param targetingType
   */
  const handleTargetingType = (selectTargeting) => {
    setSearchState({
      ...searchState,
      targetingType: selectTargeting.value
    })
  }

  /**
   * 에이전트 타입 체크
   * @param event
   */

  // const handleAgentChangeCheckAll = (event) => {
  //   if (event.target.checked === true) {
  //     setSearchState({
  //       ...searchState,
  //       agentTypes: ['WEB', 'WEB_APP', 'MOBILE_WEB', 'MOBILE_HYBRID_APP','MOBILE_NATIVE_APP']
  //     })
  //     setIsAgentCheckedAll(event.target.checked)
  //   }
  // }

  /**
   * 디바이스 타입 체크
   * @param event
   */
  const handleDeviceTypeChangeCheckAll = (event) => {
    if (event.target.checked === true) {
      setSearchState({
        ...searchState,
        deviceTypes: ['PC', 'MOBILE', 'RESPONSIVE_WEB', 'APP']
      })
      setIsDeviceCheckedAll(event.target.checked)
    }
  }

  // const handleAgentChangeCheck = (event) => {
  //   if (event.currentTarget.checked) {
  //     setSearchState({
  //       ...searchState,
  //       agentTypes: searchState.agentTypes.concat(event.currentTarget.value)
  //     })
  //   } else {
  //     if(searchState.agentTypes.length > 1) {
  //       setSearchState({
  //         ...searchState,
  //         agentTypes: searchState.agentTypes.filter(id => id !== event.currentTarget.value)
  //       })
  //     }
  //   }
  // }

  const handleDeviceChangeCheck = (event) => {
    if (event.currentTarget.checked) {
      setSearchState({
        ...searchState,
        deviceTypes: searchState.deviceTypes.concat(event.currentTarget.value)
      })
    } else {
      if(searchState.deviceTypes.length > 1) {
        setSearchState({
          ...searchState,
          deviceTypes: searchState.deviceTypes.filter(id => id !== event.currentTarget.value)
        })
      }
    }
  }

  /**
   * 검색어
   * @param keyword
   */
  const handleSearchValue = (event) => {
    setKeyword(event.target.value)
  }
  return (
    <BoardSearchDetail>
      <div style={{marginRight: 10}}>
        <RowSpan style={{marginTop: 0, justifyContent: 'flex-start'}}>
          <ColSpan4>
            <ColSpan0 style={{marginRight: 10}}>
              <ColTitle style={{paddingLeft: 0}}>광고 상품</ColTitle>
              <Select options={productType}
                      value={productType.find(value => value.value === searchState?.productType)}
                      onChange={handleProductType}
                      width={160}
                      styles={selectStyle}
                      isSearchable={false}
              />
            </ColSpan0>
            <ColSpan0 style={{marginRight: 10}}>
              <ColTitle style={{paddingLeft: 0}}>타겟팅</ColTitle>
              <Select options={targetingType}
                      value={targetingType.find(value => value.value === searchState?.targetingType)}
                      onChange={handleTargetingType}
                      width={160}
                      styles={selectStyle}
                      isSearchable={false}
              />
            </ColSpan0>
            <ColSpan0>
              <ColTitle style={{paddingLeft: 0}}>디바이스</ColTitle>
              <RelativeDiv style={{marginRight: 0}}>
                <AgentType>
                  <Checkbox label={'전체'}
                            type={'c'}
                            id={'all'}
                            value={'All'}
                            isChecked={isDeviceCheckedAll}
                            onChange={handleDeviceTypeChangeCheckAll}
                  />
                  <Checkbox label={'PC'}
                            type={'c'}
                            id={'PC'}
                            value={'PC'}
                            isChecked={searchState?.deviceTypes.includes('PC') ? true : false}
                            onChange={handleDeviceChangeCheck}/>
                  <Checkbox label={'모바일 웹'}
                            type={'c'}
                            id={'MOBILE'}
                            value={'MOBILE'}
                            isChecked={searchState?.deviceTypes.includes('MOBILE') ? true : false}
                            onChange={handleDeviceChangeCheck}/>
                  <Checkbox label={'반응형 웹'}
                            type={'c'}
                            id={'RESPONSIVE_WEB'}
                            value={'RESPONSIVE_WEB'}
                            isChecked={searchState?.deviceTypes.includes('RESPONSIVE_WEB') ? true : false}
                            onChange={handleDeviceChangeCheck}/>
                  <Checkbox label={'APP'}
                            type={'c'}
                            id={'APP'}
                            value={'APP'}
                            isChecked={searchState?.deviceTypes.includes('APP') ? true : false}
                            onChange={handleDeviceChangeCheck}/>
                </AgentType>
              </RelativeDiv>
            </ColSpan0>
          </ColSpan4>
        </RowSpan>
          {/*<RowSpan>*/}
          {/*  <ColSpan0>*/}
          {/*    <ColTitle style={{paddingLeft: 0}}>에이전트</ColTitle>*/}
          {/*    <RelativeDiv>*/}
          {/*      <AgentType>*/}
          {/*        <Checkbox label={'전체'}*/}
          {/*                  type={'c'}*/}
          {/*                  id={'all'}*/}
          {/*                  value={'All'}*/}
          {/*                  isChecked={isAgentCheckedAll}*/}
          {/*                  onChange={handleAgentChangeCheckAll}*/}
          {/*        />*/}
          {/*        <Checkbox label={'PC 웹'}*/}
          {/*                  type={'c'}*/}
          {/*                  id={'WEB'}*/}
          {/*                  value={'WEB'}*/}
          {/*                  isChecked={searchState?.agentTypes.includes('WEB') ? true : false}*/}
          {/*                  onChange={handleAgentChangeCheck}/>*/}
          {/*        <Checkbox label={'PC 어플리케이션'}*/}
          {/*                  type={'c'}*/}
          {/*                  id={'WEB_APP'}*/}
          {/*                  value={'WEB_APP'}*/}
          {/*                  isChecked={searchState?.agentTypes.includes('WEB_APP') ? true : false}*/}
          {/*                  onChange={handleAgentChangeCheck}/>*/}
          {/*        <Checkbox label={'모바일 웹'}*/}
          {/*                  type={'c'}*/}
          {/*                  id={'MOBILE_WEB'}*/}
          {/*                  value={'MOBILE_WEB'}*/}
          {/*                  isChecked={searchState?.agentTypes.includes('MOBILE_WEB') ? true : false}*/}
          {/*                  onChange={handleAgentChangeCheck}/>*/}
          {/*        <Checkbox label={'하이브리드 APP'}*/}
          {/*                  type={'c'}*/}
          {/*                  id={'MOBILE_HYBRID_APP'}*/}
          {/*                  value={'MOBILE_HYBRID_APP'}*/}
          {/*                  isChecked={searchState?.agentTypes.includes('MOBILE_HYBRID_APP') ? true : false}*/}
          {/*                  onChange={handleAgentChangeCheck}/>*/}
          {/*        <Checkbox label={'네이티브 APP'}*/}
          {/*                  type={'c'}*/}
          {/*                  id={'MOBILE_NATIVE_APP'}*/}
          {/*                  value={'MOBILE_NATIVE_APP'}*/}
          {/*                  isChecked={searchState?.agentTypes.includes('MOBILE_NATIVE_APP') ? true : false}*/}
          {/*                  onChange={handleAgentChangeCheck}/>*/}
          {/*      </AgentType>*/}
          {/*    </RelativeDiv>*/}
          {/*  </ColSpan0>*/}
          {/*</RowSpan>*/}
        <RowSpan style={{justifyContent: 'flex-start'}}>
          <ColSpan4>
            {/*<ColTitle style={{paddingLeft: 0}}>기간</ColTitle>*/}
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
                  onChange={(date) => handelChangeDateRange(date)}
                  dateFormat="yyyy-MM-dd"
                  locale={ko}
                  isClearable={false}
                  monthsShown={2}
                  openToDate={endDate}
                />
              </DateContainer>
            <ColSpan0>
              <div>
                <RangePicker>
                  <div onClick={() => handleRangeDate('thisMonth')} style={pickedDate === 'thisMonth' ? {color:'#f5811f'}:null}>이번달</div>
                  <HorizontalRule style={{margin: "0 10px"}}/>
                  <div onClick={() => handleRangeDate('lastMonth')} style={pickedDate === 'lastMonth' ? {color:'#f5811f'}:null}>지난달</div>
                  <HorizontalRule style={{margin: "0 10px"}}/>
                  <div onClick={() => handleRangeDate('today')} style={pickedDate === 'today' ? {color:'#f5811f'}:null}>오늘</div>
                  <HorizontalRule style={{margin: "0 10px"}}/>
                  <div onClick={() => handleRangeDate('lastDay')} style={pickedDate === 'lastDay' ? {color:'#f5811f'}:null}>어제</div>
                  <HorizontalRule style={{margin: "0 10px"}}/>
                  <div onClick={() => handleRangeDate('lastWeekDay')} style={pickedDate === 'lastWeekDay' ? {color:'#f5811f'}:null}>지난7일</div>
                  <HorizontalRule style={{margin: "0 10px"}}/>
                  <div onClick={() => handleRangeDate('lastThirtyDay')} style={pickedDate === 'lastThirtyDay' ? {color:'#f5811f'}:null}>지난30일</div>
                </RangePicker>
              </div>
            </ColSpan0>
          {role !== 'NORMAL' &&
            <ColSpan0>
              {/*<ColTitle style={{paddingLeft: 0}}>검색어</ColTitle>*/}
              <Input type={'text'}
                     placeholder={'광고주명 및 아이디 검색'}
                     value={keyword}
                     onChange={handleSearchValue}
                     onKeyDown={e => (e.key === 'Enter') && handleData()}
              />
            </ColSpan0>
          }
          </ColSpan4>
        </RowSpan>
      </div>
      <GraySearchButton onClick={handleData}>적용</GraySearchButton>
    </BoardSearchDetail>
  )
}