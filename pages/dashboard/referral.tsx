import TreeList from '@/components/dashboard/TreeList'
import { DashboardLayout } from '@/components/layouts'
import { NextPageWithLayout } from '@/models'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '@/hooks'
import toast from 'react-hot-toast'
import { Disclosure } from '@headlessui/react'

const Referral: NextPageWithLayout = () => {
  const { user } = useAuth()

  const refLink = `${
    typeof window !== 'undefined' && window.location.origin
  }/?ref=${user && user.id}`

  function onCopyHandler() {
    navigator.clipboard.writeText(refLink)
    toast.success('Copy successfuly')
  }

  return (
    <div className="w-full">
      <div className="my-8 flex flex-col items-center">
        <h2 className="text-xl font-semibold">My referral link:</h2> <br />
        <div className="form-control w-full max-w-xl">
          <div className="input-group text-gray-500">
            <input
              type="text"
              value={refLink}
              disabled
              className="input input-bordered w-full"
            />
            <button onClick={onCopyHandler} className="btn btn-square">
              <FontAwesomeIcon icon={faCopy} />
            </button>
          </div>
        </div>
      </div>
      <TreeList />

      <div className="mt-10 flex flex-col items-center">
        <Disclosure defaultOpen={false}>
          <p>
            Get commission for referring players
          </p>
          <Disclosure.Button className="btn btn-outline btn-accent mx-auto mt-3 mb-6">
            Commisson Programs
          </Disclosure.Button>
          <Disclosure.Panel>
            <img
              className="mx-auto"
              width={800}
              src="/images/commission-level.jpg"
              alt="Commission"
            />
          </Disclosure.Panel>
        </Disclosure>
      </div>
    </div>
  )
}

Referral.Layout = DashboardLayout

export default Referral
