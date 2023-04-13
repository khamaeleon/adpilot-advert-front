import {
  Board,
  BoardHeader,
  BoardSearchDetail,
  BoardSearchResult,
  CalendarBox,
  CalendarIcon,
  ColSpan1,
  ColSpan2, ColSpan3, ColTitle,
  CustomDatePicker,
  DateContainer,
  DefaultButton,
  DeleteButton,
  RangePicker,
  RowSpan,
  selectStyle, Span1,
  Span4
} from "../../assets/GlobalStyles";
import {ValidationGroup} from "../campaign/styles/common";
import Select from "react-select";
import ko from "date-fns/locale/ko";
import {HorizontalRule, VerticalRule} from "../../components/common/Common";
import React, {useState} from "react";
import {
  getLastDay,
  getLastMonth,
  getLastNinetyDay,
  getLastThirtyDay,
  getLastWeekDay,
  getThisMonth,
  getToDay
} from "../../common/DateUtils";
import Table from "../../components/table";
import {customReportsColumns} from "./entity/Common";

export default function CustomReports() {
  const [searchCondition, setSearchCondition] = useState()
  const [dateActive,setDateActive] = useState('')
  const [dateRange, setDateRange] = useState([ new Date(getThisMonth().startDay), new Date(getToDay())]);
  const [startDate, endDate] = dateRange;
  /**
   * 날짜 레인지 선택
   * @param rangeType
   */
  const handleRangeDate = (rangeType) => {
    setDateActive(rangeType)
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

  return(
    <Board>
      <BoardHeader>나이키_일별 보고서</BoardHeader>
      <BoardSearchDetail>
        <RowSpan box={true} column={true}>
          <RowSpan>
            <ColSpan1 style={{borderBottom: '1px solid #ddd', justifyContent: "space-between"}}>
              <div style={{padding: 10}}>나이키_일별 보고서</div>
              <DeleteButton style={{padding: 8}}/>
            </ColSpan1>
          </RowSpan>
          <RowSpan>
            <ColSpan1>
              <ColTitle><Span1>광고 상품</Span1></ColTitle>
              <div>
                <Select styles={selectStyle} options={[{key:1,value:1,label: '전체'}]}/>
              </div>
            </ColSpan1>
            <ColSpan1>
              <ColTitle><Span1>이벤트</Span1></ColTitle>
              <div>
                <Select styles={selectStyle} options={[{key:1,value:1,label: '전체'}]}/>
              </div>
            </ColSpan1>
            <ColSpan1>
              <ColTitle><Span1>디바이스</Span1></ColTitle>
              <div>
                <Select styles={selectStyle} options={[{key:1,value:1,label: '전체'}]}/>
              </div>
            </ColSpan1>
            <ColSpan1/>
          </RowSpan>
          <RowSpan>
            <ColSpan1>
              <ColTitle><Span1>기간</Span1></ColTitle>
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
            </ColSpan1>
            <ColSpan2>
              <div>
                <RangePicker style={{backgroundColor: '#fff', width: '100%', justifyContent: 'space-around'}}>
                  <div onClick={() => handleRangeDate('thisMonth')} style={dateActive==='thisMonth'?{color:'#f5811f'}:null}>이번달</div>
                  <HorizontalRule style={{margin: "0 10px"}}/>
                  <div onClick={() => handleRangeDate('lastMonth')} style={dateActive==='lastMonth'?{color:'#f5811f'}:null}>지난달</div>
                  <HorizontalRule style={{margin: "0 10px"}}/>
                  <div onClick={() => handleRangeDate('today')} style={dateActive==='today'?{color:'#f5811f'}:null}>오늘</div>
                  <HorizontalRule style={{margin: "0 10px"}}/>
                  <div onClick={() => handleRangeDate('lastDay')} style={dateActive==='lastDay'?{color:'#f5811f'}:null}>어제</div>
                  <HorizontalRule style={{margin: "0 10px"}}/>
                  <div onClick={() => handleRangeDate('lastWeekDay')} style={dateActive==='lastWeekDay'?{color:'#f5811f'}:null}>지난7일</div>
                  <HorizontalRule style={{margin: "0 10px"}}/>
                  <div onClick={() => handleRangeDate('lastThirtyDay')} style={dateActive==='lastThirtyDay'?{color:'#f5811f'}:null}>지난30일</div>
                  <HorizontalRule style={{margin: "0 10px"}}/>
                  <div onClick={() => handleRangeDate('lastNinetyDay')} style={dateActive==='lastNinetyDay'?{color:'#f5811f'}:null}>지난90일</div>
                </RangePicker>
              </div>
            </ColSpan2>
            <ColSpan1/>
          </RowSpan>
          <VerticalRule style={{height:0.5}}/>
          <ValidationGroup>
            <DefaultButton>검색</DefaultButton>
          </ValidationGroup>
        </RowSpan>
      </BoardSearchDetail>
      <BoardSearchResult>
        <Table
          columns={customReportsColumns}
          data={[]}
        />
      </BoardSearchResult>
    </Board>
  )
}