import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signupURL } from "../utils/constant";

class SignUp extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    errors: {
      email: "",
      password: "",
      username: "",
    },
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    const errors = { ...this.state.errors };
    console.log(errors);
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

  handleSubmit = async (event) => {
    event.preventDefault();
    const { username, email, password, errors } = this.state;
    console.log({ username, email, password });
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: { username, email, password } }),
    };
    try {
      const response = await fetch(signupURL, requestOptions);
      if (!response.ok) {
        const jsonData = await response
          .json()
          .then(({ errors }) => {
            return Promise.reject(errors);
          })
          .catch((errors) =>
            this.setState({
              errors,
            })
          );
        throw new Error("data do not  fetch");
      }
      let user = await response.json();
      let { history } = this.props;
      this.props.isLogedInUserFn(user["user"]);
      history.push("/");
    } catch (error) {
      console.log({ error });
    }
  };

  render() {
    const { email, password, username, errors } = this.state;
    return (
      <section className="py-16">
        <div className="container flex justify-center items-center ">
          <form
            action=""
            className="p-8 shadow-lg border rounded-xl width-40"
            onSubmit={this.handleSubmit}
          >
            <legend className="text-4xl text-center mb-4">Sign Up</legend>
            <Link to="/login">
              <p className="text-center text-green-500">Have a account?</p>
            </Link>
            <div className="mt-16">
              <div className="mb-4">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="block border-2 py-2 px-4 rounded  w-full"
                  value={username}
                  onChange={this.handleChange}
                  required
                />
                <span className="mb-4 text-red-500">{errors.username}</span>
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="block border-2 py-2 px-4 rounded  w-full"
                  value={email}
                  onChange={this.handleChange}
                  required
                />
                <span className="mb-4 text-red-500">{errors.email}</span>
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="block border-2 py-2 px-4 rounded w-full "
                  value={password}
                  onChange={this.handleChange}
                  required
                />
                <span className="text-red-500">{errors.password}</span>
              </div>
              <div className="text-right">
                {errors.email || errors.password ? (
                  ""
                ) : (
                  <input
                    type="submit"
                    value="Sign Up"
                    className="bg-green-500 px-4 py-2 rounded"
                  />
                )}
              </div>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

export default SignUp;
