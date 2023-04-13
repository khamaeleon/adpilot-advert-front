import {
  Board,
  BoardHeader,
  BoardSearchResult,
  ColSpan1, ColSpan2,
  Input,
  RelativeDiv,
  RowSpan,
  Span4,
  SubmitButton,
  SubmitContainer
} from "../../assets/GlobalStyles";
import React, {useState} from "react";
import styled from "styled-components";
import {VerticalRule} from "../../components/common/Common";
import {Row} from "../campaign/styles/common";
import {SearchAdvertiser} from "../../components/common/SearchAdvertiser";
import ReactDataGrid from "@inovua/reactdatagrid-enterprise";
import {OpenReports} from "../../components/modal/OpenReports";
import {customReportsData} from "./entity/Common";
import {toast, ToastContainer} from "react-toastify";

const columnList= {
  daily:"일별",
  weeks:"주별",
  month:"월별",
  eventName: "이벤트 명",
  advertiserCnt:"광고주수",
  advertiserName:"광고주명",
  advertiserId:"광고주 아이디",
  campaignName:"캠페인명",
  creative:"광고 상품",
  exposureAll:"총노출수",
  exposureCount:"노출수",
  clickCountAll:"총클릭수",
  clickCount:"클릭수",
  clickRate:"클릭율",
  cost:"비용",
  cpc:"CPC",
  conversionCount:"전환수",
  conversionRate:"전환율",
  averageCost:"평균구매액",
  roas:"ROAS",
  ecpm:"eCPM",
}
export default function CreateReports() {
  const [columns, setColumns] = useState([])
  const [reportName, setReportName] = useState("")
  const handleSearchAdvertiser = () => {

  }

  const handleAddPeriodItem = (item) => {
    const data = {
      name: item,
      header: columnList[item],
      textAlign: 'center',
      sortable: false,
      resizable: false,
      showColumnMenuTool: false,
      draggable: false,
    }
    setColumns([data])
    console.log(columns)
  }

  const handleAddReportsItem = (item) => {
    const data = {
      name: item,
      header: columnList[item],
      textAlign: 'center',
      sortable: false,
      resizable: false,
      showColumnMenuTool: false,
      draggable:false,
    }
    if(columns.length === 0){
      toast("기간을 설정해주세요")
    } else {
      if(columns.filter(datum => datum.name === item).length === 0){
        setColumns(prev => [...prev, data])
      } else {
        const newColumnData = columns.filter(datum => datum.name !== item)
        setColumns(newColumnData)
      }
    }
    console.log(columns)
  }

  const includeItem = (name) => {
    const i = columns.filter((item) => { return item.name === name });
    return i[0]?.name === name
  }

  const handleChangeReportName = (e) => {
    setReportName(e.target.value)
  }
  const handleCreateReports = () => {
    if(columns.length < 3){
      toast("보고서 항목을 선택해주세요")
    } else if(reportName === ""){
      toast("보고서 명을 작성해주세요")

    } else {
      console.log(reportName)
    }
  }

  return(
    <>
      <Board>
        <BoardHeader>보고서 생성</BoardHeader>
        <BoardSearchResult>
          <RowSpan>
            <RelativeDiv>
              <Span4>광고주 설정</Span4>
              <Input
                style={{width: 300}}
                readOnly
              />
              <SearchAdvertiser title={'광고주 검색'} onSubmit={handleSearchAdvertiser}/>
            </RelativeDiv>
          </RowSpan>
          <RowSpan>
            <Span4>보고서 항목 선택</Span4>
            <OpenReports title={'보고서 불러오기'}/>
          </RowSpan>
          <ReportsItemContainer>
            <RowSpan box={true} column={true}>
              <Row>
                <Span4>기간</Span4>
              </Row>
              <Row>
                <DefaultItemContainer>
                  <DefaultItemButton
                    active={includeItem('daily')}
                    onClick={()=>handleAddPeriodItem('daily')}>일별</DefaultItemButton>
                  <DefaultItemButton
                    active={includeItem('weeks')}
                    onClick={()=>handleAddPeriodItem('weeks')}>주별</DefaultItemButton>
                  <DefaultItemButton
                    active={includeItem('month')}
                    onClick={()=>handleAddPeriodItem('month')}>월별</DefaultItemButton>
                </DefaultItemContainer>
              </Row>
              <VerticalRule/>
              <Row>
                <Span4>광고 정보</Span4>
              </Row>
              <Row>
                <DefaultItemContainer>
                  <DefaultItemButton
                    active={includeItem('advertiserName')}
                    onClick={()=>handleAddReportsItem('advertiserName')}>광고주명</DefaultItemButton>
                  <DefaultItemButton
                    active={includeItem('advertiserId')}
                    onClick={()=>handleAddReportsItem('advertiserId')}>광고주 아이디</DefaultItemButton>
                  <DefaultItemButton
                    active={includeItem('campaignName')}
                    onClick={()=>handleAddReportsItem('campaignName')}>캠페인명</DefaultItemButton>
                  <DefaultItemButton
                    active={includeItem('creative')}
                    onClick={()=>handleAddReportsItem('creative')}>광고 상품</DefaultItemButton>
                  <DefaultItemButton
                    active={includeItem('eventName')}
                    onClick={()=>handleAddReportsItem('eventName')}>이벤트 명</DefaultItemButton>
                </DefaultItemContainer>
              </Row>
              <VerticalRule/>
              <Row>
                <Span4>데이터 항목</Span4>
              </Row>
              <Row>
                <DefaultItemContainer>
                  <DefaultItemButton
                    active={includeItem('advertiserCnt')}
                    onClick={()=>handleAddReportsItem('advertiserCnt')}>광고주수</DefaultItemButton>
                  <DefaultItemButton
                    active={includeItem('exposureAll')}
                    onClick={()=>handleAddReportsItem('exposureAll')}>총 노출수</DefaultItemButton>
                  <DefaultItemButton
                    active={includeItem('exposureCount')}
                    onClick={()=>handleAddReportsItem('exposureCount')}>노출수</DefaultItemButton>
                  <DefaultItemButton
                    active={includeItem('clickCountAll')}
                    onClick={()=>handleAddReportsItem('clickCountAll')}>총클릭수</DefaultItemButton>
                  <DefaultItemButton
                    active={includeItem('clickCount')}
                    onClick={()=>handleAddReportsItem('clickCount')}>클릭수</DefaultItemButton>
                  <DefaultItemButton
                    active={includeItem('clickRate')}
                    onClick={()=>handleAddReportsItem('clickRate')}>클릭률</DefaultItemButton>
                  <DefaultItemButton
                    active={includeItem('cost')}
                    onClick={()=>handleAddReportsItem('cost')}>비용</DefaultItemButton>
                  <DefaultItemButton
                    active={includeItem('cpc')}
                    onClick={()=>handleAddReportsItem('cpc')}>CPC</DefaultItemButton>
                  <DefaultItemButton
                    active={includeItem('conversionCount')}
                    onClick={()=>handleAddReportsItem('conversionCount')}>전환수</DefaultItemButton>
                  <DefaultItemButton
                    active={includeItem('conversionRate')}
                    onClick={()=>handleAddReportsItem('conversionRate')}>전환율</DefaultItemButton>
                  <DefaultItemButton
                    active={includeItem('averageCost')}
                    onClick={()=>handleAddReportsItem('averageCost')}>평균구매액</DefaultItemButton>
                  <DefaultItemButton
                    active={includeItem('roas')}
                    onClick={()=>handleAddReportsItem('roas')}>ROAS</DefaultItemButton>
                  <DefaultItemButton
                    active={includeItem('ecpm')}
                    onClick={()=>handleAddReportsItem('ecpm')}>eCPM</DefaultItemButton>
                </DefaultItemContainer>
              </Row>
            </RowSpan>
          </ReportsItemContainer>
        </BoardSearchResult>
        <BoardSearchResult>
          <div style={{display:'flex'}}>
            <Span4>보고서 생성 결과</Span4>
            <small>* 현재 보고서에 생성된 데이터는 예시입니다. 컬럼의 순서는 변경이 가능합니다.</small>
          </div>
          <RowSpan column={true}>
            <RowSpan>
              <ColSpan2>
                <Span4><span style={{color:'red'}}>*</span> 보고서 명</Span4>
                <Input
                  onChange={handleChangeReportName}
                  value={reportName || ""}
                  placeholder={'보고서 명을 작성해주세요'}/>
              </ColSpan2>
            </RowSpan>
            <RowSpan>
              <ReactDataGrid
                licenseKey={process.env.REACT_APP_DATA_GRID_LICENSE_KEY}
                columns={columns}
                dataSource={[]}
                showCellBorders={'horizontal'}
                showZebraRows={false}
                activateRowOnFocus
                emptyText={'데이터가 없습니다.'}
                {...customReportsData}
              />
            </RowSpan>
          </RowSpan>
        </BoardSearchResult>
      </Board>
      <SubmitContainer>
        <SubmitButton type={'button'} onClick={handleCreateReports}>보고서 생성</SubmitButton>
      </SubmitContainer>
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
  )
}

const ReportsItemContainer = styled.div`
  margin-top: 10px;
  padding: 0 15px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
`

const DefaultItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 12px;
`
const DefaultItemButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 137px;
  height: 36px;
  background-color: #ffffff;
  border: 1px solid ${(props) => props.active ? '#f5811f' : '#e5e5e5'};
  color: ${(props) => props.active ? '#f5811f' : null};
  cursor: pointer;
`