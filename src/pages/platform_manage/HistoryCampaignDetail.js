import {BoardTableContainer, BoardTap, BoardTapTitle, CancelButton, SubmitContainer} from "../../assets/GlobalStyles";
import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {findRevisionCampaignDetail} from "../../services/Platform/HistoryAxios";
import {Loading} from "./entity/History";
import styled from "styled-components";

const eventGoalGroup = {
  WEB: 'PC 웹',
  WEB_APP: 'PC 어플리케이션',
  MOBILE_WEB: 'MOBILE 웹',
  MOBILE_HYBRID_APP: '하이브리드 APP',
  MOBILE_NATIVE_APP: '네이티브 APP'
}

const campaignHistory = [
  {name: '캠페인 명'},
  {publishYn: '게재 상태'}
]

const budgetHistory = [
  {dailyAvgBudget: '일 평균 예산'},
  {infiniteBudgetYn: '예산 비율'},
  {biddingType: '입찰 방식'},
  {maxBiddingPrice: '최대 입찰가'},
]

const inventoryHistory = [
  {name: '광고 그룹명'},
  {exposureAgentType: '노출 영역'},
  {allowInventoryCategories: '게재 지면 설정'},
  {disAllowInventoryCategories: '송출 제한 지면 설정'},
  {startDate: '게재 기간'},
  {userTargetConfigType: '고객 정보 기반 설정'},
  {audienceTargetConfigType: '오디언스 분석 설정'},
]

const creativeHistory = [
  {name: '크리에이티브 명'},
  {creativeType: '크리에이티브 유형'},
  {pcLandingUrl: 'PC 랜딩 URL'},
  {pcReferralCode: 'PC 인식코드 '},
  {mobLandingUrl: 'MOBILE 랜딩 URL'},
  {mobReferralCode: 'MOBILE 인식코드'},
]

const materialDetailInfo = [
  {serviceName: '서비스 명'},
  {title1: '광고 타이틀'},
  {title2: '광고 제목1'},
  {title3: '광고 제목2'},
  {titleLong: '긴 광고 제목'},
  {clickInducementType: '클릭 유도 문안'},
  {logoPaths: '로고 이미지'},
  {description: '광고 설명'},
]

export function HistoryCampaignDetail () {
  const {state} = useLocation()
  const [data, setData] = useState()

  useEffect(()=> {
    findRevisionCampaignDetail(state).then(response => {
      setData(response)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const campConverters = (timing,arg) => {
    let value;
    const campaignData = data[timing]
    if(Object.keys(arg)[0] === 'publishYn') {
      value = campaignData[Object.keys(arg)] === 'Y' ? '게제 중' : '게재 중지'
    } else {
      value = campaignData[Object.keys(arg)]
    }
    return value
  }

  const budgetConverters  = (timing,arg) => {
    let value;
    const budgetData = data[timing]?.budget
    if(Object.keys(arg)[0] === 'infiniteBudgetYn') {
      value = budgetData[Object.keys(arg)] === 'N' ? `PC ${budgetData.pcBudget}원  / MOBILE ${budgetData.mobBudget}원` : '-'
    } else {
      value = budgetData[Object.keys(arg)]
    }
    return isNaN(value) ? value : value + '원'
  }

  const inventoryConverter = (timing,arg) => {
    let value;
    const inventoryData = data[timing]?.inventory;
    if(Object.keys(arg)[0] === 'audienceTargetConfigType') {
      const audience = () => {
        return (
          <>
            <p>[전환유저 - {inventoryData?.audienceTargetConfig.exposureConversionYn === 'Y' ? '노출' : `미노출 ${inventoryData?.audienceTargetConfig.nonExposureDaysOfConversion}일`}]</p>
            <p>[신규유저 - {inventoryData?.audienceTargetConfig.exposureNewYn === 'Y' ? '노출' : '미노출'}]</p>
            <p>[잠재유저 - {inventoryData?.audienceTargetConfig.exposurePotentialYn === 'Y' ? '노출' : '미노출'}]</p>
            <p>[쇼핑유저 - {inventoryData?.audienceTargetConfig.exposureShoppingYn === 'Y' ? '노출' : '미노출'}]</p>
          </>
        )
      }
      value = inventoryData[Object.keys(arg)] === 'AUTO' ? `자동최적화` : audience();

    } else if(Object.keys(arg)[0] === 'userTargetConfigType') {
      const user = () => {
        return (
          <>
            <p>[전환고객 - {inventoryData?.userTargetConfig.exposureConversionUserYn === 'Y' ? '노출' : `미노출 ${inventoryData?.userTargetConfig.nonExposureDaysOfConversion}일`}]</p>
            <p>[관심고객 - {inventoryData?.userTargetConfig.exposureAttentionUserYn === 'Y' ? '노출' : `미노출`}]</p>
            <p>[쇼핑고객 - {inventoryData?.userTargetConfig.exposureShoppingUserYn === 'Y' ? '노출' : '미노출'}]</p>
            <p>[방문고객 - {inventoryData?.userTargetConfig.exposureVisitUserYn === 'Y' ? '노출' : '미노출'}]</p>
          </>
        )
      }
      value = inventoryData[Object.keys(arg)] === 'AUTO' ? `자동최적화` : user();
    } else if(Object.keys(arg)[0] === 'startDate') {
      value = `${inventoryData['startDate']} ~ ${inventoryData['endDate']}`
    } else if (Object.keys(arg)[0] === 'allowInventoryCategories' || Object.keys(arg)[0] === 'disAllowInventoryCategories') {
      value = inventoryData[Object.keys(arg)].length !== 0 ? `[${inventoryData[Object.keys(arg)].join('/ ')}]` : '없음'
    } else if(Object.keys(arg)[0] === 'exposureAgentType') {
      value = inventoryData[Object.keys(arg)].length !== 0 ? `[${inventoryData[Object.keys(arg)].map((item) => eventGoalGroup[item]).join('/ ')}]` : '-'
    } else {
      value = inventoryData[Object.keys(arg)]
    }
    return value
  }

  const creativeConverters = (timing, arg) => {
    let value;
    const creativeData = data[timing]?.creative
    value = creativeData[Object.keys(arg)]
    return value
  }
  const materialConverters = (timing, arg) => {
    let value;
    const materialData = data[timing]?.creative?.materialDetailInfo
    const image = (path) => {
      return (
        <ImageGroup>
          {path.map((img, key) => {
            return(
              <img width={70} height={70} style={{objectFit:'cover'}} key={key} src={img} alt={'로고이미지'}/>
              )
          })}
        </ImageGroup>
      )
    }

    if(materialData !== undefined){
      if (Object.keys(arg)[0] === 'logoPaths') {
        if(materialData.logoPaths.length !== 0) {
          value = image(materialData[Object.keys(arg)])
        }
      } else {
        value = materialData[Object.keys(arg)]
      }
    }
    return value
  }

  const bannerImages = (timing) => {
    const bannerData = data[timing]?.creative
    let value
    const bannerImage = () => {
      return (
        <div>{bannerData?.bannerMaterials.map((item, key) => {

          return (
            <div key={key} style={{display: 'flex',gap: 10, margin: 5}}>
              <div style={{whiteSpace: 'nowrap'}}>{item?.bannerSize}</div>
              <ImageGroup>
                {item?.bannerImages.map((img, key) => {
                  return (
                    <img key={key} src={img.thumbnailPath} alt={img.id}/>
                  )
                })}
              </ImageGroup>
            </div>
          )
        })}</div>
      )
    }

    const nativeImage = () => {
      return (
        <div>
          <div style={{display: 'flex',gap: 10, margin: 5}}>
            <ImageGroup>
              {bannerData?.nativeImages.map((img, key) => {
                return (
                  <img key={key} src={img.thumbnailPath} alt={img.id}/>
                )
              })}
            </ImageGroup>
          </div>
        </div>
      )
    }

    if(bannerData?.creativeType === 'BANNER') {
      value = bannerImage()
    } else if (bannerData?.creativeType === 'NATIVE') {
      value = nativeImage()
    } else if (bannerData?.creativeType === 'PRODUCT_BANNER') {

    } else if (bannerData?.creativeType === 'POP_UNDER') {

    }
    return value
  }

  return (
    <>
      <Loading>
        {/*캠페인 정보*/}
        <BoardTapTitle>캠페인 정보</BoardTapTitle>
        <BoardTap>
          <BoardTableContainer>
            <table>
              <colgroup>
                <col width='10%'/>
                <col width='25%'/>
                <col width='10%'/>
                <col width='25%'/>
                <col width='10%'/>
                <col width='25%'/>
              </colgroup>
              <tbody>
              <tr>
                <th>광고주 명</th>
                <td>{data?.adverName}</td>
                <th>광고주 아이디</th>
                <td>{data?.username}</td>
                <th>캠페인 코드</th>
                <td>{data?.campaignId}</td>
              </tr>
              </tbody>
            </table>
          </BoardTableContainer>
        </BoardTap>
        {/*이력정보*/}
        <BoardTapTitle>이력 정보</BoardTapTitle>
        <BoardTap>
          <BoardTableContainer>
            <table>
              <colgroup>
                <col width='15%'/>
                <col width='35%'/>
                <col width='15%'/>
                <col width='35%'/>
              </colgroup>
              <tbody>
              <tr>
                <th>변경 일시</th>
                <td>{data?.revisionDateTime}</td>
                <th>변경자 아이디</th>
                <td>{data?.modifiedBy}</td>
              </tr>
              </tbody>
            </table>
          </BoardTableContainer>
        </BoardTap>
        {/*캠페인설정*/}
        <BoardTapTitle>캠페인 설정</BoardTapTitle>
        <BoardTap>
          <BoardTableContainer>
            <table>
              <colgroup>
                <col width='15%'/>
                <col width='35%'/>
                <col width='35%'/>
              </colgroup>
              <tbody>
              <tr>
                <th className={'border-r'}>항목명</th>
                <th>이전 내역</th>
                <th>변경 내역</th>
              </tr>
              {campaignHistory.map((entry, key) => {
                return (
                  <tr key={key}>
                    <th className={'border-r border-t'}>{Object.values(entry)}</th>
                    <td className={'border-t'}>{data?.previous !== null && data?.previous !== undefined ? campConverters('previous',entry) : '-'}</td>
                    <td className={'border-t'}>{data?.current !== null && data?.current !== undefined ? campConverters('current',entry) : '-'}</td>
                  </tr>
                )
              })}
              </tbody>
            </table>
          </BoardTableContainer>
        </BoardTap>
        {/*예산 설정*/}
        <BoardTapTitle>예산 설정</BoardTapTitle>
        <BoardTap>
          <BoardTableContainer>
            <table>
              <colgroup>
                <col width='15%'/>
                <col width='35%'/>
                <col width='35%'/>
              </colgroup>
              <tbody>
              <tr>
                <th className={'border-r'}>설정 항목</th>
                <th>이전 내역</th>
                <th>변경 내역</th>
              </tr>
              {budgetHistory.map((entry, key) => {
                return (
                  <tr key={key}>
                    <th className={'border-r border-t'}>{Object.values(entry)}</th>
                    <td className={'border-t'}>{data?.previous !== undefined && data?.previous?.budget !== null && data?.previous?.budget !== undefined ? budgetConverters('previous',entry) : '-'}</td>
                    <td className={'border-t'}>{data?.current !== undefined && data?.current?.budget !== null && data?.current?.budget !== undefined ? budgetConverters('current',entry) : '-'}</td>
                  </tr>
                )
              })}

              <tr>
                <th className={'border-r border-t'}>이벤트 단가 그룹</th>
                <td className={'border-t'}>기본 단가 그룹</td>
                <td className={'border-t'}>기본 단가 그룹</td>
              </tr>
              <tr>
                <th className={'border-r border-t'}>이벤트 예산 그룹</th>
                <td className={'border-t'}>기본 예산 그룹</td>
                <td className={'border-t'}>기본 예산 그룹</td>
              </tr>
              <tr>
                <th className={'border-r border-t'}>시간대별 예산 그룹</th>
                <td className={'border-t'}>기본 예산 그룹</td>
                <td className={'border-t'}>기본 예산 그룹</td>
              </tr>
              </tbody>
            </table>
          </BoardTableContainer>
        </BoardTap>
        {/*광고 그룹 설정*/}
        <>
          <BoardTapTitle>광고 그룹 설정</BoardTapTitle>
          <BoardTap>
            <BoardTableContainer>
              <table>
                <colgroup>
                  <col width='15%'/>
                  <col width='35%'/>
                  <col width='35%'/>
                </colgroup>
                <tbody>
                <tr>
                  <th className={'border-r'}>설정 항목</th>
                  <th>이전 내역</th>
                  <th>변경 내역</th>
                </tr>
                {inventoryHistory.map((entry, key) => {

                  return (
                    <tr key={key}>
                      <th className={'border-r border-t'}>{Object.values(entry)}</th>
                      <td className={'border-t'}>{data?.previous !== undefined && data?.previous !== null && data?.previous?.inventory !== null ? inventoryConverter('previous', entry) : "-"}</td>
                      <td className={'border-t'}>{data?.current !== undefined && data?.current !== null && data?.current?.inventory !== null? inventoryConverter('current', entry) : "-"}</td>
                    </tr>
                  )
                })}
                </tbody>
              </table>
            </BoardTableContainer>
          </BoardTap>
        </>
        {/*크리에이티브 설정*/}
        <BoardTapTitle>크리에이티브 설정</BoardTapTitle>
        <BoardTap>
          <BoardTableContainer>
            <table>
              <colgroup>
                <col width='15%'/>
                <col width='35%'/>
                <col width='35%'/>
              </colgroup>
              <tbody>
              <tr>
                <th className={'border-r'}>설정 항목</th>
                <th>이전 내역</th>
                <th>변경 내역</th>
              </tr>
              {creativeHistory.map((entry, key) => {
                return (
                  <tr key={key}>
                    <th className={'border-r border-t'}>{Object.values(entry)}</th>
                    <td className={'border-t'}>{data?.previous !== null && data?.previous !== undefined && data?.previous?.creative !== null ? creativeConverters('previous',entry) : '-'}</td>
                    <td className={'border-t'}>{data?.current !== null && data?.current !== undefined && data?.current?.creative !== null ? creativeConverters('current',entry) : '-'}</td>
                  </tr>
                )
              })}
              {data?.productType !== 'POP_UNDER' &&
                <tr>
                  <th className={'border-r border-t'}>배너소재</th>
                  <td className={'border-t'}>{data?.previous !== null && data?.previous !== undefined && data?.previous?.creative !== null ? bannerImages('previous') : '-'}</td>
                  <td className={'border-t'}>{data?.current !== null && data?.current !== undefined && data?.current?.creative !== null ? bannerImages('current') : '-'}</td>
                </tr>
              }
              {data?.productType !== 'POP_UNDER' && materialDetailInfo.map((entry, key) => {
                return (
                  <tr key={key}>
                    <th className={'border-r border-t'}>{Object.values(entry)}</th>

                    <td className={'border-t'}>{data?.previous !== null && data?.previous !== undefined && data?.previous?.creative !== null && data?.previous?.creative?.materialDetailInfo !== undefined  ? materialConverters('previous',entry) : '-'}</td>
                    <td className={'border-t'}>{data?.current !== null && data?.current !== undefined && data?.current?.creative !== null && data?.current?.creative?.materialDetailInfo !== undefined ? materialConverters('current',entry) : '-'}</td>
                  </tr>
                )
              })}
              </tbody>
            </table>
          </BoardTableContainer>
        </BoardTap>
        <SubmitContainer>
          <Link to={'/board/historyCampaignManage'}>
            <CancelButton type={'button'}>목록</CancelButton>
          </Link>
        </SubmitContainer>
      </Loading>
    </>
  )
}

const ImageGroup = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px;
  width: 100%;
  background-color: #fafafa;
  & img {
    width: 70px;
    object-fit: cover;
  }
`