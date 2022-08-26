import { Socket } from 'socket.io-client'
import { IOrder, IPlayMatrix, IStartGame } from '@/components/gamet'
import { IMessage } from '@/components/game/RightPanel/Chat'

class GameService {
  public async joinGameRoom(socket: Socket, roomId: string): Promise<boolean> {
    return new Promise((rs, rj) => {
      socket.emit('join_room', { roomId })
      socket.on('room_joined', () => rs(true))
      socket.on('room_join_error', ({ error }) => rj(error))
    })
  }

  public async joinGameRooms(socket: Socket, rooms: string[]): Promise<number> {
    return new Promise((rs, rj) => {
      socket.emit('join_rooms', { rooms })
      socket.on('room_joined', (numUser: number) => rs(numUser))
      socket.on('room_join_error', ({ error }) => rj(error))
    })
  }

  public async leaveGameRoom(socket: Socket, roomId: string): Promise<boolean> {
    return new Promise((rs, rj) => {
      socket.emit('leave_room', { roomId })
      socket.on('room_leaved', () => rs(true))
    })
  }

  public async newOrder(socket: Socket, data: IOrder) {
    socket.emit('new_order', data)
  }


  public async updateGame(socket: Socket, gameMatrix: IPlayMatrix) {
    socket.emit('update_game', { matrix: gameMatrix })
  }

  public async onNewOrder(socket: Socket, listiner: (message: any) => void) {
    console.log('listen new order');
    socket.on('on_new_order', (message) => listiner(message))
  }

  public async sendMessage(socket: Socket, data: IMessage) {
    socket.emit('chat_message', data)
  }

  public async onChatMessage(socket: Socket, listiner: (message: any) => void) {
    console.log('listen chat message');
    socket.on('on_chat_message', (message) => listiner(message))
  }

  public async onNewOrderHistory(socket: Socket, listiner: (message: any) => void) {
    socket.on('on_new_order_history', (message) => listiner(message))
  }

  public async onOrderResult(socket: Socket, listiner: (message: any) => void) {
    socket.on('on_order_result', (message) => listiner(message))
  }

  public async onCountUser(socket: Socket, listiner: (message: any) => void) {
    socket.on('on_count_user', (message) => listiner(message))
  }

  public async onGameUpdate(
    socket: Socket,
    listiner: (matrix: IPlayMatrix) => void
  ) {
    socket.on('on_game_update', ({ matrix }) => listiner(matrix))
  }

  public async onStartGame(
    socket: Socket,
    listiner: (options: IStartGame) => void
  ) {
    socket.on('start_game', listiner)
  }

  public async gameWin(socket: Socket, message: string) {
    socket.emit('game_win', { message })
  }

  public async onGameWin(socket: Socket, listiner: (message: string) => void) {
    socket.on('on_game_win', ({ message }) => listiner(message))
  }
}

export default new GameService()
