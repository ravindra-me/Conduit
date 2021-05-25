import React from "react";
import { articlesURL } from "../utils/constant";
import { withRouter } from "react-router-dom";
class NewPost extends React.Component {
  state = {
    title: "",
    description: "",
    tagList: "",
    body: "",
    errors: {
      title: "",
      description: "",
      body: "",
    },
  };

  handleChange = (event) => {
    let { name, value } = event.target;
    let { errors } = this.state;
    switch (name) {
      case "title":
        errors.title = value ? "" : "title should be includes one world";
        break;
      case "description":
        errors.description = value
          ? ""
          : "description should be includes one world";
        break;
      case "body":
        errors.title = value ? "" : "body should be includes one world";
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
    const { title, description, tagList, body } = this.state;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${this.props.user.token}`,
      },
      body: JSON.stringify({
        article: {
          title,
          description,
          body,
          tagList: tagList.split(",").map((e) => e.trim()),
        },
      }),
    };
    fetch(articlesURL, requestOptions)
      .then((res) => {
        if (!res.ok) {
          res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        }
        return res.json();
      })
      .then(({ article }) => {
        this.setState({ title: "", description: "", tagList: "", body: "" });
        this.props.history.push("/");
      })
      .catch((errors) => this.setState({ errors }));
  };

  render() {
    const { title, description, tagList, body } = this.state;
    return (
      <section className="py-16">
        <form
          action=""
          className="width-50 border-2 p-8 shadow-lg rounded-lg"
          onSubmit={this.handleSubmit}
        >
          <input
            type="text"
            placeholder="Article Title"
            name="title"
            className="w-full border border-gray-400 mt-4 rounded px-2 py-2"
            value={title}
            onChange={this.handleChange}
          />
          <input
            type="text"
            placeholder="What's this article about border-gray-400"
            className="w-full border border-gray-400 mt-4 rounded px-2 py-2"
            name="description"
            value={description}
            onChange={this.handleChange}
          />
          <textarea
            name="body"
            id=""
            cols="30"
            rows="10"
            placeholder="Write your article(in markdown)"
            className="w-full border border-gray-400 mt-4 rounded px-2 py-2 "
            value={body}
            onChange={this.handleChange}
          ></textarea>

          <input
            type="text"
            placeholder="Enter Tags"
            name="tagList"
            className="w-full border border-gray-400 mt-4 rounded px-2 py-2 "
            value={tagList}
            onChange={this.handleChange}
          />
          <fieldset className="text-right mt-4">
            <input
              type="submit"
              className="bg-green-500 px-8 py-3 rounded text-white font-semibold text-xl"
              value="Publish Article"
            />
          </fieldset>
        </form>
      </section>
    );
  }
}

export default withRouter(NewPost);
