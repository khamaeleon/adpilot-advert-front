import {atom} from "jotai/index";

export const campaignGroupInfoAtom = atom({
    campaignId:'',
    exposeAgentType: ['WEB', 'WEB_APP', 'MOBILE_WEB', 'MOBILE_NATIVE_APP'],
    exposeInventoryType: 'AUTO',
    disExposeInventoryType: 'NONE',
    userTargetConfigType: 'AUTO',
    audienceTargetConfigType: 'AUTO',
    allowInventoryCategories: [],
    disAllowInventoryCategories: [],
    noExposeDaysOfConversionUser:0,
    noExposeDaysOfConversionAudience:0,
    exposeConversionUser:true,
    exposeShoppingUser:true,
    exposeAttentionUser:true,
    exposeVisitUser:true,
    exposeConversionAudience:true,
    exposeShoppingAudience:true,
    exposePotentialAudience:true,
    exposeNewAudience:true,
  }
)
export const mediaCategoryAtom = atom(null)

export const mediaInventoryInfoAtom = atom(null)
export const allowInventoryIdsAtom = atom(null)
export const disAllowInventoryIdsAtom = atom(null)

export const noViewType = [
    {key:1, value:3, label:'3일'},
    {key:2, value:5, label:'5일'},
    {key:3, value:7, label:'7일'},
    {key:4, value:10, label:'10일'},
    {key:5, value:15, label:'15일'}
]

