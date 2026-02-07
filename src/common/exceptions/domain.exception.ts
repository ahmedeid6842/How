export abstract class DomainError extends Error {
    public readonly errorCode: string;
    public readonly messageKey: string;

    constructor(
        prefix: string,
        errorNumber: number,
        messageKey: string,
    ) {
        super(messageKey);
        this.name = this.constructor.name;
        this.errorCode = `${prefix}-${String(errorNumber).padStart(3, '0')}`;
        this.messageKey = messageKey;
    }
}

export class BadRequestError extends DomainError {}

export class NotFoundError extends DomainError {}

export class ForbiddenError extends DomainError {}

export class UnauthorizedError extends DomainError {}
