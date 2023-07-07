import {BoardTableContainer, BoardTap, BoardTapTitle, CancelButton, SubmitContainer} from "../../assets/GlobalStyles";
import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {findRevisionTargetingPriceDetail} from "../../services/Platform/HistoryAxios";
import {Loading} from "./entity/History";

const budgetPriceHistory = [
  {groupName: '이벤트 단가 그룹명'},
  {shopperMatching: '쇼퍼 맞춤'},
  {cartRecommendation: '카트 추천'},
  {productRecommendation: '상품 추천'},
  {userMatching: '유저 매치'},
  {audience: '오디언스'},
  {userOptimization: '유저 최적화'},
]

export function HistoryPriceDetail () {
  const {state} = useLocation()
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(()=> {
    setIsLoading(true)
    findRevisionTargetingPriceDetail(state).then(response =>{
      setData(response)
      setIsLoading(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <Loading>
      {!isLoading &&
        <>
          {/*캠페인 정보*/}
          <BoardTapTitle>캠페인 정보</BoardTapTitle>
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
                  <th>광고주 명</th>
                  <td>{data?.adverName}</td>
                  <th>광고주 아이디</th>
                  <td>{data?.username}</td>
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
                  <th>변경자 아이지</th>
                  <td>{data?.modifiedBy}</td>
                </tr>
                </tbody>
              </table>
            </BoardTableContainer>
          </BoardTap>
          {/*이벤트 단가 그룹 설정*/}
          <BoardTapTitle>이벤트 단가 그룹 설정</BoardTapTitle>
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
                {budgetPriceHistory.map((entry, key) => {
                  console.log(data?.current[Object.keys(entry)])
                  return (
                    <tr>
                      <th className={'border-r border-t'}>{Object.values(entry)}</th>
                      <td className={'border-t'}>{data?.previous !== null ? data?.previous[Object.keys(entry)] : '-'}</td>
                      <td className={'border-t'}>{data?.current !== null ? data?.current[Object.keys(entry)] : '-'}</td>
                    </tr>
                  )
                })}
                </tbody>
              </table>
            </BoardTableContainer>
          </BoardTap>
          <SubmitContainer>
            <Link to={'/board/historyPriceManage'}>
              <CancelButton type={'button'}>목록</CancelButton>
            </Link>
          </SubmitContainer>
        </>
      }
    </Loading>
  )
}
