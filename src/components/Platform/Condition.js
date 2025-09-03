import {
  AgentType,
  BoardSearchDetail,
  CalendarBox,
  CalendarIcon,
  ColSpan0,
  ColSpan4,
  ColTitle,
  CustomDatePicker,
  DateContainer,
  GraySearchButton,
  Input,
  RangePicker,
  ResetButton,
  RowSpan,
  SearchInput,
  selectStyle,
  Span2,
} from "../../assets/GlobalStyles";
import ko from "date-fns/locale/ko";
import {HorizontalRule} from "../common/Common";
import React, {useEffect, useState} from "react";
import {
  getLastDay,
  getLastMonth,
  getLastNinetyDay,
  getLastOneEightyDay,
  getLastThirtyDay,
  getLastWeekDay,
  getThisMonth,
  getToDay
} from "../../common/DateUtils";
import Checkbox from "../common/Checkbox";
import Select from "react-select";
import {SearchAdvertiser} from "../common/SearchAdvertiser";
import {useParams} from "react-router-dom";
import * as PropTypes from "prop-types";
import moment from "moment";
import {light} from "../../assets/theme";

ResetButton.propTypes = {onClick: PropTypes.func};

export function PlatformCondition(props) {
  const [dateActive,setDateActive] = useState('thisMonth')
  const {searchCondition, setSearchCondition, handleTableData, searchType} = props;
  const [dateRange, setDateRange] = useState([ new Date(getThisMonth().startDay), new Date(getToDay())]);
  const [startDate, endDate] = dateRange;
  const params = useParams()
  const mainColor = light.color.topicColor;
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
    else if (rangeType === 'lastOneEightyDay') {
      setSearchCondition({
        ...searchCondition,
        searchStartDate: getLastOneEightyDay().startDay,
        searchEndDate: getLastOneEightyDay().endDay
      })
      setDateRange([new Date(getLastOneEightyDay().startDay), new Date(getLastOneEightyDay().endDay)])
    }
    //call 때려
  }
  const handelChangeDateRange = (date) => {
    if(date[1] !== null){
      setSearchCondition({
        ...searchCondition,
        searchStartDate: moment(date[0]).format('YYYY-MM-DD'),
        searchEndDate: moment(date[1]).format('YYYY-MM-DD')
      })
      setDateActive('')
    }
    setDateRange(date)
  }
  const handleSearchType = (selectSearchType) => {
    if(selectSearchType.value === 'DEFAULT'){
      setSearchCondition({
        ...searchCondition,
        searchType: selectSearchType.value,
        keyword: ''
      })
    }else {
      setSearchCondition({
        ...searchCondition,
        searchType: selectSearchType.value
      })
    }
  }

  const handleSearchValue = (event) => {
    setSearchCondition({
      ...searchCondition,
      keyword: event.target.value
    })
  }

  const handleSearchAdverResult = (data) => {
    setSearchCondition({
      ...searchCondition,
      username: data.username
    })
    // retrieveProduct({...searchCondition,username: data.username}).then(response =>{
    //   setProductData(response)
    // })
  }

  return (
    <>
      {params.id !== 'conversionManage' &&
            <RowSpan style={{justifyContent: 'flex-start'}}>
              <ColSpan0>
                <Span2>광고주 설정</Span2>
                <Input style={{width: 300}} type={'text'} value={searchCondition.username} readOnly/>
                <SearchAdvertiser title={'광고주 검색'} onSubmit={handleSearchAdverResult}/>
              </ColSpan0>
            </RowSpan>
      }
      <RowSpan style={{marginTop: 0}}>
        <BoardSearchDetail style={{marginTop: 10}}>
          <div style={{marginRight: 10}}>
            <RowSpan style={{justifyContent: 'flex-start', marginTop:0}}>
              <ColSpan4>
                  {/*<Span2>기간</Span2>*/}
                    <DateContainer style={{marginRight: 0}}>
                      <CalendarBox>
                        <CalendarIcon/>
                      </CalendarBox>
                      <CustomDatePicker
                        selectsRange={true}
                        startDate={startDate}
                        endDate={endDate}
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
                      <div onClick={() => handleRangeDate('thisMonth')} style={dateActive==='thisMonth'?{color: mainColor, fontWeight:"bold"}:null}>이번달</div>
                      <HorizontalRule style={{margin: "0 10px"}}/>
                      <div onClick={() => handleRangeDate('lastMonth')} style={dateActive==='lastMonth'?{color: mainColor, fontWeight:"bold"}:null}>지난달</div>
                      <HorizontalRule style={{margin: "0 10px"}}/>
                      <div onClick={() => handleRangeDate('today')} style={dateActive==='today'?{color: mainColor, fontWeight:"bold"}:null}>오늘</div>
                      <HorizontalRule style={{margin: "0 10px"}}/>
                      <div onClick={() => handleRangeDate('lastDay')} style={dateActive==='lastDay'?{color: mainColor, fontWeight:"bold"}:null}>어제</div>
                      <HorizontalRule style={{margin: "0 10px"}}/>
                      <div onClick={() => handleRangeDate('lastWeekDay')} style={dateActive==='lastWeekDay'?{color: mainColor, fontWeight:"bold"}:null}>지난7일</div>
                      <HorizontalRule style={{margin: "0 10px"}}/>
                      <div onClick={() => handleRangeDate('lastThirtyDay')} style={dateActive==='lastThirtyDay'?{color: mainColor, fontWeight:"bold"}:null}>지난30일</div>
                      <HorizontalRule style={{margin: "0 10px"}}/>
                      <div onClick={() => handleRangeDate('lastNinetyDay')} style={dateActive==='lastNinetyDay'?{color: mainColor, fontWeight:"bold"}:null}>지난90일</div>
                      {/*<HorizontalRule style={{margin: "0 10px"}}/>*/}
                      {/*<div onClick={() => handleRangeDate('lastOneEightyDay')} style={dateActive==='lastOneEightyDay'?{color: mainColor}:null}>지난180일</div>*/}
                    </RangePicker>
                  </div>
                </ColSpan0>
              </ColSpan4>
            </RowSpan>
            <RowSpan style={{justifyContent: 'flex-start'}}>
                <ColSpan4>
                  {/*<Span2>검색어</Span2>*/}
                    <Select options={searchType}
                            value={searchCondition.searchType !== '' ? searchType.find(value => value.value === searchCondition.searchType) : searchType[0]}
                            onChange={handleSearchType}
                            isSearchable={false}
                            width={133}
                            styles={selectStyle}
                    />
                    <SearchInput>
                      <input type={'text'}
                             placeholder={'검색어를 입력해주세요.'}
                             readOnly={searchCondition.searchType === 'DEFAULT' || searchCondition.searchType.id === 0}
                             value={searchCondition.keyword}
                             onChange={handleSearchValue}
                             onKeyDown={e => (e.key === 'Enter') && handleTableData()}
                      />
                    </SearchInput>
                </ColSpan4>
        </RowSpan>
          </div>
          <GraySearchButton onClick={handleTableData}>적용</GraySearchButton>
        </BoardSearchDetail>
      </RowSpan>
    </>
  )
}

export function PaymentCondition(props) {
  const {searchCondition, setSearchCondition, handleTableData, searchType} = props
  const [dateRange, setDateRange] = useState([new Date(getThisMonth().startDay), new Date(getToDay())]);
  const [startDate, endDate] = dateRange
  const [isCheckedAll, setIsCheckedAll] = useState(true)
  const [searchTypeSelect] = useState(searchType)
  const [, setSearchSelected] = useState(searchTypeSelect[0])

  const params = useParams()

  const handelChangeDateRange = (date) => {
    if(date[1] !== null){
      setSearchCondition({
        ...searchCondition,
        startAt: moment(date[0]).format('YYYY-MM-DD'),
        endAt: moment(date[1]).format('YYYY-MM-DD')
      })
    }
    setDateRange(date)
  }

  useEffect(() => {
    if(searchCondition.statusList.length === 2 && params.id !== 'advertisingPayments') {
      setIsCheckedAll(true)
    } else if(searchCondition.statusList.length === 4 && params.id === 'advertisingPayments') {
      setIsCheckedAll(true)
    } else {
      setIsCheckedAll(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[searchCondition.statusList.length])
  /**
   * 이벤트 유형 선택
   * @param date
   */

  const handleChangeCheckAll = (event) => {
    if(event.target.checked){
      setSearchCondition({
        ...searchCondition,
        statusList: ['PAYMENT_COMPLETED', 'PAYMENT_FAILED']
      })
    } else{
      setSearchCondition({
        ...searchCondition,
        statusList: []
      })
    }
    setIsCheckedAll(event.target.checked)
  }

  const handleChangeCostCheckAll = (event) => {
    if(event.target.checked){
      setSearchCondition({
        ...searchCondition,
        statusList: ['GIVEN_BY_ADMIN', 'TAKEN_BY_ADMIN','REFUND_REQUEST_OF_USER','REFUNDED_BY_ADMIN']
      })
    } else{
      setSearchCondition({
        ...searchCondition,
        statusList: []
      })
    }
    setIsCheckedAll(event.target.checked)
  }
  //체크박스 핸들링
  const handleChangeChecked = (event) => {
    if(event.currentTarget.checked){
      setSearchCondition({
        ...searchCondition,
        statusList: searchCondition.statusList.concat(event.currentTarget.id)
      })
    }else{
      setSearchCondition({
        ...searchCondition,
        statusList: searchCondition.statusList.filter(id => id !== event.currentTarget.id)
      })
    }
  }
  const handleSearchType = (selectSearchType) => {

    if(selectSearchType.value === 'ALL') {
      setSearchCondition({
        ...searchCondition,
        searchType: selectSearchType.value,
        search: ''
      })
    } else {
      setSearchCondition({
        ...searchCondition,
        searchType: selectSearchType.value
      })
    }
    setSearchSelected(selectSearchType)
  }

  const handlePaymentSearchValue = (event) => {
    setSearchCondition({
      ...searchCondition,
      search: event.target.value
    })
  }
  return (
      <RowSpan>
        <BoardSearchDetail>
          <div style={{marginRight: 10}}>
            <RowSpan style={{justifyContent: 'flex-start', marginTop:0}}>
              <ColSpan4>
                  {/*<Span2>기간</Span2>*/}
                    <DateContainer style={{marginRight: 0}}>
                      <CalendarBox>
                        <CalendarIcon/>
                      </CalendarBox>
                      <CustomDatePicker
                        selectsRange={true}
                        startDate={startDate}
                        endDate={endDate}
                        maxDate={new Date(getToDay())}
                        onChange={(date) => handelChangeDateRange(date)}
                        dateFormat="yyyy-MM-dd"
                        locale={ko}
                        isClearable={false}
                        monthsShown={2}
                        openToDate={endDate}
                      />
                    </DateContainer>
                <ColSpan0>
                  <ColTitle><span>신청 상태</span></ColTitle>
                  <div style={{marginRight: 0}}>
                    <AgentType>
                      {params.id === 'advertisingPayments' &&
                        <>
                          <Checkbox label={'전체'}
                                    type={'c'}
                                    id={'ALL'}
                                    isChecked={isCheckedAll}
                                    onChange={handleChangeCostCheckAll}
                          />
                          <Checkbox label={'광고비 지급'}
                                    type={'c'}
                                    id={'GIVEN_BY_ADMIN'}
                                    isChecked={searchCondition.statusList.includes('GIVEN_BY_ADMIN')}
                                    onChange={handleChangeChecked}/>
                          <Checkbox label={'광고비 차감'}
                                    type={'c'}
                                    id={'TAKEN_BY_ADMIN'}
                                    isChecked={searchCondition.statusList.includes('TAKEN_BY_ADMIN')}
                                    onChange={handleChangeChecked}/>
                          <Checkbox label={'환불 신청'}
                                    type={'c'}
                                    id={'REFUND_REQUEST_OF_USER'}
                                    isChecked={searchCondition.statusList.includes('REFUND_REQUEST_OF_USER')}
                                    onChange={handleChangeChecked}/>
                          <Checkbox label={'환불 완료'}
                                    type={'c'}
                                    id={'REFUNDED_BY_ADMIN'}
                                    isChecked={searchCondition.statusList.includes('REFUNDED_BY_ADMIN')}
                                    onChange={handleChangeChecked}/>
                        </>
                      }
                      {params.id === 'paymentManage' &&
                        <>
                          <Checkbox label={'전체'}
                                    type={'c'}
                                    id={'ALL'}
                                    isChecked={isCheckedAll}
                                    onChange={handleChangeCheckAll}
                          />
                          <Checkbox label={'결제 완료'}
                                    type={'c'}
                                    id={'PAYMENT_COMPLETED'}
                                    isChecked={searchCondition.statusList.includes('PAYMENT_COMPLETED')}
                                    onChange={handleChangeChecked}/>
                          <Checkbox label={'결제 실패'}
                                    type={'c'}
                                    id={'PAYMENT_FAILED'}
                                    isChecked={searchCondition.statusList.includes('PAYMENT_FAILED')}
                                    onChange={handleChangeChecked}/>
                        </>
                      }
                    </AgentType>
                  </div>
                </ColSpan0>
              </ColSpan4>
            </RowSpan>
            <RowSpan style={{justifyContent: 'flex-start'}}>
              <ColSpan4>
                {/*<Span2>검색어</Span2>*/}
                  <Select options={searchType}
                          value={searchCondition.searchType.value !== '' ? searchType.find(value => value.value === searchCondition.searchType) : searchType[0]}
                          onChange={handleSearchType}
                          isSearchable={false}
                          width={133}
                          styles={selectStyle}
                  />
                  <SearchInput>
                    <input type={'text'}
                           placeholder={'검색어를 입력해주세요.'}
                           value={searchCondition.search}
                           onChange={handlePaymentSearchValue}
                           readOnly={searchCondition.searchType === 'ALL'}
                           style={{marginRight: 0}}
                           onKeyDown={e => (e.key === 'Enter') && handleTableData()}
                    />
                  </SearchInput>
              </ColSpan4>
            </RowSpan>
          </div>
          <GraySearchButton onClick={handleTableData}>적용</GraySearchButton>
        </BoardSearchDetail>
      </RowSpan>
  )
}
