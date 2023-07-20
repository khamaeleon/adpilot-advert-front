import React from "react";
import {stepCampaignAtom} from "./entity";
import {CampaignThree} from "./steps/CampaignThree";
import {FormProvider, useForm} from "react-hook-form";
import {CampaignLookOver} from "./steps/CampaignLookOver";
import {CampaignOne} from "./steps/CampaignOne";
import {CampaignTwo} from "./steps/CampaignTwo";
import {CampaignFour} from "./steps/CampaignFour";
import {useAtomValue} from "jotai";

export default function CreateCampaign() {
  const stepCampaign = useAtomValue(stepCampaignAtom)
  const methods = useForm()
  return (
    <FormProvider {...methods}>
      {(stepCampaign?.steps === 0 || stepCampaign?.steps === null) &&
        <CampaignOne/>
      }
      {stepCampaign?.steps === 1 &&
        <CampaignTwo/>
      }
      {stepCampaign?.steps === 2 &&
        <CampaignThree/>
      }
      {stepCampaign?.steps === 3 &&
        <CampaignFour/>
      }
      {stepCampaign?.steps === 4 &&
        <CampaignLookOver/>
      }
    </FormProvider>
  )
}

