const getLocalUser = () => {
  try {
    const rawUser = window.localStorage.getItem('user')
    return rawUser ? JSON.parse(rawUser) : null
  } catch (error) {
    console.error(error)
    return null
  }
}

const saveLocalUser = (user) => {
  window.localStorage.setItem('user', JSON.stringify(user))
}

const removeLocalUser = () => {
  window.localStorage.removeItem('user')
}

export { getLocalUser, saveLocalUser, removeLocalUser }
