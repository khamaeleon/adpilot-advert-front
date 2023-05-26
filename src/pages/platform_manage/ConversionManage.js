import {Board, BoardHeader, BoardSearchDetail, BoardTableContainer,} from "../../assets/GlobalStyles";
import React, {useCallback, useEffect, useState} from "react";
import {useAtom} from "jotai";
import {ToastContainer} from "react-toastify";
import {PlatformCondition} from "../../components/Platform/Condition";
import {selConversionDetailList, selConversionList} from "../../services/conversion/ConversionAxios";
import TableDetail from "../../components/table/TableDetail";
import {searchConditionAtom} from "./entity/Common";
import {
  columnConversionData,
  columnConversionDetailData, conversionDetailDataAtom,
  conversionListDataAtom,
  searchConversionType
} from "./entity/Conversion";
import {adverListColumn, adverStatusDetailColumn} from "../dash_board/entity/Campaign";
import {retrieveAdvertiserCampaignStatus} from "../../services/dash_board/ManageCampaignAxios";
import ReactDataGrid from "@inovua/reactdatagrid-enterprise";

function ConversionManage() {
  const [conversionListDataState, setConversionListDataState] = useAtom(conversionListDataAtom)
  const [conversionDetailDataState, setConversionDetailDataState] = useAtom(conversionDetailDataAtom)
  const [searchCondition, setSearchCondition] = useState(searchConditionAtom)
  const [gridRef, setGridRef] = useState(null);
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
  const handleSearch = (data) => {
    selConversionList(searchCondition).then(response =>{
      console.log(response)
      setConversionListDataState(response)
    })
  }
  const renderContactsGrid = () => {
    return (
      <ReactDataGrid
        handle={null}
        clearNodeCacheOnDataSourceChange={true}
        dataSource={conversionDetailDataState!==null && conversionDetailDataState}
        columns={columnConversionDetailData}
        enableColumnAutosize={true}
        groups={false}
        emptyText={'캠페인 리스트가 없습니다.'}
        rowHeight={70}
      />
    );
  }
  return (
    <main>
      <Board>
        <BoardHeader>전환 현황</BoardHeader>
        <BoardSearchDetail>
          <PlatformCondition searchType={searchConversionType} searchCondition={searchCondition} setSearchCondition={setSearchCondition} handleTableData={handleSearch}/>
        </BoardSearchDetail>
        <BoardTableContainer>
          { conversionListDataState !== null &&
            <ReactDataGrid
              licenseKey={process.env.REACT_APP_DATA_GRID_LICENSE_KEY}
              handle={null}
              onReady={setGridRef}
              style={{minHeight: 550, textAline: 'center'}}
              rowExpandHeight={400}
              rowHeights={null}
              renderDetailsGrid={renderContactsGrid}
              enableColumnAutosize={true}
              emptyText={'데이터가 없습니다.'}
              idProperty={'conversionId'}
              dataSource={conversionListDataState}
              detailsGridCacheKey={'campaignId'}
              columns={columnConversionData}
              onDataSourceCacheChange={()=>{gridRef?.current.collapseAllRows()}}
              onRowExpand={({data})=> {
                console.log(data)
                selConversionDetailList(data.conversionId).then(response => {
                  console.log(response)
                response !== null && setConversionDetailDataState(response)
              })
             }}
            limit={30}
            multiRowExpand={false}
            />
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
    </main>
  )
}
export default ConversionManage
