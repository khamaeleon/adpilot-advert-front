import {
  Board,
  BoardHeader,
  BoardTableContainer,
  RowSpan,
  SaveExcelButton,
} from "../../assets/GlobalStyles";
import React, {useEffect, useState} from "react";
import {useAtom} from "jotai";
import {ToastContainer} from "react-toastify";
import {PlatformCondition} from "../../components/Platform/Condition";
import {selConversionDetailList, selConversionList} from "../../services/conversion/ConversionAxios";
import {searchConditionAtom} from "./entity/Common";
import {
  columnConversionData,
  columnConversionDetailData,
  conversionDetailDataAtom,
  conversionListDataAtom,
  searchConversionType
} from "./entity/Conversion";
import ReactDataGrid from "@inovua/reactdatagrid-enterprise";
import {navigationName} from "../../components/common/entity";
import moment from "moment/moment";
import {useLocation} from "react-router-dom";

function ConversionManage() {
  const [conversionListDataState, setConversionListDataState] = useAtom(conversionListDataAtom)
  const [conversionDetailDataState, setConversionDetailDataState] = useAtom(conversionDetailDataAtom)
  const [searchCondition, setSearchCondition] = useState(searchConditionAtom)
  const [gridRef, setGridRef] = useState(null);
  const location = useLocation()

  useEffect(() => {
    selConversionList(searchCondition).then(response =>{
      setConversionListDataState(response)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSearch = () => {
    selConversionList(searchCondition).then(response =>{
      setConversionListDataState(response)
    })
  }
  const renderContactsGrid = () => {
    return (
      <ReactDataGrid
        style={{minHeight: 45}}
        handle={null}
        clearNodeCacheOnDataSourceChange={true}
        dataSource={conversionDetailDataState!==null && conversionDetailDataState}
        columns={columnConversionDetailData}
        enableColumnAutosize={true}
        groups={false}
        emptyText={'캠페인 리스트가 없습니다.'}
        rowHeight={45}
        showHoverRows={false}
        activeCell={null}
      />
    );
  }

  const downloadBlob = (blob, fileName = `${navigationName[location.pathname].split('/')[2]}-${moment().format('DDmmss')}.csv`) => {
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    link.style.position = 'absolute';
    link.style.visibility = 'hidden';

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };
  const exportCSV = () => {
    const columns = gridRef.current.visibleColumns;

    const header = columns.map((c) => typeof c.header === 'string' ? c.header : '').join(',');
    const rows = gridRef.current.data.map((data) =>
        columns.map((c) => c.id !== 'conversionId' && data[c.id]).join(','));

    const uFEFF = "\uFEFF"

    // Office 2007 이전에는 ANSI 1252 인코딩을 기본 값, BOM을 추가하면 Office 2007 이후 버전
    // 하여 해결책으로 제시하는 바는
    // 1. csv 파일의 포맷을 컴퓨터에서 바꾼다 (매번 변경해줘야하는 번거로움이 생김)
    // 2. 거의 모든 엑셀은 utf든 ansi든 표시할 기능을 갖추고 있음. 엑셀 기본 인코딩 설정을 변경 (뷰어에서 설정을 바꿀수있지만 컴퓨터에 능숙하지 않은 사람에게 교육시키는 일이 어려움)
    // 3. csv를 ANSI로 작성한다 (디코딩 기본값이 utf8인 엑셀을 사용한다면 오히려 ansi로 작성한 파일을 열었을때 깨질수 있음)
    // 4. 구글시트, 폴라리스, 넘버스 등은 자동으로 파일의 인코딩을 잘 알아내는데 반하여 엑셀일부는
    // 가끔 인코딩을 식별하지 못하기 때문에 엑셀에서도 인식할 수 있도록 csv에 인코딩을 표시해준다.
    // (문서의 맨 앞에 /ufeff 문자열을 추가 하면 해당 내용이 어떤 문자열로 인코딩 되었는지 표현하는 식별자.
    // 이것을 맨 앞에 적어 놓으면 엑셀 프로그램은 파일의 인코딩을 이해하고 그에 맞게 출력한다.)

    const contents = [header].concat(rows).join('\n');
    const blob = new Blob([uFEFF+contents], { encoding: 'UTF-8', type: 'text/csv;charset=utf-8;' });

    downloadBlob(blob);
  };
  const rowExpandHeight = ({ data }) => {
    if(data?.totalProductCount < 8) {
      return 82+(data?.totalProductCount*45)
    } else if(data?.totalProductCount === 0) {
      return 300
    }
    return 420;
  }
  return (
    <main>
      <Board>
        <BoardHeader>전환 현황</BoardHeader>
        <PlatformCondition searchType={searchConversionType} searchCondition={searchCondition} setSearchCondition={setSearchCondition} handleTableData={handleSearch}/>
        <BoardTableContainer>
          { conversionListDataState !== null &&
            <>
              <RowSpan style={{display: 'flex', justifyContent: 'flex-end'}}>
                <SaveExcelButton style={{ margin: '0 10px 20px' }} onClick={exportCSV}>엑셀 저장</SaveExcelButton>
              </RowSpan>
              <ReactDataGrid
                licenseKey={process.env.REACT_APP_DATA_GRID_LICENSE_KEY}
                handle={null}
                onReady={setGridRef}
                style={{minHeight: 550, textAline: 'center'}}
                rowExpandHeight={rowExpandHeight}
                rowHeights={null}
                renderDetailsGrid={renderContactsGrid}
                enableColumnAutosize={true}
                emptyText={'전환 현황이 없습니다.'}
                idProperty={'conversionId'}
                dataSource={conversionListDataState}
                detailsGridCacheKey={'campaignId'}
                columns={columnConversionData}
                onDataSourceCacheChange={()=>{gridRef?.current.collapseAllRows()}}
                onRowExpand={({data})=> {
                  selConversionDetailList(data.conversionId).then(response => {
                    response !== null && setConversionDetailDataState(response)
                  })
                }}
                limit={30}
                multiRowExpand={false}
                showHoverRows={false}
                activeCell={null}
              />
            </>
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
