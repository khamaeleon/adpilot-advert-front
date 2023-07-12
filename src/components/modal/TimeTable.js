import {useSetAtom} from "jotai";
import {modalController} from "../../store";
import DragToSelect from "../common/DragToSelect";
import {ModalBody, ModalHeader} from "./Modal";
import React from "react";
import InsertToSelect from "../common/InsertToSelect";
import {ColTitle, RowSpan, Script} from "../../assets/GlobalStyles";
import styled from "styled-components";

function TimeTableComponent (props) {
  const timeType = () => {
    if(props.exposureTimeType !== "DIRECT_SETTINGS") {
      if(props.exposureTimeType !== 'EQUAL_DISTRIBUTION') {
        return '빠른소진'
      } else return '균등분배'
    } else return '직접 설정'
  }
  return(
    <div>
      <ModalHeader title={"설정된 시간별 예산"}/>
      <ModalBody>
        <RowSpan>
          <ColTitle><strong>예산 소진 설정 | {timeType()}</strong></ColTitle>
        </RowSpan>
        <RowSpan box={true}>
          {props.exposureTimeType !== "DIRECT_SETTINGS" ?
            <DragToSelect readOnly={props.readOnly}/>
            : <InsertToSelect readOnly={props.readOnly}/>}
        </RowSpan>
      </ModalBody>
    </div>
  )
}
export default function TimeTable(props){
  const setModal = useSetAtom(modalController)
  const handleOpenTimeTable = () => {
    setModal({
      isShow: true,
      width: 1200,
      modalComponent: () => <TimeTableComponent exposureTimeType={props.exposureTimeType} readOnly={props.readOnly} />
    })
  }
  return (
    <ButtonDiv>
      <div onClick={handleOpenTimeTable}>
        <Script/>
      </div>
    </ButtonDiv>
  )
}

const ButtonDiv = styled.div`
& > div {
  border-radius: 5px;
  background-color: #fff;
  border: 1px solid #e5e5e5;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  -webkit-box-align: center;
  align-items: center;
  justify-content: center;
  display:flex;
}

`