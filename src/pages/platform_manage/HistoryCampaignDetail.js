import {BoardTableContainer, BoardTap, BoardTapTitle, CancelButton, SubmitContainer} from "../../assets/GlobalStyles";
import React from "react";
import {Link} from "react-router-dom";

export function HistoryCampaignDetail () {
  return (
    <>
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
              <td>나이키</td>
              <th>광고주 명</th>
              <td>나이키</td>
              <th>광고주 명</th>
              <td>나이키</td>
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
            <tr>
              <th className={'border-r border-t'}>캠페인 명</th>
              <td className={'border-t'}>임시 캠페인</td>
              <td className={'border-t'}>나이키 특별 기획전</td>
            </tr>
            <tr>
              <th className={'border-r border-t'}>게재 상태</th>
              <td className={'border-t'}>게재 중</td>
              <td className={'border-t'}>게재 중</td>
            </tr>
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
            <tr>
              <th className={'border-r border-t'}>일 평균 예산</th>
              <td className={'border-t'}>무제한</td>
              <td className={'border-t'}>10,000원</td>
            </tr>
            <tr>
              <th className={'border-r border-t'}>예산 비율</th>
              <td className={'border-t'}>-</td>
              <td className={'border-t'}>PC 3,300원 / MOBILE 6,700원</td>
            </tr>
            <tr>
              <th className={'border-r border-t'}>입찰 방식</th>
              <td className={'border-t'}>CPC</td>
              <td className={'border-t'}>CPC</td>
            </tr>
            <tr>
              <th className={'border-r border-t'}>최대 입찰가</th>
              <td className={'border-t'}>12원</td>
              <td className={'border-t'}>13원</td>
            </tr>
            <tr>
              <th className={'border-r border-t'}>이벤트 단가 그룹</th>
              <td className={'border-t'}>전환 목표 그룹</td>
              <td className={'border-t'}>전환 목표 그룸</td>
            </tr>
            <tr>
              <th className={'border-r border-t'}>이벤트 예산 그룹</th>
              <td className={'border-t'}>노출 목표 그룹</td>
              <td className={'border-t'}>ROAS 최적화 그룹</td>
            </tr>
            <tr>
              <th className={'border-r border-t'}>시간대별 예산 그룹</th>
              <td className={'border-t'}>평일 퇴근 시간 집중 그룹</td>
              <td className={'border-t'}>평일 업무 시간 그룹</td>
            </tr>
            </tbody>
          </table>
        </BoardTableContainer>
      </BoardTap>
      {/*광고 그룹 설정*/}
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
            <tr>
              <th className={'border-r border-t'}>광고 그룹명</th>
              <td className={'border-t'}>GR_BA_202306121423</td>
              <td className={'border-t'}>특별 기획전 전용</td>
            </tr>
            <tr>
              <th className={'border-r border-t'}>노출 영역</th>
              <td className={'border-t'}>PC 웹 / PC 어플리케이션</td>
              <td className={'border-t'}>PC 웹 / PC 어플리케이션 / MOBILE 웹</td>
            </tr>
            <tr>
              <th className={'border-r border-t'}>게재 지명 설정</th>
              <td className={'border-t'}>직접 선택 (3개 지면)</td>
              <td className={'border-t'}>카테고리 설정 <p>[언론사 / 웹하드 / 블로그]</p></td>
            </tr>
            <tr>
              <th className={'border-r border-t'}>송출 제한 지면 설정</th>
              <td className={'border-t'}>없음</td>
              <td className={'border-t'}>카테고리 설정 <p>[웹하드]</p></td>
            </tr>
            <tr>
              <th className={'border-r border-t'}>게재 기간</th>
              <td className={'border-t'}>YYYY.MM.DD ~ YYYY.MM.DD</td>
              <td className={'border-t'}>YYYY.MM.DD ~ </td>
            </tr>
            <tr>
              <th className={'border-r border-t'}>고객 정보 기반 설정</th>
              <td className={'border-t'}>자동 최적화</td>
              <td className={'border-t'}>개별 설정 <p>[전환고객 - 미노출3일]</p></td>
            </tr>
            <tr>
              <th className={'border-r border-t'}>오디언스 분석 설정</th>
              <td className={'border-t'}>자동 최적화</td>
              <td className={'border-t'}>자동 최적화</td>
            </tr>
            </tbody>
          </table>
        </BoardTableContainer>
      </BoardTap>
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
            <tr>
              <th className={'border-r border-t'}>광고 그룹명</th>
              <td className={'border-t'}>BA_BA_202306121423</td>
              <td className={'border-t'}>특별 기획전 크리에이티브</td>
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
                  <img src={''} alt="이미지2" />
                </div>
              </td>
              <td className={'border-t'}>
                <div>
                  <h5>600*300</h5>
                  <img src={''} alt="이미지" />
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
    </>
  )
}