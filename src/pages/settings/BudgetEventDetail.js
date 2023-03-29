import {
  Board,
  BoardHeader,
  BoardSearchDetail,
  BoardTableContainer,
  CancelButton,
  ColSpan0,
  ColSpan1,
  ColTitle,
  RowSpan,
  SubmitContainer
} from "../../assets/GlobalStyles";
import React, {useEffect, useState} from "react";
import {useAtom} from "jotai";
import Table from "../../components/table";
import {budgetEventDetailColumns, eventBudgetDetailDataAtom,} from "./entity";
import {toast, ToastContainer} from "react-toastify";
import {dateFormat} from "../../common/StringUtils";
import {useLocation, useNavigate} from "react-router-dom";
import {resistBudgetEvent, selBudgetEventList} from "../../services/SettingsAxios";
import SettingAdd from "../../components/common/SettingModal";
import {modalController} from "../../store";


function BudgetEventDetail() {
  const [eventBudgetDetailDataState, setEventBudgetDetailDataState] = useAtom(eventBudgetDetailDataAtom)
  const navigate = useNavigate()
  const [, setModal] = useAtom(modalController)
  const [saveType,setSaveType] =useState('create')
  const {state} =useLocation()

  useEffect(() => {
    selBudgetEventList(state.id).then(response => {
      console.log(response)
      setEventBudgetDetailDataState(response)
    })
  }, [])

  /**
   * 모달에서 수정 추가
   */
  const handleOnSubmit = (data) => {
    console.log(data)
    if(saveType ==='create'){
      resistBudgetEvent({...data,userId:state.id}).then(response => {
        if(response){
          setModal({
            isShow: false,
            modalComponent: null
          })
          selBudgetEventList(state.id).then(response => {
            setEventBudgetDetailDataState(response)
          })
        }
      })
    }else{
      toast.warning("이벤트 예산 그룹명이 중복 되었습니다.")
    }
  }
  return (
    <>
      <Board>
        <BoardHeader>이벤트 예산 기본 정보</BoardHeader>
        <BoardSearchDetail>
          <RowSpan style={{marginTop: 0, justifyContent: 'flex-end'}}>
            <ColSpan0>
              <ColTitle>최근 수정</ColTitle>
              <div>{dateFormat(eventBudgetDetailDataState !==null && eventBudgetDetailDataState.lastModifiedAt, 'YYYY.MM.DD HH:mm')}</div>
            </ColSpan0>
          </RowSpan>
          <RowSpan>
            <ColSpan1>
              <ColTitle>광고주명</ColTitle>
              <div>{eventBudgetDetailDataState !==null && eventBudgetDetailDataState.adverName}</div>
            </ColSpan1>
            <ColSpan1>
              <ColTitle>아이디</ColTitle>
              <div>{eventBudgetDetailDataState !==null && eventBudgetDetailDataState.username}</div>
            </ColSpan1>
            <ColSpan1>
              <ColTitle>담당자</ColTitle>
              <div>{eventBudgetDetailDataState !==null && eventBudgetDetailDataState.managerName}</div>
            </ColSpan1>
          </RowSpan>
        </BoardSearchDetail>
        <BoardTableContainer>
          <RowSpan style={{marginTop: 0, justifyContent: 'flex-end'}}>
            <SettingAdd title={'추가'} onSubmit={handleOnSubmit} type={saveType} data={null} btnStyle={'AccountButton'}/>
          </RowSpan>
          <div>
            총 <span>{eventBudgetDetailDataState !==null && eventBudgetDetailDataState.totalCount}</span>건
          </div>
          {eventBudgetDetailDataState !==null &&
            <Table columns={budgetEventDetailColumns}
                   data={eventBudgetDetailDataState?.budgetEventDtos}
                   showHoverRows={false}
                   activeCell={[0]}
                   emptyText={'이벤트 단가 관리 내역이 없습니다.'}/>
          }
        </BoardTableContainer>
        <SubmitContainer>
          <CancelButton onClick={()=>navigate('/board/settings')}>목록</CancelButton>
        </SubmitContainer>
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
export default BudgetEventDetail
