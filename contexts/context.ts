import { createContext, useContext } from 'react';
import { io, Socket } from "socket.io-client";
import { SockObj } from '../types';

export enum Theme {
    Dark = 'dark',
    Light = 'light',
}

export type ThemeContextType = {
    theme: "light" | "dark";
    setTheme: (Theme: Theme) => void;
}

export type SocketContextType = {
    socket: Socket;
    connect: (Sock: Socket) => void
}

export type SocketUrlContextType = {
    url: string;
    setUrl: (url: string) => void
}

export type Config = {
    CompanyId: number;
    KOTGroupId: number;
    KOTGroup: string;
    sockets: Array<SockObj>;
    indicator: boolean;
    theme: "light" | "dark";
}

export type UserContextType = {
    config: Config
    setConfig: (config: Config) => void
}

export const ThemeContext = createContext<ThemeContextType>({ theme: Theme.Dark, setTheme: theme => console.warn('no theme provider') });
export const useTheme = () => useContext(ThemeContext);

export const SocketContext = createContext<SocketContextType>({ socket: io(), connect: theme => console.warn('no socket provider') });
export const useSocket = () => useContext(SocketContext);

export const SocketUrlContext = createContext<SocketUrlContextType>({ url: "", setUrl: theme => console.warn('no socketurl provider') });
export const useSocketUrl = () => useContext(SocketUrlContext);

export const UserContext = createContext<UserContextType>({ config: { CompanyId: 0, KOTGroupId: 0, sockets: [], theme: Theme.Light, KOTGroup: "", indicator: false }, setConfig: theme => console.warn('no config provider') });
export const useConfig = () => useContext(UserContext);