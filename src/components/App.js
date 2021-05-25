import React from "react";
import { Route, Switch } from "react-router-dom";
import "../App.scss";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import SingleArticle from "./SingleArticle";

import { localStorageUser, userUrl } from "../utils/constant";
import NewPost from "./NewPost";
import FullPageSpinner from "./FullPageSpinner";
import Nomatch from "./Nomatch";
import Setting from "./Setting";

import Profile from "./Profile";
import ArticleEdit from "./ArticleEdit";

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
        <Header user={user} isLogedInUser={isLogedInUser} />
        <Switch>
          <Route path="/" exact>
            <Home user={user} isLogedInUser={isLogedInUser} />
          </Route>
          {isLogedInUser ? (
            <AuthanticatePage
              isLogedInUser={isLogedInUser}
              user={user}
              logout={this.logout}
              article={article}
              editArticleFn={this.editArticleFn}
            />
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

function AuthanticatePage(props) {
  let { isLogedInUser, user, logout, editArticleFn, article } = props;
  console.log(isLogedInUser);
  return (
    <>
      <Switch>
        <Route path="/new-post">
          <NewPost user={user} />
        </Route>
        <Route path="/article/:slug">
          <SingleArticle
            isLogedInUser={isLogedInUser}
            user={user}
            editArticleFn={editArticleFn}
          />
        </Route>
        <Route path="/setting">
          <Setting user={user} logout={logout} />
        </Route>
        <Route path="/profile/:username">
          <Profile user={user} />
        </Route>
        <Route path="/editor/:slug">
          <ArticleEdit article={article} user={user} />
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
          <Login isLogedInUserFn={isLogedInUserFn} />
        </Route>
        <Route path="/signup">
          <SignUp isLogedInUserFn={isLogedInUserFn} />
        </Route>
        <Route path="/article/:slug">
          <SingleArticle
            isLogedInUserFn={isLogedInUserFn}
            isLogedInUser={isLogedInUser}
          />
        </Route>
        <Route path="/profile/:username">
          <Profile />
        </Route>
        <Route path="*">
          <Nomatch />
        </Route>
      </Switch>
    </>
  );
}

export default App;
