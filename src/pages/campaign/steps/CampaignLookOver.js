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
import {AdverInfo, Row, ValueText} from "../styles/common";
import {useAtom} from "jotai";
import {stepCampaignAtom} from "../entity";
import {useLocation, useNavigate} from "react-router-dom";
import {decimalFormat, isUnlimited} from "../../../common/StringUtils";
import {
  retrieveAdverConfirm,
  retrieveConfirm, selAdverEnumInfo,
  UpdateCampaignDefaultInfo
} from "../../../services/campaign/ConfirmAxios";
import {tokenResultAtom} from "../../login/entity/Common";
import {selEnumInfo} from "../../../services/campaign/InfoAxios";
import {toast} from "react-toastify";
import {campaignBasicInfoAtom} from "../entity/Info";
import {useResetAtom} from "jotai/utils";

export function CampaignLookOver() {
  const {state} = useLocation()
  const navigate = useNavigate()
  const [campaignBasicInfo] = useAtom(campaignBasicInfoAtom)
  const [, setStepCampaign] = useAtom(stepCampaignAtom)
  const [campaignData, setCampaignData] = useState(null)
  const [campaignName, setCampaignName] = useState('')
  const [userTargetConfig, setUserTargetConfig] = useState([])
  const [audienceTargetConfig, setAudienceTargetConfig] = useState([])
  const [tokenUserInfo] = useAtom(tokenResultAtom)
  const [agentTypeState, setAgentTypeState] = useState([])
  const resetBasicInfo = useResetAtom(campaignBasicInfoAtom)


  const inventoryExposure = (inventoryDetail) => {
    setUserTargetConfig(
      [
            inventoryDetail.exposureConversionUserYn === 'Y' ? '전환 고객 노출' : `전환 고객 미노출[${inventoryDetail.nonExposureDaysOfConversionUser !== null ? inventoryDetail.nonExposureDaysOfConversionUser : 0}일]`,
            inventoryDetail.exposureShoppingUserYn === 'Y' ? '쇼핑 고객 노출' : '쇼핑 고객 미노출',
            inventoryDetail.exposureAttentionUserYn === 'Y' ? '관심 고객 노출' : '관심 고객 미노출',
            inventoryDetail.exposureVisitUserYn === 'Y' ? '방문 고객 노출' : '방문 고객 미노출'
      ]
    )
    setAudienceTargetConfig(
      [
            inventoryDetail.exposureConversionAudienceYn === 'Y' ? '전환 유저 노출' : `전환 유저 미노출[${inventoryDetail.nonExposureDaysOfConversionAudience !== null ? inventoryDetail.nonExposureDaysOfConversionAudience : 0}일]`,
            inventoryDetail.exposureShoppingAudienceYn === 'Y' ? '쇼핑 유저 노출' : '쇼핑 유저 미노출',
            inventoryDetail.exposurePotentialAudienceYn === 'Y' ? '잠재 유저 노출' : '잠재 유저 미노출',
            inventoryDetail.exposureNewAudienceYn === 'Y' ? '신규 유저 노출' : '신규 유저 미노출'
          ]
    )
  }
  useEffect(() => {
    if(tokenUserInfo.role !== 'NORMAL'){
      selEnumInfo('AGENT_TYPE').then(response => {
        setAgentTypeState(response.data)
      })
      let campaignId = (state !== null ? state.campaignId : campaignBasicInfo.campaignId);
      if(campaignId != null) retrieveConfirm(campaignId).then(response => {
        setCampaignData({
          ...response
        })
        setCampaignName(response.name)
        inventoryExposure(response.inventoryDetail)
      })

    } else {
      selAdverEnumInfo('AGENT_TYPE').then(response => {
        setAgentTypeState(response.data)
      })
      retrieveAdverConfirm(state.campaignId).then(response => {
        setCampaignData({
          ...response
        })
        inventoryExposure(response.inventoryDetail)
      })
    }
    console.log(campaignData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChangeName = (e) => {
    setCampaignName(e.target.value)
  }

  const onCancel = () => {
    if(state !== null) {
      navigate('/board/dashboard')
    } else {
      resetBasicInfo();
      setStepCampaign({steps: 0})
    }
  }
  const goalInfoLabel = (goalInfoValue) => {
    if (goalInfoValue.includes('ROAS')) {
      return '%'
    } else if (goalInfoValue.includes('매출') || goalInfoValue.includes('단가') || goalInfoValue.includes('금액')) {
      return '원'
    } else if (goalInfoValue.includes('카운트') && ![goalInfoValue].includes('노출 카운트')) {
      return '건'
    } else return '회'
  }

  const onSubmit = () => {
    campaignName !== '' ? UpdateCampaignDefaultInfo(state.campaignId, campaignName).then(response => {
      if(response) {
        toast.success("캠페인명이 수정되었습니다.",{autoClose: 100,delay: 0})
        toast.onChange(payload => {
          if(payload.status === "removed" && payload.type !== toast.TYPE.ERROR) {
            navigate('/board/dashboard')
          }
        })
        resetBasicInfo();
      } else {
        toast.error('캠페인명 수정이 실패하였습니다.')
      }
    }) : toast.warning('캠페인명을 입력해주세요.')
  }

  return (
    <>
      {state !== null && <AdverInfo><span>광고주 정보</span><p></p><span>{state?.adverInfo}</span></AdverInfo>}
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
                    (tokenUserInfo.role !== 'NORMAL' && state !== null)  ? <Input value={campaignName} onChange={handleChangeName}/>
                      :
                      <ValueText>{campaignData.name}</ValueText>
                  }
                </ColSpan4>
              </Row>
              <Row>
                <ColSpan2>
                  <Span4>캠페인 상품</Span4>
                  <ValueText>{campaignData.productType !== '배너' ? '팝언더' : '배너'}</ValueText>
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
                  <ValueText>{campaignData.goal} - {decimalFormat(campaignData.goalValue)} {goalInfoLabel(campaignData.goal)}</ValueText>
                </ColSpan2>
                <HorizontalRule/>
                <ColSpan2>
                  <Span4>최적화 픽셀</Span4>
                  <ValueText>{campaignData.pixelName} - {campaignData?.pixelLinkUrl} ({campaignData?.pixelStatus})</ValueText>
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
                  <ValueText>{campaignData.infiniteBudgetYn !== 'N' ? '무제한' : ('PC\u0009' + decimalFormat(campaignData.pcBudget) + '원 / MOBILE\u0009' + decimalFormat(campaignData.mobBudget) + '원')}</ValueText>
                </ColSpan2>
              </Row>
              <Row>
                <ColSpan2>
                  <Span4>시간별 예산 그룹</Span4>
                  <ValueText>{campaignData?.budgetTimeName}</ValueText>
                </ColSpan2>
                <HorizontalRule/>
                <ColSpan2>
                  <Span4>타겟팅 예산 그룹</Span4>
                  <ValueText>{campaignData?.targetingBudgetName}</ValueText>
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
                  <Span4>타겟팅 단가 그룹</Span4>
                  <ValueText>{campaignData?.targetingPriceName}</ValueText>
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
                  <ValueText>{campaignData.inventoryDetail?.exposureAgentType.length !== agentTypeState.length ?  campaignData.inventoryDetail?.exposureAgentType.map(item => {
                    return agentTypeState.find(value => value.value === item).label
                  }).join(',') : '전체'
                  }
                  </ValueText>
                </ColSpan2>
                <HorizontalRule/>
                <ColSpan2>
                  <Span4>송출 제한 지면</Span4>
                  <ValueText>{campaignData.inventoryDetail?.disAllowInventoryIds.length !== 0 ? `${campaignData.inventoryDetail?.disAllowInventoryIds.length} 개 지면 송출 제한 설정` : '송출 제한 지면 없음'}</ValueText>
                </ColSpan2>
              </Row>
              <Row>
                <ColSpan2>
                  <Span4>게재 지면</Span4>
                  <ValueText>
                    {
                      campaignData.inventoryDetail?.exposureInventoryType !== 'MANUAL' ?
                        (campaignData.inventoryDetail?.exposureInventoryType !== 'AUTO' ? '카테고리 설정' : '자동 최적화')
                        : '개별 설정'
                    }
                  </ValueText>
                </ColSpan2>
                <HorizontalRule/>
                <ColSpan2>
                  <Span4>게재 기간</Span4>
                  <ValueText>{campaignData.inventoryDetail?.startDate} ~ {isUnlimited(campaignData.inventoryDetail?.endDate)}</ValueText>
                </ColSpan2>
              </Row>
              <Row>
                <ColSpan2>
                  <Span4>고객 정보 기반 설정</Span4>
                  <ValueText>{campaignData.inventoryDetail?.userTargetConfigType !== 'AUTO' ? userTargetConfig.join(',\u0009') : '자동 최적화'}</ValueText>
                </ColSpan2>
                <HorizontalRule/>
                <ColSpan2>
                  <Span4>오디언스 분석 설정</Span4>
                  <ValueText>{campaignData.inventoryDetail?.audienceTargetConfigType !== 'AUTO' ? audienceTargetConfig.join(',\u0020') : '자동 최적화'}</ValueText>
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
                  <ValueText>{campaignData?.creativeName}</ValueText>
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
      <SubmitContainer>
        <CancelButton type={'button'}
                      onClick={()=> onCancel()}>{(tokenUserInfo.role !== 'NORMAL' && state !== null) ? '목록' : '확인'}</CancelButton>
        {tokenUserInfo.role !== 'NORMAL' && state !== null &&
          <SubmitButton type={'button'} onClick={()=> onSubmit()}>저장</SubmitButton>}
      </SubmitContainer>

    </>
  )
}