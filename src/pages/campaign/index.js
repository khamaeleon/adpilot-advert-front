import {useParams} from "react-router-dom";
import CreateCampaign from "./CreateCampaign";
import ScrollToTop from "../../components/common/ScrollToTop";
import {BoardContainer, TitleContainer} from "../../assets/GlobalStyles";
import Navigator from "../../components/common/Navigator";
import CreateCreative from "./CreateCreative";
import {ManageCreative} from "./ManageCreative";

export default function Campaign(){
  const params = useParams()
  return(
    <main>
      <ScrollToTop/>
      <BoardContainer>
        <TitleContainer>
          <h1>캠페인 생성</h1>
          <Navigator/>
        </TitleContainer>
        {params.id === 'campaign' && <CreateCampaign />}
        {params.id === 'createCreative' && <CreateCreative />}
        {params.id === 'manageCreative' && <ManageCreative />}
      </BoardContainer>
    </main>
  )
}