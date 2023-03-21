import Select from "react-select";
import Navigator from "../../components/common/Navigator";
import {BoardTableContainer, inputStyle} from "../../assets/GlobalStyles";
import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import ko from "date-fns/locale/ko";
import React, {useEffect, useState, useCallback} from "react";
import {useAtom} from "jotai";
import {
  AgentType,
  Board,
  BoardContainer,
  BoardHeader,
  BoardSearchDetail, CalendarBox, CalendarIcon,
  ColSpan1, ColSpan2, ColSpan3,
  ColTitle, CustomDatePicker, DateContainer,
  RowSpan, SearchButton, SearchInput,
  TitleContainer
} from "../../assets/GlobalStyles";
import Checkbox from "../../components/common/Checkbox";
import Table from "../../components/table";
import {
  searchAccountParams,
  searchAccountType, accountConfirmColumns, accountConfirmSetting, accountUpdateInvoiceStatus, accountHistoryDataAtom
} from "./entity";
import {getToDay} from "../../common/DateUtils";
import {dateFormat} from "../../common/StringUtils";
import {accountHistoryTableData, accountUpdateInvoiceRecord} from "../../services/AccountAxios";
import {toast, ToastContainer} from "react-toastify";
import styled from "styled-components";

function AccountConfirm() {
  const [dateRange, setDateRange] = useState([new Date(getToDay()), new Date(getToDay())]);
  const [startDate, endDate] = dateRange
  const [accountHistoryDataState, setAccountHistoryDataState] = useAtom(accountHistoryDataAtom)
  const [searchAccountHistoryParamsState, setSearchAccountHistoryParamsState] = useState(searchAccountParams)
  const accountTypeSelect = useState(searchAccountType)

  const [isCheckedAll, setIsCheckedAll] = useState(false)
  const [updateInvoiceStatusParams, setUpdateInvoiceStatusParams] = useState(accountUpdateInvoiceStatus)
  const [searchSelected, setSearchSelected] = useState(accountTypeSelect[0])

  useEffect(() => {
    setSearchAccountHistoryParamsState({
      ...searchAccountHistoryParamsState,
      startAt: dateFormat(startDate, 'YYYY-MM'),
      endAt: dateFormat(endDate, 'YYYY-MM'),
    })
  },[dateRange])

  useEffect(() => {
    handleHistoryTableData()
  }, [])

  useEffect(() => {
    updateInvoiceStatusParams.invoiceStatus !== '' && updateInvoice(updateInvoiceStatusParams)
  }, [updateInvoiceStatusParams.invoiceStatus])

  useEffect(() => {
    if(searchAccountHistoryParamsState.statusList.length == 7) {
      setIsCheckedAll(true)
    } else {
      setIsCheckedAll(false)
    }
  },[searchAccountHistoryParamsState.statusList.length])
  /**
   * 이벤트 유형 선택
   * @param event
   */
  const handleRangeDate = (date) => {
    setDateRange(date)
  }
  const handleHistoryTableData = async() => { //테이블 데이터 호출 (어드민 권한은 username 없이 조회)
    await accountHistoryTableData(null, searchAccountHistoryParamsState)
      .then(response => {
      response !== null ? setAccountHistoryDataState(response) : setAccountHistoryDataState([])
    })
    handleInvoiceStatus('')
    setInvoiceStatusSelected([])
    setCheckboxAllSelect(false)
  }
  const dataCallback = useCallback( handleHistoryTableData , [accountHistoryDataState])

  const updateInvoice = (params) => {
    confirmAlert({
      title: '알림',
      message: '변경 하시겠습니까?',
      buttons: [
        {
          label: '확인',
          onClick: () => {
            accountUpdateInvoiceRecord(params).then(
              dataCallback
            )
          }
        },{
          label: '취소',
          onClick: () => handleInvoiceStatus('')
        }
      ]
    });
  }

  const handleInvoiceStatus = (event) => {
    setUpdateInvoiceStatusParams({
      ...updateInvoiceStatusParams,
      invoiceStatus: event,
      invoiceIdList: invoiceStatusSelected
    })
  }

  const handleChangeCheckAll = (event) => {
    if(event.target.checked){
      setSearchAccountHistoryParamsState({
        ...searchAccountHistoryParamsState,
        statusList: ['INVOICE_REQUEST', 'EXAMINED_COMPLETED', 'REJECT', 'PAYMENT_COMPLETED', 'WITHHELD_PAYMENT', 'REVENUE_INCREASE', 'REVENUE_DECREASE']
      })
    } else{
      setSearchAccountHistoryParamsState({
        ...searchAccountHistoryParamsState,
        statusList: []
      })
    }
    setIsCheckedAll(event.target.checked)
  }

  const handleChangeChecked = (event) => {
    //체크박스 핸들링
    if(event.currentTarget.checked){
      setSearchAccountHistoryParamsState({
        ...searchAccountHistoryParamsState,
        statusList: searchAccountHistoryParamsState.statusList.concat(event.currentTarget.id)
      })
    }else{
      setSearchAccountHistoryParamsState({
        ...searchAccountHistoryParamsState,
        statusList: searchAccountHistoryParamsState.statusList.filter(id => id !== event.currentTarget.id)
      })
    }
  }

  const handleAccountSearchTypeByHistory = (selectSearchType) => {
    setSearchAccountHistoryParamsState({
      ...searchAccountHistoryParamsState,
      searchType: selectSearchType.value
    })
    setSearchSelected(selectSearchType)
  }

  const handleAccountSearchValueByHistory = (event) => {
    setSearchAccountHistoryParamsState({
      ...searchAccountHistoryParamsState,
      search: event.target.value
    })
  }

  const handleSearchButton = () => {
    handleHistoryTableData()
  }

  const [invoiceStatusSelected, setInvoiceStatusSelected] = useState([])
  const [checkboxAllSelect, setCheckboxAllSelect] = useState(false);
  const disabledArr = ['REJECT', 'PAYMENT_COMPLETED', 'WITHHELD_PAYMENT', 'REVENUE_INCREASE', 'REVENUE_DECREASE']
  const handleInvoiceCheckAll = (event) => { // 상태 변경 전체 체크
    if(event.target.checked){
      let allArr = accountHistoryDataState.filter(obj => !disabledArr.includes(obj.status)).map(data => {return data.id})
      setInvoiceStatusSelected(allArr)
      if(allArr.length !== 0) {
        setCheckboxAllSelect(true)
      } else {
        setCheckboxAllSelect(false)
        toast.warning('상태 변경 불가.')
      }
    } else{
      setInvoiceStatusSelected([])
      setCheckboxAllSelect(false)
    }

  }
  const handleInvoiceStatusCheckbox = (e,cellProps) => { // 테이블 체크박스 핸들링
    if(e.currentTarget.checked){
      setInvoiceStatusSelected([...invoiceStatusSelected.concat(cellProps.data.id)])
    } else {
      setInvoiceStatusSelected([...invoiceStatusSelected.filter(id => id !== cellProps.data.id)])
      setCheckboxAllSelect(false)
    }
  }

  const checkboxColumn = { // 테이블 체크박스 커스텀
    renderCheckbox: (checkboxProps, cellProps) => {
      return (
          <Checkbox label={''}
                    type={'a'}
                    disabled={disabledArr.includes(cellProps.data.status)}
                    isChecked={invoiceStatusSelected.includes(cellProps.data.id) ? true : false}
                    onChange={ e => {
                       handleInvoiceStatusCheckbox(e, cellProps)
                    }}/>
      );

    }
  }

  return (
    <main>
      <BoardContainer>
        <TitleContainer>
          <h1>정산 관리</h1>
          <Navigator/>
        </TitleContainer>
        <Board>
          <BoardHeader>정산 심사</BoardHeader>
          <BoardSearchDetail>
            {/*line1*/}
            <RowSpan>
              <ColSpan1>
                <ColTitle><span>기간</span></ColTitle>
                <div style={{width: '100%'}}>
                  <DateContainer>
                    <CalendarBox>
                      <CalendarIcon/>
                    </CalendarBox>
                    <CustomDatePicker
                      selectsRange={true}
                      startDate={startDate}
                      endDate={endDate}
                      maxDate={new Date()}
                      onChange={(date) => handleRangeDate(date)}
                      showMonthYearPicker
                      dateFormat="yyyy-MM"
                      locale={ko}
                      isClearable={false}
                    />
                  </DateContainer>
                </div>
              </ColSpan1>
              <ColSpan3>
                <ColTitle><span>신청 상태</span></ColTitle>
                <div>
                  <AgentType>
                    <Checkbox label={'전체'}
                              type={'c'}
                              id={'ALL'}
                              isChecked={isCheckedAll}
                              onChange={handleChangeCheckAll}
                    />
                    <Checkbox label={'정산 신청'}
                              type={'c'}
                              id={'INVOICE_REQUEST'}
                              isChecked={searchAccountHistoryParamsState.statusList.includes('INVOICE_REQUEST')}
                              onChange={handleChangeChecked}/>
                    <Checkbox label={'심사 완료'}
                              type={'c'}
                              id={'EXAMINED_COMPLETED'}
                              isChecked={searchAccountHistoryParamsState.statusList.includes('EXAMINED_COMPLETED')}
                              onChange={handleChangeChecked}/>
                    <Checkbox label={'반려'}
                              type={'c'}
                              id={'REJECT'}
                              isChecked={searchAccountHistoryParamsState.statusList.includes('REJECT')}
                              onChange={handleChangeChecked}/>
                    <Checkbox label={'지급 완료'}
                              type={'c'}
                              id={'PAYMENT_COMPLETED'}
                              isChecked={searchAccountHistoryParamsState.statusList.includes('PAYMENT_COMPLETED')}
                              onChange={handleChangeChecked}/>
                    <Checkbox label={'지급 보류'}
                              type={'c'}
                              id={'WITHHELD_PAYMENT'}
                              isChecked={searchAccountHistoryParamsState.statusList.includes('WITHHELD_PAYMENT')}
                              onChange={handleChangeChecked}/>
                    <Checkbox label={'수익 증가'}
                              type={'c'}
                              id={'REVENUE_INCREASE'}
                              isChecked={searchAccountHistoryParamsState.statusList.includes('REVENUE_INCREASE')}
                              onChange={handleChangeChecked}/>
                    <Checkbox label={'수익 감소'}
                              type={'c'}
                              id={'REVENUE_DECREASE'}
                              isChecked={searchAccountHistoryParamsState.statusList.includes('REVENUE_DECREASE')}
                              onChange={handleChangeChecked}/>
                  </AgentType>
                </div>
              </ColSpan3>


            </RowSpan>
            <RowSpan>
              <ColSpan2>
                <Select styles={inputStyle}
                        components={{IndicatorSeparator: () => null}}
                        options={accountTypeSelect}
                        value={searchSelected}
                        onChange={handleAccountSearchTypeByHistory}
                />
                <SearchInput>
                  <input type={'text'}
                         placeholder={'검색할 매체명을 입력해주세요.'}
                         value={searchAccountHistoryParamsState.search}
                         onChange={handleAccountSearchValueByHistory}
                  />
                </SearchInput>
              </ColSpan2>
              <ColSpan2>
                <SearchButton onClick={handleSearchButton}>검색</SearchButton>
              </ColSpan2>
            </RowSpan>
          </BoardSearchDetail>
          <BoardTableContainer>
            <ColSpan2 style={{marginTop: 20, paddingLeft: 0}}>
              <Checkbox label={'전체'}
                        type={'c'}
                        id={'AllSelect'}
                        isChecked={checkboxAllSelect}
                        onChange={(e)=> handleInvoiceCheckAll(e)}
              />
              {/*<InvoiceStatusBtn type={'button'} id={'INVOICE_REQUEST'} onClick={(event)=> handleInvoiceStatus(event.currentTarget.id)}>정산신청</InvoiceStatusBtn>*/}
              <InvoiceStatusBtn type={'button'} id={'EXAMINED_COMPLETED'} onClick={(event)=> handleInvoiceStatus(event.currentTarget.id)}>심사완료</InvoiceStatusBtn>
              <InvoiceStatusBtn type={'button'} id={'REJECT'} onClick={(event)=> handleInvoiceStatus(event.currentTarget.id)}>반려</InvoiceStatusBtn>
              <InvoiceStatusBtn type={'button'} id={'PAYMENT_COMPLETED'} onClick={(event)=> handleInvoiceStatus(event.currentTarget.id)}>지급완료</InvoiceStatusBtn>
              <InvoiceStatusBtn type={'button'} id={'WITHHELD_PAYMENT'} onClick={(event)=> handleInvoiceStatus(event.currentTarget.id)}>지급보류</InvoiceStatusBtn>
              {/*<InvoiceStatusBtn type={'button'} id={'REVENUE_INCREASE'} onClick={(event)=> handleInvoiceStatus(event.currentTarget.id)}>수익증가</InvoiceStatusBtn>*/}
              {/*<InvoiceStatusBtn type={'button'} id={'REVENUE_DECREASE'} onClick={(event)=> handleInvoiceStatus(event.currentTarget.id)}>수익감소</InvoiceStatusBtn>*/}
            </ColSpan2>
            <Table columns={accountConfirmColumns}
                   data={accountHistoryDataState}
                   settings={accountConfirmSetting}
                   idProperty="id"
                   selected={checkboxAllSelect}
                   checkboxColumn={checkboxColumn} //체크박스 커스텀
                   onSelectionChange={invoiceStatusSelected} // 선택한 체크박스 정보 가져오기
                   showZebraRows={false}
                   emptyText={'정산 심사 내역이 없습니다.'}
                   />
          </BoardTableContainer>
        </Board>
      </BoardContainer>
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
    </main>
  )
}

export default AccountConfirm

const InvoiceStatusBtn = styled.button`
  padding: 0 10px;
  display: flex;
  align-items: center;
  background-color: #f9fafb;
  height: 35px;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
`
