import React, { Component } from "react";
import { Link } from "react-router-dom";



class Table extends Component {

    render() {

        let {header, rows, sortFun} = this.props;

        return (
            <div>
                <table className="table table-bordered">

                    {/* table head start. */}
                    <thead className="thead-dark">
                        <tr>
                            {
                                header.id.hidden === false
                                    ? <th col="row">
                                            {
                                                header.id.sortable
                                                    ? <button
                                                            className="btn btn-primary btn-table"
                                                            type="button"
                                                            onClick={() => sortFun('id')}>
                                                            {header.id.title}
                                                        </button>
                                                    : <div>
                                                            {header.id.title}
                                                        </div>

                                            }

                                        </th>
                                    : ''

                            }
                            {
                                header.name.hidden === false
                                    ? <th col="row">
                                            {
                                                header.name.sortable
                                                    ? <button
                                                            className="btn btn-primary btn-table"
                                                            type="button"
                                                            onClick={() => sortFun('name')}>
                                                            {header.name.title}
                                                        </button>
                                                    : <div>
                                                            {header.name.title}
                                                        </div>
                                            }
                                        </th>
                                    : ''
                            }

                            {
                                header.message.hidden === false
                                    ? <th col="row">{header.message.title}</th>
                                    : ''
                            }
                            {
                                header.created_at.hidden === false
                                    ? <th col="row">
                                            {
                                                header.created_at.sortable
                                                    ? <button
                                                            className="btn btn-primary btn-table"
                                                            type="button"
                                                            onClick={() => sortFun('created_at')}>
                                                            {header.created_at.title}
                                                        </button>
                                                    : <div>
                                                            {header.created_at.title}
                                                        </div>
                                            }
                                        </th>
                                    : ''
                            }
                        </tr>
                    </thead>
                    {/* table head start. */}
                    {/* table Body start. */}

                    <tbody>

                        {
                            rows.map((data, ind) => (

                                <tr key={Math.random()}>

                                    {
                                        header.id.hidden === false
                                            ? <td className = 'text-center'>
                                                    <Link className="btn-link" to={`updateform/${data.id}`}>
                                                        {data.id || ' '}
                                                    </Link>
                                                </td>

                                            : null
                                    }

                                    {
                                        header.name.hidden === false
                                            ? <td>{data.name || ' '}</td>
                                            : ''
                                    }

                                    {
                                        header.message.hidden === false
                                            ? <td>{data.message || ' '}</td>
                                            : ''
                                    }
                                    {
                                        header.created_at.hidden === false
                                            ? <td>{data.created_at || ' '}</td>
                                            : ''
                                    }

                                </tr>
                            ))
                        }

                    </tbody>
                    {/* table Body start. */}

                </table>
            </div>
        )
    }
}

export default Table;