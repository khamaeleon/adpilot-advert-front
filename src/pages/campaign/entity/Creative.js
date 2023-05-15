import {atom} from "jotai/index";
import {atomWithReset} from "jotai/utils";

export const campaignCreativeAtom = atomWithReset(
  {
    campaignId: '',
    creativeType: 'BANNER',
    materials: [],
    pcLandingUrl: '',
    mobLandingUrl: '',
    mobReferralCode: '',
    pcReferralCode: '',
    logoPaths: [],
    nativeMaterials: [],
  }
)

export const bannerSizeAtom = atom(null)

export const creativeTypeAtom = atom(null)

export const clickInducementTypeAtom = atom(null)

