const AUTHENTICATION_PREFIX                                               = "/authenticate";


const AUTHENTICATION_ENDPOINTS = {
    SIGN_IN                                                               : `${AUTHENTICATION_PREFIX}/sign-in`,
    SIGN_UP                                                               : `${AUTHENTICATION_PREFIX}/sign-out`,
}

export const ENDPOINTS = {
    AUTHENTICATION                                                        : AUTHENTICATION_ENDPOINTS
}