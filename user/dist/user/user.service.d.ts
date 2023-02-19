import { User } from './user.entity';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
export declare class UserService {
    private readonly db;
    constructor(db: InMemoryDBService<User>);
    findOne(username: string): Promise<User | undefined>;
}
