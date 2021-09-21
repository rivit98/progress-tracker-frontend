import { useSelector } from 'react-redux';
import { isLoggedIn } from '../../context/userReducer';
import TaskList from '../taskList/taskList';

const Home = () => {
    const logged = useSelector(isLoggedIn);

    return logged ? <TaskList /> : <Desc />;
};

const Desc = () => {
    return <div>opis apki</div>;
};

export default Home;
