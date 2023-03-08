export function user(
  state = { profile: null, error: null },
  { type, payload }
) {
  switch (type) {
    case "LOGIN":
      return payload;

    case "LOGOUT":
      return { profile: null, error: null };

    case "ERROR_AUTHENTIFICATION":
      return payload;

    case "UPDATE_USER_PROFILE":
      return {
        ...state,
        profile:{
            ...state.profile,
            ...payload.details
        }
      };

    default:
      return state;
  }
}



export function handleLogin(user) {
  return {
    type: "LOGIN",
    payload: { profile: user, error: null },
  };
}
export function handleLogout() {
  return {
    type: "LOGOUT",
  };
}
export function handleLErrors(err) {
    return {
        type: "ERROR_AUTHENTIFICATION",
        payload: { profile: null, error: err },
      };
}
export function updateUserProfile(details) {
    return {
        type: "UPDATE_USER_PROFILE",
        payload: { details },
      };
}
