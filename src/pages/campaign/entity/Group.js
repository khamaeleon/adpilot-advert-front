import {atom} from "jotai/index";

export const campaignGroupInfoAtom =atom({
  campaignId:'',
  exposeAgentType:['WEB', 'WEB_APP', 'MOBILE_WEB', 'MOBILE_NATIVE_APP'],
  exposeInventoryType:'AUTO',
  userTargetConfigType:'AUTO',
  audienceTargetConfigType:'AUTO',
  allowInventoryCategories:[]}
)
export const mediaCategoryAtom =atom(null)

export const mediaInventoryInfoAtom =atom(null)

