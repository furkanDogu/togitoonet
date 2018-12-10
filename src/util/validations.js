export const verifyProductName = (productName) => {

    // checking for character length
    productName = productName.replace(/ +/g, "");
    if (productName.length < 5 || productName.length > 60) return 'error';

    // checking if there is non letter or non number characters
    let onlyCharatersAndNumbers = /[^A-Za-z0-9]+/g;
    if (onlyCharatersAndNumbers.test(productName)) return 'error';

    // checking if there is Turkish characters
    let TurkishCharRegex = /[ü,Ü,ğ,Ğ,İ,ı,Ş,ş,Ö,ö,Ç,ç]/g
    if (TurkishCharRegex.test(productName)) return 'error';
    return 'success';
}

export const isSelectValid = (value) => {
    // checking if selected value is empty
    if(value) return 'success';
    return 'error';
}

export const isAmountValid = (amount) => {
    // 1st check if there is input if not return error
    //2nd check if given amount is less than 0 if its then return error
    // 3rd check if given amount is greater than 100 if its then return error
    
    const amountNum = parseInt(amount);
    if(amount.includes('e')) return 'error';
    else if (amount.length < 1) return 'error';
    else if (amountNum < 1 || amountNum > 100) return 'error';
    return 'success';

}

export const isCostValid = (cost) => {
    const costFloat = parseFloat(cost);
    if (cost.includes('e')) return 'error';
    if (cost.length < 1) return 'error';
    if (costFloat < 1 || costFloat > 9999999999) return 'error';
    return 'success';
}

export const isNewPropNameValid = (name) => {
    name = name.replace(/ +/g, "");
    if (name.length > 40 || name.length < 5) return 'error';

    let onlyCharatersAndNumbers = /[^A-Za-z0-9]+/g;
    if (onlyCharatersAndNumbers.test(name)) return 'error';

    let TurkishCharRegex = /[ü,Ü,ğ,Ğ,İ,ı,Ş,ş,Ö,ö,Ç,ç]/g
    if (TurkishCharRegex.test(name)) return 'error';
    return 'success';

}

export const isTelNoValid = (telNo) => {
    if (telNo.charAt(0) !== '0' || telNo.length < 11 || telNo.length > 11) return 'error';
    return 'success';
}