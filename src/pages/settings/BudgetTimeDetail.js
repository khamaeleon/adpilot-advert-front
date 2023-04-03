import Navigator from "../../components/common/Navigator";
import {
  Board,
  BoardContainer,
  BoardHeader,
  BoardSearchDetail,
  BoardTableContainer,
  CancelButton,
  ColSpan0,
  ColSpan1,
  ColTitle,
  RowSpan,
  SubmitContainer,
  TitleContainer
} from "../../assets/GlobalStyles";
import React, {useEffect} from "react";
import {useAtom} from "jotai";
import Table from "../../components/table";
import {budgetTimeDetailColumns, timeBudgetDetailDataAtom,} from "./entity";
import {ToastContainer} from "react-toastify";
import {dateFormat} from "../../common/StringUtils";
import {useLocation, useNavigate} from "react-router-dom";
import {selBudgetEventList} from "../../services/SettingsAxios";
import SettingAdd from "../../components/common/SettingModal";


function BudgetTimeDetail() {
  const [timeBudgetDetailDataState, setTimeBudgetDetailDataState] = useAtom(timeBudgetDetailDataAtom)
  const navigate = useNavigate()
  const {state} =useLocation()
  useEffect(() => {
    selBudgetEventList(state.id).then(response => {
      console.log(response)
      setTimeBudgetDetailDataState(response)
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
      <Board>
        <BoardHeader>시간별 예산 기본 정보</BoardHeader>
        <BoardSearchDetail>
          <RowSpan style={{marginTop: 0, justifyContent: 'flex-end'}}>
            <ColSpan0>
              <ColTitle>최근 수정</ColTitle>
              <div>{dateFormat(timeBudgetDetailDataState !==null && timeBudgetDetailDataState.lastModifiedAt, 'YYYY.MM.DD HH:mm')}</div>
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
              { timeBudgetDetailDataState !==null &&
                <tbody>
                <tr>
                  <td>{timeBudgetDetailDataState.adverName}</td>
                  <td>{timeBudgetDetailDataState.username}</td>
                  <td>{timeBudgetDetailDataState.managerName}</td>
                </tr>
                </tbody>
              }

            </table>
          </BoardTableContainer>
        </BoardSearchDetail>
        <BoardTableContainer>
          <RowSpan style={{marginTop: 0, justifyContent: 'flex-end'}}>
            <SettingAdd title={'추가'} onSubmit={handleOnSubmit} type={'create'} data={null} btnStyle={'AccountButton'}/>
          </RowSpan>
          <div>
            총 <span>{timeBudgetDetailDataState !==null && timeBudgetDetailDataState.totalCount}</span>건
          </div>
          {timeBudgetDetailDataState !==null &&
            <Table columns={budgetTimeDetailColumns}
                   data={timeBudgetDetailDataState?.budgetEventDtos}
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
export default BudgetTimeDetail
