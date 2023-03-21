import styled from "styled-components";

import Navigator from "../../components/common/Navigator";
import {
  BoardContainer,
  TitleContainer,
  DashBoardCard,
  DashBoardHeader,
  DashBoardColSpan2,
  RowSpan,
  ChartContainer, DefaultButton
} from "../../assets/GlobalStyles";
import { ResponsivePie } from '@nivo/pie'
import {ResponsiveBar} from "@nivo/bar";
import React, {useEffect, useState} from "react";
import {VerticalRule} from "../../components/common/Common";
import {atom, useAtom, useAtomValue} from "jotai/index";
import { mediaSearchInfo} from "../media_manage/entity";
import {SearchUser} from "../../components/common/SearchUser";
import {lastMonthAtom, proceedPeriodAtom, proceedsAtom, proceedShareAtom, thisMonthAtom} from "./entity";
import {
  dashboardLastMonth, dashboardPeriodStatus,
  dashboardProceeds,
  dashboardProceedShare,
  dashboardThisMonth
} from "../../services/DashboardAxios";
import {selKeywordUser, selUserByUserId} from "../../services/ManageUserAxios";
import {AdminInfo, UserInfo} from "../layout";

const MediaSearchInfo = atom(mediaSearchInfo)

const numberToString = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

const percentage = (x,y) => {
  const result = x ? (((y/x)*100)-100).toFixed(2) : 0
  return result
}

const activeBottomStyle = {borderBottom:'4px solid #f5811f'}
const activeRightStyle = {borderRight:'4px solid #f5811f', color: '#f5811f'}
/** 수익금현황 **/
function ProceedStatus (props) {
  const {userId} = props
  const [proceeds, setProceeds] = useAtom(proceedsAtom)
  useEffect(() => {
    dashboardProceeds(userId).then(response => {
      if(response !== undefined){
        setProceeds(response)
      }
    })
  }, [userId]);

  return(
    <DashBoardCard>
      <DashBoardHeader>수익금 현황</DashBoardHeader>
      <DashBoardBody>
        <ProceedBoard>
          <div>오늘</div>
          <div>
            <div><span>{numberToString(proceeds.todayAmount)} 원</span></div>
            <Rating>{percentage(proceeds.yesterdayAmount, proceeds.todayAmount)}%</Rating>
          </div>
        </ProceedBoard>
        <DailyBoard>
          <div>
            <div>어제</div>
            <Price>{numberToString(proceeds.yesterdayAmount)} 원</Price>
          </div>
          <div>
            <div>지난7일</div>
            <Price>{numberToString(proceeds.last7daysAmount)} 원</Price>
          </div>
          <div>
            <div>이번달</div>
            <Price>{numberToString(proceeds.thisMonthAmount)} 원</Price>
          </div>
        </DailyBoard>
      </DashBoardBody>
    </DashBoardCard>
  )
}
/** 이번달 현황 **/
function MonthStatus (props) {
  const {userId} = props
  const [thisMonth, setThisMonth] = useAtom(thisMonthAtom)
  useEffect(() => {
    dashboardThisMonth(userId).then(response => {
      if(response !== undefined) {
        setThisMonth(response)
      }
    })
  }, [userId]);

  return (
    <DashBoardCard>
      <DashBoardHeader>이번달 현황</DashBoardHeader>
      <DashBoardBodyColSpan>
        <ColoredBox>
          <img src={"/assets/images/dashboard/img_dashboard_04.png"}/>
          <div>요청 수</div>
          <Price>{numberToString(thisMonth.requestCount)} 건</Price>
        </ColoredBox>
        <ColoredBox>
          <img src={"/assets/images/dashboard/img_dashboard_05.png"}/>
          <div>노출 수</div>
          <Price>{numberToString(thisMonth.exposureCount)} 건</Price>
        </ColoredBox>
        <ColoredBox>
          <img src={"/assets/images/dashboard/img_dashboard_06.png"}/>
          <div>클릭 수</div>
          <Price>1{numberToString(thisMonth.clickCount)} 건</Price>
        </ColoredBox>
      </DashBoardBodyColSpan>
    </DashBoardCard>
  )
}
/** 지난 30일 **/
function LastMonth (props) {
  const {userId} = props
  const [lastMonth, setLastMonth] = useAtom(lastMonthAtom)
  useEffect(() => {
    dashboardLastMonth(userId).then(response => {
      if(response !== undefined) {
        setLastMonth(response)
      }
    })
  }, [userId]);
  return (
    <DashBoardCard>
      <DashBoardHeader>지난 30일 현황</DashBoardHeader>
      <DashBoardBody style={{height: '100%'}}>
        <DashBoardWrap>
          <LastThirtyDaysItem>
            <div>
              <img src={'/assets/images/dashboard/icon_dashboard_main01.png'}/>
            </div>
            <div>
              <div>수익금</div>
              <BigPrice>{numberToString(lastMonth.proceedsAmount)} 원</BigPrice>
            </div>
          </LastThirtyDaysItem>
          <LastThirtyDaysItem>
            <div>
              <img src={'/assets/images/dashboard/icon_dashboard_main02.png'}/>
            </div>
            <div>
              <div>요청 수</div>
              <BigPrice>{numberToString(lastMonth.requestCount)} 원</BigPrice>
            </div>
          </LastThirtyDaysItem>
          <LastThirtyDaysItem>
            <div>
              <img src={'/assets/images/dashboard/icon_dashboard_main03.png'}/>
            </div>
            <div>
              <div>노출 수</div>
              <BigPrice>{numberToString(lastMonth.exposureCount)} 원</BigPrice>
            </div>
          </LastThirtyDaysItem>
          <LastThirtyDaysItem>
            <div>
              <img src={'/assets/images/dashboard/icon_dashboard_main04.png'}/>
            </div>
            <div>
              <div>클릭 수</div>
              <BigPrice>{numberToString(lastMonth.clickCount)} 원</BigPrice>
            </div>
          </LastThirtyDaysItem>
        </DashBoardWrap>
      </DashBoardBody>
    </DashBoardCard>
  )
}
/** 수익금 점유율 **/
function ProceedShare (props) {
  const {userId} = props
  const [proceedShare, setProceedShare] = useAtom(proceedShareAtom)
  const [requestType, setRequestType] = useState('PRODUCT')
  useEffect(() => {
    dashboardProceedShare(requestType,userId).then(response => {
      if(response !== undefined) {
        setProceedShare(response)
      }
    })
  },[requestType])

  const handleChangeRequestType = (type) => {
    setRequestType(type)
  }

  return (
    <DashBoardCard>
      <DashBoardHeader>수익금 점유율</DashBoardHeader>
      <DashBoardBody>
        <PieChartContainer>
          <PieChartTap>
            <div onClick={() => handleChangeRequestType('PRODUCT')} style={requestType==='PRODUCT' ? activeRightStyle : null}>광고상품</div>
            <div onClick={() => handleChangeRequestType('DEVICE')} style={requestType==='DEVICE' ? activeRightStyle : null}>디바이스</div>
          </PieChartTap>
          <PieChart>
            <MyResponsivePie data={proceedShare}/>
          </PieChart>
        </PieChartContainer>
      </DashBoardBody>
    </DashBoardCard>
  )
}
/** 일자별 차트 **/
function MyResponsiveBar(props) {
  const {data} = props
  return (
    <ResponsiveBar
      data={data.length > 31 ? data.slice(-32,-1) : data}
      keys={["count"]}
      indexBy={"date"}
      margin={{top: 40, right: 40, bottom: 130, left: 40}}
      padding={0.75}
      valueScale={{type: 'linear'}}
      indexScale={{type: 'band', round: true}}
      colors={["#f5811f"]}
      axisLeft={false}
      axisBottom={{
        tickSize: 0,
        tickPadding: 15,
        tickRotation: -45,
        legendOffset: 32,
      }}
      enableLabel={false}
      enableGridY={false}
    />
  )
}
/** 수익금 점유율 차트 **/
function MyResponsivePie(props){
  const {data} = props
  const pieData = data.map(({selectedTypeName,shareByPer}) => ({
    id: selectedTypeName,
    value: shareByPer/100,
  }))
  return(
    <PieChartCentered>
      <CenteredInfo>
        <div>total</div>
      </CenteredInfo>
      <ResponsivePie
        data={pieData}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        innerRadius={0.5}
        colors={["#fff8e8","#ffd1af", "#f5811f"]}
        enableRadialLabels={false}
        enableSlicesLabels={false}
        isInteractive={false}
        enableArcLinkLabels={false}
        valueFormat={'.0%'}
        legends={[{
          anchor: 'right',
          direction: 'column',
          justify: false,
          translateX: 0,
          translateY: 0,
          itemsSpacing: 0,
          itemWidth: 50,
          itemHeight: 30,
          itemTextColor: '#999',
          itemDirection: 'left-to-right',
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: 'circle',
        }]}
      />
    </PieChartCentered>
  )
}
/** 대시보드 **/
export default function DashBoard(){
  const [proceedPeriod, setProceedPeriod] = useAtom(proceedPeriodAtom)
  const [dataType, setDataType] = useState('PROCEEDS')
  const [mediaSearchInfo, setMediaSearchInfo] = useAtom(MediaSearchInfo)
  const [userId, setUserId] = useState('')
  const [adminInfoState, setAdminInfoState] = useAtom(AdminInfo)
  const userInfoState = useAtomValue(UserInfo)

  useEffect(() => {
    if(localStorage.getItem('role') === 'NORMAL' && localStorage.getItem('username')){
      selUserByUserId(localStorage.getItem('id')).then(response => {
        setUserId(userInfoState?.name)
      })
    } else {
      if(localStorage.getItem('username')) {
        selUserByUserId(localStorage.getItem('username')).then(response => {
          setUserId(response?.id)
        })
      } else{
        setUserId('')
      }
    }
    dashboardPeriodStatus(dataType,userId).then(response => {
      if(response !== undefined) {
        setProceedPeriod(response)
      }
    })
  }, [dataType,adminInfoState]);

  const handleChangeChartKey = (type) => {
    setDataType(type)
  }
  /**
   * 모달안에 매체 검색 선택시
   */
  const handleSearchResult = (keyword) => {
    //매체 검색 api 호출
    setMediaSearchInfo(mediaSearchInfo)
    if(keyword.id !== undefined) {
      //userId 로 다시 조회 대시보드
      localStorage.setItem('username',keyword.username)
      setUserId(keyword.id)
      setAdminInfoState({
        ...adminInfoState,
        convertedUser: keyword.username
      })
    }
  }

  return(
    <main>
      <BoardContainer>
        <RowSpan style={{alignItems:'center', marginTop: 0}}>
          <TitleContainer>
            <h1>대시보드</h1>
            <Navigator depth={2}/>
          </TitleContainer>
          {localStorage.getItem('role') !== 'NORMAL' &&
            <div>
              <SearchUser title={'매체 계정 전환'} onSubmit={handleSearchResult} btnStyl={'SwitchUserButton'} />
            </div>
          }
        </RowSpan>
        <RowSpan style={{gap:30, marginTop:0}}>
          <DashBoardColSpan2>
            <ProceedStatus userId={userId}/>
          </DashBoardColSpan2>
          <DashBoardColSpan2>
            <MonthStatus userId={userId}/>
          </DashBoardColSpan2>
        </RowSpan>
        <RowSpan style={{gap:30, marginTop:0}}>
          <DashBoardColSpan2>
            <LastMonth userId={userId}/>
          </DashBoardColSpan2>
          <DashBoardColSpan2>
            <ProceedShare userId={userId}/>
          </DashBoardColSpan2>
        </RowSpan>
        <DashBoardCard>
          <DashBoardHeader>일자별 주요 현황</DashBoardHeader>
          <DashBoardBody>
            <ChartContainer style={{height:250}}>
              <ChartLabel>
                <div onClick={() => handleChangeChartKey('PROCEEDS')} style={dataType==='PROCEEDS' ? activeBottomStyle : null}>수익금</div>
                <div onClick={() => handleChangeChartKey('REQUEST_COUNT')} style={dataType==='REQUEST_COUNT' ? activeBottomStyle : null}>요청수</div>
                <div onClick={() => handleChangeChartKey('EXPOSURE_COUNT')} style={dataType==='EXPOSURE_COUNT' ? activeBottomStyle : null}>노출수</div>
                <div onClick={() => handleChangeChartKey('CLICK_COUNT')} style={dataType==='CLICK_COUNT' ? activeBottomStyle : null}>클릭수</div>
              </ChartLabel>
              <VerticalRule style={{backgroundColor:'#e5e5e5'}}/>
              <MyResponsiveBar data={proceedPeriod}/>
            </ChartContainer>
          </DashBoardBody>
        </DashBoardCard>
      </BoardContainer>
    </main>
  )
}

const DashBoardBody = styled.div`
  display: block;
`

const ProceedBoard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  border-radius: 10px;
  height: 55px;
  background-image: linear-gradient(to left, #f25108, #fa9714);
  color: #fff;
  & div {
    display: flex;
    align-items: center;
    & > span {
      font-size: 25px;
      font-weight: 800;
    }
  }
`

const Rating = styled.div`
  height: 30px;
  margin: 9px 0 5px 20px;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: rgba(256,256,256,0.21);
  &:before {
    content:"";
    display: inline-block;
    width: 13px;
    height: 9px;
    background-image: url("/assets/images/common/icon_dropup.png");
    background-repeat: no-repeat;
    background-position: center;
  }
`

const DailyBoard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 25px;
  & > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-left: 5px solid #ffd1af;
    padding: 0 15px;
    width: 100%;
  }
`

const Price = styled.div`
  font-size: 15px;
  font-weight: 700;
`

const BigPrice = styled.div`
  font-size: 20px;
  font-weight: 700;
`

const DashBoardBodyColSpan = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  & > div:nth-child(1) {
    background-color: #fecfcf;
  }
  & > div:nth-child(2) {
    background-color: #fee3cf;
  }
  & > div:nth-child(3) {
    background-color: #fef1cf;
  }
  & > div img {
    width: 45px
  }
`

const ColoredBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 20px;
  border-radius: 10px;
`

const PieChartContainer = styled.div`
  display: flex;
  height: 230px;
  border: 1px solid #e9ebee;
  border-radius: 10px;
`

const PieChartTap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 15px 0;
  width: 20%;
  border-right: 1px solid #e9ebee;
  & > div {
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 10px;
    cursor: pointer;
    border-right: 4px solid #fff;
  }
`

const PieChart = styled.div`
  width: 80%;
`

const DashBoardWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  height: calc(100% - 40px);
  & > div {
    width: 50%;
  }
`

const LastThirtyDaysItem = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid #e9ebee;
  border-bottom: 1px solid #e9ebee;
  & > div:first-child {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 64px;
    height: 64px;
    border-radius: 20px;
    background-color: #ffefe2;
  }
  & > div:last-child {
    padding-left: 15px;
  }
  &:nth-child(n+3) {
    border-top: 0;
  }
`
const ChartLabel = styled.div`
  display: flex;
  gap: 30px;
  padding: 0 40px;
  & div {
    display: flex;
    align-items: center;
    height: 45px;
    cursor: pointer;
    border-bottom: 4px solid #fff
  }
`

const PieChartCentered = styled.div`
  position: relative;
  width: 100%;
  height: 230px;
`

const CenteredInfo = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  & div {
    text-align: center;
    font-size: 12px;
  }
`