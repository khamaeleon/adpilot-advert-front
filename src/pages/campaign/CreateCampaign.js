import {CancelButton, SubmitButton, SubmitContainer} from "../../assets/GlobalStyles";
import React, {useEffect} from "react";
import {useAtom} from "jotai/index";
import {stepCampaignAtom} from "./entity";
import {retrieveTopLevelCategoryKeyValue} from "../../services/Platform/CategoryAxios";
import {CampaignOne} from "./steps/CampaignOne";
import {CampaignTwo} from "./steps/CampaignTwo";
import {CampaignThree} from "./steps/CampaignThree";
import {CampaignFour} from "./steps/CampaignFour";
import {CampaignLookOver} from "./steps/CampaignLookOver";



export default function CreateCampaign() {
  const [stepCampaign, setStepCampaign] = useAtom(stepCampaignAtom)
  const handleChangeSteps = () => {

  }

  return (
    <>
      <CampaignOne/>
      <CampaignTwo/>
      <CampaignThree/>
      <CampaignFour/>
      <CampaignLookOver/>

      <SubmitContainer>
        <CancelButton type={'button'}>취소</CancelButton>
        <SubmitButton type={'submit'} onClick={handleChangeSteps}>다음</SubmitButton>
      </SubmitContainer>
    </>
  )
}

