import styled from "styled-components";
import {mainColor} from "../../../assets/GlobalStyles";

export const CategoryContainer = styled.div`
  display: flex;
  overflow: hidden;
`
export const MainCategory = styled.div`
  margin-right: 15px;
  width: 400px;
  border: 1px solid #ddd;
`

export const SubCategory = styled.div`
  width: 100%;
  border: 1px solid #ddd;
`

export const CategoryEnroll = styled.div`
  display: flex;
  border-bottom: 1px solid #ddd;
  overflow: hidden;
  padding: 0 10px 0 0;
  height: 0;
  transition-duration: 0.5s;
  background-color: #f3f3f3;
`

export const CategoryHeader = styled.div`
  position: relative;
  width: 100%;
  padding: 12px 15px;
  text-align: center;
  background-color: #fafafa;
  border-bottom: 1px solid #ddd;
`

export const CategoryBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 500px;
  overflow-y: scroll;
  & div:last-child {
    border-bottom: 0;
  }
`

export const CategoryItem = styled.div`
  padding: 12px 18px;
  width: 100%;
  border-bottom: ${(props) => props.active ? "1px solid #ffe3cb" : "1px solid #ddd"};
  border-left: ${(props) => props.active ? '2px solid' : null};
  border-left-color: ${(props) => props.active ? mainColor : null};
  cursor: pointer;
  background-color: ${(props) => props.active ? "#fffaf1" : null};
  color: ${(props) => props.active ? mainColor : null};
`

export const SubCategoryBody = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 100%;
  max-height: 500px;
  overflow-y: auto;
  & div:nth-child(4n) {
    border-right: 0;
  }
`

export const SubCategoryItem = styled.div`
  padding: 12px 18px;
  width: 25%;
  border-bottom: 1px solid #ddd;
  border-right: 1px solid #ddd;
`

export const EnrollButton = styled.button`
  position: absolute;
  top: 50%;
  right: 10px;
  padding: 0 20px;
  height: 30px;
  margin-top: -15px;
  background-color: #fff;
  border: 1px solid #ddd;
  color: #777777;
  font-weight: bold;
  &:hover {
    color: #f5811f;
  }
`

export const SearchButton = styled.button`
  width: 140px;
  height: 40px;
  border: 1px solid #dddddd;
  background-color: #fff;
  border-radius: 5px;
  &:hover {
    color: #f5811f;
  }
`
export const StatusBtn = styled.button`
  padding: 0 10px;
  display: flex;
  align-items: center;
  background-color: #f9fafb;
  height: 35px;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  &:hover {
    border-color: #f5811f;
  }
`
export const Image = styled.img`
  width: 100%;
`

export const DuplicateButton = styled.button`
  width: 120px;
  height: 40px;
  background-color: #777;
  border-radius: 5px;
  color: #fff;
  font-size: 15px;
  &:hover {
    background-color: #535353;
  }
`
export const InputValidationCon = styled.div`
  width: 100%;
  > div { position: unset; }
`
