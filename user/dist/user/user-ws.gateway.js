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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserWsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const ws_1 = require("ws");
let UserWsGateway = class UserWsGateway {
    broadcast(data) {
        console.log('Broadcasting data', data);
        this.server.clients.forEach((client) => {
            if (client.readyState === ws_1.OPEN) {
                client.send(JSON.stringify(data));
            }
        });
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", typeof (_a = typeof ws_1.Server !== "undefined" && ws_1.Server) === "function" ? _a : Object)
], UserWsGateway.prototype, "server", void 0);
UserWsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    })
], UserWsGateway);
exports.UserWsGateway = UserWsGateway;
//# sourceMappingURL=user-ws.gateway.js.map