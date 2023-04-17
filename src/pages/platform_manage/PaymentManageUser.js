import {
    Board,
    BoardContainer,
    BoardHeader, BoardSearchDetail, BoardSearchResultTitle,
    CalendarBox, CalendarIcon,
    ColSpan2, ColSpan4,
    CustomDatePicker, DateContainer, DefaultButton,
    RowSpan, SaveExcelButton,
    TitleContainer,
} from "../../assets/GlobalStyles";
import styled from 'styled-components';
import 'react-confirm-alert/src/react-confirm-alert.css';
import React, {useCallback, useEffect, useState} from "react";
import Navigator from "../../components/common/Navigator";
import ko from "date-fns/locale/ko";
import { AdChargeButton } from "../../components/payment/user/AdCharge";
import { RefundRequestButton } from "../../components/payment/user/RefundRequest";
import { RegisterRefundInformationButton } from "../../components/payment/user/RegisterRefundInformation";
import { EditRefundInformationButton } from "../../components/payment/user/EditRefundInformation";
import {
    getThisMonth,
    getToDay
} from "../../common/DateUtils";
import {decimalFormat} from "../../common/StringUtils";
import {TotalCount} from "../../components/table/TableDetail";
import {toast, ToastContainer} from "react-toastify";

export function RefundRequestTable(props) {
    return (
        <RefundInformation>
            <table style={{margin:"0"}}>
                <thead>
                <tr>
                    <th>은행</th>
                    <th>계좌번호</th>
                    <th>예금주</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    {props.refundData.map((item, key) => {
                        return(
                            <td
                                key={key}
                            >
                                {item}
                            </td>
                        )
                    })}
                </tr>
                </tbody>
            </table>
        </RefundInformation>
    )
}

function PaymentManageUser(props) {
    const [dateRange, setDateRange] = useState([ new Date(getThisMonth().startDay), new Date(getToDay())]);
    const [startDate, endDate] = dateRange;

    const [advertisingBalance, setAdvertisingBalance] = useState(10000) // 광고비 잔액
    const [requestAmountValue, setRequestAmountValue] = useState(0) // 충전 금액

    //[d] 환불 입력 정보
    // const [refundData, setRefundData] = useState([])
    const [refundData, setRefundData] = useState(["테스트1","테스트2","테스트3"]) // 환불 정보
    const [paymentDetails, setPaymentDetails] = useState([ // 환불 내역
            ["yyyy.mm.dd hh.mm","결제 완료","카드 결제","bc12345",550000],
            ["yyyy.mm.dd hh.mm","결제 취소","카드 결제","bc12345",550000],
            ["yyyy.mm.dd hh.mm","환불 완료","카드 결제","bc12345",550000],
            ["yyyy.mm.dd hh.mm","환불 신청","카드 결제","bc12345",550000],
            ["yyyy.mm.dd hh.mm","결제 완료","카드 결제","bc12345",550000],
            ["yyyy.mm.dd hh.mm","결제 취소","카드 결제","bc12345",550000],
            ["yyyy.mm.dd hh.mm","환불 완료","카드 결제","bc12345",550000],
            ["yyyy.mm.dd hh.mm","환불 신청","카드 결제","bc12345",550000],
            ["yyyy.mm.dd hh.mm","결제 완료","카드 결제","bc12345",550000],
            ["yyyy.mm.dd hh.mm","결제 취소","카드 결제","bc12345",550000],
            ["yyyy.mm.dd hh.mm","환불 완료","카드 결제","bc12345",550000],
            ["yyyy.mm.dd hh.mm","환불 신청","카드 결제","bc12345",550000],
            ["yyyy.mm.dd hh.mm","환불 신청","카드 결제","bc12345",550000],
            ["yyyy.mm.dd hh.mm","결제 완료","카드 결제","bc12345",550000],
            ["yyyy.mm.dd hh.mm","결제 취소","카드 결제","bc12345",550000],
            ["yyyy.mm.dd hh.mm","환불 완료","카드 결제","bc12345",550000],
            ["yyyy.mm.dd hh.mm","환불 신청","카드 결제","bc12345",550000],
            ["yyyy.mm.dd hh.mm","환불 신청","카드 결제","bc12345",550000],
            ["yyyy.mm.dd hh.mm","결제 완료","카드 결제","bc12345",550000],
            ["yyyy.mm.dd hh.mm","결제 취소","카드 결제","bc12345",550000],
            ["yyyy.mm.dd hh.mm","환불 완료","카드 결제","bc12345",550000],
            ["yyyy.mm.dd hh.mm","환불 신청","카드 결제","bc12345",550000],
            ["yyyy.mm.dd hh.mm","환불 신청","카드 결제","bc12345",550000],
            ["yyyy.mm.dd hh.mm","결제 완료","카드 결제","bc12345",550000],
            ["yyyy.mm.dd hh.mm","결제 취소","카드 결제","bc12345",550000],
            ["yyyy.mm.dd hh.mm","환불 완료","카드 결제","bc12345",550000],
            ["yyyy.mm.dd hh.mm","환불 신청","카드 결제","bc12345",550000],
        ]
    )


    const handleRegisterRefund = () => {
        if(refundData.length === 0){
            toast("환불 정보를 등록해 주세요.")
        } else {
            console.log("환불 정보", refundData)
        }
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
                                <RowSpan style={{width:"100%", margin:"0 0 30px 0"}}>
                                    <ColSpan2 style={{alignItems:"baseline"}}>광고비 현황</ColSpan2>
                                    <ColSpan2 style={{justifyContent:"right"}}>
                                        <AdChargeButton
                                            title={'광고비 충전'}
                                            modalInfo={'USER'}
                                            onSave={null}
                                            onSubmit={null}
                                            requestAmountValue={requestAmountValue}
                                            setRequestAmountValue={setRequestAmountValue}
                                        />
                                        {refundData.length === 0?
                                            <DefaultButton onClick={handleRegisterRefund} style={{background:"#fff", color:"#777"}}>환불 신청</DefaultButton>
                                            :
                                            <RefundRequestButton title={'환불 신청'} modalInfo={'USER'} onSave={null} onSubmit={null} refundData={refundData}/>
                                        }
                                        {/*환불 신청에 값이 없으면 토스트 띄우기*/}
                                    </ColSpan2>
                                </RowSpan>
                                <RowSpan style={{margin:"0"}}>
                                    <ColSpan4>
                                        <AdvertisingCostStatus>
                                            <span className={'won'}>{decimalFormat(advertisingBalance + requestAmountValue)}</span>
                                            {/*여긴 광고비 잔액이 들어와야 함*/}
                                        </AdvertisingCostStatus>
                                    </ColSpan4>
                                </RowSpan>
                            </ColSpan2>
                            <ColSpan2 column={true} style={{padding:"0", gap:"0"}}>
                                <RowSpan style={{width:"100%", margin:"0"}}>
                                    <ColSpan2 style={{alignItems:"baseline", marginBottom:"15px"}}>환불 정보</ColSpan2>
                                    {refundData.length === 0?
                                        <ColSpan2 style={{justifyContent:"right"}}>
                                            <RegisterRefundInformationButton title={'등록'} modalInfo={'USER'} onSave={null} onSubmit={null} refundData={refundData} setRefundData={setRefundData}/>
                                        </ColSpan2>
                                        :
                                        <ColSpan2 style={{justifyContent:"right", width:"70px", height:"15px"}}>
                                            <EditRefundInformationButton title={''} modalInfo={'USER'} onSave={null} onSubmit={null}/>
                                        </ColSpan2>
                                    }
                                </RowSpan>
                                <RowSpan>
                                    <ColSpan4>
                                        {refundData.length === 0?
                                            <AdvertisingCostStatus style={{marginTop: "15px"}}>
                                                <small>등록된 환불 정보가 없습니다. 환불 정보를 등록해주세요.</small>
                                            </AdvertisingCostStatus>
                                            :
                                            <RefundRequestTable refundData={refundData}/>
                                        }
                                    </ColSpan4>
                                </RowSpan>
                            </ColSpan2>
                        </RowSpan>
                    </BoardSearchDetail>
                    <div style={{
                        width:'100%',
                        marginTop:'20px',
                        paddingTop:'20px',
                        borderTop:'1px solid #ddd'
                    }}>
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
                    <ColSpan4>
                        <BoardSearchResultTitle style={{alignItems:"end",}}>
                            <div>
                                {paymentDetails &&
                                    <TotalCount><span style={{marginRight: "10px"}}/>총 <span>{paymentDetails.length}</span> 건의 결제 내역</TotalCount>}
                            </div>
                            <div>
                                <SaveExcelButton>엑셀 저장</SaveExcelButton>
                            </div>
                        </BoardSearchResultTitle>
                    </ColSpan4>
                    <ColSpan4>
                        <RefundInformation multiTable={true} style={{maxHeight:"500px", overflow:"auto", alignItems:"start"}}>
                            <table>
                                <thead>
                                <tr>
                                    <th>신청 일시</th>
                                    <th>신청 상태</th>
                                    <th>결제/신청 방식</th>
                                    <th>결제/신청 수단</th>
                                    <th>결제/신청 금액</th>
                                </tr>
                                </thead>
                                <tbody>
                                {paymentDetails.map((item, key) => {
                                    return(
                                    <tr key={key}>
                                        {item.map((data, key) => {
                                            return(
                                                <td key={key}>{data}</td>
                                            )
                                        })}
                                    </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </RefundInformation>
                    </ColSpan4>
                </Board>
            </BoardContainer>
            <ToastContainer
                position="top-center"
                autoClose={1500}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                style={{zIndex: 9999999}}
            />
        </main>
    )
}
/**스타일 시트**/
const AdvertisingCostStatus = styled.div`
  height: 63px;
  padding: 15px;
  font-weight: bold;
  background: #fff;
  border-radius: 8px;
  border: solid 1px #e5e5e5;
  >span {
    width: 100%;
    font-size: 25px;
    color: #f5811f;
    text-align: right;
  }
  >small {
    width: 100%;
    color: #a2aab2;
    text-align: center;
  }
`

const RefundInformation = styled.div`
  font-size: 13px;
  & table {
    width: 100%;
    color: #222;
    & th {
      width: ${(props) => props.multiTable ? "20%" : "33.33%"};
      padding: 12px;
      background-color: #f3f3f3;
      border-top: 1px solid #e9ebee;
      border-bottom: 1px solid #e9ebee;
    }

    & td {
      text-align: center;
      padding: 12px;
      border-bottom: 1px solid #e5e5e5;
      cursor: pointer;
      background-color: #fff;
    }
  }
`


export default PaymentManageUser

