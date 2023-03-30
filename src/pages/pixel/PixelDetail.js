import {
  Board,
  BoardHeader,
  BoardSearchDetail,
  BoardTableContainer,
  CancelButton,
  ColSpan0,
  ColSpan1,
  ColSpan2,
  ColTitle,
  DefaultButton,
  RowSpan,
  SubmitContainer
} from "../../assets/GlobalStyles";
import React, {useEffect, useState} from "react";
import {useAtom} from "jotai";
import Table, {SwitchComponent} from "../../components/table";
import {pixelDetailColumns, pixelDetailDataAtom} from "./entity";
import {toast, ToastContainer} from "react-toastify";
import {dateFormat} from "../../common/StringUtils";
import {useLocation, useNavigate} from "react-router-dom";
import {resistPriceEvent, selPriceEventList} from "../../services/SettingsAxios";
import SettingAdd from "../../components/common/SettingModal";
import {modalController} from "../../store";

function PixelDetail() {
  const [pixelDetailDataState, setPixelDetailDataState] = useAtom(pixelDetailDataAtom)
  const navigate = useNavigate()
  const [, setModal] = useAtom(modalController)
  const [saveType, setSaveType] = useState('create')
  const {state} =useLocation()

  useEffect(() => {
    // selPriceEventList(state.id).then(response => {
    //   setPixelDetailDataState(response)
    // })
  }, [])
  return (
    <>
      <Board>
        <BoardHeader>픽셀 기본 정보</BoardHeader>
        <BoardSearchDetail>
          <RowSpan style={{marginTop: 0, justifyContent: 'flex-end'}}>
            <ColSpan0>
              <ColTitle>최근 수정</ColTitle>
              <div>{pixelDetailDataState !==null &&  dateFormat(pixelDetailDataState.lastModifiedAt, 'YYYY.MM.DD HH:mm')}</div>
            </ColSpan0>
          </RowSpan>
          <RowSpan style={{justifyContent: 'flex-start', alignItems: 'center'}}>
            <ColSpan2>
              <ColTitle>광고주명</ColTitle>
              <div>기본 픽셀</div>
            </ColSpan2>
            <SwitchComponent />
          </RowSpan>
          <RowSpan style={{justifyContent: 'flex-start', alignItems: 'center'}}>
            <ColSpan2>
              <ColTitle>연동 URL</ColTitle>
              <div>https://nikestore.com</div>
            </ColSpan2>
            <ColSpan2>
              <ColTitle>데이터 수집 상태</ColTitle>
              <div>수집중</div>
            </ColSpan2>
          </RowSpan>
          <RowSpan>
            <ColSpan1>
              <ColTitle>광고주명</ColTitle>
              <div>나이키</div>
            </ColSpan1>
            <ColSpan1>
              <ColTitle>아이디</ColTitle>
              <div>kspring</div>
            </ColSpan1>
            <ColSpan1>
              <ColTitle>담당자</ColTitle>
              <div>{pixelDetailDataState !==null && pixelDetailDataState.managerName}</div>
            </ColSpan1>
          </RowSpan>
        </BoardSearchDetail>
        <BoardTableContainer>
          <div>
            총 <span>{pixelDetailDataState !==null && pixelDetailDataState.totalCount}</span>건
          </div>
          {pixelDetailDataState !== null &&
            <Table columns={pixelDetailColumns}
                   data={pixelDetailDataState}
                   showHoverRows={false}
                   activeCell={[0]}
                   emptyText={'이벤트 단가 관리 내역이 없습니다.'}/>
          }
        </BoardTableContainer>
        <SubmitContainer>
          <CancelButton onClick={()=>navigate('/board/pixel')}>목록</CancelButton>
          <DefaultButton>저장</DefaultButton>
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
export default PixelDetail
