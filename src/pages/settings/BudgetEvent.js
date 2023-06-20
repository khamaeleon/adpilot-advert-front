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
import {adverEventBudgetColumns, budgetEventDataAtom} from "./entity/BudgetEvent";
import {selAdverBudgetEventList} from "../../services/settings/BudgetEventAxios";
import {selAdverPriceEventList} from "../../services/settings/EventPriceAxios";

function BudgetEvent() {
  const [budgetEventDataState, setBudgetEventDataState] = useAtom(budgetEventDataAtom)
  const [searchParams, setSearchParams] = useState({ keyword:''})

  useEffect(() => {
    selAdverBudgetEventList(searchParams).then(response => {
      setBudgetEventDataState(response)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <BoardHeader>타겟팅 예산 현황</BoardHeader>
        <RowSpan>
          <ColSpan1 style={{paddingLeft:0}}>
            <Input style={{width: 300}}
                   placeholder={'광고주명 및 아이디 검색'}
                   value={searchParams.keyword}
                   onChange={handleSearch}
                   onKeyDown={e => (e.code === 'Enter') && onSearchAdverEventBudget() }
            />
            <DefaultButton onClick={onSearchAdverEventBudget}>검색</DefaultButton>
          </ColSpan1>
        </RowSpan>
        <BoardTableContainer>
          { budgetEventDataState !== null &&
            <Table columns={adverEventBudgetColumns}
                   data={budgetEventDataState?.userDtos}
                   totalCount={[budgetEventDataState.totalCount, '광고주']}
                   emptyText={'타겟팅 예산 현황 내역이 없습니다.'}/>
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
