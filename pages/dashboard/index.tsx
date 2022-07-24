import Link from 'next/link'
import { DashboardLayout } from '@/components/layouts'
import { NextPageWithLayout } from '@/models'
import useSWR from 'swr'
import { useAuth } from '@/hooks'
import Banner from '@/components/dashboard/Banner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandHoldingUsd, faUserPlus, faUser } from '@fortawesome/free-solid-svg-icons'

const Dashboard: NextPageWithLayout = () => {
  const { data } = useSWR('/wallet/balance', {
    dedupingInterval: 60 * 1000,
  })
  const { user } = useAuth()

  return (
    <div className="flex w-full flex-col items-center justify-center gap-6">

      <div className="stats stats-vertical w-full max-w-screen-xl bg-primary py-4 text-primary-content lg:stats-horizontal">
        <div className="stat">
          <div className="stat-figure text-info">
            <FontAwesomeIcon size='lg' icon={faHandHoldingUsd} />
          </div>
          <div className="stat-title">Gói ref hiện tại</div>
          <div className="stat-value">{user.currentPack ? user.currentPack + '$' : '--'}</div>
          <div className="stat-desc">Jan 1st - Feb 1st</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-info">
            <FontAwesomeIcon size='lg' icon={faUser} />
          </div>
          <div className="stat-title">Số user F1</div>
          <div className="stat-value">{user?.referralChild?.length}</div>
          <div className="stat-desc">↗︎ 112 (22%)</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-info">
            <FontAwesomeIcon size='lg' icon={faUserPlus} />
          </div>
          <div className="stat-title">Đăng ký mới</div>
          <div className="stat-value">{user?.totalRef}</div>
          <div className="stat-desc">↗︎ 90 (14%)</div>
        </div>
      </div>

      <div className="stats stats-vertical w-full max-w-screen-xl bg-primary py-4 text-primary-content lg:stats-horizontal">
        <div className="stat">
          <div className="stat-title">Số dư ví chính</div>
          <div className="stat-value">{user?.balance}$</div>
          <div className="stat-actions">
            <Link href="/dashboard/wallet">
              <button className="btn btn-success btn-sm">Nạp tiền</button>
            </Link>
          </div>
        </div>
        <div className="stat">
          <div className="stat-title">Số dư ví hoa hồng</div>
          <div className="stat-value">{user?.commissionBalance}$</div>
          {user?.currentPack < 500 && (
            <div className="stat-desc text-base text-gray-300 opacity-100">
              ↗︎{' '}
              <span className="font-bold text-yellow-400 ">
                {user?.commissionBalance + user?.commissionUpTo}$
              </span>{' '}
              nếu mua gói KNB trên 500$
            </div>
          )}
          <div className="stat-actions">
            <Link href="/dashboard/wallet/withdrawal">
              <button className="btn btn-success btn-sm">Rút tiền</button>
            </Link>
          </div>
        </div>
        <div className="stat">
          <div className="stat-title">Tổng đã nạp</div>
          <div className="stat-value">${data?.totalDeposit}</div>
          <div className="stat-actions">
            <Link href="/dashboard/deposit-history">
              <button className="btn btn-sm">Lịch sử nạp</button>
            </Link>
          </div>
        </div>
        <div className="stat">
          <div className="stat-title">Tổng đã rút</div>
          <div className="stat-value">${data?.totalWithdrawal}</div>
          <div className="stat-actions">
            <Link href="/dashboard/wallet/withdrawal">
              <button className="btn btn-sm">Lịch sử rút</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

Dashboard.Layout = DashboardLayout

export default Dashboard
