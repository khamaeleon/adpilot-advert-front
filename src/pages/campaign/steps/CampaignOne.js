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
import {useAtom} from "jotai";
import {modalController} from "../../../store";
import {stepCampaignAtom} from "../entity";
import {Controller, useFormContext} from "react-hook-form";
import {campaignBasicInfoAtom, campaignTemporaryListAtom} from "../entity/Info";
import {PixelModal} from "../../pixel/PixelList";
import {selAdverPixelDetailList} from "../../../services/header/ManagePixelAxios";
import {resistCampaignBasic, selEnumInfo, selTemporaryList} from "../../../services/campaign/InfoAxios";
import moment from "moment/moment";
import {TemporaryListModal} from "../../../components/campaign/TemporaryListModal";

export function CampaignOne() {
  const [, setStepCampaign] = useAtom(stepCampaignAtom)
  const [campaignBasicInfo, setCampaignBasicInfo] = useAtom(campaignBasicInfoAtom)
  const [campaignTemporaryList, setCampaignTemporaryList] = useAtom(campaignTemporaryListAtom)
  const [adverInfo, setAdverInfo] = useState(null)
  const [temporaryBool, setTemporaryBool] = useState(false)

  const [goalList, setGoalList] = useState(null)
  const [pixelList, setPixelList] = useState(null)
  const [, setModal] = useAtom(modalController)
  const {register, handleSubmit, setValue, setError, control, formState: {errors}} = useFormContext()
  useEffect(() => {
    selEnumInfo('CAMPAIGN_CONVERSION_GOAL').then(response => {
      setGoalList(response.data)
    })
  }, [])
  const handleSearchAdvertiser = (data) => {
    console.log(data)
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
    selAdverPixelDetailList(data.id).then(response => {
      let clonePixelList = []
      response.map(data => {
        clonePixelList = [...clonePixelList, {value: data.pixelId, label: data.pixelName}]
      })
      setPixelList(clonePixelList)
    })
    selTemporaryList(data.id).then(response =>{
      console.log(response)
      setCampaignTemporaryList(response)
      setTemporaryBool(true)
    })
  }
  const handleSelectedTemporaryList =(data) =>{
    console.log(data)
  }


  const handleChangePixel = (pixelValue) => {
    setCampaignBasicInfo({
      ...campaignBasicInfo,
      pixelId: pixelValue,
    })
  }

  const handleChangeTargetDetail = (goalInfo) => {
    setCampaignBasicInfo({
      ...campaignBasicInfo,
      goal: goalInfo,
    })
  }

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
      goal: '',
    })
  }

  const handleGoalValue = (event) =>{
    setCampaignBasicInfo({
      ...campaignBasicInfo,
      goalValue: parseInt(event.target.value)
    })
  }

  const onSubmit = (data) => {
    console.log(campaignBasicInfo)
    resistCampaignBasic({
      ...campaignBasicInfo,
      goal:campaignBasicInfo.goal.value,
      pixelId:campaignBasicInfo.pixelId.value,
      name:campaignBasicInfo.productType + '_' + campaignBasicInfo.goal.value + '_' + moment().format('YYYY-MM-DD hh:mm:ss').replace(' ' ,'_')
    }).then(response =>{
      if(response){
        setCampaignBasicInfo({
          ...campaignBasicInfo,
          campaignId:response.value
        })
        setStepCampaign({steps: 1})
      }
    })

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
                    style={{width: 300}}
                    readOnly={true}
                    value={campaignBasicInfo !== null && campaignBasicInfo.username || ''}
                    placeholder={'광고주를 검색해주세요'}
                    {...register("username", {
                      required: "광고주를 검색해주세요",
                    })}
                  />
                  <SearchAdvertiser title={'광고주 검색'} onSubmit={handleSearchAdvertiser}/>
                  {temporaryBool &&
                    <TemporaryListModal onSubmit={handleSelectedTemporaryList}/>
                  }
                  {errors.username && <ValidationScript>{errors.username.message}</ValidationScript>}
                </div>
              </ColSpan2>
            </ColSpan4>
          </RowSpan>
        </BoardSearchResult>
      </Board>
      <Board>
        <BoardHeader>캠페인 목표 설정</BoardHeader>
        <BoardSearchResult>
          <RowSpan>
            <ColSpan4>
              <Span4>픽셀 설정</Span4>
              <BorderSpan>
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
                                placeholder={'최적화 픽셀 선택'}
                                {...field}
                                value={campaignBasicInfo !== null ? campaignBasicInfo.pixelId : ''}
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
                    <PixelModal title={'추가'} data={adverInfo !== null && adverInfo}/>
                    {errors.pixelId && <ValidationScript>{errors.pixelId?.message}</ValidationScript>}
                  </div>
                </ColSpan2>
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
                        value={campaignBasicInfo !== null && campaignBasicInfo.goal ? campaignBasicInfo.goal : ''}
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
