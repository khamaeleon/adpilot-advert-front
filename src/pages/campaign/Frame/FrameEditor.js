import {useEffect, useRef, useState} from "react";
import styled from "styled-components";

export function FrameEditor(props){
  const {size, set} = props
  const [sized, setSized] = useState([0,0])
  const [frameId, setFrameId] = useState()
  const [resize, setResize] = useState(0)
  const [{ imgX, imgY }, setImagePosition] = useState({
    imgX: 0,
    imgY: 0,
  });
  const [{ titleX, titleY }, setTitlePosition] = useState({
    titleX: 0,
    titleY: 0,
  });
  const [{ btnX, btnY }, setButtonPosition] = useState({
    btnX: 0,
    btnY: 0,
  });

  useEffect(() => {
    const stringToSize = size.replace('IMG','').split('_')
    setSized([parseInt(stringToSize[0]),parseInt(stringToSize[1])])
  }, [set,size]);

  const handleSelectFrame = () => {

  }
  const handleOpenAddElement = (e) => {
    e.stopPropagation()
  }

  const boundaryRef = useRef()
  const boxRef = useRef()
  const titleRef = useRef()
  const buttonRef = useRef()
  const inRange = (v, max) => {
    if (v < 0) return 0;
    if (v > max) return max;
    return v;
  };

  const handleImageResize = (clickEvent) => {
    clickEvent.stopPropagation()
    const mouseMoveHandler = (moveEvent) => {
      const deltaX = moveEvent.screenX - clickEvent.screenX;
      const boundary = boundaryRef.current.getBoundingClientRect();
      console.log(deltaX)
      setResize(inRange(resize + deltaX, Math.floor(boundary.width)))
    }
    const mouseUpHandler = () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler, { once: true });
  }



  const handleImageMove = (clickEvent) => {
    const mouseMoveHandler = (moveEvent) => {
      const deltaX = moveEvent.screenX - clickEvent.screenX;
      const deltaY = moveEvent.screenY - clickEvent.screenY;
      const boundary = boundaryRef.current.getBoundingClientRect();
      const box = boxRef.current.getBoundingClientRect();

      setImagePosition({
        imgX: inRange(
          imgX + deltaX,
          Math.floor(boundary.width - box.width -2),
        ),
        imgY: inRange(
          imgY + deltaY,
          Math.floor(boundary.height - box.height -1),
        ),
      });
    };

    const mouseUpHandler = () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler, { once: true });
  }

  const handleTitleMove = (clickEvent) => {
    const mouseMoveHandler = (moveEvent) => {
      const deltaX = moveEvent.screenX - clickEvent.screenX;
      const deltaY = moveEvent.screenY - clickEvent.screenY;
      const boundary = boundaryRef.current.getBoundingClientRect();
      const title = titleRef.current.getBoundingClientRect();
      console.log(`parent_width:${boundary.width}, parent_height:${boundary.height}, box_width: ${title.width}, box_height: ${title.height},`);
      setTitlePosition({
        titleX: inRange(
          titleX + deltaX,
          Math.floor( boundary.width - title.width - 2),
        ),
        titleY: inRange(
          titleY + deltaY,
          Math.floor(boundary.height - title.height - 1),
        ),
      });
    };

    const mouseUpHandler = () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler, { once: true });
  }

  const handleButtonMove = (clickEvent) => {
    const boundary = boundaryRef.current.getBoundingClientRect();
    const button = buttonRef.current.getBoundingClientRect();
    const mouseMoveHandler = (moveEvent) => {
      const deltaX = moveEvent.screenX - clickEvent.screenX;
      const deltaY = moveEvent.screenY - clickEvent.screenY;
      setButtonPosition({
        btnX: inRange(
          btnX + deltaX,
          Math.floor(boundary.width - button.width - 2),
        ),
        btnY: inRange(
          btnY + deltaY,
          Math.floor(boundary.height - button.height -1),
        ),
      });
    };
    const mouseUpHandler = () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler, { once: true });
  }


  return(
    <FrameContainer onClick={handleSelectFrame} active={frameId}>
      <FrameHeader>
        <AddButton onClick={handleOpenAddElement}>
          {addIcon}
        </AddButton>
        <span>{sized[0]}px X {sized[1]}px</span>
        <ReloadButton>
          {resetIcon}
        </ReloadButton>
      </FrameHeader>
      <FrameBody
        ref={boundaryRef}
        width={sized[0]}
        height={sized[1]}
        style={{backgroundColor: set.backgroundColor, backgroundImage: `url(${set.backgroundImage})`}} onClick={(e) => e.stopPropagation()}>
        {set.mainImage !== ''&&
          <MainImage
            source={set.mainImage.url}
            ratio={set.mainImage.ratio}
            ref={boxRef}
            style={{ width: resize, left:`${imgX}px`, top:`${imgY}px`}}
            onMouseDown={(clickEvent) => {handleImageMove(clickEvent)}}
          >
            <Resizer onMouseDown={(clickEvent) => {handleImageResize(clickEvent)}}/>
          </MainImage>
        }
        {set.title !== '' &&
          <Text
            style={{
              color: set.titleColor,
              fontSize: set.titleSize+'px',
              fontWeight:set.titleBold && 'bold' ,
              fontStyle: set.titleItalic && 'italic',
              textDecoration: set.titleUnderline && 'underline',
              left:`${titleX}px`, top:`${titleY}px`
            }}
            ref={titleRef}
            onMouseDown={(clickEvent) => {handleTitleMove(clickEvent)}}
          >{set.title}</Text>
        }
        {set.buttonTitle !== '' &&
          <Button
            ref={buttonRef}
            style={{backgroundColor: set.buttonBackgroundColor, color: set.buttonColor,left:`${btnX}px`, top:`${btnY}px`}}
            onMouseDown={(clickEvent) => {handleButtonMove(clickEvent)}}>{set.buttonTitle}</Button>
        }
      </FrameBody>
    </FrameContainer>
  )
}

const FrameContainer = styled.div`
  padding: 0 10px 10px;
  background-color: #fff;
  border: ${({active}) => active ? '1px solid #f5811f' : '1px solid #ddd'};
  border-radius: 3px;
`
const FrameHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
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
  background-repeat: no-repeat;
  background-size: cover;
  //overflow: hidden;
  border: 1px solid #ddd;
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
  width: 38px;
  height: 38px;
  &:hover {
    background-color: #eee;
  }
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
  min-width: 30px;
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
    background-color: #000;
  }
`

const Text = styled.div`
  position: absolute;
  text-align: center;
  display: inline-block;
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
  padding: 8px 16px;
  font-weight: bold;
  cursor: move;
`

const addIcon = <svg width="24" height="24" viewBox="0 0 24 24" style={{cursor: 'pointer', position: 'relative', top: 1}}><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>
const resetIcon = <svg width="21" height="21" viewBox="0 0 21 21"><g fill="none" fill-rule="evenodd" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" transform="matrix(0 1 1 0 2.5 2.5)"><path d="m3.98652376 1.07807068c-2.38377179 1.38514556-3.98652376 3.96636605-3.98652376 6.92192932 0 4.418278 3.581722 8 8 8s8-3.581722 8-8-3.581722-8-8-8"/><path d="m4 1v4h-4" transform="matrix(1 0 0 -1 0 6)"/></g></svg>