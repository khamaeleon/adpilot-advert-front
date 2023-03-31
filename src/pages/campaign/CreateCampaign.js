import {
  Board,
  BoardHeader,
  BoardSearchResult,
  CampaignType, ColSpan1,
  ColSpan2,
  ColSpan4,
  DefaultButton,
  Input, inputStyle, RelativeDiv,
  RowSpan, Span1, Span2,
  Span4,
  SubmitButton,
  SubmitContainer
} from "../../assets/GlobalStyles";
import React from "react";
import styled from "styled-components";
import Select from "react-select";
import {useAtom} from "jotai/index";
import {stepCampaignAtom} from "./entity";
import {HorizontalRule} from "../../components/common/Common";

function CampaignOne () {
  return (
    <>
      <Board>
        <BoardHeader>캠페인 생성</BoardHeader>
        <BoardSearchResult>
          <RowSpan>
            <ColSpan4>
              <Span4>광고주 설정</Span4>
              <Input style={{width: 300}}/>
              <DefaultButton>광고주검색</DefaultButton>
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
                  styles={inputStyle}
                  components={{IndicatorSeparator: () => null}}
                  options={[{key:1,value:'',label:'픽셀 선택'}]}
                />
                <DefaultButton>픽셀추가</DefaultButton>
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
                styles={inputStyle}
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

function CampaignTwo() {
  return(
    <Board>
      <BoardHeader>예산 및 입찰 설정</BoardHeader>
      <BoardSearchResult>
        <RowSpan>
          <Span4>예산설정</Span4>
        </RowSpan>
        <RowSpan box={true}>
          <ColSpan4>
            <Span4>일일 평균 예산</Span4>
            <RelativeDiv>
              <ColSpan1>
                <Input/>
                <Won/>
              </ColSpan1>
              <ColSpan1>
                <label>
                  <input type={'checkbox'} className={'checkbox-type-a'}/>
                  <i/>
                  <span>일일 예산 무제한</span>
                </label>
              </ColSpan1>
            </RelativeDiv>
          </ColSpan4>
          <ColSpan4>
            <Span4>일일 평균 예산</Span4>
            <RelativeDiv>
              <ColSpan1>
                <Span1>PC</Span1>
                <Input/>
                <Won/>
              </ColSpan1>
              <ColSpan1>
                <input type="range"/>
              </ColSpan1>
              <ColSpan1>
                <Span1>MOBILE</Span1>
                <Input/>
                <Won/>
              </ColSpan1>
            </RelativeDiv>
          </ColSpan4>
        </RowSpan>
        <RowSpan>
          <Span4>과금 설정</Span4>
        </RowSpan>
        <RowSpan box={true}>
          <ColSpan4>
            <Span4>입찰 방식</Span4>
            <RelativeDiv>
              <ColSpan1>
                <Select
                  styles={inputStyle}
                  components={{IndicatorSeparator: () => null}}
                  options={[{key:1,value:'',label:'입찰 방식 선택'}]}
                />
              </ColSpan1>
            </RelativeDiv>
          </ColSpan4>
        </RowSpan>
      </BoardSearchResult>
    </Board>
  )
}

function CampaignThree() {
  return(
    <Board>
      <BoardHeader>광고 그룹 설정</BoardHeader>
    </Board>
  )
}

function CampaignFour() {
  return(
    <Board>
      <BoardHeader>광고 그룹 설정</BoardHeader>
    </Board>
  )
}

export default function CreateCampaign() {
  const [stepCampaign, setStepCampaign] = useAtom(stepCampaignAtom)

  return (
    <>
      <CampaignOne/>
      <CampaignTwo/>
      <SubmitContainer>
        <SubmitButton type={'submit'}>다음 [{stepCampaign + 1}/4]</SubmitButton>
      </SubmitContainer>
    </>
  )
}

const BorderSpan = styled.div`
  display: flex;
  width: auto !important;
  padding: 5px;
  background-color: #f9fafb;
  border: 1px solid #ddd;
  border-radius: 8px;
  & span {
    margin-left: 20px;
  }
`

const CampaignTypeItem = styled.div`
  padding: 30px 80px;
  background-color: #fff;
  border-radius: 8px;
  border: 2px solid #fff;
  box-shadow: 0 2px 3px 0 rgba(10, 10, 10, 0.2);
  font-size: 12px;
  white-space: break-spaces;
  &:hover {
    border: 2px solid #f5811f;
    cursor: pointer;
  }
`

const CampaignTypeItem2 = styled.div`
  padding: 15px 20px;
  background-color: #fff;
  border-radius: 8px;
  border: 2px solid #fff;
  box-shadow: 0 2px 3px 0 rgba(10, 10, 10, 0.2);
  font-size: 12px;
  white-space: break-spaces;
  &:hover {
    border: 2px solid #f5811f;
    cursor: pointer;
  }
`

const Won = styled.div`
  position: absolute;
  left: 90%;
  &:before {
    display: inline-block;
    content: "원";
  }
`