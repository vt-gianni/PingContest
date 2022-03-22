const apiAddress = 'https://6859-2001-861-3505-4e20-856b-7692-eab0-ae27.ngrok.io/api'

export const getContests = (token, page, type) => {
    return fetch(apiAddress + '/contests/' + type + '?page=' + page)
}