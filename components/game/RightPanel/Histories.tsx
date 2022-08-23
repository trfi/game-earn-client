import gameService from "@/services/gameService"
import socketService from "@/services/socketService"
import { useEffect, useState } from "react"

const Histories = () => {
  const [histories, setHistories] = useState([{}])

  const handleNewOrderHistory = () => {
    if (socketService.socket)
      gameService.onNewOrderHistory(socketService.socket, (data) => {
        console.log('onNewOrderHistory', data);
        setHistories((prev) => [data, ...prev])
      })
  }

  useEffect(() => {
    handleNewOrderHistory()
  }, [])

  return (
    <table className="table-compact table w-full">
      <thead>
        <tr>
          <th>Time</th>
          <th>Result</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {histories?.map((h: any) => (
          <tr key={h?._id}>
            <td></td>
            <td>{h?.resultPrice}</td>
            <td>{h?.amount}</td>
            <td>{h?.result}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
export default Histories
