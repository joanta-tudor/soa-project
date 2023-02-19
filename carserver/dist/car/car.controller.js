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
exports.CarController = void 0;
const common_1 = require("@nestjs/common");
const car_service_1 = require("./car.service");
const MyAuthGuard_1 = require("../guard/MyAuthGuard");
const car_dto_1 = require("./car.dto");
const microservices_1 = require("@nestjs/microservices");
const firebase_admin_1 = require("firebase-admin");
let CarController = class CarController {
    constructor(carService, client) {
        this.carService = carService;
        this.client = client;
        this.collection = (0, firebase_admin_1.firestore)().collection('trendingCars');
    }
    async getAllCars() {
        common_1.Logger.log('Getting all cars...');
        return this.carService.findAll();
    }
    async getAllTrendingCar() {
        common_1.Logger.log('Getting all trending cars...');
        return this.collection.get().then((querySnapshot) => {
            if (querySnapshot.empty) {
                return [];
            }
            const cars = [];
            for (const doc of querySnapshot.docs) {
                cars.push(this.convertToCars(doc));
            }
            return cars;
        });
    }
    async save(carDto) {
        const car = this.carService.save(carDto);
        common_1.Logger.log('New car saved');
        this.client.emit('car-saved-event', { name: carDto.name });
        return car;
    }
    async deleteCar(id) {
        await this.carService.remove(id);
        common_1.Logger.log('Car deleted');
    }
    convertToCars(querySnapshot) {
        if (!querySnapshot.exists) {
            console.log(`no cars found with the given id`);
        }
        const todo = querySnapshot.data();
        console.log('DATA: ', querySnapshot.data());
        return {
            id: querySnapshot.id,
            name: todo.name,
            description: todo.description,
        };
    }
};
__decorate([
    (0, common_1.UseGuards)(MyAuthGuard_1.MyAuthGuard),
    (0, common_1.Get)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CarController.prototype, "getAllCars", null);
__decorate([
    (0, common_1.UseGuards)(MyAuthGuard_1.MyAuthGuard),
    (0, common_1.Get)('trending'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CarController.prototype, "getAllTrendingCar", null);
__decorate([
    (0, common_1.UseGuards)(MyAuthGuard_1.MyAuthGuard),
    (0, common_1.Post)('save'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [car_dto_1.CarDto]),
    __metadata("design:returntype", Promise)
], CarController.prototype, "save", null);
__decorate([
    (0, common_1.UseGuards)(MyAuthGuard_1.MyAuthGuard),
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CarController.prototype, "deleteCar", null);
CarController = __decorate([
    (0, common_1.Controller)('cars'),
    __param(1, (0, common_1.Inject)('USER_CLIENT')),
    __metadata("design:paramtypes", [car_service_1.CarService,
        microservices_1.ClientProxy])
], CarController);
exports.CarController = CarController;
//# sourceMappingURL=car.controller.js.map