const getBeverageValidationErrorMessage = (field) => `${field} is not set.`;

const validateNewBeverage = (beverage) => {
    if (!beverage) {
        return 'Request body can not be empty.';
    }

    if (!beverage.type) {
        return getBeverageValidationErrorMessage('type');
    }

    if (!beverage.imgSrc) {
        return getBeverageValidationErrorMessage('imgSrc');
    }

    if (!beverage.name) {
        return getBeverageValidationErrorMessage('name');
    }

    if (!beverage.description) {
        return getBeverageValidationErrorMessage('description');
    }

    if (!beverage.category) {
        return getBeverageValidationErrorMessage('category');
    }

    if (!beverage.quantity) {
        return getBeverageValidationErrorMessage('quantity');
    }

    if (!beverage.price) {
        return getBeverageValidationErrorMessage('price');
    }

    if (!beverage.currency) {
        return getBeverageValidationErrorMessage('currency');
    }

    return '';
};

module.exports = {
    getBeverageValidationErrorMessage,
    validateNewBeverage,
};
