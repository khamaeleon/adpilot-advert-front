import React, {useEffect, useState} from "react";
import {getThisMonth, getToDay} from "../../../common/DateUtils";
import {
  AgentType,
  Board,
  BoardHeader,
  BoardSearchResult,
  CalendarBox,
  CalendarIcon,
  CancelButton,
  ColSpan2,
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
import {CategoryItem, Day, RowInBox, SelectCategory, SmallInput} from "../styles/common";
import ko from "date-fns/locale/ko";
import DragToSelect from "../../../components/common/DragToSelect";
import Select from "react-select";
import {InventoryButton} from "../../../components/modal/InventorySettings";
import {Controller, useFormContext} from "react-hook-form";
import {useAtom} from "jotai";
import {stepCampaignAtom} from "../entity";
import {campaignBasicInfoAtom} from "../entity/Info";
import {selMediaCategoryInfo} from "../../../services/campaign/GroupAxios";
import {campaignGroupInfoAtom, mediaCategoryAtom} from "../entity/Group";

export function CampaignThree() {
  const [stepCampaign, setStepCampaign] = useAtom(stepCampaignAtom)
  const [campaignBasicInfo, setCampaignBasicInfo] = useAtom(campaignBasicInfoAtom)
  const [campaignGroupInfo, setCampaignGroupInfo] = useAtom(campaignGroupInfoAtom)

  const [mediaCategory, setMediaCategory] = useAtom(mediaCategoryAtom)
  const [dateRange, setDateRange] = useState([ new Date(getThisMonth().startDay), new Date(getToDay())]);
  const [startDate, endDate] = dateRange
  const {register,handleSubmit ,setValue,control, formState:{errors}} = useFormContext()
  const [checked, setChecked] = useState({
    WEB: true,
    WEB_APP: true,
    MOBILE_WEB: true,
    MOBILE_NATIVE_APP: true,
  })

  useEffect(()=>{
    setCampaignGroupInfo({
      ...campaignGroupInfo,
      campaignId: campaignBasicInfo.campaignId
    })
    selMediaCategoryInfo().then(response => {
      if(response){
        setMediaCategory(response)
      }
    })
  },[])

  const [stepThree, setStepThree] = useState({
    adGroup: '',
    agentType: ['WEB','WEB_APP','MOBILE_WEB','MOBILE_NATIVE_APP'],
    inventory: {
      type:'auto',
      value: null
    },
    confine: '',
    startDate: '',
    endDate: '',
    customInventory: {
      type:'auto',
      value: null
    },
    targetCustomer: {
      type:'auto',
      value: null
    },
    targetUserData: {
      type:'auto',
      value: null
    },
    adGroupName: ''
  })
  const handleNextStep = () => {
    setStepCampaign({
      steps:3
    })
  }

  const handleAgentType = (event) => {
    switch (event.target.id) {
      case 'WEB' : setChecked({...checked, WEB: event.target.checked});break;
      case 'WEB_APP' : setChecked({...checked, WEB_APP: event.target.checked});break;
      case 'MOBILE_WEB' : setChecked({...checked, MOBILE_WEB: event.target.checked});break;
      case 'MOBILE_NATIVE_APP' : setChecked({...checked, MOBILE_NATIVE_APP: event.target.checked});break;
      default : return null
    }

    if(event.target.checked){
      setCampaignGroupInfo({
        ...campaignGroupInfo,
        exposeAgentType: campaignGroupInfo.exposeAgentType.concat(event.target.id)
      })
      setValue('exposeAgentType', campaignGroupInfo.exposeAgentType.concat(event.target.id))
    }else{
      setCampaignGroupInfo({
        ...campaignGroupInfo,
        exposeAgentType: campaignGroupInfo.exposeAgentType.filter(value => value !== event.target.id)
      })
      setValue('exposeAgentType', campaignGroupInfo.exposeAgentType.filter(value => value !== event.target.id))
    }
  }
  const selectedCategory = (selectedCategory) => {
    let boolCategory = campaignGroupInfo.allowInventoryCategories.includes(selectedCategory)
    console.log(boolCategory)
    if(!boolCategory){
      setCampaignGroupInfo({
        ...campaignGroupInfo,
        allowInventoryCategories:campaignGroupInfo.allowInventoryCategories.concat(selectedCategory)
      })
    }else{
      setCampaignGroupInfo({
        ...campaignGroupInfo,
        allowInventoryCategories:campaignGroupInfo.allowInventoryCategories.filter(value => value !== selectedCategory)
      })
    }
  }
  const setExposeInventoryType = (exposeInventoryTypeValue) =>{
    setCampaignGroupInfo({
      ...campaignGroupInfo,
      exposeInventoryType:exposeInventoryTypeValue
    })
  }

  const onSubmit = (data) => {
    console.log(data);
    setStepCampaign({steps:3})
  }

  return(
    <form onSubmit={handleSubmit(onSubmit)}>
      <Board>
        <BoardHeader>광고 그룹 설정</BoardHeader>
        <BoardSearchResult>
          <RowSpan>
            <ColSpan4>
              <Span4>노출 영역</Span4>
              <RelativeDiv>
                <AgentType>
                  <Controller name={'agentChecked'}
                              control={control}
                              render={({field}) =>
                                <Checkbox {...field} label={'PC 웹'} type={'c'} id={'WEB'} isChecked={checked.WEB}
                                          onChange={handleAgentType} inputRef={field.ref}/>}/>

                  <Controller name={'agentChecked'}
                              control={control}
                              render={({field}) =>
                                <Checkbox label={'PC 어플리케이션'} type={'c'} id={'WEB_APP'} isChecked={checked.WEB_APP}
                                          onChange={handleAgentType} inputRef={field.ref}/>}/>
                  <Controller name={'agentChecked'}
                              control={control}
                              render={({field}) =>
                                <Checkbox label={'모바일 웹'} type={'c'} id={'MOBILE_WEB'} isChecked={checked.MOBILE_WEB}
                                          onChange={handleAgentType} inputRef={field.ref}/>}/>
                  <Controller name={'agentChecked'}
                              control={control}
                              render={({field}) =>
                                <Checkbox label={'모바일 APP'} type={'c'} id={'MOBILE_NATIVE_APP'} isChecked={checked.MOBILE_NATIVE_APP}
                                          onChange={handleAgentType} inputRef={field.ref}/>}/>
                </AgentType>
              </RelativeDiv>
            </ColSpan4>
          </RowSpan>
          <RowSpan>
            <ColSpan4>
              <Span4>광고 게재 설정</Span4>
            </ColSpan4>
          </RowSpan>
          <RowSpan box={true} column={true} style={{backgroundColor:'#ffffff'}}>
            <ColSpan4>
              <Span4>게제 지면</Span4>
              <RelativeDiv>
                <label>
                  <input
                    type={'radio'}
                    name={'inventory'}
                    id={'AUTO'}
                    onClick={()=>setExposeInventoryType('AUTO')}
                    checked={campaignGroupInfo.exposeInventoryType==='AUTO'}
                  />
                  <span>자동 최적화</span>
                </label>
                <label>
                  <input
                    type={'radio'}
                    id={'CATEGORY'}
                    name={'inventory'}
                    onClick={()=>setExposeInventoryType('CATEGORY')}
                    checked={campaignGroupInfo.exposeInventoryType==='CATEGORY'}
                  />
                  <span>카테고리 설정</span>
                </label>
                <ColSpan2>
                  <label>
                    <input
                      type={'radio'}
                      id={'MANUAL'}
                      name={'inventory'}
                      onClick={()=>setExposeInventoryType('MANUAL')}
                      checked={campaignGroupInfo.exposeInventoryType==='MANUAL'}
                    />
                    <span>직접 선택</span>
                  </label>
                  {campaignGroupInfo.exposeInventoryType === 'MANUAL' &&
                  <InventoryButton title={'지면선택'}/>
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
                        <CategoryItem active={campaignGroupInfo !==null && campaignGroupInfo.allowInventoryCategories.includes(item.value)} key={key} onClick={()=>selectedCategory(item.value)} >{item.label}</CategoryItem>
                      )
                    })}
                  </SelectCategory>
                </RelativeDiv>
              </ColSpan4>
            }
            <ColSpan4>
              <Span4>송출 제한 지면 설정</Span4>
              <RelativeDiv>
                <InventoryButton title={'지면선택'}/>
              </RelativeDiv>
            </ColSpan4>
            <ColSpan4>
              <Span4>게재 기간</Span4>
              <RelativeDiv>
                <DateContainer>
                  <CalendarBox>
                    <CalendarIcon/>
                  </CalendarBox>
                  <CustomDatePicker
                    selectsRange={true}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(date) => setDateRange(date)}
                    dateFormat="yyyy-MM-dd"
                    locale={ko}
                    isClearable={false}
                  />
                </DateContainer>
                <label>
                  <input type={'checkbox'} className={'checkbox-type-a'}/>
                  <i/>
                  <span>종료일 미설정</span>
                </label>
              </RelativeDiv>
            </ColSpan4>
            {stepThree.customInventory.type === 'custom' &&
              <ColSpan4>
                <Span4></Span4>
                <RelativeDiv box={true} column={true}>
                  <p style={{color: '#ccc',marginBottom: 10}}>Drag & Drop으로 원하는 요일 및 시간을 설정하세요.</p>
                  <DragToSelect/>
                </RelativeDiv>
              </ColSpan4>
            }
          </RowSpan>
          <RowSpan>
            <ColSpan4>
              <Span4>타게팅 설정</Span4>
            </ColSpan4>
          </RowSpan>
          <RowSpan box={true} column={true} style={{backgroundColor:'#ffffff'}}>
            <ColSpan4>
              <Span4>고객 정보 기반 설정</Span4>
              <RelativeDiv>
                <label>
                  <input
                    type={'radio'}
                    name={'targetCustomer'}
                    value={'auto'}
                    onClick={()=>setStepThree({...stepThree, targetCustomer: {type:'auto'}})}
                    {...register('targetCustomer',{value: stepThree.targetCustomer.type})}
                  />
                  <span>자동 최적화</span>
                </label>
                <label>
                  <input
                    type={'radio'}
                    name={'targetCustomer'}
                    value={'custom'}
                    onClick={()=>setStepThree({...stepThree, targetCustomer: {type:'custom'}})}
                    {...register('targetCustomer',{value: stepThree.targetCustomer.type})}
                  />
                  <span>개별 설정</span>
                </label>
              </RelativeDiv>
            </ColSpan4>
            {stepThree.targetCustomer.type === 'custom' &&
              <ColSpan4>
                <Span4></Span4>
                <RelativeDiv box={true} column={true}>
                  <RowInBox>
                    <div>
                      <span>전환 유저</span>
                      <span style={{color:'#ccc'}}>광고주 상품을 구매한 고객을 대상으로 정책 설정</span>
                    </div>
                    <div>
                      <div>
                        <label>
                          <input type={'radio'} name={'radio-a'}/>
                          <span>노출</span>
                        </label>
                        <label>
                          <input type={'radio'} name={'radio-a'}/>
                          <span>미노출</span>
                        </label>
                      </div>
                      <div>
                        <Select styles={smallStyle} options={[{key:0,value:'',label:'노출 기간 선택'}]}/>
                      </div>
                      <div>
                        <SmallInput>
                          <input type={'text'}/>
                          <Day/>
                        </SmallInput>
                      </div>
                      <span style={{color:'#ccc'}}>90일 이하 설정</span>
                    </div>
                  </RowInBox>
                  <RowInBox>
                    <div>
                      <span>쇼핑 고객</span>
                      <span style={{color:'#ccc'}}>쇼핑을 진행한 고객을 대상으로 광고 노출</span>
                    </div>
                    <div>
                      <div>
                        <label>
                          <input type={'radio'} name={'radio-b'}/>
                          <span>노출</span>
                        </label>
                        <label>
                          <input type={'radio'} name={'radio-b'}/>
                          <span>미노출</span>
                        </label>
                      </div>
                    </div>
                  </RowInBox>
                  <RowInBox>
                    <div>
                      <span>관심 고객</span>
                      <span style={{color:'#ccc'}}>쇼핑을 진행한 고객을 대상으로 광고 노출</span>
                    </div>
                    <div>
                      <div>
                        <label>
                          <input type={'radio'} name={'radio-c'}/>
                          <span>노출</span>
                        </label>
                        <label>
                          <input type={'radio'} name={'radio-c'}/>
                          <span>미노출</span>
                        </label>
                      </div>
                    </div>
                  </RowInBox>
                  <RowInBox>
                    <div>
                      <span>방문 고객</span>
                      <span style={{color:'#ccc'}}>쇼핑을 진행한 고객을 대상으로 광고 노출</span>
                    </div>
                    <div>
                      <div>
                        <label>
                          <input type={'radio'} name={'radio-d'}/>
                          <span>노출</span>
                        </label>
                        <label>
                          <input type={'radio'} name={'radio-d'}/>
                          <span>미노출</span>
                        </label>
                      </div>
                    </div>
                  </RowInBox>
                </RelativeDiv>
              </ColSpan4>
            }
            <ColSpan4>
              <Span4>유저 데이터 분석 설정</Span4>
              <RelativeDiv>
                <label>
                  <input
                    type={'radio'}
                    name={'targetUserData'}
                    value={'auto'}
                    onClick={()=>setStepThree({...stepThree, targetUserData: {type:'auto'}})}
                    {...register('targetUserData',{value: stepThree.targetUserData.type})}
                  />
                  <span>자동 최적화</span>
                </label>
                <label>
                  <input
                    type={'radio'}
                    name={'targetUserData'}
                    value={'custom'}
                    onClick={()=>setStepThree({...stepThree, targetUserData: {type:'custom'}})}
                    {...register('targetUserData',{value: stepThree.targetUserData.type})}
                  />
                  <span>개별 설정</span>
                </label>
              </RelativeDiv>
            </ColSpan4>
            {stepThree.targetUserData.type === 'custom'&&
              <ColSpan4>
                <Span4></Span4>
                <RelativeDiv box={true} column={true}>
                  <RowInBox>
                    <div>
                      <span>전환 유저</span>
                      <span style={{color:'#ccc'}}>광고주 상품을 구매한 고객을 대상으로 정책 설정</span>
                    </div>
                    <div>
                      <div>
                        <label>
                          <input type={'radio'} name={'radio-e'}/>
                          <span>노출</span>
                        </label>
                        <label>
                          <input type={'radio'} name={'radio-e'}/>
                          <span>미노출</span>
                        </label>
                      </div>
                    </div>
                  </RowInBox>
                  <RowInBox>
                    <div>
                      <span>쇼핑 고객</span>
                      <span style={{color:'#ccc'}}>쇼핑을 진행한 고객을 대상으로 광고 노출</span>
                    </div>
                    <div>
                      <div>
                        <label>
                          <input type={'radio'} name={'radio-f'}/>
                          <span>노출</span>
                        </label>
                        <label>
                          <input type={'radio'} name={'radio-f'}/>
                          <span>미노출</span>
                        </label>
                      </div>
                    </div>
                  </RowInBox>
                  <RowInBox>
                    <div>
                      <span>관심 고객</span>
                      <span style={{color:'#ccc'}}>쇼핑을 진행한 고객을 대상으로 광고 노출</span>
                    </div>
                    <div>
                      <div>
                        <label>
                          <input type={'radio'} name={'radio-g'}/>
                          <span>노출</span>
                        </label>
                        <label>
                          <input type={'radio'} name={'radio-g'}/>
                          <span>미노출</span>
                        </label>
                      </div>
                    </div>
                  </RowInBox>
                  <RowInBox>
                    <div>
                      <span>방문 고객</span>
                      <span style={{color:'#ccc'}}>쇼핑을 진행한 고객을 대상으로 광고 노출</span>
                    </div>
                    <div>
                      <div>
                        <label>
                          <input type={'radio'} name={'radio-h'}/>
                          <span>노출</span>
                        </label>
                        <label>
                          <input type={'radio'} name={'radio-h'}/>
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
                {...register('adGroupName',{
                  required: {
                    value: stepThree.adGroupName === '',
                    message: '광고 그룹명을 입력해주세요'
                  }
                })}
              />
              {errors.adGroupName && <ValidationScript>{errors.adGroupName.message}</ValidationScript>}
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