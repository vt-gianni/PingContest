import {API_ADDRESS} from 'react-native-dotenv'


export const getDateFormat = (date) => {
    return date.toISOString().split('T')[0]
}

export const getContests = (token, page, type) => {
    return fetch(API_ADDRESS + '/contests/' + type + '?page=' + page)
}

export const getUserParticipations = (token, page) => {
    return fetch(API_ADDRESS + '/contests/participations?page=' + page, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
}

export const updateUserPicture = (token, picture) => {
    return fetch(API_ADDRESS + '/users/update-picture', {
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
    return fetch(API_ADDRESS + '/contests', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            startDate: data.startDate ? getDateFormat(data.startDate) : null,
            address: data.address,
            city: data.city,
            hallName: data.hallName,
            endDate: data.endDate ? getDateFormat(data.endDate) : null,
            endRegistrationDate: data.endRegistrationDate ? getDateFormat(data.endRegistrationDate) : null
        })
    })
}

export const createContestCategories = (token, contestId, data) => {
    return fetch(API_ADDRESS + '/contest_categories', {
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

export const updateUserParameters = (token, id, licenseNumber, officialPoints) => {
    return fetch(API_ADDRESS + '/users/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            licenseNumber: licenseNumber,
            officialPoints: parseFloat(officialPoints)
        })
    })
}

export const participate = (token, contestCategoryId) => {
    return fetch(API_ADDRESS + '/participations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            contestCategoryId: contestCategoryId.toString(),
        })
    })
}

export const getUserCategoryParticipation = (token, contestCategoryId) => {
    return fetch(API_ADDRESS + '/participations/category/' + contestCategoryId, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
}