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
function PixelComponent (props) {
  return(
    <ModalContainer>
      <ModalHeader title={"픽셀 추가"}/>
      <ModalBody>
        <RowSpan>
          <ColSpan0>
            <Span4>광고주명</Span4>
            <Input/>
          </ColSpan0>
          <ColSpan0>
            <Span4>아이디</Span4>
            <Input/>
          </ColSpan0>
          <ColSpan0>
            <Span4>담당자</Span4>
            <Input/>
          </ColSpan0>
        </RowSpan>
        <RowSpan>
          <ColSpan4>
            <Span2>픽셀명</Span2>
            <Input/>
          </ColSpan4>
        </RowSpan>
        <RowSpan>
          <ColSpan4>
            <Span2>연동 url</Span2>
            <Input/>
          </ColSpan4>
        </RowSpan>
      </ModalBody>
      <ModalFooter>
        <DefaultButton>픽셀 추가</DefaultButton>
      </ModalFooter>
    </ModalContainer>
  )
}
export function CampaignOne () {
  const [stepCampaign, setStepCampaign] = useAtom(stepCampaignAtom)
  const setModal = useSetAtom(modalController)
  const {register,handleSubmit ,control, formState:{errors}} = useFormContext()
  const [stepOne, setStepOne] = useState({
    advertiser: '',
    pixel:'',
    productType: 'banner',
    productTarget: 'transform',
    targetDetail:''
  })

  const handleSearchAdvertiser = () => {

  }
  const handleAddPixel = () => {
    setModal({
      isShow: true,
      width: 700,
      modalComponent: () => <PixelComponent/>
    })
  }

  const handleChangePixel = (pixelValue) => {
    setStepOne({
      ...stepOne,
      pixel: pixelValue.value
    })
  }

  const handleChangeTargetDetail = (target) => {
    setStepOne({
      ...stepOne,
      targetDetail: target.value
    })
  }

  const handleChangeProductType = (type) => {
    setStepOne({
      ...stepOne,
      productType: type
    })
  }

  const handleChangeProductTarget = (type) => {
    setStepOne({
      ...stepOne,
      productTarget: type
    })
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
                  {...register("advertiser",{
                    required: {
                      value: stepOne.advertiser === "",
                      message: "광고주를 검색해주세요"
                    },
                  })}
                />
                <SearchAdvertiser title={'광고주 검색'} onSubmit={handleSearchAdvertiser}/>
              </ColSpan2>
            </ColSpan4>
          </RowSpan>
        </BoardSearchResult>
        <ValidationGroup>
          {errors.advertiser && <Validation>{errors.advertiser.message}</Validation>}
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
                  name="pixel"
                  control={control}
                  rules={{
                    required: {
                      value: stepOne.pixel === "",
                      message: "최적화 픽셀을 선택해주세요"
                    }
                  }}
                  render={({field}) => (
                    <Select options={[{key:1,value:'pixel1',label:'픽셀'}]}
                            placeholder={'최적화 픽셀 선택'}
                            {...field}
                            value={stepOne.pixel !== '' ? stepOne.pixel : ''}
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
                <DefaultButton onClick={handleAddPixel}>픽셀추가</DefaultButton>
              </BorderSpan>
            </ColSpan4>
          </RowSpan>
          <ValidationGroup>
            {errors.pixel &&<Validation>{errors.pixel?.message}</Validation>}
            <div/>
          </ValidationGroup>
          <RowSpan>
            <ColSpan1>
              <Span4>캠페인 목표 선택</Span4>
            </ColSpan1>
          </RowSpan>
          <RowSpan>
            <ColSpan4>
              <CampaignType>
                <CampaignTypeItem active={stepOne.productType === 'banner'} onClick={()=>handleChangeProductType('banner')}>
                  <img src={`../assets/images/campaign/img_banner_${stepOne.productType === 'banner' ? "on" : "off"}.png`}/>
                  <p>배너</p>
                </CampaignTypeItem>
                <CampaignTypeItem active={stepOne.productType === 'popunder'} onClick={()=>handleChangeProductType('popunder')}>
                  <img src={`../assets/images/campaign/img_popunder_${stepOne.productType === 'popunder' ? "on" : "off"}.png`}/>
                  <p>팝언더</p>
                </CampaignTypeItem>
              </CampaignType>
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
                <CampaignTypeItem2 active={stepOne.productTarget === 'transform'} onClick={()=>handleChangeProductTarget('transform')}><div>전환</div><div>전환 가능성과 관심도가 높은 대상에게 구매 또는 참여, 설치 등의 행동을 유도 합니다.</div></CampaignTypeItem2>
                <CampaignTypeItem2 active={stepOne.productTarget === 'visit'} onClick={()=>handleChangeProductTarget('visit')}><div>방문</div><div>원하는 랜딩으로 사용자들의 방문을 극대화해서 마케팅 목표를 달성합니다.</div></CampaignTypeItem2>
                <CampaignTypeItem2 active={stepOne.productTarget === 'exposure'} onClick={()=>handleChangeProductTarget('exposure')}><div>노출</div><div>광고주의 크리에이티브 노출을 극대화해서 홍보 및 브랜딩을 강화합니다.</div></CampaignTypeItem2>
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