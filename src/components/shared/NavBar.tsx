import React, {useContext} from "react";
import MovingContext from "../../MovingContext";

export const NavBar = (props: any) => {
    const {contextState, setContextState} = useContext(MovingContext);

    const isActive = (stepNumber: number) => {
        return contextState.step === stepNumber ? 'ms-links__link active' : 'ms-links__link';
    };

    return (
        <div className={'ms-content__links'}>
            <a href={void(0)} className={isActive(1)} onClick={() => setContextState({...contextState, step: 1})}><span>Select Service</span> &gt;</a>
            <a href={void(0)} className={isActive(2)} onClick={() => setContextState({...contextState, step: 2})}><span>Start Address</span> &gt;</a>
            <a href={void(0)} className={isActive(3)} onClick={() => setContextState({...contextState, step: 3})}><span>End Address</span> &gt;</a>
            <a href={void(0)} className={isActive(4)} onClick={() => setContextState({...contextState, step: 4})}><span>Companies</span> &gt;</a>
            <a href={void(0)} className={isActive(5)} onClick={() => setContextState({...contextState, step: 5})}><span>Units</span> &gt;</a>
            <a href={void(0)} className={isActive(6)} onClick={() => setContextState({...contextState, step: 6})}><span>Personal Details</span> &gt;</a>
            <a href={void(0)} className={isActive(7)} onClick={() => setContextState({...contextState, step: 7})}><span>Payment Details</span> &gt;</a>
        </div>
    )
}