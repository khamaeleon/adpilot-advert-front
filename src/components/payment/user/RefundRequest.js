import {useAtom} from "jotai";
import React, {useState} from "react";
import {ModalBody, ModalFooter, ModalHeader} from "../../modal/Modal";
import {modalController} from "../../../store";
import {
    ColSpan0,
    ColSpan1,
    ColSpan2,
    ColSpan3,
    ColSpan4,
    DefaultButton,
    RelativeDiv,
    RowSpan, SubmitButton, ValidationScript,
} from "../../../assets/GlobalStyles";
import {requestAmountPoint, retrieveUserPoint} from "../../../pages/layout/entity/UserPoint";
import {RefundRequestTable} from "../../../pages/platform_manage/PaymentManageUser";
import styled from "styled-components";
import {decimalFormat, removeStr} from "../../../common/StringUtils";
import {useForm} from "react-hook-form";
import {tokenResultAtom} from "../../../pages/login/entity/Common";
import {refundRequest} from "../../../services/payment/user/RefundUserAxios";
export function RefundRequestButton(props) {
    const {onSubmit, modalInfo, onSave, title, refundData, onPaymentDetailsReceived, totalAmount} = props;
    const [, setModal] = useAtom(modalController)

    const handleModalComponent = () => {
        setModal({
            isShow: true,
            width: 650,
            modalComponent: () => {
                return (
                    <RefundRequestModal
                      onSave={onSave}
                      modalInfo={modalInfo}
                      onSubmit={onSubmit}
                      title={title}
                      refundData={refundData}
                      onPaymentDetailsReceived={onPaymentDetailsReceived}
                      totalAmount={totalAmount}
                    />
                )
            }
        })
    }
    return <DefaultButton type={'button'} style={{background:"#fff", color:"#777"}} onClick={handleModalComponent} >{title}</DefaultButton>
}

function RefundRequestModal (props) {
  const [, setModal] = useAtom(modalController)
  const [tokenUserInfo] = useAtom(tokenResultAtom)
  const {title, refundData} = props
  const [refundType, setRefundType] = useState("전액 환불") // 환불 종류
  const [refundAmount, setRefundAmount] = useState(0) // 환불 금액
  const [note, setNote] = useState("") // 비고 내용
  const {register, handleSubmit, setError, formState:{errors} } = useForm()
  const [userPoint, ] = useAtom(retrieveUserPoint)
  const [requestAmount, ] = useAtom(requestAmountPoint)
  const handleChange = (event) => {
      let num = removeStr(event)
      let numberNum = Number(num)
      setRefundAmount(numberNum)
  }
  const onSubmit = async () => {

    if (refundType === "전액 환불") {
      const requestData = {
        userId: tokenUserInfo.id,
        refundAmount: -(userPoint + requestAmount),
        description: note
      };
      console.log("환불금액", requestData.refundAmount);
      console.log("유저포인트", userPoint+requestAmount);
      try {
        await refundRequest(requestData);
        props.onPaymentDetailsReceived(); // 성공적인 응답 처리
        setRefundAmount(0);
      } catch (error) {
        console.error("실패 응답 처리", error); // 실패한 응답 처리
      }

      setModal({ isShow: false });
    } else if (refundType === "부분 환불") {
      console.log("환불금액", refundAmount);
      console.log("유저포인트", userPoint+requestAmount);
      if (refundAmount > (userPoint+requestAmount)) {
        setError('refundAmount', {type: 'required', message: '환불 금액이 광고비 잔액보다 큽니다.'});
      } else if (refundAmount === 0) {
        setError('refundAmount', {type: 'required', message: '환불 금액을 입력해 주세요.'});
      } else {
        const requestData = {
          userId: tokenUserInfo.id,
          refundAmount: -refundAmount,
          description: note
        };
        console.log(requestData.refundAmount)
        try {
          await refundRequest(requestData);
          props.onPaymentDetailsReceived(); // 성공적인 응답 처리
        } catch (error) {
          console.error("실패 응답 처리", error); // 실패한 응답 처리
        }

        setModal({isShow: false});
      }
    }
  };
  const onError = () => console.log(errors)

    return (
        <form onSubmit={handleSubmit(onSubmit, onError)}>
            <ModalHeader title={title}/>
            <ModalBody>
                <RowSpan>
                    <ColSpan4>
                        <div style={{display:'flex', flexDirection:'column', width: '100%', alignItems: 'start', marginBottom: '25px'}}>
                            <RowSpan style={{width:'100%',}}>
                                <ColSpan0 style={{paddingTop:"15px", alignItems:"baseline"}}>환불 정보</ColSpan0>
                                <ColSpan4>
                                    <RefundRequestTable refundData={refundData}/>
                                </ColSpan4>
                            </RowSpan>
                            <RowSpan style={{width:'100%',}}>
                                <ColSpan0 style={{alignItems:"start", paddingTop:"11px"}}>환불 금액</ColSpan0>
                                <ColSpan4>
                                    <RowSpan column={true} style={{flexWrap:"warp", alignContent:"flex-start", marginTop:"0"}}>
                                        <RowSpan style={{width:'100%', marginTop:'0'}}>
                                            <ColSpan2>
                                                <RelativeDiv>
                                                    <label>
                                                        <input
                                                            type={'radio'}
                                                            name={'refund'}
                                                            value={'전액 환불'}
                                                            checked={refundType === '전액 환불'}
                                                            onChange={(e)=> setRefundType(e.target.value)}
                                                        />
                                                        <span>전액 환불</span>
                                                    </label>
                                                </RelativeDiv>
                                            </ColSpan2>
                                            <ColSpan0>
                                                {/*요기요 atom으로 나중에 광고비 잔액 불러와서 띄워 줍시다.*/}
                                                <small alt={decimalFormat(10000)}>환불 가능 금액(?)</small>
                                            </ColSpan0>
                                        </RowSpan>
                                        <RowSpan style={{width:'100%',  marginTop:'0'}}>
                                            <ColSpan0>
                                                <RelativeDiv>
                                                    <label>
                                                        <input
                                                            type={'radio'}
                                                            name={'refund'}
                                                            value={'부분 환불'}
                                                            checked={refundType === '부분 환불'}
                                                            onChange={(e)=> setRefundType(e.target.value)}
                                                        />
                                                        <span>부분 환불</span>
                                                    </label>
                                                </RelativeDiv>
                                            </ColSpan0>
                                            {refundType === "전액 환불" ? (
                                                <ColSpan3>
                                                    <Input
                                                        type={'text'}
                                                        textAlingn={'right'}
                                                        disabled={true}
                                                        value={'0 원'}
                                                    />
                                                    {errors.refundAmount && <ValidationScript style={{bottom: '-40px', left: '142px',}}>{errors.refundAmount.message}</ValidationScript>}
                                                </ColSpan3>
                                            ) : (
                                                <ColSpan3>
                                                    <Input
                                                        type={'text'}
                                                        textAlingn={'right'}
                                                        // disabled={refundType === "전액 환불" ? true : false}
                                                        value={decimalFormat(refundAmount + ' 원')}
                                                        maxLength="19"
                                                        {...register("refundAmount", {
                                                            required: "환불 금액을 입력해 주세요.",
                                                            pattern: {
                                                                message: "숫자만 입력 가능합니다.",
                                                                value: "^[0-9,]+원?$",
                                                            },
                                                            onChange:(e)=>handleChange(e.target.value)
                                                        })}
                                                    />
                                                    {errors.refundAmount && <ValidationScript style={{bottom: '-40px', left: '142px',}}>{errors.refundAmount.message}</ValidationScript>}
                                                </ColSpan3>
                                            )}

                                        </RowSpan>
                                    </RowSpan>
                                </ColSpan4>
                            </RowSpan>
                            <RowSpan style={{width:'100%', marginTop:'35px'}}>
                                <ColSpan0>비고</ColSpan0>
                                <ColSpan4 style={{paddingLeft:"35px"}}>
                                    <Input
                                      textAlingn={'left'}
                                      type={'text'}
                                      value={note}
                                      placeholder='비고 입력'
                                      style={{width: "100%"}}
                                      onChange={(e)=> setNote(e.target.value)}
                                    />
                                </ColSpan4>
                            </RowSpan>
                            <RowSpan>
                                <ColSpan1>문의</ColSpan1>
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

const Input = styled.input `
  width: 210px;
  font-size: 18px;
  font-weight: 600;
  border: 1px solid #ddd;
  border-radius: 5px;
  text-align: ${props => props.textAlingn};
  padding: 4px 10px;
  &:after {
    font-size: 13px;
    font-weight: 400;
  }
`
