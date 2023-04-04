import {
  AgentType,
  BoardSearchDetail,
  CalendarBox,
  CalendarIcon,
  ColSpan1,
  ColSpan2, ColSpan3,
  ColSpan4,
  ColTitle,
  CustomDatePicker,
  DateContainer, inputStyle,
  RangePicker,
  RowSpan, SearchButton, SearchInput
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
import {dateFormat} from "../../common/StringUtils";
import {mediaType} from "../../pages/platform_manage/entity";
import Checkbox from "../common/Checkbox";
import Select from "react-select";

export function PlatformCondition(props) {
  const {searchCondition, setSearchCondition, handleTableData, searchType} = props;
  const [dateRange, setDateRange] = useState([ new Date(getThisMonth().startDay), new Date(getToDay())]);
  const [startDate, endDate] = dateRange;
  const [searchTypeSelect] = useState(searchType)
  const [searchSelected, setSearchSelected] = useState(searchTypeSelect[0])
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
  const handleSearchType = (selectSearchType) => {
    setSearchCondition({
      ...searchCondition,
      searchType: selectSearchType.value
    })
    setSearchSelected(selectSearchType)
  }

  const handleSearchValue = (event) => {
    setSearchCondition({
      ...searchCondition,
      keyword: event.target.value
    })
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
      <RowSpan>
        <ColSpan2>
          <Select styles={inputStyle}
                  components={{IndicatorSeparator: () => null}}
                  options={searchTypeSelect}
                  value={searchSelected}
                  onChange={handleSearchType}
          />
          <SearchInput>
            <input type={'text'}
                   placeholder={'검색어를 입력해주세요.'}
                   value={searchCondition.keyword}
                   onChange={handleSearchValue}
            />
          </SearchInput>
        </ColSpan2>
        <ColSpan2>
          <SearchButton onClick={handleTableData}>검색</SearchButton>
        </ColSpan2>
      </RowSpan>
    </BoardSearchDetail>
  )
}

export function PaymentCondition(props) {
  const {searchPayment, setSearchPayment, handlePaymentTableData} = props
  const [dateRange, setDateRange] = useState([new Date(getThisMonth().startDay), new Date(getToDay())]);
  const [startDate, endDate] = dateRange
  const [isCheckedAll, setIsCheckedAll] = useState(true)
  const [paymentTypeSelect] = useState(mediaType)
  const [searchSelected, setSearchSelected] = useState(paymentTypeSelect[0])

  useEffect(() => {
    setSearchPayment({
      ...searchPayment,
      startAt: dateFormat(startDate, 'YYYY-MM-dd'),
      endAt: dateFormat(endDate, 'YYYY-MM-dd'),
    })
  },[dateRange])

  useEffect(() => {
    if(searchPayment.statusList.length == 7) {
      setIsCheckedAll(true)
    } else {
      setIsCheckedAll(false)
    }
  },[searchPayment.statusList.length])
  /**
   * 이벤트 유형 선택
   * @param event
   */
  const handleRangeDate = (date) => {
    setDateRange(date)
  }
  const handleChangeCheckAll = (event) => {
    if(event.target.checked){
      setSearchPayment({
        ...searchPayment,
        statusList: ['INVOICE_REQUEST', 'EXAMINED_COMPLETED', 'REJECT', 'PAYMENT_COMPLETED', 'WITHHELD_PAYMENT', 'REVENUE_INCREASE', 'REVENUE_DECREASE']
      })
    } else{
      setSearchPayment({
        ...searchPayment,
        statusList: []
      })
    }
    setIsCheckedAll(event.target.checked)
  }

  const handleChangeChecked = (event) => {
    //체크박스 핸들링
    if(event.currentTarget.checked){
      setSearchPayment({
        ...searchPayment,
        statusList: searchPayment.statusList.concat(event.currentTarget.id)
      })
    }else{
      setSearchPayment({
        ...searchPayment,
        statusList: searchPayment.statusList.filter(id => id !== event.currentTarget.id)
      })
    }
  }

  const handlePaymentSearchType = (selectSearchType) => {
    setSearchPayment({
      ...searchPayment,
      searchType: selectSearchType.value
    })
    setSearchSelected(selectSearchType)
  }

  const handlePaymentSearchValue = (event) => {
    setSearchPayment({
      ...searchPayment,
      search: event.target.value
    })
  }
  return (
    <BoardSearchDetail>
      {/*line1*/}
      <RowSpan>
        <ColSpan1>
          <ColTitle><span>기간</span></ColTitle>
          <div style={{width: '100%'}}>
            <DateContainer>
              <CalendarBox>
                <CalendarIcon/>
              </CalendarBox>
              <CustomDatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                maxDate={new Date(getToDay())}
                onChange={(date) => handleRangeDate(date)}
                dateFormat="yyyy-MM-dd"
                locale={ko}
                isClearable={false}
              />
            </DateContainer>
          </div>
        </ColSpan1>
        <ColSpan3>
          <ColTitle><span>신청 상태</span></ColTitle>
          <div>
            <AgentType>
              <Checkbox label={'전체'}
                        type={'c'}
                        id={'ALL'}
                        isChecked={isCheckedAll}
                        onChange={handleChangeCheckAll}
              />
              <Checkbox label={'정산 신청'}
                        type={'c'}
                        id={'INVOICE_REQUEST'}
                        isChecked={searchPayment.statusList.includes('INVOICE_REQUEST') ? true : false}
                        onChange={handleChangeChecked}/>
              <Checkbox label={'심사 완료'}
                        type={'c'}
                        id={'EXAMINED_COMPLETED'}
                        isChecked={searchPayment.statusList.includes('EXAMINED_COMPLETED') ? true : false}
                        onChange={handleChangeChecked}/>
              <Checkbox label={'반려'}
                        type={'c'}
                        id={'REJECT'}
                        isChecked={searchPayment.statusList.includes('REJECT') ? true : false}
                        onChange={handleChangeChecked}/>
              <Checkbox label={'지급 완료'}
                        type={'c'}
                        id={'PAYMENT_COMPLETED'}
                        isChecked={searchPayment.statusList.includes('PAYMENT_COMPLETED') ? true : false}
                        onChange={handleChangeChecked}/>
              <Checkbox label={'지급 보류'}
                        type={'c'}
                        id={'WITHHELD_PAYMENT'}
                        isChecked={searchPayment.statusList.includes('WITHHELD_PAYMENT') ? true : false}
                        onChange={handleChangeChecked}/>
              <Checkbox label={'수익 증가'}
                        type={'c'}
                        id={'REVENUE_INCREASE'}
                        isChecked={searchPayment.statusList.includes('REVENUE_INCREASE') ? true : false}
                        onChange={handleChangeChecked}/>
              <Checkbox label={'수익 감소'}
                        type={'c'}
                        id={'REVENUE_DECREASE'}
                        isChecked={searchPayment.statusList.includes('REVENUE_DECREASE') ? true : false}
                        onChange={handleChangeChecked}/>
            </AgentType>
          </div>
        </ColSpan3>
      </RowSpan>
      <RowSpan>
        <ColSpan2>
          <Select styles={inputStyle}
                  components={{IndicatorSeparator: () => null}}
                  options={paymentTypeSelect}
                  value={searchSelected}
                  onChange={handlePaymentSearchType}
          />
          <SearchInput>
            <input type={'text'}
                   placeholder={'검색어를 입력해주세요.'}
                   value={searchPayment.search}
                   onChange={handlePaymentSearchValue}
            />
          </SearchInput>
        </ColSpan2>
        <ColSpan2>
          <SearchButton onClick={handlePaymentTableData}>검색</SearchButton>
        </ColSpan2>
      </RowSpan>
    </BoardSearchDetail>
  )
}