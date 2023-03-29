import Navigator from "../../components/common/Navigator";
import {
  Board, BoardContainer,
  BoardHeader,
  BoardSearchDetail,
  BoardTableContainer,
  ColSpan1,
  DefaultButton,
  Input,
  RowSpan, TitleContainer
} from "../../assets/GlobalStyles";
import React, {useEffect, useState} from "react";
import {useAtom} from "jotai";
import Table from "../../components/table";
import {adverEventBudgetColumns,  budgetEventDataAtom} from "./entity";
import {ToastContainer} from "react-toastify";
import {selAdverBudgetEventList, selAdverPriceEventList} from "../../services/SettingsAxios";


function BudgetEvent() {
  const [budgetEventDataState, setBudgetEventDataState] = useAtom(budgetEventDataAtom)
  const [searchParams, setSearchParams] = useState({ keyword:''})

  useEffect(() => {
    selAdverBudgetEventList(searchParams).then(response => {
      setBudgetEventDataState(response)
    })
  }, [])
  const handleSearch = (event) => {
    setSearchParams({
      ...searchParams,
      keyword:event.target.value
    })
  }
  /**
   * 광고주 명 및 아이디 검색
   */
  const onSearchAdverEventBudget =() =>{
    selAdverPriceEventList(searchParams).then(response =>{
      setBudgetEventDataState(response)
    })
  }
  return (
    <>
      <Board>
        <BoardHeader>이벤트 예산 현황</BoardHeader>
        <BoardSearchDetail>
          <RowSpan>
            <ColSpan1>
              <Input style={{width: 300}}
                     placeholder={'광고주 명 및 아이디 검색'}
                     value={searchParams.keyword}
                     onChange={handleSearch}
              />
              <DefaultButton onClick={onSearchAdverEventBudget}>검색</DefaultButton>
            </ColSpan1>
          </RowSpan>
        </BoardSearchDetail>
        <BoardTableContainer>
          { budgetEventDataState !== null &&
          <Table columns={adverEventBudgetColumns}
                 data={budgetEventDataState.eventDtos}
                 showHoverRows={false}
                 activeCell={[0]}
                 emptyText={'이벤트 예산 현황 내역이 없습니다.'}/>
          }
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
export default BudgetEvent
