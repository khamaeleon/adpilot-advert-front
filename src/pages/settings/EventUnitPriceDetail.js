import Navigator from "../../components/common/Navigator";
import {
  Board,
  BoardHeader,
  BoardSearchDetail,
  BoardTableContainer, CancelButton, ColSpan0,
  ColSpan1,
  ColTitle,
  RowSpan, SubmitButton, SubmitContainer
} from "../../assets/GlobalStyles";
import React, {useEffect} from "react";
import {useAtom} from "jotai";
import Table from "../../components/table";
import {eventUnitPriceDetailColumns, eventUnitPriceDetailDataAtom, eventUnitPriceDetailSetting} from "./entity";
import {ToastContainer} from "react-toastify";
import {dateFormat} from "../../common/StringUtils";
import {useNavigate} from "react-router-dom";


function EventUnitPriceDetail() {
  const [eventUnitPriceDetailDataState, setEventUnitPriceDetailDataState] = useAtom(eventUnitPriceDetailDataAtom)
  const navigate =useNavigate()
  useEffect(() => {
  }, [])

  return (
    <>
      <Navigator/>
      <Board>
        <BoardHeader>이벤트 단가 기본 정보</BoardHeader>
        <BoardSearchDetail>
          <RowSpan style={{marginTop: 0, justifyContent: 'flex-end'}}>
            <ColSpan0>
              <ColTitle>최근 수정</ColTitle>
              <div>{dateFormat(new Date(), 'YYYY.MM.DD HH:mm')}</div>
            </ColSpan0>
          </RowSpan>
          <RowSpan>
            <ColSpan1>
              <ColTitle>광고주명</ColTitle>
              <div>네이트</div>
            </ColSpan1>
            <ColSpan1>
              <ColTitle>아이디</ColTitle>
              <div>nate9988</div>
            </ColSpan1>
            <ColSpan1>
              <ColTitle>담당자</ColTitle>
              <div>홍길동</div>
            </ColSpan1>
          </RowSpan>

        </BoardSearchDetail>
        <BoardTableContainer>
          <Table columns={eventUnitPriceDetailColumns}
                 data={eventUnitPriceDetailDataState}
                 settings={eventUnitPriceDetailSetting}
                 showHoverRows={false}
                 activeCell={[0]}
                 emptyText={'이벤트 단가 관리 내역이 없습니다.'}/>
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
export default EventUnitPriceDetail
