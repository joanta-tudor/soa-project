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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const microservices_1 = require("@nestjs/microservices");
const MyAuthGuard_1 = require("../guard/MyAuthGuard");
const user_ws_gateway_1 = require("./user-ws.gateway");
const constants_1 = require("./constants");
let UserController = class UserController {
    constructor(userService, userWsGateway) {
        this.userService = userService;
        this.userWsGateway = userWsGateway;
    }
    getUser(data) {
        console.log(data.username);
        return this.userService.findOne(data.username);
    }
    async greet() {
        return 'Greetings authenticated user BRO';
    }
    async handleCarSavedEvent(data) {
        console.log('User microservices did receive car saved event: ', data);
        const random = Math.floor(Math.random() * 8);
        this.userWsGateway.broadcast({
            event: 'updated',
            payload: constants_1.didYouKnow[random],
        });
    }
};
__decorate([
    (0, microservices_1.MessagePattern)({ role: 'user', cmd: 'get' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, common_1.UseGuards)(MyAuthGuard_1.MyAuthGuard),
    (0, common_1.Get)('greet'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "greet", null);
__decorate([
    (0, microservices_1.EventPattern)('car-saved-event'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "handleCarSavedEvent", null);
UserController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        user_ws_gateway_1.UserWsGateway])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map