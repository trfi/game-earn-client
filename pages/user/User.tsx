import { Tab } from '@headlessui/react'
import { NextPageWithLayout } from '@/models'
import ChangePassword from '@/components/dashboard/ChangePassword'
import ContactInfo from '@/components/dashboard/ContactInfo'
import WithdrawlalInfo from '@/components/dashboard/WithdrawalInfo'
import { DashboardLayout } from '@/components/layouts'
import KYC from '@/components/user/KYC'
import classNames from '@/utils/className'

const Example: NextPageWithLayout = () => {
  let titles = ['Profile', 'KYC']

  return (
    <div className="w-full">
      <Tab.Group>
        <Tab.List className="mx-auto flex max-w-md space-x-1 rounded-xl bg-primary p-1">
          {titles.map((title) => (
            <Tab
              key={title}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white text-primary shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {title}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-6 lg:mt-8">
          <Tab.Panel className="rounded-xl">
            <div className="mb-6 lg:mb-10 flex flex-col gap-6 lg:gap-10 lg:flex-row">
              <ContactInfo />
              <WithdrawlalInfo />
            </div>
            <ChangePassword />
          </Tab.Panel>
          <Tab.Panel
            className="rounded-xl"
          >
            <KYC />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

Example.Layout = DashboardLayout

export default Example
