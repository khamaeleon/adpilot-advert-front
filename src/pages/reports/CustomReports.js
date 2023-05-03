import {
  Board,
  BoardHeader,
  BoardSearchDetail,
  BoardSearchResult,
  CalendarBox,
  CalendarIcon,
  ColSpan1,
  ColSpan2,
  ColTitle,
  CustomDatePicker,
  DateContainer,
  DefaultButton,
  DeleteButton,
  RangePicker,
  RowSpan,
  selectStyle,
  Span1
} from "../../assets/GlobalStyles";
import {ValidationGroup} from "../campaign/styles/common";
import Select from "react-select";
import ko from "date-fns/locale/ko";
import {HorizontalRule, VerticalRule} from "../../components/common/Common";
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
import Table from "../../components/table";
import {deleteCustomReportsAxios, retrieveCustomReportsDetail} from "../../services/reports/ReportsAxios";
import {useAtom, useAtomValue} from "jotai";
import {tokenResultAtom} from "../login/entity/Common";
import {useNavigate} from "react-router-dom";
import {arrayDateFormat} from "../../common/StringUtils";
import {reportsInfoAtom} from "../../components/aside/entity";

const defaultColumn = {
  'BY_DAILY':{
    name: 'statisticsDate',
    header: '일별'
  },
  'BY_WEEKLY': {
    name: 'statisticsStartDate',
    header: '주별',
    render: ({cellProps}) => {
      return <span><p>{arrayDateFormat(cellProps.statisticsStartDate)} ~ </p><p>{arrayDateFormat(cellProps.statisticsEndDate)} ~ </p></span>
    }
  },
  'BY_MONTHLY': {
    name: 'statisticsDate',
    header: '월별',
  },
}
export default function CustomReports() {
  const [searchCondition, setSearchCondition] = useState({
    pageSize: 10,
    currentPage: 1,
    searchStartDate: getLastMonth().startDay,
    searchEndDate: getToDay(),
    productType: null,
    deviceType: null
  })
  const [dateActive,setDateActive] = useState('')
  const [dateRange, setDateRange] = useState([ new Date(getThisMonth().startDay), new Date(getToDay())]);
  const [startDate, endDate] = dateRange;
  const tokenResult = useAtomValue(tokenResultAtom)
  const [campaignColumn, setCampaignColumn] = useState([])
  const [campaignData, setCampaignData] = useState([])
  const [reportInfo, setReportInfo] = useState({})
  const navigate = useNavigate()
  const [reportsInfo, setReportsInfo] = useAtom(reportsInfoAtom)

  useEffect(() => {
    const params = {
      pageSize: 10,
      currentPage: 1,
      searchStartDate: getLastMonth().startDay,
      searchEndDate: getToDay(),
    }
    if(reportsInfo.id === null) {
      navigate('/board/reports')
    }
    if(tokenResult.id !== undefined && tokenResult.role === 'NORMAL'){
      retrieveCustomReportsDetail(tokenResult.id, reportsInfo.id, params).then(response => {
        let newObject = [defaultColumn[reportsInfo.groupBy]].concat(response.headers)
        setCampaignColumn(newObject)
        setCampaignData(response.reportStatistics.content)
        setReportInfo(response.userSetting)
      })
    }
  }, [tokenResult, reportsInfo.id]);

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

  const handleChangeProduct = (event) => {
    console.log(event.value)
    setSearchCondition({
      ...searchCondition,
      productType: event.value
    })
  }

  const handleChangeDevice = (event) => {
    console.log(event.value)
    setSearchCondition({
      ...searchCondition,
      deviceType: event.value
    })
  }

  const handleSearchReports = () => {
    console.log(searchCondition)
    retrieveCustomReportsDetail(tokenResult.id, reportsInfo.id, searchCondition).then(response => {
      setCampaignData(response.reportStatistics.content)
    })
  }

  const handleDeleteReport = async () => {
    await deleteCustomReportsAxios({userId:tokenResult.id, userReportSettingId:reportsInfo.id}).then(()=>{
      setReportsInfo({
        id:null,
        groupBy: null
      })
      navigate('/board/reports')
    })
  }

  return(
    <Board>
      <BoardHeader>{`${tokenResult.name}_${reportInfo.reportName}`}</BoardHeader>
      <BoardSearchDetail>
        <RowSpan box={true} column={true}>
          <RowSpan>
            <ColSpan1 style={{borderBottom: '1px solid #ddd', justifyContent: "space-between"}}>
              <div style={{padding: 10}}>{`${tokenResult.name}_${reportInfo.reportName}`}</div>
              <DeleteButton style={{padding: 8}} onClick={handleDeleteReport}/>
            </ColSpan1>
          </RowSpan>
          <RowSpan>
            <ColSpan1>
              <ColTitle><Span1>광고 상품</Span1></ColTitle>
              <div>
                <Select styles={selectStyle} options={[{key:1,value:null,label: '전체'},{key:2,value:'BANNER',label: '배너'},{key:3,value:'POP_UNDER',label: '팝언더'}]} onChange={handleChangeProduct}/>
              </div>
            </ColSpan1>
            <ColSpan1>
              <ColTitle><Span1>디바이스</Span1></ColTitle>
              <div>
                <Select styles={selectStyle} options={[{key:1,value:null,label: '전체'},{key:2,value:'PC',label: 'PC 웹'},{key:3,value:'MOBILE',label: '모바일'},{key:4,value:'RESPONSIVE_WEB',label: '반응형'}]} onChange={handleChangeDevice}/>
              </div>
            </ColSpan1>
            <ColSpan2/>
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
            <DefaultButton onClick={handleSearchReports}>검색</DefaultButton>
          </ValidationGroup>
        </RowSpan>
      </BoardSearchDetail>
      <BoardSearchResult>
        <Table
          columns={campaignColumn}
          data={campaignData}
          idProperty={reportsInfo.groupBy !== 'BY_WEEKLY' ? 'statisticsDate' : 'statisticsStartDate'}
        />
      </BoardSearchResult>
    </Board>
  )
}