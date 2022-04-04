const apiAddress = 'https://0584-2001-861-3505-4e20-6bae-8f19-e6ea-31d1.ngrok.io/api'

export const getContests = (token, page, type) => {
    return fetch(apiAddress + '/contests/' + type + '?page=' + page)
}

export const getUserParticipations = (token, page) => {
    return fetch(apiAddress + '/contests/participations?page=' + page)
}