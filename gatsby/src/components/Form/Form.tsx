import React, { FC, FormEvent } from 'react'
import styled from 'styled-components'
import {
  HeadingStyle,
  FontMedium,
  HeadingLarge,
} from '../../assets/styles/Typography'

interface Props {
  method?: string
  action?: string
  callback: (e: FormEvent) => void
}

const StyledForm = styled.form`
  fieldset {
    border: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-auto-rows: auto;
    gap: 1rem;
    @media screen and (min-width: 768px) {
      gap: 2rem;
    }
  }
  legend {
    ${HeadingStyle}
    ${HeadingLarge}
  }
  label {
    font-size: var(--font-xsmall);
    display: block;
    color: var(--dark-grey);
    ${FontMedium}
  }
`

const Form: FC<Props> = ({ method, action, children, callback }) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    callback(e)
  }

  return (
    <StyledForm method={method} action={action} onSubmit={handleSubmit}>
      {children}
    </StyledForm>
  )
}

Form.defaultProps = {
  method: 'post',
  action: '',
}
export default Form
