import axios from 'axios';
import { Component } from 'react';
import { Spinner } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Banner from './Banner.jsx';
import FormData from './FormData.jsx';
import Loader from './loader.jsx';

let initialForm = {
    user_name: '',
    user_email: '',
    details: '',
    user_gender: '',
    user_hobby: [],
    error: ''
}

class GetForm extends Component {

    state = ({
        loader: true,
        btnloader: false,
        isVaild: true,
        fields: [],
        form: {
            ...initialForm
        }
    });

    baseUrl = 'http://localhost/api/';

    // this Fetch Data Code.
    async componentDidMount() {

        let urlID = '';
        if (this.props.id) {
            urlID = `?id=${this.props.id}`
        }

        try {

            const response = await axios.get(this.baseUrl + 'get_form.php' + urlID);
            this.setState({
                loader: false, fields: response
                    .data
                    .data
                    .fields[0]
            })

            if (this.state.isVaild) {
                
                let {form} = this.state;
                Object
                    .keys(this.state.fields)
                    .map((field) => {
                        if (this.state.fields[field].type === "repeater") {
                            let value = this
                                .state
                                .fields[field]
                                .value;

                            this.setState({form: {
                                ...form 
                                , user_hobby: value
                            }});
                        }
                        return null;
                    })
                this.setState({isVaild: false});
            }

        } catch (err) {
            console.error(err.message);
        }

    }

    onChangeHandler = (name, value, index, type) => {

        if (type !== 'repeater') {

            let {form} = this.state;
            let currentState = form
            currentState[name] = value;
            this.setState({form: currentState});

        } else if (type === 'repeater') {

            let {user_hobby} = this.state.form;
            // let currentUser = user_hobby;

            user_hobby.map((user, ind) => {
                if (index === ind) {
                    user[name] = value;
                }
                return null;
            });


        }
    }

    onSubmitHandler = (event) => {

        event.preventDefault();
        this.setState({btnloader: true});

        let user = this.state.form;

        axios
            .post(`${this.baseUrl}submit_form.php`, user)
            .then(res => {
                this.setState({btnloader: false});
                toast(res.data.messages[0]);

            })
            .catch(err => console.log(err));

        let {form} = this.state;
        let currentState = form;
        currentState = {
            ...initialForm
        };
        this.setState({form: currentState});
        this.setState({
            form: {
                user_hobby: []
            }
        });
        console.log(this.state.form);

    }

    // This Part Dynamic Form Part

    addUser = () => {

        let {user_hobby} = this.state.form;
        let {form} = this.state;
        let userWork = {
            work_place: "",
            designation: ""
        }
        
        this.setState({form: {
            ...form 
            ,user_hobby : [...user_hobby , userWork]
        }});
        
        console.log(this.state.form);
    }

    render() {

        const {loader, fields} = this.state;

        return (
            <div className="container">
                <div className="row">
                    <Banner title="Get Form"/>
                    <div className="col-md-8 offset-md-2">
                        {
                            loader
                                ? <Loader/>
                                : <form id="contactus" onSubmit={this.onSubmitHandler}>

                                        {
                                            Object
                                                .keys(fields)
                                                .map((field, ind) => (
                                                    <FormData
                                                        field={fields[field]}
                                                        nameFields={field}
                                                        key={ind}
                                                        onChangeHandler={this.onChangeHandler}
                                                        state_value={this.state.form}
                                                        addUser={this.addUser}/>
                                                ))
                                        }

                                        <fieldset className="mt-3">
                                            <button name="submit" type="submit" id="submit">
                                                <span className="mr-2">Submit Now
                                                </span>
                                                <ToastContainer/> {this.state.btnloader && <Spinner animation="border"/>}
                                            </button>
                                        </fieldset>
                                    </form>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default GetForm;