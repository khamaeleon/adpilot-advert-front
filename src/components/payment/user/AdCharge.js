import {useAtom} from "jotai";
import React, {useState} from "react";
import {ModalBody, ModalFooter, ModalHeader} from "../../modal/Modal";
import styled from "styled-components";
import {modalController} from "../../../store";
import {
  ColSpan1,
  ColSpan2,
  ColSpan3,
  ColSpan4,
  DefaultButton,
  Input,
  InputLabel,
  RelativeDiv,
  RowSpan,
  SubmitButton,
  ValidationScript
} from "../../../assets/GlobalStyles";
import {decimalFormat, removeStr} from "../../../common/StringUtils";
import {useForm} from "react-hook-form";
import {paymentRequest} from "../../../services/payment/user/PaymentUserAxios";
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
  const {title} = props
  const [tokenUserInfo] = useAtom(tokenResultAtom)
  const {register, handleSubmit, setError, formState:{errors} } = useForm()
  const [chargeAmount, setChargeAmount] = useState(0) // 충전 금액
  const [inputValue, setInputValue] = useState(0) // 인풋 클릭 여부
  const [payMethod, setPayMethod] = useState('CARD'); // 결제 방식

  const calcAmount = () => Math.floor(chargeAmount / 10) + chargeAmount // 부가세 합한 충전 값

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

  const onSubmit = () => {
    console.log("1111111111111111")
    if (chargeAmount <= 0) {
      setError('chargeAmount', {type: 'required', message:'충전 금액을 입력해 주세요'})
    } else {
      const userId = tokenUserInfo.id
      const requestData = {
        paymentServiceUid: userId,
        amount: (chargeAmount / 10) + chargeAmount,
        payMethodType: payMethod
      }
      console.log(requestData)
      paymentRequest ( requestData )
        .then(response => {
          // 성공적인 응답 처리
          console.log("결제 성공!!", response);
        /*  const newWindow = window.open('', '_blank', 'width=500,height=500');
          const iframe = document.createElement('iframe');
          iframe.src = 'https://testapi.co.kr?authenticationId=01023012301';
          iframe.width = '100%';
          iframe.height = '100%';
          newWindow.document.body.appendChild(iframe);
          setRequestAmountValue(requestAmountValue => requestAmountValue + calcAmount());
          props.onPaymentDetailsReceived();*/
        })
    }
  }
  const onError = () => console.log(errors)

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <ModalHeader title={title}/>
      <ModalBody>
        <RowSpan>
          <ColSpan1>결제 방식</ColSpan1>
          <RelativeDiv>
            <ColSpan3>
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
            </ColSpan3>
          </RelativeDiv>
        </RowSpan>
        <RowSpan>
          <ColSpan1>충전 금액</ColSpan1>
          <RelativeDiv>
            <ColSpan2>
              <InputLabel label={'원'}>
                <Input
                  type={'text'}
                  value={decimalFormat(chargeAmount)}
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
              </InputLabel>
            </ColSpan2>
            <ColSpan2>
              <SmallButton type={'button'} onClick={()=>handleClickChargeButton(100000)}>10만원</SmallButton>
              <SmallButton type={'button'} onClick={()=>handleClickChargeButton(500000)}>50만원</SmallButton>
              <SmallButton type={'button'} onClick={()=>handleClickChargeButton(1000000)}>100만원</SmallButton>
            </ColSpan2>
            {errors.chargeAmount && <ValidationScript style={{left:15}}>{errors.chargeAmount.message}</ValidationScript>}
          </RelativeDiv>
        </RowSpan>
        <RowSpan style={{justifyContent: 'flex-start',marginTop: 20}}>
          <ColSpan1>결제 금액</ColSpan1>
          <RowSpan column={true} style={{width: '100%', marginTop: 0}}>
            <ColSpan4>
                <small>충전 금액 </small>
                <small className={'won'}>{decimalFormat(chargeAmount)}</small> |
                <small> 부가세 </small><small className={'won'}>{decimalFormat(chargeAmount / 10)}</small>
            </ColSpan4>
            <ColSpan4 style={{fontWeight:"bold"}}>
              총 결제 금액
              {chargeAmount?
                (<span className={'won'} style={{color:'#f5811f'}}>{decimalFormat(calcAmount())}</span>)
                :(<span className={'won'}>0</span>)}
            </ColSpan4>
          </RowSpan>
        </RowSpan>
        <RowSpan>
          <ColSpan1>문의</ColSpan1>
          <ColSpan4>010-4070-3122</ColSpan4>
        </RowSpan>
      </ModalBody>
      <ModalFooter>
        <SubmitButton type={"submit"}>결제</SubmitButton>
      </ModalFooter>
    </form>
  )
}
export const SmallButton = styled.button`
  padding: 5px 12px;
  border-radius: 5px;
  background-color: #535353;
  color: #fff;
`