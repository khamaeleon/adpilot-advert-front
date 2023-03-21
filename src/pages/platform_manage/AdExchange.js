import Select from "react-select";
import Navigator from "../../components/common/Navigator";
import {BoardTableContainer, inputStyle} from "../../assets/GlobalStyles";
import {HorizontalRule} from "../../components/common/Common";
import ko from "date-fns/locale/ko";
import React, {useEffect, useState} from "react";

import {
  AgentType,
  Board,
  BoardContainer,
  BoardHeader,
  BoardSearchDetail, CalendarBox, CalendarIcon,
  ColSpan2, ColSpan3,
  ColTitle, CustomDatePicker, DateContainer, RangePicker,
  RowSpan, SearchButton, SearchInput,
  TitleContainer
} from "../../assets/GlobalStyles";
import Checkbox from "../../components/common/Checkbox";
import {
  getLastDay,
  getLastMonth, getLastNinetyDay,
  getLastThirtyDay,
  getLastWeekDay,
  getThisMonth,
  getToDay
} from "../../common/DateUtils";
import {
  adExChangeListInfo,
  columnAdExChangeData, columnAdExChangeSetting,
  mediaSearchTypeByHistory,
  searchAdExChangeParams, searchAdExChangeRevisionTypes
} from "./entity";
import Table from "../../components/table";
import {selAdExChangeHistoryList} from "../../services/HistoryAxios";
import {atom, useAtom} from "jotai";

const AdExChangeHistoryListInfo =atom([])
function PlatformAdExchange() {
  const [dateRange, setDateRange] = useState([new Date(getToDay()), new Date(getToDay())]);
  const [startDate, endDate] = dateRange
  const [searchRevisionTypesState,setSearchRevisionTypesState] =useState([])
  const [searchAdExChangeParamsState, setSearchAdExChangeParamsState] = useState(searchAdExChangeParams)
  const [mediaSearchTypeByHistoryState] = useState(mediaSearchTypeByHistory)
  const [adExChangeHistoryList, setAdExChangeHistoryList] =useAtom(AdExChangeHistoryListInfo)
  useEffect(() => {
    setSearchRevisionTypesState(searchAdExChangeRevisionTypes)
    selAdExChangeHistoryList(searchAdExChangeParamsState).then(response => {
      console.log(response)
      setAdExChangeHistoryList(response)
    })
  }, []);

  const handleChangeSelectAll = (event) => {
    if(event.target.checked) {
      setSearchAdExChangeParamsState({
        ...searchAdExChangeParamsState,
        searchRevisionTypes: searchRevisionTypesState.map(data => {return data.value})
      });
    }else {
      setSearchAdExChangeParamsState({
        ...searchAdExChangeParamsState,
        searchRevisionTypes: []
      });
    }
  }

  /**
   * 이벤트 유형 선택
   * @param event
   */
  const handleChangeChecked = (event) => {
    //체크가 true일때
    if(event.target.checked){
      setSearchAdExChangeParamsState({
        ...searchAdExChangeParamsState,
        searchRevisionTypes: searchAdExChangeParamsState.searchRevisionTypes.concat( searchRevisionTypesState.find(type => type.value === event.target.id).value)
      });

    }
    else{
      setSearchAdExChangeParamsState({
        ...searchAdExChangeParamsState,
        searchRevisionTypes: searchAdExChangeParamsState.searchRevisionTypes.filter(data => data !== event.target.id )
      });
    }
  }
  /**
   * 기간변 버튼 이벤트
   * @param rangeType
   */
  const handleRangeDate = (rangeType) => {
    if (rangeType === 'thisMonth') {
      setSearchAdExChangeParamsState({
        ...searchAdExChangeParamsState,
        searchStartDay: getThisMonth().startDay,
        searchEndDay: getThisMonth().endDay
      })
      setDateRange([new Date(getThisMonth().startDay), new Date(getThisMonth().endDay)])
    } else if (rangeType === 'lastMonth') {
      setSearchAdExChangeParamsState({
        ...searchAdExChangeParamsState,
        searchStartDay: getLastMonth().startDay,
        searchEndDay: getLastMonth().endDay
      })
      setDateRange([new Date(getLastMonth().startDay), new Date(getLastMonth().endDay)])
    } else if (rangeType === 'today') {
      setSearchAdExChangeParamsState({
        ...searchAdExChangeParamsState,
        searchStartDay: getToDay(),
        searchEndDay: getToDay()
      })
      setDateRange([new Date(), new Date()])
    } else if (rangeType === 'lastDay') {
      setSearchAdExChangeParamsState({
        ...searchAdExChangeParamsState,
        searchStartDay: getLastDay(),
        searchEndDay: getLastDay()
      })
      setDateRange([new Date(getLastDay()), new Date(getLastDay())])
    } else if (rangeType === 'lastWeekDay') {
      setSearchAdExChangeParamsState({
        ...searchAdExChangeParamsState,
        searchStartDay: getLastWeekDay().startDay,
        searchEndDay: getLastWeekDay().endDay
      })
      setDateRange([new Date(getLastWeekDay().startDay), new Date(getLastWeekDay().endDay)])
    } else if (rangeType === 'lastThirtyDay') {
      setSearchAdExChangeParamsState({
        ...searchAdExChangeParamsState,
        searchStartDay: getLastThirtyDay().startDay,
        searchEndDay: getLastThirtyDay().endDay
      })
      setDateRange([new Date(getLastThirtyDay().startDay), new Date(getLastThirtyDay().endDay)])
    } else if (rangeType === 'lastNinetyDay') {
      setSearchAdExChangeParamsState({
        ...searchAdExChangeParamsState,
        searchStartDay: getLastNinetyDay().startDay,
        searchEndDay: getLastNinetyDay().endDay
      })
      setDateRange([new Date(getLastNinetyDay().startDay), new Date(getLastNinetyDay().endDay)])
    }
    //call 때려
  }
  const handleMediaSearchTypeByHistory = (selectSearchType) => {
    setSearchAdExChangeParamsState({
      ...searchAdExChangeParamsState,
      searchType: selectSearchType
    })
  }

  const handleMediaSearchValueByHistory = (event) => {
    setSearchAdExChangeParamsState({
      ...searchAdExChangeParamsState,
      searchKeyword: event.target.value
    })
  }

  const searchAdExChangeHistoryInfo =()=>{
    console.log(searchAdExChangeParamsState)
  }
  return (
    <main>
      <BoardContainer>
        <TitleContainer>
          <h1>플랫폼 관리</h1>
          <Navigator/>
        </TitleContainer>
        <Board>
          <BoardHeader>애드 익스체인지 이력 관리</BoardHeader>
          <BoardSearchDetail>
            {/*line1*/}
            <RowSpan>
              <ColSpan3>
                <ColTitle><span>변경 항목</span></ColTitle>
                <div>
                  <AgentType>
                    <Checkbox label={'전체'}
                              type={'c'}
                              id={'ALL'}
                              isChecked={searchAdExChangeParamsState.searchRevisionTypes.length === searchRevisionTypesState.length}
                              onChange={handleChangeSelectAll}/>
                    {
                      searchRevisionTypesState.map((data, index)=>{
                        return <Checkbox label={data.label}
                                         key={index}
                                         type={'c'}
                                         id={data.value}
                                         isChecked={searchAdExChangeParamsState.searchRevisionTypes.find(event => event === data.value) !== undefined}
                                         onChange={handleChangeChecked}/>
                      })
                    }
                  </AgentType>
                </div>
              </ColSpan3>
              <ColSpan2>
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
                      onChange={(date) => setDateRange(date)}
                      dateFormat="yyyy-MM-dd"
                      locale={ko}
                      isClearable={false}
                    />
                  </DateContainer>
                </div>
              </ColSpan2>
              <ColSpan3>
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
              </ColSpan3>
            </RowSpan>
            {/*line2*/}
            <RowSpan>
              <ColSpan2>
                <Select styles={inputStyle}
                        components={{IndicatorSeparator: () => null}}
                        options={mediaSearchTypeByHistoryState}
                        value={(searchAdExChangeParamsState.searchType !== undefined && searchAdExChangeParamsState.searchType.value !== '') ? searchAdExChangeParamsState.searchType : {
                          id: "1",
                          value: "all",
                          label: "전체"
                        }}
                        onChange={handleMediaSearchTypeByHistory}
                />
                <SearchInput>
                  <input type={'text'}
                         placeholder={'검색할 매체명을 입력해주세요.'}
                         value={searchAdExChangeParamsState.searchKeyword}
                         onChange={handleMediaSearchValueByHistory}
                  />
                </SearchInput>
              </ColSpan2>
              <ColSpan2>
                <SearchButton onClick={searchAdExChangeHistoryInfo}>검색</SearchButton>
              </ColSpan2>
            </RowSpan>
          </BoardSearchDetail>
          <BoardTableContainer>
            <Table columns={columnAdExChangeData}
                   data={adExChangeListInfo}
                     settings={columnAdExChangeSetting}/>
          </BoardTableContainer>
        </Board>
      </BoardContainer>
    </main>
  )
}

export default PlatformAdExchange
