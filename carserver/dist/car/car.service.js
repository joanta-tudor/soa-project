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
exports.CarService = void 0;
const common_1 = require("@nestjs/common");
const in_memory_db_1 = require("@nestjs-addons/in-memory-db");
let CarService = class CarService {
    constructor(db) {
        this.db = db;
        this.db.create({
            name: 'Ferrari',
            description: 'Every Ferrari car takes roughly 3 months to complete. And it all begins in the foundry of the company where the most critical job of casting the engine is done. These parts are then delivered to the assembly line where 147 engines are hand-built everyday!',
        });
    }
    async findAll() {
        const cars = this.db.getAll();
        return cars;
    }
    async save(carDto) {
        const car = this.db.create({
            name: carDto.name,
            description: carDto.description,
        });
        return car;
    }
    async remove(id) {
        this.db.delete(id);
    }
};
CarService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, in_memory_db_1.InjectInMemoryDBService)('car')),
    __metadata("design:paramtypes", [in_memory_db_1.InMemoryDBService])
], CarService);
exports.CarService = CarService;
//# sourceMappingURL=car.service.js.map