export const SecurityService = class {
    constructor() {
        this._apiAddress = 'https://e4c0-2a01-cb0c-8d7-e000-1a8f-9e96-573-e561.ngrok.io/api'
        this._error = null

        this._firstname = ''
        this._lastname = ''
        this._mailAddress = ''
        this._password = ''
        this._birthdate = ''
    }

    get error() {
        return this._error
    }

    checkFirstname = () => {
        if (this._firstname.length >= 2) {
            return true
        }
        this._error = 'Le prénom doit comporter au moins 2 caractères.'
        return false
    }

    checkLastname = () => {
        if (this._lastname.length >= 2) {
            return true
        }
        this._error = 'Le nom doit comporter au moins 2 caractères.'
        return false
    }

    checkMailAddress = () => {
        const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (reg.test(this._mailAddress)) {
            return true
        }
        this._error = 'Le format de l\'adresse mail n\'est pas correct.'
        return false
    }

    checkPassword = () => {
        if (this._password.length >= 6) {
            return true
        }
        this._error = 'Le mot de passe doit comporter au moins 6 caractères.'
        return false
    }

    checkBirthdate = () => {
        if (this._birthdate !== null) {
            return true
        }
        this._error = 'Veuillz renseigner une date de naissance.'
        return false
    }

    canRegister = (data) => {
        this._firstname = data.firstname
        this._lastname = data.lastname
        this._mailAddress = data.mailAddress
        this._password = data.password
        this._birthdate = data.birthdate

        return (this.checkFirstname() && this.checkLastname() && this.checkMailAddress() && this.checkPassword() && this.checkBirthdate())
    }

    canLogin = (data) => {
        this._mailAddress = data.mailAddress
        this._password = data.password

        return (this.checkMailAddress() && this._password.length > 0)
    }

    register = () => {
        return fetch(this._apiAddress + '/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstname: this._firstname,
                lastname: this._lastname,
                mailAddress: this._mailAddress,
                birthdate: this._birthdate,
                password: this._password
            })
        })
    }

    login = () => {
        return fetch(this._apiAddress + '/login_check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this._mailAddress,
                password: this._password
            })
        })
    }

}