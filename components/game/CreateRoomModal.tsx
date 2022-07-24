import { useState } from 'react'

interface Props {
  roomId: string
}

const CreateRoomModal = () => {
  const [havePw, setHavePw] = useState(false)

  function handleSubmit(e: any) {
    e.preventDefault()
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
          <hr className="my-6" />
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
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
            </div>
            <div>
              <label className="label">
                <span className="label-text">Quantity</span>
              </label>
              <label className="input-group">
                <input
                  type="number"
                  placeholder="Quantity"
                  defaultValue={100}
                  className="input input-bordered w-full"
                />
                <span className="min-w-[5rem]">$</span>
              </label>
            </div>
            <div>
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
            </div>

            <button className="btn btn-primary w-full">CREATE</button>
          </form>
        </label>
      </label>
    </>
  )
}
export default CreateRoomModal
