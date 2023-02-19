"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const microservices_1 = require("@nestjs/microservices");
const common_1 = require("@nestjs/common");
const admin = require('firebase-admin');
const serviceAccount = require('../cars-microservices-soa-firebase-adminsdk-t62jw-a640ea8882');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.connectMicroservice({
        transport: microservices_1.Transport.TCP,
        options: {
            host: 'localhost',
            port: 4020,
        },
    });
    await app.startAllMicroservices();
    await app.listen(3012);
    common_1.Logger.log('Car microservice running');
}
bootstrap();
//# sourceMappingURL=main.js.map