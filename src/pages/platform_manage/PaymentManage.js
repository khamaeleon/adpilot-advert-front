
import {Board, BoardHeader, BoardTableContainer} from "../../assets/GlobalStyles";
import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import React, {useCallback, useEffect, useState} from "react";
import {useAtom} from "jotai";
import Checkbox from "../../components/common/Checkbox";
import Table from "../../components/table";
import {toast, ToastContainer} from "react-toastify";
import {PaymentCondition} from "../../components/Platform/Condition";
import {paymentAllListRequest} from "../../services/payment/admin/PaymentAllListRequestAxios"
import {
  paymentColumns,
  paymentDataAtom,
  searchPaymentParams,
  searchPaymentType,
  updatePaymentStatus
} from "./entity/Payment";
import moment from "moment/moment";
import {getThisMonth, getToDay} from "../../common/DateUtils";
import ReactDataGrid from "@inovua/reactdatagrid-enterprise";


function PaymentManage() {
  const [totalInfo, setTotalInfo] = useState(0)
  const [paymentDataState, setPaymentDataState] = useAtom(paymentDataAtom)
  const [searchPaymentParamsState, setSearchPaymentParamsState] = useAtom(searchPaymentParams)
  const [updatePaymentStatusParams, setUpdatePaymentStatusParams] = useState(updatePaymentStatus)

  //[d] 날짜
  const [dateRange, setDateRange] = useState([ new Date(getThisMonth().startDay), new Date(getToDay())]);
  const [startDate, endDate] = dateRange;

  //[d] 그리드 데이터
  const [pageSize, ] = useState(10); // 한 페이지 보여줄 데이터
  const [currentPage, ] = useState(1); // 현재 페이지

  const gridStyle = {minHeight: 510, textAlign: 'center'}

  useEffect(() => {
    handlePaymentTableData()
  }, [dateRange])

  // useEffect(() => {
  //   updatePaymentStatusParams.paymentStatus !== '' && updatePayment(updatePaymentStatusParams)
  // }, [updatePaymentStatusParams.paymentIdList])

  const handlePaymentTableData = (props={}) => { //테이블 데이터 호출 (어드민 권한은 username 없이 조회)
    const { skip = (currentPage - 1) * pageSize, limit = pageSize } = props;

    handlePaymentStatus('')
    setPaymentStatusSelected([])
    setCheckboxAllSelect(false)

    const requestData = {
      pageSize: limit,
      currentPage: skip / limit + 1,
      searchStartDate: moment(startDate).format('YYYY-MM-DD'),
      searchEndDate: moment(endDate).format('YYYY-MM-DD'),
      pointHistoryType: null,
      paymentStatusType: null,
      keywordType: null,
      keyword: null
    };

    return paymentAllListRequest ( requestData )
      .then(response => {
        // 성공적인 응답 처리
        if (response !== null) {
          const { totalCount, rows: data } = response;
          setTotalInfo(totalCount);
          return Promise.resolve({ data, count: parseInt(totalCount) });
        } else {
          return Promise.resolve({ data: [], count: 0 });
        }
      })
      .catch(error => {
        // 실패한 응답 처리
        console.error("실패 응답 처리",error);
      });
  }

  /**
   * 모달안에 매체 검색 선택시
   */
  const handleHistoryAdd = (params) => {
    console.log(params)
    // accountCreateInvoiceRecord(params).then(response => {
    //   response ? handlePaymentTableData() : confirmAlert({
    //     title: '이력 추가',
    //     message: '정산 프로필이 없습니다.',
    //     buttons: [
    //       {
    //         label: '확인',
    //       }
    //     ]
    //   });
    // })
  }

  const dataCallback = useCallback( handlePaymentTableData , [totalInfo])

  const updatePayment = (params) => {
    confirmAlert({
      title: '알림',
      message: '변경 하시겠습니까?',
      buttons: [
        {
          label: '확인',
          onClick: () => {
            //accountUpdateInvoiceRecord(params).then(response => response && dataCallback)
          }
        },{
          label: '취소',
          onClick: () => handlePaymentStatus('')
        }
      ]
    });
  }

  const handlePaymentStatus = (event) => {
    setUpdatePaymentStatusParams({
      ...updatePaymentStatusParams,
      paymentIdList: event,
      paymentStatus: paymentStatusSelected
    })
  }

  const [paymentStatusSelected, setPaymentStatusSelected] = useState([])
  const [checkboxAllSelect, setCheckboxAllSelect] = useState(false);
  const disabledArr = ['REJECT', 'PAYMENT_COMPLETED', 'WITHHELD_PAYMENT', 'REVENUE_INCREASE', 'REVENUE_DECREASE']
  const handlePaymentCheckAll = (event) => { // 상태 변경 전체 체크
    if(event.target.checked){
      let allArr = paymentDataState.filter(obj => !disabledArr.includes(obj.status.value)).map(data => {return data.id})
      setPaymentStatusSelected(allArr)
      if(allArr.length !== 0) {
        setCheckboxAllSelect(true)
      } else {
        setCheckboxAllSelect(false)
        toast.warning('상태 변경 불가.')
      }
    } else{
      setPaymentStatusSelected([])
      setCheckboxAllSelect(false)
    }
  }
  const handlePaymentStatusCheckbox = (e,cellProps) => { // 테이블 체크박스 핸들링
    if(e.currentTarget.checked){
      setPaymentStatusSelected([...paymentStatusSelected.concat(cellProps.data.id)])
    } else {
      setPaymentStatusSelected([...paymentStatusSelected.filter(id => id !== cellProps.data.id)])
      setCheckboxAllSelect(false)
    }
  }

  const checkboxColumn = { // 테이블 체크박스 커스텀
    renderCheckbox: (checkboxProps, cellProps) => {
      return (
        <div style={{minWidth: 100}}>
          <Checkbox label={''}
                    type={'a'}
                    disabled={disabledArr.includes(cellProps.data?.status?.value)}
                    isChecked={paymentStatusSelected.includes(cellProps.data.id) ? true : false}
                    onChange={ e => {
                      handlePaymentStatusCheckbox(e, cellProps)
                    }}/>
        </div>
      );
    }
  }

  return (
    <>
      <Board>
        <BoardHeader>결재 현황</BoardHeader>
        <PaymentCondition searchType={searchPaymentType} searchCondition={searchPaymentParamsState} setSearchCondition={setSearchPaymentParamsState} handleTableData={handlePaymentTableData} />
        <BoardTableContainer>
          {/*<Table columns={paymentColumns}*/}
          {/*       // data={paymentDataAtom} 아톰 사용시 호출 못함?? 확인...*/}
          {/*       data={paymentDataState}*/}
          {/*       idProperty="id"*/}
          {/*       totalCount={[totalInfo, '결제 현황']}*/}
          {/*       // checkboxColumn={checkboxColumn} //체크박스 커스텀*/}
          {/*       // onSelectionChange={paymentStatusSelected} // 선택한 체크박스 정보 가져오기*/}
          {/*       emptyText={'결재 현황 내역이 없습니다.'}*/}
          {/*       showHoverRows={false}*/}
          {/*       dataCallback={dataCallback}*/}
          {/*       limit={10}*/}
          {/*/>*/}
          <ReactDataGrid
            licenseKey={process.env.REACT_APP_DATA_GRID_LICENSE_KEY}
            handle={null}
            columns={paymentColumns}
            dataSource={dataCallback}
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
    </>
  )
}

export default PaymentManage



