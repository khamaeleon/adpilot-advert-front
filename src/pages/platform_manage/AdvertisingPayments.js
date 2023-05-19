import {Board, BoardHeader, BoardTableContainer, ColSpan2, RowSpan} from "../../assets/GlobalStyles";
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
import {getToDay} from "../../common/DateUtils";
import {SearchAdvertiser} from "../../components/common/SearchAdvertiser";

const costPaymentDataAtom = atom([{
  name: 'id',
  status: {
    value:"COST_DECREASE"
  }
}])
export const updateCostPaymentStatus = {
  paymentIdList: [],
  paymentStatus: "",
}

/**
 * 결재 관리 현황 조회
 */
export const searchCostPaymentParams = atom({
  startAt: dateFormat(getToDay(), 'YYYY-MM'),
  endAt: dateFormat(getToDay(), 'YYYY-MM'),
  statusList: ['COST_DECREASE', 'COST_DECREASE','REFUND_APPLIED','REFUND_COMPLETE'],
  searchType: 'ALL',
  search: ''
})

/**
 * 결재 관리 리스트 컬럼 설정
 */
export const costPaymentColumns = [
  {
    name: 'id',
    header: 'id',
    defaultVisible: false,
  },
  {
    name: 'recordMonth',
    header: '신청 일시',
    width: 150,
    showColumnMenuTool: false,
    render: ({value}) => {
      return <p>{dateFormat(value, 'YYYY.MM.DD HH:mm')}</p>
    }
  },
  {
    name: 'status',
    header: '신청 상태',
    width: 120,
    showColumnMenuTool: false,
    render: ({value}) => <>{value.label}</>
  },
  {
    name: 'otherData',
    header: '환불 정보',
    showColumnMenuTool: false,
  },
  {
    name: 'username',
    header: '광고주명',
    showColumnMenuTool: false,
  },
  {
    name: 'otherId',
    header: '광고주 아이디',
    showColumnMenuTool: false,
  },
  {
    name: 'requesterId',
    header: '신청 아이디',
    showColumnMenuTool: false,
  },
  {
    name: 'revenueAmount',
    header: '광고비',
    showColumnMenuTool: false,
    render: ({value}) => <p className={'won'}>{decimalFormat(value)}</p>
  },
  {
    name: 'updateAt',
    header: '상태 변경일',
    width: 120,
    showColumnMenuTool: false,
  },
  {
    name: 'etc',
    header: '비고',
    width: 180,
    sortable: false,
    showColumnMenuTool: false,
  }
]

function AdvertisingPayments() {
  const [paymentDataState, setPaymentDataState] = useAtom(costPaymentDataAtom)
  const [searchPaymentParamsState, setSearchPaymentParamsState] = useAtom(searchCostPaymentParams)
  const [updatePaymentStatusParams, setUpdatePaymentStatusParams] = useState(updateCostPaymentStatus)

  useEffect(() => {
  }, [])

  // useEffect(() => {
  //   updatePaymentStatusParams.paymentStatus !== '' && updatePayment(updatePaymentStatusParams)
  // }, [updatePaymentStatusParams.paymentIdList])

  const handlePaymentTableData = async() => { //테이블 데이터 호출 (어드민 권한은 username 없이 조회)
    // const userName = adminInfoState.convertedUser !== '' ? adminInfoState.convertedUser : ''
    // const fetchData = await accountHistoryTableData(userName,searchAccountHistoryParamsState).then(response => {
    //   const data = response
    //   response !== null && setAccountHistoryDataState(response)
    //   return data
    // })
    // return fetchData
    handlePaymentStatus('')
    setPaymentStatusSelected([])
    setCheckboxAllSelect(false)
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

  const dataCallback = useCallback( handlePaymentTableData , [paymentDataState])

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
                    isChecked={paymentStatusSelected.includes(cellProps.data.id)}
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
        <BoardHeader>결제 현황</BoardHeader>
        <PaymentCondition searchType={searchPaymentType} searchCondition={searchPaymentParamsState} setSearchCondition={setSearchPaymentParamsState} handleTableData={handlePaymentTableData} />
        <BoardTableContainer>
          <RowSpan>
            <ColSpan2 style={{marginTop: 20, paddingLeft: 0}}>
              <Checkbox label={'전체'}
                        type={'c'}
                        id={'AllSelect'}
                        isChecked={checkboxAllSelect}
                        onChange={(e)=> handlePaymentCheckAll(e)}
              />
              <StatusBtn type={'button'} id={'EXAMINED_COMPLETED'} onClick={(event)=> handlePaymentStatus(event.currentTarget.id)}>환불완료</StatusBtn>
            </ColSpan2>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
              <SearchAdvertiser title={'이력 추가'} btnStyle={'historyAddButton'} onSubmit={handleHistoryAdd}/>
            </div>
          </RowSpan>
          <Table columns={costPaymentColumns}
                 data={costPaymentDataAtom}
                 idProperty="id"
                 selected={checkboxAllSelect}
                 checkboxColumn={checkboxColumn} //체크박스 커스텀
                 onSelectionChange={paymentStatusSelected} // 선택한 체크박스 정보 가져오기
                 emptyText={'결제 현황 내역이 없습니다.'}
                 showHoverRows={false}
                 dataCallback={dataCallback}
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

