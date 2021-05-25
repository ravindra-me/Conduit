import React from "react";
import { withRouter } from "react-router-dom";
import { userUrl, localStorageUser } from "../utils/constant";
class Setting extends React.Component {
  state = {
    username: this.props.user.username,
    email: this.props.user.email,
    bio: this.props.user.bio || "",
    password: this.props.user.password || "",
    image: this.props.user.image || "",
    errors: {
      email: "",
      password: "",
      username: "",
    },
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    const errors = { ...this.state.errors };
    switch (name) {
      case "email":
        errors.email =
          value.indexOf("@") === -1 ? "Email does not contain @" : "";
        break;
      case "password":
        let passwordError;
        let vr = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/;
        if (value.length < 6) {
          passwordError = "password must b included 6 charecters";
        }
        if (!vr.test(value)) {
          passwordError =
            "password must be include 8 at least one letter, one number and one special character";
        }
        errors.password = passwordError;
        break;
      case "username":
        errors.username =
          value.length < 4 ? "username must be includes 5 characters" : "";
        break;
      default:
        break;
    }
    this.setState({
      [name]: value,
      errors,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, email, bio, image, password } = this.state;
    let storageKey = localStorage[localStorageUser];
    fetch(userUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${storageKey}`,
      },
      body: JSON.stringify({ user: { username, email, bio, image, password } }),
    })
      .then((res) => res.json())
      .then(({ user }) => console.log(user));
  };

  render() {
    const { username, email, bio, image, password } = this.state;
    return (
      <>
        <section className="py-16">
          <div className="container relative">
            <h1 className="text-center mb-8 text-4xl font-bold">
              Your Settings
            </h1>
            <form
              action=""
              className="width-50 p-8 shadow-xl border rounded-xl"
              onSubmit={this.handleSubmit}
            >
              <input
                type="text"
                name="image"
                placeholder="URL of profile picture"
                className="block w-full border py-2 mt-4 rounded px-4"
                value={image}
                onChange={this.handleChange}
              />
              <input
                type="username"
                placeholder="username"
                className="block w-full border py-2 mt-4 rounded px-4"
                value={username}
                name="username"
                onChange={this.handleChange}
              />
              <textarea
                name="bio"
                id=""
                cols="30"
                rows="10"
                placeholder="Short bio about you"
                className="block w-full border py-2 mt-4 rounded px-4"
                value={bio}
                onChange={this.handleChange}
              ></textarea>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="block w-full border py-2 mt-4 rounded px-4"
                value={email}
                onChange={this.handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="password"
                className="block w-full border py-2 mt-4 rounded px-4"
                value={password}
                onChange={this.handleChange}
              />
              <fieldset className="text-right mt-4">
                <input
                  type="submit"
                  value="Update Setting"
                  className="px-4 py-3 bg-green-500 text-white font-bold rounded"
                />
              </fieldset>
            </form>
            <div className="line h-0.5 bg-gray-500 my-8"></div>
            <button
              className="absolute top-0 right-0 bg-blue-200 px-4 py-2 rounded text-green-800 font-bold shadow-lg"
              onClick={() => {
                this.props.logout();
                this.props.history.push("/");
              }}
            >
              Log Out
            </button>
          </div>
        </section>
      </>
    );
  }
}

export default withRouter(Setting);
