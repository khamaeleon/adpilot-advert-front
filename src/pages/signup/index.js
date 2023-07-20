import {Link} from "react-router-dom";
import React, {useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import Terms from "./Terms";
import Basic from "./Basic";
import Done from "./Done";
import {useAtomValue} from "jotai";
import {nextStepAtom} from "./entity/Common";
import {Arrow, ButtonGroup, Logo, SignUpContents, SignUpHeader, Step, StepContainer, Steps} from "./styles";


function SignUp() {
  const agreeValidation = useAtomValue(nextStepAtom)
  const [steps, setStep] = useState({
    step1: false,
    step2: false,
    step3: false
  })
  const handleNextStep = () => {
    if (agreeValidation.terms) {
      if (!steps.step1 && !steps.step2 && !steps.step3) {
        setStep({
          step1: true,
          step2: false,
          step3: false
        })
      }
    } else {
      toast.warning('회원 가입을 위한 필수 약관에 동의해주세요.')
    }
    if (agreeValidation.terms && !agreeValidation.validation) {
      if (steps.step1 && !steps.step2 && !steps.step3) {
        setStep({
          step1: true,
          step2: true,
          step3: false
        })
      }
    }
    if (agreeValidation.terms && agreeValidation.validation) {
      if (steps.step1 && !steps.step2 && !steps.step3) {
        setStep({
          step1: true,
          step2: true,
          step3: true
        })
      }
    }
  }
  return (
    <div className={'sign-up'}>
      <SignUpHeader>
        <article>
          <Link to={'/'}>
            <Logo/>
          </Link>
        </article>
      </SignUpHeader>
      <StepContainer>
        <article>
          <div><h1>회원 가입</h1></div>
          <div><p>회원가입 하시면 엠코퍼레이션에 다양한 서비스를 이용하실 수 있습니다.</p></div>
          <Steps>
            <Step style={steps.step1 ? {backgroundColor: '#535353', color: '#fff'} : null}>
              <div style={{backgroundImage: `url("/assets/images/join/icon_membership_step01_on.png")`}}></div>
              <div style={steps.step1 ? {color: '#fff'} : null}>
                <h3>STEP 01</h3>
                <p>약관 동의</p>
              </div>
            </Step>
            <Arrow/>
            <Step style={steps.step1 ? {backgroundColor: '#535353', color: '#fff'} : null}>
              <div
                style={{backgroundImage: `url("/assets/images/join/icon_membership_step02_${steps.step2 ? 'on' : 'off'}.png")`}}></div>
              <div>
                <h3>STEP 02</h3>
                <p>기본 정보 입력</p>
              </div>
            </Step>
            <Arrow/>
            <Step style={steps.step2 ? {backgroundColor: '#535353', color: '#fff'} : null}>
              <div
                style={{backgroundImage: `url("/assets/images/join/icon_membership_step03_${steps.step3 ? 'on' : 'off'}.png")`}}></div>
              <div>
                <h3>STEP 03</h3>
                <p>회원 가입 완료</p>
              </div>
            </Step>
          </Steps>
        </article>
      </StepContainer>
      <SignUpContents>
        {!steps.step1 && !steps.step2 && !steps.step3 &&
          <>
            <Terms/>
            <article style={{borderTop: '1px solid #dcdcdc'}}>
              <ButtonGroup>
                <button type={'button'} onClick={() => window.history.back()}>취소</button>
                <button type={'button'} onClick={handleNextStep}>다음</button>
              </ButtonGroup>
            </article>
          </>
        }
        {steps.step1 && !steps.step2 && !steps.step3 &&
          <Basic nextStep={handleNextStep}/>
        }
        {steps.step1 && steps.step2 && !steps.step3 &&
          <>
            <Done/>
            <ButtonGroup>
              <button onClick={() => window.location.replace('/')}>홈으로</button>
            </ButtonGroup>
          </>
        }
      </SignUpContents>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{zIndex: 9999999}}
      />
    </div>
  )
}

export default SignUp