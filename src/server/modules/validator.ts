import * as joi from 'joi';
import { logger } from '../../lib/logger';

export type IValidator = <T>(obj: any) => IValidationResult<T>;
export interface IValidationResult<T> {
    valid: boolean; // Is object validated successfully
    error: joi.ValidationError | null; // Full validation error object, null if no errors
    details: string; // Human-readable error details, empty string if no errors
    obj: T; // Validated object (may differ from original one, e.g. default values added)
}

export function validateSchema<T>(obj: any, schema: object, log_error = true): IValidationResult<T> {
    const res = joi.validate(obj, schema);
    const error_details = (res.error === null) ? '' : formatValidationError(res.error);
    if (res.error && log_error) {
        logger.error(`ValidationError: ${error_details}`);
    }
    return {
        valid: (res.error === null),
        details: error_details,
        error: res.error,
        obj: res.value
    };
}

export function formatValidationError(error: joi.ValidationError): string {
    return error.details.map( (val) => `${val.path}: ${val.message}` ).join(', ');
}