import { useParams } from 'react-router-dom';
import GetForm from '../components/GetForm';

 const UpdateForm = () => {

        const { id } = useParams();

        return (
            <div>
                <GetForm id = {id}/>
            </div>
        )
}

export default  UpdateForm;
