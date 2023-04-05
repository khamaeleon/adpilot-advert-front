import {CampaignFour} from "./steps/CampaignFour";
import {
  Board,
  BoardHeader, BoardSearchResult,
  CancelButton, ColSpan1,
  ColSpan100, ColSpan2, ColSpan3,
  ColSpan4, Input, RelativeDiv,
  RowSpan, selectStyle, Span3,
  Span4,
  SubmitButton,
  SubmitContainer
} from "../../assets/GlobalStyles";
import React, {useState} from "react";
import {
  CampaignButton,
  CategoryItem,
  CreateImage,
  DeleteIcon, ImageTitle,
  ImageUploadCard,
  LoadButton, PrevImage, ResistBanner, Row, RowBody, RowHeader,
  SelectCategory
} from "./styles/common";
import {HorizontalRule} from "../../components/common/Common";
import Select from "react-select";
import {SearchAdvertiser} from "../../components/common/SearchAdvertiser";

const RegistryBannerItem = (props) => {
  return (
    <RowSpan style={{width: '50%'}}>
      <ColSpan4>
        <Span4 style={{textAlign:'right',whiteSpace:'nowrap'}}>{props.bannerSize}</Span4>
        <RowSpan box={true}>
          <ColSpan100 padding={'0'}>
            <DeleteIcon/>
            <ImageUploadCard>
              <img src={'../assets/images/common/sample1.png'} alt={'이미지'}/>
            </ImageUploadCard>
          </ColSpan100>
          <ColSpan100 padding={'0'}>
            <DeleteIcon/>
            <ImageUploadCard>
              <img src={'../assets/images/common/sample1.png'} alt={'이미지'}/>
            </ImageUploadCard>
          </ColSpan100>
          <ColSpan100 padding={'0'}>
            <DeleteIcon/>
            <ImageUploadCard>
              <img src={'../assets/images/common/sample2.png'} alt={'이미지'}/>
            </ImageUploadCard>
          </ColSpan100>
          <ColSpan100 padding={'0'}>
            <DeleteIcon/>
            <ImageUploadCard>
              <img src={'../assets/images/common/sample1.png'} alt={'이미지'}/>
            </ImageUploadCard>
          </ColSpan100>
          <ColSpan100 padding={'0'}>
            <CreateImage/>
          </ColSpan100>
        </RowSpan>
      </ColSpan4>
    </RowSpan>
  )
}
function CampaignFourBanner () {
  const bannerSize = [{name: '250*250'},{name: '250*250'},{name: '250*250'},{name: '250*250'},{name: '250*250'},{name: '250*250'},{name: '250*250'},{name: '250*250'},{name: '250*250'}]

  return (
    <>
      <RowSpan column={true}>
        <Span4>랜딩 url</Span4>
        <RowSpan box={true} column={false}>
          <ColSpan2>
            <Span3>PC 랜딩 url</Span3>
            <Input/>
          </ColSpan2>
          <HorizontalRule style={{height:42}}/>
          <ColSpan2>
            <Span4>MOBILE 랜딩 url</Span4>
            <Input/>
          </ColSpan2>
        </RowSpan>
      </RowSpan>
      <RowSpan column={true}>
        <Span4>인식 코드</Span4>
        <RowSpan box={true} column={false}>
          <ColSpan2>
            <Span3>PC 인식 코드</Span3>
            <Input/>
          </ColSpan2>
          <HorizontalRule style={{height:42}}/>
          <ColSpan2>
            <Span4>MOBILE 인식 코드</Span4>
            <Input/>
          </ColSpan2>
        </RowSpan>
      </RowSpan>
      <RowSpan column={true}>
        <Span4>광고 소재</Span4>
        <div style={{marginTop:15}}>
          <SelectCategory style={{padding:20,borderRadius:'5px 5px 0 0'}}>
            {bannerSize.map((item, key) => {
              return (
                <CategoryItem key={key}>{item.name}</CategoryItem>
              )
            })}
          </SelectCategory>
          <ResistBanner>
            <p style={{color: '#ccc'}}>사이즈별 소재는 최대 5개까지 등록 가능합니다.</p>
            <div style={{display:'flex', flexWrap:'wrap'}}>
              <RegistryBannerItem bannerSize={'250*250'}/>
              <RegistryBannerItem bannerSize={'250*250'}/>
              <RegistryBannerItem bannerSize={'250*250'}/>
            </div>
          </ResistBanner>
        </div>
      </RowSpan>
      <RowSpan box={true} column={true} style={{padding:0,backgroundColor:'#fff'}}>
        <RowHeader>소재 상세 설정 (선택 입력) <small style={{color: '#ccc'}}>로고 이미지 및 광고 문안을 자세히 설정할 수 있습니다.</small></RowHeader>
        <RowBody>
          <ColSpan2 column={true}>
            <Row>
              <span style={{fontSize: 14}}>소재설정</span>
            </Row>
            <Row>
              <span>광고 타이틀</span>
              <input type={'text'}/>
            </Row>
            <Row>
              <span>광고 제목1<p><small style={{color:'#ccc'}}>최대 5개 까지 등록</small></p></span>
              <input type={'text'}/>
            </Row>
            <Row>
              <span>광고 제목2</span>
              <input type={'text'}/>
            </Row>
            <Row>
              <span>긴 광고 제목<p><small style={{color:'#ccc'}}>최대 5개 까지 등록</small></p></span>
              <input type={'text'}/>
            </Row>
            <Row>
              <span>클릭 유도 문안</span>
              <Select styles={selectStyle}/>
            </Row>
          </ColSpan2>
          <div style={{width: 1,margin: '0 30px',backgroundColor:'#ddd'}}/>
          <ColSpan2 column={true}>
            <Row>
              <span style={{fontSize: 14}}>서비스 (회사) 정보</span>
            </Row>
            <Row style={{alignItems:'flex-start'}}>
              <span>로고이미지<p><small style={{color:'#ccc'}}>최대 5개 까지 등록</small></p></span>
              <RowSpan box={true} style={{marginTop:0,width: '80%'}}>
                <ColSpan100 padding={'0'}>
                  <DeleteIcon/>
                  <ImageUploadCard>
                    <img src={'../assets/images/common/sample1.png'}/>
                  </ImageUploadCard>
                </ColSpan100>
                <ColSpan100 padding={'0'}>
                  <DeleteIcon/>
                  <ImageUploadCard>
                    <img src={'../assets/images/common/sample1.png'}/>
                  </ImageUploadCard>
                </ColSpan100>
                <ColSpan100 padding={'0'}>
                  <DeleteIcon/>
                  <ImageUploadCard>
                    <img src={'../assets/images/common/sample2.png'}/>
                  </ImageUploadCard>
                </ColSpan100>
                <ColSpan100 padding={'0'}>
                  <DeleteIcon/>
                  <ImageUploadCard>
                    <img src={'../assets/images/common/sample1.png'}/>
                  </ImageUploadCard>
                </ColSpan100>
                <ColSpan100 padding={'0'}>
                  <CreateImage/>
                </ColSpan100>
              </RowSpan>
            </Row>
            <Row>
              <span>서비스 명</span>
              <input type={'text'}/>
            </Row>
            <Row>
              <span>광고 설명</span>
              <input type={'text'}/>
            </Row>
          </ColSpan2>

        </RowBody>
      </RowSpan>
      <RowSpan>
        <ColSpan4>
          <Span4>크리에이티브 명</Span4>
          <RelativeDiv>
            <Input value={'픽셀명_광고상품명_설정 목표명_광고 그룹_YYYY.MM.DD HH:MM'} readOnly/>
          </RelativeDiv>
        </ColSpan4>
      </RowSpan>
    </>
  )
}

function CampaignFourNative () {
  return (
    <>
      <RowSpan column={true}>
        <Span4>랜딩 url</Span4>
        <RowSpan box={true} column={false}>
          <ColSpan2>
            <Span3>PC 랜딩 url</Span3>
            <Input/>
          </ColSpan2>
          <HorizontalRule style={{height:42}}/>
          <ColSpan2>
            <Span4>MOBILE 랜딩 url</Span4>
            <Input/>
          </ColSpan2>
        </RowSpan>
      </RowSpan>
      <RowSpan column={true}>
        <Span4>인식 코드</Span4>
        <RowSpan box={true} column={false}>
          <ColSpan2>
            <Span3>PC 인식 코드</Span3>
            <Input/>
          </ColSpan2>
          <HorizontalRule style={{height:42}}/>
          <ColSpan2>
            <Span4>MOBILE 인식 코드</Span4>
            <Input/>
          </ColSpan2>
        </RowSpan>
      </RowSpan>
      <RowSpan>
        <ColSpan3>
          <Span4>광고소재</Span4>
        </ColSpan3>
        <ColSpan1>
          <Span4>미리보기</Span4>
        </ColSpan1>
      </RowSpan>
      <RowSpan>
        <ColSpan3>
          <RowSpan box={true} column={true} padding={'0'} style={{padding: '20px 30px',backgroundColor:'#fff'}}>
            <Row>
              <span style={{fontSize: 14}}>소재설정</span>
            </Row>
            <Row>
              <span>이미지</span>
              <RowSpan style={{marginTop:0,gap: 10}}>
                <ColSpan100 padding={'0'}>
                  <DeleteIcon/>
                  <ImageUploadCard>
                    <img src={'../assets/images/common/sample1.png'}/>
                  </ImageUploadCard>
                </ColSpan100>
                <ColSpan100 padding={'0'}>
                  <CreateImage/>
                </ColSpan100>
              </RowSpan>
            </Row>
            <Row>
              <span>광고 타이틀</span>
              <input type={'text'}/>
            </Row>
            <Row>
              <span>광고 제목1 (선택)<p><small style={{color:'#ccc'}}>최대 5개 까지 등록</small></p></span>
              <input type={'text'}/>
            </Row>
            <Row>
              <span>광고 제목2 (선택)</span>
              <input type={'text'}/>
            </Row>
            <Row>
              <span>긴 광고 제목 (선택)<p><small style={{color:'#ccc'}}>최대 5개 까지 등록</small></p></span>
              <input type={'text'}/>
            </Row>
            <Row>
              <span>클릭 유도 문안 (선택)</span>
              <Select styles={selectStyle}/>
            </Row>
          </RowSpan>
        </ColSpan3>
        <ColSpan1 style={{alignItems: 'flex-start'}}>
          <RowSpan box={true}>
            <PrevImage>
              <ImageTitle>250*250 소재</ImageTitle>
            </PrevImage>
          </RowSpan>
        </ColSpan1>
      </RowSpan>
      <RowSpan>
        <ColSpan3>
          <RowSpan box={true} column={true} padding={'0'} style={{padding: '20px 30px',backgroundColor:'#fff'}}>
            <Row>
              <span>서비스 명</span>
              <input type={'text'}/>
            </Row>
            <Row>
              <span>로고 <p><small style={{color:'#ccc'}}>최대 5개 까지 등록</small></p></span>
              <RowSpan style={{marginTop:0,gap: 10}}>
                <ColSpan100 padding={'0'}>
                  <DeleteIcon/>
                  <ImageUploadCard>
                    <img src={'../assets/images/common/sample1.png'}/>
                  </ImageUploadCard>
                </ColSpan100>
                <ColSpan100 padding={'0'}>
                  <CreateImage/>
                </ColSpan100>
              </RowSpan>
            </Row>
            <Row>
              <span>광고 설명 (선택)</span>
              <input type={'text'}/>
            </Row>
          </RowSpan>
        </ColSpan3>
      </RowSpan>
      <RowSpan>
        <ColSpan4>
          <Span4>크리에이티브 명</Span4>
          <RelativeDiv>
            <Input value={'픽셀명_광고상품명_설정 목표명_광고 그룹_YYYY.MM.DD HH:MM'} readOnly/>
          </RelativeDiv>
        </ColSpan4>
      </RowSpan>
    </>
  )
}
export default function CreateCreative() {
  const [creativeGroup, setCreativeGroup] = useState('banner')
  return (
    <>
      <Board>
        <BoardHeader>크리에이티브 생성</BoardHeader>
        <BoardSearchResult>
          <RowSpan>
            <ColSpan4>
              <Span4>광고주 설정</Span4>
              <Input style={{width: 300}} readOnly/>
              <SearchAdvertiser title={'광고주 검색'}/>
            </ColSpan4>
          </RowSpan>
          <Span4>크리에이티브 그룹 선택</Span4>
          <RowSpan box={true} column={false}>
            <ColSpan1 padding={'0'}>
              <CampaignButton
                onClick={() => setCreativeGroup('banner')}
                className={creativeGroup === 'banner' ? 'on': null}
              >고정 배너</CampaignButton>
              <CampaignButton
                onClick={() => setCreativeGroup('native')}
                className={creativeGroup === 'native' ? 'on': null}
              >네이티브</CampaignButton>
            </ColSpan1>
            <HorizontalRule style={{margin: '0',height: 50}}/>
            <ColSpan1 padding={'0'}>
              <LoadButton>크리에이티브 불러오기</LoadButton>
            </ColSpan1>
            <ColSpan2>
              <span>나이키_특별 기획_노출 집중그룹_YYYY.MM.DD HH:MM</span>
            </ColSpan2>
          </RowSpan>
          {creativeGroup === 'banner' &&
            <CampaignFourBanner/>
            ||
            <CampaignFourNative/>
          }
        </BoardSearchResult>
      </Board>
      <SubmitContainer>
        <SubmitButton type={'submit'}>크리에이티브 생성</SubmitButton>
      </SubmitContainer>
    </>
  )
}