import axiosClient from '@/api/axios-client'
import { useRouter } from 'next/router'
import { useState } from 'react'
import toast from 'react-hot-toast'
import useSWR from 'swr'

interface Props {
  roomId: string
}

const CreateRoomModal = () => {
  const [havePw, setHavePw] = useState(false)
  const router = useRouter()
  const { mutate: mutateBalance } = useSWR('/wallet/balance')

  async function handleSubmit(e: any) {
    e.preventDefault()
    const data = {
      maxPlayer: +e.target.maxPlayer.value,
      amount: +e.target.amount.value
    }
    try {
      await axiosClient.post('/rooms', data)
      mutateBalance()
      toast.success('Create room success')
    } catch (err: any) {
      toast.error(err.message)
      router.push('/dashboard/wallet')
    }
    document.getElementById('create-room-modal')?.click()
  }

  return (
    <>
      <input type="checkbox" id="create-room-modal" className="modal-toggle" />
      <label htmlFor="create-room-modal" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <label
            htmlFor="create-room-modal"
            className="btn btn-circle btn-sm absolute right-2 top-2"
          >
            ✕
          </label>
          <h2 className="font-mono text-2xl font-bold">Create Room</h2>
          <span className='text-gray-500'>Room creation fee is 100$</span>
          <hr className="my-5" />
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* <div>
              <label className="label pt-0">
                <span className="label-text">Time</span>
              </label>
              <label className="input-group">
                <input
                  type="number"
                  placeholder="Time"
                  defaultValue={5}
                  className="input input-bordered w-full"
                />
                <span className="min-w-[5rem]">Minute</span>
              </label>
            </div> */}
            <div>
              <label className="label">
                <span className="label-text">Amount</span>
              </label>
              <label className="input-group">
                <input
                  type="number"
                  placeholder="Amount"
                  defaultValue={100}
                  name="amount"
                  className="input input-bordered w-full"
                />
                <span className="min-w-[5rem]">$</span>
              </label>
            </div>
            <div>
              <label className="label">
                <span className="label-text">Max Player</span>
              </label>
              <input
                type="number"
                placeholder="Max Player"
                defaultValue={10}
                name="maxPlayer"
                className="input input-bordered w-full"
              />
            </div>
            {/* <div>
              <label className="label cursor-pointer justify-start space-x-2 pb-0">
                <input
                  onChange={() => setHavePw((havePw) => !havePw)}
                  type="checkbox"
                  className="checkbox checkbox-primary"
                />
                <span className="label-text">Have password?</span>
              </label>
              <input
                type="number"
                name="roomPassword"
                placeholder="Room Password"
                disabled={!havePw}
                required
                className="input input-bordered mt-4 w-full"
              />
            </div> */}

            <button className="btn btn-primary w-full">CREATE</button>
          </form>
        </label>
      </label>
    </>
  )
}
export default CreateRoomModal
