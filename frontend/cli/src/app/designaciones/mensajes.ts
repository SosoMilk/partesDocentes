import { BaseErrorHandler } from "../errorHandler";

export class errorFechaHandler extends BaseErrorHandler{
    override canHandle(message: string): boolean {
        return message.includes("Existe un error en la selección de fechas");
    }
}

export class fechaOcupadaHandler extends BaseErrorHandler{
    override canHandle(message: string): boolean {
        return message.includes("lo ocupa");
    }
}

export class reemplazoHandler extends BaseErrorHandler{
    override canHandle(message: string): boolean{
        return message.includes("exitosamente, en reemplado de");
    }
}