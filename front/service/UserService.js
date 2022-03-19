export const UserService = class {
    getCategory = (dateString) => {
        let birthYear = parseInt(dateString.split('-')[0])
        const currentYear = parseInt(new Date().getFullYear())
        const currentMonth = parseInt(new Date().getMonth()) + 1
        let addYear = (currentMonth >= 1 && currentMonth <= 9)
        birthYear = addYear ? birthYear + 1 : birthYear

        if (birthYear + 8 >= currentYear) {
            return 'Poussin'
        }
        else if (birthYear + 9 >= currentYear) {
            return 'Benjamin 1'
        }
        else if (birthYear + 10 >= currentYear) {
            return 'Benjamin 2'
        }
        else if (birthYear + 11 >= currentYear) {
            return 'Minime 1'
        }
        else if (birthYear + 12 >= currentYear) {
            return 'Minime 2'
        }
        else if (birthYear + 13 >= currentYear) {
            return 'Cadet 1'
        }
        else if (birthYear + 14 >= currentYear) {
            return 'Cadet 2'
        }
        else if (birthYear + 15 >= currentYear) {
            return 'Junior 1'
        }
        else if (birthYear + 16 >= currentYear) {
            return 'Junior 2'
        }
        else if (birthYear + 17 >= currentYear) {
            return 'Junior 3'
        }
        else if (birthYear + 39 >= currentYear) {
            return 'Senior'
        }
        else if (birthYear + 49 >= currentYear) {
            return 'Vétéran 1'
        }
        else if (birthYear + 59 >= currentYear) {
            return 'Vétéran 2'
        }
        else if (birthYear + 69 >= currentYear) {
            return 'Vétéran 3'
        }
        else if (birthYear + 79 >= currentYear) {
            return 'Vétéran 4'
        }
        else {
            return 'Vétéran 5'
        }
    }

    getAge = (dateString) => {
        const today = new Date()
        dateString = dateString.replace(/-/g, '/').split(' ')[0]
        const birthDate = new Date(dateString)
        const m = today.getMonth() - birthDate.getMonth()
        let age = today.getFullYear() - birthDate.getFullYear()

        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--
        }
        return age
    }
}