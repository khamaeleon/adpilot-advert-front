import {useAtom, useSetAtom} from "jotai/index";
import React, {useEffect, useState} from "react";
import {selPolicyLatestTerms} from "../../services/Platform/ManageUserAxios";
import Checkbox from "../../components/common/Checkbox";
import {accountInfoAtom, nextStepAtom, termsInfoAtom} from "./entity/Common";
import {AlignRight, TermsBox, VerticalRule} from "./styles";

export default function Terms() {
  const [accountInfo, setAccountInfo] = useAtom(accountInfoAtom);
  const [termsInfo, setTermsInfo] = useAtom(termsInfoAtom)
  const [isAgreeAll, setIsAgreeAll] = useState(false)
  const setValidation = useSetAtom(nextStepAtom)

  useEffect(() => {
    selPolicyLatestTerms().then(response => {
      setTermsInfo(response)
      setAccountInfo({
        ...accountInfo,
        serviceTermsId: response.find(value => value.termsType === 'SERVICE').id,
        privacyTermsId: response.find(value => value.termsType === 'PRIVACY').id,
        operationTermsId: response.find(value => value.termsType === 'OPERATION').id
      })
    })
  }, [])
  /**
   * 약관 전체 선택 및 동의
   */
  useEffect(() => {
    if (accountInfo.isAgreedByServiceTerms && accountInfo.isAgreedByPrivacyTerms && accountInfo.isAgreedByOperationTerms) {
      setIsAgreeAll(true)
      setValidation({
        terms: true,
        validation: false
      })
    } else {
      setIsAgreeAll(false)
      setValidation({
        terms: false,
        validation: false
      })
    }
  }, [accountInfo, isAgreeAll]);

  /**
   * 약관 전체 선택 핸들러
   * @param event
   */
  const handleChangeAgreeAll = (event) => {
    setAccountInfo({
      ...accountInfo,
      isAgreedByServiceTerms: event.target.checked,
      isAgreedByPrivacyTerms: event.target.checked,
      isAgreedByOperationTerms: event.target.checked
    })
    setIsAgreeAll(event.target.checked)
  }
  /**
   * 약관 동의 핸들러
   * @param event
   */
  const handleChangeTerms = (event) => {
    if (event.target.id === 'serviceTerms') {
      setAccountInfo({
        ...accountInfo,
        isAgreedByServiceTerms: event.target.checked
      })
    } else if (event.target.id === 'privacyTerms') {
      setAccountInfo({
        ...accountInfo,
        isAgreedByPrivacyTerms: event.target.checked
      })
    } else if (event.target.id === 'operationTerms') {
      setAccountInfo({
        ...accountInfo,
        isAgreedByOperationTerms: event.target.checked
      })
    }
  }

  return (
    <article>
      <div><h2>약관 동의</h2></div>
      <VerticalRule style={{height: 3, backgroundColor: '#aaa'}}/>
      <AlignRight>
        <Checkbox
          type={'c'}
          label={'하기 모든 약관에 동의합니다.'}
          isChecked={isAgreeAll}
          onChange={(e) => handleChangeAgreeAll(e)}/>
      </AlignRight>
      <VerticalRule/>
      {/*약관 1*/}
      <div>
        <h3>서비스 약관 (필수)</h3>
        <TermsBox>
          {termsInfo !== null &&
            termsInfo.map((value) => {
              if (value.termsType === 'SERVICE') {
                return value.content
              }
            })
          }
        </TermsBox>
      </div>
      <AlignRight>
        <Checkbox
          type={'a'}
          label={'위 내용에 동의합니다.'}
          isChecked={
            accountInfo.isAgreedByServiceTerms
          }
          id={'serviceTerms'}
          onChange={(e) => handleChangeTerms(e)}/>
      </AlignRight>
      <VerticalRule/>
      {/*약관2*/}
      <div>
        <h3>개인처리방침 약관(필수)</h3>
        <TermsBox>
          {termsInfo !== null &&
            termsInfo.map((value) => {
              if (value.termsType === 'PRIVACY') {
                return value.content
              }
            })
          }
        </TermsBox>
      </div>
      <AlignRight>
        <Checkbox
          label={'위 내용에 동의합니다.'}
          type={'a'}
          id={'privacyTerms'}
          isChecked={accountInfo.isAgreedByPrivacyTerms}
          onChange={(e) => handleChangeTerms(e)}/>
      </AlignRight>
      {/*약관3*/}
      <div>
        <h3>운영 처리방침(필수)</h3>
        <TermsBox>
          {termsInfo !== null &&
            termsInfo.map((value) => {
              if (value.termsType === 'OPERATION') {
                return value.content
              }
            })
          }
        </TermsBox>
      </div>
      <AlignRight>
        <Checkbox
          label={'위 내용에 동의합니다.'}
          type={'a'}
          id={'operationTerms'}
          isChecked={accountInfo.isAgreedByOperationTerms}
          onChange={(e) => handleChangeTerms(e)}/>
      </AlignRight>
    </article>
  )
}