import {CancelButton, SubmitButton, SubmitContainer} from "../../assets/GlobalStyles";
import React, {useState} from "react";
import {useAtom} from "jotai/index";
import {stepCampaignAtom} from "./entity";
import {CampaignOne} from "./steps/CampaignOne";
import {CampaignTwo} from "./steps/CampaignTwo";
import {CampaignThree} from "./steps/CampaignThree";
import {CampaignFour} from "./steps/CampaignFour";
import {CampaignLookOver} from "./steps/CampaignLookOver";
import {useResetAtom} from "jotai/utils";
import {toast, ToastContainer} from "react-toastify";
import { useForm, FormProvider, useFormContext } from "react-hook-form";

export default function CreateCampaign() {
  const [stepCampaign, setStepCampaign] = useAtom(stepCampaignAtom)
  const resetCampaign = useResetAtom(stepCampaignAtom)
  const [steps , setSteps] =useState(0)
  const methods = useForm()
  const handleChangeReset = () => {
    resetCampaign()
    setSteps(0)
  }
  const handleChangeSteps = () => {
    if(steps < 3 && stepCampaignAtom[steps]){
      setSteps(steps+1)
    } else {
      toast('필수 입력 체크', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <FormProvider {...methods}>
      <CampaignTwo/>
      <ToastContainer/>
    </FormProvider>
  )
}

