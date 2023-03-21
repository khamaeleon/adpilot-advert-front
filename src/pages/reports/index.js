import Navigator from "../../components/common/Navigator";
import {
  TitleContainer,
  BoardContainer,
} from "../../assets/GlobalStyles";
import ReportsMedia from "./Media";
import ReportsPage from "./Page";
import ReportsPeriod from "./Period";
import ReportsReception from "./AdExchange";
import {useParams} from "react-router-dom";
import ScrollToTop from "../../components/common/ScrollToTop";

function Reports(){
  const params = useParams()
  return(
    <main>
      <ScrollToTop/>
      <BoardContainer>
        <TitleContainer>
          <h1>보고서</h1>
          <Navigator/>
        </TitleContainer>
        {/* 기간별보고서 */}
        {params.id === 'reports' && <ReportsPeriod />}
        {/* 매체별보고서 */}
        {params.id === 'reports2' && <ReportsMedia />}
        {/* 지면별보고서 */}
        {params.id === 'reports3' && <ReportsPage />}
        {/* 외부연동수신보고서 */}
        {params.id === 'reports4' && <ReportsReception />}
      </BoardContainer>
    </main>
  )
}

export default Reports
