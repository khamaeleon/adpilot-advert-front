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
import {adExChangeDetailInfo} from "./entity";
const AdExChangeDetailInfo = atom(adExChangeDetailInfo)
function PlatformAdExchangeDetail(){
  const [adExChangeDetailInfoState] = useAtom(AdExChangeDetailInfo)
  const borderRight = {
    borderRight: '1px solid #dddddd'
  }
  return(
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
              <thead>
              <tr>
                <th>지면명</th>
                <th>아이디</th>
                <th>지면번호</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>{adExChangeDetailInfoState.inventoryName}</td>
                <td>{adExChangeDetailInfoState.accountId}</td>
                <td>{adExChangeDetailInfoState.inventoryCode}</td>
              </tr>
              </tbody>
            </table>
          </BoardTableContainer>
        </BoardTap>
        <BoardTapTitle>이력 정보</BoardTapTitle>
        <BoardTap>
          <BoardTableContainer>
            <table>
              <thead>
              <tr>
                <th>이전 작성 일지</th>
                <td>{adExChangeDetailInfoState.beforeUpdateDate}</td>
                <th>변경일시</th>
                <td>{adExChangeDetailInfoState.lastUpdateDate}</td>
              </tr>
              </thead>
              <tbody>
              <tr>
                <th>이전 작성자</th>
                <td>{adExChangeDetailInfoState.beforeUpdateName}</td>
                <th>변경자</th>
                <td>{adExChangeDetailInfoState.lastUpdateName}</td>
              </tr>
              </tbody>
            </table>
          </BoardTableContainer>
        </BoardTap>
        <BoardTapTitle>광고 상품 설정 이력</BoardTapTitle>
        <BoardTap>
          <BoardTableContainer>
            <table>
              <thead>
              <tr>
                <th>항목명</th>
                <th>이전 내역</th>
                <th>변경 내역</th>
              </tr>
              </thead>
              <tbody>
              {
                adExChangeDetailInfoState && adExChangeDetailInfoState.adExChangeConfig.map((value,key) =>{
                  return (
                    <tr>
                      <th>{value.adExChangeName}</th>
                      <td>{value.beforePublication?'ON':'OFF'}</td>
                      <td>{value.lastPublication?'ON':'OFF'}</td>
                    </tr>
                  )
                })
              }
              </tbody>
            </table>
          </BoardTableContainer>
        </BoardTap>
        <BoardTapTitle>송출 순서 설정</BoardTapTitle>
        <BoardTap>
          <BoardTableContainer>
            <table>
              <thead>
              <tr>
                <th>항목명</th>
                <th>이전 내역</th>
                <th>변경 내역</th>
              </tr>
              </thead>
              <tbody>
              {
                adExChangeDetailInfoState && adExChangeDetailInfoState.rankingConfig.map((value,key) =>{
                  return (
                    <tr>
                      <th>{value.adExChangeName}</th>
                      <td>{value.beforeRankingValue}</td>
                      <td>{value.lastRankingValue}</td>
                    </tr>
                  )
                })
              }
              </tbody>
            </table>
          </BoardTableContainer>
        </BoardTap>

        <SubmitContainer>
          <SubmitButton>목록</SubmitButton>
        </SubmitContainer>
      </BoardContainer>
    </main>
  )
}

export default PlatformAdExchangeDetail
