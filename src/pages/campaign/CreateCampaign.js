import React, {useState} from "react";
import {stepCampaignAtom} from "./entity";
import {CampaignThree} from "./steps/CampaignThree";
import {useResetAtom} from "jotai/utils";
import {toast, ToastContainer} from "react-toastify";
import {FormProvider, useForm} from "react-hook-form";
import {CampaignLookOver} from "./steps/CampaignLookOver";
import {CampaignOne} from "./steps/CampaignOne";
import {CampaignTwo} from "./steps/CampaignTwo";
import {CampaignFour} from "./steps/CampaignFour";
import {useAtom} from "jotai";
import {DefaultButton} from "../../assets/GlobalStyles";

export default function CreateCampaign() {
  const [stepCampaign, setStepCampaign] = useAtom(stepCampaignAtom)
  const methods = useForm()

  const forceNextStep = () => {
    if(stepCampaign.steps < 4) {
      setStepCampaign({...stepCampaign,steps: (stepCampaign.steps + 1)})
    }
  }
  return (
    <FormProvider {...methods}>
      {stepCampaign.steps === 0 &&
        <CampaignOne/>
      }
      {stepCampaign.steps === 1 &&
        <CampaignTwo/>
      }
      {stepCampaign.steps === 2 &&
        <CampaignThree/>
      }
      {stepCampaign.steps === 3 &&
        <CampaignFour/>
      }
      {stepCampaign.steps === 4 &&
        <CampaignLookOver/>
      }
      <DefaultButton type={'button'} onClick={forceNextStep}>강제 다음단계</DefaultButton>
      <ToastContainer/>
    </FormProvider>
  )
}

