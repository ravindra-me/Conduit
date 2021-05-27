import React, { useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import { Context } from "./LoginContext";

function ProfileBanner(props) {
  const { user } = useContext(Context);
  const { bio, image, username, following } = props.profile;
  return (
    <section className="py-16 text-center bg-gray-900">
      <div className="container">
        <div className="font-0 text-center">
          <img src={image} alt="" className="w-32 h-32 mx-auto rounded" />
        </div>
        <h3 className="text-white text-2xl mt-4">{username}</h3>
        <h4 className="text-white text-xl mt-4">{bio}</h4>
        <div className="text-right">
          {username === user.username ? (
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
              onClick={() => props.handleFollow(username, user)}
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

export default withRouter(ProfileBanner);
