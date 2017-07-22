import * as joi from 'joi';

export function getValidationError(error: joi.ValidationError) {
    return {error: "Validation error: " + error.message};
}