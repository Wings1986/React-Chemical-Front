import React from "react";
import "../styles/Home.scss";
import image from '../assets/images/inventory.png';

const Welcome = ({token}) => {
    return (
        <div className="container min-h-[60vh]">
            <div className="flex gap-10 items-center">
                <div className={`mb-5`}>
                    <img src={image} className={`h-28`} alt={``}/>
                </div>
                <div>
                    <h1 className={`text-2xl`}>Chemistry App</h1>

                </div>
            </div>
        </div>
    );
};

export default Welcome;
