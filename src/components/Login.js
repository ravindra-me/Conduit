import React from "react";
import { Link, withRouter } from "react-router-dom";
import { loginURL } from "../utils/constant";
class Login extends React.Component {
  state = {
    email: "",
    password: "",

    errors: {
      email: "",
      password: "",
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
    const { email, password, errors } = this.state;
    console.log({ email, password });
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: { email, password } }),
    };
    try {
      const response = await fetch(loginURL, requestOptions);
      if (!response.ok) {
        const jsonData = await response.json();
        this.setState((preState) => {
          return {
            ...preState,
            errors: {
              ...preState.errors,
              email: "Email and password is incorrect",
            },
          };
        });
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
    let { email, password, errors } = this.state;
    console.log(this.props);
    return (
      <section className="py-16">
        <div className="container flex justify-center items-center ">
          <form
            action=""
            className="p-8 shadow-lg border rounded-xl width-40"
            onSubmit={this.handleSubmit}
          >
            <legend className="text-4xl text-center mb-4">Login</legend>
            <Link to="/signup">
              <p className="text-center text-green-500">Need an account?</p>
            </Link>
            <div className="mt-16">
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  id=""
                  placeholder="Email"
                  className="block border-2 py-2 px-4 rounded  w-full"
                  value={email}
                  onChange={this.handleChange}
                />
                <span className="mb-4 text-red-500">{errors.email}</span>
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  name="password"
                  id=""
                  placeholder="Password"
                  className="block border-2 py-2 px-4 rounded w-full "
                  value={password}
                  onChange={this.handleChange}
                />
                <span className="text-red-500">{errors.password}</span>
              </div>
              <div className="text-right">
                {errors.email || errors.password ? (
                  ""
                ) : (
                  <input
                    type="submit"
                    value="Sign In"
                    className="bg-green-500 px-4 py-2 rounded text-white font-bold"
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

export default withRouter(Login);
