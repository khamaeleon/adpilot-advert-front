import {
  Board,
  BoardHeader,
  BoardSearchResultTitle,
  BoardTableContainer,
  ColSpan2,
  RowSpan, SaveExcelButton
} from "../../assets/GlobalStyles";
import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import React, {useCallback, useEffect, useState} from "react";
import {useAtom} from "jotai";
import Checkbox from "../../components/common/Checkbox";
import Table from "../../components/table";
import {toast, ToastContainer} from "react-toastify";
import {PaymentCondition} from "../../components/Platform/Condition";
import {SearchUser} from "../../components/common/SearchUser";
import {
  paymentColumns,
  paymentDataAtom,
  searchPaymentParams,
  searchPaymentType,
  updatePaymentStatus
} from "./entity/Payment";
import {StatusBtn} from "./styles/common";
import {atom} from "jotai/index";
import {dateFormat, decimalFormat} from "../../common/StringUtils";
import {getThisMonth, getToDay} from "../../common/DateUtils";
import {SearchAdvertiser} from "../../components/common/SearchAdvertiser";
import {pointAllListRequest} from "../../services/payment/admin/PointAllListRequestAxios";
import {TotalCount} from "../../components/table/TableDetail";
import ReactDataGrid from "@inovua/reactdatagrid-enterprise";
import {RefundProcessingButton} from "../../components/payment/admin/RefundProcessing";
import {refundAllProcess, refundProcess} from "../../services/payment/admin/RefundProcessAxios";


const costPaymentDataAtom = atom([{
  name: 'id',
  status: {
    value:"REFUND_REQUEST_OF_USER"
  }
}])
export const updateCostPaymentStatus = {
  // paymentStatus: "",
  paymentIdList: [],
}
/**
 * 결재 관리 현황 조회
 */
export const searchCostPaymentParams = atom({
  startAt: getThisMonth().startDay,
  endAt: getThisMonth().endDay,
  statusList: ['GIVEN_BY_ADMIN', 'TAKEN_BY_ADMIN','REFUND_REQUEST_OF_USER','REFUNDED_BY_ADMIN'],
  searchType: 'ALL',
  search: ''
})


// export function logRefundRequests() {
//   costPaymentColumns.forEach(column => {
//     if (column.name === 'pointHistoryType') {
//       column.data.forEach(row => {
//         if (row.value === 'REFUND_REQUEST_OF_USER') {
//           console.log(row);
//         }
//       });
//     }
//   });
// }

// const cellPropsAtom = atom(null);
// export const useCellProps = () => useAtom(cellPropsAtom);

/**
 * 결재 관리 리스트 컬럼 설정
 */
export const costPaymentColumns = [
  // {
  //   name: 'id',
  //   header: 'id',
  //   defaultVisible: false,
  // },
  {
    name: 'createdAt',
    header: '신청 일시',
    width: 150,
    showColumnMenuTool: false,
    render: ({value}) => {
      return <p>{dateFormat(value, 'YYYY.MM.DD HH:mm')}</p>
    }
  },
  {
    name: 'pointHistoryType',
    header: '신청 상태',
    width: 120,
    showColumnMenuTool: false,
    render: CellComponent,
  },
  {
    name: 'refundBankType',
    header: '은행명',
    showColumnMenuTool: false,
    render: ({ value })=> {
      let valueType = {
        //[d] 아래 목록 따로 빼서 관리 사용자, 어드민 모두 사용
        KDB_BANK: { label: 'KDB산업은행' },
        IBK_BANK: { label: 'IBK기업은행' },
        KOOKMIN_BANK: { label: '국민은행' },
        KEB_BANK: { label: 'KEB하나은행' },
        SUHYUP_BANK: { label: '수협' },
        NONGHYUP_BANK: { label: '농협' },
        REGIONAL_NONGHYUP_BANK: { label: '농협중앙회' },
        WOORI_BANK: { label: '우리은행' },
        SC_BANK: { label: 'SC제일은행' },
        SHINHAN_BANK: { label: '신한은행' },
        CITY_BANK: { label: '시티은행' },
        DAEGU_BANK: { label: '대구은행' },
        BUSAN_BANK: { label: '부산은행' },
        GWANGJU_BANK: { label: '광주은행' },
        JEJU_BANK: { label: '제주은행' },
        JEONBUK_BANK: { label: '전북은행' },
        GYEONGNAM_BANK: { label: '경남은행' },
        KFCC_BANK: { label: '새마을금고' },
        SHINHYUP_BANK: { label: '신협' },
        FSB_BANK: { label: '저축은행중앙회' },
        NFCF_BANK: { label: '산립조합중앙회' },
        EPOST_BANK: { label: '우체국' },
        HANA_BANK: { label: '하나은행' },
        K_BANK: { label: '케이뱅크' },
        KAKAO_BANK: { label: '카카오뱅크' },
        TOSS_BANK: { label: '토스뱅크' },
      }[value] || { label: '', color: '' };
      return (
        <p>{valueType.label}</p>
      )
    }
  },
  {
    name: 'refundBankAccount',
    header: '계좌번호',
    showColumnMenuTool: false,
  },
  {
    name: 'adverName',
    header: '광고주명',
    showColumnMenuTool: false,
  },
  {
    name: 'username',
    header: '광고주 아이디',
    showColumnMenuTool: false,
  },
  {
    //[d] 신청 아이디 적당한 값이 애매함...
    name: 'refundBankAccountHolder',
    header: '신청 아이디',
    showColumnMenuTool: false,
  },
  {
    name: 'point',
    header: '광고비',
    showColumnMenuTool: false,
    render: ({value}) => <p className={'won'}>{decimalFormat(value)}</p>
  },
  {
    name: 'modifiedAt',
    header: '상태 변경일',
    width: 120,
    showColumnMenuTool: false,
    render: ({value}) => {
      return <p>{dateFormat(value, 'YYYY.MM.DD')}</p>
    }
  },
  {
    name: 'description',
    header: '비고',
    width: 180,
    sortable: false,
    showColumnMenuTool: false,
  }
]
function CellComponent({ value, cellProps }) {

  let valueType = {
    CHARGE_OF_PAYMENT: { label: '결제 신청', color: 'blue' },
    REFUND_OF_PAYMENT: { label: 'REFUND_OF_PAYMENT', color: 'orange' },
    GIVEN_BY_ADMIN: { label: '광고비 지급', color: 'black' },
    TAKEN_BY_ADMIN: { label: '광고비 차감', color: 'red' },
    REFUND_REQUEST_OF_USER: { label: '환불 신청', color: 'orange' },
    REFUNDED_BY_ADMIN: { label: '환불 완료', color: 'green' },
    ERROR: { label: 'ERROR', color: 'red' },
  }[value] || { label: '', color: '' };

  // const [, setCellPropsState] = useCellProps();
  //
  // const logRefundRequests = () => {
  //   if (valueType.label === '환불 신청') {
  //     setCellPropsState(cellProps);
  //   }
  // };

  return (

    valueType.label === '환불 신청'?
      (
        <RefundProcessingButton
          title={"환불 처리"}
          modalInfo={'ADMIN'}
          onSave={null}
          onSubmit={"환불 완료"}
          refundData={cellProps}
          // onClick={logRefundRequests}
        />
    ):(
        <p
          style={{
            color: valueType.color,
          }}
        >
          {valueType.label}
        </p>
      )
  );
}

function AdvertisingPayments() {
  const [totalInfo, setTotalInfo] = useState(0)
  const [paymentDataState, setPaymentDataState] = useAtom(costPaymentDataAtom)
  const [searchPaymentParamsState, setSearchPaymentParamsState] = useAtom(searchCostPaymentParams)
  const [updatePaymentStatusParams, setUpdatePaymentStatusParams] = useState(updateCostPaymentStatus)

  //[d] 그리드 데이터
  const [pageSize, ] = useState(10); // 한 페이지 보여줄 데이터
  const [currentPage, ] = useState(1); // 현재 페이지
  // const [checkUseRefundData, ] = useAtom(cellPropsAtom); // 개별 환불 신청 클릭 시 해당 데이터
  const gridStyle = {minHeight: 510, textAlign: 'center'}

  useEffect(() => {
    handlePaymentTableData()
  }, [searchPaymentParamsState])

  // useEffect(() => {
  //   updatePaymentStatusParams.paymentStatus !== '' && updatePayment(updatePaymentStatusParams)
  // }, [updatePaymentStatusParams.paymentIdList])

  const handlePaymentTableData = (props={}) => { //테이블 데이터 호출 (어드민 권한은 username 없이 조회)
    const { skip = (currentPage - 1) * pageSize, limit = pageSize } = props;

    const requestData = {
      pageSize: limit,
      currentPage: skip / limit + 1,
      searchStartDate: searchPaymentParamsState.startAt,
      searchEndDate: searchPaymentParamsState.endAt,
      pointHistoryType: searchPaymentParamsState.statusList,
      keywordType: searchPaymentParamsState.searchType,
      keyword: searchPaymentParamsState.search
    };

    // console.log(requestData.pointHistoryType)
    // console.log(requestData.keywordType, requestData.keyword)
    // 특정 값을 요청하는데 다 뿌려줌.. DB에서 뿌려준느 부분 확인 필요...

    // handlePaymentStatus('')
    setPaymentStatusSelected([])
    setCheckboxAllSelect(false)

    return pointAllListRequest ( requestData )
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

  // const dataCallback = useCallback( handlePaymentTableData , [paymentDataState])
  const dataCallback = useCallback( handlePaymentTableData , [totalInfo, searchPaymentParamsState, paymentDataState])

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

  const handlePaymentStatus = async(event) => {
    if(updatePaymentStatusParams.paymentIdList.length !== 0){
      setUpdatePaymentStatusParams({
        ...updatePaymentStatusParams,
        // paymentStatus: event,
        paymentIdList: paymentStatusSelected,
      })
      const requestData = {
        userPointHistoryIds: updatePaymentStatusParams.paymentIdList,
      };
      try {
        // 성공적인 응답 처리
        await refundAllProcess(requestData);
        // console.log(requestData.userPointHistoryIds);
        // props.onPaymentDetailsReceived(); // 요청 내용 실시간 업데이트용..
      } catch (error) {
        // 실패한 응답 처리
        console.error("실패 응답 처리", error);
      }
    }else{
      toast.warning('체크한 환불 내역이 없습니다.');
    }
  }


  const [paymentStatusSelected, setPaymentStatusSelected] = useState([]) // 체크박스 id 값
  const [checkboxAllSelect, setCheckboxAllSelect] = useState(false);
  const disabledArr = ['REFUND_REQUEST_OF_USER']
  const handlePaymentCheckAll = (event) => {
    if (event.target.checked) {
      let allArr = paymentDataState
        .filter(obj => !disabledArr.includes(obj.status.value))
        .map(data => data.id);
      setPaymentStatusSelected(allArr);
      if (allArr.length !== 0) {
        setCheckboxAllSelect(true);
      } else {
        setCheckboxAllSelect(false);
        toast.warning('상태 변경 불가.');
      }
    } else {
      setPaymentStatusSelected([]);
      setCheckboxAllSelect(false);
    }

    // 모든 체크 박스가 체크되도록 체크 상태 업데이트
    const checkboxInputs = document.querySelectorAll('input[type="checkbox"]');
    checkboxInputs.forEach(input => {
      input.checked = event.target.checked;
    });
  };

  const handlePaymentStatusCheckbox = (e,cellProps) => { // 테이블 체크박스 핸들링
    if(e.currentTarget.checked){
      setPaymentStatusSelected([...paymentStatusSelected.concat(cellProps.data.id)])
    } else {
      setPaymentStatusSelected([...paymentStatusSelected.filter(id => id !== cellProps.data.id)])
      setCheckboxAllSelect(false)
    }
  }

  const checkboxColumn = {
    renderCheckbox: (checkboxProps, cellProps) => {
      const value = cellProps.data.pointHistoryType;
      if (value === 'REFUND_REQUEST_OF_USER') {
        return (
          <div style={{ minWidth: 100 }}>
            <Checkbox
              label={''}
              type={'a'}
              disabled={disabledArr.includes(cellProps.data?.status?.value)}
              isChecked={paymentStatusSelected.includes(cellProps.data.id)}
              onChange={(e) => {
                handlePaymentStatusCheckbox(e, cellProps);
              }}
            />
          </div>
        );
      }
      return null;
    },
  };



  return (
    <>
      <Board>
        <BoardHeader>결제 현황</BoardHeader>
        <PaymentCondition searchType={searchPaymentType} searchCondition={searchPaymentParamsState} setSearchCondition={setSearchPaymentParamsState} handleTableData={handlePaymentTableData} />
        <BoardTableContainer>
          <RowSpan>
            <ColSpan2 style={{marginTop: 20, paddingLeft: 0}}>
              {/*<Checkbox label={'전체'}*/}
              {/*          type={'c'}*/}
              {/*          id={'AllSelect'}*/}
              {/*          isChecked={checkboxAllSelect}*/}
              {/*          onChange={(e)=> handlePaymentCheckAll(e)}*/}
              {/*/>*/}
              <StatusBtn type={'button'} id={'REFUND_REQUEST_OF_USER'} onClick={(event)=> handlePaymentStatus(event.currentTarget.id)}>환불완료</StatusBtn>
            </ColSpan2>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
              <SearchAdvertiser title={'이력 추가'} btnStyle={'historyAddButton'} onSubmit={handleHistoryAdd}/>
            </div>
          </RowSpan>
          {/*<Table columns={costPaymentColumns}*/}
          {/*       data={costPaymentDataAtom}*/}
          {/*       idProperty="id"*/}
          {/*       selected={checkboxAllSelect}*/}
          {/*       checkboxColumn={checkboxColumn} //체크박스 커스텀*/}
          {/*       onSelectionChange={paymentStatusSelected} // 선택한 체크박스 정보 가져오기*/}
          {/*       emptyText={'결제 현황 내역이 없습니다.'}*/}
          {/*       showHoverRows={false}*/}
          {/*       dataCallback={dataCallback}*/}
          {/*/>*/}
          <BoardSearchResultTitle style={{alignItems:"end", paddingBottom: "10px"}}>
            <div>
              <TotalCount><span/>총 <span>{totalInfo}</span> 건의 결제 내역</TotalCount>
            </div>
            <div>
              <SaveExcelButton>엑셀 저장</SaveExcelButton>
            </div>
          </BoardSearchResultTitle>
          <ReactDataGrid
            licenseKey={process.env.REACT_APP_DATA_GRID_LICENSE_KEY}
            handle={null}
            columns={costPaymentColumns}
            dataSource={dataCallback}
            checkboxColumn={checkboxColumn} //체크박스 커스텀
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

export default AdvertisingPayments

