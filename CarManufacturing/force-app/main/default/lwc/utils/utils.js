import {profiles} from './permissions'

function getProfilePermission(profile){
    return profiles[profile]
}

export {
    getProfilePermission
}