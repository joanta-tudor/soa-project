"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const microservices_1 = require("@nestjs/microservices");
const common_1 = require("@nestjs/common");
const platform_ws_1 = require("@nestjs/platform-ws");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.useWebSocketAdapter(new platform_ws_1.WsAdapter(app));
    app.connectMicroservice({
        transport: microservices_1.Transport.TCP,
        options: {
            host: 'localhost',
            port: 4010,
        },
    });
    await app.startAllMicroservices();
    await app.listen(3010);
    common_1.Logger.log('User microservice running');
}
bootstrap();
//# sourceMappingURL=main.js.map