import Header from '../Components/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Footer';

const HomeLayout = () => {
    return (
        <div className='container mx-auto py-5'>
            <header>
                <Header></Header>
                <Outlet></Outlet>
                <Footer></Footer>
            </header>
        </div>
    );
};

export default HomeLayout;