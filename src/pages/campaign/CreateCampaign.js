import {
  AgentType,
  Board, BoardContainer,
  BoardHeader,
  BoardSearchResult, CancelButton,
  ColSpan4,
  DefaultButton, Input,
  RowSpan,
  Span4, SubmitButton, SubmitContainer
} from "../../assets/GlobalStyles";
import React from "react";
import styled from "styled-components";
import Select from "react-select";
import {useAtom} from "jotai/index";
import {stepCampaignAtom} from "./entity";

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
            <ColSpan4>
              <Span4>캠페인 상품 선택</Span4>
            </ColSpan4>
          </RowSpan>
          <RowSpan>
            <ColSpan4>
              <AgentType></AgentType>
            </ColSpan4>
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
        <SubmitButton type={'submit'}>다음</SubmitButton>
      </SubmitContainer>
    </>
  )
}

const BorderSpan = styled.div`
  display: flex;
  width: auto;
  padding: 5px;
  background-color: #f9fafb;
  border: 1px solid #ddd;
  border-radius: 8px;
`