import {useSetAtom} from "jotai";
import {modalController} from "../../store";
import DragToSelect from "../common/DragToSelect";
import {ModalBody, ModalHeader} from "./Modal";
import React from "react";
import InsertToSelect from "../common/InsertToSelect";
import {ColTitle, RowSpan, Script} from "../../assets/GlobalStyles";
import styled from "styled-components";

function TimeTableComponent (props) {
  return(
    <div>
      <ModalHeader title={"설정된 시간별 예산"}/>
      <ModalBody>
        {props.exposureTimeType !== "DIRECT_SETTINGS" ?
          <>
            <RowSpan>
              <ColTitle><strong>예산 소진 설정 | 균등소진/빠른소진</strong></ColTitle>
            </RowSpan>
            <RowSpan box={true}>
              <DragToSelect readOnly={props.readOnly}/>
            </RowSpan>
          </>
          :
          <>
            <RowSpan>
              <ColTitle><strong>예산 소진 설정 | 직접 설정</strong></ColTitle>
            </RowSpan>
            <RowSpan box={true}>
              <InsertToSelect readOnly={props.readOnly}/>
            </RowSpan>
          </>
        }
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