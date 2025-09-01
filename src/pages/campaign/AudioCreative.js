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
import {atomWithReset, useResetAtom} from "jotai/utils";
import {AudioEditor} from "./Frame/AudioEditor";
import {uploadAudioFile} from "../../services/campaign/CreativeAxios";

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
  const [guide, setGuide] = useState(false)
  const [forceUpdate, setForceUpdate] = useState(false)
  const [file, setFile] = useState(null);

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
  const pickVideo = async () => {
    let returnVal = null;
    if (file.length !== 0) {
      await uploadAudioFile(file).then(response => {
        const { uploadedFile, path } = response;
        if (uploadedFile) {
          toast.success('업로드에 성공 했습니다.');
          returnVal = path;
        } else {
          toast.warning('업로드에 실패 했습니다.');
        }
      })
    }
    return returnVal;
  }
  /** 리드 **/
  // const readIndexedDBValue = (key) => {
  //   getByID(key).then(response =>{
  //     setSelectedBanner(response.row.map(item => item.size))
  //     setDefaultSetting({
  //       key: response.key,
  //       pcUrl: response.pcUrl,
  //       pcCode: response.pcCode,
  //       mobileUrl: response.mobileUrl,
  //       mobileCode: response.mobileCode,
  //       title: response.title,
  //       background: response.background,
  //       button: response.button,
  //       mainImage: response.mainImage,
  //     })
  //     setPublicSetting(response.row)
  //     setBannerTypes(['square','width','height'])
  //     // 여기서부터
  //     window.localStorage.setItem('frameData', JSON.stringify(response))
  //     setIsLoading(false)
  //     if(selectedBanner.length !== 0) {
  //       setTimeout(()=>{
  //         setIsLoading(true)
  //       },1000)
  //     }
  //     // 여기까지는 서비스 전에 삭제 할것
  //   })
  // }
  /** 크리에이트 **/
  // const createIndexedDB = async (data) => {
  //   await add(data).then(response => {
  //     console.log(response)
  //   })
  // }
  /** 업데이트 **/
  //const putIndexedDB = async (data) => {
  //  await update(data).then(response => {
  //    console.log(response)
  //  })
  //}
  /** 저장 **/
  const handleSaveFrameData = async () => {
    const newData = Object.assign(defaultSetting, {date: new Date().toLocaleDateString(), row: publicSetting})
    window.localStorage.setItem('frameData', JSON.stringify(newData))
    if(isIframeKey !== null) {
      //await putIndexedDB(newData)
    } else {
      //await createIndexedDB(newData)
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
    //readIndexedDBValue(select)
  }
  // const handleLoadFrameBanner = async () => {
  //   const list = await getAll().then(response => {
  //     return response
  //   })
  //   setModalOpen({
  //     isShow: true,
  //     modalComponent: () => {
  //       return (
  //         <BannerList list={list} frameKey={isIframeKey} setFrameKey={handleSelectedBanner} />
  //       )
  //     }
  //   })
  // }
  /** 벨리데이션 및 전송 **/
  const onSubmit = async () => {
    console.log(file)
    if(file.size <= 0) {
      toast.warning('파일을 업로드해주세요')
    } else {
      pickVideo().then((response) =>
          {
            handleSaveFrameData()
          }
      );
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
                    <AudioEditor file={file} setFile={setFile} guide={guide} set={defaultSetting} setSetting={setDefaultSetting} publicSetting={position} setPublicSetting={handleSetPublicPosition} size={item} key={key}/>
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