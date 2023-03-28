import {atom} from "jotai/index";

export const nextStepAtom = atom({
  terms: false,
  validation: false
})
export const termsInfoAtom = atom([])

export const accountInfoAtom = atom({
  username: '',
  password: '',
  confirmPassword: '',
  mediaType: 'DIRECT',
  siteName: '',
  managerName: '',
  managerPhone: '',
  selectHost: '',
  corporationName: '',
  businessNumber: '',
  businessType:'',
  businessLicenseCopy: '',
  ceoName: '',
  corporationAddress: '',
  taxEmail: '',
  serviceTermsId: 0,
  isAgreedByServiceTerms: false,
  privacyTermsId: 0,
  isAgreedByPrivacyTerms: false,
  operationTermsId: 0,
  isAgreedByOperationTerms: false
})

export const hostList = [
  {key:0, value:'makeshop', label:'메이크샵'},
  {key:1, value:'cafe24', label:'카페24'},
  {key:2, value:'godomall', label:'고도몰'},
  {key:3, value:'openmall', label:'독립몰'},
  {key:4, value:'imweb', label:'아임웹'},
  {key:5, value:'firstmall', label:'퍼스트몰'},
  {key:6, value:'whoismall', label:'후이즈몰'},
  {key:7, value:'wisamall', label:'위사몰'},
  {key:8, value:'smartstore', label:'스마트스토어'},
  {key:9, value:'etc', label:'기타'}
]