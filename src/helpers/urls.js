const API_ROOT = "http://codeial.com:8000/api/v2";

export const APIUrls = {
  login: () => `${API_ROOT}/users/login`,
  signup: () => `${API_ROOT}/users/signup`,
  edit: () => `${API_ROOT}/users/edit`,
  fetchPosts: (page = 1, limit = 10) =>
    `${API_ROOT}/posts?page=${page}&limit=${limit}`,
  userProfile: (userid) => `${API_ROOT}/users/${userid}`,
  userFriends: () => `${API_ROOT}/friendship/fetch_user_friends`,
};
