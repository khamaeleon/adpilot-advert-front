import React, {useEffect, useState} from "react";
import {
  Board,
  BoardHeader,
  BoardSearchResult,
  CancelButton, ColSpan0,
  ColSpan1,
  ColSpan4,
  ColTitle,
  Input, InputLabel,
  RelativeDiv,
  RowSpan,
  selectStyle,
  Span1,
  Span4,
  SubmitButton,
  SubmitContainer,
  ValidationScript
} from "../../../assets/GlobalStyles";
import {AdverInfo, Won} from "../styles/common";
import Select from "react-select";
import {useAtom, useSetAtom} from "jotai";
import {stepCampaignAtom} from "../entity";
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
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useResetAtom} from "jotai/utils";
import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import {decimalFormat, multiAxiosCall, removeStr} from "../../../common/StringUtils";

export function CampaignTwo() {
  const setStepCampaign = useSetAtom(stepCampaignAtom)
  const [campaignBasicInfo, setCampaignBasicInfo] = useAtom(campaignBasicInfoAtom)
  const [campaignBudgetInfo, setCampaignBudgetInfo] = useAtom(campaignBudgetInfoAtom)
  const [budgetRateChk, setBudgetRateChk] = useState(false)
  const [budgetTimeListState, setBudgetTimeListState] = useState(null)
  const [budgetEventListState, setBudgetEventListState] = useState(null)
  const [priceEventListState, setPriceEventListState] = useState(null)
  const [biddingType] = useState(biddingTypeAll)
  const [timeBudgetDetailDataState, setTimeBudgetDetailDataState] = useAtom(timeBudgetDetailDataAtom)
  const {state} =useLocation()
  const navigate = useNavigate()
  const resetInfo = useResetAtom(campaignBudgetInfoAtom)
  const {register, handleSubmit,reset,setError,setValue, control, formState: {errors}, clearErrors} = useFormContext()

  useEffect(()=>{
      resetInfo()
  },[])

  useEffect(() => {
    if (state !== null || ['STEP2_BUDGET','STEP3_INVENTORY','STEP4_CREATIVE','COMPLETED'].includes(campaignBasicInfo.step)) {
      //수정
      let campaignId = (state !== null ? state.campaignId : campaignBasicInfo.campaignId);

      selBudgetInfo(campaignId).then(response => {
        const data = response;
        let budgetRate = {budgetRate : Math.round(response.dailyAvgBudget != 0 ? (response.pcBudget * 100 / response.dailyAvgBudget): 50)}
        Object.assign(data,budgetRate);
        // 수정에서 기존 예산비율 한쪽이 0에서 올라갈 경우 true, 수정 버튼 클릭시 알럿창 호출
        (response.pcBudget === 0 || response.mobBudget === 0) && setBudgetRateChk(true)
        setCampaignBudgetInfo(data);
        selBudgetTimeDetailInfo(userId, data.budgetTimeId).then(response => {
          setTimeBudgetDetailDataState(response);
        })
        reset(response);
      })
    }

    let userId = state !== null ? state.userId : campaignBasicInfo?.userId;

    const callbackFunc = (response) => {
      setBudgetTimeListState(response[0]?.timeGroups.map(data => {return {value: data.id, label: data.groupName}}))
      setBudgetEventListState(response[1]?.targetingBudgetDtos.map(data => {return {value: data.targetingBudgetId, label: data.groupName}}))
      setPriceEventListState(response[2]?.targetingPriceDtos.map(data => {return {value: data.targetingPriceId, label: data.groupName}}))
    }
    multiAxiosCall([selBudgetTimeList(userId), selBudgetEventList(userId), selPriceEventList(userId)], callbackFunc)


  }, [state])
  /**
   * 시간대별 예산 셀렉트
   * @param selectedBudgetTime
   */
  const handleChangeBudgetTimes = (selectedBudgetTime) => {
    setCampaignBudgetInfo({
      ...campaignBudgetInfo,
      budgetTimeId: selectedBudgetTime.value,
    })
    let userId = state !== null ? state.userId : campaignBasicInfo.userId
    selBudgetTimeDetailInfo(userId, selectedBudgetTime.value).then(response => {
      setTimeBudgetDetailDataState(response)
    })

    clearErrors('budgetTimeId')
  }
  /**
   * 이벤트 단가 셀렉트
   * @param selectedPriceEvent
   */
  const handleChangePriceEvent = (selectedPriceEvent) => {
    setCampaignBudgetInfo({
      ...campaignBudgetInfo,
      targetingPriceId: selectedPriceEvent.value,
    })
    clearErrors('targetingPriceId')
  }
  /**
   * 이벤트 예산 셀렉트
   * @param selectedBudgetEvents
   */
  const handleChangeBudgetEvents = (selectedBudgetEvents) => {
    setCampaignBudgetInfo({
      ...campaignBudgetInfo,
      targetingBudgetId: selectedBudgetEvents.value,
    })
    clearErrors('targetingBudgetId')
  }

  const handleBiddingType = (selectedBiddingType) => {
    setCampaignBudgetInfo({
      ...campaignBudgetInfo,
      biddingType: selectedBiddingType.value,
    })
  }


  const handleCheckInfiniteBudget = (e) => {
    let value = e.target.checked ? 'Y' : 'N'
    clearErrors('dailyAvgBudget')
    setCampaignBudgetInfo({
      ...campaignBudgetInfo,
      infiniteBudgetYn: value
    })
  }

  const handleChangeDailyBudget = (value) => {
    let num = removeStr(value)
    let dailyBudget = num !== '' ? parseInt(num) : 0

    const prevBudgetRate = campaignBudgetInfo.budgetRate != 0 ? campaignBudgetInfo.budgetRate : 50;
    clearErrors('dailyAvgBudget')
    setCampaignBudgetInfo({
      ...campaignBudgetInfo,
      dailyAvgBudget: dailyBudget,
      pcBudget: dailyBudget * prevBudgetRate / 100,
      mobBudget: dailyBudget * (100-prevBudgetRate) / 100,
      budgetRate: prevBudgetRate
    })

  }

  const handleChangePcBudget = (value) => {
    let num = removeStr(value)
    let puBudget = value !== '' ? parseInt(num) : 0

    if (campaignBudgetInfo.dailyAvgBudget < 100 || campaignBudgetInfo.dailyAvgBudget.toString().slice(-2) !== '00') {
      setError('dailyAvgBudget', {type: 'required', message: '일일 평균 예산을 최소 100원 단위로 설정해주세요.'})
    } else if(puBudget <= campaignBudgetInfo.dailyAvgBudget) {
      setCampaignBudgetInfo({
        ...campaignBudgetInfo,
        pcBudget: puBudget,
        mobBudget: campaignBudgetInfo.dailyAvgBudget - puBudget,
        budgetRate: campaignBudgetInfo.dailyAvgBudget != 0 ? Math.round(puBudget * 100 / campaignBudgetInfo.dailyAvgBudget) : 50
      })
    }
  }

  const handleChangeMobileBudget = (value) => {
    let num = removeStr(value)
    let mobBudget = value !== '' ? parseInt(num) : 0

    if (campaignBudgetInfo.dailyAvgBudget < 100 || campaignBudgetInfo.dailyAvgBudget.toString().slice(-2) !== '00') {
      setError('dailyAvgBudget', {type: 'required', message: '일일 평균 예산을 최소 100원 단위로 설정해주세요.'})
    } else if(mobBudget <= campaignBudgetInfo.dailyAvgBudget ){
      setCampaignBudgetInfo({
        ...campaignBudgetInfo,
        mobBudget: mobBudget,
        pcBudget: campaignBudgetInfo.dailyAvgBudget - mobBudget,
        budgetRate: campaignBudgetInfo.dailyAvgBudget != 0 ? Math.round(mobBudget * 100 / campaignBudgetInfo.dailyAvgBudget) : 50
      })
    }
  }
  const handleChangeInputRange = (e) => {
    if(campaignBudgetInfo.infiniteBudgetYn !== 'Y') {
      if (campaignBudgetInfo.dailyAvgBudget < 100 || campaignBudgetInfo.dailyAvgBudget.toString().slice(-2) !== '00') {
        setError('dailyAvgBudget', {type: 'required', message: '일일 평균 예산을 최소 100원 단위로 설정해주세요.'})
      } else {
        setCampaignBudgetInfo({
          ...campaignBudgetInfo,
          budgetRate: parseInt(e.target.value),
          mobBudget: campaignBudgetInfo.dailyAvgBudget - ((campaignBudgetInfo.dailyAvgBudget * e.target.value) / 100),
          pcBudget: (campaignBudgetInfo.dailyAvgBudget * e.target.value) / 100
        })
      }
    }
  }

  const handleChangeMaxBid = (value) => {
    let num = removeStr(value)
    let maxBiddingPrice = value !== '' ? parseInt(num) : 0
    clearErrors('maxBiddingPrice')
    setCampaignBudgetInfo({
      ...campaignBudgetInfo,
      maxBiddingPrice: maxBiddingPrice
    })
  }
  const onSubmit = () => {
    if (campaignBudgetInfo.maxBiddingPrice < 1) {
      setError('maxBiddingPrice', {type: 'required', message: '최대 입찰가를 입력해주세요'})
    } else if(campaignBudgetInfo.infiniteBudgetYn !== 'Y' && (campaignBudgetInfo.dailyAvgBudget < 100 || campaignBudgetInfo.dailyAvgBudget.toString().slice(-2) !== '00')) {
      setError('dailyAvgBudget', {type: 'required', message: '일일 평균 예산을 최소 100원 단위로 설정해주세요.'})
    } else {
      let campaignId = state !== null ? state.campaignId : campaignBasicInfo.campaignId
      updateCampaignBudget({
        ...campaignBudgetInfo,
        campaignId: campaignId
      }).then(response => {
        if (response) {
          if (state !== null) {
            if(campaignBudgetInfo.infiniteBudgetYn !== 'Y' && (campaignBudgetInfo.pcBudget === 0 || campaignBudgetInfo.mobBudget === 0 || budgetRateChk)) {
              confirmAlert({
                title: '수정되었습니다',
                message: '예산 비율 설정에 따라 광고 그룹 및 크리에이티브 정보를 확인해주세요.',
                buttons: [
                  {
                    label: '확인',
                    onClick: () => {
                      navigate('/board/dashboard')
                      resetInfo()
                    }
                  }
                ]
              });
            } else {
              toast.success("수정되었습니다.",{autoClose:100, delay:0})
              toast.onChange(payload => {
                if (payload.status === "removed" && payload.type !== toast.TYPE.ERROR) {
                  navigate('/board/dashboard')
                  resetInfo()
                }
              })
            }
          } else {
            if(!['STEP2_BUDGET','STEP3_INVENTORY','STEP4_CREATIVE','COMPLETED'].includes(campaignBasicInfo.step)){
              setCampaignBasicInfo({
                ...campaignBasicInfo,
                step: "STEP2_BUDGET"
              })
            }

            setStepCampaign({steps: 2})
          }
        }
      })
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {state !== null && <AdverInfo><span>광고주 정보</span><p></p><span>{state?.adverInfo}</span></AdverInfo>}
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
                  <InputLabel label={'원'}>
                    <Input type={'text'}
                           step={100}
                           readOnly={campaignBudgetInfo.infiniteBudgetYn !== 'N' && true}
                           placeholder={campaignBudgetInfo.infiniteBudgetYn !== 'Y' ? '일일 평균 예산을 설정해주세요.' : ''}
                           style={{color:'#f5811f'}}
                           {...register("dailyAvgBudget", {
                             required: campaignBudgetInfo.infiniteBudgetYn !== 'Y' && "일일 평균 예산을 설정해주세요.",
                             pattern:{
                               value: /^[0-9,]+$/,
                               message: "숫자만 입력 가능합니다."
                             },
                             onChange:(e) => handleChangeDailyBudget(e.target.value)
                           })}
                           value={campaignBudgetInfo.infiniteBudgetYn !== 'Y' ? decimalFormat(campaignBudgetInfo.dailyAvgBudget) : ''}
                    />
                  </InputLabel>
                </ColSpan1>
                <ColSpan0>
                  <label>
                    <input type={'checkbox'} value={campaignBudgetInfo.infiniteBudgetYn} checked={campaignBudgetInfo.infiniteBudgetYn !== 'N' && true} className={'checkbox-type-a'} onChange={handleCheckInfiniteBudget}/>
                    <i/>
                    {/*배너일때 infiniteBudget 항목 없음*/}
                    <span>일일 예산 무제한</span>
                  </label>
                </ColSpan0>
                <ColSpan1> {errors.dailyAvgBudget &&
                  <ValidationScript style={{position: 'unset'}}>{errors.dailyAvgBudget.message}</ValidationScript>}</ColSpan1>
              </RelativeDiv>
            </ColSpan4>
            <ColSpan4>
              <Span4>예산 비율</Span4>
              <RelativeDiv>
                <ColSpan1>
                  <Span1>PC</Span1>
                  <InputLabel label={'원'}>
                    <Input type={'text'}
                           readOnly={campaignBudgetInfo.infiniteBudgetYn !== 'N' && true}
                           style={{color:'#f5811f'}}
                           step={10}
                           {...register("pcBudget", {
                             pattern:{
                               value: /^[0-9,]+$/,
                               message: "숫자만 입력 가능합니다."
                             },
                             onChange:(e) => handleChangePcBudget(e.target.value)
                           })}
                           value={campaignBudgetInfo.infiniteBudgetYn !== 'Y' ? decimalFormat(campaignBudgetInfo.pcBudget) : ''}
                    />
                  </InputLabel>
                </ColSpan1>
                <ColSpan1>
                  <input
                    className={campaignBudgetInfo.infiniteBudgetYn !== 'N' ? 'read-only' : ''}
                    type="range"
                    value={campaignBudgetInfo.budgetRate !== undefined ? campaignBudgetInfo.budgetRate : 50}
                    onChange={handleChangeInputRange}
                    style={{
                      background: `linear-gradient(to right, #f5811f 0%, #f5811f ${campaignBudgetInfo.budgetRate !== undefined ? campaignBudgetInfo.budgetRate: 50}%, #ddd ${campaignBudgetInfo.budgetRate !== undefined ? campaignBudgetInfo.budgetRate: 50}%, #ddd 100%)`
                    }}
                  />
                  <Span1>
                    {campaignBudgetInfo.budgetRate +':'+ (100-campaignBudgetInfo.budgetRate)}
                  </Span1>
                </ColSpan1>
                <ColSpan1>
                  <ColTitle><Span1>MOBILE</Span1></ColTitle>
                  <InputLabel label={'원'}>
                    <Input type={'text'}
                           readOnly={campaignBudgetInfo.infiniteBudgetYn !== 'N' && true}
                           style={{color:'#f5811f'}}
                           step={10}
                           {...register("mobBudget", {
                             pattern:{
                               value: /^[0-9,]+$/,
                               message: "숫자만 입력 가능합니다."
                             },
                             onChange:(e) => handleChangeMobileBudget(e.target.value)
                           })}
                           value={campaignBudgetInfo.infiniteBudgetYn !== 'Y' ? decimalFormat(campaignBudgetInfo.mobBudget) : ''}
                    />
                  </InputLabel>
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
                {timeBudgetDetailDataState !== null &&
                  <ColSpan1>
                    <TimeTable
                        exposureTimeType={timeBudgetDetailDataState?.exposureTimeType !== undefined ? timeBudgetDetailDataState.exposureTimeType : timeBudgetDetailDataState?.timeGroups.find(value => value.id === campaignBudgetInfo?.budgetTimeId)}
                      title={'설정된 시간별 예산'} readOnly={true}/>
                  </ColSpan1>
                }
                {errors.budgetTimeId &&
                  <ColSpan1><ValidationScript>{errors.budgetTimeId.message}</ValidationScript></ColSpan1>}
              </RelativeDiv>
            </ColSpan4>
            <ColSpan4>
              <Span4>타겟팅 예산 그룹</Span4>
              <RelativeDiv>
                <ColSpan1>
                  <Controller
                    name="targetingBudgetId"
                    control={control}
                    rules={{
                      required: {
                        value: campaignBudgetInfo?.targetingBudgetId === '',
                        message: "타겟팅 예산을 선택해주세요"
                      }
                    }}
                    render={({field}) => (
                      <Select options={budgetEventListState !== null ? budgetEventListState : []}
                              placeholder={'타겟팅 예산 선택'}
                              {...field}
                              value={budgetEventListState !==null && budgetEventListState.find(value => value.value === campaignBudgetInfo?.targetingBudgetId)}
                              onChange={handleChangeBudgetEvents}
                              styles={selectStyle}
                      />
                    )}
                  />
                </ColSpan1>
                {errors.targetingBudgetId &&
                  <ColSpan1><ValidationScript>{errors.targetingBudgetId.message}</ValidationScript></ColSpan1>}
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
                  <InputLabel label={'원'}>
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
                        <Input type={'text'}
                               step={100}
                               placeholder={'최대 입찰가를 설정해주세요'}
                               style={{color:'#f5811f'}}
                               value={campaignBudgetInfo !== null && decimalFormat(campaignBudgetInfo.maxBiddingPrice)}
                               onChange={(e)=>handleChangeMaxBid(e.target.value)}
                        /> )}
                    />
                  </InputLabel>
                </ColSpan1>
                {errors.maxBiddingPrice &&
                  <ColSpan1><ValidationScript>{errors.maxBiddingPrice.message}</ValidationScript></ColSpan1>}
              </RelativeDiv>
            </ColSpan4>
            <ColSpan4>
              <Span4>타겟팅 단가 그룹</Span4>
              <RelativeDiv>
                <ColSpan1>
                  <Controller
                    name="targetingPriceId"
                    control={control}
                    rules={{
                      required: {
                        value: campaignBudgetInfo?.targetingPriceId === '',
                        message: "타겟팅 단가를 선택해주세요"
                      }
                    }}
                    render={({field}) => (
                      <Select options={priceEventListState !== null ? priceEventListState : []}
                              placeholder={'타겟팅 단가 선택'}
                              {...field}
                              value={priceEventListState !==null && priceEventListState.find(value => value.value === campaignBudgetInfo?.targetingPriceId)}
                              onChange={handleChangePriceEvent}
                              styles={selectStyle}
                      />
                    )}
                  />
                </ColSpan1>
                {errors.targetingPriceId &&
                  <ColSpan1><ValidationScript>{errors.targetingPriceId.message}</ValidationScript></ColSpan1>}
              </RelativeDiv>
            </ColSpan4>
          </RowSpan>
        </BoardSearchResult>
      </Board>
      <SubmitContainer>
        <CancelButton type={'button'} onClick={() => state !== null ? navigate('/board/dashboard') : setStepCampaign({steps: 0})}>{state !== null ? '목록' : '이전'}</CancelButton>
        <SubmitButton type={'submit'}>{state !== null ? '수정' : '다음[2/4]'}</SubmitButton>
      </SubmitContainer>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{zIndex: 9999999}}
      />
    </form>
  )
}