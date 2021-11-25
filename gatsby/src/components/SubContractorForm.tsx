import React, { FC } from 'react'
import Form, { TextInput, FileInput, CheckboxInput } from './Form'
import Select from './Select'
import Button from './Button'

const SubContractorForm: FC = () => {
  return (
    <Form method={'post'} action={'/'}>
      <fieldset>
        <div>
          <label htmlFor={'title'}>Title</label>
          <Select size={'sm'} />
        </div>
        <div>
          <label htmlFor={'firstName'}>First name</label>
          <TextInput
            type={'text'}
            id={'firstName'}
            name={'firstName'}
            value={''}
          />
        </div>
        <div>
          <label htmlFor={'lastName'}>Last name</label>
          <TextInput
            type={'text'}
            id={'lastName'}
            name={'lastName'}
            value={''}
          />
        </div>
        <div>
          <label htmlFor={'email'}>Email</label>
          <TextInput type={'text'} id={'email'} name={'email'} value={''} />
        </div>
        <div>
          <label htmlFor={'phone'}>Phone</label>
          <TextInput type={'text'} id={'phone'} name={'phone'} value={''} />
        </div>
        <div>
          <label htmlFor={'cv'}>CV</label>
          <FileInput id={'cv'} name={'cv'} value={''} />
        </div>
        <div>
          <CheckboxInput
            label={'I accept the terms and conditions'}
            name={'accept'}
            id={'accept'}
            checked={true}
            last={true}
          />
        </div>
      </fieldset>
      <Button label={'Register details'} link={'/'} />
    </Form>
  )
}

export default SubContractorForm
