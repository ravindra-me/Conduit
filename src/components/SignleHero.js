import React from "react";
import { Link, withRouter } from "react-router-dom";

function SingleHero(props) {
  const { author, createdAt, title, slug } = props.article;
  const { user, editArticleFn, article, handleDelete } = props;

  return (
    <>
      <section className="py-24 bg-black">
        <div class="container  text-white ">
          <h1 className=" text-2xl font-semibold mb-8 ">
            {title.toUpperCase()}
          </h1>
          <div className=" flex  items-center">
            <div>
              <Link href="/profile">
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
          {user && user.username === author.username && (
            <div className="mt-8">
              <Link
                to={`/editor/${slug}`}
                className="border ml-4 px-2 py-2 rounded inline-block"
                onClick={() => editArticleFn(article)}
              >
                Edit Article
              </Link>
              <button
                className="border ml-4 px-2 py-2 rounded inline-block"
                onClick={() => handleDelete(article.slug)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default withRouter(SingleHero);
