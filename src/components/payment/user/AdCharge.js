import {useAtom} from "jotai";
import axios from 'axios';
import React, {useEffect, useState} from "react";
import {ModalBody, ModalFooter, ModalHeader} from "../../modal/Modal";
import styled from "styled-components";
import {modalController} from "../../../store";
import { ColSpan2, ColSpan3, ColSpan4, DefaultButton, RowSpan, RelativeDiv, ValidationScript, SubmitButton} from "../../../assets/GlobalStyles";
import {SmallButton} from "../../../pages/campaign/styles/common";
import {decimalFormat, removeStr} from "../../../common/StringUtils";
import {useForm} from "react-hook-form";
import {paymentRequest} from "../../../services/payment/user/paymentUserAxios";
import {tokenResultAtom} from "../../../pages/login/entity/Common";

export function AdChargeButton(props) {
  const {onSubmit, modalInfo, onSave, title, requestAmountValue, setRequestAmountValue, onPaymentDetailsReceived} = props;
  const [, setModal] = useAtom(modalController)
  const handleModalComponent = () => {
    setModal({
      isShow: true,
      width: 650,
      modalComponent: () => {
        return (
          <AdChargeModal
            onSave={onSave}
            modalInfo={modalInfo}
            onSubmit={onSubmit}
            title={title}
            requestAmountValue={requestAmountValue}
            setRequestAmountValue={setRequestAmountValue}
            onPaymentDetailsReceived={onPaymentDetailsReceived}
          />
        )
      }
    })
  }
  return <DefaultButton type={'button'} onClick={handleModalComponent}>{title}</DefaultButton>
}

function AdChargeModal (props) {
  const [tokenUserInfo] = useAtom(tokenResultAtom)
  const [,setModal] = useAtom(modalController)
  const {title, setRequestAmountValue} = props
  const {register, handleSubmit, setError, formState:{errors} } = useForm()
  const [chargeAmount, setChargeAmount] = useState(0) // 충전 금액
  const [inputValue, setInputValue] = useState(0) // 인풋 클릭 여부
  const [payMethod, setPayMethod] = useState('CARD'); // 결제 방식

  const calcAmount = () => (chargeAmount / 10) + chargeAmount // 부가세 합한 충전 값

  const handleClickChargeButton = (plusValue) => {
    if(inputValue === 1){
      setChargeAmount(0)
      setInputValue(0)
      setChargeAmount(chargeAmount => chargeAmount + plusValue)
    }else{
      setChargeAmount(chargeAmount => chargeAmount + plusValue)
    }
  }
  const handleChange = (value) => {
    let num = removeStr(value)
    let numberNum = Number(num)
    setChargeAmount(numberNum)
  }
  const handleReset = () => {
    setChargeAmount(0)
    setInputValue(1)
  }

  const onSubmit = async () => {
    if (chargeAmount <= 0) {
      setError('chargeAmount', {type: 'required', message:'충전 금액을 입력해 주세요'})
    } else {
      // 거래타입, 충전금액 데이터 post 값으로 넘기기
      setRequestAmountValue(requestAmountValue => requestAmountValue + calcAmount());

      const userId = tokenUserInfo.id

      const requestData = {
        paymentServiceUid: userId,
        amount: (chargeAmount / 10) + chargeAmount,
        payMethodType: payMethod
      }

      await paymentRequest ( requestData )
        .then(response => {
          // 성공적인 응답 처리
          let data = response;
          console.log("성공 응답 처리",data);
          // setModal({isShow: false});
          // iframe 화면 띄우는 부분
          const newWindow = window.open('', '_blank', 'width=500,height=500');
          const iframe = document.createElement('iframe');
          iframe.src = 'https://testapi.co.kr?authenticationId=01023012301';
          iframe.width = '100%';
          iframe.height = '100%';
          newWindow.document.body.appendChild(iframe);
          props.onPaymentDetailsReceived();
        })
        .catch(error => {
          // 실패한 응답 처리
          console.error("실패 응답 처리",error);
          // 에러 메시지 등을 사용자에게 알려줄 수 있습니다.
          // 에러 상태, 결제 실패 기타 등등 상황에 맞게 토스트 날립시다
        });
    }
  }
  const onError = () => console.log(errors)

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <ModalHeader title={title}/>
      <ModalBody>
        <RowSpan>
          <ColSpan4>
            <div style={{display:'flex',flexDirection:'column',width: '100%', alignItems: 'start', marginBottom: '25px'}}>
              <RowSpan>
                <ColSpan2>결제 방식</ColSpan2>
                <ColSpan3>
                  <RelativeDiv>
                    <label>
                      <input
                        type={'radio'}
                        name={'paymentMethod'}
                        value="CARD"
                        checked={payMethod === 'CARD'}
                        onChange={(e) => setPayMethod(e.target.value)}
                      />
                      <span>카드 결제</span>
                    </label>
                    <label>
                      <input
                        type={'radio'}
                        name={'paymentMethod'}
                        value="TRANS"
                        checked={payMethod === 'TRANS'}
                        onChange={(e) => setPayMethod(e.target.value)}
                      />
                      <span>계좌이체</span>
                    </label>
                  </RelativeDiv>
                </ColSpan3>
              </RowSpan>
              <RowSpan>
                <ColSpan2>충전 금액</ColSpan2>
                <ColSpan3>
                  <RelativeDiv className={'color-black'}>
                    <Input
                      type={'text'}
                      value={decimalFormat(chargeAmount + ' 원')}
                      onClick={()=>handleReset()}
                      maxLength="19"
                      {...register("chargeAmount", {
                        required: "충전 금액을 입력해 주세요.",
                        pattern: {
                          message: "숫자만 입력 가능합니다.",
                          value: "^[0-9,]+원?$",
                        },
                        onChange:(e)=>handleChange(e.target.value)
                      })}
                    />
                    {errors.chargeAmount && <ValidationScript style={{left:"0", bottom:"-16px"}}>{errors.chargeAmount.message}</ValidationScript>}
                  </RelativeDiv>
                </ColSpan3>
                <ColSpan3>
                  <SmallButton type={'button'} onClick={()=>handleClickChargeButton(100000)}>10만원</SmallButton>
                  <SmallButton type={'button'} onClick={()=>handleClickChargeButton(500000)}>50만원</SmallButton>
                  <SmallButton type={'button'} onClick={()=>handleClickChargeButton(1000000)}>100만원</SmallButton>
                </ColSpan3>
              </RowSpan>
              <RowSpan>
                <div style={{display: "flex", flexDirection:'column'}}>
                  <ColSpan2>결제 금액
                    <span>
                                            <small>충전 금액 </small>
                                            <small className={'won'}>{decimalFormat(chargeAmount)}</small> |
                                            <small> 부가세 </small><small className={'won'}>{decimalFormat(chargeAmount / 10)}</small>
                                        </span>
                  </ColSpan2>
                  <ColSpan4 style={{padding:"15px 0 0 73px", color:"#000", fontWeight:"bold"}}>
                    총 결제 금액
                    {chargeAmount?
                      (<span className={'won'} style={{color:'#f5811f'}}>{decimalFormat(calcAmount())}</span>)
                      :(<span className={'won'}>0</span>)}

                  </ColSpan4>
                </div>
              </RowSpan>
              <RowSpan>
                <ColSpan2>문의</ColSpan2>
                <ColSpan4 style={{paddingLeft:"35px"}}>010-4070-3122</ColSpan4>
              </RowSpan>
            </div>
          </ColSpan4>
        </RowSpan>
      </ModalBody>
      <ModalFooter>
        <SubmitButton type={"submit"}>결제</SubmitButton>
      </ModalFooter>
    </form>
  )
}
/**스타일 시트**/
const Input = styled.input `
  width: 200px;
  font-size: 18px;
  font-weight: 600;
  border: 1px solid #ddd;
  border-radius: 5px;
  text-align: right;
  padding: 3px 8px;
  &:after {
    font-size: 13px;
    font-weight: 400;
  }
`