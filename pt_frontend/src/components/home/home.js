import { useDispatch } from 'react-redux';
import { clearState } from '../../context/crackmesReducer';

const Home = () => {
    const dispatch = useDispatch();

    const clear = () => {
        console.log('State cleared');
        dispatch(clearState());
    };

    return (
        <div>
            app desc + links <button onClick={clear}>clear state</button>
        </div>
    );
};

export default Home;
