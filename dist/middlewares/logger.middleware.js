"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerGlobal = loggerGlobal;
function loggerGlobal(req, res, next) {
    const completeDate = new Date();
    const actualTime = completeDate.toLocaleTimeString('es-MX');
    const actualDate = completeDate.toLocaleDateString('es-MX');
    console.log(`Estás ejecutando un método ${req.method} en la ruta ${req.url}, a las ${actualTime} del ${actualDate}.`);
    next();
}
//# sourceMappingURL=logger.middleware.js.map