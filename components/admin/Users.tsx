import useSWR from 'swr'

const ListUser = () => {
  const { data: users } = useSWR('/users')

  const roles = {
    0: 'User',
    1: 'SAdmin',
    2: 'Admin',
  }

  return (
    <table className="table-zebra bottom-1 table w-full">
      <thead>
        <tr>
          <th></th>
          <th>Username</th>
          <th>Ví chính</th>
          <th>Ví hoa hồng</th>
          <th>Ref F1</th>
          <th>Total Ref</th>
          <th>Nạp lần đầu</th>
          <th>Vai trò</th>
          <th>Ngày tạo</th>
        </tr>
      </thead>
      <tbody>
        {users?.map((u: any, idx: number) => (
          <tr key={u._id}>
            <th className="text-sm">{idx + 1}</th>
            <td>
              <div>{u.username}</div>
            </td>
            <td>
              <div className="badge badge-outline badge-lg badge-accent">
                {u.balance}
              </div>
            </td>
            <td>
              <div className="badge badge-outline badge-lg badge-accent">
                {u.commissionBalance}
              </div>
            </td>
            <td>
              <div className="badge">{u.referralChild.length}</div>
            </td>
            <td>
              <div className="badge">{u.totalRef}</div>
            </td>
            <td>
              <div className="badge">{u.firstExchange ? 'v' : 'x'}</div>
            </td>
            <td>
              <div className="badge">{roles[u.role as keyof typeof roles]}</div>
            </td>
            <td>
              <div className="badge badge-md">
                {new Date(u.createdAt).toLocaleString()}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
export default ListUser
