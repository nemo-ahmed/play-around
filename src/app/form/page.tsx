import InputWrapper from '@/components/InputWrapper'

import {createPost} from './action'

async function Form() {
  return (
    <div className="flex justify-center items-center h-full">
      <form className="container" action={createPost}>
        <InputWrapper
          type="text"
          name="firstName"
          min={2}
          max={10}
          required
          pattern="^[a-zA-Z]{2,10}$"
        />
        <InputWrapper
          type="text"
          name="lastName"
          required
          pattern="^[a-zA-Z]{2,10}$"
        />
        <InputWrapper
          type="email"
          name="email"
          pattern="^.+@.+\..{2,}$"
          required
        />
        <InputWrapper type="checkbox" name="Agree" id="Agree" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Form
