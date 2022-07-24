import { DashboardLayout } from '@/components/layouts'
import { NextPageWithLayout } from '@/models'
import { Tab } from '@headlessui/react'
import classNames from '@/utils/className'
import Items from '../../components/dashboard/Marketplace/Items'
import Boxes from '../../components/dashboard/Marketplace/Boxes'

const Marketplace: NextPageWithLayout = () => {
  let titles = ['Items', 'Boxes']

  return (
    <div>
      <h1 className="mb-4 text-3xl font-bold lg:mb-6">Marketplace</h1>
      <Tab.Group>
        <Tab.List className="flex max-w-md space-x-1 rounded-xl bg-primary p-1">
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
            <Items />
          </Tab.Panel>
          <Tab.Panel className="rounded-xl">
            <Boxes />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

Marketplace.Layout = DashboardLayout

export default Marketplace
