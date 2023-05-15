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
import {dateFormat} from "../../common/StringUtils";
import {reportsInfoAtom} from "../../components/aside/entity";
import {deviceType, productType} from "../dash_board/entity/Common";
import {
  deleteCustomReportsAdminAxios,
  retrieveCustomReportsAdminDetail
} from "../../services/reports/ReportsAdminAxios";

function weekNumberByMonth(dateFormat) {
  const inputDate = new Date(dateFormat);

  // 인풋의 년, 월
  let year = inputDate.getFullYear();
  let month = inputDate.getMonth() + 1;

  // 목요일 기준 주차 구하기
  const weekNumberByThurFnc = (paramDate) => {

    const year = paramDate.getFullYear();
    const month = paramDate.getMonth();
    const date = paramDate.getDate();

    // 인풋한 달의 첫 날과 마지막 날의 요일
    const firstDate = new Date(year, month, 1);
    const lastDate = new Date(year, month+1, 0);
    const firstDayOfWeek = firstDate.getDay() === 0 ? 7 : firstDate.getDay();
    const lastDayOfweek = lastDate.getDay();

    // 인풋한 달의 마지막 일
    const lastDay = lastDate.getDate();

    // 첫 날의 요일이 금, 토, 일요일 이라면 true
    const firstWeekCheck = firstDayOfWeek === 5 || firstDayOfWeek === 6 || firstDayOfWeek === 7;
    // 마지막 날의 요일이 월, 화, 수라면 true
    const lastWeekCheck = lastDayOfweek === 1 || lastDayOfweek === 2 || lastDayOfweek === 3;

    // 해당 달이 총 몇주까지 있는지
    const lastWeekNo = Math.ceil((firstDayOfWeek - 1 + lastDay) / 7);

    // 날짜 기준으로 몇주차 인지
    let weekNo = Math.ceil((firstDayOfWeek - 1 + date) / 7);

    // 인풋한 날짜가 첫 주에 있고 첫 날이 월, 화, 수로 시작한다면 'prev'(전달 마지막 주)
    if(weekNo === 1 && firstWeekCheck) weekNo = 'prev';
    // 인풋한 날짜가 마지막 주에 있고 마지막 날이 월, 화, 수로 끝난다면 'next'(다음달 첫 주)
    else if(weekNo === lastWeekNo && lastWeekCheck) weekNo = 'next';
    // 인풋한 날짜의 첫 주는 아니지만 첫날이 월, 화 수로 시작하면 -1;
    else if(firstWeekCheck) weekNo = weekNo -1;

    return weekNo;
  };

  // 목요일 기준의 주차
  let weekNo = weekNumberByThurFnc(inputDate);

  // 이전달의 마지막 주차일 떄
  if(weekNo === 'prev') {
    // 이전 달의 마지막날
    const afterDate = new Date(year, month-1, 0);
    year = month === 1 ? year - 1 : year;
    month = month === 1 ? 12 : month - 1;
    weekNo = weekNumberByThurFnc(afterDate);
  }
  // 다음달의 첫 주차일 때
  if(weekNo === 'next') {
    year = month === 12 ? year + 1 : year;
    month = month === 12 ? 1 : month + 1;
    weekNo = 1;
  }

  return {year, month, weekNo};
}


const defaultColumn = {
  'BY_DAILY':{
    name: 'statisticsDate',
    header: '일별',
    render: ({cellProps}) => {
      return <span><p>{dateFormat(cellProps.data.statisticsDate, 'yyyy년MM월DD일')}</p></span>
    }
  },
  'BY_WEEKLY': {
    name: 'statisticsStartDate',
    header: '주별',
    render: ({cellProps}) => {
      const weeks = weekNumberByMonth(cellProps.data.statisticsStartDate)
      return <span><p>{weeks.month}월 {weeks.weekNo}주차</p></span>
    }
  },
  'BY_MONTHLY': {
    name: 'statisticsDate',
    header: '월별',
    render: ({cellProps}) => {
      return <span><p>{dateFormat(cellProps.data.statisticsStartDate, 'yyyy년 MM월')} </p></span>
    }
  },
  'BY_CAMPAIGN': "캠페인 명",
  'BY_PRODUCT': "광고 상품",
  'BY_EVENT': "이벤트 명",
  'clickRate': {
    render: (props) => {
      const clickRate = (props.data.validClickCount / props.data.exposureCount) * 100
      return <span>{!isNaN(clickRate) ? clickRate.toFixed(2) : 0}%</span>
    }
  },
  'cpc': {
    render: (props) => {
      const cpc = props.data.costAmount / props.data.validClickCount
      return <span>{!isNaN(cpc) ? cpc.toFixed(2) : 0}</span>
    }
  },
  'conversionRate': {
    render: (props) => {
      const conversionRate = (props.data.conversionCount / props.data.totalClickCount) * 100
      return <span>{!isNaN(conversionRate) ? conversionRate.toFixed(2) : 0} %</span>
    }
  },
  'conversionPrice': {
    render: (props) => {
      const costPerConversion = props.data.costAmount / props.data.conversionCount
      return <span>{!isNaN(costPerConversion) ? costPerConversion.toFixed(2) : 0}</span>
    }
  },
  'amountPurchasedAvg':{
    render: (props) => {
      const amountPurchased = (props.data.costAmount / props.data.conversionCount)
      return <span>{!isNaN(amountPurchased) ? amountPurchased.toFixed(2) : 0}</span>
    }
  },
  'sessionConversionRoas': {
    render: (props) => {
      const sessionRoas = (props.data.sessionConversionAmount  / props.data.costAmount) * 100
      return <span>{!isNaN(sessionRoas) ? sessionRoas.toFixed(2) : 0}</span>
    }
  },
  'directConversionRoas': {
    render: (props) => {
      const directRoas = (props.data.directConversionAmount  / props.data.costAmount) * 100
      return <span>{!isNaN(directRoas) ? directRoas.toFixed(2) : 0}</span>
    }
  },
  'roas': {
    render: (props) => {
      const roas = ((props.data.sessionConversionAmount + props.data.exposureConversionAmount + props.data.directConversionAmount)/ props.data.costAmount) * 100
      return <span>{!isNaN(roas) ? roas.toFixed(2) : 0}</span>
    }
  },
  'exposureConversionRoas': {
    render: (props) => {
      const exposureRoas = (props.data.exposureConversionAmount  / props.data.costAmount) * 100
      return <span>{!isNaN(exposureRoas) ? exposureRoas.toFixed(2) : 0}</span>
    }
  },
  'eCpm': {
    render: (props) => {
      const ecpm = (props.data.costAmount / props.data.exposureCount) * 1000
      return <span>{!isNaN(ecpm) ? ecpm.toFixed(2) : 0}</span>
    }
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
  const [dateRange, setDateRange] = useState([ new Date(getLastMonth().startDay), new Date(getToDay())]);
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
    if(tokenResult.role !== "NORMAL") {
      retrieveCustomReportsAdminDetail(tokenResult.id, reportsInfo.id, params).then(response => {
        console.log(response)
        if(response){
          let newObject = response.adminSetting.groupByPeriod !== 'NONE' ? [defaultColumn[reportsInfo.groupBy]].concat(response.headers) : [].concat(response.headers)
          newObject.map((item, key) => {
            Object.assign(newObject[key], defaultColumn[item.name])
          })
          setCampaignColumn(newObject)
          setCampaignData(response.pagingCommonResponse.rows)
          setReportInfo(response.adminSetting)
        }
      })
    } else {
      retrieveCustomReportsDetail(tokenResult.id, reportsInfo.id, params).then(response => {
        console.log(response)

        let newObject =  response.userSetting.groupByPeriod !== 'NONE' ? [defaultColumn[reportsInfo.groupBy]].concat(response.headers) : [].concat(response.headers)
        newObject.map((item, key) => {
          Object.assign(newObject[key], defaultColumn[item.name])
        })
        setCampaignColumn(newObject)
        setCampaignData(response.pagingCommonResponse.rows)
        setReportInfo(response.userSetting)
        console.log(newObject)
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
    if(tokenResult.role !== "NORMAL") {
      retrieveCustomReportsAdminDetail(tokenResult.id, reportsInfo.id, searchCondition).then(response => {
        setCampaignData(response.pagingCommonResponse.rows)
      })
    }else {
      retrieveCustomReportsDetail(tokenResult.id, reportsInfo.id, searchCondition).then(response => {
        setCampaignData(response.pagingCommonResponse.rows)
      })
    }

  }

  const handleDeleteReport = async () => {
    if(tokenResult.role === 'NORMAL') {
      await deleteCustomReportsAxios({userId:tokenResult.id, userReportSettingId:reportsInfo.id}).then(()=>{
        setReportsInfo({
          id:null,
          groupBy: null
        })
        navigate('/board/reports')
      })
    } else {
      await deleteCustomReportsAdminAxios({email:tokenResult.id, adminReportSettingId:reportsInfo.id}).then(()=>{
        setReportsInfo({
          id:null,
          groupBy: null
        })
        navigate('/board/reports')
      })
    }
  }

  return(
    <Board>
      <BoardHeader>{`${tokenResult.role !== 'NORMAL' ? reportInfo.adverName !== null ? reportInfo.adverName: '어드민' : tokenResult.name} 보고서`}</BoardHeader>
      <BoardSearchDetail>
        <RowSpan box={true} column={true}>
          <RowSpan>
            <ColSpan1 style={{borderBottom: '1px solid #ddd', justifyContent: "space-between"}}>
              <div style={{padding: 10}}>{`${reportInfo.reportName}`}</div>
              <DeleteButton style={{padding: 8}} onClick={handleDeleteReport}/>
            </ColSpan1>
          </RowSpan>
          <RowSpan>
            <ColSpan1>
              <ColTitle><Span1>광고 상품</Span1></ColTitle>
              <div>
                <Select styles={selectStyle} defaultValue={productType[0]} options={productType} onChange={handleChangeProduct}/>
              </div>
            </ColSpan1>
            <ColSpan1>
              <ColTitle><Span1>디바이스</Span1></ColTitle>
              <div>
                <Select styles={selectStyle} defaultValue={deviceType[0]} options={deviceType} onChange={handleChangeDevice}/>
              </div>
            </ColSpan1>
            <ColSpan2/>
          </RowSpan>
          <RowSpan>
            <ColSpan2>
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
            </ColSpan2>
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