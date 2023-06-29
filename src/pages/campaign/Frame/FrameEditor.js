import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {confirmAlert} from "react-confirm-alert";
import ImageUploading from "react-images-uploading";
import {toast} from "react-toastify";



export function FrameEditor(props){
  const {size, guide, set, publicSetting, setPublicSetting} = props
  const [sized, setSized] = useState([0,0])
  const [addElement, setAddElement] = useState(false)
  const [isEditable, setIsEditable] = useState([false, false]);
  const [elementPosition, setElementPosition] = useState({
    size: size,
    image: [],
    text: [],
    mainImage: {
      left: 0,
      top: 0,
      width: 0,
      height: 0,
    },
    image0: {
      left: 0,
      top: 0,
      width: 0,
      height: 0,
    },
    image1: {
      left: 0,
      top: 0,
      width: 0,
      height: 0,
    },
    title: {
      left: 0,
      top: 0,
    },
    text0: {
      left: 0,
      top: 0,
    },
    text1: {
      left: 0,
      top: 0,
    },
    button: {
      left: 0,
      top: 0,
    }
  });
  const defaultBody = {
    backgroundColor: set.background.backgroundColor,
    backgroundImage: `url(${set.background.backgroundImage})`
  }
  const gridBody = {
    backgroundColor: set.background.backgroundColor,
    backgroundImage:`linear-gradient(90deg, #aaaaaa30 1px, transparent 1px), linear-gradient(0deg, #aaaaaa30 1px, transparent 1px),linear-gradient(90deg, #aaaaaa30 1px, transparent 1px), linear-gradient(0deg, #aaaaaa30 1px, transparent 1px)`,
    backgroundSize: '10px 10px, 10px 10px, 50px 50px, 50px 50px',
    backgroundPosition: '-1px -1px, -1px -1px, -1px -1px, -1px -1px'
  }
  useEffect(() => {
    const stringToSize = size.replace('IMG','').split('_')
    setSized([parseInt(stringToSize[0]),parseInt(stringToSize[1])])

    if(publicSetting !== undefined){
      console.log(publicSetting)
      setElementPosition(publicSetting)
    } else {
      console.log(elementPosition)
    }
    //
    // setElementPosition({
    //   ...elementPosition,
    //   mainImage: {
    //     ...elementPosition.mainImage,
    //     width: set.mainImage.width > parseInt(stringToSize[0]) ? parseInt(stringToSize[0]) : set.mainImage.width,
    //     height: set.mainImage.height > parseInt(stringToSize[1]) ? parseInt(stringToSize[1]) : set.mainImage.height,
    //   }
    // })
  }, [set]);

  useEffect(() => {
    setPublicSetting(elementPosition)
  }, [elementPosition]);


  const handleDoubleClick = (e, index) => {
    e.stopPropagation()
    isEditable[index] = true
    setIsEditable([...isEditable]);
  };

  const handleChange = (e, index) => {
    e.stopPropagation()
    elementPosition.text[index] = e.target.value
    setElementPosition({
      ...elementPosition,
      text: [...elementPosition.text]
    })
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsEditable([false, false]);
    }
  };
  const handleOpenAddElement = (e) => {
    e.stopPropagation()
    setAddElement(true)
  }

  const boundaryRef = useRef()

  const inRange = (v, max) => {
    if (v < 0) return 0;
    if (v > max) return max;
    console.log()
    return guide ? Math.floor(v/10)*10 : v;
  };


  const handleImageResize = (clickEvent, target) => {
    clickEvent.stopPropagation()
    const mouseMoveHandler = (moveEvent) => {
      const deltaX = moveEvent.screenX - clickEvent.screenX;
      const deltaY = moveEvent.screenY - clickEvent.screenY;
      const boundary = boundaryRef.current.getBoundingClientRect();

      setElementPosition({
        ...elementPosition,
        [target]: {
          ...elementPosition[target],
          width: inRange((!isNaN(elementPosition[target].width) ? elementPosition[target].width : 0)  + deltaX, Math.floor(boundary.width)),
          height: inRange((!isNaN(elementPosition[target].height) ? elementPosition[target].height : 0) + deltaY, Math.floor(boundary.height - 2))
        }
      })
    }
    const mouseUpHandler = () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
    };
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler, { once: true });
  }


  const handleMouseMoveDrag = (clickEvent, target) => {
    const mouseMoveHandler = (moveEvent) => {
      const deltaX = moveEvent.screenX - clickEvent.screenX;
      const deltaY = moveEvent.screenY - clickEvent.screenY;
      const boundary = boundaryRef.current.getBoundingClientRect();
      setElementPosition({
        ...elementPosition,
        [target]: {
          ...elementPosition[target],
          left: inRange(
            elementPosition[target].left + deltaX,
            Math.floor(boundary.width - clickEvent.target.clientWidth -2),
          ),
          top: inRange(
            elementPosition[target].top + deltaY,
            Math.floor(boundary.height - clickEvent.target.clientHeight -2),
          ),
        }
      })
    };
    const mouseUpHandler = () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
    };
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler, { once: true });
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

  const onDrop = (pictureFiles, e) => {
    if (pictureFiles.length !== 0) {
      if(elementPosition.image.length < 2){
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
              setElementPosition({
                ...elementPosition,
                image: elementPosition.image.concat(obj)
              });
            }
            setAddElement(false)
            resolve();
          };
        })
      } else {
        toast.warning('이미지는 최대 3개까지만 추가가 가능합니다.')
        setAddElement(false)
      }
    }
  }

  const handleAddText = (e) => {
    e.stopPropagation()
    console.log('add text')
    if(elementPosition.text.length < 2){
      setElementPosition({
        ...elementPosition,
        text: elementPosition.text.concat('text')
      });
    }
    setAddElement(false)
  }

  const handleClickEnd = (e) => {
    e.stopPropagation()
    setIsEditable([false, false]);
    setAddElement(false)
  }

  const handleDeleteText = (index) => {
    elementPosition.text.splice(index, 1)
    setElementPosition({
      ...elementPosition
    })
  }

  const handleDeleteElementImage = (index) => {
    elementPosition.image.splice(index, 1)
    setElementPosition({
      ...elementPosition
    })
  }

  const handleResetFrame = () => {
    setElementPosition({
      image: [],
      text: [],
      mainImage: {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
      },
      image0: {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
      },
      image1: {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
      },
      title: {
        left: 0,
        top: 0
      },
      text0: {
        left: 0,
        top: 0
      },
      text1: {
        left: 0,
        top: 0
      },
      button: {
        left: 0,
        top: 0
      }
    })
  }

  return(
    <FrameContainer>
      <FrameHeader>
        <AddButton type={"button"} onClick={handleOpenAddElement}>
          {addIcon}
          {addElement &&
            <AddElement>
              <div onClick={handleAddText}>텍스트 추가</div>
              <ImageUploading
                multiple
                acceptType={["jpg", "gif", "png"]}
                onChange={onDrop}
                maxFileSize={10485760}
                maxNumber={5}
                onError={(e) => onImageError(e,'image')}
              >
                {({onImageUpload}) => (
                  <div onClick={onImageUpload}>이미지 추가</div>
                )}
              </ImageUploading>
            </AddElement>
          }
        </AddButton>
        <span>{sized[0]}px X {sized[1]}px</span>
        <ReloadButton onClick={handleResetFrame}>
          {resetIcon}
        </ReloadButton>
      </FrameHeader>
      <FrameBody
        ref={boundaryRef}
        width={sized[0]}
        height={sized[1]}
        style={!guide ? defaultBody : gridBody} onClick={handleClickEnd}>
        {set.mainImage &&
          <MainImage
            source={set.mainImage.url}
            ratio={set.mainImage.width / set.mainImage.height}
            style={{ width: elementPosition[`mainImage`].width, height: elementPosition[`mainImage`].height, left: elementPosition[`mainImage`].left, top: elementPosition[`mainImage`].top}}
            onMouseDown={(clickEvent) => {handleMouseMoveDrag(clickEvent,`mainImage`)}}
          >
            <Resizer onMouseDown={(clickEvent) => {handleImageResize(clickEvent, `mainImage`)}}/>
          </MainImage>
        }
        {elementPosition.image.length !== 0 && elementPosition.image.map((image, key) => {
          const index = key
          return (
            <MainImage
              key={key}
              source={image.url}
              ratio={image.width / image.height}
              style={{ width: elementPosition[`image${index}`].width, height: elementPosition[`image${index}`].height, left:`${elementPosition[`image${index}`].left}px`, top:`${elementPosition[`image${index}`].top}px`}}
              onMouseDown={(clickEvent) => {handleMouseMoveDrag(clickEvent,`image${index}`)}}
            >
              <CloseButton onClick={() => handleDeleteElementImage(index)}/>
              <Resizer onMouseDown={(clickEvent) => {handleImageResize(clickEvent, `image${index}`)}}/>
            </MainImage>
          )
          })
        }
        {set.title !== '' &&
          <Text
            style={{
              color: set.title.color,
              fontSize: set.title.fontSize+'px',
              fontWeight:set.title.fontWeight,
              fontStyle: set.title.fontStyle,
              textDecoration: set.title.textDecoration,
              left:`${elementPosition.title.left}px`,
              top:`${elementPosition.title.top}px`,
              fontFamily: set.title.fontFamily
            }}
            onMouseDown={(clickEvent) => {handleMouseMoveDrag(clickEvent, 'title')}}
          >{set.title.text}</Text>
        }
        {elementPosition.text.length > 0 && elementPosition.text.map((text, key) => {
          const index = key
          return (
            <Text
              key={key}
              style={{
                left: `${elementPosition[`text${index}`].left}px`,
                top: `${elementPosition[`text${index}`].top}px`,
                fontFamily: set.title.fontFamily,
                color: set.title.color,
              }}
              onMouseDown={(clickEvent) => {handleMouseMoveDrag(clickEvent, `text${index}`)}}
            >
              {isEditable[index] ? (
                <input
                  type="text"
                  value={elementPosition.text[index] || ''}
                  onChange={(e) => handleChange(e, index)}
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={handleKeyDown}
                />
              ) : (
                <div onDoubleClick={(e) => handleDoubleClick(e, index)}>{text}<CloseButton type={"button"} onClick={() => handleDeleteText(index)}/></div>
              )}
            </Text>
          )
          })
        }
        {set.button.text !== '' &&
          <Button
            type={"button"}
            style={{
              backgroundColor: set.button.backgroundColor,
              color: set.button.color,
              left:`${elementPosition.button.left}px`,
              top:`${elementPosition.button.top}px`,
              border: `${set.button.backgroundColor === set.background.backgroundColor ? `1px solid #aaa` : 'none'}`
          }}
            onMouseDown={(clickEvent) => {handleMouseMoveDrag(clickEvent,'button')}}>{set.button.text}</Button>
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
  padding: 8px 16px;
  font-weight: bold;
  cursor: move;
  white-space: nowrap;
`

const AddElement = styled.div`
  position: absolute;
  left: 35px;
  bottom: -75px;
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