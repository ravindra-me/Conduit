export default function Pagination(props) {
  const { articlesCount, articlePerPage, activePageIndex, changeIndex } = props;
  const numberOfPage = Math.ceil(articlesCount / articlePerPage);
  const pagesArray = [];
  for (let i = 1; i <= numberOfPage; i++) {
    pagesArray.push(i);
  }
  if (!articlesCount) {
    return "";
  }
  return (
    <div className="my-8">
      <div className="flex justify-center items-center">
        {pagesArray.map((e, i) => (
          <span
            key={i}
            onClick={() => changeIndex(e)}
            className={`${
              e === activePageIndex
                ? "pagi-active inline-block border border-green-900 p-2"
                : "inline-block border border-green-900 p-2"
            }`}
          >
            {e}
          </span>
        ))}
      </div>
    </div>
  );
}
