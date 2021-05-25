import React from "react";
import { Link, withRouter } from "react-router-dom";
import { userProfile } from "../utils/constant";
class ProfileBanner extends React.Component {
  render() {
    const { bio, image, username, email, following } = this.props.profile;
    return (
      <section className="py-16 text-center bg-gray-900">
        <div className="container">
          <div className="font-0 text-center">
            <img src={image} alt="" className="w-32 h-32 mx-auto rounded" />
          </div>
          <h3 className="text-white text-2xl mt-4">{username}</h3>
          <h4 className="text-white text-xl mt-4">{bio}</h4>
          <div className="text-right">
            {username === this.props.user.username ? (
              <Link
                to="/setting"
                className="text-gray-300 border py-2 px-4 rounded-xl"
              >
                Edit Profile Setting
              </Link>
            ) : (
              <button
                to="/"
                className="text-gray-300 border py-2 px-4 rounded-xl"
                onClick={() =>
                  this.props.handleFollow(username, this.props.user)
                }
              >
                {following === false
                  ? `+ Follow ${username}`
                  : `UnFollow ${username}`}
              </button>
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(ProfileBanner);
