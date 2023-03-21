import React, {useState} from "react";
import {useTheme} from "styled-components";

export function Tooltip(props){
  const { style, toolStyle, text, maxLength, ...otherProps } = props;
  const [isHover, setIsHover] = useState(false)
  const theme = useTheme()
  const handleMouseEnter = (e) => {
    e.innerText.length > maxLength ? setIsHover(true) : setIsHover(false)
  }
  const handleMouseLeave = () => {
    setIsHover(false)
  }

  const styled = {
    width: '100%',
    cursor: !isHover ? '' :'pointer',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    display: 'block',
    ...style
  }
  const toolTipStyle = {
    display: !isHover ? 'none' : 'block',
    position: 'absolute',
    top: 30,
    fontSize: 13,
    backgroundColor: '#fff',
    padding: '10px 15px',
    borderRadius: 5,
    border: `1px solid ${theme?.color.mainColor}`,
    zIndex: 3,
    ...toolStyle
  }

  return(
    <p style={{position: 'relative',maxWidth:'100%'}}>
      <span
        style={styled}
        onMouseEnter={(e)=>handleMouseEnter(e.target)}
        onMouseLeave={handleMouseLeave}
        {...otherProps}
      >{text}</span>
      <span style={toolTipStyle}>{text}</span>
    </p>
  );
}