import React, {useCallback, useState} from "react";
import {
  Board,
  BoardHeader,
  ReportsDetail,
  BoardSearchResult,
} from "../../assets/GlobalStyles";
import Table from "../../components/table";
import {
  reportsInventoryAtom,
  reportsStaticsInventory,
  reportsInventoryDetailAtom,
  reportsStaticsInventoryColumn,
  reportsStaticsInventoryDetail,
  reportsStaticsInventoryDetailColumn,
} from "./entity";
import { useAtom, useAtomValue} from "jotai/index";
import {modalController} from "../../store";
import {
  selectReportsStaticsInventory,
  selectReportsStaticsInventoryDetail,
} from "../../services/ReportsAxios";
import {ModalBody, ModalContainer, ModalHeader} from "../../components/modal/Modal";
import {ReportsCondition} from "../../components/reports/Condition";
import {useSetAtom} from "jotai";
/** 지변별 모달 컴포넌트 **/
function ReportsInventoryModalComponent (props) {
  const [searchCondition, setSearchCondition] = useAtom(reportsInventoryDetailAtom)
  const dataStaticsMedia = useAtomValue(reportsStaticsInventoryDetail)

  const dataSource = useCallback( async () => {
    const fetchData = await selectReportsStaticsInventoryDetail(props.inventoryId, searchCondition)
    if(fetchData !== false) {
      return fetchData.rows
    } else {
      return dataStaticsMedia.rows
    }
  },[props.inventoryId,searchCondition,dataStaticsMedia]);

  return (
    <div>
      <ModalHeader title={'일자별 통계'}/>
      <ModalBody>
        <ModalContainer>
          <ReportsCondition searchCondition={searchCondition} setSearchCondition={setSearchCondition}/>
          <Table columns={reportsStaticsInventoryDetailColumn}
                 data={dataSource}/>
        </ModalContainer>
      </ModalBody>
    </div>
  )
}
/** 지면별 모달 파라미터 전달**/
export function ReportsInventoryModal(props){
  const setModal = useSetAtom(modalController)
  const handleClick = async () => {
    setModal({
      isShow: true,
      width: 1320,
      modalComponent: () => {
        return <ReportsInventoryModalComponent inventoryId={props.inventoryId}/>
      }
    })
  }

  return (
    <ReportsDetail onClick={async(e) => {
      e.stopPropagation()
      await handleClick()
    }}/>
  )
}
/** 지면별 보고서 **/
function ReportsPage(){
  const [searchCondition, setSearchCondition] = useAtom(reportsInventoryAtom)
  const dataStaticsInventory = useAtomValue(reportsStaticsInventory)
  const [totalCount, setTotalCount] = useState(0)
  const handleSearchCondition = async() => {
    const fetchData = await selectReportsStaticsInventory(searchCondition)
    if(fetchData !== false) {
      setTotalCount(fetchData.totalCount)
      return fetchData.rows
    } else {
      return dataStaticsInventory.rows
    }
  }

  const dataSource = useCallback(handleSearchCondition ,[searchCondition,dataStaticsInventory]);

  return(
    <Board>
      <BoardHeader>지면별 보고서</BoardHeader>
      <ReportsCondition searchCondition={searchCondition} setSearchCondition={setSearchCondition}/>
      <BoardSearchResult>
        <Table columns={reportsStaticsInventoryColumn}
               totalCount={[totalCount,'보고서']}
               data={dataSource}/>
      </BoardSearchResult>
    </Board>
  )
}

export default ReportsPage
