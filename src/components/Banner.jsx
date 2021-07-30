let Banner = (props) => {

    return (
        <div>
            <div className="jumbotron">
                <div className="container mt-5 pt-3">
                    <h1 className="text-center">{props.title}</h1>
                </div>
            </div>

        </div>
    )

}

export default Banner;