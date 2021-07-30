import { Spinner } from 'react-bootstrap';

const Loader = () => {
    return (
        <div className="d-flex justify-content-center px-5 py-5">
            <Spinner animation="border" variant="danger" />
        </div>
    )
}

export default Loader;