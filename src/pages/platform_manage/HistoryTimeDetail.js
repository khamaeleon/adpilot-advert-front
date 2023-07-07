import {BoardTableContainer, BoardTap, BoardTapTitle, CancelButton, SubmitContainer} from "../../assets/GlobalStyles";
import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {findRevisionBudgetTimeDetail} from "../../services/Platform/HistoryAxios";

export function HistoryTimeDetail () {
  const {state} = useLocation()
  const [data, setData] = useState()

  useEffect(()=> {
    findRevisionBudgetTimeDetail(state).then(response =>{
      setData(response)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
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
              <tr>
                <th className={'border-r border-t'}>시간별 예산 그룹명</th>
                <td className={'border-t'}>{data?.previous !== null ? data?.previous?.groupName : '-'}</td>
                <td className={'border-t'}>{data?.current !== null ? data?.current?.groupName : '-'}</td>
              </tr>
            </tbody>
          </table>
        </BoardTableContainer>
        <BoardTableContainer style={{marginTop: 30}}>
          <table>
            <colgroup>
              <col width='15%'/>
              <col width='70%'/>
            </colgroup>
            <tbody>
              <tr>
                <th className={'border-r'}>이전 내역</th>
                <td>
                  {data?.previous !== null &&
                    <div></div>
                  }
                </td>
              </tr>
              <tr>
                <th className={'border-r border-t'}>변경 내역</th>
                <td className={'border-t'}>

                </td>
              </tr>
            </tbody>
          </table>
        </BoardTableContainer>
      </BoardTap>
      <SubmitContainer>
        <Link to={'/board/historyTimeManage'}>
          <CancelButton type={'button'}>목록</CancelButton>
        </Link>
      </SubmitContainer>
    </>
  )
}
