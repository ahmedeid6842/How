export abstract class DomainError extends Error {
    public readonly errorCode: string;

    constructor(
        prefix: string,
        errorNumber: number,
        message: string,
    ) {
        super(message);
        this.name = this.constructor.name;
        this.errorCode = `${prefix}-${String(errorNumber).padStart(3, '0')}`;
    }
}

export class BadRequestError extends DomainError {}

export class NotFoundError extends DomainError {}

export class ForbiddenError extends DomainError {}

export class UnauthorizedError extends DomainError {}
