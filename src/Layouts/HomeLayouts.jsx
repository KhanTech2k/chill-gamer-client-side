import Header from '../Components/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Footer';

const HomeLayout = () => {
    return (
        <div>
            <header>
                <Header></Header>
                <div className='container mx-auto '>
                    <Outlet></Outlet>
                </div>
                <Footer></Footer>
            </header>
        </div>
    );
};

export default HomeLayout;