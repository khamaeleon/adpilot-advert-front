import React, {useEffect, useState} from 'react';
import styled from "styled-components";

const Switch = (props) => {
  const [isClicked, setClicked] = useState("")

  useEffect(()=>{
    setClicked(props.disClose)
  },[props.disClose])

  const handleChange  = () =>{
    setClicked((isClicked) => {
      return !isClicked
    })
    props.onClick(props.item,!isClicked)
  }

  return (
    <>
      <input
        className="react-switch-checkbox"
        id={`react-switch-${props.item.sortNumber}`}
        type="checkbox"
        onChange={handleChange}
        checked={isClicked || false}
        disabled={props.completed ? false : true}
      />
      <label
        className="react-switch-label"
        htmlFor={`react-switch-${props.item.sortNumber}`}
      > {props.completed ? isClicked &&
        <On>ON</On> || <Off>OFF</Off>
          :
          (<NotComplete>미완성</NotComplete>)
        }
        {props.completed &&
          <span className={`react-switch-button`} />
        }
      </label>
    </>
  );
};

export default Switch;

const On = styled.span`
  display: inline-block;
  width: 100%;
  margin-left: 10px;
  font-size: 12px;
  font-weight: 500;
  color: #fff
`
const Off = styled.span`
  display: inline-block;
  width: 100%;
  text-align: right;
  margin-right: 8px;
  font-weight: 300;
  font-size: 12px;
  color: #999
`

const NotComplete = styled.span`
  display: inline-block;
  width: 100%;
  text-align: center;
  font-weight: 300;
  font-size: 12px;
  color: #999
`