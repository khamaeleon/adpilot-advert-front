import styled from "styled-components";
export function VerticalRule (props) {
  return(
    <VerticalRuleContainer {...props}/>
  )
}

export function VerticalRuleInset(props) {
  return(
    <VerticalRuleInsetContainer {...props}/>
  )
}

export function HorizontalRule (props) {
  return(
    <HorizontalRuleContainer {...props}/>
  )
}

export function AdSample(props) {
  return(
    <div></div>
  )
}
const VerticalRuleContainer = styled.div`
  width: 100%;
  height: 1px;
  background-color: #dcdcdc;
`

const VerticalRuleInsetContainer = styled.div`
  height:10px;
  background-color: #fafafa;
  box-shadow: inset 0 2px 3px rgba(0,0,0,0.1);
`

const HorizontalRuleContainer = styled.div`
  width: 1px;
  height: 10px;
  background-color: #dcdcdc;
`