import {
  Board,
  BoardHeader,
  BoardSearchResult,
  CancelButton,
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
import React, {useState} from "react";
import {CreateImage, DeleteIcon, ImageUploadCard, Row, Validation} from "./styles/common";
import ImageUploading from "react-images-uploading";
import Select from "react-select";
import {ChromePicker} from 'react-color'
import {FrameEditor} from "./Frame/FrameEditor";
import {confirmAlert} from "react-confirm-alert";
import {toast, ToastContainer} from "react-toastify";
import {fontTypes} from "./entity/bannerCreator";
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
import styled from "styled-components";
import {ButtonGroup, SignUpVerify} from "../signup/styles";
import {useForm} from "react-hook-form";
import {useAtom, useSetAtom} from "jotai";
import {modalController} from "../../store";
import {ModalBody, ModalFooter, ModalHeader} from "../../components/modal/Modal";
import {PreviewSubmit} from "../../components/table/styles";
import {useIndexedDB} from "react-indexed-db";
import {atomWithReset, useResetAtom} from "jotai/utils";

//사이즈 정의
const imgSizeWidth = [ 'IMG120_600',  'IMG160_600', 'IMG100_200', 'IMG100_300', 'IMG100_400', 'IMG100_500', 'IMG100_600']
const imgSizeHeight = [ 'IMG300_150',]
const square = ['IMG150_150','IMG200_200','IMG300_300', 'IMG400_400', 'IMG500_500','IMG600_600']

function ColorPicker ({onChange, defaultColor}) {
  const [color, setColor] = useState(defaultColor)
  const [colorChange, setColorChange] = useState(null)
  const [displayPicker, setDisplayPicker] = useState(false)
  // 컬러피커 클릭
  const handleClickColor = () => {
    setDisplayPicker(!displayPicker)
  }
  // 컬러 변환
  const handleChangeColor = (color) => {
    setColorChange(color.hex)
  }
  // 변환 완료
  const handleChangeColorComplete = (color) => {
    setColorChange(color.hex)
  }
  // 컬러 선택 완료
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
            color={colorChange !== null ? colorChange : defaultColor}
            onChange={handleChangeColor}
            onChangeComplete={handleChangeColorComplete}
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
function BannerList ({list, frameKey, setFrameKey}) {
  const setModalOpen = useSetAtom(modalController)
  const btnSmall = { width: 100, height: 42 }
  const [key, setKey] = useState()

  const handleClick = (boolean) => {
    if(boolean) {
      setFrameKey(key)
    }
    setModalOpen({
      isShow: false,
      modalComponent: null
    })
  }
  return (
    <div>
      <ModalHeader title={'배너 불러오기'}/>
      <ModalBody>
        {list.length !== 0 ?
         <>
           <BannerListItem style={{fontWeight: 'bold'}}>
             <div style={{width: 70}}>아이디</div>
             <div>광고제목</div>
             <div style={{width: 120}}>업데이트</div>
           </BannerListItem>
           {list.length !== 0 && list.map((banner, index) => {
             return (
               <BannerListItem style={{backgroundColor: key === banner.key ? '#ddd' : '#fff'}} key={index} onClick={() => setKey(banner.key)}>
                 <div style={{width: 70}}>{banner.key}</div>
                 <div style={{textAlign: 'left'}}>{banner.title.text}</div>
                 <div style={{width: 120}}>{banner.date}</div>
               </BannerListItem>
             )
           })}
         </>
        :
          <div>데이터가 없습니다.</div>
        }
      </ModalBody>
      <ModalFooter style={{borderTop: 0, paddingTop: 5}}>
        <CancelButton style={btnSmall} onClick={()=>handleClick(false)}>취소</CancelButton>
        <PreviewSubmit style={btnSmall} onClick={()=>handleClick(list.length !== 0)}>확인</PreviewSubmit>
      </ModalFooter>
    </div>
  )
}

const defaultAtom = atomWithReset({
  pcUrl: '',
  pcCode: '',
  mobileUrl: '',
  mobileCode: '',
  title: {
    text: '',
    fontSize: 16,
    color: '#222222',
    fontFamily: '',
    fontWeight: 'normal',
    fontStyle: 'normal',
    textDecoration: 'none',
  },
  mainImage: '',
  background: {
    backgroundImage: '',
    backgroundColor: '#ffffff',
  },
  button: {
    text: '',
    color: '#222222',
    backgroundColor: '#ffffff',
  }
})

export function BannerCreative() {
  const [defaultSetting, setDefaultSetting] = useAtom(defaultAtom)
  const resetSettings = useResetAtom(defaultAtom)
  const [publicSetting, setPublicSetting] = useState([])
  const [bannerTypes, setBannerTypes] = useState([])
  const [selectedBanner, setSelectedBanner] = useState([])
  const [isFontSetting, setIsFontSetting] = useState(false)
  const [isIframeKey, setIsIframeKey] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const {register, reset, handleSubmit, formState: {errors}} = useForm()
  const setModalOpen = useSetAtom(modalController)
  const { getByID, getAll, update, add } = useIndexedDB('frameTable')
  const [guide, setGuide] = useState(false)
  /** 스냅 가이드 모드 **/
  const handleChangeMode = () =>{
    setGuide(!guide)
  }
  /** 글꼴 정의 팝업 **/
  const handleFontSelect = () => {
    setIsFontSetting(!isFontSetting)
  }
  /** 광고 제목 입력 **/
  const handleChangeTitle = (e) => {
    setDefaultSetting({
      ...defaultSetting,
      title: {
        ...defaultSetting.title,
        text: e.target.value
      }
    })
  }
  /** 광고 제목 글꼴 색 **/
  const handleChangeTitleColor = (color) => {
    setDefaultSetting({
      ...defaultSetting,
      title: {
        ...defaultSetting.title,
        color: color
      }
    })
  }
  /** 광고 제목 글꼴 크기 **/
  const handelChangeTitleSize = (e) => {
    setDefaultSetting({
      ...defaultSetting,
      title: {
        ...defaultSetting.title,
        fontSize: e.target.value
      }
    })
  }
  /** 광고 제목 글꼴 선택 **/
  const handleChangeFontFamily = (fontFamily) =>{
    setDefaultSetting({
      ...defaultSetting,
      title: {
        ...defaultSetting.title,
        fontFamily: fontFamily.value
      }
    })
  }
  /**  배경색 **/
  const handleChangeImageBackground = (color) => {
    setDefaultSetting({
      ...defaultSetting,
      background: {
        ...defaultSetting.background,
        backgroundColor: color
      }
    })
  }
  /** 버튼 글자 선택 **/
  const handleChangeButtonTitle = (e) => {
    setDefaultSetting({
      ...defaultSetting,
      button: {
        ...defaultSetting.button,
        text: e.value !== '' ? e.label : ''
      }
    })
  }
  /** 버튼 글자 색**/
  const handleChangeButtonTitleColor = (color) => {
    setDefaultSetting({
      ...defaultSetting,
      button: {
        ...defaultSetting.button,
        color: color
      }
    })
  }
  /** 버튼 배경 색 **/
  const handleChangeButtonBackgroundColor = (color) => {
    setDefaultSetting({
      ...defaultSetting,
      button: {
        ...defaultSetting.button,
        backgroundColor: color
      }
    })
  }
  /** 업로드 에러 **/
  const onImageError = (errors, type) => {
    if (errors.maxFileSize) {
      toast.warning('저장 가능한 이미지 사이즈는 '+ (type ==='logo'?'1MB':'10MB')+'입니다.')
    } else if (errors.maxNumber) {
      toast.warning('이미지는 5개 까지만 등록 가능합니다.')
    } else if (errors.acceptType) {
      toast.warning('"jpg", "gif", "png"의 형식만 등록 가능합니다.')
    }
  }
  /** 배경 이미지 삭제 **/
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
              background: {
                ...defaultSetting.background,
                backgroundImage: ''
              }
            })
          }
        },{
          label: '취소',
        }
      ]
    });
  }
  /** 배경 이미지 업로드 **/
  const onDrop = (pictureFiles) => {
    console.log(pictureFiles)
    if (pictureFiles.length !== 0) {
      setDefaultSetting({
        ...defaultSetting,
        background: {
          ...defaultSetting.background,
          backgroundImage: pictureFiles[0].dataURL
        }
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
  /** 메인 이미지 업로드 삭제 **/
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
  /** 메인 이미지 업로드 **/
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
            const obj = {
              url: pictureFiles[0].dataURL,
              width:this.width,
              height: this.height,
            }
            setDefaultSetting({
              ...defaultSetting,
              mainImage: obj
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
  /** 배너 형태 확인하는 함수 **/
  const includeItem = (type) => {
    return bannerTypes.includes(type)
  }
  /** 배너 사이즈 확인하는 함수 **/
  const includeBanner = (type) => {
    return selectedBanner.includes(type)
  }
  /** 배너 형태 선택 **/
  const handleClickStep = (type) => {
    if(bannerTypes.filter(datum => datum === type).length === 0){
      setBannerTypes(prev => [...prev, type])
    } else {
      const newItemType = bannerTypes.filter(datum => datum !== type)
      setBannerTypes(newItemType)
    }
  }
  /** 배너 사이즈 선택 **/
  const handleSelectBannerType = (type) => {
    if(selectedBanner.filter(datum => datum === type).length === 0){
      setSelectedBanner(prev => [...prev, type])
    } else {
      const newItemType = selectedBanner.filter(datum => datum !== type)
      setSelectedBanner(newItemType)

      const newPublicSet = publicSetting.filter(datum => datum.size !== type)
      setPublicSetting(newPublicSet)
    }
  }
  /** PC랜딩 URL **/
  const handleChangePcUrl = (e) => {
    setDefaultSetting({
      ...defaultSetting,
      pcUrl: e.target.value
    })
  }
  /** PC코드 **/
  const handleChangePcCode = (e) => {
    setDefaultSetting({
      ...defaultSetting,
      pcCode: e.target.value
    })
  }
  /** 모바일 랜딩 url **/
  const handleChangeMobileUrl = (e) => {
    setDefaultSetting({
      ...defaultSetting,
      mobileUrl: e.target.value
    })
  }
  /** 모바일코드 **/
  const handleChangeMobileCode = (e) => {
    setDefaultSetting({
      ...defaultSetting,
      mobileCode: e.target.value
    })
  }
  /** 사이즈별 위치정보 저장 **/
  const handleSetPublicPosition = (value) => {
    if(publicSetting.length === 0) {
      setPublicSetting([value])
    } else {
      // 추가된 배열의 사이즈가 있고 같은경우
      if(publicSetting.some(item => item.size === value.size)){
        //데이터 없데이트
        const updateData = publicSetting.map((item) =>
          item.size === value.size ? {...item, ...value} : item
        )
        // 셋스테이트 일으켜서 리랜더링
        setPublicSetting(updateData)
      } else {
        // 기존 배열에 사이즈가 없는경우
        // 새로추가된 배너만 추가
        setPublicSetting(publicSetting.concat(value))
      }
    }
  }

  /** 리드 **/
  const readIndexedDBValue = (key) => {
    getByID(key).then(response =>{
      setSelectedBanner(response.row.map(item => item.size))
      setDefaultSetting({
        key: response.key,
        pcUrl: response.pcUrl,
        pcCode: response.pcCode,
        mobileUrl: response.mobileUrl,
        mobileCode: response.mobileCode,
        title: response.title,
        background: response.background,
        button: response.button,
        mainImage: response.mainImage,
      })
      setPublicSetting(response.row)
      setBannerTypes(['square','width','height'])
      // 여기서부터
      window.localStorage.setItem('frameData', JSON.stringify(response))
      setIsLoading(false)
      if(selectedBanner.length !== 0) {
        setTimeout(()=>{
          setIsLoading(true)
        },1000)
      }
      // 여기까지는 서비스 전에 삭제 할것
    })
  }
  /** 크리에이트 **/
  const createIndexedDB = async (data) => {
    await add(data).then(response => {
      console.log(response)
    })
  }
  /** 업데이트 **/
  const putIndexedDB = async (data) => {
    await update(data).then(response => {
      console.log(response)
    })
  }
  /** 저장 **/
  const handleSaveFrameData = async () => {
    const newData = Object.assign(defaultSetting, {date: new Date().toLocaleDateString(), row: publicSetting})
    window.localStorage.setItem('frameData', JSON.stringify(newData))
    if(isIframeKey !== null) {
      await putIndexedDB(newData)
    } else {
      await createIndexedDB(newData)
    }
    setIsLoading(false)
    if(selectedBanner.length !== 0) {
      setTimeout(()=>{
        setIsLoading(true)
      },100)
    }
  }
  /** 배너선택 **/
  const handleSelectedBanner = (select) => {
    setIsIframeKey(select)
    readIndexedDBValue(select)
  }
  const handleLoadFrameBanner = async () => {
    const list = await getAll().then(response => {
      return response
    })
    setModalOpen({
      isShow: true,
      modalComponent: () => {
        return (
          <BannerList list={list} frameKey={isIframeKey} setFrameKey={handleSelectedBanner} />
        )
      }
    })
  }
  /** 재설정(신규) **/
  const handleResetFrameBanner = () => {
    setIsIframeKey(null)
    reset()
    resetSettings()
    setSelectedBanner([])
    setPublicSetting([])
    setBannerTypes([])
  }
  /** 벨리데이션 및 전송 **/
  const onSubmit = async (data) => {
    console.log(data)
    if(selectedBanner.length <= 0) {
      toast.warning('배너를 선택해주세요')
    }
    else if(defaultSetting.mainImage === '') {
      toast.warning('메인 이미지를 업로드해주세요')
    }
    else {
      await handleSaveFrameData()
    }
  }
  /** 벨리데이션 에러 **/
  const onError = (error) => {
    toast.error('필수 입력을 확인해주세요')
    console.log(error)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
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
                    onClick={handleResetFrameBanner}>신규</DefaultItemButton>
                  <DefaultItemButton
                    active={false}
                    style={{backgroundColor: '#777', color: '#fff'}}
                    onClick={handleLoadFrameBanner}>불러오기</DefaultItemButton>
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
                    <Span4>* PC 랜딩 URL</Span4>
                    <div style={{width: '100%'}}>
                      <Input
                        {...register('pcUrl',{
                          required: "PC URL 랜딩 정보를 입력해주세요",
                          pattern:{
                            value:  /(http(s)?:\/\/)([a-z0-9\w]+\.*)+[a-z0-9]{2,4}/gi,
                            message: "http(s)://가 포함된 url 주소를 확인해주세요."
                          },
                          value: defaultSetting.pcUrl || '',
                          onChange:handleChangePcUrl
                        })}
                        placeholder={'http:// 또는 https://를 포함한 URL 입력'}/>
                      {errors.pcUrl && <Validation>{errors.pcUrl.message}</Validation>}
                    </div>

                  </RowSpan>
                  <RowSpan>
                    <Span4>PC 인식코드</Span4>
                    <div style={{width: '100%'}}>
                      <Input
                        value={defaultSetting.pcCode || ''}
                        onChange={handleChangePcCode}/>
                    </div>
                  </RowSpan>
                  <RowSpan>
                    <Span4>* Mobile 랜딩 URL</Span4>
                    <div style={{width: '100%'}}>
                      <Input
                        {...register('mobileUrl',{
                          required:  "MOBILE 랜딩 URL을 입력해주세요",
                          pattern:{
                            value:  /(http(s)?:\/\/)([a-z0-9\w]+\.*)+[a-z0-9]{2,4}/gi,
                            message: "http(s)://가 포함된 url 주소를 확인해주세요."
                          },
                          value:defaultSetting.mobileUrl || '',
                          onChange:handleChangeMobileUrl
                        })}
                        placeholder={'http:// 또는 https://를 포함한 URL 입력'}/>
                      {errors.mobileUrl && <Validation>{errors.mobileUrl.message}</Validation>}
                    </div>
                  </RowSpan>
                  <RowSpan>
                    <Span4>Mobile 인식코드</Span4>
                    <div style={{width: '100%'}}>
                      <Input
                        value={defaultSetting.mobileCode || ''}
                        onChange={handleChangeMobileCode}/>
                    </div>
                  </RowSpan>
                </BannerItemContainer>
              </HalfDiv>
              <HalfDiv>
                <ColSpan1>소재 상세 설정</ColSpan1>
                <BannerItemContainer style={{height: '100%', justifyContent: 'space-around'}}>
                  <Row style={{position: 'relative'}}>
                    <Span4 style={{width: 80, whiteSpace: 'nowrap'}}>* 광고 타이틀<p><small style={{color: '#ccc'}}>(최대 12글자)</small></p></Span4>
                    <ColSpan3>
                      <Input
                        type={'text'}
                        maxLength={25}
                        {...register('title',{
                          required: {
                            value: defaultSetting.title.text === '',
                            message: '광고 제목을 입력해주세요'
                          },
                          value: defaultSetting.title.text || '',
                          onChange:handleChangeTitle
                        })}
                        placeholder={'광고 제목을 입력해주세요 (12자)'}
                      />
                    </ColSpan3>
                    <TextButton onClick={handleFontSelect}>A</TextButton>
                    {isFontSetting &&
                      <PopButton>
                        <Row>
                          <ColSpan1>글꼴</ColSpan1>
                          <ColSpan3>
                            <Select styles={selectStyle}
                                    options={fontTypes}
                                    onChange={handleChangeFontFamily}
                                    value={fontTypes.find(font => font.value === defaultSetting.title.fontFamily) || ''}
                            />
                          </ColSpan3>
                        </Row>
                        <Row>
                          <ColSpan1>크기</ColSpan1>
                          <ColSpan3>
                            <Input value={defaultSetting.title.fontSize} onChange={handelChangeTitleSize}/>
                            <ColTitle>px</ColTitle>
                          </ColSpan3>
                        </Row>
                        <Row>
                          <ColSpan1>효과</ColSpan1>
                          <ColSpan1 onClick={() => setDefaultSetting({
                            ...defaultSetting,
                            title: {
                              ...defaultSetting.title,
                              fontWeight: defaultSetting.title.fontWeight === 'normal' ? 'bold' : 'normal'
                            }
                          })}><Effect active={defaultSetting.title.fontWeight === 'bold'}><strong>A</strong></Effect></ColSpan1>
                          <ColSpan1 onClick={() => setDefaultSetting({
                            ...defaultSetting,
                            title: {
                              ...defaultSetting.title,
                              fontStyle: defaultSetting.title.fontStyle === 'normal' ? 'italic' : 'normal'
                            }
                          })}><Effect active={defaultSetting.title.fontStyle === 'italic'}><i>A</i></Effect></ColSpan1>
                          <ColSpan1 onClick={() => setDefaultSetting({
                            ...defaultSetting,
                            title: {
                              ...defaultSetting.title,
                              textDecoration: defaultSetting.title.textDecoration === 'none' ? 'underline' : 'none'
                            }
                          })}><Effect active={defaultSetting.title.textDecoration === 'underline'}><u style={{margin:0}}>A</u></Effect></ColSpan1>
                        </Row>
                        <Row>
                          <ColSpan1>색상</ColSpan1>
                          <ColSpan3>
                            <ColorPicker onChange={handleChangeTitleColor} defaultColor={defaultSetting.title.color}/>
                          </ColSpan3>
                        </Row>
                        <RowSpan>
                          <SearchButton style={{width: '100%'}} onClick={handleFontSelect}>확인</SearchButton>
                        </RowSpan>
                      </PopButton>
                    }
                  </Row>
                  {errors.title && <Validation>{errors.title.message}</Validation>}
                  <Row style={{gap: 10, justifyContent: 'space-between'}}>
                    <Span4 style={{width: 80, whiteSpace: 'nowrap'}}>* 메인이미지<small></small><p><small style={{color: '#ccc'}}>(600*300 권장)</small></p></Span4>
                    <ColSpan100 padding={'0'} style={{maxWidth: '100px'}}>
                      {defaultSetting.mainImage.length === 0 ?
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
                          <img src={defaultSetting.mainImage.url} style={{width: '100%',height:'100%', objectFit: 'contain'}} alt={'메인 배너 이미지'}/>
                        </ImageUploadCard>
                      }
                    </ColSpan100>
                    <Span4 style={{width: 80, whiteSpace: 'nowrap'}}>배경이미지<small></small><p><small style={{color: '#ccc'}}>(600*300 권장)</small></p></Span4>
                    <ColSpan100 padding={'0'} style={{maxWidth: '100px'}}>
                      {defaultSetting.background.backgroundImage === '' ?
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
                          <DeleteIcon onClick={() => handleDeleteImage(defaultSetting.background.backgroundImage)}/>
                          <img src={defaultSetting.background.backgroundImage} style={{width: '100%',height:'100%', objectFit: 'contain'}} alt={'배너 배경 이미지'}/>
                        </ImageUploadCard>
                      }
                    </ColSpan100>
                    <Span4 style={{width: 80, whiteSpace: 'nowrap'}}>배경색</Span4>
                    <ColSpan100 padding={'0'} style={{maxWidth: '100%'}}>
                      <ColorPicker onChange={handleChangeImageBackground} defaultColor={'#ffffff'}/>
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
                        <ColorPicker onChange={handleChangeButtonTitleColor}  defaultColor={'#222222'}/>
                      </ColSpan100>
                      <Span4 style={{width: 80, whiteSpace: 'nowrap'}}>배경색</Span4>
                      <ColSpan100 padding={'0'} style={{maxWidth: '100%'}}>
                        <ColorPicker onChange={handleChangeButtonBackgroundColor}  defaultColor={'#ffffff'}/>
                      </ColSpan100>
                    </Row>
                  </Row>
                </BannerItemContainer>
              </HalfDiv>
            </RowSpan>
            <RowSpan style={{marginTop: 50}}>
              <ColSpan1>미리보기 & 편집
                <label>
                  <input type={"checkbox"} onChange={handleChangeMode} checked={guide}/>
                  <span>스냅 모드</span>
                </label>
              </ColSpan1>
            </RowSpan>
            <RowSpan box={true}>
              <FlexWrap>
                {selectedBanner.map((item, key) => {
                  const position = publicSetting.find(value => value.size === item)
                  return (
                    <FrameEditor guide={guide} set={defaultSetting} setSetting={setDefaultSetting} publicSetting={position} setPublicSetting={handleSetPublicPosition} size={item} key={key}/>
                  )
                })}
              </FlexWrap>
            </RowSpan>
          </>
          }
        </BoardSearchResult>
        <ToastContainer/>
      </Board>
      <ButtonGroup>
        <SignUpVerify type={"submit"}>{isIframeKey !== null ? '수정' : '저장'}</SignUpVerify>
      </ButtonGroup>
      <div style={{maxWidth: 1600}}>
        {/*추후 삭제*/}
        <Preview>
          <div>
            {square.map((item, key) => {
              const size = item.replace('IMG','').split('_')
              return (
                <div key={key}>
                  <div>{item}</div>
                  {isLoading &&
                    <iframe title={`s_frame${key}`} name={item} src={'../frame.html'} width={size[0]} height={size[1]} style={{border: '1px solid #ddd'}}/>
                  }
                </div>
              )
            })}
          </div>
        </Preview>
        <Preview>
          <div>
            {imgSizeWidth.map((item, key) => {
              const size = item.replace('IMG','').split('_')
              return (
                <div key={key}>
                  <div>{item}</div>
                  <iframe title={`w_frame${key}`} name={item} src={'../frame.html'} width={size[0]} height={size[1]} style={{border: '1px solid #ddd'}}/>
                </div>
              )
            })}
          </div>
        </Preview>
        <Preview>
          <div>
            {imgSizeHeight.map((item, key) => {
              const size = item.replace('IMG','').split('_')
              return (
                <div key={key}>
                  <div>{item}</div>
                  <iframe title={`h_frame${key}`} name={item} src={'../frame.html'} width={size[0]} height={size[1]} style={{border: '1px solid #ddd'}}/>
                </div>
              )
            })}
          </div>
        </Preview>
      </div>
    </form>
  )
}

const Preview = styled.div`
  overflow: auto;
  & > div {
    white-space: nowrap;
    & > div {
      display: inline-block;
      margin: 10px
    }
  }
`

const BannerListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
  & div {
    width: 100%;
    text-align: center;
  }
`