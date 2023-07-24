import {
  Board,
  BoardHeader,
  BoardTableContainer,
  ColSpan1,
  DefaultButton,
  Input,
  RowSpan,
} from "../../assets/GlobalStyles";
import React, {useEffect, useState} from "react";
import {useAtom} from "jotai";
import Table from "../../components/table";
import {adverEventPriceColumns, eventUnitPriceDataAtom} from "./entity/EventPrice";
import {selAdverPriceEventList} from "../../services/settings/EventPriceAxios";

function EventUnitPrice() {
  const [eventUnitPriceDataState, setEventUnitPriceDataState] = useAtom(eventUnitPriceDataAtom)
  const [searchParams, setSearchParams] = useState({ keyword:''})
  useEffect(() => {
    selAdverPriceEventList(searchParams).then(response =>{
      setEventUnitPriceDataState(response)
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
  const onSearchAdverEventPrice =() =>{
    selAdverPriceEventList(searchParams).then(response =>{
      setEventUnitPriceDataState(response)
    })
  }
  return (
    <main>
      <>
      <Board>
        <BoardHeader>타겟팅 단가 현황</BoardHeader>
        <RowSpan>
          <ColSpan1 style={{paddingLeft:0}}>
            <Input style={{width: 300}}
                   placeholder={'광고주명 및 아이디 검색'}
                   value={searchParams.keyword}
                   onChange={handleSearch}
                   onKeyDown={e => (e.key === 'Enter') && onSearchAdverEventPrice() }

            />
            <DefaultButton onClick={onSearchAdverEventPrice}>검색</DefaultButton>
          </ColSpan1>
        </RowSpan>
        <BoardTableContainer>
          { eventUnitPriceDataState !== null &&
            <Table columns={adverEventPriceColumns}
                   data={eventUnitPriceDataState?.userDtos}
                   totalCount={[eventUnitPriceDataState.totalCount, '광고주']}
                   emptyText={'타겟팅 단가 현황 내역이 없습니다.'}/>
          }
        </BoardTableContainer>
      </Board>

      </>
    </main>
  )
}
export default EventUnitPrice
