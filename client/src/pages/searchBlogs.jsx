import SearchBar from "../components/SearchBar";

const SearchBlogs = () => {
  async function searchBlogs(searchValue) {
    //TODO call backend API to get blog posts based on the search value
  }

  return (
    <div>
      {/* SearchBar component */}
      <SearchBar placeholder="Search blogs..." onSearch={searchBlogs} />
    </div>
  );
};

export default SearchBlogs;
