import moment from "moment"

export const getCurrentDateandTime = () => {
    return moment().utc()
}

export const getCurrentDateandTimeinUnix = () => {
    return moment().utc().unix()
}

export const dateToUtc = (date) => {
    return  moment(date).utc() 
}

export const EndofDay = (date) => {
    return date ? moment(date).endOf('day').utc() : null
}

export const startOfDay = (date) => {
    return date ? moment(date).startOf('day').utc() : null
}