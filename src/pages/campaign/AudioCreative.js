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
import React, {useEffect, useState} from "react";
import {CreateImage, DeleteIcon, ImageUploadCard, Row, Validation} from "./styles/common";
import ImageUploading from "react-images-uploading";
import Select from "react-select";
import {ChromePicker} from 'react-color'
import {FrameEditor} from "./Frame/FrameEditor";
import {confirmAlert} from "react-confirm-alert";
import {toast} from "react-toastify";
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
import {AudioEditor} from "./Frame/AudioEditor";

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

export function AudioCreative() {
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
  const [forceUpdate, setForceUpdate] = useState(false)

  useEffect(() => {
    setSelectedBanner(['AUDIO'])
  }, []);

  useEffect(() => {
    setForceUpdate(true);
    return () => {
      setModalOpen({isShow:false});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBanner]);
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
        <BoardHeader>오디오 크리에이터</BoardHeader>
        <BoardSearchResult>
          <RowSpan>
            <ColTitle>오디오형 선택</ColTitle>
          </RowSpan>
            <RowSpan box={true}>
              {forceUpdate &&
              <FlexWrap>
                {selectedBanner.map((item, key) => {
                  const position = publicSetting.find(value => value.size === item)
                  return (
                    <AudioEditor guide={guide} set={defaultSetting} setSetting={setDefaultSetting} publicSetting={position} setPublicSetting={handleSetPublicPosition} size={item} key={key}/>
                  )
                })}
              </FlexWrap>
              }
            </RowSpan>
        </BoardSearchResult>
      </Board>
      <ButtonGroup>
        <SignUpVerify type={"submit"}>{isIframeKey !== null ? '수정' : '저장'}</SignUpVerify>
      </ButtonGroup>
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