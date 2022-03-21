const apiAddress = 'https://2384-2001-861-3505-4e20-69a-2b4b-1ed0-7844.ngrok.io/api'

export const getContests = (token, page, type) => {
    return fetch(apiAddress + '/contests/' + type + '?page=' + page)
}