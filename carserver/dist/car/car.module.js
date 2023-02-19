"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarModule = void 0;
const common_1 = require("@nestjs/common");
const car_service_1 = require("./car.service");
const car_controller_1 = require("./car.controller");
const microservices_1 = require("@nestjs/microservices");
const in_memory_db_1 = require("@nestjs-addons/in-memory-db");
let CarModule = class CarModule {
};
CarModule = __decorate([
    (0, common_1.Module)({
        imports: [
            in_memory_db_1.InMemoryDBModule.forFeature('car', {}),
            microservices_1.ClientsModule.register([
                {
                    name: 'AUTH_CLIENT',
                    transport: microservices_1.Transport.TCP,
                    options: {
                        host: 'localhost',
                        port: 4001,
                    },
                },
            ]),
            microservices_1.ClientsModule.register([
                {
                    name: 'USER_CLIENT',
                    transport: microservices_1.Transport.TCP,
                    options: {
                        host: 'localhost',
                        port: 4010,
                    },
                },
            ]),
        ],
        providers: [car_service_1.CarService],
        controllers: [car_controller_1.CarController],
    })
], CarModule);
exports.CarModule = CarModule;
//# sourceMappingURL=car.module.js.map