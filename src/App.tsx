import { FC } from "react";
import './assets/style.scss';
import { Outlet } from "react-router-dom";
import Header from "./components/Header/header";
import ActiveImage from "./components/ActiveImage/activeImage";

const App:FC = () => {

    return (     
        <section className="wrapper">
            <Header />
            <main>
                <ActiveImage />
                <Outlet /> 
            </main>
        </section> 
    );
};
 
export default App;