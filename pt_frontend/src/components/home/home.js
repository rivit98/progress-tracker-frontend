import { useDispatch } from 'react-redux';
import { clearState, setTasksLastUpdated, storeTasks } from '../../context/crackmesReducer';

const Home = () => {
    const dispatch = useDispatch();
    dispatch(clearState());
    console.log('State cleared');
    return <div>app desc + links</div>;
};

export default Home;
