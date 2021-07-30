import React, {Component} from "react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {Link} from "react-router-dom";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging
        ? "lightgreen"
        : "#f8f9fa",

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver
        ? "lightblue"
        : "#f8f9fa",
    padding: grid,
    width: 250
});

class Table extends Component {

    baseUrl = 'http://localhost/api/';

    constructor(props) {
        super(props);
        this.state = {
            items: this.props.rows
        };
        this.onDragEnd = this
            .onDragEnd
            .bind(this);
    }

    onDragEnd(result) {

        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(
            this.state.items,
            result.source.index,
            result.destination.index
        );

        this.setState({items});
        this
            .props
            .rowsUpdateHandler(items);

        axios
            .post(`${this.baseUrl}reorder.php`, items)
            .then(res => {
                toast.success(res.data.messages[0] || "reorder  successful");

            })
            .catch(err => toast(err));

        // console.log(this.state.items)
    }

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

                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="droppable">
                        {
                            (provided, snapshot) => (

                                <tbody
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    style={getListStyle(snapshot.isDraggingOver)}>

                                    {
                                        rows.map((data, index) => (

                                            <Draggable key={String(data.id)} draggableId={String(data.id)} index={index}>

                                                {
                                                    (provided, snapshot) => (

                                                        <tr
                                                            // key={Math.random()}
                                                            ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>

                                                            {
                                                                header.id.hidden === false
                                                                    ? <td className='text-center'>
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

                                                    )
                                                }
                                            </Draggable>
                                        ))
                                    }
                                    {provided.placeholder}
                                </tbody>

                            )
                        }
                    </Droppable>
                </DragDropContext>
                {/* table Body start. */}
                
            </table>

            <ToastContainer/>
           </div> 
        )
    }
}

export default Table;