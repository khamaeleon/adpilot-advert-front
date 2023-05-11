import {
  ChartContainer,
  ChartLabel,
  ChartLabels,
  ChartTooltip,
  DashBoardBody,
  DashBoardCard,
  DashBoardHeader,
  defaultStyle
} from "../../assets/GlobalStyles";
import {ResponsiveLine} from '@nivo/line'
import React, {useCallback, useEffect, useState} from "react";
import {useAtom} from "jotai";
import {dataTotalInfo} from "../../components/common/entity";
import {chartDataAtom, commonProperties, platformStatusType, userPlatformStatusType} from "./entity/Chart";
import {adverListColumn, adverStatusAtom, adverStatusDetailColumn, userCampaignListColumn,} from "./entity/Campaign";
import {eventType, productType, searchConditionAtom} from "./entity/Common";
import {retrieveAdverOverview, retrieveOverview,} from "../../services/dash_board/ChartAxios";
import {tokenResultAtom} from "../login/entity/Common";
import TableDetail from "../../components/table/TableDetail";
import {
  retrieveAdvertiserCampaignStatus,
  retrieveAdvertiserStatus, retrieveUserAdvertiserCampaignStatus
} from "../../services/dash_board/ManageCampaignAxios";
import {decimalFormat, moneyToFixedFormat, numberToFixedFormat} from "../../common/StringUtils";
import Select from "react-select";
import {DashBoardCondition} from "../../components/dashBoard/Condition";
import {getThisMonth} from "../../common/DateUtils";
import Table from "../../components/table";

/** 플래폼 현황 차트 **/
function ChartComponent(props) {
  const [tokenUserInfo] = useAtom(tokenResultAtom)
  const [chartData, setChartData] = useAtom(chartDataAtom);
  const {searchCondition} = props
  const [dataType, setDataType] = useState('cpc')
  const [dataType2, setDataType2] = useState('costAmount')
  const [chartDataInfo, setChartDataInfo] = useState([])
  const [chartList, setChartList] = useState([{id: 'validClickCount', data:[]}])

  useEffect(()=>{
    if(tokenUserInfo.role !== 'NORMAL') {
      retrieveOverview(searchCondition).then(response => {
        let data = response
        if(response !== null) {
          data.map((item,key) => {
            Object.assign(data[key],{clickRate: item.validClickCount !== 0 ? (item.validClickCount / item.exposureCount) *100 : 0})
            Object.assign(data[key],{cpc:item.validClickCount !== 0 ? item?.costAmount / item.validClickCount : 0})
            Object.assign(data[key],{costPerConversion: item.costAmount !== 0 ? item?.costAmount / item.totalConversionCount : 0})
            Object.assign(data[key],{avgConversionAmount: item.totalConversionCount !== 0 ? item.totalConversionAmount / item.totalConversionCount : 0})
            Object.assign(data[key],{sessionRoas: item.costAmount !== 0 ? (item.sessionConversionAmount / item.costAmount) *100 : 0})
            Object.assign(data[key],{directRoas: item.costAmount !== 0 ? (item.directConversionAmount / item.costAmount) *100 : 0})
            Object.assign(data[key],{exposureRoas: item.costAmount !== 0 ? (item.exposureConversionAmount / item.costAmount) *100 : 0})
            Object.assign(data[key],{totalRoas: item.costAmount !== 0 ? (item.totalConversionAmount / item.costAmount) *100 : 0})
            Object.assign(data[key],{ecpm: item.exposureCount !== 0 ? (item?.costAmount / item.exposureCount) *1000 : 0},)
            Object.assign(data[key],{conversionRate: item.totalConversionCount !== 0 ? (item.totalConversionCount / item.validClickCount) *100 : 0})
          })
          setChartDataInfo(data)
        }
      })
    } else {
      retrieveAdverOverview(tokenUserInfo.id, searchCondition).then(response => {
        let data = response
        if(response !== null) {
          data.map((item,key) => {
            Object.assign(data[key],{clickRate: item.validClickCount !== 0 ? (item.validClickCount / item.exposureCount) *100 : 0})
            Object.assign(data[key],{cpc:item.validClickCount !== 0 ? item?.costAmount / item.validClickCount : 0})
            Object.assign(data[key],{costPerConversion: item.totalConversionCount !== 0 ? item?.costAmount / item.totalConversionCount : 0})
            Object.assign(data[key],{avgConversionAmount: item.totalConversionAmount !== 0 ? item.totalConversionAmount / item.totalConversionCount : 0})
            Object.assign(data[key],{totalRoas: item.totalConversionAmount !== 0 ? (item.totalConversionAmount / item.costAmount) *100 : 0})
            Object.assign(data[key],{ecpm: item.exposureCount !== 0 ? (item?.costAmount / item.exposureCount) *1000 : 0},)
            Object.assign(data[key],{conversionRate: item.totalConversionCount !== 0 ? (item.totalConversionCount / item.validClickCount) *100 : 0})
          })
          setChartDataInfo(data)
        }
      })
    }
  },[searchCondition])

  useEffect(() => {
    makeChartData()
  }, [chartData,chartDataInfo]);

  function calculateSum(property) {
    function calculatePropertySum(property) { // 전체 값은 따로 계산식 함수로 값 정리
      return chartDataInfo.reduce((prev, next) => prev + next[property], 0);
    }

    //[d] 개별 계산값 정리
    const clickCountSum = calculatePropertySum('validClickCount');
    const exposureCountSum = calculatePropertySum('exposureCount');
    const costAmountSum = calculatePropertySum('costAmount');
    const totalConversionCountSum = calculatePropertySum('totalConversionCount');
    const totalConversionAmountSum = calculatePropertySum('totalConversionAmount');
    // const sessionConversionAmountSum = calculatePropertySum('sessionConversionAmount');
    // const directConversionAmountSum = calculatePropertySum('directConversionAmount');
    // const exposureConversionAmountSum = calculatePropertySum('exposureConversionAmount');

    //[d] 개별 계산값을 포함한 개별 공식 계싼값 switch 문으로 구성
    let calc = 0;
    switch (property) {
      case 'validClickCount':
      case 'exposureCount':
      case 'totalConversionCount':
      case 'userCount':
      case 'totalExposureCount':
      case 'totalClickCount':
      case 'costAmount':
      case 'sessionRoas':
      case 'directRoas':
      case 'exposureRoas':
      case 'totalRoas':
        calc = chartDataInfo.reduce((prev, next) => prev + next[property], 0);
        break;
      case 'clickRate':
        const caseValueA = exposureCountSum;
        calc = caseValueA !== 0 ? (clickCountSum / exposureCountSum) * 100 : 0;
        break;
      case 'cpc':
        const caseValueB = costAmountSum;
        calc = caseValueB !== 0 ? clickCountSum / caseValueB : 0;
        break;
      case 'conversionRate':
        const caseValueC = clickCountSum;
        calc = caseValueC !== 0 ? (totalConversionCountSum / clickCountSum) * 100 : 0;
        break;
      case 'costPerConversion':
        const caseValueD = totalConversionCountSum;
        calc = caseValueD !== 0 ? costAmountSum / totalConversionCountSum : 0;
        break;
      case 'avgConversionAmount':
        const caseValueE = costAmountSum;
        calc = caseValueE !== 0 ? totalConversionAmountSum / costAmountSum : 0;
        break;
      // case 'sessionRoas':
      //   const caseValueF = costAmountSum;
      //   calc = caseValueF !== 0 ? (sessionConversionAmountSum / costAmountSum) * 100 : 0;
      //   break;
      // case 'directRoas':
      //   const caseValueG = costAmountSum;
      //   calc = caseValueG !== 0 ? (directConversionAmountSum / costAmountSum) * 100 : 0;
      //   break;
      // case 'exposureRoas':
      //   const caseValueH = costAmountSum;
      //   calc = caseValueH !== 0 ? (exposureConversionAmountSum / costAmountSum) * 100 : 0;
      //   break;
      // case 'totalRoas':
      //   const caseValueI = costAmountSum;
      //   calc = caseValueI !== 0 ? (totalConversionAmountSum / costAmountSum) * 100 : 0;
      //   break;
      case 'ecpm':
        const caseValueJ = exposureCountSum;
        calc = caseValueJ !== 0 ? (costAmountSum / exposureCountSum) * 1000 : 0;
        break;
      default:
        break;
    }

    let value;
    if (['clickRate','conversionRate'].includes(property)) {
      value = numberToFixedFormat(calc)+'%'
    } else if(['validClickCount','exposureCount','totalConversionCount','userCount','totalExposureCount','totalClickCount'].includes(property)) {
      value = decimalFormat(calc)
    } else {
      value = moneyToFixedFormat(calc)+'원'
    }
    return value
  }

  const handleOnChangeChartStatus = (statusId) => {
    setChartData({
      ...chartData,
      [statusId]: {
        ...chartData[statusId],
        status: !chartData[statusId].status
      }
    })
  }

  //[d] dataType, dataType2 값에 따라 3개 고정값 status 및 서로 선택한 기본 상태는 유지
  const handleChangeDataType = (e) => {
    setChartData((prevChartData) => {
      const newData = {};
      Object.keys(prevChartData).forEach((key) => {
        newData[key] = {
          ...prevChartData[key],
          status:
              key === e.value || (['validClickCount', 'exposureCount', 'totalConversionCount'].includes(key) &&
                  prevChartData[key].status) || (prevChartData[key].status && key === dataType2),
        };
      });
      return newData;
    });
    setDataType(e.value);
  };

  const handleChangeDataType2 = (e) => {
    setChartData((prevChartData) => {
      const newData = {};
      Object.keys(prevChartData).forEach((key) => {
        newData[key] = {
          ...prevChartData[key],
          status:
              key === e.value || (['validClickCount', 'exposureCount', 'totalConversionCount'].includes(key) &&
                  prevChartData[key].status) || (prevChartData[key].status && key === dataType),
        };
      });
      return newData;
    });
    setDataType2(e.value);
  };

  //[d] chartData 객체에 담았던 컬러 값 필요없이 고정 컬러값 5개로 재구성 기획자 요청 색상!!
  const fixedColors = ['#1A73E8', '#D93025', '#F9AB00', '#1E8E3E', '#7325D9'];
  const makeChartData = () => {
    let list = [];
    Object.entries(chartData).map(([id,key], index) => {
      if(chartData[id].status){
        let colorIndex;
        //[d] 3개 고정값 외 셀렉트 박스로 선택하는 값은 id === dataType 매칭으로 고정색상 사용
        if (id === dataType) {
          colorIndex = 3;
        } else if (id === dataType2) {
          colorIndex = 4;
        } else {
          colorIndex = index % fixedColors.length;
        }
        list.push({
          id: id,
          data: chartDataInfo.map(item => {
            const date = new Date(item.historyDate);
            const formattedDate = date.toLocaleDateString("en-US", {
              month: "2-digit",
              day: "2-digit",
            });
            return {x: formattedDate, y: item[id] === NaN ? 0 : item[id]}
          }),
          color: fixedColors[colorIndex]
        })
      }
    })
    setChartList(list)
  }


  const yFormatted = (data) => {
    let value;
    if (['clickRate','conversionRate'].includes(data.serieId)) {
      value = numberToFixedFormat(data.data.y)+'%'
    } else if(['validClickCount','exposureCount','totalConversionCount','userCount','totalExposureCount','totalClickCount'].includes(data.serieId)) {
      value = decimalFormat(data.data.y)
    } else {
      value = moneyToFixedFormat(data.data.y)+'원'
    }
    return value
  }
  //[d] 고정 3개값 별도 컴포넌트로 재구성
  const ChartLabelFixData = ({ label, active, onClick, dataType, color, calculateSum, decimalFormat }) => (
      <ChartLabel
          active={active}
          onClick={onClick}
      >
        <p>{label}</p>
        <span style={{ background: `${active ? color : 'transparent'}`, color: active ? '#fff' : null }}>
          {decimalFormat(calculateSum(dataType))}
        </span>
      </ChartLabel>
  );

  return (
      <ChartContainer>
        <ChartLabels>
          <ChartLabelFixData
              label="클릭수"
              active={chartData['validClickCount'].status}
              onClick={() => handleOnChangeChartStatus('validClickCount')}
              dataType="validClickCount"
              color={fixedColors[0]}
              calculateSum={calculateSum}
              decimalFormat={decimalFormat}
          />
          <ChartLabelFixData
              label="노출수"
              active={chartData['exposureCount'].status}
              onClick={() => handleOnChangeChartStatus('exposureCount')}
              dataType="exposureCount"
              color={fixedColors[1]}
              calculateSum={calculateSum}
              decimalFormat={decimalFormat}
          />
          <ChartLabelFixData
              label="전환수"
              active={chartData['totalConversionCount'].status}
              onClick={() => handleOnChangeChartStatus('totalConversionCount')}
              dataType="totalConversionCount"
              color={fixedColors[2]}
              calculateSum={calculateSum}
              decimalFormat={decimalFormat}
          />
          <ChartLabel active={chartData[dataType].status}>
            <Select styles={defaultStyle}
                    isDisabled={!chartData[dataType].status}
                    components={{IndicatorSeparator: () => null}}
                    options={tokenUserInfo.role !== 'NORMAL' ? platformStatusType : userPlatformStatusType}
                    value={platformStatusType.filter(options => options.value === dataType)}
                    isOptionDisabled={option => option.value === dataType2}
                    onChange={handleChangeDataType}
            />
            <span
                onClick={() => handleOnChangeChartStatus(dataType)}
                style={{background:`${chartData[dataType].status === true?fixedColors[3]:'transparent'}`,
                        color:chartData[dataType].status === true?'#fff':null}}>{calculateSum(dataType)}
            </span>
          </ChartLabel>
          <ChartLabel active={chartData[dataType2].status} >
            <Select styles={defaultStyle}
                    isDisabled={!chartData[dataType2].status}
                    components={{IndicatorSeparator: () => null}}
                    options={tokenUserInfo.role !== 'NORMAL' ? platformStatusType : userPlatformStatusType}
                    value={platformStatusType.filter(options => options.value === dataType2)}
                    isOptionDisabled={option => option.value === dataType}
                    onChange={handleChangeDataType2}
            />
            <span
                onClick={() => handleOnChangeChartStatus(dataType2)}
                style={{background:`${chartData[dataType2].status === true?fixedColors[4]:'transparent'}`,
                        color:chartData[dataType2].status === true?'#fff':null}}>{calculateSum(dataType2)}
            </span>
          </ChartLabel>
        </ChartLabels>
        <div style={{height: 300}}>
          <ResponsiveLine
              {...commonProperties}
              data={chartList}
              colors={(series) => series.color}
              axisLeft={null}
              sliceTooltip={(props) => {
                return (
                    <ChartTooltip>
                      {props.slice.points?.map((data, key) => {
                        return (
                            <p key={key}>
                              <span style={{color: data.serieColor}}>{chartData[data.serieId].label} : </span><span>{yFormatted(data)}</span>
                            </p>
                        )
                      })}
                    </ChartTooltip>
                )
              }}
          />
        </div>
      </ChartContainer>
  )
}

/** 대시보드 **/
function DashBoardIndex() {
  const [tokenUserInfo] = useAtom(tokenResultAtom)
  const [totalInfo, setTotalInfo] = useState(dataTotalInfo)
  const [adverStatusData, setAdverStatusData] = useAtom(adverStatusAtom)
  const [searchCondition, setSearchCondition] = useState(searchConditionAtom)
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    if(tokenUserInfo.role !== 'NORMAL') {
      //광고주 현황 조회
      retrieveAdvertiserStatus(searchCondition).then(response => {
        console.log(searchCondition)
        if(response !== null) {
          setAdverStatusData(response)
          setTotalInfo({
            totalCount: response.length
          })
        } else {
          setAdverStatusData([])
        }
      })
    } else {
      retrieveUserAdvertiserCampaignStatus(tokenUserInfo.id, searchCondition).then(response => {
        if(response !== null) {
          setAdverStatusData(response)
          setTotalInfo({
            totalCount: response?.length
          })
        } else {
          setAdverStatusData([])
        }
      })
    }
  }, [searchCondition])

  /**
   * 검색 버튼
   */
  const handleData = () => {
    setSearchCondition({
      ...searchCondition,
      keyword: keyword
    })
  }

  const handleFetchDetailData = useCallback(async ({userId}) => {
    let adverStatusTempDetail = await retrieveAdvertiserCampaignStatus(userId, searchCondition)
    adverStatusTempDetail = adverStatusTempDetail?.map(item =>{
      return {...item,userId:userId}
    })
    return adverStatusTempDetail
  },[])

  return (
      <>
        <DashBoardCard>
          <DashBoardCondition role={tokenUserInfo.role} productType={productType} eventType={eventType} searchCondition={searchCondition} setSearchCondition={setSearchCondition} handleData={handleData} keyword={keyword} setKeyword={setKeyword}/>
        </DashBoardCard>
        <DashBoardCard>
          <DashBoardHeader>{tokenUserInfo.role !== 'NORMAL' ? '플랫폼' : '광고'} 현황</DashBoardHeader>
          <DashBoardBody>
            <ChartComponent searchCondition={searchCondition} />
          </DashBoardBody>
          <DashBoardHeader style={{marginTop: 30}}>{tokenUserInfo.role !== 'NORMAL' ? '광고주' : '캠페인'} 현황</DashBoardHeader>
          <DashBoardBody>
            {tokenUserInfo.role !== 'NORMAL' ?
              <TableDetail columns={adverListColumn}
                           totalCount={[totalInfo.totalCount, '광고주']}
                           showHoverRows={false}
                           activeCell={[0]}
                           data={adverStatusData}
                           detailData={handleFetchDetailData}
                           detailColumn={adverStatusDetailColumn}
                           detailGroups={false}
                           idProperty={'userId'}
                           groups={false}/>
              : <Table columns={userCampaignListColumn}
                       totalCount={[totalInfo.totalCount, '캠페인']}
                       rowHeight={null}
                       showHoverRows={false}
                       activeCell={[0]}
                       data={adverStatusData}/>
            }
          </DashBoardBody>
        </DashBoardCard>
      </>
  )
}
export default DashBoardIndex
