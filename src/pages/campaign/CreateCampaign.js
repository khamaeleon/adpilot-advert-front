import {
  Board,
  BoardHeader,
  BoardSearchResult,
  CampaignType,
  ColSpan2,
  ColSpan4,
  DefaultButton,
  Input,
  RowSpan,
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
                <Select/>
                <DefaultButton>픽셀추가</DefaultButton>
              </BorderSpan>
            </ColSpan4>
          </RowSpan>
          <RowSpan>
            <ColSpan2>
              <Span4>캠페인 상품 선택</Span4>
            </ColSpan2>
            <ColSpan2>
              <Span4>캠페인 상품 선택</Span4>
            </ColSpan2>
          </RowSpan>
          <RowSpan>
            <ColSpan2>
              <CampaignType>
                <CampaignTypeItem>배너</CampaignTypeItem>
                <CampaignTypeItem>팝언더</CampaignTypeItem>
              </CampaignType>
            </ColSpan2>
            <HorizontalRule style={{margin: '0 10px 0 20px',height: 'auto'}}/>
            <ColSpan2>
              <CampaignType>
                <CampaignTypeItem><div>전환</div><div>전환 가능성과 관심도가 높은 대상에게 구매 또는 참여, 설치 등의 행동을 유도 합니다.</div></CampaignTypeItem>
                <CampaignTypeItem><div>전환</div><div>전환 가능성과 관심도가 높은 대상에게 구매 또는 참여, 설치 등의 행동을 유도 합니다.</div></CampaignTypeItem>
                <CampaignTypeItem><div>전환</div><div>전환 가능성과 관심도가 높은 대상에게 구매 또는 참여, 설치 등의 행동을 유도 합니다.</div></CampaignTypeItem>
              </CampaignType>
            </ColSpan2>
          </RowSpan>
          <RowSpan>
            <ColSpan4>
              <Span4>캠페인 상세 목표 선택</Span4>
              <Select/>
              <Input style={{width: 300, height: 38, textAlign:'right'}} disabled value={'1,000,000회'}/>
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
`

const CampaignTypeItem = styled.div`
  padding: 10px;
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