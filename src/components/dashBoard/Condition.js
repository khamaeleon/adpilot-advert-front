import {
  AgentType,
  BoardSearchDetail,
  CalendarBox,
  CalendarIcon,
  ColSpan0,
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
  const [isCheckedAll, setIsCheckedAll] = useState(true)
  const [showPrevious, setShowPrevious] = useState(true)

  useEffect(() => {
    if (searchState?.agentTypes.length === 4) {
      setIsCheckedAll(true)
    } else {
      setIsCheckedAll(false)
    }
  }, [searchState?.agentTypes]);
  /**
   * 날짜 레인지 선택
   * @param rangeType
   */
  const handleRangeDate = (rangeType) => {
    rangeType !== 'lastMonth' ? setShowPrevious(true) : setShowPrevious(false)
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
    } else setShowPrevious(false)
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

  const handleChangeCheckAll = (event) => {
    if (event.target.checked === true) {
      setSearchState({
        ...searchState,
        agentTypes: ['WEB', 'WEB_APP', 'MOBILE_WEB', 'MOBILE_NATIVE_APP']
      })
      setIsCheckedAll(event.target.checked)
    }
  }

  const handleChangeCheck = (event) => {
    if (event.currentTarget.checked) {
      setSearchState({
        ...searchState,
        agentTypes: searchState.agentTypes.concat(event.currentTarget.value)
      })
    } else {
      if(searchState.agentTypes.length > 1) {
        setSearchState({
          ...searchState,
          agentTypes: searchState.agentTypes.filter(id => id !== event.currentTarget.value)
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
      <div>
        <RowSpan style={{marginTop: 0, justifyContent: 'flex-start'}}>
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
                          isChecked={searchState?.agentTypes.includes('WEB') ? true : false}
                          onChange={handleChangeCheck}/>
                <Checkbox label={'PC 어플리케이션'}
                          type={'c'}
                          id={'WEB_APP'}
                          value={'WEB_APP'}
                          isChecked={searchState?.agentTypes.includes('WEB_APP') ? true : false}
                          onChange={handleChangeCheck}/>
                <Checkbox label={'모바일 웹'}
                          type={'c'}
                          id={'MOBILE_WEB'}
                          value={'MOBILE_WEB'}
                          isChecked={searchState?.agentTypes.includes('MOBILE_WEB') ? true : false}
                          onChange={handleChangeCheck}/>
                <Checkbox label={'모바일 APP'}
                          type={'c'}
                          id={'MOBILE_NATIVE_APP'}
                          value={'MOBILE_NATIVE_APP'}
                          isChecked={searchState?.agentTypes.includes('MOBILE_NATIVE_APP') ? true : false}
                          onChange={handleChangeCheck}/>
              </AgentType>
            </RelativeDiv>
          </ColSpan0>
        </RowSpan>
        <RowSpan style={{justifyContent: 'flex-start'}}>
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
                  onChange={(date) => handelChangeDateRange(date)}
                  dateFormat="yyyy-MM-dd"
                  locale={ko}
                  isClearable={false}
                  monthsShown={2}
                  showPreviousMonths={showPrevious}
                  openToDate={endDate}
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
          {role !== 'NORMAL' &&
            <ColSpan0 style={{marginLeft: 20}}>
              <ColTitle style={{paddingLeft: 0}}>검색어</ColTitle>
              <Input type={'text'}
                     placeholder={'광고주명 및 아이디 검색'}
                     value={keyword}
                     onChange={handleSearchValue}
                     onKeyDown={e => (e.code === 'Enter') && handleData()}
                     style={{width: 220}}
              />
            </ColSpan0>
          }
        </RowSpan>
      </div>
      <GraySearchButton onClick={handleData}>적용</GraySearchButton>
    </BoardSearchDetail>
  )
}