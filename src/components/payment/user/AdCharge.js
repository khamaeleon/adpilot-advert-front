import {useAtom} from "jotai";
import React, {useEffect, useState} from "react";
import {ModalBody, ModalFooter, ModalHeader} from "../../modal/Modal";
import styled from "styled-components";
import {modalController} from "../../../store";
import { ColSpan2, ColSpan3, ColSpan4, DefaultButton, RowSpan, RelativeDiv,} from "../../../assets/GlobalStyles";
import {SmallButton} from "../../../pages/campaign/styles/common";
import {decimalFormat, removeStr} from "../../../common/StringUtils";
import {useForm} from "react-hook-form";

export function AdChargeButton(props) {
    const {onSubmit, modalInfo, onSave, title, requestAmountValue, setRequestAmountValue} = props;
    const [, setModal] = useAtom(modalController)
    const handleModalComponent = () => {
        setModal({
            isShow: true,
            width: 650,
            modalComponent: () => {
                return (
                    <AdChargeModal onSave={onSave}
                                   modalInfo={modalInfo}
                                   onSubmit={onSubmit}
                                   title={title}
                                   requestAmountValue={requestAmountValue}
                                   setRequestAmountValue={setRequestAmountValue}
                    />
                )
            }
        })
    }
    return <DefaultButton type={'button'} onClick={handleModalComponent}>{title}</DefaultButton>
}

function AdChargeModal (props) {
    const {title, requestAmountValue, setRequestAmountValue} = props
    const {register, handleSubmit, setValue, setError, formState:{errors} } = useForm()
    const {chargeAmount, setChargeAmount} = useState(0) // 충전 금액
    const [, setModal] = useAtom(modalController)


    const handleChange = (value) => {
        setChargeAmount(value.target.value)
        // let num = removeStr(value)
        // let numberNum = Number(num)
        // if(maxAmount < numberNum){
        //     setError('requestAmountValue', {type: 'required', message:'정산 신청금이 잔여 정산금을 초과하였습니다.'})
        // } else {
        //     setRequestAmountValue(numberNum)
        //     setValue('requestAmountValue', numberNum)
        // }
        //
        // setRequestAmountValue(numberNum)
        // setValue('requestAmountValue', numberNum)
    }

    const handleClickChargeButton = (plusValue) => {
        setChargeAmount(chargeAmount => chargeAmount + plusValue);
    }




    return (
        <form>
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
                                                name={'inventory'}
                                                value={'auto'}
                                            />
                                            <span>카드 결제</span>
                                        </label>
                                        <label>
                                            <input
                                                type={'radio'}
                                                name={'inventory'}
                                                value={'categories'}
                                            />
                                            <span>계좌이체</span>
                                        </label>
                                    </RelativeDiv>
                                </ColSpan3>
                            </RowSpan>
                            <RowSpan>
                                <ColSpan2>충전 금액</ColSpan2>
                                <ColSpan3>
                                    <RelativeDiv className={'won color-black'}>
                                        <Input
                                            type={'text'}
                                            // value={decimalFormat(requestAmountValue)}
                                            // onChange={(e)=>handleChange(e.target.value)}
                                        />
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
                                            <small>충전 금액</small>
                                            <small className={'won'}>{decimalFormat(chargeAmount)}</small> |
                                            <small> 부가세</small><small className={'won'}>{decimalFormat(chargeAmount)}</small>
                                        </span>
                                    </ColSpan2>
                                    <ColSpan4 style={{padding:" 15px 0 0 73px", color:"#000", fontWeight:"bold"}}>
                                        총 결제 금액 <span className={'won'}>{decimalFormat(chargeAmount)}</span>
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
                <DefaultButton>결제</DefaultButton>
            </ModalFooter>
        </form>
    )
}
/**스타일 시트**/
const Input = styled.input `
  width: 200px;
  font-size: 20px;
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