import React, {useState} from "react";
import {
  Board,
  BoardHeader,
  BoardSearchResult, CancelButton, ColSpan1, ColSpan2,
  ColSpan4, Input,
  RelativeDiv,
  RowSpan, selectStyle, Span1, Span2,
  Span4, SubmitButton, SubmitContainer, ValidationScript
} from "../../../assets/GlobalStyles";
import {Won} from "../styles/common";
import Select from "react-select";
import {useAtom, useSetAtom} from "jotai";
import {stepCampaignAtom} from "../entity";
import {modalController} from "../../../store";
import {Controller, useFormContext} from "react-hook-form";
import TimeTable from "../../../components/modal/TimeTable";

export function CampaignTwo() {
  const [stepCampaign, setStepCampaign] = useAtom(stepCampaignAtom)
  const setModal = useSetAtom(modalController)
  const {register,handleSubmit ,control, formState:{errors}} = useFormContext()
  const [stepTwo, setStepTwo] = useState({
    dailyBudget: 1000,
    infiniteBudget: false,
    budgetRate: 50,
    timeGroup: "",
    eventGroup: "",
    bidingType: "",
    maxBid: '',
    eventUnitPrice: "",
    weightGroup: ""
  })

  const handleCheckInfiniteBudget = (e) => {
    setStepTwo({
      ...stepTwo,
      infiniteBudget: e.target.checked
    })
  }

  const handleChangeDailyBudget = (e) => {
    setStepTwo({
      ...stepTwo,
      dailyBudget: e.target.value
    })
  }

  const handleChangeInputRange = (e) => {
    setStepTwo({
      ...stepTwo,
      budgetRate: e.target.value
    })
  }

  const handleChangeMaxBid = (e) => {
    setStepTwo({
      ...stepTwo,
      maxBid: e.target.value
    })
  }
  const onSubmit = (data) => {
    console.log(data)
    setStepCampaign({steps:2})
  }
  return(
    <form onSubmit={handleSubmit(onSubmit)}>
      <Board>
        <BoardHeader>예산 및 입찰 설정</BoardHeader>
        <BoardSearchResult>
          <RowSpan>
            <Span4>예산설정</Span4>
          </RowSpan>
          <RowSpan box={true} column={true}>
            <ColSpan4>
              <Span4>일일 평균 예산</Span4>
              <RelativeDiv>
                <ColSpan1>
                  <Input
                    readOnly={stepTwo.infiniteBudget}
                    value={stepTwo.dailyBudget || 0}
                    {...register('dailyBudget',{
                    required: {
                      value: stepTwo.dailyBudget === '',
                      message: '일일 평균 예산을 설정해주세요.'
                    },
                    onChange: handleChangeDailyBudget
                  })}/>
                  <Won/>
                </ColSpan1>
                <ColSpan1>
                  <label>
                    <input type={'checkbox'} className={'checkbox-type-a'} onChange={handleCheckInfiniteBudget}/>
                    <i/>
                    <span>일일 예산 무제한</span>
                  </label>
                </ColSpan1>
                <ColSpan1> {errors.dailyBudget && <ValidationScript>{errors.dailyBudget.message}</ValidationScript>}</ColSpan1>
              </RelativeDiv>
            </ColSpan4>
            <ColSpan4>
              <Span4>예산 비율</Span4>
              <RelativeDiv>
                <ColSpan1>
                  <Span1>PC</Span1>
                  <Input
                    value={stepTwo.dailyBudget-((stepTwo.dailyBudget*stepTwo.budgetRate)/100)}
                  />
                  <Won/>
                </ColSpan1>
                <ColSpan1>
                  <input
                    type="range"
                    value={stepTwo.budgetRate}
                    onChange={handleChangeInputRange}
                    style={{
                      background: `linear-gradient(to right, #f5811f 0%, #f5811f ${stepTwo.budgetRate}%, #ddd ${stepTwo.budgetRate}%, #ddd 100%)`
                    }}
                  />
                  <Span1>{100-stepTwo.budgetRate}:{stepTwo.budgetRate}</Span1>
                </ColSpan1>
                <ColSpan1>
                  <Span2>MOBILE</Span2>
                  <Input
                    value={(stepTwo.dailyBudget*stepTwo.budgetRate)/100}
                  />
                  <Won/>
                </ColSpan1>
              </RelativeDiv>
            </ColSpan4>
            <ColSpan4>
              <Span4>시간별 예산 그룹</Span4>
              <RelativeDiv>
                <ColSpan1>
                  <Controller
                    control={control}
                    name='timeGroup'
                    rules={{
                      required: {
                        value: stepTwo.timeGroup === "",
                        message: "캠페인 상세 목표를 설정해주세요"
                      }
                    }}
                    render={({field}) => (
                      <Select
                        styles={selectStyle}
                        {...field}
                        options={[{key:1,value:1,label:'00:00 ~ 03:59'}]}/>
                    )}
                    />
                </ColSpan1>
                {stepTwo.timeGroup.value !== "" &&
                  <ColSpan1>
                    <TimeTable title={'설정된 시간별 예산'} readOnly={true}/>
                  </ColSpan1>
                }
                {errors.timeGroup && <ColSpan1><ValidationScript>{errors.timeGroup.message}</ValidationScript></ColSpan1>}
              </RelativeDiv>
            </ColSpan4>
            <ColSpan4>
              <Span4>이벤트 예산 그룹</Span4>
              <RelativeDiv>
                <ColSpan1>
                  <Controller
                    control={control}
                    name='eventGroup'
                    rules={{
                      required: {
                        value: stepTwo.eventGroup === "",
                        message: "캠페인 상세 목표를 설정해주세요"
                      }
                    }}
                    render={({field}) => (
                      <Select
                        styles={selectStyle}
                        {...field}
                        options={[{key:1,value:1,label:'쇼퍼 맞춤'}]}/>
                    )}
                  />
                </ColSpan1>
                {errors.eventGroup && <ColSpan1><ValidationScript>{errors.eventGroup.message}</ValidationScript></ColSpan1>}
              </RelativeDiv>
            </ColSpan4>
          </RowSpan>
          <RowSpan>
            <Span4>과금 설정</Span4>
          </RowSpan>
          <RowSpan box={true} column={true}>
            <ColSpan4>
              <Span4>입찰 방식</Span4>
              <RelativeDiv>
                <ColSpan1>
                  <Controller
                    control={control}
                    name='bidingType'
                    rules={{
                      required: {
                        value: stepTwo.bidingType === "",
                        message: "캠페인 상세 목표를 설정해주세요"
                      }
                    }}
                    render={({field}) => (
                      <Select
                        styles={selectStyle}
                        {...field}
                        options={[{key:1,value:'',label:'입찰 방식 선택'}]}/>
                    )}
                  />
                </ColSpan1>
                {errors.bidingType && <ColSpan1><ValidationScript>{errors.bidingType.message}</ValidationScript></ColSpan1>}
              </RelativeDiv>
            </ColSpan4>
            <ColSpan4>
              <Span4>최대 입찰가</Span4>
              <RelativeDiv>
                <ColSpan1>
                  <Input
                    {...register('maxBid',{
                      required:{
                        value: stepTwo.maxBid === '',
                        message: "최대 입찰가를 설정해주세요"
                      },
                      onChange: handleChangeMaxBid
                    })}
                  />
                  <Won/>
                </ColSpan1>
                {errors.maxBid && <ColSpan1><ValidationScript>{errors.maxBid.message}</ValidationScript></ColSpan1>}
              </RelativeDiv>
            </ColSpan4>
            <ColSpan4>
              <Span4>이벤트 단가 그룹</Span4>
              <RelativeDiv>
                <ColSpan1>
                  <Controller
                    control={control}
                    name='eventUnitPrice'
                    rules={{
                      required: {
                        value: stepTwo.eventUnitPrice === "",
                        message: "캠페인 상세 목표를 설정해주세요"
                      }
                    }}
                    render={({field}) => (
                      <Select
                        styles={selectStyle}
                        {...field}
                        options={[{key:1,value:'',label:'입찰 방식 선택'}]}/>
                    )}
                  />
                </ColSpan1>
                {errors.eventUnitPrice && <ColSpan1><ValidationScript>{errors.eventUnitPrice.message}</ValidationScript></ColSpan1>}
              </RelativeDiv>
            </ColSpan4>
            <ColSpan4>
              <Span4>모수 가중치 그룹</Span4>
              <RelativeDiv>
                <ColSpan1>
                  <Controller
                    control={control}
                    name='weightGroup'
                    rules={{
                      required: {
                        value: stepTwo.weightGroup === "",
                        message: "캠페인 상세 목표를 설정해주세요"
                      }
                    }}
                    render={({field}) => (
                      <Select
                        styles={selectStyle}
                        {...field}
                        options={[{key:1,value:'',label:'모수 가중치'}]}/>
                    )}
                  />
                </ColSpan1>
                {errors.weightGroup && <ColSpan1><ValidationScript>{errors.weightGroup.message}</ValidationScript></ColSpan1>}
              </RelativeDiv>
            </ColSpan4>
          </RowSpan>
        </BoardSearchResult>
      </Board>
      <SubmitContainer>
        <CancelButton type={'button'} onClick={()=>setStepCampaign({steps:0})}>취소</CancelButton>
        <SubmitButton type={'submit'}>다음[2/4]</SubmitButton>
      </SubmitContainer>
    </form>
  )
}