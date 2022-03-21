export const translate = (text) => {
    let array = text.split(' ')
    let plural = false
    for (let i = 0; i < array.length; i++) {
        array[i] = getFrenchTranslation(array[i], plural)
        if (array[i].match(/^-?\d+$/)) {
            if (parseInt(array[i]) > 1) {
                plural = true
            }
        }
    }
    return array.join(' ')
}

const getFrenchTranslation = (text, plural) => {
    if (text === 'in') return 'Dans'
    if (text === 'over') return 'plus de'
    if (text === 'about') return 'environ'
    if (text === 'almost') return 'moins de'

    if (text === 'seconds' || text === 'second') {
        if (plural) return 'secondes'
        else return 'seconde'
    }

    if (text === 'minutes' || text === 'minute') {
        if (plural) return 'minutes'
        else return 'minute'
    }

    if (text === 'hours' || text === 'hour') {
        if (plural) return 'heures'
        else return 'heure'
    }

    if (text === 'days' || text === 'day') {
        if (plural) return 'jours'
        else return 'jour'
    }

    if (text === 'months' || text === 'month') {
        return 'mois'
    }

    if (text === 'years' || text === 'year') {
        if (plural) return 'ans'
        else return 'an'
    }

    return text
}
