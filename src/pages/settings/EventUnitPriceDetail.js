import {
  Board,
  BoardHeader,
  BoardSearchDetail,
  BoardTableContainer,
  CancelButton,
  ColSpan0,
  ColSpan1,
  ColTitle,
  RowSpan,
  SubmitContainer
} from "../../assets/GlobalStyles";
import React, {useEffect, useState} from "react";
import {useAtom} from "jotai";
import Table from "../../components/table";
import {eventUnitPriceDetailColumns, eventUnitPriceDetailDataAtom} from "./entity";
import {toast, ToastContainer} from "react-toastify";
import {dateFormat} from "../../common/StringUtils";
import {useLocation, useNavigate} from "react-router-dom";
import {resistPriceEvent, selPriceEventList} from "../../services/SettingsAxios";
import SettingAdd from "../../components/common/SettingModal";
import {modalController} from "../../store";

function EventUnitPriceDetail() {
  const [eventUnitPriceDetailDataState, setEventUnitPriceDetailDataState] = useAtom(eventUnitPriceDetailDataAtom)
  const navigate = useNavigate()
  const [, setModal] = useAtom(modalController)
  const [saveType,setSaveType] =useState('create')
  const {state} =useLocation()

  useEffect(() => {
    selPriceEventList(state.id).then(response => {
      console.log(response)
      setEventUnitPriceDetailDataState(response)
    })
  }, [])

  /**
   * 모달에서 수정 추가
   */
  const handleOnSubmit = (data) => {
    if(saveType ==='create'){
      resistPriceEvent({...data,userId:state.id}).then(response => {
        if(response){
          setModal({
            isShow: false,
            modalComponent: null
          })
          selPriceEventList(state.id).then(response => {
            setEventUnitPriceDetailDataState(response)
          })
        }else{
          toast.warning("이벤트 단가 그룹명이 중복 되었습니다.")
        }
      })
    }else{

    }
  }
  return (
    <>
      <Board>
        <BoardHeader>이벤트 단가 기본 정보</BoardHeader>
        <BoardSearchDetail>
          <RowSpan style={{marginTop: 0, justifyContent: 'flex-end'}}>
            <ColSpan0>
              <ColTitle>최근 수정</ColTitle>
              <div>{dateFormat(eventUnitPriceDetailDataState !==null && eventUnitPriceDetailDataState.lastModifiedAt, 'YYYY.MM.DD HH:mm')}</div>
            </ColSpan0>
          </RowSpan>
          <RowSpan>
            <ColSpan1>
              <ColTitle>광고주명</ColTitle>
              <div>{eventUnitPriceDetailDataState !==null && eventUnitPriceDetailDataState.adverName}</div>
            </ColSpan1>
            <ColSpan1>
              <ColTitle>아이디</ColTitle>
              <div>{eventUnitPriceDetailDataState !==null && eventUnitPriceDetailDataState.username}</div>
            </ColSpan1>
            <ColSpan1>
              <ColTitle>담당자</ColTitle>
              <div>{eventUnitPriceDetailDataState !==null && eventUnitPriceDetailDataState.managerName}</div>
            </ColSpan1>
          </RowSpan>
        </BoardSearchDetail>
        <BoardTableContainer>
          <RowSpan style={{marginTop: 0, justifyContent: 'flex-end'}}>
            <SettingAdd title={'추가'} onSubmit={handleOnSubmit} type={saveType} data={null} btnStyle={'AccountButton'}/>
          </RowSpan>
          <div>
            총 <span>{eventUnitPriceDetailDataState !==null && eventUnitPriceDetailDataState.totalCount}</span>건
          </div>
          {eventUnitPriceDetailDataState !==null &&
            <Table columns={eventUnitPriceDetailColumns}
                   data={eventUnitPriceDetailDataState?.priceEventDtos}
                   showHoverRows={false}
                   activeCell={[0]}
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
export default EventUnitPriceDetail
