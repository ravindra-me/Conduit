import React from "react";
import Loader from "./Loader";
import Post from "./Post";
function Posts(props) {
  let { favoriteArticle, unFavoriteArticle } = props;
  if (!props.articles) {
    return <Loader />;
  }
  if (props.articles.length < 1) {
    return <h1>No article here</h1>;
  }
  return props.articles.map((article, index) => (
    <Post
      key={index}
      article={article}
      favoriteArticle={favoriteArticle}
      unFavoriteArticle={unFavoriteArticle}
    />
  ));
}

export default Posts;
