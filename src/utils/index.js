const getValidationErrorMessage = (field) => `${field} is not set.`;

const validateNewBeverage = (beverage) => {
    if (!beverage) {
        return 'Request body can not be empty.';
    }

    if (!beverage.type) {
        return getValidationErrorMessage('type');
    }

    if (!beverage.imgSrc) {
        return getValidationErrorMessage('imgSrc');
    }

    if (!beverage.name) {
        return getValidationErrorMessage('name');
    }

    if (!beverage.description) {
        return getValidationErrorMessage('description');
    }

    if (!beverage.category) {
        return getValidationErrorMessage('category');
    }

    if (!beverage.quantityPerUnit) {
        return getValidationErrorMessage('quantity');
    }

    if (!beverage.price) {
        return getValidationErrorMessage('price');
    }

    if (!beverage.currency) {
        return getValidationErrorMessage('currency');
    }

    return '';
};

const validateNewUser = (user) => {
    if (!user) {
        return 'Request body can not be empty.';
    }

    if (!user.username) {
        return getValidationErrorMessage('username');
    }

    if (!user.email) {
        return getValidationErrorMessage('email');
    }

    if (!user.password) {
        return getValidationErrorMessage('password');
    }

    return '';
};

module.exports = {
    getValidationErrorMessage,
    validateNewBeverage,
    validateNewUser,
};
