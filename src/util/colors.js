// returns a color object if indexes are equal
export const giveSupplierIconColor = (index, ownIndex) => {
    if (index === ownIndex) {
        return {
            color: 'green'
        };
    }
}