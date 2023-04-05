import React, {useEffect, useState} from "react";
import {getThisMonth, getToDay} from "../../../common/DateUtils";
import {retrieveTopLevelCategory} from "../../../services/Platform/CategoryAxios";
import {
  AgentType,
  Board,
  BoardHeader,
  BoardSearchResult, CalendarBox, CalendarIcon, CancelButton, ColSpan1, ColSpan2, ColSpan3,
  ColSpan4, CustomDatePicker, DateContainer, DefaultButton, Input,
  RelativeDiv,
  RowSpan, smallStyle,
  Span4, SubmitButton, SubmitContainer, ValidationScript
} from "../../../assets/GlobalStyles";
import Checkbox from "../../../components/common/Checkbox";
import {CategoryItem, Day, RowInBox, SelectCategory, SmallButton, SmallInput} from "../styles/common";
import ko from "date-fns/locale/ko";
import DragToSelect from "../../../components/common/DragToSelect";
import Select from "react-select";
import {AdGroupButton} from "../../../components/modal/AdGroup";
import {InventoryButton} from "../../../components/modal/InventorySettings";
import {useFormContext} from "react-hook-form";
import {useAtom} from "jotai";
import {stepCampaignAtom} from "../entity";

export function CampaignThree() {
  const [stepCampaign, setStepCampaign] = useAtom(stepCampaignAtom)
  const [topLevelCategory, setTopLevelCategoryList] = useState([])
  const [dateRange, setDateRange] = useState([ new Date(getThisMonth().startDay), new Date(getToDay())]);
  const [startDate, endDate] = dateRange
  const [isCheckedAll, setIsCheckedAll] = useState(true)
  const {register,handleSubmit ,control, formState:{errors}} = useFormContext()

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

  useEffect(() => {
    if(stepThree.agentType.length === 4) {
      setIsCheckedAll(true)
    } else {
      setIsCheckedAll(false)
    }
  }, [stepThree]);

  useEffect(() => {
    const fetchData = retrieveTopLevelCategory().then(response => {
      setTopLevelCategoryList(response)
    })
  }, []);

  const handleChangeCheckAll = (event) => {
    if(event.target.checked){
      setStepThree({
        ...stepThree,
        agentType: ['WEB','WEB_APP','MOBILE_WEB','MOBILE_NATIVE_APP']
      })
    } else{
      setStepThree({
        ...stepThree,
        agentType: []
      })
    }
    setIsCheckedAll(event.target.checked)
  }
  /**
   * 에이전트 타입 체크
   * @param event
   */
  const handleChangeCheck = (event) => {
    if(event.currentTarget.checked){
      setStepThree({
        ...stepThree,
        agentType: stepThree.agentType.concat(event.currentTarget.value)
      })
    }else{
      setStepThree({
        ...stepThree,
        agentType: stepThree.agentType.filter(id => id !== event.currentTarget.value)
      })
    }
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
              <Span4>광고 그룹 불러오기</Span4>
              <RelativeDiv>
                <input type={'hidden'} {...register('adGroup',{
                  required: {
                    value: stepThree.adGroup === '',
                    message: '광고 그룹을 선택해주세요.'
                  }
                })}/>
                <AdGroupButton title={'광고 그룹 선택'}/>
                {errors.adGroup && <ColSpan1><ValidationScript>{errors.adGroup.message}</ValidationScript></ColSpan1>}
              </RelativeDiv>

            </ColSpan4>
          </RowSpan>
          <RowSpan>
            <ColSpan4>
              <Span4>노출 영역</Span4>
              <RelativeDiv>
                <AgentType>
                  <Checkbox label={'전체'}
                            type={'c'}
                            id={'all'}
                            isChecked={isCheckedAll}
                            onChange={handleChangeCheckAll}
                  />
                  <Checkbox label={'PC 웹'}
                            type={'c'}
                            id={'WEB'}
                            value={'WEB'}
                            isChecked={stepThree.agentType.includes('WEB') ? true : false}
                            onChange={handleChangeCheck}/>
                  <Checkbox label={'PC 어플리케이션'}
                            type={'c'}
                            id={'WEB_APP'}
                            value={'WEB_APP'}
                            isChecked={stepThree.agentType.includes('WEB_APP') ? true : false}
                            onChange={handleChangeCheck}/>
                  <Checkbox label={'모바일 웹'}
                            type={'c'}
                            id={'MOBILE_WEB'}
                            value={'MOBILE_WEB'}
                            isChecked={stepThree.agentType.includes('MOBILE_WEB') ? true : false}
                            onChange={handleChangeCheck}/>
                  <Checkbox label={'모바일 어플리케이션'}
                            type={'c'}
                            id={'MOBILE_NATIVE_APP'}
                            value={'MOBILE_NATIVE_APP'}
                            isChecked={stepThree.agentType.includes('MOBILE_NATIVE_APP') ? true : false}
                            onChange={handleChangeCheck}/>
                </AgentType>
                <p style={{color: '#ccc'}}>팝언더 상품은 PC웹과 MOBILE웹에서만 송출 가능.</p>
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
                    value={'auto'}
                    onClick={() => setStepThree({...stepThree, inventory: {type:'auto'}})}
                    {...register('inventory',{value:stepThree.inventory.type})}
                  />
                  <span>자동 최적화</span>
                </label>
                <label>
                  <input
                    type={'radio'}
                    name={'inventory'}
                    value={'categories'}
                    onClick={() => setStepThree({...stepThree, inventory: {type:'categories'}})}
                    {...register('inventory',{value:stepThree.inventory.type})}
                  />
                  <span>카테고리 설정</span>
                </label>
                <ColSpan2>
                  <label>
                    <input
                      type={'radio'}
                      name={'inventory'}
                      value={'direct'}
                      onClick={() => setStepThree({...stepThree, inventory: {type:'direct'}})}
                      {...register('inventory',{value:stepThree.inventory.type})}
                    />
                    <span>직접 선택</span>
                  </label>
                  {stepThree.inventory.type === 'direct' &&
                  <InventoryButton title={'지면선택'}/>
                  }
                </ColSpan2>
              </RelativeDiv>
            </ColSpan4>
            {stepThree.inventory.type === 'categories' &&
              <ColSpan4>
                <Span4></Span4>
                <RelativeDiv>
                  <SelectCategory>
                    {topLevelCategory.map((item, key) => {
                      return (
                        <CategoryItem key={key}>{item.name}</CategoryItem>
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
            <ColSpan4>
              <Span4>게제 요일 및 시간</Span4>
              <RelativeDiv>
                <label>
                  <input
                    type={'radio'}
                    name={'customInventory'}
                    value={'auto'}
                    onClick={()=> setStepThree({...stepThree, customInventory: {type:'auto'}})}
                    {...register('customInventory', {value: stepThree.customInventory.type})}
                  />
                  <span>자동 최적화</span>
                </label>
                <label>
                  <input
                    type={'radio'}
                    name={'customInventory'}
                    value={'custom'}
                    onClick={()=> setStepThree({...stepThree, customInventory: {type:'custom'}})}
                    {...register('customInventory',{value: stepThree.customInventory.type})}
                  />
                  <span>개별 설정</span>
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