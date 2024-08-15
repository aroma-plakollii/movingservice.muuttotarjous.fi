import React, {useContext, useEffect, useRef, useState} from 'react';
import MovingContext, {Company, PaymentMethod, UnitAvailable} from "../MovingContext";
import {getCompanies, getPaymentMethods, getUnitsAvailable} from "../services/MovingService";
import Loader from "./shared/Loader";
import BackButton from "./shared/BackButton";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import {GMAPKEY} from "../config";
var moment = require('moment');

function BookingDetails() {
    const {contextState, setContextState} = useContext(MovingContext);
    const [state, setState] = useState({
        loading: false,
        startAddress: null,
        address_number: null,
        doorCode: null,
        flat_squarem: null,
        floor: null,
        outdoor_distance: null,
        elevator: null,
        storage: null,
        storage_area: null,
        storage_floor: null,
        hasError: false,
    });
    const startEndKey = contextState.step === 3 ? 'startAddress' : 'endAddress';
    useEffect(() => {
    }, []);

    const onInputChange = (key: string, val: any) => {
        const value = val.target ? val.target.value : '';

        setState({
            ...state,
            [key]: value
        });
        updateContextTimeAddressFormKey(key, value);
    };

    const updateContextTimeAddressFormKey = (key: string, value: any) => {
        setContextState({
            ...contextState,
            movingServiceForm: {
                ...contextState.movingServiceForm,
                timeAddressForm: {
                    ...contextState.movingServiceForm.timeAddressForm,
                    [startEndKey]: {
                        ...contextState.movingServiceForm.timeAddressForm[startEndKey],
                        [key]: value
                    }
                }
            }
        })
    };

    const submitForm = () => {
        // if (
        //     !state.address_number ||
        //     !state.flat_squarem ||
        //     !state.floor ||
        //     !state.storage_area ||
        //     !state.elevator ||
        //     !state.storage ||
        //     !state.storage_floor
        // ) {
        //     setState({
        //         ...state,
        //         hasError: true
        //     });
        //     return;
        // }

        setState({
            ...state,
            hasError: false,
            loading: true
        });

        setContextState({
            ...contextState,
            step: contextState.step + 1
        })
    };

    const onStartAddressChange = () => {};

    if (state.loading) {
        return <>
            <div className="loader-container">
                <Loader color='#74c92c' width={50}/>
            </div>
        </>
    }

    return (
        <>
            <div className="booking-details">
                <h1 className="title">Mistä muutetaan.</h1>
                <p>Anna osoite, mistä muutto alkaa. Näet saatavilla olevat muuttopäivät ja tarkennetun hinnan osoitteiden syöttämisen jälkeen.</p>
                <form className="row g-3">
                    <div className="col-12">
                        <label htmlFor="end_address" className="form-label">
                            Katuosoite ja talon numero mihin muutetaan: *
                        </label>
                        <div className="input_wrap">
                            <GooglePlacesAutocomplete
                                apiKey={GMAPKEY}
                                selectProps={{
                                    value: state.startAddress,
                                    onChange: onStartAddressChange,
                                    placeholder: 'Esimerkikatu 1, Helsinki',
                                }}
                                apiOptions={{ language: 'fi', region: 'fi' }}
                                autocompletionRequest={{
                                    componentRestrictions: { country: 'fi' },
                                    types: ['address']
                                }}
                            />
                            {
                                state.hasError && !state.startAddress && <span className={'d-block text-danger pt-2'}>Valitse osoite avattavasta luettelosta kirjoittaessasi</span>
                            }
                        </div>
                    </div>

                    <div className="col-12">
                        <label htmlFor="address_number" className="form-label">Address Number</label>
                        <div className="input_wrap">
                            <input
                                className={`form-control ${state.hasError && !state.address_number ? 'is-invalid' : ''}`}
                                onChange={(val: any) => onInputChange('address_number', val)}
                                type="text"
                                id="address_number"
                                placeholder="Address Number"/>
                        </div>
                    </div>

                    <div className="col-12">
                        <label htmlFor="door_code" className="form-label">Door Code</label>
                        <div className="input_wrap">
                            <input
                                className="form-control"
                                onChange={(val: any) => onInputChange('door_code', val)}
                                type="text"
                                id="door_code"
                                placeholder="Door Code"/>
                        </div>
                    </div>

                    {
                        startEndKey === 'startAddress' &&
                        <div className="col-12">
                            <label htmlFor="flat_squarem" className="form-label">Asunnon pinta-ala (m2)*</label>
                            <div className="input_wrap">
                                <input
                                    className={`form-control ${state.hasError && !state.flat_squarem ? 'is-invalid' : ''}`}
                                    onChange={(val: any) => onInputChange('flat_squarem', val)}
                                    type="text"
                                    id="flat_squarem"
                                    placeholder="Asunnon pinta-ala (m2)"/>
                            </div>
                        </div>
                    }

                    <div className="col-12">
                        <label htmlFor="floor" className="form-label">Select Floor</label>
                        <select
                            className={`form-select ${state.hasError && !state.floor ? 'is-invalid' : ''}`}
                            onChange={(val: any) => onInputChange('floor', val)}
                            id="floor"
                            aria-label="Select Floor">
                            <option selected disabled>-</option>
                            <option value="1">Maa-taso</option>
                            <option value="2">Kerros 1</option>
                            <option value="3">Kerros 2</option>
                            <option value="4">Kerros 3</option>
                            <option value="5">Kerros 4</option>
                            <option value="6">Kerros 5</option>
                            <option value="7">Kerros 6</option>
                            <option value="8">Kerros 7</option>
                            <option value="9">Kerros 8</option>
                            <option value="10">Kerros 9</option>
                            <option value="11">Kerros 10</option>
                            <option value="12">Kerros 11</option>
                            <option value="13">Kerros 12</option>
                            <option value="14">Kerros 13</option>
                            <option value="15">Kerros 14</option>
                            <option value="16">Kerros 15</option>
                            <option value="17">Kerros 16</option>
                            <option value="18">Kerros 17</option>
                            <option value="19">Kerros 18</option>
                            <option value="20">Kerros 19</option>
                            <option value="21">Kerros 20</option>
                            <option value="22">Kerros 21</option>
                            <option value="23">Kerros 22</option>
                            <option value="24">Kerros 23</option>
                            <option value="25">Kerros 24</option>
                            <option value="26">Kerros 25</option>
                            <option value="27">Kerros 26</option>
                            <option value="28">Kerros 27</option>
                            <option value="29">Kerros 28</option>
                            <option value="30">Kerros 29</option>
                            <option value="31">Kerros 30</option>
                            <option value="32">Kerros 31</option>
                            <option value="33">Kerros 32</option>
                            <option value="34">Kerros 33</option>
                            <option value="35">Kerros 34</option>
                            <option value="36">Kerros 35</option>
                            <option value="37">Kerros 36</option>
                            <option value="38">Kerros 37</option>
                            <option value="39">Kerros 38</option>
                            <option value="40">Kerros 39</option>
                        </select>
                    </div>

                    <div className="col-12">
                        <label
                            htmlFor="end_outdoor_distance"
                            className="form-label">
                            Outdoor Distance
                        </label>
                        <input
                            className={`form-control ${state.hasError && !state.storage_area ? 'is-invalid' : ''}`}
                            onChange={(val: any) => onInputChange('storage_area', val)}
                            type="number"
                            id="storage_area"
                            placeholder="Outdoor Distance"/>
                    </div>

                    <div className="col-12">
                        <label htmlFor="elevator" className="form-label">Select Elevator</label>
                        <select
                            className={`form-select ${state.hasError && !state.elevator ? 'is-invalid' : ''}`}
                            onChange={(val: any) => onInputChange('elevator', val)}
                            id="elevator"
                            aria-label="Select Elevator">
                            <option value="">-</option>
                            <option value="1">Ei hissiä</option>
                            <option value="2">Pieni hissi (alle 1m2)</option>
                            <option value="3">Iso hisi (1m2 tai isompi)</option>
                            <option value="4">Uudiskohde</option>
                        </select>
                    </div>

                    <div className="col-12">
                        <label htmlFor="storage" className="form-label">Storage 1</label>
                        <select
                            className={`form-select ${state.hasError && !state.storage ? 'is-invalid' : ''}`}
                            onChange={(val: any) => onInputChange('storage', val)}
                            id="storage"
                            aria-label="Storage">
                            <option selected disabled>-</option>
                            <option value="1">There is no warehouse</option>
                            <option value="2">Basement closet / outdoor storage</option>
                            <option value="3">Vintti / Ullakko</option>
                        </select>
                    </div>
                    {
                        (state.storage === "2" || state.storage === "3") &&
                        <div className="col-12">
                            <label htmlFor="storage_area" className="form-label">Storage Area (m2)*</label>
                            <div className="input_wrap">
                                <input
                                    className={`form-control ${state.hasError && !state.storage_area ? 'is-invalid' : ''}`}
                                    onChange={(val: any) => onInputChange('storage_area', val)}
                                    type="number"
                                    id="storage_area"
                                    placeholder="Storage Area (m2)"/>
                            </div>
                        </div>
                    }

                    {
                        state.storage === "3" &&
                        <div className="col-12">
                            <label htmlFor="storage_floor" className="form-label">Storage Floor</label>
                            <select
                                className={`form-select ${state.hasError && !state.storage_floor ? 'is-invalid' : ''}`}
                                onChange={(val: any) => onInputChange('storage_floor', val)}
                                id="storage_floor"
                                aria-label="Storage Floor">
                                <option selected disabled>-</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </select>
                        </div>
                    }

                    <div className="d-flex justify-content-between gap-2 mt-4">
                        <BackButton/>
                        <button type="button" className="btn btn-lg btn-primary" onClick={submitForm}>Next</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default BookingDetails;
