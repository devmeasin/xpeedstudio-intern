const FormData = (props) => {

    let {field, nameFields, onChangeHandler, state_value, addUser} = props;

    let keyPressHandler = (event , index , type) => {
        const {name, value} = event.target;
        onChangeHandler(name, value , index , type);
    };

    if (field.type === 'hidden' || field.type === 'select' || field.type === 'textarea' || field.type === 'repeater' || field.type === 'radio') {

        if (field.type === 'textarea') {
            return (
                <div>
                    <label className='mb-2 form-label'>{field.title}</label>
                    <div className="form-floating">
                        <textarea
                            {...field.html_attr || ' '}
                            className="form-control"
                            placeholder={field.title}
                            required={field.required || false}
                            value={state_value[nameFields] || field.value}
                            name={nameFields}
                            onChange={(event) => keyPressHandler(event)}/>
                    </div>
                </div>
            )

        } else if (field.type === 'select') {

            return (
                <div>
                    <label htmlFor={field.html_attr.id || ''} className="form-label">{field.title}
                    </label>
                    <select
                        {...field.html_attr || ' '}
                        className="form-select"
                        type={field.type}
                        required={field.required || false}
                        value={state_value[nameFields] || field.value}
                        name={nameFields}
                        onChange={(event) => keyPressHandler(event)}>
                        {
                            field
                                .options
                                .map((option) => {
                                    return <option key={option.key} value={option.key}>{option.label}</option>
                                })
                        }
                    </select>
                </div>
            )

        } else if (field.type === 'radio') {

            return (
                <div className="mt-3">
                    {
                        field
                            .options
                            .map((option, ind) => {
                                return (
                                    <div
                                        className="form-check form-check-inline"
                                        key={ind}
                                        name={nameFields}
                                        onChange={(event) => keyPressHandler(event)}>
                                        <input
                                            name="radioOption"
                                            className="form-check-input"
                                            type={field.type}
                                            value={option.key}
                                            required={field.required || false}/>
                                        <label htmlFor="inlineRadio3" name="radioOption" className="form-check-label">
                                            {option.label}
                                        </label>
                                    </div>
                                )
                            })
                    }
                </div>
            )
        } else if (field.type === 'repeater') {

            let {user_hobby} = state_value;

            return (
                <div>
                    <label className="form-label mb-3">{field.title}
                    </label>

                    <div className="row">

                        {

                            user_hobby.map(
                                (user , index) => (Object.keys(field.repeater_fields).map((userField, ind) => (

                                    <div className="col-md-6" key={ind}>
                                        <label className="form-label">{
                                                field
                                                    .repeater_fields[userField]
                                                    .title
                                            }
                                            :
                                        </label>
                                        <input
                                            placeholder={field
                                                .repeater_fields[userField]
                                                .title}
                                            required={field
                                                .repeater_fields[userField]
                                                .required || false}
                                            type={field
                                                .repeater_fields[userField]
                                                .type}
                                            value={user_hobby[userField]}
                                            // defaultValue = {user[userField]}
                                            name={userField}
                                            onChange={(event) => keyPressHandler(event , index , field.type)}/>
                                    </div>
                                   

                                )))
                            )

                        }

                        <div className="col-md-3 mt-3">
                            <button type="button" className="btn btn-primary btn-sm " onClick={addUser}>Add More +</button>
                        </div>
                    </div>

                </div>
            )

        } else {
            return null;
        }

    } else {

        return (
            <fieldset>
                <label htmlFor={field.html_attr.id || ''} className="form-label">{field.title}</label>
                <input
                    {...field.html_attr || ''}
                    placeholder={field.title}
                    required={field.required || false}
                    type={field.type}
                    value={state_value[nameFields] || field.value}
                    name={nameFields}
                    onChange={(event) => keyPressHandler(event)}/>

            </fieldset>
        )
    }
}

export default FormData;