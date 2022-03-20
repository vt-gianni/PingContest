const apiAddress = 'https://e4c0-2a01-cb0c-8d7-e000-1a8f-9e96-573-e561.ngrok.io/api'

export const getContests = (token, page) => {
    return fetch(apiAddress + '/contests?page=' + page)
}