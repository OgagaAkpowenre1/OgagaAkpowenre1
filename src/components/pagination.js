export default function Pagination(props) {
  const pageLinks = [];

  for (let i = 1; i <= props.numberPages; i++) {
    let active = (props.currentPage === i ? "active" : "");

    pageLinks.push(
      <li
        className={`${active} waves-effect`}
        key={i}
        onClick={() => props.nextPage(i)}
      >
        <a href="#">{i}</a>
      </li>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <ul className="pagination">
          {props.currentPage > 1 ? (
            <li
              className={`waves-effect`}
              onClick={() => props.nextPage(props.currentPage - 1)}
            >
              <a href="#">Prev</a>
            </li>
          ) : (
            ``
          )}
          {pageLinks}
          {props.currentPage < props.numberPages ? (
            <li
              className={`waves-effect`}
              onClick={() => props.nextPage(props.currentPage + 1)}
            >
              <a href="#">Next</a>
            </li>
          ) : (
            ``
          )}
        </ul>
      </div>
    </div>
  );
}
