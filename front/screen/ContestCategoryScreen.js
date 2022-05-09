export const ContestCategoryScreen = () => {
    const getCategoryName = () => {
        if (category?.open) {
            return 'Open'
        }
        else if (category?.disability) {
            return 'Handicap'
        }
        else if (category?.onlyWomen) {
            return 'Femmes'
        }
        else if (category?.onlyMen) {
            return 'Hommes'
        }
        else if (category?.minAge) {
            return '+ de ' + category?.minAge + ' ans'
        }
        else if (category?.maxAge) {
            return '- de ' + category?.maxAge + ' ans'
        }
        else if (category?.maxPoints) {
            return '- de ' + category?.maxPoints
        }
        else if (category?.minPoints) {
            return '+ de ' + category?.minPoints
        }
        return 'hello'
    }
}