import {useAtom} from "jotai";
import React, {useEffect, useState} from "react";
import axios from 'axios';
import {ModalBody, ModalFooter, ModalHeader} from "../../modal/Modal";
import Select from "react-select";
import {Controller, useForm} from "react-hook-form";
import {modalController} from "../../../store";
import {
    ColSpan0, ColSpan1, ColSpan2,
    ColSpan3, ColSpan4, DefaultButton,
    inputStyle, RowSpan, Span3, Edit, ValidationScript, SubmitButton,
} from "../../../assets/GlobalStyles";
import styled from "styled-components";
import {refundRequestData} from "../../../pages/platform_manage/entity/PaymentUser";
import {decimalFormat, removeStr} from "../../../common/StringUtils";

export function RegisterRefundInformationButton(props) {
    const {onSubmit, modalInfo, onSave, title, refundData, setRefundData} = props;
    const [, setModal] = useAtom(modalController)
    const handleModalComponent = () => {
        setModal({
            isShow: true,
            width: 700,
            modalComponent: () => {
                return (
                    // <div>안녕하세용 광고비 충전이에용</div>
                    <RegisterRefundInformationModal onSave={onSave} modalInfo={modalInfo} onSubmit={onSubmit} refundData={refundData} setRefundData={setRefundData}/>
                )
            }
        })
    }
    return  (
        <>
            {refundData.length === 0?(<DefaultButton onClick={handleModalComponent}>{title}</DefaultButton>):(<Edit onClick={handleModalComponent}>{title}</Edit>)}
        </>
    )
}

function RegisterRefundInformationModal (props) {
    const [,setModal] = useAtom(modalController)
    const {register, handleSubmit, setValue, setError, control, formState:{errors} } = useForm()
    const [selectBank, setSelectBank] = useState(''); // 은행 선택 값
    const [accountNumber, setAccountNumber] = useState(''); // 계좌 번호
    const [accountHolder, setAccountHolder] = useState(''); // 예금주

    // 위 3개 값이 기존 정보 값이 없을 경우 초기화 값으로 들어가고 고객 정보에 담긴값을 조회했을 떄 있으면
    // 즉 부모 페이지 접근시 값이 있으면 그 값을 위 3개 값에 포함 시키자.

    const handleChangeIsBank = (value) => { // 은행 선택
        setSelectBank(value.label)
    }

    const handleAccountNumberChange = (value) => {
        let num = removeStr(value)
        let numberNum = Number(num)
        setAccountNumber(numberNum)
    }

    const handleAccountHolderChange = (value) => {
        setAccountHolder(value)
    }

    const onSubmit = () => {
        console.log("완료 은행 값?", selectBank)
        if (selectBank === '은행' || accountNumber === '' || accountHolder === '') {
            if (selectBank === '은행') setError('selectBank', {type: 'required', message: '은행을 선택해 주세요.'});
            if (accountNumber === '') setError('accountNumber', {type: 'required', message: '계좌 번호를 입력해 주세요.'});
            if (accountHolder === '') setError('accountHolder', {type: 'required', message: '예금주 이름을 입력해 주세요.'});
        } else {
            props.setRefundData([selectBank, accountNumber, accountHolder]);
            setModal({isShow: false});
        }
    }
    const onError = () => console.log(errors)

    return (
        <form onSubmit={handleSubmit(onSubmit, onError)}>
            <ModalHeader title={"환불 정보 등록"}/>
            <ModalBody>
                <RowSpan style={{marginTop:"30px"}}>
                    <ColSpan1>은행 선택</ColSpan1>
                    <ColSpan4>
                        <Controller
                            name="bankList"
                            control={control}
                            rules={{
                                required: {
                                    value: selectBank === '',
                                    message: "은행을 선택해주세요."
                                }
                            }}
                            render={({ field}) => (
                                <>
                                    <Select
                                        {...field}
                                        options={refundRequestData.bankType}
                                        placeholder={'은행'}
                                        styles={inputStyle}
                                        components={{IndicatorSeparator: () => null}}
                                        onChange={(e)=>handleChangeIsBank(e)}
                                    />
                                    {errors.bankList && <ValidationScript style={{minHeight:"15px", left:"14px"}}>{errors.bankList?.message}</ValidationScript>}
                                </>
                            )}
                        />
                    </ColSpan4>
                </RowSpan>
                <RowSpan style={{marginTop:"30px"}}>
                    <ColSpan1>계좌 번호</ColSpan1>
                    <ColSpan4>
                        <Input
                            type={"text"}
                            value={accountNumber}
                            {...register("accountNumber", {
                                required: "계좌번호를 입력해 주세요,",
                                pattern:{
                                    value: /^[0-9,]+$/,
                                    message: "숫자만 입력 가능합니다."
                                },
                                onChange:(e) => handleAccountNumberChange(e.target.value)
                            })}
                            maxLength="14"
                        />
                        {errors.accountNumber && <ValidationScript style={{minHeight:"15px", left:"14px"}}>{errors.accountNumber.message}</ValidationScript>}
                    </ColSpan4>
                </RowSpan>
                <RowSpan style={{margin:"30px 0"}}>
                    <ColSpan1>예금주</ColSpan1>
                    <ColSpan4>
                        <Input
                            type={"text"}
                            value={accountHolder}
                            {...register("accountHolder", {
                                required: "예금주를 입력해 주세요,",
                                onChange:(e) => handleAccountHolderChange(e.target.value)
                            })}
                            maxLength="10"
                        />
                        {errors.accountHolder && <ValidationScript style={{minHeight:"15px", left:"14px"}}>{errors.accountHolder.message}</ValidationScript>}
                    </ColSpan4>
                </RowSpan>
            </ModalBody>
            <ModalFooter>
                <SubmitButton type={"submit"}>저장</SubmitButton>
            </ModalFooter>
        </form>
    )
}

/**스타일 시트**/
const Input = styled.input `
  width: 210px;
  font-size: 18px;
  font-weight: 600;
  border: 1px solid #ddd;
  border-radius: 5px;
  text-align: left;
  padding: 4px 10px;
  &:after {
    font-size: 13px;
    font-weight: 400;
  }
`