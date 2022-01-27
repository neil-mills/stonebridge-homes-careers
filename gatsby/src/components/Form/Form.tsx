import React, { FC, FormEvent, Ref } from 'react'
import styled from 'styled-components'
import { FontMedium, FontRegular } from '../../assets/styles/Typography'

interface Props {
  method?: string
  action?: string
  callback: (e: FormEvent) => void
  children?: React.ReactNode
}

const StyledForm = styled.form`
  border: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-auto-rows: auto;
  grid-template-columns: 1fr;
  justify-content: start;
  gap: 1rem;
  @media screen and (min-width: 768px) {
    gap: 2rem;
  }
  p.hint {
    font-size: var(--font-xsmall);
    ${FontRegular}
    margin: 0;
    margin-bottom: 5px;
  }
  label {
    font-size: var(--font-xsmall);
    display: block;
    color: var(--dark-grey);
    ${FontMedium}
  }
  button[type='submit'] {
    justify-self: start;
    margin-top: 2rem;
  }
`

const Form = React.forwardRef<HTMLFormElement, Props>((props, ref) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    props.callback(e)
  }
  return (
    <StyledForm
      ref={ref}
      method={props.method}
      action={props.action}
      onSubmit={handleSubmit}
    >
      {props.children}
    </StyledForm>
  )
})

// const Form: FC<Props> = ({ method, action, children, callback }) => {
//   const handleSubmit = (e: FormEvent) => {
//     e.preventDefault()
//     callback(e)
//   }

//   return (
//     <StyledForm method={method} action={action} onSubmit={handleSubmit}>
//       {children}
//     </StyledForm>
//   )
// }

Form.defaultProps = {
  method: 'post',
  action: '',
}
Form.displayName = 'Form'
export default Form
