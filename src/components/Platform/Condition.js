import {
  BoardSearchDetail,
  CalendarBox,
  CalendarIcon,
  ColSpan1,
  ColSpan2,
  ColSpan4,
  ColTitle,
  CustomDatePicker,
  DateContainer,
  RangePicker,
  RowSpan
} from "../../assets/GlobalStyles";
import ko from "date-fns/locale/ko";
import {HorizontalRule} from "../common/Common";
import React, {useEffect, useState} from "react";
import {
  getLastDay,
  getLastMonth,
  getLastNinetyDay,
  getLastThirtyDay,
  getLastWeekDay,
  getThisMonth,
  getToDay
} from "../../common/DateUtils";

export function PlatformCondition(props) {
  const {searchCondition, setSearchCondition} = props
  const [dateRange, setDateRange] = useState([ new Date(getThisMonth().startDay), new Date(getToDay())]);
  const [startDate, endDate] = dateRange
  /**
   * 날짜 레인지 선택
   * @param event
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
    //call 때려
  }


  return (
    <BoardSearchDetail>
      <RowSpan>
        <ColSpan2>
          <ColTitle><span>기간</span></ColTitle>
          <div style={{width:'100%'}}>
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
        </ColSpan2>
        <ColSpan4>
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
        </ColSpan4>
        <ColSpan1/>
      </RowSpan>
    </BoardSearchDetail>
  )
}