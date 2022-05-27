export const apiAvatar = 'https://ping-contest.herokuapp.com/img/avatar'
export const apiAddress = 'https://ping-contest.herokuapp.com/api'

export const getDateFormat = (date) => {
    return date.toISOString().split('T')[0]
}

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

export const createContest = (token, data) => {
    return fetch(apiAddress + '/contests', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            startDate: getDateFormat(data.startDate),
            address: data.address,
            city: data.city,
            hallName: data.hallName,
            endDate: getDateFormat(data.endDate),
            endRegistrationDate: getDateFormat(data.endRegistrationDate)
        })
    })
}

export const createContestCategories = (token, contestId, data) => {
    return fetch(apiAddress + '/contest_categories', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            contestId: contestId,
            elements: data
        })
    })
}