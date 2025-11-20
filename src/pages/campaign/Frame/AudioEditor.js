import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import ImageUploading from "react-images-uploading";
import {toast} from "react-toastify";
import {
  uploadAudioFile,
  uploadBannerImages
} from "../../../services/campaign/CreativeAxios";
import {useForm} from "react-hook-form";
import VideoUploader from "../../../components/common/VideoUploader";
export function AudioEditor(props){
  const {file, setFile, filePath} = props

  const handleResetFrame = () => {
    setFile(null);
  }

  return(
    <FrameContainer>
      <FrameHeader>
        <AddButton type={""}>
        </AddButton>
        <span>오디오 파일</span>
        <ReloadButton>
        </ReloadButton>
      </FrameHeader>
      <VideoUploader file={file} onSelect={setFile} filePath={filePath}/>
    </FrameContainer>
  )
}

const FrameContainer = styled.div`
  padding: 0 10px 10px;
  background-color: #fff;
  border: ${({active}) => active ? '1px solid #ff0000' : '1px solid #ddd'};
  border-radius: 8px;
  width: 300px;
  height: 250px;
`
const FrameHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
`
const FrameBody = styled.div`
  position: relative;
  margin: 0 auto;
  width: ${({width}) => width}px;
  height: ${({height}) => height}px;
  text-align: center;
  background-position: center;
  background-size: cover;
  overflow: hidden;
  border: 1px solid #ddd;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
`
const AddButton = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 38px;
  height: 38px;
`
const ReloadButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 38px;
  height: 38px;
  cursor: pointer;
  &:hover {
    background-color: #eee;
  }
`
const MainImage = styled.div`
  position: absolute;
  aspect-ratio: ${({ratio}) => ratio};
  min-width: 25%;
  min-height: 30px;
  max-width: 100%;
  max-height: 100%;
  background-image: url(${({source}) => source});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  &:hover {
    border: 1px dashed #000;
    background-color: rgba(255,160,122,0.5);
    cursor: move;
  }
`

const Resizer = styled.div`
  position: absolute;
  right:0;
  bottom: 0;
  width: 10px;
  height: 10px;
  cursor: nwse-resize;
  &:hover {
    background-color: rgba(0,0,0,0.5);
  }
`

const Text = styled.div`
  position: absolute;
  letter-spacing: -1px;
  text-align: center;
  display: inline-block;
  word-break: keep-all;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  &:hover {
    background-color: rgba(255,160,122,0.5);
    border: 1px dashed #000;
    cursor: move;
  }
`

const Button = styled.button`
  position: absolute;
  min-width: 80px;
  min-height: 30px;
  font-weight: bold;
  cursor: move;
  white-space: nowrap;
`

const AddElement = styled.div`
  position: absolute;
  left: 23px;
  bottom: -19px;
  z-index: 9;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
  & div {
    padding: 5px 10px;
    width: 100px;
    background-color: #fff;
    cursor: pointer;
    &:hover {
      background-color: #eee
    }
  }  
`

const CloseButton = styled.div`
  position: absolute;
  right:-14px;
  top: -14px;
  width: 18px;
  height: 18px;
  border-radius: 9px;
  background-image: url("/assets/images/common/btn_img_close.png");
  background-size: cover;
  background-color: #fff;
  cursor: pointer;
  opacity: 0;
  &:hover {
    opacity: 1
  }
`

const addIcon = <svg width="24" height="24" viewBox="0 0 24 24" style={{cursor: 'pointer', position: 'relative', top: 1}}><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>
const resetIcon = <svg width="21" height="21" viewBox="0 0 21 21"><g fill="none" fillRule="evenodd" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" transform="matrix(0 1 1 0 2.5 2.5)"><path d="m3.98652376 1.07807068c-2.38377179 1.38514556-3.98652376 3.96636605-3.98652376 6.92192932 0 4.418278 3.581722 8 8 8s8-3.581722 8-8-3.581722-8-8-8"/><path d="m4 1v4h-4" transform="matrix(1 0 0 -1 0 6)"/></g></svg>