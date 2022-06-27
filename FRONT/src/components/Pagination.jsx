import ReactPaginate from "react-paginate"

const Pagination = () => {
  const handlePageClick = () => {}

  return (
    <div className=" mt-8 p-2">
      <h1>in progress ⚙️</h1>
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={10}
        marginPagesDisplayed={1}
        onPageChange={handlePageClick}
        className="flex justify-between uppercase text-zinc-100 border rounded p-4 text-xl font-bold"
      />
    </div>
  )
}

export default Pagination
