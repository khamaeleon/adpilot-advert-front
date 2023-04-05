import {
  Board,
  BoardHeader,
  BoardSearchDetail,
  BoardTableContainer,
  CancelButton,
  ColSpan0,
  ColTitle,
  RowSpan,
  SubmitContainer
} from "../../assets/GlobalStyles";
import React, {useEffect, useState} from "react";
import {useAtom} from "jotai";
import Table from "../../components/table";
import {ToastContainer} from "react-toastify";
import {dateFormat} from "../../common/StringUtils";
import {useLocation, useNavigate} from "react-router-dom";
import {selBudgetEventList} from "../../services/SettingsAxios";
import SettingAdd from "../../components/common/SettingModal";
import {modalController} from "../../store";
import {budgetEventDetailColumns, eventBudgetDetailDataAtom} from "./entity/budgetEvent";


function BudgetEventDetail() {
  const [eventBudgetDetailDataState, setEventBudgetDetailDataState] = useAtom(eventBudgetDetailDataAtom)
  const navigate = useNavigate()
  const [, setModal] = useAtom(modalController)
  const [saveTypeState] =useState('create')
  const {state} =useLocation()

  useEffect(() => {
    selBudgetEventList(state.id).then(response => {
      setEventBudgetDetailDataState(response)
    })
  }, [])

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
          <BoardTableContainer>
            <table>
              <thead>
              <tr>
                <th>광고주명</th>
                <th>아이디</th>
                <th>담당자</th>
              </tr>
              </thead>
              {
                eventBudgetDetailDataState !==null &&
                <tbody>
                  <tr>
                    <td>{eventBudgetDetailDataState.adverName}</td>
                    <td>{eventBudgetDetailDataState.username}</td>
                    <td>{eventBudgetDetailDataState.managerName}</td>
                  </tr>
                </tbody>
              }
            </table>
          </BoardTableContainer>
        </BoardSearchDetail>
        <BoardTableContainer>
          <RowSpan style={{marginTop: 0, justifyContent: 'flex-end'}}>
            <SettingAdd title={'추가'} saveType={saveTypeState} data={null} label={'pct'}/>
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
