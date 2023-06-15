import styled from "styled-components";

export const BannerItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  padding: 0 15px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  justify-content: space-around;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
`
export const DefaultItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 12px;
`
export const DefaultItemButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 137px;
  height: 36px;
  background-color: #ffffff;
  border: 1px solid ${(props) => props.active ? '#f5811f' : '#e5e5e5'};
  color: ${(props) => props.active ? '#f5811f' : null};
  cursor: pointer;
  & p {
    padding: 0 20px
  }
`

export const HalfDiv = styled.div`
  width: 50%;
`

export const TextButton = styled.div`
  margin-left: 10px;
  width: 80px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #777777;
  font-weight: 900;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
`

export const PopButton = styled.div`
  position: absolute;
  right: 0 ;
  top: 45px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px;
  border-radius: 0;
  background-color: #fff;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.2);
  z-index: 2;
`

export const PickerContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ddd;
  padding: 5px;
  width: 100%;
`

export const PickerHex = styled.div`
  white-space: nowrap;
`

export const PickerColor = styled.div`
  position: relative;
  background-color: ${(props) => props.color ? props.color : '#000000'};
  width: 30px;
  height: 30px;
  border: 1px solid #ddd;
  cursor: pointer;
`

export const FlexWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 15px;
`

export const Effect = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  background-color: ${({active}) => active ? '#eee' : '#fff'};
  border-radius: 3px;
  & > * {
    margin-right: 0;
  }
`