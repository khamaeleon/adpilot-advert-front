import React, {useEffect, useState} from "react";
import {getToDay} from "../../../common/DateUtils";
import {
  AgentType,
  Board,
  BoardHeader,
  BoardSearchResult,
  CalendarBox,
  CalendarIcon,
  CancelButton,
  ColSpan1,
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
import {CategoryItem, RowInBox, SelectCategory} from "../styles/common";
import ko from "date-fns/locale/ko";
import Select from "react-select";
import {InventoryButton} from "../../../components/modal/InventorySettings";
import {Controller, useFormContext} from "react-hook-form";
import {useAtom} from "jotai";
import {stepCampaignAtom} from "../entity";
import {campaignBasicInfoAtom} from "../entity/Info";
import {selGroupInfo, selMediaCategoryInfo, updateCampaignConfigInventory} from "../../../services/campaign/GroupAxios";
import {campaignGroupInfoAtom, mediaCategoryAtom, noViewType} from "../entity/Group";
import {dateFormat} from "../../../common/StringUtils";
import {selEnumInfo} from "../../../services/campaign/InfoAxios";
import {toast} from "react-toastify";
import {useLocation, useNavigate} from "react-router-dom";

export function CampaignThree() {
  const [, setStepCampaign] = useAtom(stepCampaignAtom)
  const [campaignBasicInfo] = useAtom(campaignBasicInfoAtom)
  const [campaignGroupInfo, setCampaignGroupInfo] = useAtom(campaignGroupInfoAtom)
  const [exposureDayChecked, setExposureDayChecked] = useState(false)
  const [mediaCategory, setMediaCategory] = useAtom(mediaCategoryAtom)
  const [agentTypeState ,setAgentTypeState] =useState([])
  const [noViewTypeState] =useState(noViewType)
  const [dateRange, setDateRange] = useState([]);
  const [startDate, endDate] = dateRange
  const {register, handleSubmit, reset,setValue, control, formState: {errors}} = useFormContext()
  const {state} =useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    if((campaignBasicInfo.step !== undefined && campaignBasicInfo.step.includes('STEP3_INVENTORY','STEP4_CREATIVE','COMPLETED')) || state !== null){
      let campaignId = state !== null ? state.campaignId : campaignBasicInfo.campaignId
        selGroupInfo(campaignId).then(response =>{
          const data = {
            ...response,
            exposureConversionUserYn: response.exposureConversionUserYn === 'Y',
            exposureShoppingUserYn: response.exposureShoppingUserYn === 'Y',
            exposureAttentionUserYn: response.exposureAttentionUserYn === 'Y',
            exposureVisitUserYn: response.exposureVisitUserYn === 'Y',
            exposureConversionAudienceYn: response.exposureConversionAudienceYn === 'Y',
            exposureShoppingAudienceYn: response.exposureShoppingAudienceYn === 'Y',
            exposurePotentialAudienceYn: response.exposurePotentialAudienceYn === 'Y',
            exposureNewAudienceYn: response.exposureNewAudienceYn === 'Y',
          }

          setCampaignGroupInfo(data)
          reset(data)
          setDateRange([
            new Date(data.startDate !==undefined ? data.startDate: getToDay()),
            new Date(data.endDate !==undefined ? data.endDate: getToDay())
          ])
      })
    }
    selMediaCategoryInfo().then(response => {
      if (response) {
        setMediaCategory(response)
      }
    })
    selEnumInfo('AGENT_TYPE').then(response => {
      setAgentTypeState(response.data)
    })
  }, [])

  useEffect(() => {
    setCampaignGroupInfo({
      ...campaignGroupInfo,
      startDate: dateFormat(startDate, 'YYYY-MM-DD'),
      endDate:dateFormat(endDate, 'YYYY-MM-DD'),
    })
  },[dateRange])

  const handleAgentType = (event) => {
    if (event.target.checked) {
      setCampaignGroupInfo({
        ...campaignGroupInfo,
        exposureAgentType: campaignGroupInfo.exposureAgentType.concat(event.target.id)
      })
      setValue('exposureAgentType', campaignGroupInfo.exposureAgentType.concat(event.target.id))
    } else {
      setCampaignGroupInfo({
        ...campaignGroupInfo,
        exposureAgentType: campaignGroupInfo.exposureAgentType.filter(value => value !== event.target.id)
      })
      setValue('exposureAgentType', campaignGroupInfo.exposureAgentType.filter(value => value !== event.target.id))
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
  }
  const selectedDisExposureCategory = (selectedCategory) => {
    let boolCategory = campaignGroupInfo.disAllowInventoryCategories.includes(selectedCategory)
    console.log(boolCategory)
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
  }

  const setExposureInventoryType = (exposureInventoryType) => {
    setCampaignGroupInfo({
      ...campaignGroupInfo,
      exposureInventoryType: exposureInventoryType
    })
  }

  const setDisExposureInventoryType = (exposureInventoryType) => {
    setCampaignGroupInfo({
      ...campaignGroupInfo,
      disExposureInventoryType: exposureInventoryType
    })
  }

  const handleRangeDate = (date) => {
    setDateRange(date)
  }

  const handleCheckExposureDay = (event) =>{
    setExposureDayChecked(event.target.checked)
    setCampaignGroupInfo({
      ...campaignGroupInfo,
      startDate: dateFormat(new Date(), 'YYYY-MM-DD'),
      endDate:dateFormat(new Date('3000-12-31'), 'YYYY-MM-DD'),
    })
    if(event.target.checked){
      setDateRange([
        new Date(),
        new Date('3000-12-31'),
      ])
    } else {
      setDateRange([])
    }
  }

  const setUserTargetConfigType = (userTargetConfigType) =>{
    setCampaignGroupInfo({
      ...campaignGroupInfo,
      userTargetConfigType: userTargetConfigType,
      exposureConversionUserYn:true,
      exposureShoppingUserYn:true,
      exposureAttentionUserYn:true,
      exposureVisitUserYn:true,
    })
  }
  const handleNoViewType = (noViewType) => {
    setCampaignGroupInfo({
      ...campaignGroupInfo,
      nonExposureDaysOfConversionUser: noViewType.value
    })
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
      exposureConversionAudienceYn:true,
      exposureShoppingAudienceYn:true,
      exposurePotentialAudienceYn:true,
      exposureNewAudienceYn:true,
    })
  }
  const handleNoViewTypeAudience = (noViewTypeAudience) => {
    setCampaignGroupInfo({
      ...campaignGroupInfo,
      nonExposureDaysOfConversionAudience: noViewTypeAudience.value
    })
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
  }
  const onSubmit = (data) => {
    console.log(campaignGroupInfo);
    if(campaignGroupInfo.exposureAgentType.length === 0) {
      toast.warning('노출 영역은 최소한 하나는 입력해주세요')
    } else {
      let campaignId = state !== null ? state.campaignId : campaignBasicInfo.campaignId
      updateCampaignConfigInventory({...campaignGroupInfo, campaignId: campaignId}).then(response => {
        if (response) {
          console.log("저장됨")
          state !== null ? navigate('/board/dashboard') : setStepCampaign({steps: 3})
        }
      })
    }
  }

  const onError = (error) => console.log(error)

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
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
                      return <Controller name={'eventChecked'}
                                         control={control}
                                         key={key}
                                         render={({field}) =>
                                           <Checkbox label={data.label} type={'c'} id={data.value} isChecked={campaignGroupInfo.exposureAgentType.some(event => event === data.value)}
                                                     onChange={handleAgentType} inputRef={field.ref}/>}/>
                    })
                  }
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
                    id={'AUTO'}
                    onClick={() => setExposureInventoryType('AUTO')}
                    checked={campaignGroupInfo.exposureInventoryType === 'AUTO'}
                  />
                  <span>자동 최적화</span>
                </label>
                <label>
                  <input
                    type={'radio'}
                    id={'CATEGORY'}
                    name={'inventory'}
                    onClick={() => setExposureInventoryType('CATEGORY')}
                    checked={campaignGroupInfo.exposureInventoryType === 'CATEGORY'}
                  />
                  <span>카테고리 설정</span>
                </label>
                <ColSpan2>
                  <label>
                    <input
                      type={'radio'}
                      id={'MANUAL'}
                      name={'inventory'}
                      onClick={() => setExposureInventoryType('MANUAL')}
                      checked={campaignGroupInfo.exposureInventoryType === 'MANUAL'}
                    />
                    <span>직접 선택</span>
                  </label>
                  {campaignGroupInfo.exposureInventoryType === 'MANUAL' &&
                    <InventoryButton title={'지면선택'} type={'allow'}/>
                  }
                </ColSpan2>
              </RelativeDiv>
            </ColSpan4>
            {campaignGroupInfo.exposureInventoryType === 'CATEGORY' &&
              <ColSpan4>
                <Span4></Span4>
                <RelativeDiv>
                  <SelectCategory>
                    {mediaCategory.data.map((item, key) => {
                      return (
                        <CategoryItem
                          active={campaignGroupInfo !== null && campaignGroupInfo.allowInventoryCategories.includes(item.value)}
                          key={key} onClick={() => selectedCategory(item.value)}>{item.label}</CategoryItem>
                      )
                    })}
                  </SelectCategory>
                </RelativeDiv>
              </ColSpan4>
            }
            <ColSpan4>
              <Span4>송출 제한 지면 설정</Span4>
              <RelativeDiv>
                <label>
                  <input
                    type={'radio'}
                    name={'disInventory'}
                    id={'NONE'}
                    onClick={() => setDisExposureInventoryType('NONE')}
                    checked={campaignGroupInfo.disExposureInventoryType === 'NONE'}
                  />
                  <span>없음</span>
                </label>
                <label>
                  <input
                    type={'radio'}
                    id={'CATEGORY'}
                    name={'disInventory'}
                    onClick={() => setDisExposureInventoryType('CATEGORY')}
                    checked={campaignGroupInfo.disExposureInventoryType === 'CATEGORY'}
                  />
                  <span>카테고리 설정</span>
                </label>
                <ColSpan2>
                  <label>
                    <input
                      type={'radio'}
                      id={'MANUAL'}
                      name={'disInventory'}
                      onClick={() => setDisExposureInventoryType('MANUAL')}
                      checked={campaignGroupInfo.disExposureInventoryType === 'MANUAL'}
                    />
                    <span>직접 선택</span>
                  </label>
                  {campaignGroupInfo.disExposureInventoryType === 'MANUAL' &&
                    <InventoryButton title={'지면선택'} type={'disExposure'}/>
                  }
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
                </RelativeDiv>
              </ColSpan4>
            }
            <RowSpan>
              <Span4>게재 기간</Span4>
              <ColSpan1>
                <DateContainer disabled={exposureDayChecked}>
                  <CalendarBox>
                    <CalendarIcon/>
                  </CalendarBox>
                  <Controller
                    control={control}
                    name="endDate"
                    rules={{required: {value: dateRange[1] === undefined, message:'게제기간을 설정해주세요'}}}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <CustomDatePicker
                        selectsRange={true}
                        disabled={exposureDayChecked}
                        startDate={startDate}
                        endDate={endDate}
                        minDate={new Date()}
                        onChange={(date) => handleRangeDate(date)}
                        dateFormat="yyyy-MM-dd"
                        locale={ko}
                        isClearable={false}
                        onBlur={onBlur}
                        selected={value}
                        inputRef={ref}
                      />
                    )}
                  />
                  {errors.endDate && <ValidationScript>{errors.endDate.message}</ValidationScript>}
                </DateContainer>

              </ColSpan1>
              <ColSpan3>
                <label>
                  <input type={'checkbox'}
                         className={'checkbox-type-a'}
                         checked={exposureDayChecked}
                         onClick={handleCheckExposureDay}
                  />
                  <i/>
                  <span>종료일 미설정</span>
                </label>
              </ColSpan3>
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
                    id={'AUTO'}
                    onClick={() => setUserTargetConfigType('AUTO')}
                    checked={campaignGroupInfo.userTargetConfigType === 'AUTO'}
                  />
                  <span>자동 최적화</span>
                </label>
                <label>
                  <input
                    type={'radio'}
                    name={'targetCustomer'}
                    id={'MANUAL'}
                    onClick={() => setUserTargetConfigType('MANUAL')}
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
                                 checked={campaignGroupInfo.exposureConversionUserYn}
                                 onClick={() => setExposureConversion(true)}
                          />
                          <span>노출</span>
                        </label>
                        <label>
                          <input type={'radio'}
                                 name={'exposureConversionUser'}
                                 checked={!campaignGroupInfo.exposureConversionUserYn}
                                 onClick={() => setExposureConversion(false)}
                          />
                          <span>미노출</span>
                        </label>
                      </div>
                      <div>
                        <Select styles={smallStyle}
                                placeholder={'미노출기간 선택'}
                                options={noViewTypeState}
                                value={noViewTypeState.find(item =>item.value === campaignGroupInfo.nonExposureDaysOfConversionUser)}
                                onChange={handleNoViewType}
                        />
                      </div>
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
                                 checked={campaignGroupInfo.exposureShoppingUserYn}
                                 onClick={() => setExposureShoppingUser(true)}
                          />
                          <span>노출</span>
                        </label>
                        <label>
                          <input type={'radio'}
                                 name={'exposureShoppingUser'}
                                 checked={!campaignGroupInfo.exposureShoppingUserYn}
                                 onClick={() => setExposureShoppingUser(false)}
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
                                 checked={campaignGroupInfo.exposureAttentionUserYn}
                                 onClick={() => setExposureAttentionUser(true)}
                          />
                          <span>노출</span>
                        </label>
                        <label>
                          <input type={'radio'}
                                 name={'exposureAttentionUser'}
                                 checked={!campaignGroupInfo.exposureAttentionUserYn}
                                 onClick={() => setExposureAttentionUser(false)}
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
                                 checked={campaignGroupInfo.exposureVisitUserYn}
                                 onClick={() => setExposureVisitUser(true)}
                          />
                          <span>노출</span>
                        </label>
                        <label>
                          <input type={'radio'}
                                 name={'exposureVisitUser'}
                                 checked={!campaignGroupInfo.exposureVisitUserYn}
                                 onClick={() => setExposureVisitUser(false)}
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
                    id={'AUTO'}
                    onClick={() => setAudienceTargetConfigType('AUTO')}
                    checked={campaignGroupInfo.audienceTargetConfigType === 'AUTO'}
                  />
                  <span>자동 최적화</span>
                </label>
                <label>
                  <input
                    type={'radio'}
                    name={'audienceTargetData'}
                    id={'AUTO'}
                    onClick={() => setAudienceTargetConfigType('MANUAL')}
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
                                 checked={campaignGroupInfo.exposureConversionAudienceYn}
                                 onClick={() => setExposureConversionAudience(true)}
                          />
                          <span>노출</span>
                        </label>
                        <label>
                          <input type={'radio'}
                                 name={'exposureConversionAudience'}
                                 checked={!campaignGroupInfo.exposureConversionAudienceYn}
                                 onClick={() => setExposureConversionAudience(false)}
                          />
                          <span>미노출</span>
                        </label>
                      </div>
                      <div>
                        <Select styles={smallStyle}
                                placeholder={'미노출기간 선택'}
                                options={noViewTypeState}
                                value={noViewTypeState.find(item =>item.value === campaignGroupInfo.nonExposureDaysOfConversionAudience)}
                                onChange={handleNoViewTypeAudience}
                        />
                      </div>
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
                                 checked={campaignGroupInfo.exposureShoppingAudienceYn}
                                 onClick={() => setExposureShoppingUserAudience(true)}
                          />
                          <span>노출</span>
                        </label>
                        <label>
                          <input type={'radio'}
                                 name={'exposureShoppingAudience'}
                                 checked={!campaignGroupInfo.exposureShoppingAudienceYn}
                                 onClick={() => setExposureShoppingUserAudience(false)}
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
                                 checked={campaignGroupInfo.exposurePotentialAudienceYn}
                                 onClick={() => setExposurePotentialAudience(true)}
                          />
                          <span>노출</span>
                        </label>
                        <label>
                          <input type={'radio'}
                                 name={'exposurePotentialAudience'}
                                 checked={!campaignGroupInfo.exposurePotentialAudienceYn}
                                 onClick={() => setExposurePotentialAudience(false)}
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
                                 checked={campaignGroupInfo.exposureNewAudienceYn}
                                 onClick={() => setExposureNewAudience(true)}
                          />
                          <span>노출</span>
                        </label>
                        <label>
                          <input type={'radio'}
                                 name={'exposureNewAudience'}
                                 checked={!campaignGroupInfo.exposureNewAudienceYn}
                                 onClick={() => setExposureNewAudience(false)}
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
            <Span4>광고그룹명</Span4>
            <RelativeDiv>
              <Input
                type={'text'}
                placeholder={'광고 그룹명'}
                value={campaignGroupInfo.name}
                {...register('name', {
                  required: '광고 그룹명을 입력해주세요',
                  onChange:onChangeGroupName
                })}
              />
              {errors.name && <ValidationScript>{errors.name.message}</ValidationScript>}
            </RelativeDiv>
          </RowSpan>
        </BoardSearchResult>
      </Board>
      <SubmitContainer>
        <CancelButton type={'button'} onClick={() => state !== null ? navigate('/board/dashboard') : setStepCampaign({steps: 1})}>취소</CancelButton>
        <SubmitButton type={'submit'}>{state !== null ? '수정' : '다음[3/4]'}</SubmitButton>
      </SubmitContainer>
    </form>
  )
}