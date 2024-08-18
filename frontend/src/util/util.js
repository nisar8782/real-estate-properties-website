

export function saveAuthToken(access_token, refresh_token) {
    if (access_token) {
        localStorage.setItem('access_token', access_token)
    }
    if (refresh_token) {
        localStorage.setItem('refresh_token', refresh_token)
    }
}

export function getAuthToken() {
    const accessToken = localStorage.getItem('access_token')
    const refreshToken = localStorage.getItem('refresh_token')
    return {
        accessToken: accessToken,
        refreshToken: refreshToken
    }
}