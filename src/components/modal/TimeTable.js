import {useAtom, useSetAtom} from "jotai";
import {modalController} from "../../store";
import DragToSelect from "../common/DragToSelect";
import {ModalBody, ModalHeader} from "./Modal";
import React from "react";

function TimeTableComponent (props) {
  return(
    <div>
      <ModalHeader title={"설정된 시간별 예산"}/>
      <ModalBody>
        <DragToSelect readOnly={props.readOnly}/>
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
      modalComponent: () => <TimeTableComponent readOnly={props} />
    })
  }
  return (
    <>
      <div onClick={handleOpenTimeTable}>{props.title}</div>
    </>
  )
}