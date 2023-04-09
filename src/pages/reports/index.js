import Navigator from "../../components/common/Navigator";
import {BoardContainer, TitleContainer,} from "../../assets/GlobalStyles";
import {useParams} from "react-router-dom";
import ScrollToTop from "../../components/common/ScrollToTop";
import CreateReports from "./CreateReports";
import CustomReports from "./CustomReports";

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
        {params.id === 'reports' &&
          <CreateReports/>
        }
        {params.id === 'customReports' &&
          <CustomReports/>
        }
      </BoardContainer>
    </main>
  )
}

export default Reports
