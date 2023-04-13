import {
    Board,
    BoardContainer,
    BoardHeader, BoardSearchDetail,
    BoardTableContainer, CalendarBox, CalendarIcon, CancelButton,
    ColSpan1, ColSpan2, ColSpan3, ColSpan4,
    CustomDatePicker, DateContainer, DefaultButton,
    RowSpan, selectStyle, Span4,
    TitleContainer,
} from "../../assets/GlobalStyles";
import styled from 'styled-components';
import 'react-confirm-alert/src/react-confirm-alert.css';
import React, {useCallback, useEffect, useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import Navigator from "../../components/common/Navigator";
import ko from "date-fns/locale/ko";
import {
    getLastDay,
    getLastMonth, getLastNinetyDay,
    getLastThirtyDay,
    getLastWeekDay,
    getThisMonth,
    getToDay
} from "../../common/DateUtils";
import {decimalFormat} from "../../common/StringUtils";
import Table from "../../components/table";

function PaymentManageUser(props) {
    const [dateActive,setDateActive] = useState('')
    const {searchCondition, setSearchCondition, handleTableData, searchType} = props;
    const [dateRange, setDateRange] = useState([ new Date(getThisMonth().startDay), new Date(getToDay())]);
    const [startDate, endDate] = dateRange;
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
    return (
        <main>
            <BoardContainer>
                <TitleContainer>
                    <h1>결제</h1>
                    <Navigator depth={2}/>
                </TitleContainer>
                <Board>
                    <BoardHeader>결제 정보</BoardHeader>
                    <BoardSearchDetail>
                        <RowSpan box={true} row={true}>
                            <ColSpan2 column={true} style={{borderRight:"1px solid #ddd", padding:"0 20px 0 0", gap:"0"}}>
                                <RowSpan style={{width:"100%", margin:"0 0 15px 0"}}>
                                    <ColSpan2 style={{alignItems:"baseline"}}>광고비 현황</ColSpan2>
                                    <ColSpan2 style={{justifyContent:"right"}}>
                                        <DefaultButton>광고비 충전</DefaultButton>
                                        <DefaultButton style={{background:"#fff", color:"#777"}}>환불신청</DefaultButton>
                                    </ColSpan2>
                                </RowSpan>
                                <RowSpan style={{margin:"0"}}>
                                    <ColSpan4>
                                        <AdvertisingCostStatus>
                                            <span className={'won'}>{decimalFormat(10000000)}</span>
                                        </AdvertisingCostStatus>
                                    </ColSpan4>
                                </RowSpan>
                            </ColSpan2>
                            <ColSpan2 column={true} style={{padding:"0 20px 0 0", gap:"0"}}>
                                <RowSpan style={{width:"100%"}}>
                                    <ColSpan2 style={{alignItems:"baseline"}}>환불 정보</ColSpan2>
                                    <ColSpan2 style={{justifyContent:"right"}}>
                                        <DefaultButton>등록</DefaultButton>
                                    </ColSpan2>
                                </RowSpan>
                                <RowSpan>
                                    <ColSpan4>
                                        <div>등록된 환불 정보가 없습니다. 환불 정보를 등록해주세요.</div>
                                        {/*<BoardTableContainer>*/}
                                        {/*   환불 정보가 있으면 여기 표시 */}
                                        {/*</BoardTableContainer>*/}
                                    </ColSpan4>
                                </RowSpan>
                            </ColSpan2>
                        </RowSpan>
                    </BoardSearchDetail>
                    <div style={{width:'100%', marginTop:'20px', paddingTop:'20px', borderTop:'1px solid #ddd'}}>
                        <div style={{width:'300px'}}>
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
                    </div>
                    <BoardTableContainer>
                        여기도 테이블 자리
                    </BoardTableContainer>
                </Board>
                <ToastContainer position="top-center"
                                autoClose={1500}
                                hideProgressBar
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                style={{zIndex: 9999999}}/>
            </BoardContainer>
        </main>
    )
}

const AdvertisingCostStatus = styled.div`
  height: 33px;
  color: #f5811f;
  padding: 15px;
  font-size: 25px;
  font-weight: bold;
  background: #fff;
  border-radius: 8px;
  border: solid 1px #e5e5e5;
  >span {
    width: 100%;
    text-align: right;
  }
`

export default PaymentManageUser

