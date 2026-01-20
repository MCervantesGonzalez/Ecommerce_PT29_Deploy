import { NextFunction, Request, Response } from 'express';

export function loggerGlobal(req: Request, res: Response, next: NextFunction) {
  const completeDate = new Date();
  const actualTime = completeDate.toLocaleTimeString('es-MX');
  const actualDate = completeDate.toLocaleDateString('es-MX');
  console.log(
    `Estás ejecutando un método ${req.method} en la ruta ${req.url}, a las ${actualTime} del ${actualDate}.`,
  );

  next();
}
