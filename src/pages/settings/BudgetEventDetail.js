import Navigator from "../../components/common/Navigator";
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
import React, {useEffect} from "react";
import {useAtom} from "jotai";
import Table from "../../components/table";
import {
  budgetEventDetailColumns,
  eventBudgetDetailDataAtom,
} from "./entity";
import {ToastContainer} from "react-toastify";
import {dateFormat} from "../../common/StringUtils";
import {useLocation, useNavigate} from "react-router-dom";
import {selBudgetEventList, selPriceEventList} from "../../services/SettingsAxios";
import SettingAdd from "../../components/common/SettingModal";


function BudgetEventDetail() {
  const [eventBudgetDetailDataState, setEventBudgetDetailDataState] = useAtom(eventBudgetDetailDataAtom)
  const navigate = useNavigate()
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
  }
  return (
    <>
      <Navigator/>
      <Board>
        <BoardHeader>이벤트 단가 기본 정보</BoardHeader>
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
              <div>{eventBudgetDetailDataState !==null && eventBudgetDetailDataState.brandName}</div>
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
            <SettingAdd title={'추가'} onSubmit={handleOnSubmit} type={'create'} data={null} btnStyle={'AccountButton'}/>
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
