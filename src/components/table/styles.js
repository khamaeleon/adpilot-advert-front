import styled from "styled-components";

export const SwitchBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: 68px;
  height: 30px;
  background: #ddd;
  border-radius: 68px;
  position: relative;
  transition: background-color .2s;
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.2);

  & > label {
    content: '';
    position: absolute;
    top: 4px;
    left: 4px;
    width: 22px;
    height: 22px;
    border-radius: 22px;
    transition: 0.2s;
    background: #fff;
    box-shadow: 0 2px 3px 0 rgba(10, 10, 10, 0.4);
  }
`
export const On = styled.span`
  display: inline-block;
  width: 50%;
  margin-left: 10px;
  font-size: 12px;
  font-weight: 500;
  color: #fff
`
export const Off = styled.span`
  display: inline-block;
  width: 100%;
  text-align: right;
  margin-right: 8px;
  font-weight: 300;
  font-size: 12px;
  color: #999
`
export const BorderBox = styled.div`
  border: 1px solid #e5e5e5;
  margin-left: 15px;
  width: 100%;
  min-height: 45px;
  max-height: 120px;
  padding: 10px 5px 10px 10px;
  overflow-y: auto;
`
export const PreviewSubmit = styled.button`
  width: 200px;
  background-color: #525252;
  color: #fff;
`
export const Small = styled.small`
  display: inline-block;
  width: 100%;
  text-align: right;
  padding: 10px;
`
export const ScriptSubject = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  & div:last-child {
    font-size: 14px;
    color: #777;
  }
`
export const TitColor = styled.div`{
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  &:hover {
    color: #f5811f;
    > div {
      background-image: url("/assets/images/table/icon_pop_on@2x.png");
      background-image: -webkit-image-set(url("/assets/images/table/icon_pop_on.png") 1x, url("/assets/images/table/icon_pop_on@2x.png") 2x, url("/assets/images/table/icon_pop_on@3x.png") 3x);
    }
  }
}`