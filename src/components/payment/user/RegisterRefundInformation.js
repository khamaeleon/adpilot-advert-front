import {useAtom} from "jotai";
import React from "react";
import {ModalBody, ModalFooter, ModalHeader} from "../../modal/Modal";
import Select from "react-select";
import {modalController} from "../../../store";
import {ColSpan0, ColSpan1, ColSpan2, ColSpan3, ColSpan4, DefaultButton, inputStyle, RowSpan, Span3} from "../../../assets/GlobalStyles";
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
    return <DefaultButton type={'button'} onClick={handleModalComponent}>{title}</DefaultButton>
}

function RegisterRefundInformationModal (props) {
    const [, setModal] = useAtom(modalController)

    const handleSubmit = () => {
        setModal({
            isShow: false,
            modalComponent: null
        })
    }

    return (
        <form>
            <ModalHeader title={"환불 정보 등록"}/>
            <ModalBody>
                <RowSpan>
                    <ColSpan1>은행 선택</ColSpan1>
                    <ColSpan4>
                        <Select styles={inputStyle}/>
                    </ColSpan4>
                </RowSpan>
                <RowSpan>
                    <ColSpan1>은행 선택</ColSpan1>
                    <ColSpan4>
                        <input type={"text"}/>
                    </ColSpan4>
                </RowSpan>
                <RowSpan>
                    <ColSpan1>은행 선택</ColSpan1>
                    <ColSpan4>
                        <input type={"text"}/>
                    </ColSpan4>
                </RowSpan>
            </ModalBody>
            <ModalFooter>
                <DefaultButton>저장</DefaultButton>
            </ModalFooter>
        </form>
    )
}

