import {
  Board,
  BoardHeader,
  BoardSearchDetail,
  BoardSearchResult,
  CancelButton,
  ColSpan2,
  ColSpan4,
  ColTitle,
  DefaultButton,
  Input,
  RelativeDiv,
  RowSpan,
  Span4,
  SubmitContainer
} from "../../assets/GlobalStyles";
import React, {useEffect, useState} from "react";
import {useAtom} from "jotai";
import {ToastContainer} from "react-toastify";
import {dateFormat} from "../../common/StringUtils";
import {useLocation, useNavigate} from "react-router-dom";
import {budgetTimes, budgetTimesDirect, timeBudgetDetailDataAtom} from "./entity/BudgetTime";
import DragToSelect from "../../components/common/DragToSelect";
import styled from "styled-components";
import InsertToSelect from "../../components/common/InsertToSelect";
import {resistBudgetTimes, selBudgetTimeDetailInfo, updateBudgetTimes} from "../../services/settings/BudgetTimeAxios";
import {ValidationScript} from "../signup/styles";
import {useForm} from "react-hook-form";

function BudgetTimeDetail() {
  const [timeBudgetDetailDataState, setTimeBudgetDetailDataState] = useAtom(timeBudgetDetailDataAtom)
  const navigate = useNavigate()
  const [saveType, setSaveType] = useState('update')
  const state = useLocation()
  const {register, handleSubmit, reset, formState: {errors}} = useForm({
    mode: "onSubmit",
    defaultValues: timeBudgetDetailDataState
  })
  const onError = (error) => console.log(error)
  const handleRadioSelect = (e) => {
    setTimeBudgetDetailDataState({
      ...timeBudgetDetailDataState,
      exposureTimeType: e.target.value,
      allowTimes: timeBudgetDetailDataState.exposureTimeType === 'DIRECT_SETTINGS' ? budgetTimesDirect: budgetTimes,
    })
  }
  useEffect(() => {
    const {id, groupId} = state.state
    if (state.state !== null && state.state.groupId !== undefined) {
      selBudgetTimeDetailInfo(id, groupId).then(response => {
        console.log(response)
        setTimeBudgetDetailDataState(response)
      })
      setSaveType('update')
    } else {
      setTimeBudgetDetailDataState({
        allowTimes: budgetTimes,
        exposureTimeType: 'EQUAL_DISTRIBUTION',
        groupName: '시간별 예산 그룹명',
        userId: id
      })
      setSaveType('resist')
    }
  }, [])
  const handleGroupName = (e) =>{
    setTimeBudgetDetailDataState({
      ...timeBudgetDetailDataState,
      groupName:e.target.value
    })
  }
  const onSaveBudgetTimes = () => {
    if(saveType === 'resist'){
      resistBudgetTimes(timeBudgetDetailDataState).then(response => {
        if (response) {
          navigate('/board/budgetTimeList', {state: {id: timeBudgetDetailDataState.userId}})
        }
      })
    }else{
      updateBudgetTimes(timeBudgetDetailDataState).then(response => {
        console.log(response)
        if (response) {
          navigate('/board/budgetTimeList', {state: {id: timeBudgetDetailDataState.userId}})
        }
      })
    }
  }
  return (
    <>
      <Board>
        <form onSubmit={handleSubmit(onSaveBudgetTimes, onError)}>
        <BoardHeader>시간별 예산 기본 정보</BoardHeader>
        <RowSpan style={{justifyContent: 'flex-end'}}>
          <div>
            <ColTitle>
              <span>최근 수정 : </span>
              <span>{dateFormat(timeBudgetDetailDataState !== null && timeBudgetDetailDataState.lastModifiedAt, 'YYYY.MM.DD HH:mm')}</span>
            </ColTitle>
          </div>
        </RowSpan>
        <BoardSearchDetail>
          <RowSpan box={true}>
            <ColSpan4>
              <Span4>시간별 예산 그룹명</Span4>
              {
                saveType === 'resist' ?
                  <Input style={{height: 38}}
                         type={'text'}
                         placeholder={'그룹명을 입력해주세요'}
                         {...register("groupName", {
                           required: "그룹명을 입력해주세요",
                           onChange: (e) => handleGroupName(e)
                         })}
                         value={timeBudgetDetailDataState?.groupName}
                  />
                :
                <Input readOnly value={timeBudgetDetailDataState !== null && timeBudgetDetailDataState.groupName}/>
              }
              {errors.groupName && <ValidationScript>{errors.groupName?.message}</ValidationScript>}
            </ColSpan4>
          </RowSpan>
          <RowSpan>
            <Span4><strong>예산 소진 설정</strong></Span4>
          </RowSpan>
          <RowSpan>
            <RelativeDiv>
              <label>
                <input
                  type={'radio'}
                  name={'exhaust'}
                  value={'EQUAL_DISTRIBUTION'}
                  checked={timeBudgetDetailDataState !== null && timeBudgetDetailDataState.exposureTimeType === 'EQUAL_DISTRIBUTION'}
                  onChange={handleRadioSelect}
                />
                <span>균등 소진</span>
              </label>
              <label>
                <input
                  type={'radio'}
                  name={'exhaust'}
                  value={'FAST_EXHAUSTION'}
                  checked={timeBudgetDetailDataState !== null && timeBudgetDetailDataState.exposureTimeType === 'FAST_EXHAUSTION'}
                  onChange={handleRadioSelect}
                />
                <span>빠른 소진</span>
              </label>
              <label>
                <input
                  type={'radio'}
                  name={'exhaust'}
                  value={'DIRECT_SETTINGS'}
                  checked={timeBudgetDetailDataState !== null && timeBudgetDetailDataState.exposureTimeType === 'DIRECT_SETTINGS'}
                  onChange={handleRadioSelect}
                />
                <span>직접 설정</span>
              </label>
            </RelativeDiv>
          </RowSpan>
        </BoardSearchDetail>
        {['EQUAL_DISTRIBUTION', 'FAST_EXHAUSTION'].includes(timeBudgetDetailDataState !== null && timeBudgetDetailDataState.exposureTimeType) &&
          <BoardSearchResult>
            <RowSpan>
              <div><strong>광고 노출 요일 및 시간 설정</strong></div>
            </RowSpan>
            <RowSpan>
              <RelativeDiv box={true} column={true}>
                <ColSpan4 style={{color: '#ccc', marginBottom: 10, justifyContent: 'space-between'}}>
                  <div>Drag & Drop으로 원하는 요일 및 시간을 설정하세요.</div>
                  <div style={{width: 'auto', minHeight: 24}}>
                    <SelectShape active={true}><span>노출</span></SelectShape>
                    <SelectShape><span>미노출</span></SelectShape>
                  </div>
                </ColSpan4>
                <DragToSelect reset={reset}/>
              </RelativeDiv>
            </RowSpan>
          </BoardSearchResult>
        }
        {timeBudgetDetailDataState !== null && timeBudgetDetailDataState.exposureTimeType === 'DIRECT_SETTINGS' &&
          <BoardSearchResult>
            <RowSpan>
              <div><strong>요일 및 시간별 예산 설정</strong></div>
            </RowSpan>
            <RowSpan>
              <RelativeDiv box={true} column={true}>
                <ColSpan4 style={{color: '#ccc', marginBottom: 10, justifyContent: 'space-between'}}>
                  <div style={{minHeight: 24}}>요일 및 시간별 예산을 % 단위로 설정해주세요</div>
                </ColSpan4>
                <InsertToSelect userId={'id'}/>
              </RelativeDiv>
            </RowSpan>
          </BoardSearchResult>
        }
        <SubmitContainer>
          <CancelButton onClick={() => navigate('/board/budgetTimeList', {state: {id: state.id}})}>목록</CancelButton>
          <DefaultButton type={'submit'}>저장</DefaultButton>
        </SubmitContainer>
        </form>
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
  )
}

export default BudgetTimeDetail

const SelectShape = styled.div`
  padding: 2px 10px;
  background-color: ${(props) => props.active ? '#4b85ff' : '#fff'};
  color: ${(props) => props.active ? '#fff' : '#222'};
  border: 1px solid ${(props) => props.active ? '#4b85ff' : '#e5e5e5'};
  border-radius: 3px;
  font-size: 12px;
`
