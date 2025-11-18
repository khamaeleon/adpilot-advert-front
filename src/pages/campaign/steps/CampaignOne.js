import {
  Board,
  BoardHeader,
  BoardSearchResult,
  CampaignType,
  ColSpan0,
  ColSpan1,
  ColSpan2,
  ColSpan4,
  ColTitle,
  Input, InputLabel,
  RowSpan,
  selectStyle,
  Span4,
  SubmitButton,
  SubmitContainer,
  ValidationScript
} from "../../../assets/GlobalStyles";
import {BorderSpan, CampaignTypeItem, CampaignTypeItem2} from "../styles/common";
import Select from "react-select";
import React, {useEffect, useState} from "react";
import {SearchAdvertiser} from "../../../components/common/SearchAdvertiser";
import {useAtom, useSetAtom} from "jotai";
import {stepCampaignAtom} from "../entity";
import {Controller, useFormContext} from "react-hook-form";
import {campaignBasicInfoAtom, campaignTemporaryListAtom} from "../entity/Info";
import {selAdminPixelDetailList} from "../../../services/header/ManagePixelAxios";
import {resistCampaignBasic, selBasicInfo, selEnumInfo, selTemporaryList} from "../../../services/campaign/InfoAxios";
import moment from "moment/moment";
import {TemporaryListModal} from "../../../components/campaign/TemporaryListModal";
import {useResetAtom} from "jotai/utils";
import {decimalFormat, removeStr} from "../../../common/StringUtils";
import {campaignBudgetInfoAtom} from "../entity/Budget";
import {HorizontalRule} from "../../../components/common/Common";

export function CampaignOne() {
  const [,setStepCampaign] = useAtom(stepCampaignAtom)
  const setCampaignTemporaryList = useSetAtom(campaignTemporaryListAtom)
  const [campaignBasicInfo, setCampaignBasicInfo] = useAtom(campaignBasicInfoAtom)
  const resetInfo = useResetAtom(campaignBasicInfoAtom)
  const [adverInfo, setAdverInfo] = useState(null)
  const [temporaryBool, setTemporaryBool] = useState(false)
  const [temporaryActive, setTemporaryActive] = useState(false)
  const [goalList, setGoalList] = useState(null)
  const [goalValueLabel, setGoalValueLabel] = useState('')
  const [pixelList, setPixelList] = useState(null)
  const {register, handleSubmit, setValue, setError, reset, control, formState: {errors}, clearErrors} = useFormContext()

  const resetBudgetInfo = useResetAtom(campaignBudgetInfoAtom)
  /**
   * 캠페인 목표 설정
   */
  useEffect(() => {
    selEnumInfo('CAMPAIGN_VIEW_GOAL').then(response => {
      setGoalList(response?.values);
    })
      resetInfo();
      reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  /**
   * 광고주 설정
   * @param data
   */
  const handleSearchAdvertiser = (data) => {
    setCampaignBasicInfo({
      ...campaignBasicInfo,
      userId: data.id,
      username: data.username
    })
    setValue('username', data.username);
    setAdverInfo({
      userId: data.id,
      username: data.username,
      managerName: data.staffName,
      adverName: data.adverName
    })
    clearErrors('username')
    /**
     * 임시저장 선택
     */
    selTemporaryList(data.id).then(response =>{
      if(response !== null && response.length !==0) {
        setCampaignTemporaryList(response)
        setTemporaryBool(true)
      }
    })
  }
  /**
   * 임시저장 리스트 선택 된 정보 가져오기
   * @param data
   */
  const handleSelectedTemporaryList = (data) =>{
    selBasicInfo(data.id).then(response => {
      let goalTypeTemp=''
      if(response.goal.indexOf('CONVERSION') ===0 ){
        goalTypeTemp = 'CAMPAIGN_CONVERSION_GOAL'
        selEnumInfo('CAMPAIGN_CONVERSION_GOAL').then(r => {
          setGoalList(r.values)
        })
      }else if(response.goal.indexOf('VISIT') ===0 ){
        goalTypeTemp = 'CAMPAIGN_VISIT_GOAL'
        selEnumInfo('CAMPAIGN_VISIT_GOAL').then(r => {
          setGoalList(r.values)
        })
      }else if(response.goal.indexOf('VIEW') ===0 ){
        goalTypeTemp='CAMPAIGN_VIEW_GOAL'
        selEnumInfo('CAMPAIGN_VIEW_GOAL').then(r => {
          setGoalList(r.values)
        })
      }
      setCampaignBasicInfo({
        ...campaignBasicInfo,
        campaignId: data.id,
        pixelId: response.pixelId,
        goal:response.goal,
        goalValue:response.goalValue,
        goalType: goalTypeTemp,
        productType:response.productType,
        name:response.name,
        step:response.step
      })
      goalInfoLabel(response.goal)
      setValue('goalValue',response.goalValue)
    })
    setTemporaryBool(false)
    setTemporaryActive(true)
    clearErrors();
  }
  /**
   * 픽셀 변경 업데이트
   * @param pixelValue
   */
  const handleChangePixel = (pixelValue) => {
    setCampaignBasicInfo({
      ...campaignBasicInfo,
      pixelId: pixelValue.value,
    })
    clearErrors('pixelId')
  }
  const handleChangeName = (text) => {
    setCampaignBasicInfo({
      ...campaignBasicInfo,
      name: text,
    })
    clearErrors('name')
  }
  /**
   * 캠페인 선택
   * @param goalInfo
   */
  const goalInfoLabel = (goalInfoValue) => {
    if (goalInfoValue.includes('ROAS')) {
      setGoalValueLabel('%')
    } else if (goalInfoValue.includes('SALES') || goalInfoValue.includes('COST')) {
      setGoalValueLabel('원')
    } else if (goalInfoValue.includes('COUNT') && ![goalInfoValue].includes('VIEW_COUNT')) {
      setGoalValueLabel('건')
    } else setGoalValueLabel('회')
  }

  const handleChangeTargetDetail = (goalInfo) => {
    goalInfoLabel(goalInfo.value)
    setCampaignBasicInfo({
      ...campaignBasicInfo,
      goal: goalInfo.value,
      goalValue: 0
    })
    clearErrors('goal')
  }
  /**
   * 캠페인 상품 선택
   * @param type
   */
  const handleChangeProductType = (type) => {
    if(!temporaryActive){
      setCampaignBasicInfo({
        ...campaignBasicInfo,
        productType: type,
      })
    }
  }

  const handleChangeProductTarget = (type) => {
    if (!temporaryActive && campaignBasicInfo.goalType !== type) {
      selEnumInfo(type).then(response => {
        setGoalList(response.values)
      })
      setCampaignBasicInfo({
        ...campaignBasicInfo,
        goalType: type,
        goal: null,
        goalValue: 0
      })
      setGoalValueLabel('')
    }
  }

  const handleGoalValue = (value) =>{
    if(!temporaryActive){
      let num = removeStr(value)
      let goalValue = num !== '' ? Number(num) : 0;

      setCampaignBasicInfo({
        ...campaignBasicInfo,
        goalValue: goalValue
      })
      goalValue !== 0 ? clearErrors('goalValue') : setError('goalValue', {type: 'required', message: '캠페인 상세 목표를 입력해주세요.'})
    }
  }

  const goalType  = (type) => {
    let name
    if (type === 'CAMPAIGN_CONVERSION_GOAL') {
      name = 'CONV'
    } else if (type === 'CAMPAIGN_VISIT_GOAL') {
      name = 'LAND'
    } else {
      name = 'VIEW'
    }
    return name
  }

  const goal = (type) => {
    switch (type) {
      case 'CONVERSION_SESSION_ROAS' : return 'sROAS';
      case 'CONVERSION_DIRECT_ROAS' : return 'dROAS';
      case 'CONVERSION_TOTAL_ROAS' : return 'tROAS';
      case 'CONVERSION_SESSION_SALES' : return 'sSALES';
      case 'CONVERSION_DIRECT_SALES' : return 'dSALES';
      case 'CONVERSION_TOTAL_SALES' : return 'tSALES';
      case 'CONVERSION_PER_SALES' : return 'CPA';
      case 'CONVERSION_COUNT' : return 'CONV';
      case 'VISIT_CLICK_COUNT' : return 'CLICK';
      case 'VISIT_SPENT_COST' : return 'COST';
      case 'VISIT_CLICK_COST' : return 'CPC';
      case 'VIEW_COUNT' : return 'IMP';
      case 'VIEW_CPM_COST' : return 'CPM';
    }
  }

  const onSubmit = () => {
    if(campaignBasicInfo.step !== ''){
      setStepCampaign({steps: 1})
    }else{
      resistCampaignBasic({
        ...campaignBasicInfo,
        goalType:"VISIT_CLICK_COUNT",
        goalValue: 1,
        goal: "VISIT_CLICK_COUNT",
        pixelId: "10f0a15a-c8c0-48ed-809c-ee643b05ad05",
        // name: `${campaignBasicInfo.productType !== 'BANNER' ? 'PU' : 'BA'}_${goalType(campaignBasicInfo.goalType)}_${goal(campaignBasicInfo.goal)}_${moment().format('YYYY-MM-DD HH:mm:ss').replace(' ' ,'_')}`
        //name: `${campaignBasicInfo.productType === 'AUDIO' ? 'AU' : 'BA'}_${moment().format('YYYY-MM-DD HH:mm:ss').replace(' ' ,'_')}`
      }).then(response =>{
        if(response){
          setCampaignBasicInfo({
            ...campaignBasicInfo,
            campaignId:response.value,
            step:'INIT'
          })
          setStepCampaign({steps: 1})
        }
      })
    }
    resetBudgetInfo()
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Board>
        <BoardHeader>캠페인 생성</BoardHeader>
        <BoardSearchResult>
          <RowSpan>
            <ColSpan4>
              <ColSpan0>
              <Span4>광고주 설정</Span4>
              </ColSpan0>
              <ColSpan2>
                <div className={'relative'}>
                  <Input
                    type={'text'}
                    style={{width: '100%'}}
                    readOnly={true}
                    value={(campaignBasicInfo !== null && campaignBasicInfo.username) || ''}
                    placeholder={'광고주를 검색해주세요'}
                    {...register("username", {
                      required: "광고주를 검색해주세요",
                    })}
                  />
                  {errors.username && <ValidationScript>{errors.username.message}</ValidationScript>}
                </div>
              </ColSpan2>
              <ColSpan2>
                <SearchAdvertiser title={'광고주 검색'} onSubmit={handleSearchAdvertiser}/>
                {temporaryBool &&
                  <TemporaryListModal onClose={()=>setTemporaryBool(false)} onSubmit={handleSelectedTemporaryList} userId={campaignBasicInfo.userId} />
                }
              </ColSpan2>
            </ColSpan4>
          </RowSpan>
          <RowSpan>
          </RowSpan>
          <RowSpan>
            <ColSpan4>
              <ColSpan0>
                <Span4>캠페인 명</Span4>
              </ColSpan0>
              <ColSpan2>
                <div className={'relative'}>
                  <Controller
                      name="name"
                      control={control}
                      rules={{
                        required: {
                          value: campaignBasicInfo?.name === '',
                          message: "캠페인명을 입력해주세요"
                        }
                      }}
                      render={({field}) => (
                          <Input type={'text'}
                                 {...field}
                                 value={campaignBasicInfo?.name}
                                 placeholder={'캠페인명을 입력해주세요'}
                                 onChange={(e) => handleChangeName(e.target.value)}
                          />
                      )}
                  />
                  {errors.name && <ValidationScript>{errors.name?.message}</ValidationScript>}
                </div>
              </ColSpan2>
            </ColSpan4>
          </RowSpan>
        </BoardSearchResult>
      </Board>
      <Board>
        <BoardHeader>캠페인 상품 설정</BoardHeader>
        <BoardSearchResult>
          {/*<RowSpan validation={true}>*/}
          {/*  <ColSpan4>*/}
          {/*    <Span4>픽셀 설정</Span4>*/}
          {/*    <BorderSpan className={'relative'}>*/}
          {/*      <ColSpan2>*/}
          {/*        <div className={'relative'}>*/}
          {/*          <Controller*/}
          {/*            name="pixelId"*/}
          {/*            control={control}*/}
          {/*            rules={{*/}
          {/*              required: {*/}
          {/*                value: campaignBasicInfo?.pixelId === '',*/}
          {/*                message: "최적화 픽셀을 선택해주세요"*/}
          {/*              }*/}
          {/*            }}*/}
          {/*            render={({field}) => (*/}
          {/*              <Select options={pixelList !== null ? pixelList :[]}*/}
          {/*                      placeholder={campaignBasicInfo.pixelId !== '' && (pixelList === null || pixelList?.length === 0) ? '최적화 픽셀이 없습니다.' : '최적화 픽셀 선택'}*/}
          {/*                      isDisabled={pixelList === null || pixelList?.length === 0 || temporaryActive}*/}
          {/*                      {...field}*/}
          {/*                      value={campaignBasicInfo !== null && pixelList !== null  ? pixelList.find(item =>item.value === campaignBasicInfo.pixelId) : ''}*/}
          {/*                      onChange={handleChangePixel}*/}
          {/*                      width={300}*/}
          {/*                      styles={selectStyle}*/}
          {/*                      isSearchable={false}*/}
          {/*              />*/}
          {/*            )}*/}
          {/*          />*/}
          {/*          <PixelModal title={'추가'} data={adverInfo !== null && adverInfo} setPixelList={setPixelList}/>*/}
          {/*        </div>*/}
          {/*      </ColSpan2>*/}
          {/*      {errors.pixelId && <ValidationScript>{errors.pixelId?.message}</ValidationScript>}*/}
          {/*    </BorderSpan>*/}
          {/*  </ColSpan4>*/}
          {/*</RowSpan>*/}

          <RowSpan>
          </RowSpan>
          <RowSpan>
            <ColSpan1>
              <Span4>캠페인 상품 선택</Span4>
            </ColSpan1>
          </RowSpan>
          <RowSpan>
            <ColSpan4>
              <CampaignType>
                 {/*<CampaignTypeItem active={campaignBasicInfo !== null ? campaignBasicInfo.productType === 'BANNER' : false} readOnly={temporaryActive} onClick={() => handleChangeProductType('BANNER')}>*/}
                 <CampaignTypeItem active={false} readOnly={true}>
                  <img
                    alt={'이미지'}
                    src={`../assets/images/campaign/img_banner_${campaignBasicInfo !== null && campaignBasicInfo.productType === 'BANNER' ? "on" : "off"}.png`}/>
                  <p>배너</p>
                 </CampaignTypeItem>
                 {/*<CampaignTypeItem active={campaignBasicInfo !== null ? campaignBasicInfo.productType === 'POP_UNDER' : false} readOnly={temporaryActive} onClick={() => handleChangeProductType('POP_UNDER')}>*/}
                 <CampaignTypeItem  active={false} readOnly={true}>
                  <img
                    alt={'이미지'}
                    src={`../assets/images/campaign/img_popunder_${campaignBasicInfo !== null && campaignBasicInfo.productType === 'POP_UNDER' ? "on" : "off"}.png`}/>
                  <p>팝언더</p>
                </CampaignTypeItem>
                <CampaignTypeItem
                    active={campaignBasicInfo !== null ? campaignBasicInfo.productType === 'AUDIO' : false}
                    readOnly={temporaryActive}
                    onClick={() => handleChangeProductType('AUDIO')}>
                  <img
                      alt={'이미지'}
                      src={`../assets/images/campaign/img_popunder_${campaignBasicInfo !== null && campaignBasicInfo.productType === 'AUDIO' ? "on" : "off"}.png`}/>
                  <p>오디오</p>
                </CampaignTypeItem>

              </CampaignType>
            </ColSpan4>
          </RowSpan>
          {/*<RowSpan>
            <ColSpan1>
              <Span4>캠페인 목표 선택</Span4>
            </ColSpan1>
          </RowSpan>
          <RowSpan>
            <ColSpan4>
              <CampaignType>
                <CampaignTypeItem2 active={campaignBasicInfo !== null && campaignBasicInfo.goalType === 'CAMPAIGN_CONVERSION_GOAL'} readOnly={temporaryActive}
                                   onClick={() => handleChangeProductTarget('CAMPAIGN_CONVERSION_GOAL')}>
                  <div className={'tit'}>전환</div>
                  <div>전환 가능성과 관심도가 높은 대상에게 구매 또는 참여, 설치 등의 행동을 유도 합니다.</div>
                </CampaignTypeItem2>
                <CampaignTypeItem2 active={campaignBasicInfo !== null && campaignBasicInfo.goalType === 'CAMPAIGN_VISIT_GOAL'} readOnly={temporaryActive}
                                   onClick={() => handleChangeProductTarget('CAMPAIGN_VISIT_GOAL')}>
                  <div className={'tit'}>방문</div>
                  <div>원하는 랜딩으로 사용자들의 방문을 극대화해서 마케팅 목표를 달성합니다.</div>
                </CampaignTypeItem2>

                <CampaignTypeItem2 active={campaignBasicInfo !== null && campaignBasicInfo.goalType === 'CAMPAIGN_VIEW_GOAL'} readOnly={temporaryActive}
                                   onClick={() => handleChangeProductTarget('CAMPAIGN_VIEW_GOAL')}>
                  <div className={'tit'}>노출</div>
                  <div>광고주의 크리에이티브 노출을 극대화해서 홍보 및 브랜딩을 강화합니다.</div>
                </CampaignTypeItem2>
              </CampaignType>
            </ColSpan4>
          </RowSpan>
          <RowSpan>
            <ColSpan4>
              <ColTitle style={{padding: 0}}><Span4>캠페인 상세 목표 선택</Span4></ColTitle>
              <ColSpan0>
                <div className={'relative'}>
                  <Controller
                    name="goal"
                    control={control}
                    rules={{
                      required: {
                        value: campaignBasicInfo !== null && campaignBasicInfo.goal === "",
                        message: "캠페인 상세 목표를 선택해주세요"
                      }
                    }}
                    render={({field}) => (
                      <Select
                        options={goalList !== null ? goalList : []}
                        styles={selectStyle}
                        width={158}
                        isDisabled={temporaryActive}
                        isSearchable={false}
                        placeholder={'목표 선택'}
                        {...field}
                        value={(campaignBasicInfo.goal !== undefined && campaignBasicInfo.goal !== null && goalList != null) ? goalList.find(d=>d.value === campaignBasicInfo.goal) : ''}
                        onChange={handleChangeTargetDetail}
                      />
                    )}
                  />
                  {errors.goal && <ValidationScript>{errors.goal?.message}</ValidationScript>}
                </div>

              </ColSpan0>
              <ColSpan1>
                <div className={"relative"}>
                  <div className={'relative'}>
                    <InputLabel label={goalValueLabel}>
                      <Input type={'text'}
                             maxLength={13}
                             style={{width: 300, textAlign: 'right'}}
                             readOnly={(campaignBasicInfo.goal === '' || campaignBasicInfo.goal === null || temporaryActive) && true}
                             value={campaignBasicInfo.goalValue !== 0 ? decimalFormat(campaignBasicInfo.goalValue) : ''}
                             {...register("goalValue", {
                               required: "캠페인 상세 목표를 입력해주세요.",
                               pattern:{
                                 value: /^[0-9,]+$/,
                                 message: "숫자만 입력 가능합니다."
                               },
                               onChange:(e) => handleGoalValue(e.target.value)
                             })}
                      />
                      {errors.goalValue && <ValidationScript>{errors.goalValue?.message}</ValidationScript>}
                    </InputLabel>
                  </div>
                </div>
              </ColSpan1>
            </ColSpan4>
          </RowSpan>
          */}
        </BoardSearchResult>
      </Board>
      <SubmitContainer>
        <SubmitButton type={'submit'}>다음[1/4]</SubmitButton>
      </SubmitContainer>
    </form>
  )
}
