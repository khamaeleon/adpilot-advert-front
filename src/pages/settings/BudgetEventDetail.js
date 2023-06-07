import {
  Board,
  BoardHeader,
  BoardSearchDetail,
  BoardTableContainer,
  BoardTableCustomContainer,
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
import SettingAdd from "../../components/common/SettingModal";
import {budgetEventDetailColumns, eventBudgetDetailDataAtom} from "./entity/BudgetEvent";
import {selBudgetEventList} from "../../services/settings/BudgetEventAxios";

function BudgetEventDetail() {
  const [eventBudgetDetailDataState, setEventBudgetDetailDataState] = useAtom(eventBudgetDetailDataAtom)
  const navigate = useNavigate()
  const [saveTypeState] = useState('create')
  const {state} = useLocation()

  useEffect(() => {
    if(state !== null && state.id !== undefined){
      selBudgetEventList(state.id).then(response => {
        if(response !== null && response?.length !==0){
          setEventBudgetDetailDataState(response)
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Board>
        <BoardHeader>타겟팅 예산 기본 정보</BoardHeader>
        <BoardSearchDetail>
          <RowSpan style={{marginTop: 0, justifyContent: 'flex-end'}}>
            <ColSpan0>
              <ColTitle>최근 수정</ColTitle>
              <div>{dateFormat(eventBudgetDetailDataState !== null && eventBudgetDetailDataState.lastModifiedAt, 'YYYY.MM.DD HH:mm')}</div>
            </ColSpan0>
          </RowSpan>
          <BoardTableCustomContainer>
            <table>
              <thead>
              <tr>
                <th>광고주명</th>
                <th>아이디</th>
                <th>담당자</th>
              </tr>
              </thead>
              {
                eventBudgetDetailDataState !== null &&
                <tbody>
                <tr>
                  <td>{eventBudgetDetailDataState.adverName}</td>
                  <td>{eventBudgetDetailDataState.username}</td>
                  <td>{eventBudgetDetailDataState.managerName}</td>
                </tr>
                </tbody>
              }
            </table>
          </BoardTableCustomContainer>
        </BoardSearchDetail>
        <BoardTableContainer>
          <RowSpan style={{marginTop: 0, justifyContent: 'flex-end'}}>
            <SettingAdd title={'추가'} saveType={saveTypeState} data={null} label={'pct'}/>
          </RowSpan>
          <div>
            총 <span>{eventBudgetDetailDataState !== null && eventBudgetDetailDataState.totalCount}</span>건
          </div>
          {eventBudgetDetailDataState !== null &&
            <Table columns={budgetEventDetailColumns}
                   data={eventBudgetDetailDataState?.targetingBudgetDtos}
                   showHoverRows={false}
                   activeCell={[0]}
                   emptyText={'타겟팅 예산 관리 내역이 없습니다.'}/>
          }
        </BoardTableContainer>
        <SubmitContainer>
          <CancelButton onClick={() => navigate('/board/budgetEvent')}>목록</CancelButton>
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
