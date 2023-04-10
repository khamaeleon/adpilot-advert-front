import {
  Board,
  BoardHeader,
  BoardSearchResult,
  CancelButton,
  ColSpan2,
  ColSpan4,
  Input,
  RowSpan,
  Span4,
  SubmitButton,
  SubmitContainer
} from "../../assets/GlobalStyles";
import React, {useEffect, useState} from "react";
import {HorizontalRule} from "../../components/common/Common";
import {Row, ValueText} from "../campaign/styles/common";
import {useNavigate} from "react-router-dom";
import {ValidationScript} from "../signup/styles";
import {useForm} from "react-hook-form";

function CampaignInfoDetail() {
  const navigate =useNavigate()
  const [info, setInfo] = useState()
  const {register, handleSubmit, formState: {errors}} = useForm({
    mode: "onSubmit",
    defaultValues: info
  })
  const onError = (error) => console.log(error)

  useEffect(() => {

  }, [])

  const handleCampaignName = (e) => {
    setInfo({
      ...info,
      campaignName: e.target.value
    })
  }
  const onSubmit = () => {
    console.log(info)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <Board>
        <BoardHeader>캠페인 검토</BoardHeader>
        <BoardSearchResult>
          <RowSpan>
            <Span4>캠페인 기본 정보</Span4>
          </RowSpan>
          <RowSpan box={true} column={true}>
            <Row>
              <ColSpan4>
                <Span4>캠페인명</Span4>
                <Input
                  style={{height:38}}
                  type={'text'}
                  placeholder={'캠페인명을 입력해주세요'}
                  {...register("campaignName", {
                    required: "캠페인명을 입력해주세요",
                    onChange:(e) => handleCampaignName(e)
                  })}
                  value={'나이키_팝언더_노출_2023.03.02'}
                />
                {errors.campaignName && <ValidationScript>{errors.campaignName?.message}</ValidationScript>}
              </ColSpan4>
            </Row>
            <Row>
              <ColSpan2>
                <Span4>캠페인명</Span4>
                <ValueText>팝언더</ValueText>
              </ColSpan2>
              <HorizontalRule/>
              <ColSpan2>
                <Span4>캠페인 목표</Span4>
                <ValueText>노출</ValueText>
              </ColSpan2>
            </Row>
          </RowSpan>
          <RowSpan>
            <Span4>예산 및 입찰 설정</Span4>
          </RowSpan>
          <RowSpan box={true} column={true}>
            <Row>
              <ColSpan2>
                <Span4>일일 평균 예산</Span4>
                <ValueText>10,000원</ValueText>
              </ColSpan2>
              <HorizontalRule/>
              <ColSpan2>
                <Span4>예산 비율</Span4>
                <ValueText>PC 6,700원 / MOBILE 3,300원</ValueText>
              </ColSpan2>
            </Row>
            <Row>
              <ColSpan2>
                <Span4>시간별 예산 그룹</Span4>
                <ValueText>출근 집중 설정</ValueText>
              </ColSpan2>
              <HorizontalRule/>
              <ColSpan2>
                <Span4>이벤트 예산 그룹</Span4>
                <ValueText>전환 목표 기반</ValueText>
              </ColSpan2>
            </Row>
            <Row>
              <ColSpan2>
                <Span4>입찰 방식</Span4>
                <ValueText>CPC</ValueText>
              </ColSpan2>
              <HorizontalRule/>
              <ColSpan2>
                <Span4>최대 입찰가</Span4>
                <ValueText>280원</ValueText>
              </ColSpan2>
            </Row>
            <Row>
              <ColSpan2>
                <Span4>이벤트 단가 그룹</Span4>
                <ValueText>기획전 전용 설정</ValueText>
              </ColSpan2>
              <HorizontalRule/>
              <ColSpan2>
                <Span4>모수 가중치 그룹</Span4>
                <ValueText>노출 우선 순위 설정</ValueText>
              </ColSpan2>
            </Row>
          </RowSpan>
          <RowSpan>
            <Span4>광고 그룹 설정</Span4>
          </RowSpan>
          <RowSpan box={true} column={true}>
            <Row>
              <ColSpan2>
                <Span4>노출 영역</Span4>
                <ValueText>전체</ValueText>
              </ColSpan2>
              <HorizontalRule/>
              <ColSpan2>
                <Span4>송출 제한 지면</Span4>
                <ValueText>15개 지면 송출 제한 설정</ValueText>
              </ColSpan2>
            </Row>
            <Row>
              <ColSpan2>
                <Span4>게제 지면</Span4>
                <ValueText>개별 설정 (언론사, 웹하드, 블로그, 카페, 엔터테인먼트, 중고차, 성인)</ValueText>
              </ColSpan2>
              <HorizontalRule/>
              <ColSpan2>
                <Span4></Span4>
                <ValueText></ValueText>
              </ColSpan2>
            </Row>
            <Row>
              <ColSpan2>
                <Span4>게제 기간</Span4>
                <ValueText>2023.01.02 ~ 2024.01.01</ValueText>
                <small>게재 요일 및 시간 보기</small>
              </ColSpan2>
              <HorizontalRule/>
              <ColSpan2>
                <Span4></Span4>
                <ValueText></ValueText>
              </ColSpan2>
            </Row>
            <Row>
              <ColSpan2>
                <Span4>고객 정보 기반 설정</Span4>
                <ValueText>전환 고객[10일], 쇼핑 고객, 방문 고객 노출</ValueText>
              </ColSpan2>
              <HorizontalRule/>
              <ColSpan2>
                <Span4>유저 데이터 분석 설정</Span4>
                <ValueText>자동 최적화</ValueText>
              </ColSpan2>
            </Row>
          </RowSpan>
          <RowSpan>
            <Span4>크리에이티브 설정</Span4>
          </RowSpan>
          <RowSpan box={true} column={true}>
            <Row>
              <ColSpan2>
                <Span4>설정 크리에이티브</Span4>
                <ValueText>고정 배너</ValueText>
              </ColSpan2>
              <HorizontalRule/>
              <ColSpan2>
                <Span4>크리에이티브명</Span4>
                <ValueText>나이키 특별 기획전 소재</ValueText>
              </ColSpan2>
            </Row>
            <Row>
              <ColSpan2>
                <Span4>PC 랜딩 url</Span4>
                <ValueText>https://nikestore.com</ValueText>
              </ColSpan2>
              <HorizontalRule/>
              <ColSpan2>
                <Span4>MOBILE 랜딩 url</Span4>
                <ValueText>https://m.nikestore.com</ValueText>
              </ColSpan2>
            </Row>
            <Row>
              <ColSpan2>
                <Span4>PC 인식 코드</Span4>
                <ValueText>2023.01.02 ~ 2024.01.01</ValueText>
                <small>9018203989123</small>
              </ColSpan2>
              <HorizontalRule/>
              <ColSpan2>
                <Span4>MOBILE 랜딩 코드</Span4>
                <ValueText>123123123123</ValueText>
              </ColSpan2>
            </Row>
          </RowSpan>
        </BoardSearchResult>
      </Board>
      <SubmitContainer>
        <CancelButton type={'button'} onClick={()=> navigate('/board/dashboard')}>목록</CancelButton>
        <SubmitButton type={'submit'}>저장</SubmitButton>
      </SubmitContainer>
    </form>
  )
}

export default CampaignInfoDetail