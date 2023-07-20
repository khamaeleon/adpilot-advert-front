import {
  Board,
  BoardHeader,
  BoardSearchDetail,
  BoardSearchResult,
  CancelButton,
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
import {toast, ToastContainer} from "react-toastify";
import {dateFormat, multiAxiosCall} from "../../common/StringUtils";
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
  const [checkIndex, setCheckIndex] = useState(null)
  const {state} = useLocation()
  const {register, handleSubmit, reset, formState: {errors}} = useForm({
    mode: "onSubmit",
    defaultValues: timeBudgetDetailDataState
  })
  const onError = (error) => console.log(error)
  const handleRadioSelect = (e) => {
    setTimeBudgetDetailDataState({
      ...timeBudgetDetailDataState,
      exposureTimeType: e.target.value,
      allowTimes: e.target.value === 'DIRECT_SETTINGS' ? budgetTimesDirect: budgetTimes,
    })
    setCheckIndex(null)
  }
  useEffect(() => {
    const {id, groupId, listCount} = state
    if (state !== null && groupId !== undefined) {
      selBudgetTimeDetailInfo(id, groupId).then(response => {
        if(response != null) setTimeBudgetDetailDataState(response)
      })
      setSaveType('update')
    } else {
      setTimeBudgetDetailDataState({
        allowTimes: budgetTimes,
        exposureTimeType: 'EQUAL_DISTRIBUTION',
        groupName: '시간별 예산 그룹명' + (listCount+1),
        userId: id
      })
      setSaveType('resist')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const handleGroupName = (e) =>{
    setTimeBudgetDetailDataState({
      ...timeBudgetDetailDataState,
      groupName:e.target.value
    })
  }
  const onSaveBudgetTimes = (e) => {
    setCheckIndex(null)

    let isTimePerOver = false;
    let isTimePerZero = false;
    let isTimeNull= false;
    if(timeBudgetDetailDataState.exposureTimeType === 'DIRECT_SETTINGS'){
      let weekSumArr = timeBudgetDetailDataState.allowTimes.map((rowData,i)=>{
        let rowSum = rowData.map(d=>parseInt(d)).reduce((a,b)=>{return a+b;});
        if(0 < rowSum && 100 !== rowSum){
          isTimePerOver = true;
          setCheckIndex(i);
        }
        return rowSum;
      })
      isTimePerZero = (weekSumArr.reduce((a,b)=>{return a+b;}) === 0);
    }else {
      isTimeNull = timeBudgetDetailDataState.allowTimes.map((rowData)=>{
        return rowData.filter(data=> data===true).length !==0
      }).includes(true)
    }


    if(isTimePerOver) {
      const a = toast.warning('[해당 요일]의 \n시간별 예산 설정을 확인해주세요.');
    }else if(isTimePerZero || !isTimeNull){
      toast.warning('값이 입력되지 않았습니다. 시간별 예산 설정을 확인해주세요.')
    }else {
      const callbackFun = (response) => {
        if (response[0]) {
          toast.success(saveType === 'resist' ? "저장 되었습니다." : "수정 되었습니다.",{autoClose:100, delay:0, onClose:()=>
              navigate('/board/budgetTimeList', {state: {id: timeBudgetDetailDataState.userId}})
          })
        }
      }
      multiAxiosCall([saveType === 'resist' ? resistBudgetTimes(timeBudgetDetailDataState) : updateBudgetTimes(timeBudgetDetailDataState)], callbackFun)
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
                {saveType !== 'resist' &&
                    <>
                      <span>최근 수정 : </span>
                      <span>{dateFormat(timeBudgetDetailDataState !== null
                          && timeBudgetDetailDataState.lastModifiedAt,
                          'YYYY.MM.DD HH:mm')}</span>
                    </>
                }
              </ColTitle>
            </div>
          </RowSpan>
          <BoardSearchDetail>
            <RowSpan box={true}>
              <ColSpan4 style={{padding: 0}}>
                <ColTitle style={{padding: 0}}>시간별 예산 그룹명</ColTitle>
                  <Input style={{height: 38, width: 350}}
                         type={'text'}
                         // readOnly={saveType !== 'resist'}
                         placeholder={'그룹명을 입력해주세요'}
                         {...register("groupName", {
                           required: "그룹명을 입력해주세요",
                           onChange: (e) => handleGroupName(e),
                           // disabled: saveType !== 'resist'
                         })}
                         value={timeBudgetDetailDataState?.groupName}
                  />
                {errors.groupName && <Span4><ValidationScript>{errors.groupName?.message}</ValidationScript></Span4>}
              </ColSpan4>
            </RowSpan>
            <RowSpan style={{alignItems: 'center', marginLeft: 20}}>
              <Span4><strong>예산 소진 설정</strong></Span4>
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
                  <InsertToSelect checkWeek={checkIndex}/>
                </RelativeDiv>
              </RowSpan>
            </BoardSearchResult>
          }
          <SubmitContainer>
            <CancelButton type={'button'} onClick={() => navigate('/board/budgetTimeList', {state: {id: state.id}})}>목록</CancelButton>
            <DefaultButton type={'submit'}>{saveType !== 'resist' ? '수정' : '저장'}</DefaultButton>
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
