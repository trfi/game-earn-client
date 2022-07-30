import { useRecoilState } from 'recoil'
import { modalAuthState } from '@/atoms'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import Login from './Login'
import Signup from './Signup'
import ForgetPass from './ForgetPass'

const AuthModal = () => {
  const [state, setState] = useState('login')
  const [open, setOpen] = useRecoilState(modalAuthState)

  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center font-semibold">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-primary text-left align-middle shadow-xl transition-all">
                  <button
                    className="absolute top-2 right-2 rounded-md px-2 text-2xl font-bold text-primary-content"
                    onClick={() => setOpen(false)}
                  >
                    ×
                  </button>
                  <Dialog.Title
                    as="h3"
                    className="my-6 text-center text-xl font-medium leading-6 text-primary-content"
                  >
                    {state == 'register'
                      ? 'Sign up'
                      : state == 'login'
                      ? 'Login'
                      : 'Quên mật khẩu'}
                  </Dialog.Title>
                  {state == 'register' ? (
                    <Signup />
                  ) : state == 'login' ? (
                    <Login />
                  ) : (
                    <ForgetPass />
                  )}

                  {state == 'register' ? (
                    <div className="my-6 px-4 text-right text-sm text-primary-content">
                      <span className="font-normal">Have an account?</span>{' '}
                      <button
                        onClick={() => setState('login')}
                        className="font-semibold"
                      >
                        Login
                      </button>
                    </div>
                  ) : state == 'login' ? (
                    <div className="my-6 px-4 text-center text-sm text-primary-content">
                      <button
                        onClick={() => setState('forget-pass')}
                        className="mb-3 font-semibold"
                      >
                        Forget password?
                      </button>
                      <div>
                        <span className="font-normal">Don't have an account yet?</span>{' '}
                        <button
                          onClick={() => setState('register')}
                          className="font-semibold"
                        >
                          Sign up
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="my-6 px-4 text-center text-sm text-primary-content">
                      <div>
                        <button
                          onClick={() => setState('login')}
                          className="font-semibold"
                        >
                          Login
                        </button>
                      </div>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
export default AuthModal
