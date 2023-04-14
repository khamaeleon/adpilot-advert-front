import {useAtom} from "jotai";
import React from "react";
import {ModalBody, ModalFooter, ModalHeader} from "../../modal/Modal";
import styled from "styled-components";
import {modalController} from "../../../store";
import { ColSpan1, ColSpan2, ColSpan3, ColSpan4, DefaultButton, RowSpan, RelativeDiv,} from "../../../assets/GlobalStyles";
import {SmallButton} from "../../../pages/campaign/styles/common";
import {decimalFormat} from "../../../common/StringUtils";

export function AdChargeButton(props) {
    const {onSubmit, modalInfo, onSave, title} = props;
    const [, setModal] = useAtom(modalController)
    const handleModalComponent = () => {
        setModal({
            isShow: true,
            width: 650,
            modalComponent: () => {
                return (
                    <AdChargeModal onSave={onSave} modalInfo={modalInfo} onSubmit={onSubmit} title={title}/>
                )
            }
        })
    }
    return <DefaultButton type={'button'} onClick={handleModalComponent}>{title}</DefaultButton>
}

function AdChargeModal (props) {
    const {title} = props
    const [, setModal] = useAtom(modalController)
    const handleSubmit = () => {
        setModal({
            isShow: false,
            modalComponent: null
        })
    }

    return (
        <div>
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
                                <ColSpan1>충전 금액</ColSpan1>
                                <ColSpan2><RelativeDiv><input type={'text'}/> </RelativeDiv></ColSpan2>
                                <ColSpan2><SmallButton type={'button'}>10만원</SmallButton><SmallButton type={'button'}>50만원</SmallButton><SmallButton type={'button'}>100만원</SmallButton></ColSpan2>
                            </RowSpan>
                            <RowSpan>
                                <div style={{display: "flex", flexDirection:'column'}}>
                                    <ColSpan4>결제 금액 <small>충전 금액</small><small className={'won'}>{decimalFormat(770000)}</small> | <small>부가세</small><small className={'won'}>{decimalFormat(770000)}</small></ColSpan4>
                                    <ColSpan4 style={{padding:" 15px 0 0 73px"}}>총 결제 금액 <span className={'won'}>{decimalFormat(770000)}</span></ColSpan4>
                                </div>
                            </RowSpan>
                            <RowSpan>
                                <ColSpan2>문의</ColSpan2>
                                <ColSpan1 style={{paddingLeft:"5px"}}>010-4070-3122</ColSpan1>
                            </RowSpan>
                        </div>
                    </ColSpan4>
                </RowSpan>
            </ModalBody>
            <ModalFooter>
                <DefaultButton>결제</DefaultButton>
            </ModalFooter>
        </div>
    )
}
