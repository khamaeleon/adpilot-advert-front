import {atom} from "jotai/index";
import {atomWithReset} from "jotai/utils";

export const nextStepAtom = atom({
  terms: false,
  validation: false
})
export const termsInfoAtom = atom(null)

export const accountInfoAtom = atomWithReset({
  username: '',
  password: '',
  adverName:'',
  confirmPassword: '',
  adverType: 'ADVER',
  hostType:'',
  companyName: '',
  managerName1: '',
  managerPhone1: '',
  managerEmail1: '',
  selectHost: '',
  businessNumber: '',
  businessLicenseWebPath: '',
  ceoName: '',
  location: '',
  locationDetail: '',
  postNumber:'',
  typeOfBusiness:'',
  itemsOfBusiness:'',
  taxInvoiceEmail: '',
  serviceTermsId: 0,
  isAgreedByServiceTerms: false,
  privacyTermsId: 0,
  isAgreedByPrivacyTerms: false,
  operationTermsId: 0,
  isAgreedByOperationTerms: false
})

export const hostList = [
  {key:0, value:'MAKE_SHOP', label:'메이크샵'},
  {key:1, value:'CAFE24', label:'카페24'},
  {key:2, value:'NHN_GODO_MALL', label:'고도몰'},
  {key:3, value:'INDEPENDENT_MALL', label:'독립몰'},
  {key:4, value:'IM_WEB', label:'아임웹'},
  {key:5, value:'FIRST_MALL', label:'퍼스트몰'},
  {key:6, value:'WHO_IS', label:'후이즈몰'},
  {key:7, value:'WISA_MALL', label:'위사몰'},
  {key:8, value:'SMART_STORE', label:'스마트스토어'},
  {key:9, value:'OTHER', label:'기타'}
]