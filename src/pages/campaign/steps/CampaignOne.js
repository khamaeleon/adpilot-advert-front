import {
  Board,
  BoardHeader,
  BoardSearchResult, CampaignType, ColSpan0, ColSpan1,
  ColSpan4,
  DefaultButton, defaultStyle,
  Input, inputStyle,
  RowSpan, selectStyle, Span1, Span2,
  Span4
} from "../../../assets/GlobalStyles";
import {BorderSpan, CampaignTypeItem, CampaignTypeItem2} from "../styles";
import Select from "react-select";
import React from "react";
import {SearchAdvertiser} from "../../../components/common/SearchAdvertiser";
import {useSetAtom} from "jotai";
import {modalController} from "../../../store";
import {ModalBody, ModalContainer, ModalFooter, ModalHeader} from "../../../components/modal/Modal";
import {ButtonGroup} from "../../signup/styles";
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
  const setModal = useSetAtom(modalController)
  const handleSearchAdvertiser = () => {

  }
  const handleAddPixel = () => {
    setModal({
      isShow: true,
      width: 700,
      modalComponent: () => <PixelComponent/>
    })
  }
  return (
    <>
      <Board>
        <BoardHeader>캠페인 생성</BoardHeader>
        <BoardSearchResult>
          <RowSpan>
            <ColSpan4>
              <Span4>광고주 설정</Span4>
              <Input style={{width: 300}} readOnly/>
              <SearchAdvertiser title={'광고주 검색'} onSubmit={handleSearchAdvertiser}/>
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
                <Select
                  styles={selectStyle}
                  components={{IndicatorSeparator: () => null}}
                  options={[{key:1,value:'',label:'픽셀 선택'}]}
                />
                <DefaultButton onClick={handleAddPixel}>픽셀추가</DefaultButton>
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
                <CampaignTypeItem>
                  <img src={'../assets/images/campaign/img_banner_off.png'}/>
                  <p>배너</p>
                </CampaignTypeItem>
                <CampaignTypeItem>
                  <img src={'../assets/images/campaign/img_popunder_off.png'}/>
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
                <CampaignTypeItem2><div>전환</div><div>전환 가능성과 관심도가 높은 대상에게 구매 또는 참여, 설치 등의 행동을 유도 합니다.</div></CampaignTypeItem2>
                <CampaignTypeItem2><div>방문</div><div>원하는 랜딩으로 사용자들의 방문을 극대화해서 마케팅 목표를 달성합니다.</div></CampaignTypeItem2>
                <CampaignTypeItem2><div>노출</div><div>광고주의 크리에이티브 노출을 극대화해서 홍보 및 브랜딩을 강화합니다.</div></CampaignTypeItem2>
              </CampaignType>
            </ColSpan4>
          </RowSpan>
          <RowSpan>
            <ColSpan4>
              <Span4>캠페인 상세 목표 선택</Span4>
              <Select
                styles={selectStyle}
                components={{IndicatorSeparator: () => null}}
                options={[{key:1,value:'',label:'노출'}]}
              />
              <Input style={{width: 300,  textAlign:'right'}} disabled value={'1,000,000회'}/>
            </ColSpan4>
          </RowSpan>
        </BoardSearchResult>
      </Board>
    </>
  )
}