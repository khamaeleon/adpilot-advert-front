import * as React from 'react';
import styled from "styled-components";

const Checkbox = React.forwardRef((props,ref) => {
  const { id, type, value, name,label, isChecked, onChange, disabled } = props
  return(
    <CheckboxContainer>
      <label>
        <input type="checkbox"
               className={'checkbox-type-'+type}
               value={value? value : ''}
               name={name ? name : null }
               id={id ? id : "checkFor"}
               onChange={(e) => onChange(e)}
               checked={isChecked}
               disabled={disabled}
        />
        <i/>
        <span>{label}</span>
      </label>
    </CheckboxContainer>
  )
})

export default Checkbox

const CheckboxContainer = styled.div`
  & label {
    display: flex;
    align-items: center;
  }
`