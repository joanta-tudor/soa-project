"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const in_memory_db_1 = require("@nestjs-addons/in-memory-db");
let UserService = class UserService {
    constructor(db) {
        this.db = db;
        this.db.create({
            username: 'admin',
            password: 'password',
        });
    }
    async findOne(username) {
        const users = this.db.query((user) => user.username === username);
        return users.length > 0 ? users[0] : undefined;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, in_memory_db_1.InjectInMemoryDBService)('user')),
    __metadata("design:paramtypes", [in_memory_db_1.InMemoryDBService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map