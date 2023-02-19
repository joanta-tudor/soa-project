import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';
export declare class Car implements InMemoryDBEntity {
    id: string;
    name: string;
    description: string;
}
