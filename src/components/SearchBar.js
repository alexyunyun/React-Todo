import React from "react";
function SearchBar(props) {
    // const [keyword,setKeyword] = useState('');
    function handleKeywordChange(e) {
        props.handleKeywordChange(e.target.value);
    }
    return(
        <>
            <input type="text" className="todo-search" onChange={handleKeywordChange} placeholder="请输入关键词进行搜索"/>
        </>
    )
}
export default SearchBar;