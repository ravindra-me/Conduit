import React from "react";
import { withRouter } from "react-router-dom";
import { articlesURL } from "../utils/constant";

import Loader from "./Loader";
import SingleHero from "./SignleHero";
import SingleArtiCont from "./SingleArtiCont";
import { LoginConsumer } from "./LoginContext";
class SingleArticle extends React.Component {
  state = {
    article: null,
    error: null,
  };

  componentDidMount() {
    this.fetchData();
  }

  handleDelete = (slug) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        authorization: `Token ${this.props.user.token}`,
        "Content-Type": "application/json",
      },
    };
    fetch(articlesURL + `/${slug}`, requestOptions).then((data) =>
      this.props.history.push("/")
    );
  };

  fetchData = () => {
    const slug = this.props.match.params.slug;

    fetch(articlesURL + `/${slug}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then((data) =>
        this.setState({
          article: data.article,
          error: "",
        })
      )
      .catch((error) =>
        this.setState({
          error: error,
        })
      );
  };

  render() {
    let { article, error } = this.state;
    let { editArticleFn } = this.props;
    return (
      <LoginConsumer>
        {({ isLogedInUser, user }) => {
          if (!article) {
            return <Loader />;
          }
          return (
            <>
              <SingleHero
                article={article}
                error={error}
                editArticleFn={editArticleFn}
                handleDelete={this.handleDelete}
              />
              <SingleArtiCont article={article} />
            </>
          );
        }}
      </LoginConsumer>
    );
  }
}

export default withRouter(SingleArticle);
