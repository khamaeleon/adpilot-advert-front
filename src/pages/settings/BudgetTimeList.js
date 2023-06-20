import {
  Board,
  BoardHeader,
  BoardSearchDetail,
  BoardTableContainer,
  BoardTableCustomContainer,
  CancelButton,
  ColSpan0,
  ColTitle,
  DefaultButton,
  RowSpan,
  SubmitContainer
} from "../../assets/GlobalStyles";
import React, {useEffect} from "react";
import {useAtom} from "jotai";
import Table from "../../components/table";
import {ToastContainer} from "react-toastify";
import {dateFormat} from "../../common/StringUtils";
import {useLocation, useNavigate} from "react-router-dom";
import {budgetTimeDetailColumns, budgetTimeListAtom} from "./entity/BudgetTime";
import {selBudgetTimeList} from "../../services/settings/BudgetTimeAxios";

function EventTimeList() {
  const [budgetTimeListState, setBudgetTimeListState] = useAtom(budgetTimeListAtom)
  const navigate = useNavigate()
  const {state} = useLocation()
  useEffect(() => {
    selBudgetTimeList(state.id).then(response => {
      if(response){
        setBudgetTimeListState(response)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const resistBudgetTimes = () =>{
    navigate('/board/budgetTimeDetail',{state: {id:budgetTimeListState.userId, listCount:budgetTimeListState.totalCount }})
  }
  return (
    <>
      <Board>
        <BoardHeader>시간별 예산 기본 정보</BoardHeader>
        <RowSpan style={{justifyContent: 'flex-end'}}>
          <ColSpan0>
            <ColTitle>최근 수정</ColTitle>
            <div>{dateFormat(budgetTimeListState !==null && budgetTimeListState.lastModifiedAt, 'YYYY.MM.DD HH:mm')}</div>
          </ColSpan0>
        </RowSpan>
        <BoardTableCustomContainer>
          <table>
            <colgroup>
              <col width={'33%'} />
              <col width={'33%'} />
              <col width={'33%'} />
            </colgroup>
            <thead>
            <tr>
              <th>광고주명</th>
              <th>아이디</th>
              <th>담당자</th>
            </tr>
            </thead>
            {
              budgetTimeListState !==null &&
              <tbody>
              <tr>
                <td>{budgetTimeListState.adverName}</td>
                <td>{budgetTimeListState.username}</td>
                <td>{budgetTimeListState.managerName}</td>
              </tr>
              </tbody>
            }
          </table>
        </BoardTableCustomContainer>
        <BoardTableContainer>
          <RowSpan style={{justifyContent: 'flex-end'}}>
            <DefaultButton type={'button'} onClick={resistBudgetTimes}>추가</DefaultButton>
          </RowSpan>
          {budgetTimeListState !==null &&
            <Table columns={budgetTimeDetailColumns}
                   totalCount={[budgetTimeListState.totalCount, '시간별 예산 그룹']}
                   data={budgetTimeListState?.timeGroups}
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
export default EventTimeList
