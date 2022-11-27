import React from 'react'
import { Rubik } from '@next/font/google'
import { initPocketBase } from 'utils/pocketbase'
import PocketBase from 'pocketbase'
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const pb = await initPocketBase(context.req, context.res)
  // const isAuth = pb.authStore.isValid
  return {
    props: {
      pb,
      test: true,
    },
  }
}

const rubik = Rubik()
const LoginForm = ({ pb, test }: { pb: PocketBase, test: boolean }) => {
  console.info(test)
  // console.log(pb.authStore.isValid)
  // const pb = new PocketBase('http://127.0.0.1:8090/')
  const login = async (e: any) => {
    e.preventDefault()
    const email = e.target.email.value
    const pass = e.target.password.value
    const authData = await pb.collection('users').authWithPassword(email, pass)
    console.log(pb.authStore.isValid)
    console.log(pb.authStore.token)
    // console.log(pb.authStore.model.id)
  }
  return (
    <div className='bg-base-container w-full max-w-lg my-16 mx-auto flex flex-col rounded shadow-xl'>
      <form onSubmit={(e: any) => login(e)}>
        <h1 className={'p-9 text-4xl font-light ' + rubik.className}>
          Login
        </h1>
        <div className='p-9 text-center'>
          <InputField
            type='email'
            placeholder='Email'
            name='email'
          />
          <div className='input-field'>
            <InputField
              type='password'
              placeholder='Password'
              name='password'
            />
          </div>
          <a
            href='#'
            className='text-base-content tracking-wide inline-block mt-5'
          >
            Forgot Your Password?
          </a>
        </div>
        <div className='flex flex-row'>
          <button
            className={
              'w-full border-none p-5 cursor-pointer bg-base-focus hover:bg-base-divider text-base-content rounded-bl rounded-br-none tracking-wide outline-0 transition-all duration-300 ' +
              rubik.className
            }
          >
            Register
          </button>
          <button
            className={
              'w-full border-none p-5 cursor-pointer bg-base-content hover:bg-opacity-80 text-base-container rounded-br rounded-bl-none tracking-wide outline-0 transition-all duration-300 ' +
              rubik.className
            }
          >
            Sign in
          </button>
        </div>
      </form>
      {/* {isAuth && <pre>Authenticated</pre>} */}
    </div>
  )
}

export default LoginForm

const InputField = ({
  type,
  placeholder,
  name,
}: {
  type: string
  placeholder: string
  name: string
}) => {
  return (
    <div className='py-3 px-1'>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className={
          'text-base block w-full py-3 px-px border-0 border-b-[1px] border-solid border-base-focus outline-none transition-all duration-200 focus:border-base-content ' +
          rubik.className
        }
      />
    </div>
  )
}
