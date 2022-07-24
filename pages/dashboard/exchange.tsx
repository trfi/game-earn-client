import axiosClient from '@/api/axios-client'
import { DashboardLayout } from '@/components/layouts'
import { NextPageWithLayout } from '@/models'
import { useState } from 'react'
import toast from 'react-hot-toast'
import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import { useAuth } from '@/hooks'

const Exchange: NextPageWithLayout = () => {
  const [server, setServer] = useState(0)
  const [roles, setRoles] = useState<Array<any>>([])
  const { mutate: mutateUser } = useAuth()
  const { data: servers } = useSWRImmutable('/game/servers')
  const { data: knbPackages } = useSWRImmutable('/game/knbpack')

  const exchangeHistory = useSWR('/history/exchange')
  const userBalance = useSWR('/wallet/balance')

  const handleChangeServer = (e: any) => {
    setServer(+e.target.value)
    axiosClient
      .get(`/game/roles/${e.target.value}`)
      .then((data: any) => setRoles(data))
      .catch((e) => toast.error(e))
  }

  const [role, setRole] = useState('')

  const handleChangeRole = (e: any) => {
    setRole(e.target.value)
  }

  async function buyHandle(e: any, packId: number) {
    if (!role) return toast.error('Vui lòng chọn nhân vật')
    e.target.disabled = true
    try {
      const character = roles.find((r) => r.id == role).name
      const serverName = servers.find((s: any) => s.id == server).name
      await axiosClient.post('/game/buyknbpack', {
        packId,
        server: serverName,
        role,
        character,
      })
      toast.success(
        'Mua thành công, vui lòng kiểm tra hộp thư trong game để nhận',
        { duration: 3000 }
      )
      mutateUser()
      exchangeHistory.mutate()
      userBalance.mutate()
    } catch (e: any) {
      toast.error(e.message)
    }
    e.target.disabled = false
  }

  return (
    <div className="w-full">
      <div className="text-center">
        <h1 className="text-4xl font-bold">
          MUA GÓI KNB{' '}
          <img className="inline" src="/images/knb.png" width={55} alt="knb" />
        </h1>
      </div>

      <div className="mt-[4vh] flex flex-col items-center gap-6">
        <select
          onChange={handleChangeServer}
          className="select select-primary w-full max-w-xs"
          defaultValue="server"
        >
          <option value="server" disabled>
            Server
          </option>
          {servers?.map((server: { id: number; name: string }) => (
            <option value={server.id} key={server.id}>
              {server.name}
            </option>
          ))}
        </select>
        <select
          onChange={handleChangeRole}
          className="select select-primary w-full max-w-xs"
          defaultValue="character"
        >
          <option value="character" disabled>
            Nhân vật
          </option>
          {roles && roles?.length ? (
            roles.map((role: { id: number; name: string }) => (
              <option value={role.id} key={role.id}>
                {role.name}
              </option>
            ))
          ) : server == 0 ? (
            <option disabled>Chọn server</option>
          ) : (
            <option disabled>Chưa tạo nhân vật nào</option>
          )}
        </select>
      </div>

      <div className="mt-[4vh] text-center text-lg text-yellow-400">
        <a href="/images/first-deposit-bonus.png" target="_blank">
          Chi tiết chương trình khuyến mãi nạp KNB lần đầu
        </a>
      </div>

      <div className="mx-auto mt-5 grid grid-cols-1 gap-6 md:grid-cols-2 xl:max-w-6xl">
        {knbPackages &&
          Object.values(knbPackages).map((pack: any) => (
            <div
              className="card bg-neutral text-slate-100 shadow-xl"
              key={pack.price}
            >
              <div className="card-body">
                <h3 className="card-title text-4xl font-bold">
                  ${pack.price.toLocaleString()}
                </h3>
                <p className="text-yellow-400">
                  = {pack.knb.toLocaleString()} KNB{' '}
                  <img
                    className="inline"
                    src="/images/knb.png"
                    width={25}
                    alt="knb"
                  />
                  {/* {!user.firstExchange && <p>{pack.bonus && `Nạp lần đầu khuyến mãi ${pack.bonus}%`}{pack.gift && ' + Tặng thú cưỡi Kim Mao Sư Vương'}</p>} */}
                </p>
                <div className="card-actions items-end justify-between">
                  <code className="w-full text-sm text-red-300 lg:w-[70%]">
                    {pack.note}
                  </code>
                  <button
                    onClick={(e) => buyHandle(e, pack.price)}
                    className="btn btn-primary disabled:bg-gray-700"
                  >
                    Mua Ngay
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

Exchange.Layout = DashboardLayout

export default Exchange
