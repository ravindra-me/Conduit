import React from "react";
import { withRouter } from "react-router-dom";
import ProfileBanner from "./ProfileBanner";
import { userProfile, articlesURL } from "../utils/constant";
import Posts from "./Posts";
import Loader from "./Loader";

class Profile extends React.Component {
  state = {
    activeTab: "author",
    articles: null,
    error: "",
    profile: null,
    params: this.props.match.params.username,
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(preProps, preState) {
    if (preState.params !== this.props.match.params.username) {
      this.fetchData();
    }
  }

  fetchProfile = () => {
    fetch(userProfile + `/${this.props.match.params.username}`)
      .then((data) => {
        if (!data.ok) {
          data.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        }
        return data.json();
      })
      .then(({ profile }) => {
        console.log({ profile });
        this.setState({ profile });
      })
      .catch((error) => console.log(error));
  };

  fetchData = () => {
    const { activeTab } = this.state;
    fetch(articlesURL + `/?${activeTab}=${this.props.match.params.username}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Can not fatch data for specific user`);
        }
        return res.json();
      })
      .then((data) => {
        console.log({ data });
        this.setState({
          articles: data.articles,
        });
      })
      .catch((error) =>
        this.setState({
          error: error,
        })
      );
    this.fetchProfile();
  };

  handleActivetab = (activeTab) => {
    this.setState(
      {
        activeTab: activeTab,
      },
      () => this.fetchData()
    );
  };

  handleFollow = (username, user) => {
    const requestOptions = {
      method: "POST",
      headers: {
        authorization: `Token ${this.props.user.token}`,
      },
    };
    fetch(userProfile + `/${username}/follow`, requestOptions)
      .then((data) => {
        if (!data.ok) {
          return data.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        }
        return data.json();
      })
      .then(({ profile }) => {
        console.log(profile);
        this.fetchProfile();
      })
      .catch((errors) => console.log(errors));
  };

  favoriteArticle = (slug) => {
    console.log(slug);
    fetch(articlesURL + `/${slug}/favorite`, {
      method: "POST",
      headers: {
        authorization: `Token ${this.props.user.token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        }
        return res.json();
      })
      .then(({ article }) => {
        console.log(article);
        this.fetchData();
      });
  };

  unFavoriteArticle = (slug) => {
    console.log(slug, "unfav");
    fetch(articlesURL + `/${slug}/favorite`, {
      method: "DELETE",
      headers: {
        authorization: `Token ${this.props.user.token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        }
        return res.json();
      })
      .then(({ article }) => {
        this.fetchData();
      });
  };

  render() {
    let { user } = this.props;

    if (!this.state.profile) {
      return <Loader />;
    }

    return (
      <>
        <ProfileBanner
          profile={this.state.profile}
          user={user ? user : ""}
          handleFollow={this.handleFollow}
          handleUnFollow={this.handleUnFollow}
        />
        <section className="py-8">
          <div className="container">
            <div className="border-b-2  pb-2">
              <ul className="flex">
                <li className="mr-4">
                  <button
                    className={`${
                      this.state.activeTab === "author" ? "active" : ""
                    }`}
                    onClick={() => this.handleActivetab("author")}
                  >
                    My Article
                  </button>
                </li>

                <li className="mr-4">
                  <button
                    className={`${
                      this.state.activeTab === "favorited" ? "active" : ""
                    }`}
                    onClick={() => this.handleActivetab("favorited")}
                  >
                    Favorited Article{" "}
                  </button>
                </li>
              </ul>
            </div>
            <Posts
              articles={this.state.articles}
              unFavoriteArticle={this.unFavoriteArticle}
              favoriteArticle={this.favoriteArticle}
            />
          </div>
        </section>
      </>
    );
  }
}

export default withRouter(Profile);
