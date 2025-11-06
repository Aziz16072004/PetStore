import { io, Socket } from 'socket.io-client';
import { API_BASE_URL } from '../config/api';

let socket: Socket | null = null;

function getSocketBaseUrl(): string {
  try {
    // If API_BASE_URL ends with /api, strip it to get the origin for Socket.IO
    const url = new URL(API_BASE_URL);
    const path = url.pathname.replace(/\/$/, '');
    if (path.endsWith('/api')) {
      url.pathname = path.slice(0, -4) || '/';
    }
    return url.toString().replace(/\/$/, '');
  } catch {
    // Fallback: naive strip
    return API_BASE_URL.replace(/\/?api$/, '');
  }
}

export function getSocket(): Socket {
  if (!socket) {
    socket = io(getSocketBaseUrl(), {
      transports: ['websocket', 'polling'],
      autoConnect: true,
      // withCredentials: true, // enable if your backend needs cookies
    });
  }
  return socket;
}
