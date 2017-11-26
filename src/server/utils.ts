import * as joi from 'joi';

export function getValidationError(error: joi.ValidationError) {
    return {message: "Validation error: " + error.message};
}