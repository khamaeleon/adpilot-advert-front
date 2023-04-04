import {atom} from "jotai/index";
import {atomWithReset} from "jotai/utils";

export const stepCampaignAtom = atomWithReset([
  {
    name: 'campaignOne',
    validation: false,
  },
  {
    name: 'campaignTwo',
    validation: false,
  },
  {
    name: 'campaignThree',
    validation: false,
  },
  {
    name: 'campaignFour',
    validation: false,
  },
  {
    name: 'campaignLookOver',
    validation: false,
  }
])