import React, {useContext, useEffect, useRef, useState} from 'react';
import MovingContext, {Company, PaymentMethod, UnitAvailable} from "../MovingContext";
import {getCompanies, getPaymentMethods, getUnitsAvailable} from "../services/MovingService";
import Loader from "./shared/Loader";
import BackButton from "./shared/BackButton";
var moment = require('moment');

const PersonalDetails = () => {
    const {contextState, setContextState} = useContext(MovingContext);
    const [state, setState] = useState({
        loading: false,
        firstName: contextState.movingServiceForm.paymentDetails ? contextState.movingServiceForm.paymentDetails.firstName : '',
        lastName: contextState.movingServiceForm.paymentDetails ? contextState.movingServiceForm.paymentDetails.lastName : '',
        email: contextState.movingServiceForm.paymentDetails ? contextState.movingServiceForm.paymentDetails.email : '',
        phone: contextState.movingServiceForm.paymentDetails ? contextState.movingServiceForm.paymentDetails.phone : '',
        paymentMethod: contextState.movingServiceForm.paymentDetails ? contextState.movingServiceForm.paymentDetails.paymentMethod : '',
        hasError: false,
    });

    useEffect(() => {
        const getPaymentMethods_ = async () => {
            const paymentMethods = await getPaymentMethods();
            setContextState({
                ...contextState, paymentMethods
            });
            setState({
                ...state, loading: false
            });
        };

        getPaymentMethods_();
    }, []);

    const onInputChange = (key: string, val: any) => {
        const value = val.target ? val.target.value : '';
        setState({
            ...state,
            [key]: value
        });
        updateContextPaymentDetailsKey(key, value);
    };

    const updateContextPaymentDetailsKey = (key: string, value: any) => {
        setContextState({
            ...contextState,
            movingServiceForm: {
                ...contextState.movingServiceForm,
                paymentDetails: {
                    ...contextState.movingServiceForm.paymentDetails,
                    [key]: value
                }
            }
        })
    };

    const onNext = () => {
        if (
            !state.firstName ||
            !state.lastName ||
            !state.email ||
            !state.phone
        ) {
            setState({
                ...state,
                hasError: true
            });

            return;
        }

        setContextState({
            ...contextState,
            step: contextState.step + 1
        })
    }

    return (
        <div className={'ms-container'}>
            <div className={"ms-content"}>
                <h1 className={"ms-content__title"}>Henkilökohtaiset tiedot</h1>
            </div>

            <div className={'ms-form-container'}>
                <div className={'ms-input-group'}>
                    <label htmlFor="first_name" className="ms-input-group__label">Etunimi:</label>
                    <input
                        className={`ms-input-group__input ${state.hasError && !state.firstName ? 'is-invalid' : ''}`}
                        onChange={(val: any) => onInputChange('firstName', val)}
                        type="text"
                        id="first_name"
                        value={state.firstName}
                    />
                </div>

                <div className={'ms-input-group'}>
                    <label htmlFor="last_name" className="ms-input-group__label">Sukunimi:</label>
                    <input
                        className={`ms-input-group__input ${state.hasError && !state.lastName ? 'is-invalid' : ''}`}
                        onChange={(val: any) => onInputChange('lastName', val)}
                        type="text"
                        id="last_name"
                        value={state.lastName}
                        />
                </div>

                <div className={'ms-input-group'}>
                    <label htmlFor="email" className="ms-input-group__label">Email:</label>
                    <input
                        className={`ms-input-group__input ${state.hasError && !state.email ? 'is-invalid' : ''}`}
                        onChange={(val: any) => onInputChange('email', val)}
                        type="text"
                        id="email"
                        value={state.email}
                    />
                </div>

                <div className={'ms-input-group'}>
                    <label htmlFor="phone_number" className="ms-input-group__label">Puhelinnumero:</label>
                    <input
                        className={`ms-input-group__input ${state.hasError && !state.phone ? 'is-invalid' : ''}`}
                        onChange={(val: any) => onInputChange('phone', val)}
                        type="text"
                        id="phone_number"
                        value={state.phone}
                    />
                </div>

            </div>

            <div className="ms-step-nav">
                <BackButton/>
                <button type="button" className="ms-button" onClick={onNext}>Eteenpäin</button>
            </div>
        </div>
    )
}

export default PersonalDetails;