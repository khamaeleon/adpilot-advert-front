import {Board, BoardHeader, BoardSearchDetail, BoardTableContainer,} from "../../assets/GlobalStyles";
import React, {useCallback, useEffect, useState} from "react";
import {useAtom} from "jotai";
import {ToastContainer} from "react-toastify";
import {
  columnConversionData,
  columnConversionDetailData,
  conversionListDataAtom,
  searchConditionAtom,
  searchConversionType
} from "./entity";
import {PlatformCondition} from "../../components/Platform/Condition";
import {selConversionDetailList, selConversionList} from "../../services/conversion/ConversionAxios";
import Table from "../../components/table";
import TableDetail from "../../components/table/TableDetail";
import {pixelColumns, pixelDetailColumns} from "../pixel/entity";
import {selAdverPixelDetailList} from "../../services/header/ManagePixelAxios";

function ConversionManage() {
  const [conversionListDataState, setConversionListDataState] = useAtom(conversionListDataAtom)
  const [searchCondition, setSearchCondition] = useState(searchConditionAtom)

  useEffect(() => {
    selConversionList(searchCondition).then(response =>{
      setConversionListDataState(response)
    })
  }, [])

  const handleFetchDetailData = useCallback(async ({conversionId}) => {
    return await selConversionDetailList(conversionId)
  },[])

  const groupStyle = {
    textAlign: 'center',
    backgroundColor: '#fafafa',
    color: '#b2b2b2'
  }
  const groups = [
    {name: 'defaultData', header: '연동 데이터', headerStyle: groupStyle},
    {name: 'platformData', header: '플랫폼 데이터', headerStyle: groupStyle},
  ]
  const handleSearch = (event) => {
    selConversionList(searchCondition).then(response =>{
      setConversionListDataState(response)
    })
  }

  return (
    <main>
      <>
        <Board>
          <BoardHeader>전환 현황</BoardHeader>
          <BoardSearchDetail>
            <PlatformCondition searchType={searchConversionType} searchCondition={searchCondition} setSearchCondition={setSearchCondition} handleTableData={handleSearch}/>
          </BoardSearchDetail>
          <BoardTableContainer>
            { conversionListDataState !== null &&
              <TableDetail columns={columnConversionData}
                           data={conversionListDataState}
                           detailData={handleFetchDetailData}
                           detailColumn={columnConversionDetailData}
                           detailGroups={groups}
                           idProperty={'conversionId'}
                           groups={groups}
                           style={{minHeight: 500}}/>
            }
          </BoardTableContainer>
        </Board>
        <ToastContainer position="top-center"
                        autoClose={1500}
                        hideProgressBar
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        style={{zIndex: 9999999}}/>
      </>
    </main>
  )
}
export default ConversionManage
