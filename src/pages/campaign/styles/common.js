import styled from "styled-components";
import {borderColor, lightGray} from "../../../assets/GlobalStyles";

export const BorderSpan = styled.div`
  display: flex;
  width: auto !important;
  align-items: center;
  padding: 5px;
  background-color: #f9fafb;
  border: 1px solid ${lightGray};
  border-radius: 8px;
  & span {
    margin-left: 20px;
  }
  & button {
    margin-left: 10px;
  }
`

export const CampaignTypeItem = styled.div`
  padding: 30px 80px 20px;
  background-color: ${(props) => props.readOnly ? "" : "#fff"};
  border-radius: 8px;
  border: 2px solid ${(props) => props.active ? "#f5811f" : (props.readOnly ?"f9fafb":"#fff")};
  box-shadow: 0 2px 3px 0 rgba(10, 10, 10, 0.2);
  font-size: 12px;
  white-space: break-spaces;
  &:hover {
    border: ${(props) => props.readOnly ? "" : "2px solid #f5811f" };
    cursor: ${(props) => props.readOnly ? "" : "pointer" };
  }
  & > p {
    font-size: 13px;
    font-weight: 500; 
    text-align: center;
    color: ${(props) => props.active ? "#f5811f" : null};
    margin-top: 10px;
  }
`

export const CampaignTypeItem2 = styled.div`
  padding: 15px 20px;
  background-color: ${(props) => props.readOnly ? "" : "#fff"};
  border-radius: 8px;
  border: 2px solid ${(props) => props.active ? "#f5811f" : (props.readOnly ?"f9fafb":"#fff")};
  box-shadow: 0 2px 3px 0 rgba(10, 10, 10, 0.2);
  font-size: 12px;
  white-space: break-spaces;
  &:hover {
    border: ${(props) => props.readOnly ? "" : "2px solid #f5811f" };
    cursor: ${(props) => props.readOnly ? "" : "pointer" };
  }
  & .tit {
    font-size: 13px;
    color: ${(props) => props.active ? "#f5811f" : null};
    margin-bottom: 3px;
  }
`

export const SmallButton = styled.button`
  padding: 5px 20px;
  border-radius: 5px;
  background-color: #535353;
  color: #fff;
`

export const SelectCategory = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  gap: 10px;
  background-color: #f9fafb;
  border-radius: 5px;
  border: 1px solid #e5e5e5;
`

export const CategoryItem = styled.div`
  margin-right: 0 !important;
  padding: 10px 17px;
  min-width: 100px;
  text-align: center;
  border: ${props => props.active ? "1px solid #f5811f" : "1px solid #e5e5e5"};
  color: ${props => props.active ? "#f5811f" : null};
  border-radius: 3px;
  background-color: #fff;
  font-size: 12px;
  &:hover {
    color: #f5811f;
    border: 1px solid #f5811f;
    cursor: pointer;
  }
`

export const RowInBox = styled.div`
  font-size: 12px;
  & > div {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    & span {
      margin-right: 10px;
    },
    & > div {
      display: flex;
      align-items: center;
      margin-right: 10px;
    }
    & > div > label {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
    & > div > label > input[type='radio'] {
      width: 14px;
      height: 14px;
      background-color: #fff;
      background-image: none;
      border: 1px solid ${lightGray};
      border-radius: 14px;
    }
    & > div > label > input[type='radio']:checked {
      width: 14px;
      height: 14px;
      background-size: contain;
      background-repeat: no-repeat;
      background-image: url('/assets/images/common/selectcircle_on.png');
      background-image: -webkit-image-set(url('/assets/images/common/selectcircle_on.png') 1x,url('/assets/images/common/selectcircle_on@2x.png') 2x, url('/assets/images/common/selectcircle_on@3x.png') 3x)
    }
  }
`

export const SmallInput = styled.div`
  position: relative;
  & > input[type='text'] {
    padding: 0 10px;
    width: 50px;
    height: 24px;
    border: 1px solid #e5e5e5;
    border-radius: 3px;
  }
`

export const CampaignButton = styled.button`
  flex: 1 1;
  height: 50px;
  background-color: #fff;
  border-radius: 0;
  border: ${(props)=> props.className === 'on' ? '1px solid #f5811f;' : '1px solid #e5e5e5;'};
  color: ${(props)=> props.className === 'on' ? '#f5811f;' : null};
`

export const LoadButton  = styled.button`
  flex: 1 1;
  height: 50px;
  background-color: #f3f3f3;
  border: 1px solid #e5e5e5;
  border-radius: 0;
`

export const ResistBanner = styled.div`
  padding: 20px;
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-top: 0;
`

export const ImageUploadCard = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  width: 100%;
  aspect-ratio: 1/1;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid ${lightGray};
  & > div.img {
    width: 90%;
    height: 90%;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }
`

export const DeleteIcon = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 18px;
  height: 18px;
  background-image: url("/assets/images/common/btn_img_close.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
  &:hover {
    background-image: url("/assets/images/common/btn_img_close_on.png");
    cursor: pointer;
  }
`

export const CreateImage = styled.div`
  padding: 5px;
  width: 100%;
  aspect-ratio: 1/1;
  background-color: #ebebec;
  border-radius: 5px;
  background-image: url("/assets/images/common/btn_img_upload.png");
  background-repeat: no-repeat;
  background-position: center;
  &:hover {
    background-color: ${lightGray};
    cursor: pointer;
    background-image: url("/assets/images/common/btn_img_upload_on.png");
  }
`

export const RowHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid #e5e5e5;
`

export const RowBody = styled.div`
  display: flex;
  align-content: stretch;
  padding: 10px 30px 20px;
  height: ${(props) => props.fold ? 0:null};
  transform: scaleY(${(props) => props.fold ? 0:null});  
`
export const Row = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 14px;
  & > span {
    display: inline-block;
    width: 120px;
    margin-right: 0 !important;
  }
  & > input, & .txtCont {
    padding: 10px;
    width: 80%;
    border: 1px solid ${borderColor};
    border-radius: 5px;
    height: 36px;
  }
  & .txtCont {
    display: flex;
    align-items: center;
    justify-content: space-between;
    > input {
      border: 0;
      width: calc(100% - 34px);
    }
    > p {
      font-size: 12px;
      color: #777;
      &:after {
        display: inline-block;
        padding-left: 3px;
        content: '자';
      }
    }
  } 
`

export const PrevFrame = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 10px;
  width: ${(props)=> props.width+"px"};
  height: ${(props)=> props.height+"px"};
  aspect-ratio: ${(props)=> props.width/props.height};
  background-color: #fff;
  border-radius: 0.3rem;
  border: 1px solid ${lightGray};
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  font-size: 15px;
`

export const PrevImage250 = styled.div`
  display: inline-block;
  position: relative;
  border-radius: 0.3rem;
  width: 100%;
  height: 70%;
  background-color: #fff;
  border: 1px solid ${lightGray};
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`

export const PrevTitle250 = styled.div`
  display: flex;
  align-items: center;
  max-width: 80%;
  height: 30%;
  text-align: center;
`

export const PrevImage728 = styled.div`
  display: inline-block;
  position: relative;
  border-radius: 0.3rem;
  width: 30%;
  height: 100%;
  background-color: #fff;
  border: 1px solid ${lightGray};
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`

export const PrevTitle728 = styled.div`
  display: flex;
  align-items: center;
  margin-Left: 10px;
  width: 45%;
  height: 100%;
`

export const PrevButton = styled.button`
  width: 20%;
  height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: #fff;
  border: 1px solid ${lightGray};
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  white-space: nowrap;
  text-align: center;
  font-size: 15px;
`

export const ImageTitle = styled.div`
  position: absolute;
  left: -5px;
  top: -5px;
  padding: 12px 18px;
  border-radius: 5px;
  box-shadow: 0 3px 6px 0 hsla(0, 0%, 0%, 0.16);
  background-color: #fff;
`

export const ValueText = styled.span`
  font-size: 12px;
`

export const FolderButton = styled.div`
  width: 50px;
  height: 50px;
  background-image: url('/assets/images/common/btn_setup_close.png');
  background-repeat: no-repeat;
  background-position: center;
  transform: rotate(${(props) => props.fold ? '180deg' : '0deg'});
`
export const ArrowButton = styled.div`
  width: 50px;
  height: 50px;
  background-image: url('/assets/images/common/btn_setup_close.png');
  background-repeat: no-repeat;
  background-position: center;
  transform: rotate(${(props) => props.next ? '270deg' : '90deg'});
`

export const ValidationGroup = styled.div`
  display: flex;
  justify-content: space-around;
`
export const Validation = styled.div`
  width: 50%;
  font-size: 12px;
  color: #f55a5a;
  
`
export const  AdverInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 17px;
  font-weight: 600;
  margin: 10px 0 20px;
  > p {
    width: 1px;
    height: 14px;
    margin: 0 10px; 
    background-color: #333;
  }
  > span:last-child {
    font-size: 14px;
    font-weight: 400;
  }
`