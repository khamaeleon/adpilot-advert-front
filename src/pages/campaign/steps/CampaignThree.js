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

export function CampaignThree() {
  const [, setStepCampaign] = useAtom(stepCampaignAtom)
  const [campaignBasicInfo] = useAtom(campaignBasicInfoAtom)
  const [campaignGroupInfo, setCampaignGroupInfo] = useAtom(campaignGroupInfoAtom)
  const [exposeDayChecked, setExposeDayChecked] = useState(false)
  const [mediaCategory, setMediaCategory] = useAtom(mediaCategoryAtom)
  const [agentTypeState ,setAgentTypeState] =useState([])
  const [noViewTypeState] =useState(noViewType)
  const [dateRange, setDateRange] = useState([]);
  const [startDate, endDate] = dateRange
  const {register, handleSubmit, reset,setValue, control, formState: {errors}} = useFormContext()

  useEffect(() => {
    if(campaignBasicInfo.step.includes('STEP3_INVENTORY','STEP4_CREATIVE','COMPLETED')){
      selGroupInfo(campaignBasicInfo.campaignId).then(response =>{
        console.log(response)
        setCampaignGroupInfo(response)
        reset(response)
        setDateRange([
          new Date(campaignGroupInfo.startDate !==undefined ? campaignGroupInfo.startDate: getToDay()),
          new Date(campaignGroupInfo.endDate !==undefined ? campaignGroupInfo.endDate: getToDay())
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
        exposeAgentType: campaignGroupInfo.exposeAgentType.concat(event.target.id)
      })
      setValue('exposeAgentType', campaignGroupInfo.exposeAgentType.concat(event.target.id))
    } else {
      setCampaignGroupInfo({
        ...campaignGroupInfo,
        exposeAgentType: campaignGroupInfo.exposeAgentType.filter(value => value !== event.target.id)
      })
      setValue('exposeAgentType', campaignGroupInfo.exposeAgentType.filter(value => value !== event.target.id))
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
  const selectedDisExposeCategory = (selectedCategory) => {
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

  const setExposeInventoryType = (exposeInventoryTypeValue) => {
    setCampaignGroupInfo({
      ...campaignGroupInfo,
      exposeInventoryType: exposeInventoryTypeValue
    })
  }

  const setDisExposeInventoryType = (exposeInventoryTypeValue) => {
    setCampaignGroupInfo({
      ...campaignGroupInfo,
      disExposeInventoryType: exposeInventoryTypeValue
    })
  }

  const handleRangeDate = (date) => {
    setDateRange(date)
  }

  const handleCheckExposeDay =(event) =>{
    setExposeDayChecked(event.target.checked)
    setCampaignGroupInfo({
      ...campaignGroupInfo,
      startDate: dateFormat(new Date(), 'YYYY-MM-DD'),
      endDate:dateFormat(new Date('3000-12-31'), 'YYYY-MM-DD'),
    })
  }

  const setUserTargetConfigType = (userTargetConfigType) =>{
    setCampaignGroupInfo({
      ...campaignGroupInfo,
      userTargetConfigType: userTargetConfigType,
      exposeConversionUser:true,
      exposeShoppingUser:true,
      exposeAttentionUser:true,
      exposeVisitUser:true,
    })
  }
  const handleNoViewType = (noViewType) => {
    setCampaignGroupInfo({
      ...campaignGroupInfo,
      noExposeDaysOfConversionUser: noViewType.value
    })
  }

  const setExposeConversion =(boolExposeConversion)=>{
    setCampaignGroupInfo({
      ...campaignGroupInfo,
      exposeConversionUser: boolExposeConversion
    })
  }

  const setExposeShoppingUser =(boolExposeShoppingUser)=>{
    setCampaignGroupInfo({
      ...campaignGroupInfo,
      exposeShoppingUser: boolExposeShoppingUser
    })
  }

  const setExposeVisitUser =(boolExposeVisitUser)=>{
    setCampaignGroupInfo({
      ...campaignGroupInfo,
      exposeVisitUser: boolExposeVisitUser
    })
  }


  const setExposeAttentionUser =(boolExposeAttentionUser)=>{
    setCampaignGroupInfo({
      ...campaignGroupInfo,
      exposeAttentionUser: boolExposeAttentionUser
    })
  }

  const setAudienceTargetConfigType = (audienceTargetConfigType) =>{
    setCampaignGroupInfo({
      ...campaignGroupInfo,
      audienceTargetConfigType: audienceTargetConfigType,
      exposeConversionAudience:true,
      exposeShoppingAudience:true,
      exposePotentialAudience:true,
      exposeNewAudience:true,
    })
  }
  const handleNoViewTypeAudience = (noViewTypeAudience) => {
    setCampaignGroupInfo({
      ...campaignGroupInfo,
      noExposeDaysOfConversionAudience: noViewTypeAudience.value
    })
  }

  const setExposeConversionAudience =(boolExposeConversionAudience)=>{
    setCampaignGroupInfo({
      ...campaignGroupInfo,
      exposeConversionAudience: boolExposeConversionAudience
    })
  }

  const setExposeShoppingUserAudience =(boolExposeShoppingAudience)=>{
    setCampaignGroupInfo({
      ...campaignGroupInfo,
      exposeShoppingAudience: boolExposeShoppingAudience
    })
  }

  const setExposePotentialAudience =(boolExposePotentialAudience)=>{
    setCampaignGroupInfo({
      ...campaignGroupInfo,
      exposePotentialAudience: boolExposePotentialAudience
    })
  }


  const setExposeNewAudience =(boolExposeNewAudience)=>{
    setCampaignGroupInfo({
      ...campaignGroupInfo,
      exposeNewAudience: boolExposeNewAudience
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
    if(campaignGroupInfo.exposeAgentType.length === 0) {
      toast.warning('노출 영역은 최소한 하나는 입력해주세요')
    } else {
      updateCampaignConfigInventory({...campaignGroupInfo, campaignId: campaignBasicInfo.campaignId}).then(response => {
        if (response) {
          console.log("저장됨")
          setStepCampaign({steps: 3})
        }
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
                                           <Checkbox label={data.label} type={'c'} id={data.value} isChecked={campaignGroupInfo.exposeAgentType.some(event => event === data.value)}
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
                    onClick={() => setExposeInventoryType('AUTO')}
                    checked={campaignGroupInfo.exposeInventoryType === 'AUTO'}
                  />
                  <span>자동 최적화</span>
                </label>
                <label>
                  <input
                    type={'radio'}
                    id={'CATEGORY'}
                    name={'inventory'}
                    onClick={() => setExposeInventoryType('CATEGORY')}
                    checked={campaignGroupInfo.exposeInventoryType === 'CATEGORY'}
                  />
                  <span>카테고리 설정</span>
                </label>
                <ColSpan2>
                  <label>
                    <input
                      type={'radio'}
                      id={'MANUAL'}
                      name={'inventory'}
                      onClick={() => setExposeInventoryType('MANUAL')}
                      checked={campaignGroupInfo.exposeInventoryType === 'MANUAL'}
                    />
                    <span>직접 선택</span>
                  </label>
                  {campaignGroupInfo.exposeInventoryType === 'MANUAL' &&
                    <InventoryButton title={'지면선택'} type={'allow'}/>
                  }
                </ColSpan2>
              </RelativeDiv>
            </ColSpan4>
            {campaignGroupInfo.exposeInventoryType === 'CATEGORY' &&
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
                    onClick={() => setDisExposeInventoryType('NONE')}
                    checked={campaignGroupInfo.disExposeInventoryType === 'NONE'}
                  />
                  <span>없음</span>
                </label>
                <label>
                  <input
                    type={'radio'}
                    id={'CATEGORY'}
                    name={'disInventory'}
                    onClick={() => setDisExposeInventoryType('CATEGORY')}
                    checked={campaignGroupInfo.disExposeInventoryType === 'CATEGORY'}
                  />
                  <span>카테고리 설정</span>
                </label>
                <ColSpan2>
                  <label>
                    <input
                      type={'radio'}
                      id={'MANUAL'}
                      name={'disInventory'}
                      onClick={() => setDisExposeInventoryType('MANUAL')}
                      checked={campaignGroupInfo.disExposeInventoryType === 'MANUAL'}
                    />
                    <span>직접 선택</span>
                  </label>
                  {campaignGroupInfo.disExposeInventoryType === 'MANUAL' &&
                    <InventoryButton title={'지면선택'} type={'disExpose'}/>
                  }
                </ColSpan2>
              </RelativeDiv>
            </ColSpan4>
            {campaignGroupInfo.disExposeInventoryType === 'CATEGORY' &&
              <ColSpan4>
                <Span4></Span4>
                <RelativeDiv>
                  <SelectCategory>
                    {mediaCategory.data.map((item, key) => {
                      return (
                        <CategoryItem
                          active={campaignGroupInfo !== null && campaignGroupInfo.disAllowInventoryCategories.includes(item.value)}
                          key={key} onClick={() => selectedDisExposeCategory(item.value)}>{item.label}</CategoryItem>
                      )
                    })}
                  </SelectCategory>
                </RelativeDiv>
              </ColSpan4>
            }
            <RowSpan>
              <Span4>게재 기간</Span4>
              <ColSpan1>
                <DateContainer disabled={exposeDayChecked}>
                  <CalendarBox>
                    <CalendarIcon/>
                  </CalendarBox>
                  <CustomDatePicker
                    selectsRange={true}
                    disabled={exposeDayChecked}
                    startDate={startDate}
                    endDate={endDate}
                    minDate={new Date()}
                    onChange={(date) => handleRangeDate(date)}
                    dateFormat="yyyy-MM-dd"
                    locale={ko}
                    isClearable={false}
                  />
                </DateContainer>
              </ColSpan1>
              <ColSpan3>
                <label>
                  <input type={'checkbox'}
                         className={'checkbox-type-a'}
                         checked={exposeDayChecked}
                         onClick={handleCheckExposeDay}
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
                                 name={'exposeConversionUser'}
                                 checked={campaignGroupInfo.exposeConversionUser}
                                 onClick={() => setExposeConversion(true)}
                          />
                          <span>노출</span>
                        </label>
                        <label>
                          <input type={'radio'}
                                 name={'exposeConversionUser'}
                                 checked={!campaignGroupInfo.exposeConversionUser}
                                 onClick={() => setExposeConversion(false)}
                          />
                          <span>미노출</span>
                        </label>
                      </div>
                      <div>
                        <Select styles={smallStyle}
                                placeholder={'미노출기간 선택'}
                                options={noViewTypeState}
                                value={noViewTypeState.find(item =>item.value === campaignGroupInfo.noExposeDaysOfConversionUser)}
                                onChange={handleNoViewType}
                        />
                      </div>
                      {/*<div>
                        <SmallInput>
                          <input type={'text'}
                                 readOnly={selectNoViewTypeState.value !== 'DIRECT'}
                                 onChange={handleNoExposeDays}
                                 value={campaignGroupInfo.noExposeDaysOfConversionUser}
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
                                 name={'exposeShoppingUser'}
                                 checked={campaignGroupInfo.exposeShoppingUser}
                                 onClick={() => setExposeShoppingUser(true)}
                          />
                          <span>노출</span>
                        </label>
                        <label>
                          <input type={'radio'}
                                 name={'exposeShoppingUser'}
                                 checked={!campaignGroupInfo.exposeShoppingUser}
                                 onClick={() => setExposeShoppingUser(false)}
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
                                 name={'exposeAttentionUser'}
                                 checked={campaignGroupInfo.exposeAttentionUser}
                                 onClick={() => setExposeAttentionUser(true)}
                          />
                          <span>노출</span>
                        </label>
                        <label>
                          <input type={'radio'}
                                 name={'exposeAttentionUser'}
                                 checked={!campaignGroupInfo.exposeAttentionUser}
                                 onClick={() => setExposeAttentionUser(false)}
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
                                 name={'exposeVisitUser'}
                                 checked={campaignGroupInfo.exposeVisitUser}
                                 onClick={() => setExposeVisitUser(true)}
                          />
                          <span>노출</span>
                        </label>
                        <label>
                          <input type={'radio'}
                                 name={'exposeVisitUser'}
                                 checked={!campaignGroupInfo.exposeVisitUser}
                                 onClick={() => setExposeVisitUser(false)}
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
                                 name={'exposeConversionAudience'}
                                 checked={campaignGroupInfo.exposeConversionAudience}
                                 onClick={() => setExposeConversionAudience(true)}
                          />
                          <span>노출</span>
                        </label>
                        <label>
                          <input type={'radio'}
                                 name={'exposeConversionAudience'}
                                 checked={!campaignGroupInfo.exposeConversionAudience}
                                 onClick={() => setExposeConversionAudience(false)}
                          />
                          <span>미노출</span>
                        </label>
                      </div>
                      <div>
                        <Select styles={smallStyle}
                                placeholder={'미노출기간 선택'}
                                options={noViewTypeState}
                                value={noViewTypeState.find(item =>item.value === campaignGroupInfo.noExposeDaysOfConversionAudience)}
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
                                 name={'exposeShoppingAudience'}
                                 checked={campaignGroupInfo.exposeShoppingAudience}
                                 onClick={() => setExposeShoppingUserAudience(true)}
                          />
                          <span>노출</span>
                        </label>
                        <label>
                          <input type={'radio'}
                                 name={'exposeShoppingAudience'}
                                 checked={!campaignGroupInfo.exposeShoppingAudience}
                                 onClick={() => setExposeShoppingUserAudience(false)}
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
                                 name={'exposePotentialAudience'}
                                 checked={campaignGroupInfo.exposePotentialAudience}
                                 onClick={() => setExposePotentialAudience(true)}
                          />
                          <span>노출</span>
                        </label>
                        <label>
                          <input type={'radio'}
                                 name={'exposePotentialAudience'}
                                 checked={!campaignGroupInfo.exposePotentialAudience}
                                 onClick={() => setExposePotentialAudience(false)}
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
                                 name={'exposeNewAudience'}
                                 checked={campaignGroupInfo.exposeNewAudience}
                                 onClick={() => setExposeNewAudience(true)}
                          />
                          <span>노출</span>
                        </label>
                        <label>
                          <input type={'radio'}
                                 name={'exposeNewAudience'}
                                 checked={!campaignGroupInfo.exposeNewAudience}
                                 onClick={() => setExposeNewAudience(false)}
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
        <CancelButton type={'button'} onClick={() => setStepCampaign({steps: 1})}>취소</CancelButton>
        <SubmitButton type={'submit'}>다음[3/4]</SubmitButton>
      </SubmitContainer>
    </form>
  )
}