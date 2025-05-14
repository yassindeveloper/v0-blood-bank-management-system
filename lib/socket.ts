import type { Server as NetServer } from "http"
import { Server as SocketIOServer } from "socket.io"
import type { NextApiRequest, NextApiResponse } from "next"

export type NextApiResponseServerIO = NextApiResponse & {
  socket: {
    server: NetServer & {
      io: SocketIOServer
    }
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}

export default function SocketHandler(req: NextApiRequest, res: NextApiResponseServerIO) {
  if (!res.socket.server.io) {
    console.log("*First use, starting socket.io")

    const io = new SocketIOServer(res.socket.server)
    res.socket.server.io = io

    io.on("connection", (socket) => {
      console.log(`Client connected: ${socket.id}`)

      socket.on("join-room", (room) => {
        socket.join(room)
        console.log(`Socket ${socket.id} joined room: ${room}`)
      })

      socket.on("leave-room", (room) => {
        socket.leave(room)
        console.log(`Socket ${socket.id} left room: ${room}`)
      })

      socket.on("disconnect", () => {
        console.log(`Client disconnected: ${socket.id}`)
      })
    })
  }

  res.end()
}
