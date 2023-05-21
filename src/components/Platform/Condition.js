import {
  AgentType,
  BoardSearchDetail,
  CalendarBox,
  CalendarIcon,
  ColSpan0,
  ColSpan1,
  ColSpan2,
  ColSpan3,
  ColTitle,
  CustomDatePicker,
  DateContainer, DefaultButton,
  Input,
  inputStyle,
  RangePicker, ResetButton,
  RowSpan,
  SearchButton,
  SearchInput,
  Span4
} from "../../assets/GlobalStyles";
import ko from "date-fns/locale/ko";
import {HorizontalRule} from "../common/Common";
import React, {useEffect, useState} from "react";
import {
  getLastDay,
  getLastMonth,
  getLastNinetyDay, getLastOneEightyDay,
  getLastThirtyDay,
  getLastWeekDay,
  getThisMonth,
  getToDay
} from "../../common/DateUtils";
import {dateFormat} from "../../common/StringUtils";
import Checkbox from "../common/Checkbox";
import Select from "react-select";
import {SearchAdvertiser} from "../common/SearchAdvertiser";
import {retrieveProduct} from "../../services/Platform/PlatformAxios";
import {useAtom} from "jotai";
import {productListDataAtom} from "../../pages/platform_manage/entity/Product";
import {useParams} from "react-router-dom";
import {SmallButton} from "../../pages/campaign/styles/common";
import * as PropTypes from "prop-types";
import moment from "moment";

ResetButton.propTypes = {onClick: PropTypes.func};

export function PlatformCondition(props) {
  const [dateActive,setDateActive] = useState('')
  const {searchCondition, setSearchCondition, handleTableData, searchType} = props;
  const [dateRange, setDateRange] = useState([ new Date(getThisMonth().startDay), new Date(getToDay())]);
  const [productData, setProductData] = useAtom(productListDataAtom)
  const [startDate, endDate] = dateRange;
  const [searchTypeSelect] = useState(searchType)
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
  const handleSearchType = (selectSearchType) => {
    setSearchCondition({
      ...searchCondition,
      searchType: selectSearchType.value
    })
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
    retrieveProduct({...searchCondition,username: data.username}).then(response =>{
      setProductData(response)
    })
  }

  const handleClickReset = () => {
    setSearchCondition({
      ...searchCondition,
      username: ''
    })
  }

  return (
    <BoardSearchDetail>
      <RowSpan>
        <ColSpan1>
          <ColTitle><span>기간</span></ColTitle>
          <div style={{width:'100%'}}>
            <DateContainer style={{marginRight: 0}}>
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
            <RangePicker>
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
              {/*<HorizontalRule style={{margin: "0 10px"}}/>*/}
              {/*<div onClick={() => handleRangeDate('lastOneEightyDay')} style={dateActive==='lastOneEightyDay'?{color:'#f5811f'}:null}>지난180일</div>*/}
            </RangePicker>
          </div>
        </ColSpan2>
        <ColSpan1/>
      </RowSpan>
      <RowSpan>
        <ColSpan1>
          <ColTitle><span>광고주 설정</span></ColTitle>
          <Input type={'text'} value={searchCondition.username} readOnly/>
        </ColSpan1>
        <ColSpan1>
          <SearchAdvertiser title={'광고주 검색'} onSubmit={handleSearchAdverResult}/>
          <ResetButton onClick={handleClickReset}>재설정</ResetButton>
        </ColSpan1>
        <ColSpan2>
          <Select styles={inputStyle}
                  components={{IndicatorSeparator: () => null}}
                  options={searchType}
                  value={searchCondition.searchType.value !== '' ? searchType.find(value => value.value === searchCondition.searchType) : ''}
                  onChange={handleSearchType}
          />
          <SearchInput>
            <input type={'text'}
                   placeholder={'검색어를 입력해주세요.'}
                   value={searchCondition.keyword}
                   onChange={handleSearchValue}
            />
          </SearchInput>
          <SearchButton onClick={handleTableData}>검색</SearchButton>
        </ColSpan2>
      </RowSpan>
    </BoardSearchDetail>
  )
}

export function PaymentCondition(props) {
  const {searchCondition, setSearchCondition, handleTableData, searchType} = props
  const [dateRange, setDateRange] = useState([new Date(getThisMonth().startDay), new Date(getToDay())]);
  const [startDate, endDate] = dateRange
  const [isCheckedAll, setIsCheckedAll] = useState(true)
  const [searchTypeSelect] = useState(searchType)
  const [searchCostTypeSelect] = useState()
  const [searchSelected, setSearchSelected] = useState(searchTypeSelect[0])
  const params = useParams()

  const handelChangeDateRange = (date) => {
    setSearchCondition({
      ...searchCondition,
      startAt: moment(date[0]).format('YYYY-MM-DD'),
      endAt: moment(date[1]).format('YYYY-MM-DD')
    })
    setDateRange(date)
  }

  // useEffect(() => {
  //   setSearchCondition({
  //     ...searchCondition,
  //     startAt: dateFormat(startDate, 'YYYY-MM-dd'),
  //     endAt: dateFormat(endDate, 'YYYY-MM-dd'),
  //   })
  // },[dateRange])

  useEffect(() => {
    if(searchCondition.statusList.length === 2 && params.id !== 'advertisingPayments') {
      setIsCheckedAll(true)
    } else if(searchCondition.statusList.length === 4 && params.id === 'advertisingPayments') {
      setIsCheckedAll(true)
    } else {
      setIsCheckedAll(false)
    }
  },[searchCondition.statusList.length])
  /**
   * 이벤트 유형 선택
   * @param date
   */
  const handleRangeDate = (date) => {
    setDateRange(date)
  }
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

  const handleChangeChecked = (event) => {
    //체크박스 핸들링
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

  const handleChangeCostChecked = (event) => {
    //체크박스 핸들링
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
    setSearchCondition({
      ...searchCondition,
      searchType: selectSearchType.value
    })
    setSearchSelected(selectSearchType)
  }

  const handlePaymentSearchValue = (event) => {
    setSearchCondition({
      ...searchCondition,
      search: event.target.value
    })
  }
  return (
    <BoardSearchDetail>
      {/*line1*/}
      <RowSpan>
        <ColSpan1>
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
                onChange={(date) => handelChangeDateRange(date)}
                // onChange={(date) => handleRangeDate(date)}
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
                            onChange={handleChangeCostChecked}/>
                  <Checkbox label={'광고비 차감'}
                            type={'c'}
                            id={'TAKEN_BY_ADMIN'}
                            isChecked={searchCondition.statusList.includes('TAKEN_BY_ADMIN')}
                            onChange={handleChangeCostChecked}/>
                  <Checkbox label={'환불 신청'}
                            type={'c'}
                            id={'REFUND_REQUEST_OF_USER'}
                            isChecked={searchCondition.statusList.includes('REFUND_REQUEST_OF_USER')}
                            onChange={handleChangeCostChecked}/>
                  <Checkbox label={'환불 완료'}
                            type={'c'}
                            id={'REFUNDED_BY_ADMIN'}
                            isChecked={searchCondition.statusList.includes('REFUNDED_BY_ADMIN')}
                            onChange={handleChangeCostChecked}/>
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
        </ColSpan3>
      </RowSpan>
      <RowSpan>
        <ColSpan2>
          <Select styles={inputStyle}
                  components={{IndicatorSeparator: () => null}}
                  options={searchType}
                  value={searchCondition.searchType.value !== '' ? searchType.find(value => value.value === searchCondition.searchType) : searchType[0]}
                  onChange={handleSearchType}
          />
          <SearchInput>
            <input type={'text'}
                   placeholder={'검색어를 입력해주세요.'}
                   value={searchCondition.search}
                   onChange={handlePaymentSearchValue}
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
