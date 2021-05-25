import React from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";

import { tagsURL } from "../utils/constant";
export default class Sidebar extends React.Component {
  state = {
    tags: null,
    error: null,
  };

  componentDidMount() {
    fetch(tagsURL)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then((data) => {
        this.setState({
          tags: data.tags,
          error: "",
        });
      })
      .catch((error) => {
        this.setState({
          error: "Not able to fetch tags!",
        });
      });
  }

  render() {
    if (!this.state.tags) {
      return "";
    }

    return (
      <aside className="flex-30  self-start bg-gray-200 rounded p-4 ">
        <h3 className="mb-4 ml-2 font-bold">Popular tags</h3>
        <div className="flex flex-wrap">
          {this.state.tags.map((tag) =>
            tag === "" ? (
              ""
            ) : (
              <Link
                key={tag}
                className="border border border-gray-400 m-2 rounded px-2 py-2 "
                onClick={() => this.props.addTab(tag)}
              >
                {tag}
              </Link>
            )
          )}
        </div>
      </aside>
    );
  }
}
