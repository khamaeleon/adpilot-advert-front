import {Board, BoardHeader, BoardSearchDetail, BoardTableContainer,} from "../../assets/GlobalStyles";
import React, {useCallback, useEffect, useState} from "react";
import {useAtom} from "jotai";
import Table from "../../components/table";
import {ToastContainer} from "react-toastify";
import {exchangeColumns, exchangeDataAtom, searchConditionAtom} from "./entity";
import {PlatformCondition} from "../../components/Platform/Condition";

function ChangeManage() {
  const [exchangeDataState, setExchangeDataState] = useAtom(exchangeDataAtom)
  const [searchCondition, setSearchCondition] = useState(searchConditionAtom)
  const [searchParams, setSearchParams] = useState({ keyword:''})
  useEffect(() => {

  }, [])

  const groupStyle = {
    textAlign: 'center',
    backgroundColor: '#fafafa',
    color: '#b2b2b2'
  }
  const groups = [
    {name: 'defaultData', header: '연동 데이터', headerStyle: groupStyle},
    {name: 'platformData', header: '플랫폼 데이터', headerStyle: groupStyle},
  ]
  // const handleSearch = (event) => {
  //   setSearchParams({
  //     ...searchParams,
  //     keyword:event.target.value
  //   })
  // }

  return (
    <main>
      <>
        <Board>
          <BoardHeader>전환 현황</BoardHeader>
          <BoardSearchDetail>
            <PlatformCondition searchCondition={searchCondition} setSearchCondition={setSearchCondition} handleTableData={exchangeDataState}/>
          </BoardSearchDetail>
          <BoardTableContainer>
            { exchangeDataState !== null &&
              <Table columns={exchangeColumns}
                     data={exchangeDataState}
                //detailData={handleFetchDetailData}
                //detailColumn={reportsStaticsAdExchangeByInventoryColumn}
                //detailGroups={groups}
                //groups={groups}
                     emptyText={'전환 현황 내역이 없습니다.'}/>
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
export default ChangeManage
