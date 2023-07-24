import {
  Board,
  BoardHeader,
  BoardSearchResult,
  ColSpan2,
  ColTitle,
  Input,
  RelativeDiv,
  ResetButton,
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
import {toast} from "react-toastify";
import {useForm} from "react-hook-form";
import {createCustomReportsAxios, retrieveCustomReportsList} from "../../services/reports/ReportsAxios";
import {tokenResultAtom} from "../login/entity/Common";
import {useAtom, useAtomValue, useSetAtom} from "jotai";
import {useNavigate} from "react-router-dom";
import {reportsInfoAtom} from "../../components/aside/entity";
import {createCustomReportsAdminAxios, retrieveCustomReportsAdminList} from "../../services/reports/ReportsAdminAxios";
import {atom} from "jotai/index";

const columnList= {
  BY_DAILY: "일별",
  BY_WEEKLY: "주별",
  BY_MONTHLY: "월별",
  BY_ADVERTISE: "광고주 명",
  BY_CAMPAIGN: "캠페인 명",
  BY_PRODUCT: "광고 상품",
  BY_TARGETING: "타겟팅",
  COUNT_BY_ADVERTISE: '광고주 수',
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

const indexedColumns = (columns) => {
  return [
    {name:"BY_DAILY", header: "일별", textAlign: 'center', visible: columns.includes('BY_DAILY'), sortable: false, resizable: false, showColumnMenuTool: false, draggable: false},
    {name:"BY_WEEKLY", header: "주별", textAlign: 'center', visible: columns.includes('BY_WEEKLY'),sortable: false, resizable: false, showColumnMenuTool: false, draggable: false},
    {name:"BY_MONTHLY", header: "월별", textAlign: 'center', visible: columns.includes('BY_MONTHLY') ,sortable: false, resizable: false, showColumnMenuTool: false, draggable: false},
    {name:"BY_ADVERTISE", header: "광고주 명", textAlign: 'center', visible: columns.includes('BY_ADVERTISE') ,sortable: false, resizable: false, showColumnMenuTool: false, draggable: false},
    {name:"BY_CAMPAIGN", header: "캠페인 명", textAlign: 'center', visible: columns.includes('BY_CAMPAIGN'),sortable: false, resizable: false, showColumnMenuTool: false, draggable: false},
    {name:"BY_PRODUCT", header: "광고 상품", textAlign: 'center', visible: columns.includes('BY_PRODUCT'),sortable: false, resizable: false, showColumnMenuTool: false, draggable: false},
    {name:"BY_TARGETING", header: "타겟팅", textAlign: 'center', visible: columns.includes('BY_TARGETING'),sortable: false, resizable: false, showColumnMenuTool: false, draggable: false},
    {name:"COUNT_BY_ADVERTISE", header: '광고주 수', textAlign: 'center', visible: columns.includes('COUNT_BY_ADVERTISE'),sortable: false, resizable: false, showColumnMenuTool: false, draggable: false},
    {name:"TOTAL_EXPOSURE_COUNT", header: "총 노출수", textAlign: 'center', visible: columns.includes('TOTAL_EXPOSURE_COUNT'),sortable: false, resizable: false, showColumnMenuTool: false, draggable: false},
    {name:"EXPOSURE_COUNT", header: "노출수", textAlign: 'center', visible: columns.includes('EXPOSURE_COUNT'),sortable: false, resizable: false, showColumnMenuTool: false, draggable: false},
    {name:"TOTAL_CLICK_COUNT", header: "총 클릭수", textAlign: 'center', visible: columns.includes('TOTAL_CLICK_COUNT'),sortable: false, resizable: false, showColumnMenuTool: false, draggable: false},
    {name:"VALID_CLICK_COUNT", header: "클릭수", textAlign: 'center', visible: columns.includes('VALID_CLICK_COUNT'),sortable: false, resizable: false, showColumnMenuTool: false, draggable: false},
    {name:"CLICK_RATE", header: "클릭률", textAlign: 'center', visible: columns.includes('CLICK_RATE'),sortable: false, resizable: false, showColumnMenuTool: false, draggable: false},
    {name:"COST_AMOUNT", header: "비용", textAlign: 'center', visible: columns.includes('COST_AMOUNT'),sortable: false, resizable: false, showColumnMenuTool: false, draggable: false},
    {name:"CPC", header: "CPC", textAlign: 'center', visible: columns.includes('CPC'),sortable: false, resizable: false, showColumnMenuTool: false, draggable: false},
    {name:"CONVERSION_PRICE", header: "전환단가", textAlign: 'center', visible: columns.includes('CONVERSION_PRICE'),sortable: false, resizable: false, showColumnMenuTool: false, draggable: false},
    {name:"CONVERSION_COUNT", header: "전환수", textAlign: 'center', visible: columns.includes('CONVERSION_COUNT'),sortable: false, resizable: false, showColumnMenuTool: false, draggable: false},
    {name:"CONVERSION_RATE", header: "전환율", textAlign: 'center', visible: columns.includes('CONVERSION_RATE'),sortable: false, resizable: false, showColumnMenuTool: false, draggable: false},
    {name:"AMOUNT_PURCHASED_AVG", header: "평균구매액", textAlign: 'center', visible: columns.includes('AMOUNT_PURCHASED_AVG'),sortable: false, resizable: false, showColumnMenuTool: false, draggable: false},
    {name:"SESSION_CONVERSION_AMOUNT", header: "세션 매출", textAlign: 'center', visible: columns.includes('SESSION_CONVERSION_AMOUNT'),sortable: false, resizable: false, showColumnMenuTool: false, draggable: false},
    {name:"SESSION_CONVERSION_ROAS", header: "세션 ROAS", textAlign: 'center', visible: columns.includes('SESSION_CONVERSION_ROAS'),sortable: false, resizable: false, showColumnMenuTool: false, draggable: false},
    {name:"DIRECT_CONVERSION_AMOUNT", header: "직접 매출", textAlign: 'center', visible: columns.includes('DIRECT_CONVERSION_AMOUNT'),sortable: false, resizable: false, showColumnMenuTool: false, draggable: false},
    {name:"DIRECT_CONVERSION_ROAS", header: "직접 ROAS", textAlign: 'center', visible: columns.includes('DIRECT_CONVERSION_ROAS'),sortable: false, resizable: false, showColumnMenuTool: false, draggable: false},
    {name:"ROAS", header: "총 ROAS", textAlign: 'center', visible: columns.includes('ROAS'),sortable: false, resizable: false, showColumnMenuTool: false, draggable: false},
    {name:"EXPOSURE_CONVERSION_AMOUNT", header: "노출 매출", textAlign: 'center', visible: columns.includes('EXPOSURE_CONVERSION_AMOUNT'),sortable: false, resizable: false, showColumnMenuTool: false, draggable: false},
    {name:"EXPOSURE_CONVERSION_ROAS", header: "노출 ROAS", textAlign: 'center', visible: columns.includes('EXPOSURE_CONVERSION_ROAS'),sortable: false, resizable: false, showColumnMenuTool: false, draggable: false},
    {name:"E_CPM", header: "eCPM", textAlign: 'center', visible: columns.includes('E_CPM'),sortable: false, resizable: false, showColumnMenuTool: false, draggable: false},
  ]
}

export default function CreateReports() {
  const [period, setPeriod] = useState('NONE')
  const [scopes, setScopes] = useState([])
  const [dataItems, setDataItems] = useState([])
  const [columns, setColumns] = useState([])
  const [creativeInfo, setCreativeInfo] = useState({})
  const [reportName, setReportName] = useState('')
  const { register, setError, clearErrors, formState: { errors } } = useForm();
  const tokenResult = useAtomValue(tokenResultAtom)
  const setReportsInfo = useSetAtom(reportsInfoAtom)
  const navigate = useNavigate()
  const [defaultType, setDefaultType] = useState(null)
  const [defaultColumn, setDefaultColumn] = useState(indexedColumns(columns))

  useEffect(() => {
    if(tokenResult?.role !== 'NORMAL') {
      setCreativeInfo({
        ...creativeInfo,
        email: tokenResult?.id
      })
    } else {
      setCreativeInfo({
        ...creativeInfo,
        id: tokenResult?.id
      })
    }
    setReportsInfo({
      id: null,
      groupBy: null
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setDefaultColumn(indexedColumns(columns))
  }, [columns]);

  /**
   * 광고주 검색
   * @param data
   */
  const handleSearchAdvertiser = (data) => {
    setCreativeInfo(data)
  }
  /**
   * 기간 선택
   * @param item
   */
  const handleAddPeriodItem = (item) => {
    setScopes([])
    setPeriod('NONE')
    setDataItems([])
    setColumns([])
    setPeriod(item)
    setColumns([item])
  }
  /**
   * 기준항목 선택
   * @param item
   */
  const handleAddScopesItem = (item) => {
    if(columns.filter(datum => datum.name === item).length === 0){
      setScopes(prev => [...prev, item])
      setColumns(prev => [...prev, item])
    } else {
      const newScopesData = scopes.filter(datum => datum !== item)
      const newColumnData = columns.filter(datum => datum !== item)
      setScopes(newScopesData)
      setColumns(newColumnData)
    }
  }
  /**
   * 보고서 항목 선택
   * @param item
   */
  const handleAddReportsItem = (item) => {
    if(dataItems.filter(datum => datum === item).length === 0){
      setColumns(prev => [...prev, item])
      setDataItems(prev => [...prev, item])
    } else {
      const newColumnData = columns.filter(datum => datum !== item)
      const newDataItems = dataItems.filter(datum => datum !== item)
      setColumns(newColumnData)
      setDataItems(newDataItems)
    }
  }
  /**
   * 컬럼 포함 객체 불러오기
   * @param name
   * @returns {boolean}
   */
  const includeItem = (name) => {
    const i = columns.filter((item) => { return item === name });
    return i[0] === name
  }
  /**
   * 보고서 명 인풋
   * @param e
   */
  const handleChangeReportName = (e) => {
    clearErrors('reportName')
    if(reportName.length < 13){
      setReportName(e.target.value)
    }
  }
  /**
   * 보고서 생성
   * @returns {Promise<void>}
   */
  const handleCreateReports = async () => {
    let params;
    if (reportName === '') {
      setError('reportName',{type: 'required', message: '보고서 명을 작성해주세요.'})
    } else if(defaultType === null){
      toast.warning("기준항목을 선택해주세요.")
    } else if (defaultType === 'period' && period === 'NONE') {
      toast.warning("기간별 항목을 선택해주세요.")
    } else if(defaultType === 'scopes' && scopes.length === 0) {
      toast.warning("광고 항목을 선택해주세요.")
    } else if(columns.length < 2){
      toast.warning("보고서 항목을 선택해주세요")
    } else if(dataItems.length === 0){
      toast.warning('데이터 항목을 선택해주세요.')
    } else {
      if(tokenResult.role !== "NORMAL") {
        params = {
          "email": tokenResult.id,
          "reportName" : reportName,
          "groupByPeriod" : defaultType === 'period' ? period : 'NONE',
          "groupByScopes" : defaultType === 'scopes' ? scopes : ['NONE'],
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
          "groupByPeriod" : defaultType === 'period' ? period : 'NONE',
          "groupByScopes" : defaultType === 'scopes' ? scopes : ['NONE'],
          "columns" :  dataItems
        }
        if(creativeInfo.id !== null && creativeInfo.id !== undefined) {
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
  }
  /**
   * 광고주 재설정 (리셋)
   */
  const handleClickReset = () => {
    setCreativeInfo({})
  }
  /**
   * 컬럼 초기화
   * @param type
   */
  const handleChangeDefaultColumn = (type) => {
    setDefaultType(type.target.value)
    setScopes([])
    setPeriod('NONE')
    setDataItems([])
    setColumns([])
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
                    value={creativeInfo.adverName || "광고주 전체"}
                    readOnly
                  />
                  <SearchAdvertiser title={'광고주 검색'} onSubmit={handleSearchAdvertiser}/>
                  <ResetButton onClick={handleClickReset}>광고주 전체</ResetButton>
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
                <Span4>보고서 속성 선택</Span4>
              </Row>
              <RelativeDiv>
                <label>
                  <input type="radio" name={'defaultType'} value={'period'} onChange={handleChangeDefaultColumn}/>
                  <span>기간별 보고서</span>
                </label>
                <label>
                  <input type="radio" name={'defaultType'} value={'scopes'} onChange={handleChangeDefaultColumn}/>
                  <span>광고 정보별 보고서</span>
                </label>
              </RelativeDiv>
            </RowSpan>
            {defaultType !== null &&
            <RowSpan box={true} column={true}>
              {defaultType === 'period' &&
                <>
                  <Row>
                    <Span4>기간별 항목</Span4>
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
                    </DefaultItemContainer>
                  </Row>
                  <VerticalRule/>
                </>
              }
              {defaultType === 'scopes' &&
                <>
                  <Row>
                    <ColTitle>광고 정보 항목</ColTitle>
                  </Row>
                  <Row>
                    <DefaultItemContainer>
                      {tokenResult.role === 'NORMAL' &&
                        <>
                          <DefaultItemButton
                            active={includeItem('BY_CAMPAIGN')}
                            onClick={()=>handleAddScopesItem('BY_CAMPAIGN')}>캠페인명</DefaultItemButton>
                          <DefaultItemButton
                            active={includeItem('BY_PRODUCT')}
                            onClick={()=>handleAddScopesItem('BY_PRODUCT')}>광고 상품</DefaultItemButton>
                        </>
                      }
                      {tokenResult.role !== 'NORMAL' &&
                        <>
                          <DefaultItemButton
                            active={includeItem('BY_ADVERTISE')}
                            onClick={()=>handleAddScopesItem('BY_ADVERTISE')}>광고주 명(ID)</DefaultItemButton>
                          <DefaultItemButton
                            active={includeItem('BY_CAMPAIGN')}
                            onClick={()=>handleAddScopesItem('BY_CAMPAIGN')}>캠페인명</DefaultItemButton>
                          <DefaultItemButton
                            active={includeItem('BY_PRODUCT')}
                            onClick={()=>handleAddScopesItem('BY_PRODUCT')}>광고 상품</DefaultItemButton>
                          <DefaultItemButton
                            active={includeItem('BY_TARGETING')}
                            onClick={()=>handleAddScopesItem('BY_TARGETING')}>타겟팅</DefaultItemButton>
                        </>
                      }
                    </DefaultItemContainer>
                  </Row>
                  <VerticalRule/>
                </>
              }
              {(scopes.length !== 0 || period !== 'NONE') &&
                <>
                  <Row>
                    <ColTitle>데이터 항목 (다중선택)</ColTitle>
                  </Row>
                  <Row>
                    <DefaultItemContainer>
                      {tokenResult.role !== 'NORMAL' &&
                        <>
                          <DefaultItemButton
                            active={includeItem('COUNT_BY_ADVERTISE')}
                            onClick={()=>handleAddReportsItem('COUNT_BY_ADVERTISE')}>광고주 수</DefaultItemButton>
                          <DefaultItemButton
                            active={includeItem('TOTAL_EXPOSURE_COUNT')}
                            onClick={()=>handleAddReportsItem('TOTAL_EXPOSURE_COUNT')}>총 노출수</DefaultItemButton>
                        </>

                      }
                      <DefaultItemButton
                        active={includeItem('EXPOSURE_COUNT')}
                        onClick={()=>handleAddReportsItem('EXPOSURE_COUNT')}>노출수</DefaultItemButton>
                      <DefaultItemButton
                        active={includeItem('TOTAL_CLICK_COUNT')}
                        onClick={()=>handleAddReportsItem('TOTAL_CLICK_COUNT')}>총 클릭수</DefaultItemButton>
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
                        onClick={()=>handleAddReportsItem('CONVERSION_PRICE')}>전환단가</DefaultItemButton>
                      <DefaultItemButton
                        active={includeItem('CONVERSION_COUNT')}
                        onClick={()=>handleAddReportsItem('CONVERSION_COUNT')}>전환수</DefaultItemButton>
                      <DefaultItemButton
                        active={includeItem('CONVERSION_RATE')}
                        onClick={()=>handleAddReportsItem('CONVERSION_RATE')}>전환율</DefaultItemButton>
                      <DefaultItemButton
                        active={includeItem('AMOUNT_PURCHASED_AVG')}
                        onClick={()=>handleAddReportsItem('AMOUNT_PURCHASED_AVG')}>평균구매액</DefaultItemButton>
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
                        onClick={()=>handleAddReportsItem('ROAS')}>총 ROAS</DefaultItemButton>
                      <DefaultItemButton
                        active={includeItem('E_CPM')}
                        onClick={()=>handleAddReportsItem('E_CPM')}>eCPM</DefaultItemButton>
                    </DefaultItemContainer>
                  </Row>
                </>
              }
            </RowSpan>
            }
          </ReportsItemContainer>
        </BoardSearchResult>
        <BoardSearchResult>
          <div style={{display:'flex'}}>
            <Span4>보고서 생성 결과</Span4>
            <small>* 현재 보고서에 생성된 데이터는 예시입니다.</small>
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
                    maxLength="13"
                    style={errors.reportName?.ref?.value === "" ? {border:"1px solid red"} : null}
                    placeholder={'보고서 명을 작성해주세요 (최대 13자)'}/>
                  {errors.reportName?.ref?.value === "" && <ValidationScript>{errors.reportName.message}</ValidationScript>}
                </div>
              </ColSpan2>
            </RowSpan>
            <RowSpan style={{marginTop: 25}}>
              <ColumnData>
                {defaultColumn.map((column, key) => {
                  if(column.visible) {
                    return <ColumnItems key={key}>{column.header}</ColumnItems>
                  }
                })}
              </ColumnData>
            </RowSpan>
          </RowSpan>
        </BoardSearchResult>
      </Board>
      <SubmitContainer>
        <SubmitButton type={'button'} onClick={handleCreateReports}>보고서 생성</SubmitButton>
      </SubmitContainer>
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
  font-size: 13px;
`
const DefaultItemButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 137px;
  height: 36px;
  background-color: #ffffff;
  border: 1px solid ${(props) => props.active ? '#f5811f' : '#e5e5e5'};
  color: ${(props) => props.active ? '#f5811f' : null};
  cursor: pointer;
  & p {
    padding: 0 20px
  }
`

const ColumnData = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  background-color: #fafafa;
`

const ColumnItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 100px;
  height: 42px;
  text-align: center;
  white-space: nowrap;
  border-right: 1px solid #e5e5e5;
  font-size: 13px;
`