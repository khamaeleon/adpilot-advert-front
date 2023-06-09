import {
  Board,
  BoardHeader,
  BoardSearchResult,
  ColSpan1,
  ColSpan100, ColSpan3,
  ColTitle,
  Input, inputStyle,
  RelativeDiv,
  RowSpan,
  selectStyle,
  Span3,
  Span4
} from "../../assets/GlobalStyles";
import React, {useState} from "react";
import {CreateImage, Row} from "./styles/common";
import styled from "styled-components";
import {VerticalRule} from "../../components/common/Common";
import ImageUploading from "react-images-uploading";
import Select from "react-select";
import {ChromePicker} from 'react-color'
import {FrameEditor} from "./Frame/FrameEditor";

function ColorPicker ({onChange}) {
  const [color, setColor] = useState('#000000')
  const [colorChange, setColorChange] = useState(null)
  const [displayPicker, setDisplayPicker] = useState(false)

  const handleClickColor = (e) => {
    console.log(e.target)
    setDisplayPicker(!displayPicker)
  }

  const handleChangeComplete = (color) => {
    setColorChange(color.hex)
  }
  const handleChoiceColor = () => {
    setDisplayPicker(!displayPicker)
    setColor(colorChange)
    onChange(colorChange)
  }
  const popover = {
    position: 'absolute',
    zIndex: '2',
    bottom: 30,
    right: 0
  }

  const popButton = {
    width: '100%',
    height: 30,
    borderRadius: 0,
    backgroundColor: '#777',
    color: '#fff',
    boxShadow: '1px 3px 5px rgba(0, 0, 0, 0.5)'
  }

  return (
    <PickerContainer>
      <PickerHex>{color}</PickerHex>
      <PickerColor color={color} onClick={handleClickColor}/>
      {displayPicker ?
        <div style={ popover }>
          <ChromePicker
            color={colorChange !== null ? colorChange : '#000000'}
            onChangeComplete={handleChangeComplete}
          />
          <div style={{display: 'flex'}}>
            <button style={popButton} onClick={() => setDisplayPicker(!displayPicker)}>취소</button>
            <button style={popButton} onClick={handleChoiceColor}>선택</button>
          </div>

        </div>
        : null}
    </PickerContainer>
  )
}

export function BannerCreative() {
  const [frameSetting, setFrameSetting] = useState({
    info: {
      id: 0,
      sizeW: 200,
      sizeH: 200,
    },
    title: '',
    titleSize: 12,
    titleColor: '',
    titleBold: false,
    titleItalic: false,
    titleUnderline: false,
    titleFamily: '',
    mainImage: '',
    backgroundImage: '',
    backgroundColor: '',
    buttonTitle: '',
    buttonColor: '',
    buttonBackgroundColor: '',
  })
  const [isFontSetting, setIsFontSetting] = useState(false)
  const handleFontSelect = () => {
    setIsFontSetting(!isFontSetting)
  }

  const handleChangeTitle = (e) => {
    setFrameSetting({
      ...frameSetting,
      title: e.target.value
    })
  }

  const handleChangeImageBackground = (color) => {
    setFrameSetting({
      ...frameSetting,
      backgroundColor: color
    })
  }

  const handleChangeTitleColor = (color) => {
    setFrameSetting({
      ...frameSetting,
      titleColor: color
    })
  }

  const handleChangeButtonTitle = (e) => {
    setFrameSetting({
      ...frameSetting,
      buttonTitle: e.value !== '' ? e.label : ''
    })
  }

  const handleChangeButtonTitleColor = (color) => {
    setFrameSetting({
      ...frameSetting,
      buttonColor: color
    })
  }

  const handleChangeButtonBackgroundColor = (color) => {
    setFrameSetting({
      ...frameSetting,
      buttonBackgroundColor: color
    })
  }

  return (
    <>
      <Board>
        <BoardHeader>배너 크리에이터</BoardHeader>
        <BoardSearchResult>
          <RowSpan>
            <ColTitle>배너형 선택</ColTitle>
          </RowSpan>
          <BannerItemContainer>
            <RowSpan box={true} column={true}>
              <Row>
                <DefaultItemContainer style={{paddingRight: 15, borderRight: '1px solid #ddd'}}>
                  <DefaultItemButton
                    active={false}
                    onClick={()=> null}>정사각형</DefaultItemButton>
                  <DefaultItemButton
                    active={false}
                    onClick={()=>null}>가로 직사각형</DefaultItemButton>
                  <DefaultItemButton
                    active={false}
                    onClick={()=>null}>세로 직사각형</DefaultItemButton>
                </DefaultItemContainer>
                <DefaultItemContainer style={{paddingLeft: 15}}>
                  <DefaultItemButton
                    active={false}
                    onClick={()=> null}>신규</DefaultItemButton>
                  <DefaultItemButton
                    active={false}
                    onClick={()=> null}>불러오기</DefaultItemButton>
                </DefaultItemContainer>
              </Row>
            </RowSpan>
            <RowSpan box={true} column={true}>
              <Row>
                <Span3>
                  정사각형
                </Span3>
                <RelativeDiv>
                  <DefaultItemContainer>
                    <DefaultItemButton
                      active={false}
                      onClick={()=> null}>500px X 500px</DefaultItemButton>
                  </DefaultItemContainer>
                </RelativeDiv>
              </Row>
              <VerticalRule/>
              <Row>
                <Span3>
                  가로 직사각형
                </Span3>
                <RelativeDiv>
                  <DefaultItemContainer>
                    <DefaultItemButton
                      active={false}
                      onClick={()=> null}>500px X 500px</DefaultItemButton>
                    <DefaultItemButton
                      active={false}
                      onClick={()=> null}>500px X 500px</DefaultItemButton>
                  </DefaultItemContainer>
                </RelativeDiv>
              </Row>
              <VerticalRule/>
              <Row>
                <Span3>
                  세로 직사각형
                </Span3>
                <RelativeDiv>
                  <DefaultItemContainer>
                    <DefaultItemButton
                      active={false}
                      onClick={()=> null}>500px X 500px</DefaultItemButton>
                  </DefaultItemContainer>
                </RelativeDiv>
              </Row>
            </RowSpan>
          </BannerItemContainer>
          <RowSpan style={{gap: 10}}>
            <HalfDiv>
              <ColSpan1>랜딩정보</ColSpan1>
              <BannerItemContainer style={{height: '100%'}}>
                <RowSpan>
                  <Span4>PC 랜딩 URL</Span4>
                  <div style={{width: '100%'}}>
                    <Input
                      placeholder={'http:// 또는 https://를 포함한 URL 입력'}/>
                  </div>
                </RowSpan>
                <RowSpan>
                  <Span4>PC 인식코드</Span4>
                  <div style={{width: '100%'}}>
                    <Input/>
                  </div>
                </RowSpan>
                <RowSpan>
                  <Span4>Mobile 랜딩 URl</Span4>
                  <div style={{width: '100%'}}>
                    <Input
                      placeholder={'http:// 또는 https://를 포함한 URL 입력'}/>
                  </div>
                </RowSpan>
                <RowSpan>
                  <Span4>Mobile 인식코드</Span4>
                  <div style={{width: '100%'}}>
                    <Input/>
                  </div>
                </RowSpan>
              </BannerItemContainer>
            </HalfDiv>
            <HalfDiv>
              <ColSpan1>소재 상세 설정</ColSpan1>
              <BannerItemContainer style={{height: '100%', justifyContent: 'space-around'}}>
                <Row style={{position: 'relative'}}>
                  <span style={{width: 80, whiteSpace: 'nowrap'}}>광고 타이틀<p><small style={{color: '#ccc'}}>(최대 12글자)</small></p></span>
                  <div className={'txtCont'}>
                    <input
                      type={'text'}
                      maxLength={25}
                      name={'serviceName'}
                      value={frameSetting.title || ''}
                      onChange={handleChangeTitle}
                    />
                  </div>
                  <TextButton onClick={handleFontSelect}>A</TextButton>
                  {isFontSetting &&
                    <PopButton>
                      <Row>
                        <ColSpan1>글꼴</ColSpan1>
                        <ColSpan3>
                          <Select styles={selectStyle} ontions={[
                            {key: 0, value: 'normal', label: '돋움'}
                          ]}/>
                        </ColSpan3>
                      </Row>
                      <Row>
                        <ColSpan1>크기</ColSpan1>
                        <ColSpan3>
                          <Input/>
                        </ColSpan3>
                      </Row>
                      <Row>
                        <ColSpan1>효과</ColSpan1>
                        <ColSpan1 onClick={() => setFrameSetting({
                          ...frameSetting,
                          titleBold: !frameSetting.titleBold
                        })}><Effect active={frameSetting.titleBold}><strong>A</strong></Effect></ColSpan1>
                        <ColSpan1 onClick={() => setFrameSetting({
                          ...frameSetting,
                          titleItalic: !frameSetting.titleItalic
                        })}><Effect active={frameSetting.titleItalic}><i>A</i></Effect></ColSpan1>
                        <ColSpan1 onClick={() => setFrameSetting({
                          ...frameSetting,
                          titleUnderline: !frameSetting.titleUnderline
                        })}><Effect active={frameSetting.titleUnderline}><u>A</u></Effect></ColSpan1>
                      </Row>
                      <Row>
                        <ColSpan1>색상</ColSpan1>
                        <ColSpan3>
                          <ColorPicker onChange={handleChangeTitleColor}/>
                        </ColSpan3>
                      </Row>
                      <RowSpan>
                        <button onClick={handleFontSelect}>확인</button>
                      </RowSpan>
                    </PopButton>
                  }
                </Row>
                <Row style={{gap: 10, justifyContent: 'space-between'}}>
                  <Span4 style={{width: 80, whiteSpace: 'nowrap'}}>메인이미지<small></small><p><small style={{color: '#ccc'}}>(600*300 권장)</small></p></Span4>
                  <ColSpan100 padding={'0'} style={{maxWidth: '100px'}}>
                    <ImageUploading
                      multiple
                      acceptType={["jpg", "gif", "png"]}
                      maxFileSize={1048576}
                      maxNumber={5}
                      value={''}
                      onChange={() => null}
                    >
                      {({onImageUpload}) => (
                        <CreateImage/>
                      )}
                    </ImageUploading>
                  </ColSpan100>
                  <Span4 style={{width: 80, whiteSpace: 'nowrap'}}>배경이미지<small></small><p><small style={{color: '#ccc'}}>(600*300 권장)</small></p></Span4>
                  <ColSpan100 padding={'0'} style={{maxWidth: '100px'}}>
                    <ImageUploading
                      multiple
                      acceptType={["jpg", "gif", "png"]}
                      maxFileSize={1048576}
                      maxNumber={5}
                      value={''}
                      onChange={() => null}
                    >
                      {({onImageUpload}) => (
                        <CreateImage/>
                      )}
                    </ImageUploading>
                  </ColSpan100>
                  <Span4 style={{width: 80, whiteSpace: 'nowrap'}}>배경색</Span4>
                  <ColSpan100 padding={'0'} style={{maxWidth: '100%'}}>
                    <ColorPicker onChange={handleChangeImageBackground}/>
                  </ColSpan100>
                </Row>
                <Row>
                  <Row style={{gap: 10, justifyContent: 'space-between'}}>
                    <Span4 style={{width: 80, whiteSpace: 'nowrap'}}>클릭버튼<small></small><p><small style={{color: '#ccc'}}>(300*600 권장)</small></p></Span4>
                    <ColSpan100 padding={'0'} style={{maxWidth: '100%'}}>
                      <Select styles={selectStyle}
                              options={[
                                {key:0,value:'', label: '없음'},
                                {key:1,value:'download', label: '다운로드'},
                                {key:2,value:'rel', label: '바로가기'}
                              ]}
                              onChange={handleChangeButtonTitle}/>
                    </ColSpan100>
                    <Span4 style={{width: 80, whiteSpace: 'nowrap'}}>글자색</Span4>
                    <ColSpan100 padding={'0'} style={{maxWidth: '100%'}}>
                      <ColorPicker onChange={handleChangeButtonTitleColor}/>
                    </ColSpan100>
                    <Span4 style={{width: 80, whiteSpace: 'nowrap'}}>배경색</Span4>
                    <ColSpan100 padding={'0'} style={{maxWidth: '100%'}}>
                      <ColorPicker onChange={handleChangeButtonBackgroundColor}/>
                    </ColSpan100>
                  </Row>
                </Row>
              </BannerItemContainer>
            </HalfDiv>
          </RowSpan>
          <RowSpan style={{marginTop: 50}}>
            <ColSpan1>미리보기 & 편집</ColSpan1>
          </RowSpan>
          <RowSpan box={true}>
          <FlexWrap>
            <FrameEditor set={frameSetting}/>
          </FlexWrap>
        </RowSpan>
        </BoardSearchResult>
      </Board>
    </>
  )
}

const BannerItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  padding: 0 15px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  justify-content: space-around;
`
const DefaultItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 12px;
`
const DefaultItemButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 137px;
  height: 36px;
  background-color: #ffffff;
  border: 1px solid ${(props) => props.active ? '#f5811f' : '#e5e5e5'};
  color: ${(props) => props.active ? '#f5811f' : null};
  cursor: pointer;
  & p {
    padding: 0 20px
  }
`

const HalfDiv = styled.div`
  width: 50%;
`

const TextButton = styled.div`
  margin-left: 10px;
  width: 40px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #777777;
  font-weight: 900;
  color: #fff;
  border-radius: 3px;
`

const PopButton = styled.div`
  position: absolute;
  right: 0 ;
  top: 45px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px;
  border-radius: 0;
  background-color: #fff;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.2);
  z-index: 2;
`

const PickerContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ddd;
  padding: 5px;
  width: 100%;
`

const PickerHex = styled.div`
  white-space: nowrap;
`

const PickerColor = styled.div`
  position: relative;
  background-color: ${(props) => props.color ? props.color : '#000000'};
  width: 30px;
  height: 30px;
`

const FlexWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Effect = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  background-color: ${({active}) => active ? '#eee' : '#fff'};
  border-radius: 3px;
  & > * {
    margin-right: 0;
  }
`