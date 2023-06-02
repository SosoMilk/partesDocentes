import { BaseErrorHandler } from "../errorHandler";

export class YaHayLicenciaFechaHandler extends BaseErrorHandler {
    canHandle(message: string): boolean {
        return message.includes("debido a que ya posee una licencia en el mismo período");
    }
}

export class TopeSeisHandler extends BaseErrorHandler {
    canHandle(message: string): boolean {
        return message.includes("debido a que supera el tope de 6 dias de licencias por año");
    }
}

export class TopeTreintaHandler extends BaseErrorHandler {
    canHandle(message: string): boolean {
        return message.includes("debido a que supera el tope de 30 días de licencia");
    }
}

export class NoCargoHandler extends BaseErrorHandler {
    canHandle(message: string): boolean {
        return message.includes("el agente no posee ningún cargo en la institución");
    }
}

export class TopeDosHandler extends BaseErrorHandler {
    canHandle(message: string): boolean {
        return message.includes("debido a que supera el tope de 2 dias de licencias por mes");
    }
}