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
import {adverTimeBudgetColumns, budgetTimeDataAtom} from "./entity/BudgetTime";
import {selBudgetTimeAdverList} from "../../services/settings/BudgetTimeAxios";

function BudgetTime() {
  const [budgetTimeAdverDataState, setBudgetTimeAdverDataState] = useAtom(budgetTimeDataAtom)
  const [searchParams, setSearchParams] = useState({ keyword:''})

  useEffect(() => {
    selBudgetTimeAdverList(searchParams).then(response =>{
      if(response){
        setBudgetTimeAdverDataState(response)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleSearch = (event) => {
    setSearchParams({
      ...searchParams,
      keyword:event.target.value
    })
  }

  const onSearchAdverBudgetTime =() =>{
    selBudgetTimeAdverList(searchParams).then(response =>{
      if(response){
        setBudgetTimeAdverDataState(response)
      }
    })
  }
  return (
    <>
      <Board>
        <BoardHeader>시간별 예산 현황</BoardHeader>
        <RowSpan>
          <ColSpan1 style={{paddingLeft:0}}>
            <Input style={{width: 300}}
                   placeholder={'광고주명 및 아이디 검색'}
                   value={searchParams.keyword}
                   onChange={handleSearch}
                   onKeyDown={e => (e.code === 'Enter') && onSearchAdverBudgetTime() }
            />
            <DefaultButton onClick={onSearchAdverBudgetTime}>검색</DefaultButton>
          </ColSpan1>
        </RowSpan>
        <BoardTableContainer>
          { budgetTimeAdverDataState !== null &&
          <Table columns={adverTimeBudgetColumns}
                 data={budgetTimeAdverDataState?.userDtos}
                 totalCount={[budgetTimeAdverDataState.totalCount, '광고주']}
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
