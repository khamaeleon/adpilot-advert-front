import {BoardTableContainer, BoardTap, BoardTapTitle, CancelButton, SubmitContainer} from "../../assets/GlobalStyles";
import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {findRevisionCampaignDetail} from "../../services/Platform/HistoryAxios";
import {Loading} from "./entity/History";

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
  {name: '광고 그룹명'},
  {creativeType: '크리에이티브 유형'},
  {pcLandingUrl: 'PC 랜딩 URL'},
  {pcReferralCode: 'PC 인식코드 '},
  {mobLandingUrl: 'MOBILE 랜딩 URL'},
  {mobReferralCode: 'MOBILE 인식코드'},
  {name: '광고 소재'},
  {name: '광고 타이틀'},
  {name: '광고 제목1'},
  {name: '광고 제목2'},
  {name: '긴 광고 제목'},
  {name: '클릭 유도 문안'},
  {name: '로고 이미지'},
  {name: '광고 설명'},
]

export function HistoryCampaignDetail () {
  const {state} = useLocation()
  const [data, setData] = useState()

  useEffect(()=> {
    findRevisionCampaignDetail(state).then(response => {
      console.log(response)
      setData(response)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const campConverters = (status,arg) => {
    let value;
    const campaignReserved = data[status]
    if(Object.keys(arg)[0] === 'publishYn') {
      value = campaignReserved[Object.keys(arg)] === 'Y' ? '게제 중' : '게재 중지'
    } else {
      value = campaignReserved[Object.keys(arg)]
    }
    return value
  }

  const budgetConverters  = (status,arg) => {
    let value;
    const budgetReserved = data[status]?.budget
    if(Object.keys(arg)[0] === 'infiniteBudgetYn') {
      value = budgetReserved[Object.keys(arg)] === 'N' ? `PC ${data[status]?.budget.pcBudget}원  / MOBILE ${data[status]?.budget.mobBudget}원` : '-'
    } else {
      value = budgetReserved[Object.keys(arg)]
    }
    return isNaN(value) ? value : value + '원'
  }

  const inventoryConverter = (status,arg) => {
    let value;
    const inventoryReserved = data[status]?.inventory
    if(Object.keys(arg)[0] === 'audienceTargetConfigType') {
      const audience = () => {
        return (
          <>
            <p>{inventoryReserved?.audienceTargetConfig.exposureConversionYn === 'Y' && '미전환'}</p>
            <p>{inventoryReserved?.audienceTargetConfig.exposureNewYn}</p>
            <p>{inventoryReserved?.audienceTargetConfig.exposurePotentialYn}</p>
            <p>{inventoryReserved?.audienceTargetConfig.exposureShoppingYn}</p>
            <p>{inventoryReserved?.audienceTargetConfig.nonExposureDaysOfConversion}</p>
          </>
        )
      }
      value = inventoryReserved[Object.keys(arg)] === 'AUTO' ? `자동최적화` : audience
    } else if(Object.keys(arg)[0] === 'userTargetConfigType') {
      const user = () => {
        return (
          <>
            <p>{inventoryReserved?.userTargetConfig.exposureAttentionUserYn}</p>
            <p>{inventoryReserved?.userTargetConfig.exposureConversionUserYn}</p>
            <p>{inventoryReserved?.userTargetConfig.exposureShoppingUserYn}</p>
            <p>{inventoryReserved?.userTargetConfig.exposureVisitUserYn}</p>
            <p>{inventoryReserved?.userTargetConfig.nonExposureDaysOfConversion}</p>
          </>
        )
      }
      value = inventoryReserved[Object.keys(arg)] === 'AUTO' ? `자동최적화` : user
    } else if(Object.keys(arg)[0] === 'startDate') {
      value = `${inventoryReserved['startDate']} ~ ${inventoryReserved['endDate']}`
    } else if (Object.keys(arg)[0] === 'allowInventoryCategories' || Object.keys(arg)[0] === 'disAllowInventoryCategories') {
      value = inventoryReserved[Object.keys(arg)].length !== 0 ? `[${inventoryReserved[Object.keys(arg)].join('/ ')}]` : '없음'
    } else if(Object.keys(arg)[0] === 'exposureAgentType') {
      value = inventoryReserved[Object.keys(arg)].length !== 0 ? `[${inventoryReserved[Object.keys(arg)].map((item) => eventGoalGroup[item]).join('/ ')}]` : '-'
    } else {
      value = inventoryReserved[Object.keys(arg)]
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
                <td className={'border-t'}></td>
                <td className={'border-t'}></td>
              </tr>
              <tr>
                <th className={'border-r border-t'}>이벤트 예산 그룹</th>
                <td className={'border-t'}></td>
                <td className={'border-t'}></td>
              </tr>
              <tr>
                <th className={'border-r border-t'}>시간대별 예산 그룹</th>
                <td className={'border-t'}></td>
                <td className={'border-t'}></td>
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
                  <tr>
                    <th className={'border-r border-t'}>{Object.values(entry)}</th>
                    <td className={'border-t'}></td>
                    <td className={'border-t'}></td>
                  </tr>
                )
              })}
              <tr>
                <th className={'border-r border-t'}>광고 그룹명</th>
                <td className={'border-t'}>{data?.previous?.creative !== null ? data?.previous?.creative?.name : '-'}</td>
                <td className={'border-t'}>{data?.current?.creative !== null ? data?.current?.creative?.name : '-'}</td>
              </tr>
              <tr>
                <th className={'border-r border-t'}>크리에이티브 유형</th>
                <td className={'border-t'}>고정 배너</td>
                <td className={'border-t'}>네이티브</td>
              </tr>
              <tr>
                <th className={'border-r border-t'}>PC 랜딩URL</th>
                <td className={'border-t'}>https://www.naver.com</td>
                <td className={'border-t'}>https://www.google.com</td>
              </tr>
              <tr>
                <th className={'border-r border-t'}>PC 인식코드</th>
                <td className={'border-t'}>=wpdkfm</td>
                <td className={'border-t'}>=wpdkfm23></td>
              </tr>
              <tr>
                <th className={'border-r border-t'}>MOBILE 랜딩URL</th>
                <td className={'border-t'}>https://m.naver.com</td>
                <td className={'border-t'}>https://m.google.com</td>
              </tr>
              <tr>
                <th className={'border-r border-t'}>MOBILE 인식코드</th>
                <td className={'border-t'}>=wpdkfm</td>
                <td className={'border-t'}>=wpdkfm23</td>
              </tr>
              <tr>
                <th className={'border-r border-t'}>광고 소재</th>
                <td className={'border-t'}>
                  <div>
                    <h5>250*250</h5>
                    <img src={''} alt="이미지2"/>
                  </div>
                </td>
                <td className={'border-t'}>
                  <div>
                    <h5>600*300</h5>
                    <img src={''} alt="이미지"/>
                  </div>
                </td>
              </tr>
              <tr>
                <th className={'border-r border-t'}>광고 타이틀</th>
                <td className={'border-t'}>나이키 특별 기획전</td>
                <td className={'border-t'}>NIKE 특별 기획전</td>
              </tr>
              <tr>
                <th className={'border-r border-t'}>광고 제목1</th>
                <td className={'border-t'}>JUST DO IT</td>
                <td className={'border-t'}>JUST DO IT</td>
              </tr>
              <tr>
                <th className={'border-r border-t'}>광고 제목2</th>
                <td className={'border-t'}>-</td>
                <td className={'border-t'}>-</td>
              </tr>
              <tr>
                <th className={'border-r border-t'}>긴 광고 제목</th>
                <td className={'border-t'}>불가능은 없다</td>
                <td className={'border-t'}>-</td>
              </tr>
              <tr>
                <th className={'border-r border-t'}>클릭 유도 문안</th>
                <td className={'border-t'}>구매하기</td>
                <td className={'border-t'}>바로가기</td>
              </tr>
              <tr>
                <th className={'border-r border-t'}>로고 이미지</th>
                <td className={'border-t'}>
                  <div>
                    <img src={''} alt={'로고'}/>
                    <img src={''} alt={'로고'}/>
                  </div>
                </td>
                <td className={'border-t'}>
                  <div>
                    <img src={''} alt={'로고'}/>
                    <img src={''} alt={'로고'}/>
                  </div>
                </td>
              </tr>
              <tr>
                <th className={'border-r border-t'}>광고 설명</th>
                <td className={'border-t'}>NIKE 특별 기획전은 2023 새학기 기념 이벤트</td>
                <td className={'border-t'}>-</td>
              </tr>
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