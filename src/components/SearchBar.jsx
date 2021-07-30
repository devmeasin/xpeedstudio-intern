const SearchBar = (props) => {

    let keyPressHandler = (event) => {
        props.searchFun(event.target.value);
    }

    return (
        <div className="container mb-5 pb-3">
            <div className="row height d-flex justify-content-center align-items-center">
                <div className="form">
                    <input
                        value={props.searchValue}
                        onChange={keyPressHandler}
                        type="text"
                        className="form-control form-input"
                        placeholder="Search "/>
                </div>
            </div>
        </div>

    )

}

export default SearchBar;