import {useAtom} from "jotai";
import React, {useState} from "react";
import {ModalBody, ModalFooter, ModalHeader} from "../../modal/Modal";
import {modalController} from "../../../store";
import {
  ColSpan100,
  ColSpan2,
  ColSpan4, DefaultButton,
  Input,
  InputLabel,
  RelativeDiv,
  RowSpan,
  SubmitButton,
  ValidationScript,
} from "../../../assets/GlobalStyles";
import {requestAmountPoint, retrieveUserPoint} from "../../../pages/layout/entity/UserPoint";
import {RefundRequestTable} from "../../../pages/platform_manage/PaymentManageUser";
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
  const note = useState("") // 비고 내용
  const {register, handleSubmit, setError, formState:{errors} } = useForm()
  const [userPoint, setUserPoint] = useAtom(retrieveUserPoint)
  const [requestAmount, ] = useAtom(requestAmountPoint)
  const handleChange = (event) => {
      let num = removeStr(event)
      let numberNum = Number(num)
      setRefundAmount(numberNum)
  }
  const onSubmit = async () => {
    if (refundType === "전액 환불") {
      if (userPoint === 0) {
        setError('refundAmount', { type: 'required', message: '환불 가능한 금액이 없습니다.' });
      } else {
        const requestData = {
          userId: tokenUserInfo.id,
          refundAmount: -userPoint,
          description: note
        };
        try {
          await refundRequest(requestData);
          props.onPaymentDetailsReceived(); // 성공적인 응답 처리
          setUserPoint(0); // userPoint 광고비 잔액 실시간 차감
          setRefundAmount(0);
          setModal({ isShow: false });
        } catch (error) {
          console.error("실패 응답 처리", error); // 실패한 응답 처리
        }
      }
    } else if (refundType === "부분 환불") {
      console.log("부분 환불")
      if (refundAmount > (userPoint + requestAmount)) {
        setError('refundAmount', { type: 'required', message: '환불 금액이 광고비 잔액보다 큽니다.' });
      // } else if (refundAmount === 0) {
      //   setError('refundAmount', { type: 'required', message: '환불 금액을 입력해 주세요.' });
      } else {
        const requestData = {
          userId: tokenUserInfo.id,
          refundAmount: -refundAmount,
          description: note
        };
        try {
          await refundRequest(requestData);
          setUserPoint(userPoint - refundAmount);
          props.onPaymentDetailsReceived(); // 성공적인 응답 처리
          setModal({ isShow: false });
        } catch (error) {
          console.error("실패 응답 처리", error); // 실패한 응답 처리
        }
      }
    }
  };
  const onError = () => console.log(errors)

    return (
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <ModalHeader title={title}/>
          <ModalBody>
            <RowSpan>
                <ColSpan100>환불 정보</ColSpan100>
                <ColSpan4>
                    <RefundRequestTable refundData={refundData}/>
                </ColSpan4>
            </RowSpan>
            <RowSpan>
              <ColSpan100>환불 금액</ColSpan100>
              <RelativeDiv>
                <ColSpan100>
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
                </ColSpan100>
                {/*<ColSpan0>*/}
                {/*    /!*요기요 atom으로 나중에 광고비 잔액 불러와서 띄워 줍시다.*!/*/}
                {/*    <small alt={decimalFormat(10000)}>환불 가능 금액(?)</small>*/}
                {/*</ColSpan0>*/}
              </RelativeDiv>
            </RowSpan>
            <RowSpan style={{marginTop: 5}}>
              <ColSpan100></ColSpan100>
              <RelativeDiv>
                <ColSpan100>
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
                </ColSpan100>
                <ColSpan2>
                  <InputLabel label={'원'}>
                    <Input
                      type={'text'}
                      textAlign={'right'}
                      disabled={refundType === "전액 환불" ? true : false}
                      value={refundType === "전액 환불" ? '0': decimalFormat(refundAmount)}
                      maxLength="19"
                      {...register("refundAmount", refundType !== "전액 환불" && {
                        required: "환불 금액을 입력해 주세요.",
                        pattern: {
                          message: "숫자만 입력 가능합니다.",
                          value: "^[0-9,]+원?$",
                        }
                      })}
                      {...refundType !== "전액 환불" && {
                        onChange: (e) => handleChange(e.target.value)
                      }}
                    />
                  </InputLabel>
                  {errors.refundAmount && <ValidationScript style={{bottom: '-40px', left: '142px',}}>{errors.refundAmount.message}</ValidationScript>}
                </ColSpan2>
              </RelativeDiv>
            </RowSpan>
            <RowSpan>
                <ColSpan100>문의</ColSpan100>
                <ColSpan4>010-4070-3122</ColSpan4>
            </RowSpan>
          </ModalBody>
          <ModalFooter>
              <SubmitButton type={"submit"}>환불 신청</SubmitButton>
          </ModalFooter>
        </form>
    )
}
