import React, {useContext, useEffect, useRef, useState} from 'react';
import MovingContext, {Company, PaymentMethod, UnitAvailable} from "../MovingContext";
import {createBookingRequest, getCompanies, getPaymentMethods, getUnitsAvailable} from "../services/MovingService";
import Loader from "./shared/Loader";
import BackButton from "./shared/BackButton";
var moment = require('moment');

const PersonalBookingRequestDetails = () => {
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

    const onCreateBookingRequest = async (e: any) => {
        e.preventDefault();
        setState({...state, loading: true});
        const startDate = moment(contextState.movingServiceForm.timeAddressForm.date);
        const endDate = moment(contextState.movingServiceForm.timeAddressForm.date);

        startDate.set({
            hour: contextState.movingServiceForm.timeAddressForm.time,
            minute: 0,
            minutes: 0,
        })

        endDate.set({
            hour: contextState.movingServiceForm.timeAddressForm.time,
            minute: 0,
            minutes: 0,
        }).add(2, 'hours')

        const data = {

            start_date: startDate.format('YYYY-MM-DD HH:mm:ss'),
            end_date: endDate.format('YYYY-MM-DD HH:mm:ss'),

            product_id: contextState.movingServiceForm.productId,

            first_name: contextState.movingServiceForm.paymentDetails.firstName,
            last_name: contextState.movingServiceForm.paymentDetails.lastName,

            email: contextState.movingServiceForm.paymentDetails.email,
            phone: contextState.movingServiceForm.paymentDetails.phone,

            start_address: contextState.movingServiceForm.timeAddressForm.startAddress.name,
            end_address: contextState.movingServiceForm.timeAddressForm.endAddress.name,

            start_door_number: contextState.movingServiceForm.timeAddressForm.startAddress.address_number,
            end_door_number: contextState.movingServiceForm.timeAddressForm.endAddress.address_number,

            start_door_code: contextState.movingServiceForm.timeAddressForm.startAddress.door_code,
            end_door_code: contextState.movingServiceForm.timeAddressForm.endAddress.door_code,

            start_floor: contextState.movingServiceForm.timeAddressForm.startAddress.floor,
            end_floor: contextState.movingServiceForm.timeAddressForm.endAddress.floor,

            start_square_meters: contextState.movingServiceForm.timeAddressForm.startAddress.flat_squarem,
            end_square_meters: contextState.movingServiceForm.timeAddressForm.endAddress.flat_squarem,

            start_elevator: contextState.movingServiceForm.timeAddressForm.startAddress.elevator,
            end_elevator: contextState.movingServiceForm.timeAddressForm.endAddress.elevator,

            start_outdoor_distance: contextState.movingServiceForm.timeAddressForm.startAddress.outdoor_distance,
            end_outdoor_distance: contextState.movingServiceForm.timeAddressForm.endAddress.outdoor_distance,

            start_storage: contextState.movingServiceForm.timeAddressForm.startAddress.storage,
            end_storage: contextState.movingServiceForm.timeAddressForm.endAddress.storage,

            start_storage_m2: contextState.movingServiceForm.timeAddressForm.startAddress.storage_area,
            end_storage_m2: contextState.movingServiceForm.timeAddressForm.endAddress.storage_area,

            start_storage_floor: contextState.movingServiceForm.timeAddressForm.startAddress.storage_floor,
            end_storage_floor: contextState.movingServiceForm.timeAddressForm.endAddress.storage_floor,
        };

        const res = await createBookingRequest(data);

        if (res) {
            setContextState({
                ...contextState,
                step: 8
            })

            setState({...state, loading: false});
        }
    };

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
                <button type="button" className="ms-button" onClick={onCreateBookingRequest}>Lähetä pyyntö</button>
            </div>
        </div>
    )
}

export default PersonalBookingRequestDetails;