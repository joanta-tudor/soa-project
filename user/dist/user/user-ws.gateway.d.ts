import { Server } from 'ws';
export declare class UserWsGateway {
    server: Server;
    broadcast(data: any): void;
}
