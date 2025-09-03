
import React, {useCallback, useEffect, useState} from "react";
import {
  Board,
  BoardContainer,
  BoardHeader,
  BoardSearchDetail,
  BoardSearchResultTitle,
  CalendarBox,
  CalendarIcon,
  ColSpan2,
  ColSpan4,
  CustomDatePicker,
  DateContainer,
  DefaultButton,
  RowSpan,
  SaveExcelButton,
  TitleContainer,
} from "../../assets/GlobalStyles";
import styled from 'styled-components';
import moment from 'moment';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {useAtom} from "jotai";
import Navigator from "../../components/common/Navigator";
import ko from "date-fns/locale/ko";
import {AdChargeButton} from "../../components/payment/user/AdCharge";
import {RefundRequestButton} from "../../components/payment/user/RefundRequest";
import {RegisterRefundInformationButton} from "../../components/payment/user/RegisterRefundInformation";
import {getThisMonth, getToDay} from "../../common/DateUtils";
import {decimalFormat} from "../../common/StringUtils";
import {toast} from "react-toastify";
import {paymentListRequest, pointListRequest} from "../../services/payment/user/RetrievePaymentByServiceUserAxios";
import {retrieveUserRefundInfoRequestAxios} from "../../services/payment/user/RetrieveUserRefundInfoRequestAxios";
import {selUserInfo} from "../../services/Platform/ManageUserAxios";
import ReactDataGrid from "@inovua/reactdatagrid-enterprise";
import {tokenResultAtom} from "../login/entity/Common";
import {accountInfoAtom} from "./entity/User";
import {TotalCount} from "../../components/table/TableDetail";
import {PaymentDetailsColumns, PointDetailsColumns, refundRequestData} from "./entity/PaymentUser";
import {requestAmountPoint, retrieveUserPoint} from "../layout/entity/UserPoint";

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
          {Object.values(props.refundData).map((item, key) => {
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

function PaymentManageUser() {
  const [tokenUserInfo] = useAtom(tokenResultAtom) // userId
  const [, setAccountInfoState] = useAtom(accountInfoAtom) // 새로 고침 시
  //[d] totalInfo 2개 생성 결제내역 하나, 포인트 지급 하나
  const [totalInfo, setTotalInfo] = useState(0)
  const [totalPointInfo, setTotalPointInfo] = useState(0)
  //[d] 날짜
  const [dateRange, setDateRange] = useState([ new Date(getThisMonth().startDay), new Date(getToDay())]);
  const [startDate, endDate] = dateRange;
  //[d] 광고비 잔액 충전 금액 목 데이터
  const [advertisingBalance, setAdvertisingBalance] = useAtom(retrieveUserPoint) // 광고비 잔액
  const [requestAmountValue, setRequestAmountValue] = useAtom(requestAmountPoint) // 충전 금액
  //[d] 환불 입력 정보 조회해서 여기다 담기
  const [refundData, setRefundData] = useState({})
  //[d] 현재 시점 기준 전체 지급 금액 값 해당 값이 환불 요청 금액보다 낮으면 환불 거부..
  const [totalAmount] = useState(0)
  //[d] 그리드 데이터
  const [pageSize, ] = useState(10); // 한 페이지 보여줄 데이터
  const [currentPage, ] = useState(1); // 현재 페이지
  const gridStyle = {minHeight: 300, textAlign: 'center'}
  //[d] 결제 내역 데이터
  function fetchPaymentDetails(props = {}) {
    const { skip = (currentPage - 1) * pageSize, limit = pageSize } = props;

    const requestData = {
      pageSize: limit,
      currentPage: skip / limit + 1,
      searchStartDate: moment(startDate).format('YYYY-MM-DD'),
      searchEndDate: moment(endDate).format('YYYY-MM-DD'),
    };
    return paymentListRequest( tokenUserInfo.id, requestData)
      .then((response) => {
        if (response !== null) {
          const { totalCount, rows: data } = response;
          setTotalInfo(totalCount);
          return { data, count: parseInt(totalCount) };
        } else {
          return { data: [], count: 0 };
        }
      })
      .catch((error) => {
        console.error("Failed to fetch payment details:", error);
        return { data: [], count: 0 };
      });
  }
  //[d] 포인트 내역 데이터
  function fetchPointDetails(props = {}) {
    const { skip = (currentPage - 1) * pageSize, limit = pageSize } = props;

    const requestData = {
      pageSize: limit,
      currentPage: skip / limit + 1,
      searchStartDate: moment(startDate).format('YYYY-MM-DD'),
      searchEndDate: moment(endDate).format('YYYY-MM-DD'),
    };
    return pointListRequest( tokenUserInfo.id, requestData)
      .then((response) => {
        if (response !== null) {
          const { totalCount, rows: data } = response;
          setTotalPointInfo(totalCount);
          return { data, count: parseInt(totalCount) };
        } else {
          return { data: [], count: 0 };
        }
      })
      .catch((error) => {
        console.error("Failed to fetch point details:", error);
        return { data: [], count: 0 };
      });
  }
  //[d] 새로고침시 정보 유실 로그인 페이지로 날림
  function fetchAccountInfo() {
    selUserInfo(tokenUserInfo.id).then((response) => {
      setAccountInfoState({
        ...response,
        status: response.status === "NORMAL" ? "NORMAL" : "SUSPEND",
      });
    });
  }
  //[d] 환불 정보 조회
  const retrieveUserRefundInfo = async() => {
    await retrieveUserRefundInfoRequestAxios (tokenUserInfo.id)
      .then(response => {
        // 성공적인 응답 처리
        let data = response;
        const updateValue = (data, refundRequestData) => {
          const match = refundRequestData.bankType.find(option => option.value === data.refundBankType);
          if (match) {
            data.refundBankType = match.label
          }
        }
        updateValue(data, refundRequestData);
        setRefundData(data)
      })
      .catch(error => {
        // 실패한 응답 처리
        console.error("실패 응답 처리",error);
      });
  }
  //[d] 환불 정보 없는 상태에서 환불 신청 시 경고문
  const handleRegisterRefund = () => {
    if(refundData.refundBankType === null){
      toast("환불 정보를 등록해 주세요.")
    } else {
      console.log("환불 정보", refundData)
    }
  }
  //[d] 광고비 충전 감지
  const handlePaymentDetailsReceived = () => {
    //[d]AdCharge, RefundRequest api 호출 하면 해당 함수 실행하여 상태 업데이트
    fetchPaymentDetails();
    fetchPointDetails();
    retrieveUserRefundInfo();
  }
  //[d] 최초 화면 접근시 유저 상태이면 결제내역 데이터 조회 아니면 로그인 페이지 이동
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (tokenUserInfo.role === "NORMAL") {
          // 광고주 결제 현황 조회
          const paymentDetails = await fetchPaymentDetails();
          // 광고주 포인트 현황 조회
          const pointDetails = await fetchPointDetails();
          // 환불 정보 조회
          retrieveUserRefundInfo();
          setTotalInfo(paymentDetails.count);
          setTotalPointInfo(pointDetails.count);
        } else {
          // 새로고침 시 메인으로..UserDetail.js useEffect 동일하게 NORMAL 아닐 때 체크하는 부분 사용
          fetchAccountInfo();
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    //fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange, tokenUserInfo]);
  //[d] 차트 데이터에서 역으로 변동값 감지해서 다시 던저주기 paging 처리 관련...
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const dataSource = useCallback(fetchPaymentDetails, [totalInfo]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const dataSourcePoint = useCallback(fetchPointDetails, [totalPointInfo]);
  /**
   * 오른쪽 클릭 방지
   * @param menuProps
   * @param rowProps
   */
  const renderRowContextMenu = (menuProps, { rowProps }) => {
    menuProps.autoDismiss = true
    console.log('오른쪽 클릭 방지')
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
            <ColSpan4>
              <RowSpan box={true}>
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
                        onPaymentDetailsReceived={handlePaymentDetailsReceived}
                      />
                      {refundData.refundBankType === null?
                        <DefaultButton
                          onClick={handleRegisterRefund}
                          style={{background:"#fff", color:"#777"}}
                        >
                          환불 신청
                        </DefaultButton>
                        :
                        <RefundRequestButton
                          title={'환불 신청'}
                          modalInfo={'USER'}
                          onSave={null}
                          onSubmit={null}
                          refundData={refundData}
                          onPaymentDetailsReceived={handlePaymentDetailsReceived}
                          totalAmount={totalAmount}
                        />
                      }
                      {/*환불 신청에 값이 없으면 토스트 띄우기*/}
                    </ColSpan2>
                  </RowSpan>
                  <RowSpan style={{margin:"0"}}>
                    <ColSpan4>
                      <AdvertisingCostStatus>
                        <span className={'won'}>{decimalFormat(advertisingBalance + requestAmountValue)}</span>
                      </AdvertisingCostStatus>
                    </ColSpan4>
                  </RowSpan>
                </ColSpan2>
                <ColSpan2 column={true} style={{padding:"0", gap:"0"}}>
                  <RowSpan style={{width:"100%", margin:"0"}}>
                    <ColSpan2 style={{alignItems:"baseline", marginBottom:"15px"}}>환불 정보</ColSpan2>
                    {refundData.refundBankType === null?
                      <ColSpan2 style={{justifyContent:"right"}}>
                        <RegisterRefundInformationButton onPaymentDetailsReceived={handlePaymentDetailsReceived} title={'등록'} modalInfo={'USER'} onSave={null} onSubmit={null} refundData={refundData} setRefundData={setRefundData}/>
                      </ColSpan2>
                      :
                      <ColSpan2 style={{justifyContent:"right", width:"70px", height:"15px"}}>
                        <RegisterRefundInformationButton onPaymentDetailsReceived={handlePaymentDetailsReceived} title={''} modalInfo={'USER'} onSave={null} onSubmit={null} refundData={refundData} setRefundData={setRefundData}/>
                      </ColSpan2>
                    }
                  </RowSpan>
                  <RowSpan>
                    <ColSpan4>
                      {refundData.refundBankType === null?
                        <AdvertisingCostStatus style={{marginTop: "15px"}}>
                          <small>등록된 환불 정보가 없습니다. 환불 정보를 등록해주세요.</small>
                        </AdvertisingCostStatus>
                        :
                        <RefundRequestTable refundData={refundData} advertisingBalance={advertisingBalance} setAdvertisingBalance={setAdvertisingBalance}/>
                      }
                    </ColSpan4>
                  </RowSpan>
                </ColSpan2>
              </RowSpan>
            </ColSpan4>
          </BoardSearchDetail>
          <div style={{
            width:'100%',
            marginTop:'20px',
            paddingTop:'20px',
            borderTop:'1px solid #ddd'
          }}>
            <div style={{width:'300px', marginBottom: '20px'}}>
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
          <ColSpan4 style={{display:'block'}}>
            <BoardSearchResultTitle style={{alignItems:"end", paddingBottom: "10px"}}>
              <div>
                <TotalCount><span/>총 <span>{totalInfo}</span> 건의 결제 내역</TotalCount>
              </div>
              <div>
                {/*<SaveExcelButton>엑셀 저장</SaveExcelButton>*/}
              </div>
            </BoardSearchResultTitle>
            <ReactDataGrid
              licenseKey={process.env.REACT_APP_DATA_GRID_LICENSE_KEY}
              handle={null}
              columns={PaymentDetailsColumns}
              dataSource={dataSource}
              headerHeight={48}
              showZebraRows={true}
              showCellBorders={'horizontal'}
              enableColumnAutosize={true}
              showColumnMenuLockOptions={false}
              showColumnMenuGroupOptions={false}
              emptyText={'결제 내역이 없습니다.'}
              limit={5}
              pagination={true}
              sortable={false}
              style={gridStyle}
              activeCell={null}
              renderRowContextMenu={renderRowContextMenu}
            />
            <BoardSearchResultTitle style={{alignItems:"end", paddingTop:"20px", paddingBottom: "10px"}}>
              <div>
                <TotalCount><span/>총 <span>{totalPointInfo}</span> 건의 포인트 지급 내역</TotalCount>
              </div>
            </BoardSearchResultTitle>
            <ReactDataGrid
              licenseKey={process.env.REACT_APP_DATA_GRID_LICENSE_KEY}
              handle={null}
              columns={PointDetailsColumns}
              dataSource={dataSourcePoint}
              headerHeight={48}
              showZebraRows={true}
              showCellBorders={'horizontal'}
              enableColumnAutosize={true}
              showColumnMenuLockOptions={false}
              showColumnMenuGroupOptions={false}
              emptyText={'결제 내역이 없습니다.'}
              limit={5}
              pagination={true}
              sortable={false}
              style={gridStyle}
              activeCell={null}
              renderRowContextMenu={renderRowContextMenu}
            />
          </ColSpan4>
        </Board>
      </BoardContainer>
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
    color: #ff0000;
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



