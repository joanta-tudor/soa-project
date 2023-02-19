import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';
export declare class User implements InMemoryDBEntity {
    id: string;
    username: string;
    password: string;
}
