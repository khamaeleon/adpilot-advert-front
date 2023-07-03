import {
  Board,
  BoardHeader,
  BoardTableContainer,
  BoardTableCustomContainer,
  CancelButton,
  ColSpan0,
  ColTitle,
  RowSpan,
  SubmitContainer
} from "../../assets/GlobalStyles";
import React, {useEffect} from "react";
import {useAtom} from "jotai";
import Table from "../../components/table";
import {ToastContainer} from "react-toastify";
import {dateFormat} from "../../common/StringUtils";
import {useLocation, useNavigate} from "react-router-dom";
import SettingAdd from "../../components/common/SettingModal";
import {eventUnitPriceDetailColumns, eventUnitPriceDetailDataAtom} from "./entity/EventPrice";
import {selPriceEventList} from "../../services/settings/EventPriceAxios";

function EventUnitPriceDetail() {
  const [eventUnitPriceDetailDataState, setEventUnitPriceDetailDataState] = useAtom(eventUnitPriceDetailDataAtom)
  const navigate = useNavigate()
  const {state} = useLocation()

  useEffect(() => {
    selPriceEventList(state.id).then(response => {
      setEventUnitPriceDetailDataState(response)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Board>
        <BoardHeader>타겟팅 단가 기본 정보</BoardHeader>
        <RowSpan style={{justifyContent: 'flex-end'}}>
          <ColSpan0>
            <ColTitle>최근 수정</ColTitle>
            <div>{dateFormat(eventUnitPriceDetailDataState !==null && eventUnitPriceDetailDataState.lastModifiedAt, 'YYYY.MM.DD HH:mm')}</div>
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
              eventUnitPriceDetailDataState !==null &&
              <tbody>
              <tr>
                <td>{eventUnitPriceDetailDataState.adverName}</td>
                <td>{eventUnitPriceDetailDataState.username}</td>
                <td>{eventUnitPriceDetailDataState.managerName}</td>
              </tr>
              </tbody>
            }
          </table>
        </BoardTableCustomContainer>
        <BoardTableContainer>
          <RowSpan style={{ justifyContent: 'flex-end'}}>
            <SettingAdd title={'추가'} saveType={'create'} data={null} label={'won'} />
          </RowSpan>

          {eventUnitPriceDetailDataState !==null &&
            <Table columns={eventUnitPriceDetailColumns}
                   style={{minHeight: 300}}
                   totalCount={[eventUnitPriceDetailDataState.totalCount, '타겟팅 단가 그룹']}
                   data={eventUnitPriceDetailDataState?.targetingPriceDtos}
                   emptyText={'타겟팅 단가 관리 내역이 없습니다.'}/>
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
export default EventUnitPriceDetail
