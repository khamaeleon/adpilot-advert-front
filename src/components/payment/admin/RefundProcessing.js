import {useAtom} from "jotai";
import React, {useState} from "react";
import {ModalBody, ModalFooter, ModalHeader} from "../../modal/Modal";
import {modalController} from "../../../store";
import {
  ColSpan0,
  ColSpan2,
  ColSpan3,
  ColSpan4,
  RelativeDiv,
  RowSpan,
  SubmitButton,
  ValidationScript,
} from "../../../assets/GlobalStyles";
import styled from "styled-components";
import {decimalFormat, removeStr} from "../../../common/StringUtils";
import {useForm} from "react-hook-form";
import {refundProcess} from "../../../services/payment/admin/RefundProcessAxios";
import {refundReceivedAtomData} from "../../../pages/platform_manage/entity/Payment";

export function RefundProcessingButton(props) {
  const {onSubmit, modalInfo, onSave, title, refundData } = props;
  const [, setModal] = useAtom(modalController)
  const handleModalComponent = () => {
    setModal({
      isShow: true,
      width: 900,
      modalComponent: () => {
        return (
          <RefundRequestModal
            onSave={onSave}
            modalInfo={modalInfo}
            onSubmit={onSubmit}
            title={title}
            refundData={refundData}
          />
        )
      }
    })
  }
  return <button type={'button'} style={{background:"transparent", color:"red", textDecoration:"underline",}} onClick={handleModalComponent} >{title}</button>
}

export function RefundRequestTable(props) {
  let refundData = [
    props.refundData.data.adverName,
    props.refundData.data.createdBy,
    props.refundData.data.refundBankAccountHolder,
    props.refundData.data.refundBankType,
    props.refundData.data.refundBankAccount,
    props.refundData.data.point,
  ]

  let valueType = {
    //[d] 아래 목록 따로 빼서 관리 사용자, 어드민 모두 사용
    KDB_BANK: { label: 'KDB산업은행' },
    IBK_BANK: { label: 'IBK기업은행' },
    KOOKMIN_BANK: { label: '국민은행' },
    KEB_BANK: { label: 'KEB하나은행' },
    SUHYUP_BANK: { label: '수협' },
    NONGHYUP_BANK: { label: '농협' },
    REGIONAL_NONGHYUP_BANK: { label: '농협중앙회' },
    WOORI_BANK: { label: '우리은행' },
    SC_BANK: { label: 'SC제일은행' },
    SHINHAN_BANK: { label: '신한은행' },
    CITY_BANK: { label: '시티은행' },
    DAEGU_BANK: { label: '대구은행' },
    BUSAN_BANK: { label: '부산은행' },
    GWANGJU_BANK: { label: '광주은행' },
    JEJU_BANK: { label: '제주은행' },
    JEONBUK_BANK: { label: '전북은행' },
    GYEONGNAM_BANK: { label: '경남은행' },
    KFCC_BANK: { label: '새마을금고' },
    SHINHYUP_BANK: { label: '신협' },
    FSB_BANK: { label: '저축은행중앙회' },
    NFCF_BANK: { label: '산립조합중앙회' },
    EPOST_BANK: { label: '우체국' },
    HANA_BANK: { label: '하나은행' },
    K_BANK: { label: '케이뱅크' },
    KAKAO_BANK: { label: '카카오뱅크' },
    TOSS_BANK: { label: '토스뱅크' },
  }[refundData[3]] || { label: '', color: '' };

  refundData[3] = valueType.label

  return (
    <RefundInformation>
      <table style={{margin:"0"}}>
        <thead>
        <tr>
          <th>광고주명</th>
          <th>아이디</th>
          <th>담당자명</th>
          <th>은행명</th>
          <th>계좌 번호</th>
          <th>신청 금액</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          {refundData.map((item, key) => {
            return(
              <td
                key={key}
              >
                {item}
              </td>
            )
          })}
        </tr>
        </tbody>
      </table>
    </RefundInformation>
  )
}

function RefundRequestModal (props) {
  const {title, refundData} = props
  const [, setModal] = useAtom(modalController)
  const [refundType, setRefundType] = useState("전액 환불") // 환불 종류
  const [refundAmount, setRefundAmount] = useState(0) // 환불 금액
  const [note, setNote] = useState("") // 비고 내용
  const [refundReceivedData, setRefundReceivedData] = useAtom(refundReceivedAtomData)
  const {register, handleSubmit, setError, formState:{errors} } = useForm()

  const handleChange = (event) => {
    let num = removeStr(event)
    let numberNum = Number(num)
    setRefundAmount(numberNum)
  }

  const onSubmit = async () => {
    if (refundType === "전액 환불") {
      const requestData = {
        userPointHistoryId: refundData.data.id,
        refundAmount: refundData.data.point,
        description: note
      };
      try {
        // 성공적인 응답 처리
        await refundProcess(requestData);
        setRefundReceivedData(!refundReceivedData);
      } catch (error) {
        // 실패한 응답 처리
        console.error("실패 응답 처리", error);
      }
      setModal({ isShow: false });
    } else if (refundType === "부분 환불") {
      if (refundAmount > Math.abs(refundData.data.point)) {
        setError('refundAmount', {type: 'required', message: '환불 금액이 요청 금액보다 큽니다.'});
      } else if (refundAmount === 0) {
        setError('refundAmount', {type: 'required', message: '환불 금액을 입력해 주세요.'});
      } else {
        const requestData = {
          userPointHistoryId: refundData.data.id,
          refundAmount: -refundAmount,
          description: note
        };
        try {
          // 성공적인 응답 처리
          await refundProcess(requestData);
          setRefundReceivedData(!refundReceivedData);
          setRefundAmount(0);
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
            </div>
          </ColSpan4>
        </RowSpan>
      </ModalBody>
      <ModalFooter>
        <SubmitButton type={"submit"}>환불 완료</SubmitButton>
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

const RefundInformation = styled.div`
  font-size: 13px;
  & table {
    width: 100%;
    color: #222;
    & th {
      width: ${(props) => props.multiTable ? "20%" : "33.33%"};
      padding: 12px;
      background-color: #f3f3f3;
      border-top: 1px solid #e9ebee;
      border-bottom: 1px solid #e9ebee;
    }

    & td {
      text-align: center;
      padding: 12px;
      border-bottom: 1px solid #e5e5e5;
      cursor: pointer;
      background-color: #fff;
    }
  }
`

