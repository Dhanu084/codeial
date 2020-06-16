const API_ROOT = "http://codeial.com:8000/api/v2";

export const APIUrls = {
  login: () => `${API_ROOT}/users/login`,
  signup: () => `${API_ROOT}/users/signup`,
  edit: () => `${API_ROOT}/users/edit`,
  createPost: () => `${API_ROOT}/posts/create`,
  fetchPosts: (page = 1, limit = 10) =>
    `${API_ROOT}/posts?page=${page}&limit=${limit}`,
  userProfile: (userid) => `${API_ROOT}/users/${userid}`,
  userFriends: () => `${API_ROOT}/friendship/fetch_user_friends`,
  addFriend: (userId) =>
    `${API_ROOT}/friendship/create_friendship?user_id=${userId}`,
  removeFriend: (userId) =>
    `${API_ROOT}/friendship/remove_friendship?user_id=${userId}`,
  createComment: () => `${API_ROOT}/comments`,
};
