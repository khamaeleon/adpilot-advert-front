import {
  Board,
  BoardHeader,
  BoardSearchResult,
  ColSpan2,
  ColTitle,
  Input,
  RelativeDiv, ResetButton,
  RowSpan,
  Span4,
  SubmitButton,
  SubmitContainer,
  ValidationScript
} from "../../assets/GlobalStyles";
import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {VerticalRule} from "../../components/common/Common";
import {Row} from "../campaign/styles/common";
import {SearchAdvertiser} from "../../components/common/SearchAdvertiser";
import ReactDataGrid from "@inovua/reactdatagrid-enterprise";
import {toast, ToastContainer} from "react-toastify";
import {useForm} from "react-hook-form";
import {createCustomReportsAxios, retrieveCustomReportsList} from "../../services/reports/ReportsAxios";
import {tokenResultAtom} from "../login/entity/Common";
import {useAtom, useAtomValue} from "jotai";
import {useNavigate} from "react-router-dom";
import {reportsInfoAtom} from "../../components/aside/entity";
import {selAdverPixelDetailList} from "../../services/header/ManagePixelAxios";
import {selTemporaryList} from "../../services/campaign/InfoAxios";
import {createCustomReportsAdminAxios, retrieveCustomReportsAdminList} from "../../services/reports/ReportsAdminAxios";


const columnList= {
  BY_DAILY: "날짜별",
  BY_WEEKLY: "주별",
  BY_MONTHLY: "월별",
  BY_ADVERTISE: "광고주 명",
  BY_CAMPAIGN: "캠페인 명",
  BY_PRODUCT: "광고 상품",
  BY_EVENT: "이벤트 명",
  COUNT_BY_ADVERTISE: "광고주 수",
  TOTAL_EXPOSURE_COUNT: "총 노출수",
  EXPOSURE_COUNT: "노출수",
  TOTAL_CLICK_COUNT: "총 클릭수",
  VALID_CLICK_COUNT: "클릭수",
  CLICK_RATE: "클릭율",
  COST_AMOUNT: "비용",
  CPC: "CPC",
  CONVERSION_COUNT: "전환수",
  CONVERSION_RATE: "전환율",
  CONVERSION_PRICE: "전환비용",
  AMOUNT_PURCHASED_AVG: "평균",
  SESSION_CONVERSION_AMOUNT: "세션 매출",
  SESSION_CONVERSION_ROAS: "세션 ROAS",
  DIRECT_CONVERSION_AMOUNT: "직접 매출",
  DIRECT_CONVERSION_ROAS: "직접 ROAS",
  ROAS: "ROAS",
  EXPOSURE_CONVERSION_AMOUNT: "노출 매출",
  EXPOSURE_CONVERSION_ROAS: "노출 ROAS",
  E_CPM: "eCPM",
}

export default function CreateReports() {
  const [period, setPeriod] = useState('NONE')
  const [scopes, setScopes] = useState([])
  const [dataItems, setDataItems] = useState([])
  const [columns, setColumns] = useState([])
  const [creativeInfo, setCreativeInfo] = useState({})
  const [reportName, setReportName] = useState('')
  const { register, trigger, formState: { errors } } = useForm();
  const tokenResult = useAtomValue(tokenResultAtom)
  const [reportsInfo, setReportsInfo] = useAtom(reportsInfoAtom)
  const navigate = useNavigate()

  useEffect(() => {
    console.log(creativeInfo)
    if(tokenResult.role !== 'NORMAL') {
      setCreativeInfo({
        ...creativeInfo,
        email: tokenResult.id
      })
    } else {
      setCreativeInfo({
        ...creativeInfo,
        id: tokenResult.id
      })
    }
    setReportsInfo({
      id: null,
      groupBy: null
    })
  }, []);

  useEffect(()=>{
    console.log(columns)
  },[columns])
  const handleSearchAdvertiser = (data) => {
    console.log(data)
    setCreativeInfo(data)
    console.log(data)
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
    if(item === 'NONE') {
      setPeriod('NONE')
      setScopes([])
      setColumns([])
    } else if(scopes.length === 0 && item === 'NONE') {
      toast.warning("기간 광고정보 중 하나는 선택해야합니다.")
    } else {
      setPeriod(item)
      setColumns([data])
    }
  }

  const handleAddScopesItem = (item) => {
    const data = {
      name: item,
      header: columnList[item],
      textAlign: 'center',
      sortable: false,
      resizable: false,
      showColumnMenuTool: false,
      draggable: false,
    }
    console.log(item)
    if(item === 'NONE') {
      setScopes([])
      setPeriod('NONE')
      setColumns([])
    } else {
      if(columns.filter(datum => datum.name === item).length === 0){
        setScopes(prev => [...prev, item])
        setColumns(prev => [...prev, data])
      } else {
        const newScopesData = scopes.filter(datum => datum !== item)
        const newColumnData = columns.filter(datum => datum.name !== data.name)
        setScopes(newScopesData)
        setColumns(newColumnData)
      }
    }
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
    if(scopes.length === 0 && period === 'NONE') {
      toast.warning("기간항목과 광고정보항목을 선택해야 합니다.")
    } else {
      console.log(columns)
      if(columns.filter(datum => datum.name === item).length === 0){
        setColumns(prev => [...prev, data])
        setDataItems(prev => [...prev, data.name])
      } else {
        const newColumnData = columns.filter(datum => datum.name !== item)
        setColumns(newColumnData)
        setDataItems(newColumnData)
      }
    }
  }

  const includeItem = (name) => {
    const i = columns.filter((item) => { return item.name === name });
    return i[0]?.name === name
  }

  const handleChangeReportName = (e) => {
    setReportName(e.target.value)
  }
  const handleCreateReports = async () => {
    let params;
    if (period === 'NONE' && scopes.length === 0) {
      toast.warning("기간별 항목과 광고정보항목을 중 하나는 필수로 선택해야 합니다.")
    } else if(columns.length < 2){
      toast.warning("보고서 항목을 선택해주세요")
    } else if(dataItems.length === 0){
      toast.warning('데이터 항목을 선택해주세요.')
    } else if(reportName === ""){
      await trigger("reportName")
      toast.warning("보고서 명을 작성해주세요")
    } else {
      if(tokenResult.role !== "NORMAL") {
        params = {
          "email": tokenResult.id,
          "reportName" : reportName,
          "groupByPeriod" : period,
          "groupByScopes" : scopes.length !== 0 ? scopes : ['NONE'],
          "columns" :  dataItems
        }

        if(creativeInfo.id !== undefined) {
          params.userId = creativeInfo.id
          params.adverName = creativeInfo.adverName
        }
        createCustomReportsAdminAxios(params).then(() => {
          retrieveCustomReportsAdminList(tokenResult.id).then(response => {
            const data  = response[response.length-1]
            setReportsInfo({id: data.id, groupBy: data.groupByPeriod})
            navigate('/board/customReports')
          })
        })
      } else {
        params = {
          "userId" : creativeInfo.id,
          "name": tokenResult.name,
          "reportName" : reportName,
          "groupByPeriod" : period,
          "groupByScopes" : scopes.length !== 0 ? scopes : ['NONE'],
          "columns" :  dataItems
        }
        createCustomReportsAxios(params).then(() => {
          retrieveCustomReportsList(tokenResult.id).then(response => {
            const data  = response[response.length-1]
            setReportsInfo({id: data.id, groupBy: data.groupByPeriod})
            navigate('/board/customReports')
          })
        })
      }
    }
  }

  const handleClickReset = () => {
    setCreativeInfo({})
  }

  return(
    <>
      <Board>
        <BoardHeader>보고서 생성</BoardHeader>
        <BoardSearchResult>
          <RowSpan>
            <RelativeDiv>
              {tokenResult.role !== 'NORMAL' &&
                <>
                  <Span4>광고주 설정</Span4>
                  <Input
                    style={{width: 300}}
                    {...register("creativeName",{
                      required: {
                        value: creativeInfo.adverName === "",
                        message: '광고주를 선택해주세요'
                      }
                    })}
                    value={creativeInfo.adverName || ""}
                    readOnly
                  />
                  <SearchAdvertiser title={'광고주 검색'} onSubmit={handleSearchAdvertiser}/>
                  <ResetButton onClick={handleClickReset}>재설정</ResetButton>
                  <small>* 광고주 설정이 없을 경우 전체 보고서가 생성됩니다.</small>
                </>
              }
              {tokenResult.role === 'NORMAL' &&
                <>
                  <Span4>광고주</Span4>
                  <ColSpan2>{tokenResult.name}</ColSpan2>
                </>
              }
            </RelativeDiv>
          </RowSpan>
          <RowSpan>
            <Span4>보고서 항목 선택</Span4>
            {/*<OpenReports title={'보고서 불러오기'}/>*/}
          </RowSpan>
          <ReportsItemContainer>
            <RowSpan box={true} column={true}>
              <Row>
                <Span4>기간별 항목 (택1)</Span4>
                <small>*기간별 항목을 다시 선택할 경우 선택 항목이 초기화 됩니다.</small>
              </Row>
              <Row>
                <DefaultItemContainer>
                  <DefaultItemButton
                    active={includeItem('BY_DAILY')}
                    onClick={()=>handleAddPeriodItem('BY_DAILY')}>일별</DefaultItemButton>
                  <DefaultItemButton
                    active={includeItem('BY_WEEKLY')}
                    onClick={()=>handleAddPeriodItem('BY_WEEKLY')}>주별</DefaultItemButton>
                  <DefaultItemButton
                    active={includeItem('BY_MONTHLY')}
                    onClick={()=>handleAddPeriodItem('BY_MONTHLY')}>월별</DefaultItemButton>
                  <DefaultItemButton
                    active={period === 'NONE'}
                    onClick={()=>handleAddPeriodItem('NONE')}>설정안함</DefaultItemButton>
                </DefaultItemContainer>
              </Row>
              <VerticalRule/>
              <Row>
                <ColTitle>광고 정보 항목 (다중선택)</ColTitle>
              </Row>
              <Row>
                <DefaultItemContainer>
                  <DefaultItemButton
                    active={includeItem('BY_ADVERTISE')}
                    onClick={()=>handleAddScopesItem('BY_ADVERTISE')}>광고주명</DefaultItemButton>
                  <DefaultItemButton
                    active={includeItem('BY_CAMPAIGN')}
                    onClick={()=>handleAddScopesItem('BY_CAMPAIGN')}>캠페인명</DefaultItemButton>
                  <DefaultItemButton
                    active={includeItem('BY_PRODUCT')}
                    onClick={()=>handleAddScopesItem('BY_PRODUCT')}>광고 상품</DefaultItemButton>
                  <DefaultItemButton
                    active={includeItem('BY_EVENT')}
                    onClick={()=>handleAddScopesItem('BY_EVENT')}>이벤트 명</DefaultItemButton>
                  <DefaultItemButton
                    active={scopes.length === 0}
                    onClick={()=>handleAddScopesItem('NONE')}>설정안함</DefaultItemButton>
                </DefaultItemContainer>
              </Row>
              <VerticalRule/>
              <Row>
                <ColTitle>데이터 항목 (다중선택)</ColTitle>
              </Row>
              <Row>
                <DefaultItemContainer>
                  <DefaultItemButton
                    active={includeItem('COUNT_BY_ADVERTISE')}
                    onClick={()=>handleAddReportsItem('COUNT_BY_ADVERTISE')}>광고주수</DefaultItemButton>
                  <DefaultItemButton
                    active={includeItem('TOTAL_EXPOSURE_COUNT')}
                    onClick={()=>handleAddReportsItem('TOTAL_EXPOSURE_COUNT')}>총 노출수</DefaultItemButton>
                  <DefaultItemButton
                    active={includeItem('EXPOSURE_COUNT')}
                    onClick={()=>handleAddReportsItem('EXPOSURE_COUNT')}>노출수</DefaultItemButton>
                  <DefaultItemButton
                    active={includeItem('TOTAL_CLICK_COUNT')}
                    onClick={()=>handleAddReportsItem('TOTAL_CLICK_COUNT')}>총클릭수</DefaultItemButton>
                  <DefaultItemButton
                    active={includeItem('VALID_CLICK_COUNT')}
                    onClick={()=>handleAddReportsItem('VALID_CLICK_COUNT')}>클릭수</DefaultItemButton>
                  <DefaultItemButton
                    active={includeItem('CLICK_RATE')}
                    onClick={()=>handleAddReportsItem('CLICK_RATE')}>클릭률</DefaultItemButton>
                  <DefaultItemButton
                    active={includeItem('COST_AMOUNT')}
                    onClick={()=>handleAddReportsItem('COST_AMOUNT')}>비용</DefaultItemButton>
                  <DefaultItemButton
                    active={includeItem('CPC')}
                    onClick={()=>handleAddReportsItem('CPC')}>CPC</DefaultItemButton>
                  <DefaultItemButton
                    active={includeItem('CONVERSION_PRICE')}
                    onClick={()=>handleAddReportsItem('CONVERSION_PRICE')}>전환가격</DefaultItemButton>
                  <DefaultItemButton
                    active={includeItem('AMOUNT_PURCHASED_AVG')}
                    onClick={()=>handleAddReportsItem('AMOUNT_PURCHASED_AVG')}>평균구매액</DefaultItemButton>
                  <DefaultItemButton
                    active={includeItem('CONVERSION_COUNT')}
                    onClick={()=>handleAddReportsItem('CONVERSION_COUNT')}>전환수</DefaultItemButton>
                  <DefaultItemButton
                    active={includeItem('CONVERSION_RATE')}
                    onClick={()=>handleAddReportsItem('CONVERSION_RATE')}>전환율</DefaultItemButton>
                  <DefaultItemButton
                    active={includeItem('SESSION_CONVERSION_AMOUNT')}
                    onClick={()=>handleAddReportsItem('SESSION_CONVERSION_AMOUNT')}>세션 매출</DefaultItemButton>
                  <DefaultItemButton
                    active={includeItem('SESSION_CONVERSION_ROAS')}
                    onClick={()=>handleAddReportsItem('SESSION_CONVERSION_ROAS')}>세션 ROAS</DefaultItemButton>
                  <DefaultItemButton
                    active={includeItem('DIRECT_CONVERSION_AMOUNT')}
                    onClick={()=>handleAddReportsItem('DIRECT_CONVERSION_AMOUNT')}>직접 매출</DefaultItemButton>
                  <DefaultItemButton
                    active={includeItem('DIRECT_CONVERSION_ROAS')}
                    onClick={()=>handleAddReportsItem('DIRECT_CONVERSION_ROAS')}>직접 ROAS</DefaultItemButton>
                  <DefaultItemButton
                    active={includeItem('EXPOSURE_CONVERSION_AMOUNT')}
                    onClick={()=>handleAddReportsItem('EXPOSURE_CONVERSION_AMOUNT')}>노출 매출</DefaultItemButton>
                  <DefaultItemButton
                    active={includeItem('EXPOSURE_CONVERSION_ROAS')}
                    onClick={()=>handleAddReportsItem('EXPOSURE_CONVERSION_ROAS')}>노출 ROAS</DefaultItemButton>
                  <DefaultItemButton
                    active={includeItem('ROAS')}
                    onClick={()=>handleAddReportsItem('ROAS')}>ROAS</DefaultItemButton>
                  <DefaultItemButton
                    active={includeItem('E_CPM')}
                    onClick={()=>handleAddReportsItem('E_CPM')}>eCPM</DefaultItemButton>
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
                <div style={{position: "relative"}}>
                  <Input
                    {...register("reportName", {
                      required: {
                        value: reportName === "",
                        message: '보고서 명을 작성해주세요'
                      },
                      value: reportName || "",
                      onChange: handleChangeReportName
                    })}
                    style={errors.reportName?.ref?.value === "" ? {border:"1px solid red"} : null}
                    placeholder={'보고서 명을 작성해주세요'}/>
                  {errors.reportName?.ref?.value === "" && <ValidationScript>{errors.reportName.message}</ValidationScript>}
                </div>
              </ColSpan2>
            </RowSpan>
            <RowSpan style={{marginTop: 25}}>
              <ReactDataGrid
                licenseKey={process.env.REACT_APP_DATA_GRID_LICENSE_KEY}
                columns={columns}
                dataSource={[]}
                showCellBorders={'horizontal'}
                showZebraRows={false}
                activateRowOnFocus
                emptyText={'데이터가 없습니다.'}
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