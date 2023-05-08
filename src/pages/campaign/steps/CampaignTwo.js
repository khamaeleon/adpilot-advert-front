import React, {useEffect, useState} from "react";
import {
  Board,
  BoardHeader,
  BoardSearchResult,
  CancelButton,
  ColSpan1,
  ColSpan4,
  ColTitle,
  Input,
  RelativeDiv,
  RowSpan,
  selectStyle,
  Span1,
  Span2,
  Span4,
  SubmitButton,
  SubmitContainer,
  ValidationScript
} from "../../../assets/GlobalStyles";
import {Won} from "../styles/common";
import Select from "react-select";
import {useAtom, useSetAtom} from "jotai";
import {stepCampaignAtom} from "../entity";
import {modalController} from "../../../store";
import {Controller, useFormContext} from "react-hook-form";
import TimeTable from "../../../components/modal/TimeTable";
import {biddingTypeAll, campaignBasicInfoAtom} from "../entity/Info";
import {selBudgetTimeDetailInfo, selBudgetTimeList} from "../../../services/settings/BudgetTimeAxios";
import {selBudgetEventList} from "../../../services/settings/BudgetEventAxios";
import {selPriceEventList} from "../../../services/settings/EventPriceAxios";
import {timeBudgetDetailDataAtom} from "../../settings/entity/BudgetTime";
import {selBudgetInfo, updateCampaignBudget} from "../../../services/campaign/BudgetAxios";
import {campaignBudgetInfoAtom} from "../entity/Budget";
import {useAtomValue} from "jotai/index";
import {useLocation, useNavigate} from "react-router-dom";

export function CampaignTwo() {
  const setStepCampaign = useSetAtom(stepCampaignAtom)
  const campaignBasicInfo = useAtomValue(campaignBasicInfoAtom)
  const [campaignBudgetInfo, setCampaignBudgetInfo] = useAtom(campaignBudgetInfoAtom)
  const [budgetTimeListState, setBudgetTimeListState] = useState(null)
  const [budgetEventListState, setBudgetEventListState] = useState(null)
  const [priceEventListState, setPriceEventListState] = useState(null)
  const [biddingType] = useState(biddingTypeAll)
  const [timeBudgetDetailDataState, setTimeBudgetDetailDataState] = useAtom(timeBudgetDetailDataAtom)
  const {state} =useLocation()
  const navigate = useNavigate()
  const {register, handleSubmit,reset,setError,setValue, control, formState: {errors}} = useFormContext()

  useEffect(() => {
    if (campaignBasicInfo.step !=='INIT' || state.campaignId !==undefined ) {
      //수정
      console.log(campaignBasicInfo)
      let campaignId = campaignBasicInfo.campaignId !== '' ? campaignBasicInfo.campaignId : state.campaignId
      selBudgetInfo(campaignId).then(response => {
        console.log(response)
        const data = response
        let budgetRate = {budgetRate : response.pcBudget * 100 / response.dailyAvgBudget}
        Object.assign(data,budgetRate)
        setCampaignBudgetInfo(data)
        reset(response)
      })
    }
    let userId = state.userId !== undefined ? state.userId : campaignBasicInfo.userId
    selBudgetTimeList(userId).then(response => {
      if (response) {
        setTimeBudgetDetailDataState(response)
        let budgetTimeList = []
        response.timeGroups.map(data => {
          budgetTimeList = [...budgetTimeList, {value: data.eventId, label: data.groupName}]
        })
        setBudgetTimeListState(budgetTimeList)
      }
    })
    selBudgetEventList(userId).then(response => {
      if (response) {
        let budgetEventList = []
        response.budgetEventDtos.map(data => {
          budgetEventList = [...budgetEventList, {value: data.eventId, label: data.groupName}]
        })
        setBudgetEventListState(budgetEventList)
      }
    })
    selPriceEventList(userId).then(response => {
      if (response) {
        let priceEventList = []
        response.priceEventDtos.map(data => {
          priceEventList = [...priceEventList, {value: data.eventId, label: data.groupName}]
        })
        setPriceEventListState(priceEventList)
      }
    })
  }, [])
  /**
   * 시간대별 예산 셀렉트
   * @param selectedBudgetTime
   */
  const handleChangeBudgetTimes = (selectedBudgetTime) => {
    setCampaignBudgetInfo({
      ...campaignBudgetInfo,
      budgetTimeId: selectedBudgetTime.value,
    })
    selBudgetTimeDetailInfo(campaignBasicInfo.userId, selectedBudgetTime.value).then(response => {
      console.log(response)
      setTimeBudgetDetailDataState(response)
    })
  }
  /**
   * 이벤트 단가 셀렉트
   * @param selectedPriceEvent
   */
  const handleChangePriceEvent = (selectedPriceEvent) => {
    setCampaignBudgetInfo({
      ...campaignBudgetInfo,
      priceEventId: selectedPriceEvent.value,
    })
  }
  /**
   * 이벤트 예산 셀렉트
   * @param selectedBudgetEvents
   */
  const handleChangeBudgetEvents = (selectedBudgetEvents) => {
    setCampaignBudgetInfo({
      ...campaignBudgetInfo,
      budgetEventId: selectedBudgetEvents.value,
    })
  }

  const handleBiddingType = (selectedBiddingType) => {
    setCampaignBudgetInfo({
      ...campaignBudgetInfo,
      biddingType: selectedBiddingType.value,
    })
  }


  const handleCheckInfiniteBudget = (e) => {
    setCampaignBudgetInfo({
      ...campaignBudgetInfo,
      infiniteBudget: e.target.checked
    })
  }

  const handleChangeDailyBudget = (event) => {
    setCampaignBudgetInfo({
      ...campaignBudgetInfo,
      dailyAvgBudget: parseInt(event.target.value),
      pcBudget: parseInt(event.target.value) - ((parseInt(event.target.value) * campaignBudgetInfo.budgetRate) / 100),
      mobBudget: (parseInt(event.target.value) * campaignBudgetInfo.budgetRate) / 100,
      budgetRate: (campaignBudgetInfo.pcBudget / parseInt(event.target.value)) * 1000
    })
  }

  const handleChangePcBudget = (event) => {
    if(event.target.value <= campaignBudgetInfo.dailyAvgBudget) {
      setCampaignBudgetInfo({
        ...campaignBudgetInfo,
        pcBudget: parseInt(event.target.value),
        mobBudget: campaignBudgetInfo.dailyAvgBudget - parseInt(event.target.value),
        budgetRate: parseInt(event.target.value) * 100 / campaignBudgetInfo.dailyAvgBudget
      })
    }
  }

  const handleChangeMobileBudget = (event) => {
    if(event.target.value <= campaignBudgetInfo.dailyAvgBudget){
      setCampaignBudgetInfo({
        ...campaignBudgetInfo,
        mobBudget: parseInt(event.target.value),
        pcBudget: campaignBudgetInfo.dailyAvgBudget - parseInt(event.target.value),
        budgetRate: parseInt(event.target.value) * 100 / campaignBudgetInfo.dailyAvgBudget
      })
    }
  }
  const handleChangeInputRange = (e) => {
    setCampaignBudgetInfo({
      ...campaignBudgetInfo,
      budgetRate: parseInt(e.target.value),
      pcBudget: campaignBudgetInfo.dailyAvgBudget - ((campaignBudgetInfo.dailyAvgBudget * e.target.value) / 100),
      mobBudget: (campaignBudgetInfo.dailyAvgBudget * e.target.value) / 100
    })
  }

  const handleChangeMaxBid = (e) => {
    setCampaignBudgetInfo({
      ...campaignBudgetInfo,
      maxBiddingPrice: parseInt(e.target.value)
    })
  }
  const onSubmit = (data) => {
    console.log(campaignBudgetInfo)
    let campaignId = campaignBasicInfo.campaignId !== '' ? campaignBasicInfo.campaignId : state.campaignId
    updateCampaignBudget({
      ...campaignBudgetInfo,
      campaignId: campaignId
    }).then(response => {
      if (response) {
        console.log('2차저장')
        state.userId !== undefined ? navigate('/board/dashboard') : setStepCampaign({steps: 2})
      }
    })

  }
  return (
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
                  <Controller
                    name="dailyAvgBudget"
                    control={control}
                    rules={{
                      required: {
                        value: campaignBudgetInfo !== null && campaignBudgetInfo.dailyAvgBudget === 0,
                        message: '일일 평균 예산을 설정해주세요.'
                      }
                    }}
                    render={({field}) => (
                      <Input type={'number'}
                             min={100}
                             readOnly={campaignBudgetInfo.infiniteBudget}
                             placeholder={'일일 평균 예산을 설정해주세요.'}
                             style={{color:'#f5811f'}}
                             value={campaignBudgetInfo.dailyAvgBudget}
                             onChange={(e) => handleChangeDailyBudget(e)}
                      />)}
                  />
                  <Won/>
                </ColSpan1>
                <ColSpan1>
                  <label>
                    <input type={'checkbox'} value={campaignBudgetInfo.infiniteBudget || ''} checked={campaignBudgetInfo.infiniteBudget} className={'checkbox-type-a'} onChange={handleCheckInfiniteBudget}/>
                    <i/>
                    {/*배너일때 infiniteBudget 항목 없음*/}
                    <span>일일 예산 무제한</span>
                  </label>
                </ColSpan1>
                <ColSpan1> {errors.dailyAvgBudget &&
                  <ValidationScript>{errors.dailyAvgBudget.message}</ValidationScript>}</ColSpan1>
              </RelativeDiv>
            </ColSpan4>
            <ColSpan4>
              <Span4>예산 비율</Span4>
              <RelativeDiv>
                <ColSpan1>
                  <Span1>PC</Span1>
                  <Input type={'number'}
                         min={100}
                         style={{color:'#f5811f'}}
                         value={campaignBudgetInfo !== null && campaignBudgetInfo.pcBudget}
                         onChange={(e) => handleChangePcBudget(e)}
                  />
                  <Won/>
                </ColSpan1>
                <ColSpan1>
                  <input
                    type="range"
                    value={campaignBudgetInfo.budgetRate !== undefined ? campaignBudgetInfo.budgetRate : 50}
                    onChange={handleChangeInputRange}
                    style={{
                      background: `linear-gradient(to right, #f5811f 0%, #f5811f ${campaignBudgetInfo.budgetRate !==undefined ? campaignBudgetInfo.budgetRate: 50}%, #ddd ${campaignBudgetInfo.budgetRate !==undefined ? campaignBudgetInfo.budgetRate: 50}%, #ddd 100%)`
                    }}
                  />
                  <Span1>{campaignBudgetInfo.dailyAvgBudget !==0 ? Math.round(campaignBudgetInfo.pcBudget/ campaignBudgetInfo.dailyAvgBudget * 100) : 50}:{campaignBudgetInfo.dailyAvgBudget !==0 ? Math.round(campaignBudgetInfo.mobBudget /campaignBudgetInfo.dailyAvgBudget * 100) :50}</Span1>
                </ColSpan1>
                <ColSpan1>
                  <ColTitle><Span1>MOBILE</Span1></ColTitle>
                  <Input type={'number'}
                         min={100}
                         style={{color:'#f5811f'}}
                         value={campaignBudgetInfo !== null && campaignBudgetInfo.mobBudget}
                         onChange={(e) => handleChangeMobileBudget(e)}
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
                    name="budgetTimeId"
                    control={control}
                    rules={{
                      required: {
                        value: campaignBudgetInfo?.budgetTimeId === '',
                        message: "시간대 예산을 선택해주세요"
                      }
                    }}
                    render={({field}) => (
                      <Select options={budgetTimeListState !== null ? budgetTimeListState : []}
                              placeholder={'시간대 예산 선택'}
                              {...field}
                              value={budgetTimeListState !==null && budgetTimeListState.find(value => value.value === campaignBudgetInfo?.budgetTimeId)}
                              onChange={handleChangeBudgetTimes}
                              styles={selectStyle}
                      />
                    )}
                  />
                </ColSpan1>
                {timeBudgetDetailDataState?.exposeTimeType !== undefined &&
                  <ColSpan1>
                    <TimeTable
                      exposeTimeType={timeBudgetDetailDataState !== null && timeBudgetDetailDataState.exposeTimeType}
                      title={'설정된 시간별 예산'} readOnly={true}/>
                  </ColSpan1>
                }
                {errors.budgetTimeId &&
                  <ColSpan1><ValidationScript>{errors.budgetTimeId.message}</ValidationScript></ColSpan1>}
              </RelativeDiv>
            </ColSpan4>
            <ColSpan4>
              <Span4>이벤트 예산 그룹</Span4>
              <RelativeDiv>
                <ColSpan1>
                  <Controller
                    name="budgetEventId"
                    control={control}
                    rules={{
                      required: {
                        value: campaignBudgetInfo?.budgetEventId === '',
                        message: "이벤트 예산을 선택해주세요"
                      }
                    }}
                    render={({field}) => (
                      <Select options={budgetEventListState !== null ? budgetEventListState : []}
                              placeholder={'이벤트 예산 선택'}
                              {...field}
                              value={budgetEventListState !==null && budgetEventListState.find(value => value.value === campaignBudgetInfo?.budgetEventId)}
                              onChange={handleChangeBudgetEvents}
                              styles={selectStyle}
                      />
                    )}
                  />
                </ColSpan1>
                {errors.budgetEventId &&
                  <ColSpan1><ValidationScript>{errors.budgetEventId.message}</ValidationScript></ColSpan1>}
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
                  <Select styles={selectStyle}
                          components={{IndicatorSeparator: () => null}}
                          options={biddingType}
                          value={biddingType.find(value => value.value === campaignBudgetInfo?.biddingType)}
                          onChange={handleBiddingType}
                  />
                </ColSpan1>
              </RelativeDiv>
            </ColSpan4>
            <ColSpan4>
              <Span4>최대 입찰가</Span4>
              <RelativeDiv>
                <ColSpan1>
                  <Controller
                    name="maxBiddingPrice"
                    control={control}
                    rules={{
                      required: {
                        value:campaignBudgetInfo !== null && campaignBudgetInfo.maxBiddingPrice === 0,
                        message: '최대 입찰가를 설정해주세요'
                      }
                    }}
                    render={({ field }) =>(
                      <Input type={'number'}
                             min={0}
                             placeholder={'최대 입찰가를 설정해주세요'}
                             style={{color:'#f5811f'}}
                             value={campaignBudgetInfo !== null && campaignBudgetInfo.maxBiddingPrice}
                             onChange={(e)=>handleChangeMaxBid(e)}
                      /> )}
                  />
                  <Won/>
                </ColSpan1>
                {errors.maxBiddingPrice &&
                  <ColSpan1><ValidationScript>{errors.maxBiddingPrice.message}</ValidationScript></ColSpan1>}
              </RelativeDiv>
            </ColSpan4>
            <ColSpan4>
              <Span4>이벤트 단가 그룹</Span4>
              <RelativeDiv>
                <ColSpan1>
                  <Controller
                    name="priceEventId"
                    control={control}
                    rules={{
                      required: {
                        value: campaignBudgetInfo?.priceEventId === '',
                        message: "이벤트 단가를 선택해주세요"
                      }
                    }}
                    render={({field}) => (
                      <Select options={priceEventListState !== null ? priceEventListState : []}
                              placeholder={'이벤트 단가 선택'}
                              {...field}
                              value={priceEventListState !==null && priceEventListState.find(value => value.value === campaignBudgetInfo?.priceEventId)}
                              onChange={handleChangePriceEvent}
                              styles={selectStyle}
                      />
                    )}
                  />
                </ColSpan1>
                {errors.priceEventId &&
                  <ColSpan1><ValidationScript>{errors.priceEventId.message}</ValidationScript></ColSpan1>}
              </RelativeDiv>
            </ColSpan4>
          </RowSpan>
        </BoardSearchResult>
      </Board>
      <SubmitContainer>
        <CancelButton type={'button'} onClick={() => state.campaignId !== '' ? navigate('/board/dashboard') : setStepCampaign({steps: 0})}>취소</CancelButton>
        <SubmitButton type={'submit'}>{state.campaignId !== '' ? '수정' : '다음[2/4]'}</SubmitButton>
      </SubmitContainer>
    </form>
  )
}