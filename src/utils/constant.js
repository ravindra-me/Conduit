const ROOT_URL = "https://mighty-oasis-08080.herokuapp.com/api/";
const articlesURL = ROOT_URL + "articles";
const tagsURL = ROOT_URL + "tags";
const articleURL = articlesURL + "/:slug";
const signupURL = ROOT_URL + "users";
const loginURL = ROOT_URL + "users/login";
const userUrl = ROOT_URL + "user";
const localStorageUser = "App_key";
const userProfile = ROOT_URL + "profiles";
export {
  ROOT_URL,
  articlesURL,
  tagsURL,
  articleURL,
  signupURL,
  loginURL,
  localStorageUser,
  userUrl,
  userProfile,
};
