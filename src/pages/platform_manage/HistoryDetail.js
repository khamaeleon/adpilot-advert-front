import Navigator from "../../components/common/Navigator";
import {
  BoardContainer,
  BoardTableContainer,
  BoardTap,
  BoardTapTitle,
  SubmitButton,
  SubmitContainer,
  TitleContainer
} from "../../assets/GlobalStyles";
import {atom, useAtom} from "jotai/index";
import {eventTypeAll} from "./entity";
import {useLocation, useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import {selHistoryInfo} from "../../services/HistoryAxios";
import moment from "moment/moment";

const HistoryDetailInfo = atom(null)

function PlatformHistoryDetail() {
  const navigate = useNavigate()
  const {state} = useLocation();
  const [historyDetailInfoState,setHistoryDetailInfoState] = useAtom(HistoryDetailInfo)

  useEffect(() => {
    selHistoryInfo(state).then(response => {
      setHistoryDetailInfoState(response)
    })
  },[])

  return (
    <main>
      <BoardContainer>
        <TitleContainer>
          <h1>플랫폼 관리</h1>
          <Navigator/>
        </TitleContainer>
        <BoardTapTitle>지면 정보</BoardTapTitle>
        <BoardTap>
          <BoardTableContainer>
            <table>
              <colgroup>
                <col width='30%' />
                <col width='30%' />
                <col width='40%' />
              </colgroup>
              <thead>
                <tr>
                  <th className={'border-r'}>지면명</th>
                  <th className={'border-r'}>아이디</th>
                  <th>지면코드</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={'border-r'}>{historyDetailInfoState !==null && historyDetailInfoState.inventoryName}</td>
                  <td className={'border-r'}>api에서 없음</td>
                  <td>{historyDetailInfoState !==null && historyDetailInfoState.inventoryId}</td>
                </tr>
              </tbody>
            </table>
          </BoardTableContainer>
        </BoardTap>
        <BoardTapTitle>이력 정보</BoardTapTitle>
        <BoardTap>
          <BoardTableContainer>
            <table>
              <colgroup>
                <col width='15%' />
                <col width='35%' />
                <col width='15%' />
                <col width='35%' />
              </colgroup>
              <tbody>
                <tr>
                  <th className={'border-r'}>변경일시</th>
                  <td className={'border-r'} style={{borderTop:0}}>{historyDetailInfoState !==null && moment(historyDetailInfoState.currentRevision.modifiedAt).format('YYYY년 MM월 DD일  HH시mm분ss초') }</td>
                  <th className={'border-r'}>변경자</th>
                  <td style={{borderTop:0}}>{historyDetailInfoState !==null && historyDetailInfoState.currentRevision.modifiedBy}</td>
                </tr>
              </tbody>
            </table>
          </BoardTableContainer>
        </BoardTap>
        <BoardTapTitle>게재 상태 설정이력</BoardTapTitle>
        <BoardTap>
          <BoardTableContainer>
            <table>
              <colgroup>
                <col width='30%' />
                <col width='35%' />
                <col width='35%' />
              </colgroup>
              <tbody>
                <tr>
                  <th className={'border-r'} rowSpan='2'>게재상태</th>
                  <th className={'border-r'}>이전내역</th>
                  <th>변경내역</th>
                </tr>
                <tr>
                  <td className={'border-r'}>{historyDetailInfoState !== null && historyDetailInfoState.previousRevision.publish? '개제중':'게재중지'}</td>
                  <td>{historyDetailInfoState !== null && historyDetailInfoState.currentRevision.publish? '개제중':'게재중지'}</td>
                </tr>
              </tbody>
            </table>
          </BoardTableContainer>
        </BoardTap>
        <BoardTapTitle>이벤트 설정 이력</BoardTapTitle>
        <BoardTap>
          <BoardTableContainer>
            <table>
              <colgroup>
                <col width='30%' />
                <col width='35%' />
                <col width='35%' />
              </colgroup>
              <thead>
                <tr>
                  <th className={'border-r'}>항목명</th>
                  <th className={'border-r'}>이전 내역</th>
                  <th>변경 내역</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th className={'border-r border-t'}>이벤트 설정</th>
                  <td className={'border-r'}>{historyDetailInfoState !== null && historyDetailInfoState.previousRevision.allowEvents.map((value, index) => {
                    return (
                      eventTypeAll.find(type => type.value === value.eventType).label
                    )
                  }).join(',')}</td>
                  <td>{historyDetailInfoState !== null && historyDetailInfoState.currentRevision.allowEvents.map((value, index) => {
                    return (
                      eventTypeAll.find(type => type.value === value.eventType).label
                    )
                  }).join(',')}</td>
                </tr>
                <tr>
                  <th className={'border-r border-t'}>이벤트 가중치 설정</th>
                  <td className={'border-r'}>{historyDetailInfoState !== null && historyDetailInfoState.previousRevision.allowEvents.map((value, index) => {
                    return (
                      value.exposureWeight
                    )
                  }).join(',')}</td>
                  <td>{historyDetailInfoState !== null && historyDetailInfoState.currentRevision.allowEvents.map((value, index) => {
                    return (
                      value.exposureWeight
                    )
                  }).join(',')}</td>
              </tr>
              </tbody>
            </table>
          </BoardTableContainer>
        </BoardTap>
        <BoardTapTitle>정산 설정 이력</BoardTapTitle>
        <BoardTap>
          <BoardTableContainer>
            <table>
              <colgroup>
                <col width='30%' />
                <col width='35%' />
                <col width='35%' />
              </colgroup>
              <thead>
                <tr>
                  <th className={'border-r'}>항목명</th>
                  <th className={'border-r'}>이전 내역</th>
                  <th>변경 내역</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th className={'border-r border-t'}>계약 기간</th>
                  <td className={'border-r'}>{historyDetailInfoState !== null && historyDetailInfoState.previousRevision.feeCalculation.contractEndDate}</td>
                  <td>{historyDetailInfoState !== null && historyDetailInfoState.currentRevision.feeCalculation.contractEndDate}</td>
                </tr>
                <tr>
                  <th className={'border-r border-t'}>정산 유형 및 정산 금액</th>
                  <td className={'border-r'}>{historyDetailInfoState !== null &&
                    historyDetailInfoState.previousRevision.feeCalculation.calculationType+'('+historyDetailInfoState.previousRevision.feeCalculation.calculationValue+')'
                  }</td>
                  <td>{historyDetailInfoState !== null &&
                    historyDetailInfoState.currentRevision.feeCalculation.calculationType+'('+historyDetailInfoState.currentRevision.feeCalculation.calculationValue+')'
                  }</td>
                </tr>
                <tr>
                  <th className={'border-r border-t'}>정산 비고</th>
                  <td className={'border-r'}>{historyDetailInfoState !== null && historyDetailInfoState.previousRevision.feeCalculation.etc}</td>
                  <td>{historyDetailInfoState !== null && historyDetailInfoState.currentRevision.feeCalculation.etc}</td>
                </tr>
              </tbody>
            </table>
          </BoardTableContainer>
        </BoardTap>
        <BoardTapTitle>지면 상세 설정 이력</BoardTapTitle>
        <BoardTap>
          <BoardTableContainer>
            <table>
              <colgroup>
                <col width='30%' />
                <col width='35%' />
                <col width='35%' />
              </colgroup>
              <thead>
                <tr>
                  <th className={'border-r'}>지면명</th>
                  <th className={'border-r'}>이전 내역</th>
                  <th>변경 내역</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th className={'border-r border-t'}>광고 미송출 대체 설정</th>
                  <td className={'border-r'}>{historyDetailInfoState !== null && historyDetailInfoState.previousRevision.noExposedConfigType+'('+historyDetailInfoState.previousRevision.noExposedConfigValue+')'}</td>
                  <td>{historyDetailInfoState !== null && historyDetailInfoState.currentRevision.noExposedConfigType+'('+historyDetailInfoState.previousRevision.noExposedConfigValue+')'}</td>
                </tr>
                <tr>
                  <th className={'border-r border-t'}>매체 정보 설정</th>
                  <td className={'border-r'}>api에서 데이터없음</td>
                  <td>api에서 데이터없음</td>
                </tr>
              </tbody>
            </table>
          </BoardTableContainer>
        </BoardTap>

        <SubmitContainer>
          <SubmitButton onClick={() => navigate('/board/platform3')}>목록</SubmitButton>
        </SubmitContainer>
      </BoardContainer>
    </main>
  )
}

export default PlatformHistoryDetail
