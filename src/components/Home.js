import React from "react";
import Hero from "./Hero";
import FeedNav from "./FeedNav";
import Posts from "./Posts";
import Sidebar from "./Sidebar";
import { articlesURL } from "../utils/constant";

import Pagination from "./Pagination";
class Home extends React.Component {
  state = {
    articles: null,
    error: null,
    articlesCount: 0,
    articlePerPage: 10,
    activePageIndex: 1,
    activeTab: "",
    activeTag: "",
    author: "",
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(preProps, preState) {
    if (
      preState.activePageIndex !== this.state.activePageIndex ||
      preState.activeTab !== this.state.activeTab ||
      preState.activeTag !== this.state.activeTag
    ) {
      this.fetchData();
    }
  }

  fetchData = () => {
    const limit = this.state.articlePerPage;
    const offset = (this.state.activePageIndex - 1) * limit;
    const tag = this.state.activeTab;
    const author = this.state.author;

    fetch(
      articlesURL +
        `/?offset=${offset}&limit=${limit}` +
        (tag && `&tag=${tag}`) +
        (author && `&author=${author}`)
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then((data) =>
        this.setState({
          articles: data.articles,
          error: "",
          articlesCount: data.articlesCount,
        })
      )
      .catch((error) =>
        this.setState({
          error: error,
        })
      );
  };

  changeIndex = (index) => {
    this.setState(
      {
        activePageIndex: index,
      },
      this.fetchData
    );
  };

  emptyTab = () => {
    this.setState({
      activeTab: "",
      activeTag: "",
      author: "",
    });
  };

  addTab = (value) => {
    this.setState({
      activeTab: value,
      activeTag: "",
    });
  };

  yourFeedFn = (author) => {
    this.setState({
      author,
      activeTag: "your feed",
    });
  };

  favoriteArticle = (slug) => {
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
        this.fetchData();
      });
  };

  unFavoriteArticle = (slug) => {
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
    let {
      articles,
      error,
      articlesCount,
      articlePerPage,
      activePageIndex,
      activeTag,
    } = this.state;
    const { isLogedInUser, user } = this.props;
    return (
      <>
        <main>
          <Hero />
          <section className="py-8">
            <div className="container flex justify-between ">
              <div className="flex-60">
                <FeedNav
                  activeTab={this.state.activeTab}
                  emptyTab={this.emptyTab}
                  isLogedInUser={isLogedInUser}
                  user={user}
                  yourFeedFn={this.yourFeedFn}
                  activeTag={activeTag}
                />

                <Posts
                  articles={articles}
                  error={error}
                  favoriteArticle={this.favoriteArticle}
                  unFavoriteArticle={this.unFavoriteArticle}
                />
                <Pagination
                  articlePerPage={articlePerPage}
                  articlesCount={articlesCount}
                  activePageIndex={activePageIndex}
                  changeIndex={this.changeIndex}
                />
              </div>
              <Sidebar addTab={this.addTab} />
            </div>
          </section>
        </main>
      </>
    );
  }
}

export default Home;
