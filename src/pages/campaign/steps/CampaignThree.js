import React, {useEffect, useState} from "react";
import {
  AgentType,
  Board,
  BoardHeader,
  BoardSearchResult,
  CalendarBox,
  CalendarIcon,
  CancelButton,
  ColSpan2,
  ColSpan3,
  ColSpan4,
  CustomDatePicker,
  DateContainer,
  Input,
  RelativeDiv,
  RowSpan,
  smallStyle,
  Span4,
  SubmitButton,
  SubmitContainer,
  ValidationScript
} from "../../../assets/GlobalStyles";
import Checkbox from "../../../components/common/Checkbox";
import {AdverInfo, CategoryItem, RowInBox, SelectCategory} from "../styles/common";
import ko from "date-fns/locale/ko";
import Select from "react-select";
import {InventoryButton} from "../../../components/modal/InventorySettings";
import {Controller, useFormContext} from "react-hook-form";
import {useAtom} from "jotai";
import {stepCampaignAtom} from "../entity";
import {campaignBasicInfoAtom} from "../entity/Info";
import {selGroupInfo, selMediaCategoryInfo, updateCampaignConfigInventory} from "../../../services/campaign/GroupAxios";
import {campaignGroupInfoAtom, mediaCategoryAtom, noViewType} from "../entity/Group";
import {dateFormat, unlimitedDate} from "../../../common/StringUtils";
import {selEnumInfo} from "../../../services/campaign/InfoAxios";
import {toast, ToastContainer} from "react-toastify";
import {useLocation, useNavigate} from "react-router-dom";
import {useResetAtom} from "jotai/utils";

export function CampaignThree() {
  const [, setStepCampaign] = useAtom(stepCampaignAtom)
  const [campaignBasicInfo, setCampaignBasicInfo] = useAtom(campaignBasicInfoAtom)
  const [campaignGroupInfo, setCampaignGroupInfo] = useAtom(campaignGroupInfoAtom)
  const [exposureDayChecked, setExposureDayChecked] = useState(false)
  const [mediaCategory, setMediaCategory] = useAtom(mediaCategoryAtom)
  const [agentTypeState ,setAgentTypeState] =useState([])
  const [noViewTypeState] = useState(noViewType)
  const [dateRange, setDateRange] = useState([]);
  const [startDate, endDate] = dateRange
  const {register, handleSubmit, reset, setValue, control, formState: {errors}, clearErrors} = useFormContext()
  const {state} = useLocation()
  const navigate = useNavigate()
  const resetInfo = useResetAtom(campaignGroupInfoAtom)

  useEffect(()=>{
    resetInfo();
    selMediaCategoryInfo().then(response => {
      if (response) {
        setMediaCategory(response)
      }
    });

    selEnumInfo('AGENT_TYPE').then(response => {
      setAgentTypeState(response.data)
    });

  }, [])


  useEffect(() => {
    if((state !== null || ['STEP3_INVENTORY','STEP4_CREATIVE','COMPLETED'].includes(campaignBasicInfo.step))){
      let campaignId = state !== null ? state.campaignId : campaignBasicInfo.campaignId
      selGroupInfo(campaignId).then(response =>{
        setCampaignGroupInfo(response)
        reset({name:response.name})

        if(response.endDate === '3000-12-31') setExposureDayChecked(true);

        setDateRange([
          new Date(response.startDate),
          new Date(response.endDate !== '3000-12-31' ? response.endDate: null)
        ])
      });
    }

  }, [state])

  useEffect(() => {
    if(dateRange?.length != 0){
      setCampaignGroupInfo({
        ...campaignGroupInfo,
        startDate: dateFormat(startDate, 'YYYY-MM-DD'),
        endDate: dateFormat(endDate, 'YYYY-MM-DD'),
      })
    }
  },[dateRange])

  const handleAgentType = (event) => {
    if (event.target.checked) {
      setCampaignGroupInfo({
        ...campaignGroupInfo,
        exposureAgentType: campaignGroupInfo.exposureAgentType.concat(event.target.value)
      })
      setValue('exposureAgentType', campaignGroupInfo.exposureAgentType.concat(event.target.value))
    } else {
      setCampaignGroupInfo({
        ...campaignGroupInfo,
        exposureAgentType: campaignGroupInfo.exposureAgentType.filter(value => value !== event.target.value)
      })
      setValue('exposureAgentType', campaignGroupInfo.exposureAgentType.filter(value => value !== event.target.value))
    }
  }
  const selectedCategory = (selectedCategory) => {
    let boolCategory = campaignGroupInfo.allowInventoryCategories.includes(selectedCategory)
    if (!boolCategory) {
      setCampaignGroupInfo({
        ...campaignGroupInfo,
        allowInventoryCategories: campaignGroupInfo.allowInventoryCategories.concat(selectedCategory)
      })
    } else {
      setCampaignGroupInfo({
        ...campaignGroupInfo,
        allowInventoryCategories: campaignGroupInfo.allowInventoryCategories.filter(value => value !== selectedCategory)
      })
    }
    clearErrors('inventoryCATEGORY')
  }
  const selectedDisExposureCategory = (selectedCategory) => {
    let boolCategory = campaignGroupInfo.disAllowInventoryCategories.includes(selectedCategory)
    if (!boolCategory) {
      setCampaignGroupInfo({
        ...campaignGroupInfo,
        disAllowInventoryCategories: campaignGroupInfo.disAllowInventoryCategories.concat(selectedCategory)
      })
    } else {
      setCampaignGroupInfo({
        ...campaignGroupInfo,
        disAllowInventoryCategories: campaignGroupInfo.disAllowInventoryCategories.filter(value => value !== selectedCategory)
      })
    }
    clearErrors('disInventoryCATEGORY')
  }

  const setExposureInventoryType = (exposureInventoryType) => {
    setCampaignGroupInfo({
      ...campaignGroupInfo,
      exposureInventoryType: exposureInventoryType,
      allowInventoryCategories: []
    })
    clearErrors('inventoryCATEGORY')
    clearErrors('inventoryMANUAL')
  }

  const setDisExposureInventoryType = (exposureInventoryType) => {
    setCampaignGroupInfo({
      ...campaignGroupInfo,
      disExposureInventoryType: exposureInventoryType,
      disAllowInventoryCategories: []
    })
    clearErrors('disInventoryCATEGORY')
    clearErrors('disInventoryMANUAL')
  }

  const handleRangeDate = (date) => {
    if(date?.length != undefined) setDateRange(date)
    else setDateRange([date, null])

    clearErrors('endDate')
  }

  const handleCheckExposureDay = (event) =>{
    setExposureDayChecked(event.target.checked)
    if(event.target.checked){
      setDateRange([startDate, null])
    } else {
      setDateRange([null, null])
    }
  }

  const setUserTargetConfigType = (userTargetConfigType) =>{
    setCampaignGroupInfo({
      ...campaignGroupInfo,
      userTargetConfigType: userTargetConfigType,
      exposureConversionUserYn:'Y',
      exposureShoppingUserYn:'Y',
      exposureAttentionUserYn:'Y',
      exposureVisitUserYn:'Y',
    })
  }

  const handleNoViewType = (noViewType) => {
    setCampaignGroupInfo({
      ...campaignGroupInfo,
      nonExposureDaysOfConversionUser: noViewType.value
    })
    clearErrors('nonExposureDaysOfConversionUser')
  }

  const setExposureConversion =(boolExposureConversion)=>{
    setCampaignGroupInfo({
      ...campaignGroupInfo,
      exposureConversionUserYn: boolExposureConversion
    })
  }

  const setExposureShoppingUser =(boolExposureShoppingUser)=>{
    setCampaignGroupInfo({
      ...campaignGroupInfo,
      exposureShoppingUserYn: boolExposureShoppingUser
    })
  }

  const setExposureVisitUser =(boolExposureVisitUser)=>{
    setCampaignGroupInfo({
      ...campaignGroupInfo,
      exposureVisitUserYn: boolExposureVisitUser
    })
  }

  const setExposureAttentionUser =(boolExposureAttentionUser)=>{
    setCampaignGroupInfo({
      ...campaignGroupInfo,
      exposureAttentionUserYn: boolExposureAttentionUser
    })
  }

  const setAudienceTargetConfigType = (audienceTargetConfigType) =>{
    setCampaignGroupInfo({
      ...campaignGroupInfo,
      audienceTargetConfigType: audienceTargetConfigType,
      exposureConversionAudienceYn:'Y',
      exposureShoppingAudienceYn:'Y',
      exposurePotentialAudienceYn:'Y',
      exposureNewAudienceYn:'Y',
    })
  }
  const handleNoViewTypeAudience = (noViewTypeAudience) => {
    setCampaignGroupInfo({
      ...campaignGroupInfo,
      nonExposureDaysOfConversionAudience: noViewTypeAudience.value
    })
    clearErrors('nonExposureDaysOfConversionAudience')
  }

  const setExposureConversionAudience =(boolExposureConversionAudience)=>{
    setCampaignGroupInfo({
      ...campaignGroupInfo,
      exposureConversionAudienceYn: boolExposureConversionAudience
    })
  }

  const setExposureShoppingUserAudience =(boolExposureShoppingAudience)=>{
    setCampaignGroupInfo({
      ...campaignGroupInfo,
      exposureShoppingAudienceYn: boolExposureShoppingAudience
    })
  }

  const setExposurePotentialAudience =(boolExposurePotentialAudience)=>{
    setCampaignGroupInfo({
      ...campaignGroupInfo,
      exposurePotentialAudienceYn: boolExposurePotentialAudience
    })
  }


  const setExposureNewAudience =(boolExposureNewAudience)=>{
    setCampaignGroupInfo({
      ...campaignGroupInfo,
      exposureNewAudienceYn: boolExposureNewAudience
    })
  }
  const onChangeGroupName = (event) => {
    setCampaignGroupInfo({
      ...campaignGroupInfo,
      name: event.target.value
    })
    clearErrors('name')
  }

  const onCancel = () => {
    if(state !== null){
      navigate('/board/dashboard')
    } else{
      setStepCampaign({steps: 1})
    }
    resetInfo();
  }

  const onSubmit = () => {
    let param = {
      ...campaignGroupInfo,
      endDate: exposureDayChecked ? unlimitedDate('YYYY-MM-DD') : endDate,
      campaignId: state !== null ? state.campaignId : campaignBasicInfo.campaignId
    };
    updateCampaignConfigInventory(param).then(response => {
      if (response) {
        if (state !== null) {
          toast.success("수정되었습니다.",{autoClose:100, delay:0})
          toast.onChange(payload => {
            if (payload.status === "removed" && payload.type !== toast.TYPE.ERROR) {
              navigate('/board/dashboard')
              resetInfo()
            }
          })
        } else {
          if(!['STEP3_INVENTORY','STEP4_CREATIVE','COMPLETED'].includes(campaignBasicInfo.step)){
            setCampaignBasicInfo({
              ...campaignBasicInfo,
              step: "STEP3_INVENTORY"
            })
          }

          setStepCampaign({steps: 3})
        }
      }
    })
  }

  const onError = (error) => console.log(error)

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      {state !== null && <AdverInfo><span>광고주 정보</span><p></p><span>{state?.adverInfo}</span></AdverInfo>}
      <Board>
        <BoardHeader>광고 그룹 설정</BoardHeader>
        <BoardSearchResult>
          <RowSpan>
            <ColSpan4>
              <Span4>노출 영역</Span4>
              <RelativeDiv>
                <AgentType>
                  {
                    agentTypeState != null && agentTypeState.map((data, key)=>{
                      return <Controller name={'exposureAgentType'}
                                         control={control}
                                         key={key}
                                         rules={{required: {value: campaignGroupInfo.exposureAgentType?.length === 0, message:'노출 영역은 최소한 하나는 입력해주세요'}}}
                                         render={({field}) =>
                                           <Checkbox label={data.label} type={'c'} id={'event'+key+data.value} value={data.value} isChecked={campaignGroupInfo.exposureAgentType?.some(event => event === data.value)}
                                                     onChange={handleAgentType} inputRef={field.ref}/>
                                         }
                              />
                    })
                  }
                  {errors.exposureAgentType &&
                    <ValidationScript>{errors.exposureAgentType.message}</ValidationScript>}
                </AgentType>
              </RelativeDiv>
            </ColSpan4>
          </RowSpan>
          <RowSpan>
            <ColSpan4>
              <Span4>광고 게재 설정</Span4>
            </ColSpan4>
          </RowSpan>
          <RowSpan box={true} column={true} style={{backgroundColor: '#ffffff'}}>
            <ColSpan4>
              <Span4>게재 지면</Span4>
              <RelativeDiv>
                <label>
                  <input
                    type={'radio'}
                    name={'inventory'}
                    id={'inventoryAUTO'}
                    onChange={() => setExposureInventoryType('AUTO')}
                    checked={campaignGroupInfo.exposureInventoryType === 'AUTO'}
                  />
                  <span>자동 최적화</span>
                </label>
                <label>
                  <Controller name={'inventoryCATEGORY'}
                              control={control}
                              rules={{required: {value: campaignGroupInfo.exposureInventoryType === "CATEGORY" && campaignGroupInfo.allowInventoryCategories?.length === 0, message:'카테고리를 최소한 하나는 입력해주세요'}}}
                              render={({field}) =>
                                <input
                                  type={'radio'}
                                  name={'inventory'}
                                  id={'inventoryCATEGORY'}
                                  onChange={() => setExposureInventoryType('CATEGORY')}
                                  checked={campaignGroupInfo.exposureInventoryType === 'CATEGORY'}
                                />
                              }
                  />
                  <span>카테고리 설정</span>
                </label>
                <ColSpan2>
                  <label>
                    <Controller name={'inventoryMANUAL'}
                                control={control}
                                rules={{required: {value: campaignGroupInfo.exposureInventoryType === "MANUAL" && campaignGroupInfo.allowInventoryIds?.length === 0, message:'지면을 선택해주세요.'}}}
                                render={({field}) =>
                                  <input
                                    type={'radio'}
                                    name={'inventory'}
                                    id={'inventoryMANUAL'}
                                    onChange={() => setExposureInventoryType('MANUAL')}
                                    checked={campaignGroupInfo.exposureInventoryType === 'MANUAL'}
                                  />
                                }
                    />
                    <span>직접 선택</span>
                  </label>
                  {campaignGroupInfo.exposureInventoryType === 'MANUAL' &&
                    <InventoryButton title={'지면선택'} type={'allow'}/>
                  }
                  {campaignGroupInfo.exposureInventoryType === 'MANUAL' && campaignGroupInfo.allowInventoryIds?.length !== 0 &&
                    <small>{campaignGroupInfo.allowInventoryIds?.length}개 지면 송출 설정</small>
                  }
                  {errors.inventoryMANUAL && <ValidationScript style={{position: 'unset'}}>{errors.inventoryMANUAL.message}</ValidationScript>}
                </ColSpan2>
              </RelativeDiv>
            </ColSpan4>
            {campaignGroupInfo.exposureInventoryType === 'CATEGORY' &&
              <ColSpan4>
                <Span4></Span4>
                <RelativeDiv>
                  <SelectCategory>
                    {mediaCategory?.data.map((item, key) => {
                      return (
                        <CategoryItem
                          active={campaignGroupInfo !== null && campaignGroupInfo.allowInventoryCategories.includes(item.value)}
                          key={key} onClick={() => selectedCategory(item.value)}>{item.label}</CategoryItem>
                      )
                    })}
                  </SelectCategory>
                  {errors.inventoryCATEGORY && <small><ValidationScript>{errors.inventoryCATEGORY.message}</ValidationScript></small>}
                </RelativeDiv>
              </ColSpan4>
            }
            <ColSpan4>
              <Span4>송출 제한 지면 설정</Span4>
              <RelativeDiv>
                <label>
                  <input
                    type={'radio'}
                    id={'disInventoryNONE'}
                    name={'disInventory'}
                    onChange={() => setDisExposureInventoryType('NONE')}
                    checked={campaignGroupInfo.disExposureInventoryType === 'NONE'}
                  />
                  <span>없음</span>
                </label>
                <label>
                  <Controller name={'disInventoryCATEGORY'}
                              control={control}
                              rules={{required: {value: campaignGroupInfo.disExposureInventoryType === "CATEGORY" && campaignGroupInfo.disAllowInventoryCategories?.length === 0, message:'카테고리를 최소한 하나는 입력해주세요'}}}
                              render={({field}) =>
                                <input
                                  type={'radio'}
                                  id={'disInventoryCATEGORY'}
                                  name={'disInventory'}
                                  onChange={() => setDisExposureInventoryType('CATEGORY')}
                                  checked={campaignGroupInfo.disExposureInventoryType === 'CATEGORY'}
                                />
                              }
                  />
                  <span>카테고리 설정</span>
                </label>
                <ColSpan2>
                  <label>
                    <Controller name={'disInventoryMANUAL'}
                                control={control}
                                rules={{required: {value: campaignGroupInfo.disExposureInventoryType === "MANUAL" && campaignGroupInfo.disAllowInventoryIds?.length === 0, message:'지면을 선택해주세요.'}}}
                                render={({field}) =>
                                  <input
                                    type={'radio'}
                                    id={'disInventoryMANUAL'}
                                    name={'disInventory'}
                                    onChange={() => setDisExposureInventoryType('MANUAL')}
                                    checked={campaignGroupInfo.disExposureInventoryType === 'MANUAL'}
                                  />
                                }
                    />
                    <span>직접 선택</span>
                  </label>
                  {campaignGroupInfo.disExposureInventoryType === 'MANUAL' &&
                    <InventoryButton title={'지면선택'} type={'disExposure'}/>
                  }
                  {campaignGroupInfo.disExposureInventoryType === 'MANUAL' && campaignGroupInfo.disAllowInventoryIds?.length !== 0 &&
                    <small>{campaignGroupInfo.disAllowInventoryIds?.length}개 지면 송출 설정</small>
                  }
                  {errors.disInventoryMANUAL && <small><ValidationScript style={{position: 'unset'}}>{errors.disInventoryMANUAL.message}</ValidationScript></small>}
                </ColSpan2>
              </RelativeDiv>
            </ColSpan4>
            {campaignGroupInfo.disExposureInventoryType === 'CATEGORY' &&
              <ColSpan4>
                <Span4></Span4>
                <RelativeDiv>
                  <SelectCategory>
                    {mediaCategory.data.map((item, key) => {
                      return (
                        <CategoryItem
                          active={campaignGroupInfo !== null && campaignGroupInfo.disAllowInventoryCategories.includes(item.value)}
                          key={key} onClick={() => selectedDisExposureCategory(item.value)}>{item.label}</CategoryItem>
                      )
                    })}
                  </SelectCategory>
                  {errors.disInventoryCATEGORY && <ValidationScript>{errors.disInventoryCATEGORY.message}</ValidationScript>}
                </RelativeDiv>
              </ColSpan4>
            }
            <RowSpan validation>
              <ColSpan4>
                <Span4>게재 기간</Span4>
                <ColSpan2>
                  <DateContainer>
                    <CalendarBox>
                      <CalendarIcon/>
                    </CalendarBox>
                    <Controller
                      control={control}
                      name="endDate"
                      rules={{required: {value: (exposureDayChecked ? dateRange[0] === null : dateRange[1] === null), message:'게재 기간을 설정해주세요'}}}
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <CustomDatePicker
                          selectsRange={!exposureDayChecked}
                          startDate={startDate}
                          endDate={endDate}
                          placeholderText={'날짜를 입력해 주세요.'}
                          minDate={new Date()}
                          onChange={(date) => handleRangeDate(date)}
                          dateFormat="yyyy.MM.dd"
                          locale={ko}
                          isClearable={false}
                          onBlur={onBlur}
                          selected={startDate}
                          inputRef={ref}
                        />
                      )}
                    />
                    {errors.endDate && <ValidationScript>{errors.endDate.message}</ValidationScript>}
                  </DateContainer>

                </ColSpan2>
                <ColSpan3>
                  <label>
                    <input type={'checkbox'}
                           className={'checkbox-type-a'}
                           checked={exposureDayChecked}
                           onChange={handleCheckExposureDay}
                    />
                    <i/>
                    <span>종료일 미설정</span>
                  </label>
                </ColSpan3>
              </ColSpan4>
            </RowSpan>
          </RowSpan>
          <RowSpan>
            <ColSpan4>
              <Span4>타게팅 설정</Span4>
            </ColSpan4>
          </RowSpan>
          <RowSpan box={true} column={true} style={{backgroundColor: '#ffffff'}}>
            <ColSpan4>
              <Span4>고객 정보 기반 설정</Span4>
              <RelativeDiv>
                <label>
                  <input
                    type={'radio'}
                    name={'targetCustomer'}
                    id={'targetCustomerAUTO'}
                    onChange={() => setUserTargetConfigType('AUTO')}
                    checked={campaignGroupInfo.userTargetConfigType === 'AUTO'}
                  />
                  <span>자동 최적화</span>
                </label>
                <label>
                  <input
                    type={'radio'}
                    name={'targetCustomer'}
                    id={'targetCustomerMANUAL'}
                    onChange={() => setUserTargetConfigType('MANUAL')}
                    checked={campaignGroupInfo.userTargetConfigType === 'MANUAL'}
                  />
                  <span>개별 설정</span>
                </label>
              </RelativeDiv>
            </ColSpan4>
            {campaignGroupInfo.userTargetConfigType === 'MANUAL' &&
              <ColSpan4>
                <Span4></Span4>
                <RelativeDiv box={true} column={true}>
                  <RowInBox>
                    <div>
                      <span>전환 유저</span>
                      <span style={{color: '#ccc'}}>광고주 상품을 구매한 고객을 대상으로 정책 설정</span>
                    </div>
                    <div>
                      <div>
                        <label>
                          <input type={'radio'}
                                 name={'exposureConversionUser'}
                                 checked={campaignGroupInfo.exposureConversionUserYn ==='Y' && true}
                                 onChange={() => setExposureConversion('Y')}
                          />
                          <span>노출</span>
                        </label>
                        <label>
                          <input type={'radio'}
                                 name={'exposureConversionUser'}
                                 checked={campaignGroupInfo.exposureConversionUserYn ==='N' && true}
                                 onChange={() => setExposureConversion('N')}
                          />
                          <span>미노출</span>
                        </label>
                      </div>
                      {
                        campaignGroupInfo.exposureConversionUserYn ==='N' &&
                        <div>
                          <Controller name={'nonExposureDaysOfConversionUser'}
                                      control={control}
                                      rules={{required: {value: campaignGroupInfo.exposureConversionUserYn === "N" && campaignGroupInfo.nonExposureDaysOfConversionUser === null, message:'미노출 기간을 선택해주세요.'}}}
                                      render={({field}) =>
                                        <Select styles={smallStyle}
                                                placeholder={'미노출기간 선택'}
                                                options={noViewTypeState}
                                                value={noViewTypeState.find(item =>item.value === campaignGroupInfo.nonExposureDaysOfConversionUser)}
                                                onChange={handleNoViewType}
                                        />
                                      }
                          />
                        </div>
                      }
                      {errors.nonExposureDaysOfConversionUser && <small><ValidationScript style={{position: 'unset'}}>{errors.nonExposureDaysOfConversionUser.message}</ValidationScript></small>}
                      {/*<div>
                        <SmallInput>
                          <input type={'text'}
                                 readOnly={selectNoViewTypeState.value !== 'DIRECT'}
                                 onChange={handleNonExposureDays}
                                 value={campaignGroupInfo.nonExposureDaysOfConversionUser}
                          />
                          <Day/>
                        </SmallInput>
                      </div>*/}
                    </div>
                  </RowInBox>
                  <RowInBox>
                    <div>
                      <span>쇼핑 고객</span>
                      <span style={{color: '#ccc'}}>쇼핑을 진행한 고객을 대상으로 광고 노출</span>
                    </div>
                    <div>
                      <div>
                        <label>
                          <input type={'radio'}
                                 name={'exposureShoppingUser'}
                                 checked={campaignGroupInfo.exposureShoppingUserYn ==='Y' && true}
                                 onChange={() => setExposureShoppingUser('Y')}
                          />
                          <span>노출</span>
                        </label>
                        <label>
                          <input type={'radio'}
                                 name={'exposureShoppingUser'}
                                 checked={campaignGroupInfo.exposureShoppingUserYn ==='N' && true}
                                 onChange={() => setExposureShoppingUser('N')}
                          />
                          <span>미노출</span>
                        </label>
                      </div>
                    </div>
                  </RowInBox>
                  <RowInBox>
                    <div>
                      <span>관심 고객</span>
                      <span style={{color: '#ccc'}}>쇼핑을 진행한 고객을 대상으로 광고 노출</span>
                    </div>
                    <div>
                      <div>
                        <label>
                          <input type={'radio'}
                                 name={'exposureAttentionUser'}
                                 checked={campaignGroupInfo.exposureAttentionUserYn === 'Y' && true}
                                 onChange={() => setExposureAttentionUser('Y')}
                          />
                          <span>노출</span>
                        </label>
                        <label>
                          <input type={'radio'}
                                 name={'exposureAttentionUser'}
                                 checked={campaignGroupInfo.exposureAttentionUserYn === 'N' && true}
                                 onChange={() => setExposureAttentionUser('N')}
                          />
                          <span>미노출</span>
                        </label>
                      </div>
                    </div>
                  </RowInBox>
                  <RowInBox>
                    <div>
                      <span>방문 고객</span>
                      <span style={{color: '#ccc'}}>쇼핑을 진행한 고객을 대상으로 광고 노출</span>
                    </div>
                    <div>
                      <div>
                        <label>
                          <input type={'radio'}
                                 name={'exposureVisitUser'}
                                 checked={campaignGroupInfo.exposureVisitUserYn === 'Y' && true}
                                 onChange={() => setExposureVisitUser('Y')}
                          />
                          <span>노출</span>
                        </label>
                        <label>
                          <input type={'radio'}
                                 name={'exposureVisitUser'}
                                 checked={campaignGroupInfo.exposureVisitUserYn === 'N' && true}
                                 onChange={() => setExposureVisitUser('N')}
                          />
                          <span>미노출</span>
                        </label>
                      </div>
                    </div>
                  </RowInBox>
                </RelativeDiv>
              </ColSpan4>
            }
            <ColSpan4>
              <Span4 style={{letterSpacing: -1.2}}>유저 데이터 분석 설정</Span4>
              <RelativeDiv>
                <label>
                  <input
                    type={'radio'}
                    name={'audienceTargetData'}
                    id={'audienceTargetDataAUTO'}
                    onChange={() => setAudienceTargetConfigType('AUTO')}
                    checked={campaignGroupInfo.audienceTargetConfigType === 'AUTO'}
                  />
                  <span>자동 최적화</span>
                </label>
                <label>
                  <input
                    type={'radio'}
                    name={'audienceTargetData'}
                    id={'audienceTargetDataMANUAL'}
                    onChange={() => setAudienceTargetConfigType('MANUAL')}
                    checked={campaignGroupInfo.audienceTargetConfigType === 'MANUAL'}
                  />
                  <span>개별 설정</span>
                </label>
              </RelativeDiv>
            </ColSpan4>
            {campaignGroupInfo.audienceTargetConfigType === 'MANUAL' &&
              <ColSpan4>
                <Span4></Span4>
                <RelativeDiv box={true} column={true}>
                  <RowInBox>
                    <div>
                      <span>전환 유저</span>
                      <span style={{color: '#ccc'}}>광고주 상품을 구매한 고객을 대상으로 정책 설정</span>
                    </div>
                    <div>
                      <div>
                        <label>
                          <input type={'radio'}
                                 name={'exposureConversionAudience'}
                                 checked={campaignGroupInfo.exposureConversionAudienceYn === 'Y' && true}
                                 onChange={() => setExposureConversionAudience('Y')}
                          />
                          <span>노출</span>
                        </label>
                        <label>
                          <input type={'radio'}
                                 name={'exposureConversionAudience'}
                                 checked={campaignGroupInfo.exposureConversionAudienceYn === 'N' && true}
                                 onChange={() => setExposureConversionAudience('N')}
                          />
                          <span>미노출</span>
                        </label>
                      </div>
                      {
                        campaignGroupInfo.exposureConversionAudienceYn === 'N' &&
                        <div>
                          <Controller name={'nonExposureDaysOfConversionAudience'}
                                      control={control}
                                      rules={{required: {value: campaignGroupInfo.exposureConversionAudienceYn === "N" && campaignGroupInfo.nonExposureDaysOfConversionAudience === null, message:'미노출 기간을 선택해주세요.'}}}
                                      render={({field}) =>
                                        <Select styles={smallStyle}
                                                placeholder={'미노출기간 선택'}
                                                options={noViewTypeState}
                                                value={noViewTypeState.find(item =>item.value === campaignGroupInfo.nonExposureDaysOfConversionAudience)}
                                                onChange={handleNoViewTypeAudience}
                                        />
                                      }
                          />
                        </div>
                      }
                      {errors.nonExposureDaysOfConversionAudience && <small><ValidationScript style={{position: 'unset'}}>{errors.nonExposureDaysOfConversionAudience.message}</ValidationScript></small>}
                    </div>
                  </RowInBox>
                  <RowInBox>
                    <div>
                      <span>쇼핑 고객</span>
                      <span style={{color: '#ccc'}}>쇼핑을 진행한 고객을 대상으로 광고 노출</span>
                    </div>
                    <div>
                      <div>
                        <label>
                          <input type={'radio'}
                                 name={'exposureShoppingAudience'}
                                 checked={campaignGroupInfo.exposureShoppingAudienceYn === 'Y' && true}
                                 onChange={() => setExposureShoppingUserAudience('Y')}
                          />
                          <span>노출</span>
                        </label>
                        <label>
                          <input type={'radio'}
                                 name={'exposureShoppingAudience'}
                                 checked={campaignGroupInfo.exposureShoppingAudienceYn === 'N' && true}
                                 onChange={() => setExposureShoppingUserAudience('N')}
                          />
                          <span>미노출</span>
                        </label>
                      </div>
                    </div>
                  </RowInBox>
                  <RowInBox>
                    <div>
                      <span>관심 고객</span>
                      <span style={{color: '#ccc'}}>쇼핑을 진행한 고객을 대상으로 광고 노출</span>
                    </div>
                    <div>
                      <div>
                        <label>
                          <input type={'radio'}
                                 name={'exposurePotentialAudience'}
                                 checked={campaignGroupInfo.exposurePotentialAudienceYn === 'Y' && true}
                                 onChange={() => setExposurePotentialAudience('Y')}
                          />
                          <span>노출</span>
                        </label>
                        <label>
                          <input type={'radio'}
                                 name={'exposurePotentialAudience'}
                                 checked={campaignGroupInfo.exposurePotentialAudienceYn === 'N' && true}
                                 onChange={() => setExposurePotentialAudience('N')}
                          />
                          <span>미노출</span>
                        </label>
                      </div>
                    </div>
                  </RowInBox>
                  <RowInBox>
                    <div>
                      <span>방문 고객</span>
                      <span style={{color: '#ccc'}}>쇼핑을 진행한 고객을 대상으로 광고 노출</span>
                    </div>
                    <div>
                      <div>
                        <label>
                          <input type={'radio'}
                                 name={'exposureNewAudience'}
                                 checked={campaignGroupInfo.exposureNewAudienceYn === 'Y' && true}
                                 onChange={() => setExposureNewAudience('Y')}
                          />
                          <span>노출</span>
                        </label>
                        <label>
                          <input type={'radio'}
                                 name={'exposureNewAudience'}
                                 checked={campaignGroupInfo.exposureNewAudienceYn === 'N' && true}
                                 onChange={() => setExposureNewAudience('N')}
                          />
                          <span>미노출</span>
                        </label>
                      </div>
                    </div>
                  </RowInBox>
                </RelativeDiv>
              </ColSpan4>
            }
          </RowSpan>
          <RowSpan>
            <ColSpan4>
              <Span4>광고 그룹명</Span4>
              <RelativeDiv>
                <Input
                  type={'text'}
                  placeholder={'광고 그룹명'}
                  value={campaignGroupInfo.name}
                  {...register('name', {
                    required: '광고 그룹명을 입력해주세요',
                    onChange: (e)=>onChangeGroupName(e)
                  })}
                />
                {errors.name && <ValidationScript>{errors.name.message}</ValidationScript>}
              </RelativeDiv>
            </ColSpan4>
          </RowSpan>
        </BoardSearchResult>
      </Board>
      <SubmitContainer>
        <CancelButton type={'button'} onClick={()=>onCancel()}>{state !== null ? '목록' : '이전'}</CancelButton>
        <SubmitButton type={'submit'}>{state !== null ? '수정' : '다음[3/4]'}</SubmitButton>
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