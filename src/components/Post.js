import React from "react";
import { Link } from "react-router-dom";
function Post(props) {
  let { author, createdAt, title, description, tagList, slug, favoritesCount } =
    props.article;
  let { favoriteArticle, unFavoriteArticle } = props;

  return (
    <article className="mt-8 border-b-2 pb-4">
      <header className="flex justify-between items-center">
        <div className="flex">
          <div>
            <Link to={`/profile/${author.username}`}>
              <img
                src={
                  author.image ||
                  "https://static.productionready.io/images/smiley-cyrus.jpg"
                }
                alt="avatar"
                className="w-12 h-12 rounded-full"
              />
            </Link>
          </div>
          <div className="ml-4">
            <Link to={`/profile/${author.username}`}>{author.username}</Link>
            <p>{createdAt}</p>
          </div>
        </div>
        <div>
          <button
            className="border border-green-500 rounded p-1 outline-none"
            onClick={
              favoritesCount === 0
                ? () => favoriteArticle(slug)
                : () => unFavoriteArticle(slug)
            }
          >
            <i className="far fa-heart ">
              {" "}
              <span className="ml-1">{favoritesCount}</span>{" "}
            </i>
          </button>
        </div>
      </header>
      <div className="my-4">
        <Link to={`/article/${slug}`}>
          <h1>{title}</h1>
          <p>{description.slice(0, 50)}...</p>
        </Link>
      </div>
      <div className="flex justify-between items-center mt-4 text-gray-400">
        <Link to={`/article/${slug}`}>Read more...</Link>
        <ul className="flex">
          {tagList.map((e, i) =>
            e === "" ? (
              ""
            ) : (
              <li key={i} className="mr-4 border rounded px-2">
                <Link to={`/article/${slug}`}>{e}</Link>
              </li>
            )
          )}
        </ul>
      </div>
    </article>
  );
}

export default Post;
