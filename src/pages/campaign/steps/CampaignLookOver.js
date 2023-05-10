import {
  Board,
  BoardHeader,
  BoardSearchResult,
  CancelButton,
  ColSpan2,
  ColSpan4,
  Input,
  RowSpan,
  Span4,
  SubmitButton,
  SubmitContainer
} from "../../../assets/GlobalStyles";
import React, {useEffect, useState} from "react";
import {HorizontalRule} from "../../../components/common/Common";
import {Row, ValueText} from "../styles/common";
import {useAtom} from "jotai";
import {stepCampaignAtom} from "../entity";
import {useLocation, useNavigate} from "react-router-dom";
import {decimalFormat} from "../../../common/StringUtils";
import {
  retrieveAdverConfirm,
  retrieveConfirm,
  UpdateCampaignDefaultInfo
} from "../../../services/campaign/ConfirmAxios";
import {tokenResultAtom} from "../../login/entity/Common";
import {selEnumInfo} from "../../../services/campaign/InfoAxios";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function CampaignLookOver() {
  const {state} = useLocation()
  const navigate = useNavigate()
  const [stepCampaign, setStepCampaign] = useAtom(stepCampaignAtom)
  const [campaignData, setCampaignData] = useState(null)
  const [campaignName, setCampaignName] = useState('')
  const [userTargetConfig, setUserTargetConfig] = useState('')
  const [audienceTargetConfig, setAudienceTargetConfig] = useState('')
  const [tokenUserInfo] = useAtom(tokenResultAtom)
  const [agentTypeState, setAgentTypeState] = useState([])

  useEffect(() => {
    selEnumInfo('AGENT_TYPE').then(response => {
      setAgentTypeState(response.data)
    })
    if (state !== null) {
      tokenUserInfo !== 'NORMAL' ? retrieveConfirm(state.campaignId).then(response => {
          setCampaignData({
            ...response
          })
          setCampaignName(response.name)
          setUserTargetConfig(
            `
            ${response.inventoryDetail.exposureConversionUserYn !== 'Y' ? '전환 고객 노출' : `전환 고객 미노출[${response.inventoryDetail.nonExposureDaysOfConversionUser}일]`},
            ${response.inventoryDetail.exposureShoppingUserYn !== 'Y' ? ' 쇼핑 고객 노출' : ' 쇼핑 고객 미노출'},
            ${response.inventoryDetail.exposureAttentionUserYn !== 'Y' ? ' 관심 고객 노출' : ' 관심 고객 미노출'},
            ${response.inventoryDetail.exposureVisitUserYn !== 'Y' ? '방문 고객 노출' : '방문 고객 미노출'}
          `
          )
          setAudienceTargetConfig(
            `
            ${response.inventoryDetail.exposureConversionAudienceYn !== 'Y' ? '전환 고객 노출' : `전환 고객 미노출[${response.inventoryDetail.nonExposureDaysOfConversionAudience}일]`},
            ${response.inventoryDetail.exposureShoppingAudienceYn !== 'Y' ? ' 쇼핑 고객 노출' : ' 쇼핑 고객 미노출'},
            ${response.inventoryDetail.exposurePotentialAudienceYn !== 'Y' ? ' 관심 고객 노출' : ' 관심 고객 미노출'},
            ${response.inventoryDetail.exposureNewAudienceYn !== 'Y' ? '방문 고객 노출' : '방문 고객 미노출'}
          `
          )
        })
        : retrieveAdverConfirm(state.campaignId).then(response => {
          setCampaignData({
            ...response
          })

        })
    }
  }, [])
  const handleChangeName = (e) => {
    setCampaignName(e.target.value)
  }
  const onSubmit = () =>{
    campaignName !== '' ? UpdateCampaignDefaultInfo(state.campaignId, campaignName).then(response => {
      response ? toast.success('캠페인명 수정이 완료되었습니다.') : toast.error('캠페인명 수정이 실패하였습니다.')
    }) : toast.warning('캠페인명을 입력해주세요.')
  }
  return (
    <>
      <Board>
        <BoardHeader>캠페인 검토</BoardHeader>
        {campaignData !== null &&
          <BoardSearchResult>
            <RowSpan>
              <Span4>캠페인 기본 정보</Span4>
            </RowSpan>
            <RowSpan box={true} column={true}>
              <Row>
                <ColSpan4>
                  <Span4>캠페인명</Span4>
                  {
                    tokenUserInfo.role !== 'NORMAL' ? <Input value={campaignName} onChange={handleChangeName}/>
                      :
                      <ValueText>{campaignData.name}</ValueText>
                  }
                </ColSpan4>
              </Row>
              <Row>
                <ColSpan2>
                  <Span4>캠페인 상품</Span4>
                  <ValueText>{campaignData.productType !== 'BANNER' ? '팝언더' : '배너'}</ValueText>
                </ColSpan2>
                <HorizontalRule/>
                <ColSpan2>
                  <Span4>캠페인 목표</Span4>
                  <ValueText>{campaignData.goalType}</ValueText>
                </ColSpan2>
              </Row>
              <Row>
                <ColSpan2>
                  <Span4>캠페인 상세 목표</Span4>
                  <ValueText>{campaignData.goal} - {campaignData.goalValue}</ValueText>
                </ColSpan2>
                <HorizontalRule/>
                <ColSpan2>
                  <Span4>최적화 픽셀</Span4>
                  <ValueText>{campaignData.pixelName} - {campaignData.pixelLinkUrl} ({campaignData.pixelStatus})</ValueText>
                </ColSpan2>
              </Row>
            </RowSpan>
            <RowSpan>
              <Span4>예산 및 입찰 설정</Span4>
            </RowSpan>
            <RowSpan box={true} column={true}>
              <Row>
                <ColSpan2>
                  <Span4>일일 평균 예산</Span4>
                  <ValueText>{campaignData.infiniteBudgetYn !== 'N' ? '무제한' : decimalFormat(campaignData.dailyAvgBudget) + '원'}</ValueText>
                </ColSpan2>
                <HorizontalRule/>
                <ColSpan2>
                  <Span4>예산 비율</Span4>
                  <ValueText>PC {decimalFormat(campaignData.pcBudget)}원 /
                    MOBILE {decimalFormat(campaignData.mobBudget)}원</ValueText>
                </ColSpan2>
              </Row>
              <Row>
                <ColSpan2>
                  <Span4>시간별 예산 그룹</Span4>
                  <ValueText>{campaignData?.budgetTimeName}</ValueText>
                </ColSpan2>
                <HorizontalRule/>
                <ColSpan2>
                  <Span4>이벤트 예산 그룹</Span4>
                  <ValueText>{campaignData?.budgetEventName}</ValueText>
                </ColSpan2>
              </Row>
              <Row>
                <ColSpan2>
                  <Span4>입찰 방식</Span4>
                  <ValueText>{campaignData.biddingType}</ValueText>
                </ColSpan2>
                <HorizontalRule/>
                <ColSpan2>
                  <Span4>최대 입찰가</Span4>
                  <ValueText>{decimalFormat(campaignData.maxBiddingPrice)}원</ValueText>
                </ColSpan2>
              </Row>
              <Row>
                <ColSpan2>
                  <Span4>이벤트 단가 그룹</Span4>
                  <ValueText>{campaignData.priceEventName}</ValueText>
                </ColSpan2>
              </Row>
            </RowSpan>
            <RowSpan>
              <Span4>광고 그룹 설정</Span4>
            </RowSpan>
            <RowSpan box={true} column={true}>
              <Row>
                <ColSpan2>
                  <Span4>노출 영역</Span4>
                  <ValueText>{campaignData.inventoryDetail.exposureAgentType.length !== agentTypeState.length ?  campaignData.inventoryDetail.exposureAgentType.map(item => {
                    return agentTypeState.find(value => value.value === item).label
                  }).join(',') : '전체'
                  }
                  </ValueText>
                </ColSpan2>
                <HorizontalRule/>
                <ColSpan2>
                  <Span4>송출 제한 지면</Span4>
                  <ValueText>{campaignData.inventoryDetail.disAllowInventoryIds.length !== 0 ? `${campaignData.inventoryDetail.disAllowInventoryIds.length} 개 지면 송출 제한 설정` : '송출 제한 지면 없음'}</ValueText>
                </ColSpan2>
              </Row>
              <Row>
                <ColSpan2>
                  <Span4>게제 지면</Span4>
                  <ValueText>
                    {
                      campaignData.inventoryDetail.exposureInventoryType !== 'MANUAL' ?
                        (campaignData.inventoryDetail.exposureInventoryType !== 'AUTO' ? '카테고리 설정' : '자동 최적화')
                        : '개별 설정'
                    }
                  </ValueText>
                </ColSpan2>
                <HorizontalRule/>
                <ColSpan2>
                  <Span4>게제 기간</Span4>
                  <ValueText>{campaignData.inventoryDetail.startDate} ~ {campaignData.inventoryDetail.endDate}</ValueText>
                </ColSpan2>
              </Row>
              <Row>
                <ColSpan2>
                  <Span4>고객 정보 기반 설정</Span4>
                  <ValueText>{campaignData.inventoryDetail.userTargetConfigType !== 'AUTO' ? userTargetConfig : '자동 최적화'}</ValueText>
                </ColSpan2>
                <HorizontalRule/>
                <ColSpan2>
                  <Span4>유저 데이터 분석 설정</Span4>
                  <ValueText>{campaignData.inventoryDetail.audienceTargetConfigType !== 'AUTO' ? audienceTargetConfig : '자동 최적화'}</ValueText>
                </ColSpan2>
              </Row>
            </RowSpan>
            <RowSpan>
              <Span4>크리에이티브 설정</Span4>
            </RowSpan>
            <RowSpan box={true} column={true}>
              <Row>
                <ColSpan2>
                  <Span4>설정 크리에이티브</Span4>
                  <ValueText>{campaignData.creativeType}</ValueText>
                </ColSpan2>
                <HorizontalRule/>
                <ColSpan2>
                  <Span4>크리에이티브명</Span4>
                  <ValueText>{campaignData.creativeName}</ValueText>
                </ColSpan2>
              </Row>
              <Row>
                <ColSpan2>
                  <Span4>PC 랜딩 url</Span4>
                  <ValueText>{campaignData.pcLandingUrl}</ValueText>
                </ColSpan2>
                <HorizontalRule/>
                <ColSpan2>
                  <Span4>MOBILE 랜딩 url</Span4>
                  <ValueText>{campaignData.mobLandingUrl}</ValueText>
                </ColSpan2>
              </Row>
              <Row>
                <ColSpan2>
                  <Span4>PC 인식 코드</Span4>
                  <ValueText>{campaignData.pcReferralCode}</ValueText>
                </ColSpan2>
                <HorizontalRule/>
                <ColSpan2>
                  <Span4>MOBILE 랜딩 코드</Span4>
                  <ValueText>{campaignData.mobReferralCode}</ValueText>
                </ColSpan2>
              </Row>
            </RowSpan>
          </BoardSearchResult>
        }
      </Board>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{zIndex: 9999999}}
      />
      <SubmitContainer>
        <CancelButton type={'button'}
                      onClick={() => state !== null ? navigate('/board/dashboard') : setStepCampaign({steps: 3})}>{tokenUserInfo.role !== 'NORMAL' ? '취소' : '목록'}</CancelButton>
        {tokenUserInfo.role !== 'NORMAL' &&
          <SubmitButton type={'button'} onClick={()=> onSubmit()}>{state !== null ? '저장' : '캠페인 생성'}</SubmitButton>}
      </SubmitContainer>
    </>
  )
}