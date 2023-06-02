export interface ErrorHandler {
    displayError: boolean;
    handleError(message: string): boolean;
}

export abstract class BaseErrorHandler implements ErrorHandler {
    displayError: boolean = false;

    handleError(message: string): boolean {
        if (this.canHandle(message)) {
            this.displayError = true;
            return true;
        }
        return false;
    }

    abstract canHandle(message: string): boolean;
}
