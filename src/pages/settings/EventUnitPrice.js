import {
  Board,
  BoardHeader,
  BoardSearchDetail,
  BoardTableContainer,
  ColSpan1,
  DefaultButton,
  Input,
  RowSpan,
} from "../../assets/GlobalStyles";
import React, {useEffect, useState} from "react";
import {useAtom} from "jotai";
import Table from "../../components/table";
import {ToastContainer} from "react-toastify";
import {adverEventPriceColumns, eventUnitPriceDataAtom} from "./entity/EventPrice";
import {selAdverPriceEventList} from "../../services/settings/EventPriceAxios";

function EventUnitPrice() {
  const [eventUnitPriceDataState, setEventUnitPriceDataState] = useAtom(eventUnitPriceDataAtom)
  const [searchParams, setSearchParams] = useState({ keyword:''})
  useEffect(() => {
    selAdverPriceEventList(searchParams).then(response =>{
      setEventUnitPriceDataState(response)
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
  const onSearchAdverEventPrice =() =>{
    selAdverPriceEventList(searchParams).then(response =>{
      setEventUnitPriceDataState(response)
    })
  }
  return (
    <main>
      <>
      <Board>
        <BoardHeader>이벤트 단가 현황</BoardHeader>
        <BoardSearchDetail>
          <RowSpan>
            <ColSpan1>
              <Input style={{width: 300}}
                     placeholder={'광고주명 및 아이디 검색'}
                     value={searchParams.keyword}
                     onChange={handleSearch}
                     onKeyDown={e => (e.code === 'Enter') && onSearchAdverEventPrice() }

              />
              <DefaultButton onClick={onSearchAdverEventPrice}>검색</DefaultButton>
            </ColSpan1>
          </RowSpan>
        </BoardSearchDetail>
        <BoardTableContainer>
          { eventUnitPriceDataState !== null &&
            <Table columns={adverEventPriceColumns}
                   data={eventUnitPriceDataState.eventDtos}
                   showHoverRows={false}
                   activeCell={[0]}
                   emptyText={'이벤트 단가 현황 내역이 없습니다.'}/>
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
    </main>
  )
}
export default EventUnitPrice
