import {BoardTableContainer, BoardTap, BoardTapTitle, CancelButton, SubmitContainer} from "../../assets/GlobalStyles";
import React from "react";
import {Link} from "react-router-dom";

export function HistoryPriceDetail () {
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
              <td>나이키</td>
              <th>광고주 아이디</th>
              <td>nike123@naver.com</td>
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
              <td>YYYY.MM.DD HH:MM</td>
              <th>변경자 아이지</th>
              <td>gildong12@mcor.com</td>
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
              <th className={'border-r border-t'}>이벤트 단가 그룹명</th>
              <td className={'border-t'}>ROAS 극대화 그룹</td>
              <td className={'border-t'}>쇼핑 극대화 그룹</td>
            </tr>
            <tr>
              <th className={'border-r border-t'}>쇼퍼 맞춤</th>
              <td className={'border-t'}>120원</td>
              <td className={'border-t'}>100원</td>
            </tr>
            <tr>
              <th className={'border-r border-t'}>카트 추천</th>
              <td className={'border-t'}>-</td>
              <td className={'border-t'}>100원</td>
            </tr>
            <tr>
              <th className={'border-r border-t'}>상품 추천</th>
              <td className={'border-t'}>115원</td>
              <td className={'border-t'}>100원</td>
            </tr>
            <tr>
              <th className={'border-r border-t'}>유저 매치</th>
              <td className={'border-t'}>123원</td>
              <td className={'border-t'}>120원</td>
            </tr>
            <tr>
              <th className={'border-r border-t'}>오디언스</th>
              <td className={'border-t'}>100원</td>
              <td className={'border-t'}>100원</td>
            </tr>
            <tr>
              <th className={'border-r border-t'}>유저 최적화</th>
              <td className={'border-t'}>70원</td>
              <td className={'border-t'}>80원</td>
            </tr>
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
  )
}