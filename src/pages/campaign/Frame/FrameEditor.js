import {useEffect, useState} from "react";
import styled from "styled-components";

export function FrameEditor({set}){
  useEffect(() => {
    console.log(set)
  }, [set]);

  return(
    <FrameContainer>
      <FrameHeader>
        <AddButton>
          {addIcon}
        </AddButton>
        <span>{set.info.sizeW}px X {set.info.sizeH}px</span>
        <ReloadButton/>
      </FrameHeader>
      <FrameBody style={{backgroundColor: set.backgroundColor, backgroundImage: `url(${set.backgroundImage})`}}>
        <MainImage src={set.mainImage}/>
        <Text style={{color: set.titleColor, fontSize: set.titleSize+'px', fontWeight:set.titleBold && 'bold' , fontStyle: set.titleItalic && 'italic', textDecoration: set.titleUnderline && 'underline'}}>{set.title}</Text>
        {set.buttonTitle !== '' &&
          <Button style={{backgroundColor: set.buttonBackgroundColor, color: set.buttonColor}}>{set.buttonTitle}</Button>
        }
      </FrameBody>
    </FrameContainer>
  )
}

const FrameContainer = styled.div`
  padding: 0 10px 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 3px;
`
const FrameHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
`
const FrameBody = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  text-align: center;
  border: 1px solid #eee;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
`
const AddButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
`
const ReloadButton = styled.div`
  width: 48px;
  height: 48px;
`
const MainImage = styled.img`
  width: 100%;
  aspect-ratio: 2/1;
  object-fit: contain;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
`

const Text = styled.div`
  padding: 10px;
  width: 100%;
  text-align: center;
  border-radius: 5px;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  &:hover {
    border: 1px dashed #000;
  }
`

const Button = styled.button`
  margin: 10px;
  padding: 8px 16px;
  font-weight: bold;
`

const addIcon = <svg width="24" height="24" viewBox="0 0 24 24" style={{cursor: 'pointer', position: 'relative', top: 1}}><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>