import {
  Board,
  BoardHeader,
  BoardSearchResult,
  CampaignType,
  ColSpan1,
  ColSpan2,
  ColSpan4,
  ColTitle,
  Input,
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
import {PixelModal} from "../../pixel/PixelList";
import {selAdverPixelDetailList} from "../../../services/header/ManagePixelAxios";
import {resistCampaignBasic, selBasicInfo, selEnumInfo, selTemporaryList} from "../../../services/campaign/InfoAxios";
import moment from "moment/moment";
import {TemporaryListModal} from "../../../components/campaign/TemporaryListModal";
import {useResetAtom} from "jotai/utils";

export function CampaignOne() {
  const [stepCampaign,setStepCampaign] = useAtom(stepCampaignAtom)
  const setCampaignTemporaryList = useSetAtom(campaignTemporaryListAtom)
  const [campaignBasicInfo, setCampaignBasicInfo] = useAtom(campaignBasicInfoAtom)
  const resetInfo = useResetAtom(campaignBasicInfoAtom)
  const [adverInfo, setAdverInfo] = useState(null)
  const [temporaryBool, setTemporaryBool] = useState(false)
  const [goalList, setGoalList] = useState(null)
  const [pixelList, setPixelList] = useState(null)
  const {register, handleSubmit, setValue, control, formState: {errors}, clearErrors} = useFormContext()
  /**
   * 캠페인 목표 설정
   */
  useEffect(() => {
    selEnumInfo('CAMPAIGN_CONVERSION_GOAL').then(response => {
      setGoalList(response.data)
    })
    if(stepCampaign.steps !== null){
      selAdverPixelDetailList(campaignBasicInfo.userId).then(response => {
        let clonePixelList = []
        response.map(data => {
          clonePixelList = [...clonePixelList, {value: data.pixelId, label: data.pixelName}]
        })
        setPixelList(clonePixelList)
      })
    } else resetInfo()
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
     * 픽셀 설정
     */
    selAdverPixelDetailList(data.id).then(response => {
      let clonePixelList = []
      response.map(data => {
        clonePixelList = [...clonePixelList, {value: data.pixelId, label: data.pixelName}]
      })
      setPixelList(clonePixelList)
    })
    /**
     * 임시저장 선택
     */
    selTemporaryList(data.id).then(response =>{
      console.log(response)
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
        selEnumInfo('CAMPAIGN_CONVERSION_GOAL').then(response => {
          setGoalList(response.data)
        })
      }else if(response.goal.indexOf('VISIT') ===0 ){
        goalTypeTemp = 'CAMPAIGN_VISIT_GOAL'
        selEnumInfo('CAMPAIGN_VISIT_GOAL').then(response => {
          setGoalList(response.data)
        })
      }else if(response.goal.indexOf('VIEW') ===0 ){
        goalTypeTemp='CAMPAIGN_VIEW_GOAL'
        selEnumInfo('CAMPAIGN_VIEW_GOAL').then(response => {
          setGoalList(response.data)
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
    })
    setTemporaryBool(false)
    clearErrors();
  }
  /**
   * 픽셀 변경 업데이트
   * @param pixelValue
   */
  const handleChangePixel = (pixelValue) => {
    setCampaignBasicInfo({
      ...campaignBasicInfo,
      pixelId: pixelValue,
    })
    clearErrors('pixelId')
  }
  /**
   * 캠페인 선택
   * @param goalInfo
   */
  const handleChangeTargetDetail = (goalInfo) => {
    setCampaignBasicInfo({
      ...campaignBasicInfo,
      goal: goalInfo,
      goalValue: 0
    })
    console.log(goalInfo)
    clearErrors('goal')
  }
  /**
   * 캠페인 상품 선택
   * @param type
   */
  const handleChangeProductType = (type) => {
    setCampaignBasicInfo({
      ...campaignBasicInfo,
      productType: type,
    })
  }

  const handleChangeProductTarget = (type) => {
    selEnumInfo(type).then(response => {
      setGoalList(response.data)
    })
    setCampaignBasicInfo({
      ...campaignBasicInfo,
      goalType: type,
      goal: '',
    })
  }

  const handleGoalValue = (event) =>{
    setCampaignBasicInfo({
      ...campaignBasicInfo,
      goalValue: parseInt(event.target.value)
    })
    clearErrors('goalValue')
  }

  const onSubmit = (data) => {
    if(campaignBasicInfo.step !==undefined){
      setStepCampaign({steps: 1})
    }else{
      resistCampaignBasic({
        ...campaignBasicInfo,
        goal:campaignBasicInfo.goal.value,
        pixelId:campaignBasicInfo.pixelId.value,
        name:campaignBasicInfo.productType + '_' + campaignBasicInfo.goal.value + '_' + moment().format('YYYY-MM-DD hh:mm:ss').replace(' ' ,'_')
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
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Board>
        <BoardHeader>캠페인 생성</BoardHeader>
        <BoardSearchResult>
          <RowSpan>
            <ColSpan4>
              <Span4>광고주 설정</Span4>
              <ColSpan2>
                <div className={'relative'}>
                  <Input
                    type={'text'}
                    style={{width: '100%'}}
                    readOnly={true}
                    value={campaignBasicInfo !== null && campaignBasicInfo.username || ''}
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
                  <TemporaryListModal onSubmit={handleSelectedTemporaryList} userId={campaignBasicInfo.userId} />
                }
              </ColSpan2>
            </ColSpan4>
          </RowSpan>
        </BoardSearchResult>
      </Board>
      <Board>
        <BoardHeader>캠페인 목표 설정</BoardHeader>
        <BoardSearchResult>
          <RowSpan validation={true}>
            <ColSpan4>
              <Span4>픽셀 설정</Span4>
              <BorderSpan className={'relative'}>
                <Span4>최적화 픽셀 선택</Span4>
                <ColSpan2>
                  <div className={'relative'}>
                    <Controller
                      name="pixelId"
                      control={control}
                      rules={{
                        required: {
                          value: campaignBasicInfo?.pixelId === '',
                          message: "최적화 픽셀을 선택해주세요"
                        }
                      }}
                      render={({field}) => (
                        <Select options={pixelList !== null ? pixelList :[]}
                                placeholder={(pixelList === null || pixelList?.length === 0) ? '최적화 픽셀이 없습니다.' : '최적화 픽셀 선택'}
                                isDisabled={pixelList === null || pixelList?.length === 0 && true}
                                {...field}
                                value={campaignBasicInfo !== null && pixelList !== null  ? pixelList.find(item =>item.value === campaignBasicInfo.pixelId) : ''}
                                onChange={handleChangePixel}
                                styles={{
                                  input: (baseStyles, state) => (
                                    {
                                      ...baseStyles,
                                      minWidth: "300px",
                                    })
                                }}
                        />
                      )}
                    />
                    <PixelModal title={'추가'} data={adverInfo !== null && adverInfo} setPixelList={setPixelList}/>
                  </div>
                </ColSpan2>
                {errors.pixelId && <ValidationScript>{errors.pixelId?.message}</ValidationScript>}
              </BorderSpan>
            </ColSpan4>
          </RowSpan>
          <RowSpan>
            <ColSpan1>
              <Span4>캠페인 상품 선택</Span4>
            </ColSpan1>
          </RowSpan>
          <RowSpan>
            <ColSpan4>
              <CampaignType>
                <CampaignTypeItem
                  active={campaignBasicInfo !== null ? campaignBasicInfo.productType === 'BANNER' : false}
                  onClick={() => handleChangeProductType('BANNER')}>
                  <img
                    src={`../assets/images/campaign/img_banner_${campaignBasicInfo !== null && campaignBasicInfo.productType === 'BANNER' ? "on" : "off"}.png`}/>
                  <p>배너</p>
                </CampaignTypeItem>
                <CampaignTypeItem
                  active={campaignBasicInfo !== null ? campaignBasicInfo.productType === 'POP_UNDER' : false}
                  onClick={() => handleChangeProductType('POP_UNDER')}>
                  <img
                    src={`../assets/images/campaign/img_popunder_${campaignBasicInfo !== null && campaignBasicInfo.productType === 'POP_UNDER' ? "on" : "off"}.png`}/>
                  <p>팝언더</p>
                </CampaignTypeItem>
              </CampaignType>
            </ColSpan4>
          </RowSpan>
          <RowSpan>
            <ColSpan1>
              <Span4>캠페인 목표 선택</Span4>
            </ColSpan1>
          </RowSpan>
          <RowSpan>
            <ColSpan4>
              <CampaignType>
                <CampaignTypeItem2 active={campaignBasicInfo !== null && campaignBasicInfo.goalType === 'CAMPAIGN_CONVERSION_GOAL'}
                                   onClick={() => handleChangeProductTarget('CAMPAIGN_CONVERSION_GOAL')}>
                  <div>전환</div>
                  <div>전환 가능성과 관심도가 높은 대상에게 구매 또는 참여, 설치 등의 행동을 유도 합니다.</div>
                </CampaignTypeItem2>
                <CampaignTypeItem2 active={campaignBasicInfo !== null && campaignBasicInfo.goalType === 'CAMPAIGN_VISIT_GOAL'}
                                   onClick={() => handleChangeProductTarget('CAMPAIGN_VISIT_GOAL')}>
                  <div>방문</div>
                  <div>원하는 랜딩으로 사용자들의 방문을 극대화해서 마케팅 목표를 달성합니다.</div>
                </CampaignTypeItem2>
                <CampaignTypeItem2 active={campaignBasicInfo !== null && campaignBasicInfo.goalType === 'CAMPAIGN_VIEW_GOAL'}
                                   onClick={() => handleChangeProductTarget('CAMPAIGN_VIEW_GOAL')}>
                  <div>노출</div>
                  <div>광고주의 크리에이티브 노출을 극대화해서 홍보 및 브랜딩을 강화합니다.</div>
                </CampaignTypeItem2>
              </CampaignType>
            </ColSpan4>
          </RowSpan>
          <RowSpan>
            <ColSpan4>
              <ColTitle><Span4>캠페인 상세 목표 선택</Span4></ColTitle>
              <ColSpan1>
                <div className={'relative'}>
                  <Controller
                    name="goal"
                    control={control}
                    rules={{
                      required: {
                        value: campaignBasicInfo !== null && campaignBasicInfo.goal === "",
                        message: "캠페인 상세 목표를 설정해주세요"
                      }
                    }}
                    render={({field}) => (
                      <Select
                        options={goalList !== null ? goalList : []}
                        styles={selectStyle}
                        placeholder={'목표 선택'}
                        {...field}
                        value={campaignBasicInfo.goal}
                        onChange={handleChangeTargetDetail}
                      />
                    )}
                  />
                  {errors.goal && <ValidationScript>{errors.goal?.message}</ValidationScript>}
                </div>

              </ColSpan1>
              <ColSpan1>
                <div className={"relative"}>
                  <div className={'relative'}>
                    <Controller
                      name="goalValue"
                      control={control}
                      rules={{
                        required: {
                          value: campaignBasicInfo !== null && campaignBasicInfo.goalValue === 0,
                          message: "캠페인 상세 목표 금액을 입력해주세요."
                        }
                      }}
                      render={({ field }) =>(
                        <Input type={'number'}
                               min={0}
                               placeholder={"캠페인 상세 목표 금액을 입력해주세요."}
                               style={{width: 300, textAlign: 'right'}}
                               value={campaignBasicInfo !== null && campaignBasicInfo.goalValue}
                               onChange={(e)=>handleGoalValue(e)}
                        /> )}
                    />
                    {errors.goalValue && <ValidationScript>{errors.goalValue?.message}</ValidationScript>}
                  </div>
                </div>
              </ColSpan1>
            </ColSpan4>
          </RowSpan>
        </BoardSearchResult>
      </Board>
      <SubmitContainer>
        <SubmitButton type={'submit'}>다음[1/4]</SubmitButton>
      </SubmitContainer>
    </form>
  )
}
