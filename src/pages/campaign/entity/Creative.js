import {atom} from "jotai/index";

export const campaignCreativeAtom = atom(
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

