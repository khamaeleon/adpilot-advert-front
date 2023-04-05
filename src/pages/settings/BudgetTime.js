import {
  Board,
  BoardHeader,
  BoardSearchDetail,
  BoardTableContainer,
  ColSpan1,
  DefaultButton,
  Input,
  RowSpan
} from "../../assets/GlobalStyles";
import React, {useEffect, useState} from "react";
import {useAtom} from "jotai";
import Table from "../../components/table";
import {ToastContainer} from "react-toastify";
import {selAdverBudgetEventList, selAdverPriceEventList} from "../../services/SettingsAxios";
import {adverTimeBudgetColumns, budgetTimeDataAtom} from "./entity/budgetTime";

function BudgetTime() {
  const [budgetTimeDataState, setBudgetTimeDataState] = useAtom(budgetTimeDataAtom)
  const [searchParams, setSearchParams] = useState({ keyword:''})

  useEffect(() => {
    selAdverBudgetEventList(searchParams).then(response => {
      setBudgetTimeDataState(response)
    })
  }, [])
  const handleSearch = (event) => {
    setSearchParams({
      ...searchParams,
      keyword:event.target.value
    })
  }

  const onSearchAdverEventBudget =() =>{
    console.log(searchParams)
    selAdverPriceEventList(searchParams).then(response =>{
      setBudgetTimeDataState(response)
    })
  }
  return (
    <>
      <Board>
        <BoardHeader>시간별 예산 현황</BoardHeader>
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
          { budgetTimeDataState !== null &&
          <Table columns={adverTimeBudgetColumns}
                 data={budgetTimeDataState.eventDtos}
                 showHoverRows={false}
                 activeCell={[0]}
                 emptyText={'시간 예산 현황 내역이 없습니다.'}/>
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
export default BudgetTime
