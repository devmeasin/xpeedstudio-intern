import axios from 'axios';
import React, { Component } from "react";
import Banner from './Banner.jsx';
import Loader from './loader.jsx';
import SearchBar from './SearchBar.jsx';
import Table from './Table.jsx';

class TableList extends Component {

    state = ({
        loader: true,
        header: [],
        rows: [],
        key: '',
        direction: '',
        searchValue: '',
        searchResult: []
    });

    baseUrl = 'http://localhost/api/';

    async componentDidMount() {

        try {
            const response = await axios.get(this.baseUrl + 'list.php');
            this.setState({
                loader: false,
                header: response
                    .data
                    .data
                    .headers[0],
                rows: response.data.data.rows
            })
            // console.log(this.state)

        } catch (err) {
            console.error(err.message);
        }

    }

    compare = () => {
        let {key, direction} = this.state;
        let sortedProducts = [...this.state.rows];
        sortedProducts.sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'asc'
                    ? -1
                    : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'asc'
                    ? 1
                    : -1;
            }
            return 0;
        });

        this.setState({rows: sortedProducts})
    }

    sortFun = (key) => {
        let direction = 'asc';
        if (this.state.key === key && this.state.direction === 'asc') {
            direction = 'desc';
        }
        this.setState({key, direction});
        this.compare()
    }

    searchHandler = (key) => {

        this.setState({searchValue: key});
        let {searchValue, rows} = this.state;

        if (searchValue !== "") {
            let searchResult = rows.filter((data) => {
                return Object
                    .values(data)
                    .join(" ")
                    .toLocaleLowerCase()
                    .includes(searchValue.toLocaleLowerCase());
            })
            this.setState({searchResult});
        } else {
            this.setState({rows});
        }
        // console.log(this.state)
    }

    rowsUpdateHandler = (rows) => {
        this.setState({rows});
    }



    render() {

        let {header, rows, loader, searchValue, searchResult} = this.state;

        return (
            <div>
                <Banner title="Table List..."/>
                <div className="container">
                    <div className="table_wrapper mt-5">
                        <div className="row">
                            <div className="col-md-8 offset-md-2">
                                <SearchBar
                                    header={header}
                                    searchValue={searchValue}
                                    searchFun={this.searchHandler}/> 
                                    {
                                    loader
                                        ? <Loader/>
                                        : <Table
                                                rowsUpdateHandler = {this.rowsUpdateHandler}
                                                sortFun={this.sortFun}
                                                header={header}
                                                rows={searchValue.length < 1
                                                    ? rows
                                                    : searchResult}/>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default TableList;