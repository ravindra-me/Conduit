import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import "../App.scss";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import SingleArticle from "./SingleArticle";
import ErrorBoundary from "./ErrorBoundary";

import { localStorageUser, userUrl } from "../utils/constant";
import NewPost from "./NewPost";
import FullPageSpinner from "./FullPageSpinner";
import Nomatch from "./Nomatch";
import Setting from "./Setting";

import Profile from "./Profile";
import ArticleEdit from "./ArticleEdit";
import { LoginProvider, Context } from "./LoginContext";

class App extends React.Component {
  state = {
    isLogedInUser: false,
    user: null,
    isVerifying: true,
    article: null,
    params: {
      username: "",
    },
    profile: null,
  };

  componentDidMount() {
    let storageKey = localStorage[localStorageUser];
    if (storageKey) {
      fetch(userUrl, {
        method: "GET",
        headers: {
          authorization: `Token ${storageKey}`,
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        })
        .then(({ user }) => {
          this.isLogedInUserFn(user);
        })
        .catch((errors) => {
          console.log(errors);
        });
    } else {
      this.setState({
        isVerifying: false,
      });
    }
  }

  isLogedInUserFn = (user) => {
    this.setState({
      isLogedInUser: true,
      user,
      isVerifying: false,
      profile: user,
    });
    localStorage.setItem(localStorageUser, user.token);
  };

  logout = () => {
    this.setState({
      isLogedInUser: false,
      user: null,
      isVerifying: false,
    });
    localStorage.clear();
    let { history } = this.props;
  };

  editArticleFn = (article) => {
    console.log(article);
    this.setState({
      article,
    });
  };

  render() {
    const { isLogedInUser, user, isVerifying, article } = this.state;

    if (isVerifying) {
      return <FullPageSpinner />;
    }
    return (
      <>
        <ErrorBoundary>
          <LoginProvider
            value={{
              isLogedInUser: isLogedInUser,
              user: user,
              logout: this.logout,
              article: article,
              editArticleFn: this.editArticleFn,
            }}
          >
            <Header />
          </LoginProvider>
        </ErrorBoundary>
        <Switch>
          <Route path="/" exact>
            <ErrorBoundary>
              <LoginProvider
                value={{
                  isLogedInUser: isLogedInUser,
                  user: user,
                  logout: this.logout,
                  article: article,
                  editArticleFn: this.editArticleFn,
                }}
              >
                <Home />
              </LoginProvider>
            </ErrorBoundary>
          </Route>
          {isLogedInUser ? (
            <LoginProvider
              value={{
                isLogedInUser: isLogedInUser,
                user: user,
                logout: this.logout,
                article: article,
                editArticleFn: this.editArticleFn,
              }}
            >
              <AuthanticatePage />
            </LoginProvider>
          ) : (
            <UnAuthanticatePage
              isLogedInUserFn={this.isLogedInUserFn}
              isLogedInUser={isLogedInUser}
            />
          )}
        </Switch>
      </>
    );
  }
}

function AuthanticatePage() {
  let { isLogedInUser, user, logout, editArticleFn, article } =
    useContext(Context);
  return (
    <>
      <Switch>
        <Route path="/new-post">
          <ErrorBoundary>
            <NewPost />
          </ErrorBoundary>
        </Route>
        <Route path="/article/:slug">
          <ErrorBoundary>
            <SingleArticle editArticleFn={editArticleFn} />
          </ErrorBoundary>
        </Route>
        <Route path="/setting">
          <ErrorBoundary>
            <Setting />
          </ErrorBoundary>
        </Route>
        <Route path="/profile/:username">
          <ErrorBoundary>
            <Profile user={user} />
          </ErrorBoundary>
        </Route>
        <Route path="/editor/:slug">
          <ErrorBoundary>
            <ArticleEdit article={article} user={user} />
          </ErrorBoundary>
        </Route>
        <Route path="*">
          <Nomatch />
        </Route>
      </Switch>
    </>
  );
}

function UnAuthanticatePage(props) {
  let { isLogedInUserFn, isLogedInUser } = props;
  return (
    <>
      <Switch>
        <Route path="/login">
          <ErrorBoundary>
            <Login />
          </ErrorBoundary>
        </Route>
        <Route path="/signup">
          <ErrorBoundary>
            <SignUp isLogedInUserFn={isLogedInUserFn} />
          </ErrorBoundary>
        </Route>
        <Route path="/article/:slug">
          <ErrorBoundary>
            <SingleArticle
              isLogedInUserFn={isLogedInUserFn}
              isLogedInUser={isLogedInUser}
            />
          </ErrorBoundary>
        </Route>
        <Route path="/profile/:username">
          <ErrorBoundary>
            <Profile />
          </ErrorBoundary>
        </Route>
        <Route path="*">
          <Nomatch />
        </Route>
      </Switch>
    </>
  );
}

export default App;
