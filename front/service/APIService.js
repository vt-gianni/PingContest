export const apiAvatar = 'https://3de7-77-130-108-136.ngrok.io/img/avatar'
export const apiAddress = 'https://3de7-77-130-108-136.ngrok.io/api'

export const getContests = (token, page, type) => {
    return fetch(apiAddress + '/contests/' + type + '?page=' + page)
}

export const getUserParticipations = (token, page) => {
    return fetch(apiAddress + '/contests/participations?page=' + page, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
}

export const updateUserPicture = (token, picture) => {
    return fetch(apiAddress + '/users/update-picture', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            picture: picture
        })
    })
}