import React, {useState} from 'react';
import './App.css';
import Home from "./views/Home";
import {Coupon, MovingServiceForm, MovingServiceState} from "./MovingContext";
import MovingContext from "./MovingContext";

interface IAppProps {
    dataStep: number;
}

function App(props: IAppProps) {
    const [state, setState] = useState<MovingServiceState>({
        step: props.dataStep,
        products: [],
        companies: [],
        regions: [],
        unitsAvailable: [],
        paymentMethods: [],
        movingServiceForm: {} as MovingServiceForm,
        productDescription: '',
        coupons: {} as Coupon
    });
  return (
    <div className="App">
        <MovingContext.Provider value={{
            contextState: state,
            setContextState: setState
        }}>
            <Home/>
        </MovingContext.Provider>
    </div>
  );
}

export default App;
