import {useAtom, useSetAtom} from "jotai";
import {modalController} from "../../store";
import DragToSelect from "../common/DragToSelect";
import {ModalBody, ModalHeader} from "./Modal";
import React from "react";
import InsertToSelect from "../common/InsertToSelect";
import {ColTitle, RelativeDiv, RowSpan, Span4} from "../../assets/GlobalStyles";

function TimeTableComponent (props) {
  return(
    <div>
      <ModalHeader title={"설정된 시간별 예산"}/>
      <ModalBody>
        {props.exposeTimeType !== "DIRECT_SETTINGS"  &&
          <>
            <RowSpan>
              <ColTitle><strong>예산 소진 설정 | 균등소진/빠른소진</strong></ColTitle>
            </RowSpan>
            <RowSpan box={true}>
              <DragToSelect readOnly={props.readOnly}/>
            </RowSpan>
          </>
          ||
          <>
            <RowSpan>
              <ColTitle><strong>예산 소진 설정 | 직접 설정</strong></ColTitle>
            </RowSpan>
            <InsertToSelect/>
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
      modalComponent: () => <TimeTableComponent exposeTimeType={props.exposeTimeType} readOnly={props} />
    })
  }
  return (
    <>
      <div onClick={handleOpenTimeTable}>{props.title}</div>
    </>
  )
}