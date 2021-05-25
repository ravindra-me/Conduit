import { NavLink } from "react-router-dom";

export default function FeedNav(props) {
  let { activeTab, emptyTab, isLogedInUser, user, yourFeedFn, activeTag } =
    props;
  return (
    <section>
      <div className="border-b-2  pb-2">
        <ul className="flex">
          {isLogedInUser && (
            <li className="mr-4" onClick={() => yourFeedFn(user.username)}>
              <NavLink
                to="/"
                activeClassName={`${
                  activeTag === "your feed" &&
                  "text-green-500 border-b-2 border-green-500 pb-3"
                }`}
              >
                Your feed
              </NavLink>
            </li>
          )}
          <li className="mr-4" onClick={() => emptyTab()}>
            <NavLink
              to="/"
              activeClassName={`${
                activeTab === "" && activeTag === ""
                  ? "text-green-500 border-b-2 border-green-500 pb-3"
                  : ""
              }`}
            >
              Global Feed
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              activeClassName={
                activeTab && "text-green-500 border-b-2 border-green-500 pb-3"
              }
            >
              {activeTab}
            </NavLink>
          </li>
        </ul>
      </div>
    </section>
  );
}
