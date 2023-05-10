import React, {useState, useEffect, useCallback} from "react";
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
import 'react-confirm-alert/src/react-confirm-alert.css';
import {useAtom} from "jotai";
import Navigator from "../../components/common/Navigator";
import ko from "date-fns/locale/ko";
import {AdChargeButton} from "../../components/payment/user/AdCharge";
import {RefundRequestButton} from "../../components/payment/user/RefundRequest";
import {RegisterRefundInformationButton} from "../../components/payment/user/RegisterRefundInformation";
import {getLastMonth, getThisMonth, getToDay} from "../../common/DateUtils";
import {decimalFormat} from "../../common/StringUtils";
import {toast, ToastContainer} from "react-toastify";
import Table from "../../components/table";
import {paymentListRequest} from "../../services/payment/user/RetrievePaymentByServiceUserAxios";
import {selUserInfo} from "../../services/Platform/ManageUserAxios";
import ReactDataGrid from "@inovua/reactdatagrid-enterprise";
import {tokenResultAtom} from "../login/entity/Common";
import {searchConditionAtom} from "./entity/Common";
import {accountInfoAtom} from "./entity/User";
import {TotalCount} from "../../components/table/TableDetail";
import {
  PaymentDetailsColumns,
  PaymentDetailsDataAtom,
  PointDetailsColumns,
  PointDetailsDataAtom
} from "./entity/PaymentUser";

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
  const [tokenUserInfo] = useAtom(tokenResultAtom) // userId

  const [paymentDetails, setPaymentDetails] = useAtom(PaymentDetailsDataAtom)
  const [pointDetails, setPointDetails] = useAtom(PointDetailsDataAtom)

  const [, setAccountInfoState] = useAtom(accountInfoAtom) // 새로 고침 시

  //[d] totalInfo 2개 생성 결제내역 하나, 포인트 지급 하나
  const [totalInfo, setTotalInfo] = useState(0)
  const [searchCondition, setSearchCondition] = useState(searchConditionAtom)

  //[d] 날짜
  const [dateRange, setDateRange] = useState([ new Date(getThisMonth().startDay), new Date(getToDay())]);
  const [startDate, endDate] = dateRange;

  //[d] 광고비 잔액 충전 금액 목 데이터
  const [advertisingBalance, setAdvertisingBalance] = useState(10000) // 광고비 잔액
  const [requestAmountValue, setRequestAmountValue] = useState(0) // 충전 금액

  //[d] 환불 입력 정보 조회해서 여기다 담기
  const [refundData, setRefundData] = useState([])
  // const [refundData, setRefundData] = useState(["테스트1","테스트2","테스트3"]) // 환불 정보

  //[d] 그리드 데이터
  const [pageSize, ] = useState(10); // 한 페이지 보여줄 데이터
  const [currentPage, ] = useState(1); // 현재 페이지
  const gridStyle = {minHeight: 510}

  //[d] 결제 내역 데이터
  function fetchPaymentDetails(props = {}) {
    const { skip = (currentPage - 1) * pageSize, limit = pageSize } = props;
    const requestData = {
      pageSize: limit,
      currentPage: skip / limit + 1,
      searchStartDate: getThisMonth().startDay,
      searchEndDate: getToDay(),
    };
    return paymentListRequest(skip, limit, tokenUserInfo.id, requestData)
      .then((response) => {
        if (response !== null) {
          const { totalCount, rows: data } = response;
          setTotalInfo(totalCount);
          return Promise.resolve({ data, count: parseInt(totalCount) });
        } else {
          return Promise.resolve({ data: [], count: 0 });
        }
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
  //[d] 환불 정보 없는 상태에서 환불 신청 시 경고문
  const handleRegisterRefund = () => {
    if(refundData.length === 0){
      toast("환불 정보를 등록해 주세요.")
    } else {
      console.log("환불 정보", refundData)
    }
  }
  //[d] 광고비 충전 감지
  const handlePaymentDetailsReceived = () => {
    // AdCharge 에서 특정 행위를 실행하면
    // 부모 컴포넌트의 상태를 업데이트 한다!!
    // 그럼 fetchPaymentDetails 내부에서 totalInfo 값을 업데이트 하고
    // 아래 dataSource 의존성 배열 내부 값이 변경 되면서 그리드도 다시 그려줍니다.
    fetchPaymentDetails();
  }
  //[d] 최초 화면 접근시 유저 상태이면 결제내역 데이터 조회 아니면 로그인
  useEffect(() => {
    if (tokenUserInfo.role === "NORMAL") {
      // 광고주 결제 현황 조회
      fetchPaymentDetails();
      // 광고주 포인트 현황 조회
    } else {
      // 새로고침 시 메인으로..UserDetail.js useEffect 동일하게 NORMAL 아닐 떄 체크하는 부분 사용
      fetchAccountInfo();
    }
  }, [searchCondition]);
  //[d] 차트 데이터에서 역으로 변동값 감지해서 다시 던저주기 paging 처리 관련...
  const dataSource = useCallback(fetchPaymentDetails, [totalInfo]);

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
                      onPaymentDetailsReceived={handlePaymentDetailsReceived}
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
                      <RegisterRefundInformationButton title={''} modalInfo={'USER'} onSave={null} onSubmit={null} refundData={refundData} setRefundData={setRefundData}/>
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
                      <RefundRequestTable refundData={refundData} advertisingBalance={advertisingBalance} setAdvertisingBalance={setAdvertisingBalance}/>
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
          <ColSpan4 style={{display:'block'}}>
            <BoardSearchResultTitle style={{alignItems:"end", paddingBottom: "10px"}}>
              <div>
                {totalInfo &&
                  <TotalCount><span/>총 <span>{totalInfo}</span> 건의 결제 내역</TotalCount>}
              </div>
              <div>
                <SaveExcelButton>엑셀 저장</SaveExcelButton>
              </div>
            </BoardSearchResultTitle>
            {/*<Table columns={PaymentDetailsColumns}*/}
            {/*       // totalInfo 내부 totacCount 값이 아직 없으니까 임시로 0값 맹글어 두자~*/}
            {/*       totalCount={[totalInfo, '결제 내역']}*/}
            {/*       data={dataSource}*/}
            {/*       showHoverRows={false}*/}
            {/*       activeCell={[0]}*/}
            {/*       noDirectives={true}*/}
            {/*       pagenations={true}*/}
            {/*       limit={10}*/}
            {/*       emptyText={'결제 내역이 없습니다.'}*/}
            {/*/>*/}
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
              limit={10}
              pagination={true}
              sortable={false}
              style={gridStyle}
            />
            <Table columns={PointDetailsColumns}
              // totalCount={[totalInfo.totalCount, '포인트 지급 내역']}
              // totalCount={[totalInfo, '포인트 지급 내역']}
                   totalCount={[0, '포인트 지급 내역']}
                   data={pointDetails}
                   showHoverRows={false}
                   activeCell={[0]}
                   pagenations={false}
                   noDirectives={true}
                   emptyText={'포인트 지급 내역이 없습니다.'}
            />
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

