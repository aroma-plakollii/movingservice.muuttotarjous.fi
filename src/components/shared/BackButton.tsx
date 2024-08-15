import * as React from 'react';
import {useContext} from "react";
import MovingContext from "../../MovingContext";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

interface IBackButtonProps {
    step?: number
}

const BackButton = (props: IBackButtonProps) => {
    const {contextState, setContextState} = useContext(MovingContext);

    return (
        <div style={{display: 'flex', alignItems: 'center'}}>
            <KeyboardDoubleArrowLeftIcon sx={{color: '#5ea422'}}/>
            <button type="button" className="ms-link-2"
                    onClick={() => {
                        setContextState({
                            ...contextState,
                            step: contextState.step - 1
                        }); // Closing parenthesis was missing here
                        window.parent.postMessage('scrollToTop', "*");
                    }}>Taaksenpäin
            </button>
        </div>
    );
}

export default BackButton;