import Navigator from "../../components/common/Navigator";
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
import {adverEventPriceColumns, adverEventPriceSetting, budgetEventDataAtom} from "./entity";
import {ToastContainer} from "react-toastify";


function BudgetEvent() {
  const [budgetEventDataState, setBudgetEventDataState] = useAtom(budgetEventDataAtom)
  const [searchParams, setSearchParams] = useState('')
  useEffect(() => {
  }, [])
  const handleSearch = (event) => {
    setSearchParams(event.target.value)
  }
  return (
    <>
      <Navigator/>
      <Board>
        <BoardHeader>이벤트 예산 현황</BoardHeader>
        <BoardSearchDetail>
          <RowSpan>
            <ColSpan1>
              <Input style={{width: 300}}
                     placeholder={'광고주 명 및 아이디 검색'}
                     value={searchParams}
                     onChange={handleSearch}
              />
              <DefaultButton>검색</DefaultButton>
            </ColSpan1>
          </RowSpan>
        </BoardSearchDetail>
        <BoardTableContainer>
          <Table columns={adverEventPriceColumns}
                 settings={adverEventPriceSetting}
                 data={budgetEventDataState}
                 showHoverRows={false}
                 activeCell={[0]}
                 emptyText={'이벤트 예산 현황 내역이 없습니다.'}/>
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
