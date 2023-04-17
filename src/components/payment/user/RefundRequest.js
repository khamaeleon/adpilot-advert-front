import {useAtom} from "jotai";
import React from "react";
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
    RowSpan,
} from "../../../assets/GlobalStyles";
import {RefundRequestTable} from "../../../pages/platform_manage/PaymentManageUser";
export function RefundRequestButton(props) {
    const {onSubmit, modalInfo, onSave, title, refundData} = props;
    const [, setModal] = useAtom(modalController)
    const handleModalComponent = () => {
        setModal({
            isShow: true,
            width: 650,
            modalComponent: () => {
                return (
                    <RefundRequestModal onSave={onSave} modalInfo={modalInfo} onSubmit={onSubmit} title={title} refundData={refundData}/>
                )
            }
        })
    }
    return <DefaultButton type={'button'} style={{background:"#fff", color:"#777"}} onClick={handleModalComponent} >{title}</DefaultButton>
}

function RefundRequestModal (props) {
    const {title, refundData} = props
    const [, setModal] = useAtom(modalController)
    const handleSubmit = () => {
        setModal({
            isShow: false,
            modalComponent: null
        })
    }

    return (
        <form>
            <ModalHeader title={title}/>
            <ModalBody>
                <RowSpan>
                    <ColSpan4>
                        <div style={{display:'flex', flexDirection:'column', width: '100%', alignItems: 'start', marginBottom: '25px'}}>
                            <RowSpan style={{width:'100%'}}>
                                <ColSpan0 style={{paddingTop:"15px", alignItems:"baseline"}}>환불 정보</ColSpan0>
                                <ColSpan4>
                                    <RefundRequestTable refundData={refundData}/>
                                </ColSpan4>
                            </RowSpan>
                            <RowSpan style={{width:"100%"}}>
                                <ColSpan0 style={{alignItems:"start", paddingTop:"11px"}}>환불 금액</ColSpan0>
                                <ColSpan4>
                                    <RowSpan column={true} style={{flexWrap:"warp", alignContent:"flex-start", marginTop:"0"}}>
                                        <RowSpan style={{width:'100%', marginTop:'0'}}>
                                            <ColSpan2>
                                                <RelativeDiv>
                                                    <label>
                                                        <input
                                                            type={'radio'}
                                                            name={'inventory'}
                                                            value={'auto'}
                                                        />
                                                        <span>전액 환불</span>
                                                    </label>
                                                </RelativeDiv>
                                            </ColSpan2>
                                            <ColSpan0><small>환불 가능 금액(?)</small></ColSpan0>
                                        </RowSpan>
                                        <RowSpan style={{width:'100%',  marginTop:'0'}}>
                                            <ColSpan0>
                                                <RelativeDiv>
                                                    <label>
                                                        <input
                                                            type={'radio'}
                                                            name={'inventory'}
                                                            value={'auto'}
                                                        />
                                                        <span>부분 환불</span>
                                                    </label>
                                                </RelativeDiv>
                                            </ColSpan0>
                                            <ColSpan3><input type={'text'}/>원</ColSpan3>
                                        </RowSpan>
                                    </RowSpan>
                                </ColSpan4>
                            </RowSpan>
                            <RowSpan style={{width: "100%"}}>
                                <ColSpan0>비고</ColSpan0>
                                <ColSpan4 style={{paddingLeft:"35px"}}>
                                    <input type={'text'} placeholder='비고 입력' style={{width: "100%"}}/>
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
                <DefaultButton>환불 신청</DefaultButton>
            </ModalFooter>
        </form>
    )
}

