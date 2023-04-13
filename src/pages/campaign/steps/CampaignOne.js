import {
  Board,
  BoardHeader,
  BoardSearchResult, CampaignType, CancelButton, ColSpan0, ColSpan1, ColSpan2, ColSpan3,
  ColSpan4,
  DefaultButton, defaultStyle,
  Input, inputStyle,
  RowSpan, selectStyle, Span1, Span2,
  Span4, SubmitButton, SubmitContainer, ValidationScript
} from "../../../assets/GlobalStyles";
import {BorderSpan, CampaignTypeItem, CampaignTypeItem2, Validation, ValidationGroup} from "../styles/common";
import Select from "react-select";
import React, {useState} from "react";
import {SearchAdvertiser} from "../../../components/common/SearchAdvertiser";
import {useAtom, useSetAtom} from "jotai";
import {modalController} from "../../../store";
import {ModalBody, ModalContainer, ModalFooter, ModalHeader} from "../../../components/modal/Modal";
import {stepCampaignAtom} from "../entity";
import {Controller, useFormContext} from "react-hook-form";
import {campaignBasicInfo, campaignBasicInfoAtom, goalConversionType} from "../entity/Info";
import {PixelModal} from "../../pixel/PixelList";
import {pixelDataAtom} from "../../pixel/entity/Pixel";
import {selAdverPixelDetailList} from "../../../services/header/ManagePixelAxios";

export function CampaignOne () {
  const [stepCampaign, setStepCampaign] = useAtom(stepCampaignAtom)
  const [campaignBasicInfo, setCampaignBasicInfo] = useAtom(campaignBasicInfoAtom)
  const [adverInfo, setAdverInfo] = useState(null)
  const [goalList, setGoalList] = useState(goalConversionType)
  const setModal = useSetAtom(modalController)
  const [pixelList,setPixelList] =useState(null)
  const {register,handleSubmit ,control, formState:{errors}} = useFormContext()
  const [stepOne, setStepOne] = useState({
    advertiser: '',
    pixel:'',
    productType: 'banner',
    productTarget: 'transform',
    targetDetail:''
  })

  const handleSearchAdvertiser = (data) => {
    console.log(data)
    setCampaignBasicInfo({
      ...campaignBasicInfo,
      userId:data.id,
      username:data.username
    })
    setAdverInfo({
      userId:data.id,
      username:data.username,
      managerName:data.staffName,
      adverName:data.adverName
    })
    selAdverPixelDetailList(data.id).then(response =>{
      let clonePixelList =[]
      response.map(data =>{
        clonePixelList =[...clonePixelList, {value:data.pixelId,label:data.pixelName}]
      })
      setPixelList(clonePixelList)
    })
  }


  const handleChangePixel = (pixelValue) => {
    setCampaignBasicInfo({
      ...campaignBasicInfo,
      pixelId:pixelValue,
    })
  }

  const handleChangeTargetDetail = (target) => {
    setStepOne({
      ...stepOne,
      targetDetail: target.value
    })
  }

  const handleChangeProductType = (type) => {
    setCampaignBasicInfo({
      ...campaignBasicInfo,
      productType:type,
    })
  }

  const handleChangeProductTarget = (type) => {
    setGoalList()
  }
  const onSubmit = (data) => {
    console.log(data)
    setStepCampaign({steps:1})
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
                <Input
                  style={{width: 300}}
                  readOnly
                  placeholder={'광고주를 검색해주세요'}
                  {...register("username", {
                    required: "광고주를 검색해주세요",
                  })}
                  value={campaignBasicInfo !==null ? campaignBasicInfo.username :''}
                />
                <SearchAdvertiser title={'광고주 검색'} onSubmit={handleSearchAdvertiser}/>
              </ColSpan2>
            </ColSpan4>
          </RowSpan>
        </BoardSearchResult>
        <ValidationGroup>
          {errors.username && <Validation>{errors.username.message}</Validation>}
          <div/>
        </ValidationGroup>
      </Board>
      <Board>
        <BoardHeader>캠페인 목표 설정</BoardHeader>
        <BoardSearchResult>
          <RowSpan>
            <ColSpan4>
              <Span4>픽셀 설정</Span4>
              <BorderSpan>
                <Span4>최적화 픽셀 선택</Span4>
                <Controller
                  name="pixelId"
                  control={control}
                  rules={{
                    required: {
                      value: pixelList !==null && pixelList.pixelId === "",
                      message: "최적화 픽셀을 선택해주세요"
                    }
                  }}
                  render={({field}) => (
                    <Select options={pixelList !==null && pixelList}
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
                <PixelModal title={'추가'} data={adverInfo !==null && adverInfo}/>
              </BorderSpan>
            </ColSpan4>
          </RowSpan>
          <ValidationGroup>
            {errors.pixelId &&<Validation>{errors.pixelId?.message}</Validation>}
            <div/>
          </ValidationGroup>
          <RowSpan>
            <ColSpan1>
              <Span4>캠페인 상품 선택</Span4>
            </ColSpan1>
          </RowSpan>
          <RowSpan>
            <ColSpan4>
              <CampaignType>
                <CampaignTypeItem active={campaignBasicInfo !==null ? campaignBasicInfo.productType === 'BANNER' : false} onClick={()=>handleChangeProductType('BANNER')}>
                  <img src={`../assets/images/campaign/img_banner_${campaignBasicInfo !==null && campaignBasicInfo.productType === 'BANNER' ? "on" : "off"}.png`}/>
                  <p>배너</p>
                </CampaignTypeItem>
                <CampaignTypeItem active={campaignBasicInfo !==null ? campaignBasicInfo.productType === 'POP_UNDER' : false} onClick={()=>handleChangeProductType('POP_UNDER')}>
                  <img src={`../assets/images/campaign/img_popunder_${campaignBasicInfo !==null && campaignBasicInfo.productType === 'POP_UNDER' ? "on" : "off"}.png`}/>
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
                <CampaignTypeItem2 active={stepOne.productTarget === 'CONVERSION'} onClick={()=>handleChangeProductTarget('CONVERSION')}><div>전환</div><div>전환 가능성과 관심도가 높은 대상에게 구매 또는 참여, 설치 등의 행동을 유도 합니다.</div></CampaignTypeItem2>
                <CampaignTypeItem2 active={stepOne.productTarget === 'VISIT'} onClick={()=>handleChangeProductTarget('VISIT')}><div>방문</div><div>원하는 랜딩으로 사용자들의 방문을 극대화해서 마케팅 목표를 달성합니다.</div></CampaignTypeItem2>
                <CampaignTypeItem2 active={stepOne.productTarget === 'VIEW'} onClick={()=>handleChangeProductTarget('VIEW')}><div>노출</div><div>광고주의 크리에이티브 노출을 극대화해서 홍보 및 브랜딩을 강화합니다.</div></CampaignTypeItem2>
              </CampaignType>
            </ColSpan4>
          </RowSpan>
          <RowSpan>
            <ColSpan4>
              <Span4>캠페인 상세 목표 선택</Span4>
              <ColSpan3>
                <Controller
                  name="targetDetail"
                  control={control}
                  rules={{
                    required: {
                      value: stepOne.targetDetail === "",
                      message: "캠페인 상세 목표를 설정해주세요"
                    }
                  }}
                  render={({field}) => (
                    <Select
                      options={[{key:1,value:'',label:'노출'}]}
                      styles={selectStyle}
                      placeholder={'목표 선택'}
                      {...field}
                      value={stepOne.targetDetail !== '' ? stepOne.targetDetail : ''}
                      onChange={handleChangeTargetDetail}
                    />
                  )}
                />
              <Input style={{width: 300,  textAlign:'right'}} disabled value={'1,000,000회'}/>
              </ColSpan3>
            </ColSpan4>
          </RowSpan>
          <ValidationGroup>
            {errors.targetDetail &&<Validation>{errors.targetDetail?.message}</Validation>}
            <div/>
          </ValidationGroup>
        </BoardSearchResult>
      </Board>
      <SubmitContainer>
        <SubmitButton type={'submit'}>다음[1/4]</SubmitButton>
      </SubmitContainer>
    </form>
  )
}