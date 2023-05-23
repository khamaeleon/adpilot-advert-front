import {
  AgentType,
  BoardSearchDetail,
  CalendarBox,
  CalendarIcon,
  ColSpan0,
  ColSpan1,
  ColSpan3,
  ColTitle,
  CustomDatePicker,
  DateContainer,
  Input,
  RangePicker,
  RelativeDiv,
  RowSpan,
  SearchButton
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
import {useAtom} from "jotai";
import {searchConditionAtom} from "../../pages/dash_board/entity/Common";
import {adverStatusAtom} from "../../pages/dash_board/entity/Campaign";
import {retrieveAdvertiserStatus} from "../../services/dash_board/ManageCampaignAxios";
import {dataTotalInfo} from "../common/entity";
import moment from "moment";

export function DashBoardCondition(props) {
  const {role, keyword, setKeyword, handleData, productType, eventType} = props
  const [searchCondition, setSearchCondition] = useAtom(searchConditionAtom)
  const [dateRange, setDateRange] = useState([new Date(getThisMonth().startDay), new Date(getToDay())]);
  const [startDate, endDate] = dateRange;
  const [isCheckedAll, setIsCheckedAll] = useState(true)
  const [adverStatusData, setAdverStatusData] = useAtom(adverStatusAtom)
  const [totalInfo, setTotalInfo] = useState(dataTotalInfo)

  useEffect(() => {
    if (searchCondition.agentTypes.length === 4) {
      setIsCheckedAll(true)
    } else {
      setIsCheckedAll(false)
    }
  }, [searchCondition.agentTypes]);
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

  const handelChangeDateRange = (date) => {
    if(date[1] !== null){
      setSearchCondition({
        ...searchCondition,
        searchStartDate: moment(date[0]).format('YYYY-MM-DD'),
        searchEndDate: moment(date[1]).format('YYYY-MM-DD')
      })
    }

    setDateRange(date)
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

    retrieveAdvertiserStatus({...searchCondition, productType: selectProductType.value}).then(response => {
      if(response !== null) {
        setAdverStatusData(response)
        setTotalInfo({
          totalCount: response.length
        })
      } else {
        setAdverStatusData([])
      }
    })
  }

  /**
   * 이벤트 타입 선택
   * @param eventType
   */
  const handleEventType = (selectEventType) => {
    setSearchCondition({
      ...searchCondition,
      eventType: selectEventType.value
    })
  }

  /**
   * 에이전트 타입 체크
   * @param event
   */

  const handleChangeCheckAll = (event) => {
    if (event.target.checked === true) {
      setSearchCondition({
        ...searchCondition,
        agentTypes: ['WEB', 'WEB_APP', 'MOBILE_WEB', 'MOBILE_NATIVE_APP']
      })
      setIsCheckedAll(event.target.checked)
    }
  }

  const handleChangeCheck = (event) => {
    if (event.currentTarget.checked) {
      setSearchCondition({
        ...searchCondition,
        agentTypes: searchCondition.agentTypes.concat(event.currentTarget.value)
      })
    } else {
      if(searchCondition.agentTypes.length > 1) {
        setSearchCondition({
          ...searchCondition,
          agentTypes: searchCondition.agentTypes.filter(id => id !== event.currentTarget.value)
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
      <RowSpan style={{marginTop: 0, justifyContent: 'flex-start'}}>
        <ColSpan0 style={{marginRight: 20}}>
          <ColTitle style={{paddingLeft: 0}}>광고 상품</ColTitle>
          <Select components={{IndicatorSeparator: () => null}}
                  options={productType}
                  value={productType.find(value => value.value === searchCondition.productType)}
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
        <ColSpan0 style={{marginRight: 20}}>
          <ColTitle style={{paddingLeft: 0}}>타겟팅</ColTitle>
          <Select components={{IndicatorSeparator: () => null}}
                  options={eventType}
                  value={eventType.find(value => value.value === searchCondition.eventType)}
                  onChange={handleEventType}
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
              <Checkbox label={'모바일 APP'}
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
                onChange={(date) => handelChangeDateRange(date)}
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
        {role !== 'NORMAL' &&
          <ColSpan1 style={{marginLeft: 20}}>
            <ColTitle style={{paddingLeft: 0}}>검색어</ColTitle>
            <Input type={'text'}
                   placeholder={'광고주명 및 아이디 검색'}
                   value={keyword}
                   onChange={handleSearchValue}
                   onKeyDown={e => (e.code === 'Enter') && handleData() }

            />
            <SearchButton onClick={handleData}>검색</SearchButton>
          </ColSpan1>
        }
      </RowSpan>
    </BoardSearchDetail>
  )
}