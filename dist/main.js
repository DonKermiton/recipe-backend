"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const error_handler_interceptor_1 = require("./core/interceptor/error-handler.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.useGlobalInterceptors(new error_handler_interceptor_1.ErrorHandlingInterceptor());
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map