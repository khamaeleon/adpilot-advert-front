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
import {deviceType, productType, targetingType} from "../dash_board/entity/Common";
import {
  deleteCustomReportsAdminAxios,
  retrieveCustomReportsAdminDetail
} from "../../services/reports/ReportsAdminAxios";
import {confirmAlert} from "react-confirm-alert";
import moment from "moment";

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
  'BY_DAILY': {
    name: 'statisticsDate',
    header: '일별',
    textAlign: 'center',
    render: ({cellProps}) => {
      return <span><p>{dateFormat(cellProps.data.statisticsDate, 'yyyy년MM월DD일')}</p></span>
    }
  },
  'BY_WEEKLY': {
    name: 'statisticsStartDate',
    header: '주별',
    textAlign: 'center',
    render: ({cellProps}) => {
      const weeks = weekNumberByMonth(cellProps.data.statisticsStartDate)
      return <span><p>{moment(cellProps.data.statisticsStartDate).format('MM월 DD일')}</p><p
        style={{color: '#999'}}>({weeks.month}월 {weeks.weekNo}주차)</p></span>
    }
  },
  'BY_MONTHLY': {
    name: 'statisticsDate',
    header: '월별',
    textAlign: 'center',
    render: ({cellProps}) => {
      return <span><p>{dateFormat(cellProps.data.statisticsStartDate, 'yyyy년 MM월')} </p></span>
    }
  },
  'adverName': {
    name: 'adverName',
    header: '광고주명',
    textAlign: 'center',
    render: (props) => {
      return <span>{props.value}</span>
    }
  },
  'campaignName': {
    name: 'campaignName',
    header: '캠페인명',
    textAlign: 'center',
  },
  'productName': {
    name: 'productType',
    header: '상품명',
    textAlign: 'center',
    render: ({value}) => {
      return <span>{productType.find(item => item.value === value)?.label}</span>
    }
  },
  'targetingName': {
    name: 'targetingType',
    header: '타겟팅',
    textAlign: 'center',
    render: ({value}) => {
      return <span>{targetingType.find(item => item.value === value)?.label}</span>
    }
  },
  'clickRate': {
    textAlign: 'center',
    render: (props) => {
      const clickRate = (props.data.validClickCount / props.data.exposureCount) * 100
      return <span>{!isNaN(clickRate) ? clickRate.toFixed(2) : 0}%</span>
    }
  },
  'cpc': {
    textAlign: 'center',
    render: (props) => {
      const cpc = props.data.costAmount / props.data.validClickCount
      return <span>{!isNaN(cpc) ? cpc.toFixed(2) : 0}</span>
    }
  },
  'conversionRate': {
    textAlign: 'center',
    render: (props) => {
      const conversionRate = (props.data.conversionCount / props.data.totalClickCount) * 100
      return <span>{!isNaN(conversionRate) ? conversionRate.toFixed(2) : 0} %</span>
    }
  },
  'conversionPrice': {
    textAlign: 'center',
    render: (props) => {
      const costPerConversion = props.data.costAmount / props.data.conversionCount
      return <span>{!isNaN(costPerConversion) ? costPerConversion.toFixed(2) : 0}</span>
    }
  },
  'amountPurchasedAvg': {
    textAlign: 'center',
    render: (props) => {
      const amountPurchased = (props.data.costAmount / props.data.conversionCount)
      return <span>{!isNaN(amountPurchased) ? amountPurchased.toFixed(2) : 0}</span>
    }
  },
  'sessionConversionRoas': {
    textAlign: 'center',
    render: (props) => {
      const sessionRoas = (props.data.sessionConversionAmount / props.data.costAmount) * 100
      return <span>{!isNaN(sessionRoas) ? sessionRoas.toFixed(2) : 0}%</span>
    }
  },
  'directConversionRoas': {
    textAlign: 'center',
    render: (props) => {
      const directRoas = (props.data.directConversionAmount / props.data.costAmount) * 100
      return <span>{!isNaN(directRoas) ? directRoas.toFixed(2) : 0}%</span>
    }
  },
  'roas': {
    textAlign: 'center',
    render: (props) => {
      const roas = ((props.data.sessionConversionAmount + props.data.exposureConversionAmount + props.data.directConversionAmount) / props.data.costAmount) * 100
      return <span>{!isNaN(roas) ? roas.toFixed(2) : 0}%</span>
    }
  },
  'exposureConversionRoas': {
    textAlign: 'center',
    render: (props) => {
      const exposureRoas = (props.data.exposureConversionAmount / props.data.costAmount) * 100
      return <span>{!isNaN(exposureRoas) ? exposureRoas.toFixed(2) : 0}%</span>
    }
  },
  'eCpm': {
    textAlign: 'center',
    render: (props) => {
      const ecpm = (props.data.costAmount / props.data.exposureCount) * 1000
      return <span>{!isNaN(ecpm) ? ecpm.toFixed(2) : 0}</span>
    }
  },
  "exposureCount": {
    textAlign: 'center',
  },
  "countByAdvertise": {
    textAlign: 'center',
  },
  "validClickCount": {
    textAlign: 'center',
  },
  "totalExposureCount": {
    textAlign: 'center',
  },
  "conversionCount": {
    textAlign: 'center',
  },
  "directConversionAmount": {
    textAlign: 'center',
  },
  "sessionConversionAmount": {
    textAlign: 'center',
  },
  "totalClickCount": {
    textAlign: 'center',
  },
  "exposureConversionAmount": {
    textAlign: 'center',
  },
  "costAmount": {
    textAlign: 'center'
  }
}


export default function CustomReports() {
  const [searchCondition, setSearchCondition] = useState({
    pageSize: 31,
    currentPage: 1,
    searchStartDate: getThisMonth().startDay,
    searchEndDate: getToDay(),
    productType: null,
    deviceType: null
  })
  const [dateActive,setDateActive] = useState('thisMonth')
  const [dateRange, setDateRange] = useState([ new Date(getThisMonth().startDay), new Date(getToDay())]);
  const [startDate, endDate] = dateRange;
  const tokenResult = useAtomValue(tokenResultAtom)
  const [campaignColumn, setCampaignColumn] = useState([])
  const [campaignData, setCampaignData] = useState([])
  const [reportSettingInfo, setReportSettingInfo] = useState({})
  const navigate = useNavigate()
  const [reportsInfo, setReportsInfo] = useAtom(reportsInfoAtom)

  useEffect(() => {
    if(reportsInfo.id === null) {
      navigate('/board/reports')
    }
    if(tokenResult.role !== "NORMAL") {
      retrieveCustomReportsAdminDetail(tokenResult.id, reportsInfo.id, searchCondition).then(response => {
        if(response){
          let newObject = response.adminSetting.groupByPeriod !== 'NONE' ? [defaultColumn[reportsInfo.groupBy]].concat(response.headers) : [].concat(response.headers)
          newObject.map((item, key) => {
            Object.assign(newObject[key], defaultColumn[item.name])
            return null
          })
          setCampaignColumn(newObject)
          setCampaignData(response.pagingCommonResponse.rows)
          setReportSettingInfo(response.adminSetting)
        }
      })
    } else {
      retrieveCustomReportsDetail(tokenResult.id, reportsInfo.id, searchCondition).then(response => {
        let newObject =  response.userSetting.groupByPeriod !== 'NONE' ? [defaultColumn[reportsInfo.groupBy]].concat(response.headers) : [].concat(response.headers)
        newObject.map((item, key) => {
          Object.assign(newObject[key], defaultColumn[item.name])
          return null
        })
        setCampaignColumn(newObject)
        setCampaignData(response.pagingCommonResponse.rows)
        setReportSettingInfo(response.userSetting)
      })
    }
    return () => {
      setDateActive('thisMonth')
      setDateRange([ new Date(getThisMonth().startDay), new Date(getToDay())])
      setSearchCondition({
        pageSize: 31,
        currentPage: 1,
        searchStartDate: getThisMonth().startDay,
        searchEndDate: getToDay(),
        productType: null,
        deviceType:  null
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenResult, reportsInfo.id]);


  /**
   * 날짜 직접 변경
   */
  const handleChangeDate = (date) => {
    setDateRange(date)
    setSearchCondition({
      ...searchCondition,
      searchStartDate: moment(date[0]).format('YYYY-MM-DD'),
      searchEndDate: moment(date[1]).format('YYYY-MM-DD'),
    })
  }
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
        searchEndDate: getThisMonth().endDay,
        pageSize: 31
      })
      setDateRange([new Date(getThisMonth().startDay), new Date(getThisMonth().endDay)])
    } else if (rangeType === 'lastMonth') {
      setSearchCondition({
        ...searchCondition,
        searchStartDate: getLastMonth().startDay,
        searchEndDate: getLastMonth().endDay,
        pageSize: 31,
      })
      setDateRange([new Date(getLastMonth().startDay), new Date(getLastMonth().endDay)])
    } else if (rangeType === 'today') {
      setSearchCondition({
        ...searchCondition,
        searchStartDate: getToDay(),
        searchEndDate: getToDay(),
        pageSize: 1
      })
      setDateRange([new Date(), new Date()])
    } else if (rangeType === 'lastDay') {
      setSearchCondition({
        ...searchCondition,
        searchStartDate: getLastDay(),
        searchEndDate: getLastDay(),
        pageSize: 1
      })
      setDateRange([new Date(getLastDay()), new Date(getLastDay())])
    } else if (rangeType === 'lastWeekDay') {
      setSearchCondition({
        ...searchCondition,
        searchStartDate: getLastWeekDay().startDay,
        searchEndDate: getLastWeekDay().endDay,
        pageSize: 7
      })
      setDateRange([new Date(getLastWeekDay().startDay), new Date(getLastWeekDay().endDay)])
    } else if (rangeType === 'lastThirtyDay') {
      setSearchCondition({
        ...searchCondition,
        searchStartDate: getLastThirtyDay().startDay,
        searchEndDate: getLastThirtyDay().endDay,
        pageSize: 30
      })
      setDateRange([new Date(getLastThirtyDay().startDay), new Date(getLastThirtyDay().endDay)])
    } else if (rangeType === 'lastNinetyDay') {
      setSearchCondition({
        ...searchCondition,
        searchStartDate: getLastNinetyDay().startDay,
        searchEndDate: getLastNinetyDay().endDay,
        pageSize: 90
      })
      setDateRange([new Date(getLastNinetyDay().startDay), new Date(getLastNinetyDay().endDay)])
    }
    //call 때려
  }
  /**
   * 광고상품
   * @param event
   */
  const handleChangeProduct = (event) => {
    setSearchCondition({
      ...searchCondition,
      productType: event.value
    })
  }
  /**
   * 디바이스 서치
   * @param event
   */
  const handleChangeDevice = (event) => {
    console.log(event.value)
    setSearchCondition({
      ...searchCondition,
      deviceType: event.value
    })
  }
  /**
   * 검색
   */
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
  /**
   * 보고서 삭제
   * @returns {Promise<void>}
   */
  const deleteReport = async() => {
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
  /**
   * 보고서 삭제 컨펌창
   * @returns {Promise<void>}
   */
  const handleDeleteReport = async () => {
    confirmAlert({
      title: '보고서 삭제',
      message: '삭제 하시겠습니까?',
      buttons: [
        {
          label: '삭제',
          onClick: () => deleteReport()
        },{
          label: '취소',
          onClick: () => null
        }
      ]
    });
  }

  return(
    <Board>
      <BoardHeader>{`${tokenResult.role !== 'NORMAL' ? reportSettingInfo.adverName !== null ? reportSettingInfo.adverName: '어드민' : tokenResult.name} 보고서`}</BoardHeader>
      <BoardSearchDetail>
        <RowSpan box={true} column={true}>
          <RowSpan>
            <ColSpan1 style={{borderBottom: '1px solid #ddd', justifyContent: "space-between"}}>
              <div style={{padding: 10}}>{`${tokenResult.role !== 'NORMAL' ? reportSettingInfo.adverName !== null ? reportSettingInfo.adverName: '어드민' : tokenResult.name}_${reportSettingInfo.reportName}`}</div>
              <DeleteButton style={{padding: 8}} onClick={handleDeleteReport}/>
            </ColSpan1>
          </RowSpan>
          <RowSpan>
            <ColSpan1>
              <ColTitle><Span1>광고 상품</Span1></ColTitle>
              <div>
                <Select styles={selectStyle} defaultValue={productType[0]} options={productType} onChange={handleChangeProduct} value={productType.find(item => item.value === searchCondition.productType)}/>
              </div>
            </ColSpan1>
            <ColSpan1>
              <ColTitle><Span1>디바이스</Span1></ColTitle>
              <div>
                <Select styles={selectStyle} defaultValue={deviceType[0]} options={deviceType} onChange={handleChangeDevice} value={deviceType.find(item => item.value === searchCondition.deviceType)}/>
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
                    onChange={(date) => handleChangeDate(date)}
                    dateFormat="yyyy-MM-dd"
                    maxDate={new Date()}
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