import { UserService } from './user.service';
import { User } from './user.entity';
import { UserWsGateway } from './user-ws.gateway';
export declare class UserController {
    private readonly userService;
    private readonly userWsGateway;
    constructor(userService: UserService, userWsGateway: UserWsGateway);
    getUser(data: any): Promise<User>;
    greet(): Promise<string>;
    handleCarSavedEvent(data: Record<string, unknown>): Promise<void>;
}
