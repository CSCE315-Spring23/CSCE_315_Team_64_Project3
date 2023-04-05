import React from "react";
import "./style.css";

export const ElementDefaultWhite = () => {
return (
    <div className={"element-default-white-element-default-white-wrapper"}>
        <div className={"element-default-white-element-default-white"}>
            <img className={"element-default-white-smoothie-king-logo"} src={"smoothie-king-logo-1.png"} />
            <div className="element-default-white-overlap-group”}>
                <img className={"element-default-white-smoothie-king-logo-2"} src={"smoothie-king-logo-2.png"} />
                <img className={"element-default-white-smoothie-king-logo-3"} src={"smoothie-king-logo-3.png"} />
                <img className={"element-default-white-smoothieking"} src={"smoothieking-1.gif"} />
            </div>

            <div className={"element-default-white-addtocart"}>
                <div className={"element-default-white-text-wrapper”}>Log In</div>
            </div>
   
            <div className={"element-default-white-div-wrapper"}>
                <div className={"element-default-white-text-wrapper"}>Settings</div>

            <div className={"element-default-white-div"}>
                <div className={"element-default-white-text-wrapper"}>Sign-Up</div>
            </div>

            <h1 className={"element-default-white-h-1"}>P0S System</h1>
        </div>
    </div>
    );
};

// import React from 'react';

// function IntroScreen() {
//   return (
//     <div className="intro-screen">
//       <h1>Welcome to Smoothie King</h1>
//       <p>Get your healthy fix of fruits and veggies with our delicious smoothies!</p>
//       <div className="button-container">
//         <a href="/menu">
//           <button>Menu</button>
//         </a>
//         <a href="/locations">
//           <button>Locations</button>
//         </a>
//         {/* <a href="/rewards">
//           <button>Rewards</button>
//         </a> */}
//       </div>
//     </div>
//   );
// }

// export default IntroScreen;