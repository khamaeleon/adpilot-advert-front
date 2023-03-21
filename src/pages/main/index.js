import styled from "styled-components";
import {Link} from "react-router-dom";

function Main(){
  return(
    <div>
      <Header>
        <div>
          <Logo>
            <h1>아이엠</h1>
          </Logo>
          <Menu>
            <Link to={'/login'}>로그인</Link>
            <Link to={'/board/dashboard'}>대시보드</Link>
            <Link to={'/board/media'}>지면관리</Link>
            <Link to={'/board/adExchange'}>애드 익스체인지</Link>
            <Link to={'/board/reports'}>보고서</Link>
            <Link to={'/board/account'}>정산관리</Link>
            <Link to={'/board/platform'}>플랫폼관리</Link>
          </Menu>
        </div>
      </Header>
      <main>
        <Section>
          <article>
            <h1>title</h1>
            <h2>sub title</h2>
            <h3>description</h3>
          </article>
        </Section>
        <Section>
          <article>
            <h2>수익 극대화에 대한 고민은 아이엠이 합니다.</h2>
            <h3>“아이엠“의 DMP(Data Management Platform)</h3>
            <div>
              <p>“플랫폼 명”은 DSP와 SSP를 통합한 플랫폼을 구축하여
                광고주에게 최적화된 광고 효율 제공
                퍼블리셔에게는 간편한 관리와 최대의 수익을 제공합니다.</p>
            </div>
          </article>
        </Section>
        <Section>
          <article>
            <h2>지속 가능한 Platform</h2>
            <p>
              지속적인 AD Tech 서비스 개발을 통해
              인벤토리의 효과적인 활용으로 높은 수익율 제공
            </p>
            <h2>효율적인 Platform</h2>
            <p>
              복잡했던 지면 등록 및 관리를 누구나 쉽게
              이용할 수 있도록 시스템 구축
            </p>
            <h2>접근성 높은 Platform</h2>
            <p>
              수 많은 데이터 분석 및 가공 경험을 기반하여
              보다 접근성 높은 효율 데이터 제공
            </p>
          </article>
        </Section>
        <Section>
          <article>
            <h1>PARTNERS</h1>
            <h1>ABOUT US</h1>
          </article>
        </Section>
      </main>
    </div>
  )
}

export default Main

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
  border-bottom: 1px solid #ddd;
  & div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1200px;
  }
`

const Logo = styled.div`
  width: 100px;
`

const Menu = styled.div`
  font-size: 20px;
  & a {
    display: inline-block;
    transition-duration: 0.5s;
    &:hover {
      font-weight: 900;
      color: #000;
    }
  }
`

const Section = styled('section')`
  width: 100%;
  height: 100vh;
  & article {
    width: 1200px;
    height: 100vh;
    padding: 40px;
  }
`
