import React from "react";
import { articlesURL } from "../utils/constant";
import Loader from "./Loader";
class Comment extends React.Component {
  state = {
    comments: null,
    comment: "",
    errors: {
      comment: "",
    },
  };

  componentWillMount() {
    this.fetchComment();
  }

  componentDidUpdate(preProps, preState) {
    if (preState.comments !== this.state.comments) {
      this.fetchComment();
    }
  }

  deleteComment = (slug, id) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${this.props.user.token}`,
      },
    };

    fetch(articlesURL + `/${slug}/comments/${id}`, requestOptions)
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        }
        return res.json();
      })
      .then((data) => this.fetchComment())
      .catch((errors) => console.log(errors));
  };

  fetchComment = () => {
    fetch(articlesURL + `/${this.props.article.slug}/comments`)
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        }
        return res.json();
      })
      .then(({ comments }) =>
        this.setState({
          comments,
        })
      )
      .catch((errors) => console.log(errors));
  };

  handleChange = (event) => {
    let { name, value } = event.target;

    let { errors, comment } = this.state;
    switch (name) {
      case "comment":
        errors.comment = comment ? "You must be include one word" : "";
        break;
      default:
        break;
    }
    this.setState({
      errors,
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { comment } = this.state;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${this.props.user.token}`,
      },
      body: JSON.stringify({
        comment: {
          body: comment,
        },
      }),
    };
    fetch(articlesURL + `/${this.props.article.slug}/comments`, requestOptions)
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        }
        return res.json();
      })
      .then(({ comment }) => this.fetchComment())
      .catch((errors) => console.log(errors));
  };

  render() {
    const { user, article } = this.props;

    if (!this.state.comments) {
      return <Loader />;
    }
    return (
      <section>
        <div class="container">
          <div className="p-8 bg-gray-200  w-2/4 mx-auto mt-8 rounded-lg">
            <form action="" className=" block" onSubmit={this.handleSubmit}>
              <textarea
                id=""
                cols="30"
                rows="5"
                className="block w-full rounded-lg border border-gray-500 p-4"
                placeholder="Write a comment..."
                onChange={this.handleChange}
                name="comment"
                value={this.state.comment}
              ></textarea>
              <div className="text-right mt-4 flex justify-between items-center ">
                <div className="flex items-center">
                  <div>
                    <img
                      src={`${user.image}`}
                      alt=""
                      className="w-16 h-16 rounded-full"
                    />
                  </div>
                  <h4 className="ml-4 font-bold">{user.username}</h4>
                </div>
                <button
                  type="submit"
                  className="bg-green-500 px-4 py-2 rounded text-white font-bold"
                >
                  Post Comment
                </button>
              </div>
            </form>
          </div>
          <div className="p-4  w-2/4 mx-auto mt-8 rounded-lg">
            {this.state.comments.map((e) => {
              return (
                <>
                  <div className="flex bg-gray-200 justify-between items-center items-center mt-4 py-2 px-4 rounded-lg">
                    <div className="flex items-center">
                      <img
                        src={`${e.author.image}`}
                        alt=""
                        className="w-8 h-8 rounded-full"
                      />
                      <p className="ml-4">{e.body}</p>
                    </div>
                    <p onClick={() => this.deleteComment(article.slug, e.id)}>
                      delete
                    </p>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </section>
    );
  }
}

export default Comment;
