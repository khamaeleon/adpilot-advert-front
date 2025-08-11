import {useParams} from "react-router-dom";
import CreateCampaign from "./CreateCampaign";
import ScrollToTop from "../../components/common/ScrollToTop";
import {BoardContainer, TitleContainer} from "../../assets/GlobalStyles";
import Navigator from "../../components/common/Navigator";
import {ManageCreative} from "./ManageCreative";
import {CampaignFour} from "./steps/CampaignFour";
import {FormProvider, useForm} from "react-hook-form";
import {BannerCreative} from "./BannerCreative";
import {AudioCreative} from "./AudioCreative";

export default function Campaign(){
  const params = useParams()
  const methods = useForm()
  return(
    <main>
      <ScrollToTop/>
      <BoardContainer>
        <TitleContainer>
          <h1>광고 관리</h1>
          <Navigator/>
        </TitleContainer>
        {params.id === 'campaign' && <CreateCampaign />}
        {params.id === 'manageCreative' && <ManageCreative />}
        {params.id === 'manageCreativeDetail' && <FormProvider {...methods}><CampaignFour /></FormProvider>}
        {params.id === 'bannerCreative' && <BannerCreative/>}
        {params.id === 'audioCreative' && <AudioCreative/>}
      </BoardContainer>
    </main>
  )
}