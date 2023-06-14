import {
  Board,
  BoardHeader,
  BoardSearchResult,
  ColSpan1,
  ColSpan100,
  ColSpan3,
  ColTitle,
  Input,
  RelativeDiv,
  RowSpan,
  SearchButton,
  selectStyle,
  Span3,
  Span4
} from "../../assets/GlobalStyles";
import React, {useEffect, useState} from "react";
import {CreateImage, DeleteIcon, ImageUploadCard, Row} from "./styles/common";
import ImageUploading from "react-images-uploading";
import Select from "react-select";
import {ChromePicker} from 'react-color'
import {FrameEditor} from "./Frame/FrameEditor";
import {confirmAlert} from "react-confirm-alert";
import {uploadBannerImages} from "../../services/campaign/CreativeAxios";
import {toast} from "react-toastify";
import {database} from "./entity/bannerCreator";
import {
  BannerItemContainer,
  DefaultItemButton,
  DefaultItemContainer,
  Effect,
  FlexWrap,
  HalfDiv,
  PickerColor,
  PickerContainer,
  PickerHex,
  PopButton,
  TextButton
} from "./styles/bannerCreator";
import {de} from "date-fns/locale";

function ColorPicker ({onChange}) {
  const [color, setColor] = useState('#ffffff')
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
            color={colorChange !== null ? colorChange : '#ffffff'}
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
function stringToSize(size){
  const replaceString = size.replace('IMG','')
  const splitString = replaceString.split('_')
  return splitString[0] + 'px X ' + splitString[1] + 'px'
}

const imgSizeWidth = [ 'IMG120_600',  'IMG160_600', 'IMG100_200', 'IMG100_300', 'IMG100_400', 'IMG100_500', 'IMG100_600']
const imgSizeHeight = [ 'IMG300_150',]
const square = ['IMG200_200','IMG150_150','IMG300_300', 'IMG400_400', 'IMG500_500','IMG600_600']

export function BannerCreative() {
  const [data, setData] = useState([])
  const [defaultSetting, setDefaultSetting] = useState({
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

  useEffect(() => {
    //
    setData(database)
  },[])

  const [bannerTypes, setBannerTypes] = useState([])
  const [selectedBanner, setSelectedBanner] = useState([])

  const [isFontSetting, setIsFontSetting] = useState(false)
  const handleFontSelect = () => {
    setIsFontSetting(!isFontSetting)
  }

  const handleChangeTitle = (e) => {
    setDefaultSetting({
      ...defaultSetting,
      title: e.target.value
    })
  }

  const handleChangeImageBackground = (color) => {
    setDefaultSetting({
      ...defaultSetting,
      backgroundColor: color
    })
  }

  const handleChangeTitleColor = (color) => {
    setDefaultSetting({
      ...defaultSetting,
      titleColor: color
    })
  }

  const handleChangeButtonTitle = (e) => {
    setDefaultSetting({
      ...defaultSetting,
      buttonTitle: e.value !== '' ? e.label : ''
    })
  }

  const handleChangeButtonTitleColor = (color) => {
    setDefaultSetting({
      ...defaultSetting,
      buttonColor: color
    })
  }

  const handleChangeButtonBackgroundColor = (color) => {
    setDefaultSetting({
      ...defaultSetting,
      buttonBackgroundColor: color
    })
  }

  const handelChangeTitleSize = (e) => {
    setDefaultSetting({
      ...defaultSetting,
      titleSize: e.target.value
    })
  }

  const onImageError = (errors, type) => {
    if (errors.maxFileSize) {
      toast.warning('저장 가능한 이미지 사이즈는 '+ (type ==='logo'?'1MB':'10MB')+'입니다.')
    } else if (errors.maxNumber) {
      toast.warning('이미지는 5개 까지만 등록 가능합니다.')
    } else if (errors.acceptType) {
      toast.warning('"jpg", "gif", "png"의 형식만 등록 가능합니다.')
    }
  }

  const handleDeleteImage = (imagePath) => {
    confirmAlert({
      title: '알림',
      message: '해당 이미지를 삭제하시겠습니까?',
      buttons: [
        {
          label: '확인',
          onClick: () => {
            setDefaultSetting({
              ...defaultSetting,
              backgroundImage: ''
            })
          }
        },{
          label: '취소',
        }
      ]
    });
  }
  const onDrop = (pictureFiles) => {
    console.log(pictureFiles)
    if (pictureFiles.length !== 0) {
      setDefaultSetting({
        ...defaultSetting,
        backgroundImage: pictureFiles[0].dataURL
      });
      // pictureFiles.map((item ,index)=>{
      //   data.append('images', pictureFiles[index].file, pictureFiles[index].file.name)
      //   setDefaultSetting({
      //     ...defaultSetting,
      //     backgroundImage: pictureFiles[index].file
      //   })
      //   return null
      // })
    }
  }
  const handleDeleteMainImage = (imagePath) => {
    confirmAlert({
      title: '알림',
      message: '해당 이미지를 삭제하시겠습니까?',
      buttons: [
        {
          label: '확인',
          onClick: () => {
            setDefaultSetting({
              ...defaultSetting,
              mainImage: ''
            })
          }
        },{
          label: '취소',
        }
      ]
    });
  }
  const onDropMain = (pictureFiles) => {
    console.log(pictureFiles)
    if (pictureFiles.length !== 0) {
      const reader = new FileReader();
      reader.readAsDataURL(pictureFiles[0].file);

      return new Promise((resolve) => {
        reader.onload = () => {
          const image = new Image()
          image.src = pictureFiles[0].dataURL
          image.onload = function () {
            console.log(this.width, this.height)
            setDefaultSetting({
              ...defaultSetting,
              mainImage: {
                url: pictureFiles[0].dataURL,
                ratio: this.width/this.height,
              }
            });
          }
          resolve();
        };
      });


      // pictureFiles.map((item ,index)=>{
      //   data.append('images', pictureFiles[index].file, pictureFiles[index].file.name)
      //   return null
      // })
      // uploadBannerImages(data, "IMG600_300").then(response => {
      //   console.log(response)
      //   if(response) {
      //     setDefaultSetting({
      //       ...defaultSetting,
      //       mainImage: response.images[0].imagePath
      //     })
      //   }
      // })
    }
  }

  const includeItem = (type) => {
    return bannerTypes.includes(type)
  }
  const includeBanner = (type) => {
    return selectedBanner.includes(type)
  }

  const handleClickStep = (type) => {
    if(bannerTypes.filter(datum => datum === type).length === 0){
      setBannerTypes(prev => [...prev, type])
    } else {
      const newItemType = bannerTypes.filter(datum => datum !== type)
      setBannerTypes(newItemType)
    }
  }
  const handleSelectBannerType = (type) => {
    console.log(type)
    if(selectedBanner.filter(datum => datum === type).length === 0){
      setSelectedBanner(prev => [...prev, type])
    } else {
      const newItemType = selectedBanner.filter(datum => datum !== type)
      setSelectedBanner(newItemType)
    }
  }

  const handleFocusSelected = (frameId) => {
    console.log(frameId)
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
                    active={includeItem('square')}
                    onClick={()=> handleClickStep('square')}>정사각형</DefaultItemButton>
                  <DefaultItemButton
                    active={includeItem('width')}
                    onClick={()=>handleClickStep('width')}>가로 직사각형</DefaultItemButton>
                  <DefaultItemButton
                    active={includeItem('height')}
                    onClick={()=>handleClickStep('height')}>세로 직사각형</DefaultItemButton>
                </DefaultItemContainer>
                <DefaultItemContainer style={{paddingLeft: 15}}>
                  <DefaultItemButton
                    active={false}
                    style={{backgroundColor: '#777', color: '#fff'}}
                    onClick={()=> null}>신규</DefaultItemButton>
                  <DefaultItemButton
                    active={false}
                    style={{backgroundColor: '#777', color: '#fff'}}
                    onClick={()=> null}>불러오기</DefaultItemButton>
                </DefaultItemContainer>
              </Row>
            </RowSpan>
            {bannerTypes.length !== 0 &&
              <RowSpan box={true} column={true}>
                {bannerTypes.includes('square') &&
                  <Row>
                    <Span3>
                      정사각형
                    </Span3>
                    <RelativeDiv>
                      <DefaultItemContainer>
                        {square.map((item, index)=> {
                          return (
                            <DefaultItemButton key={index}
                              active={includeBanner(item)}
                              onClick={()=> handleSelectBannerType(item)}>{stringToSize(item)}</DefaultItemButton>
                          )
                        })}
                      </DefaultItemContainer>
                    </RelativeDiv>
                  </Row>
                }
                {bannerTypes.includes('width') &&
                  <Row>
                    <Span3>
                      가로 직사각형
                    </Span3>
                    <RelativeDiv>
                      <DefaultItemContainer>
                        {imgSizeWidth.map((item, index)=> {
                          return (
                            <DefaultItemButton key={index}
                              active={includeBanner(item)}
                              onClick={()=> handleSelectBannerType(item)}>{stringToSize(item)}</DefaultItemButton>
                          )
                        })}
                      </DefaultItemContainer>
                    </RelativeDiv>
                  </Row>
                }
                {bannerTypes.includes('height') &&
                  <Row>
                    <Span3>
                      세로 직사각형
                    </Span3>
                    <RelativeDiv>
                      <DefaultItemContainer>
                      {imgSizeHeight.map((item, index)=> {
                        return (
                          <DefaultItemButton key={index}
                            active={includeBanner(item)}
                            onClick={()=> handleSelectBannerType(item)}>{stringToSize(item)}</DefaultItemButton>
                        )
                      })}
                      </DefaultItemContainer>
                    </RelativeDiv>
                  </Row>
                }
              </RowSpan>
            }
          </BannerItemContainer>
          {selectedBanner.length !== 0 &&
          <>
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
                        value={defaultSetting.title || ''}
                        onChange={handleChangeTitle}
                        placeholder={'광고 제목을 입력해주세요 (12자)'}
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
                            <Input value={defaultSetting.titleSize} onChange={handelChangeTitleSize}/>
                            <ColTitle>px</ColTitle>
                          </ColSpan3>
                        </Row>
                        <Row>
                          <ColSpan1>효과</ColSpan1>
                          <ColSpan1 onClick={() => setDefaultSetting({
                            ...defaultSetting,
                            titleBold: !defaultSetting.titleBold
                          })}><Effect active={defaultSetting.titleBold}><strong>A</strong></Effect></ColSpan1>
                          <ColSpan1 onClick={() => setDefaultSetting({
                            ...defaultSetting,
                            titleItalic: !defaultSetting.titleItalic
                          })}><Effect active={defaultSetting.titleItalic}><i>A</i></Effect></ColSpan1>
                          <ColSpan1 onClick={() => setDefaultSetting({
                            ...defaultSetting,
                            titleUnderline: !defaultSetting.titleUnderline
                          })}><Effect active={defaultSetting.titleUnderline}><u>A</u></Effect></ColSpan1>
                        </Row>
                        <Row>
                          <ColSpan1>색상</ColSpan1>
                          <ColSpan3>
                            <ColorPicker onChange={handleChangeTitleColor}/>
                          </ColSpan3>
                        </Row>
                        <RowSpan>
                          <SearchButton style={{width: '100%'}} onClick={handleFontSelect}>확인</SearchButton>
                        </RowSpan>
                      </PopButton>
                    }
                  </Row>
                  <Row style={{gap: 10, justifyContent: 'space-between'}}>
                    <Span4 style={{width: 80, whiteSpace: 'nowrap'}}>메인이미지<small></small><p><small style={{color: '#ccc'}}>(600*300 권장)</small></p></Span4>
                    <ColSpan100 padding={'0'} style={{maxWidth: '100px'}}>
                      {defaultSetting.mainImage === '' ?
                        <ImageUploading
                          multiple
                          acceptType={["jpg", "gif", "png"]}
                          onChange={onDropMain}
                          maxFileSize={10485760}
                          maxNumber={5}
                          onError={(e) => onImageError(e,'image')}
                        >
                          {({onImageUpload}) => (
                            <CreateImage onClick={onImageUpload}/>
                          )}
                        </ImageUploading>
                        :
                        <ImageUploadCard>
                          <DeleteIcon onClick={() => handleDeleteMainImage(defaultSetting.mainImage)}/>
                          <img src={defaultSetting.mainImage.url} alt={'배너이미지'}/>
                        </ImageUploadCard>
                      }
                    </ColSpan100>
                    <Span4 style={{width: 80, whiteSpace: 'nowrap'}}>배경이미지<small></small><p><small style={{color: '#ccc'}}>(600*300 권장)</small></p></Span4>
                    <ColSpan100 padding={'0'} style={{maxWidth: '100px'}}>
                      {defaultSetting.backgroundImage === '' ?
                        <ImageUploading
                          multiple
                          acceptType={["jpg", "gif", "png"]}
                          onChange={onDrop}
                          maxFileSize={10485760}
                          maxNumber={5}
                          onError={(e) => onImageError(e,'image')}
                        >
                          {({onImageUpload}) => (
                            <CreateImage onClick={onImageUpload}/>
                          )}
                        </ImageUploading>
                        :
                        <ImageUploadCard>
                          <DeleteIcon onClick={() => handleDeleteImage(defaultSetting.backgroundImage)}/>
                          <img src={defaultSetting.backgroundImage} alt={'배너이미지'}/>
                        </ImageUploadCard>
                      }
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
                                  {key:1,value:'typeA', label: '다운로드'},
                                  {key:2,value:'typeB', label: '바로가기'},
                                  {key:3,value:'typeC', label: '참여하기'}
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
                {selectedBanner.map((item, key) => {
                  return (
                    <FrameEditor set={defaultSetting} size={item} key={key} focused={handleFocusSelected}/>
                  )
                })}
              </FlexWrap>
            </RowSpan>
          </>
          }
        </BoardSearchResult>
      </Board>
    </>
  )
}
