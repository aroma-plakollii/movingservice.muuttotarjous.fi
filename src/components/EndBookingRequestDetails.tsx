import React, {useContext, useEffect, useRef, useState} from 'react';
import MovingContext, {Company, PaymentMethod, UnitAvailable} from "../MovingContext";
import {getCompanies, getPaymentMethods, getUnitsAvailable} from "../services/MovingService";
import Loader from "./shared/Loader";
import BackButton from "./shared/BackButton";
import GooglePlacesAutocomplete, {geocodeByPlaceId} from "react-google-places-autocomplete";
import {GMAPKEY} from "../config";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {usePlacesWidget} from "react-google-autocomplete";

function EndBookingRequestDetails() {
    const {contextState, setContextState} = useContext(MovingContext);
    const [state, setState] = useState({
        loading: false,
        date: contextState.movingServiceForm.timeAddressForm.date ? contextState.movingServiceForm.timeAddressForm.date : '',
        endAddress: contextState.movingServiceForm.timeAddressForm.endAddress ? contextState.movingServiceForm.timeAddressForm.endAddress.name : '',
        time: null,
        address_number: contextState.movingServiceForm.timeAddressForm.endAddress ? contextState.movingServiceForm.timeAddressForm.endAddress.address_number : '',
        door_code: contextState.movingServiceForm.timeAddressForm.endAddress ? contextState.movingServiceForm.timeAddressForm.endAddress.door_code : '',
        flat_squarem: contextState.movingServiceForm.timeAddressForm.endAddress ? contextState.movingServiceForm.timeAddressForm.endAddress.flat_squarem : '',
        floor: contextState.movingServiceForm.timeAddressForm.endAddress ? contextState.movingServiceForm.timeAddressForm.endAddress.floor : '',
        outdoor_distance: contextState.movingServiceForm.timeAddressForm.endAddress ? contextState.movingServiceForm.timeAddressForm.endAddress.outdoor_distance : '',
        elevator: contextState.movingServiceForm.timeAddressForm.endAddress ? contextState.movingServiceForm.timeAddressForm.endAddress.elevator : '',
        storage: contextState.movingServiceForm.timeAddressForm.endAddress ? contextState.movingServiceForm.timeAddressForm.endAddress.storage : '',
        storage_area: contextState.movingServiceForm.timeAddressForm.endAddress ? contextState.movingServiceForm.timeAddressForm.endAddress.storage_area : '',
        storage_floor: contextState.movingServiceForm.timeAddressForm.endAddress ? contextState.movingServiceForm.timeAddressForm.endAddress.storage_floor : '',
        hasError: false,
    });
    const [address, setAddress] = useState({
        end_address: contextState.movingServiceForm?.timeAddressForm?.endAddress
            ? contextState.movingServiceForm.timeAddressForm.endAddress?.name
            : "",
        city: contextState.movingServiceForm?.timeAddressForm?.endAddress
            ? contextState.movingServiceForm?.timeAddressForm.endAddress?.city
            : "",
        placeId: contextState.movingServiceForm?.timeAddressForm?.endAddress
            ? contextState.movingServiceForm?.timeAddressForm?.endAddress?.placeId
            : "",
    });

    useEffect(() => {
        setContextState({
            ...contextState,
            movingServiceForm: {
                ...contextState.movingServiceForm,
                timeAddressForm: {
                    ...contextState.movingServiceForm.timeAddressForm,
                    endAddress: {
                        name: address.end_address,
                        city: address.city,
                        placeId: address.placeId,
                        address_number: state.address_number,
                        door_code: state.door_code,
                        flat_squarem: state.flat_squarem,
                        floor: state.floor,
                        outdoor_distance: state.outdoor_distance,
                        elevator: state.elevator,
                        storage: state.storage,
                        storage_area: state.storage_area,
                        storage_floor: state.storage_floor
                    }
                }
            }
        })
    }, []);

    const { ref }: any = usePlacesWidget({
        apiKey: GMAPKEY,
        onPlaceSelected: (place: any) => onAddressChange(place),
        options: {
            types: ["address"],
            componentRestrictions: { country: "fi" },
        },
    });

    const onInputChange = (key: string, val: any) => {
        const value = val.target ? val.target.value : '';

        setState({
            ...state,
            [key]: value
        });
        updateContextTimeAddressFormKey(key, value);
    };

    const updateContextStartAddress = (key: string, value: any) => {
        setContextState({
            ...contextState,
            movingServiceForm: {
                ...contextState.movingServiceForm,
                timeAddressForm: {
                    ...contextState.movingServiceForm.timeAddressForm,
                    [key]: value
                }
            }
        })
    };

    const updateContextTimeAddressFormKey = (key: string, value: any) => {
        setContextState({
            ...contextState,
            movingServiceForm: {
                ...contextState.movingServiceForm,
                timeAddressForm: {
                    ...contextState.movingServiceForm.timeAddressForm,
                    'endAddress': {
                        ...contextState.movingServiceForm.timeAddressForm['endAddress'],
                        [key]: value
                    }
                }
            }
        })
    };

    const updateContextDate = (val: any) => {
        setContextState({
            ...contextState,
            movingServiceForm: {
                ...contextState.movingServiceForm,
                timeAddressForm: {
                    ...contextState.movingServiceForm.timeAddressForm,
                    date: val
                }
            }
        });
    };

    const onDateChange = (val: any) => {
        setState({
            ...state,
            date: val
        });
        updateContextDate(val);
    };

    const isWeekDay = (date: Date) => {
        const day = date.getDay();
        return day !== 0 && day !== 6;
    };

    const getDisabledDates = (): Date[] => {
        return [
            new Date(2022, 4, 27),
            new Date(2022, 4, 29)
        ];
    };

    const onNext = () => {
        if (
            !address.end_address ||
            !state.address_number ||
            !state.floor ||
            !state.elevator ||
            !state.outdoor_distance ||
            !state.storage ||
            !state.date
        ){
            setState({
                ...state,
                hasError: true
            });

            return;
        }

        if (state.storage === "3"){
            if (!state.storage_floor) {
                setState({
                    ...state,
                    hasError: true
                });
                return;
            }
        }

        setState({
            ...state,
            hasError: false,
            loading: true
        });

        // setContextState({
        //     ...contextState,
        //     step: contextState.step + 1
        // })

        setContextState({
            ...contextState,
            step: contextState.step + 1,
            movingServiceForm: {
                ...contextState.movingServiceForm,
                timeAddressForm: {
                    ...contextState.movingServiceForm.timeAddressForm,
                    endAddress: {
                        ...contextState.movingServiceForm.timeAddressForm.endAddress,
                        name: address.end_address,
                        city: address.city,
                        placeId: address.placeId,
                    }
                }
            }
        })
    };

    if (state.loading) {
        return <>
            <div className="loader-container">
                <Loader color='#74c92c' width={50}/>
            </div>
        </>
    }

    const onAddressChange = async (place: any) => {
        let city = "";
        place.address_components.forEach((addressComponent: any) => {
            if (addressComponent.types[0] === "locality") {
                city = addressComponent.long_name;
            }
        });

        setAddress({
            ...address,
            end_address: place.formatted_address,
            city,
            placeId: place.place_id,
        });

        // updateContextStartAddress(
        //     'endAddress',
        //     {
        //         name: place.formatted_address,
        //         city,
        //         placeId: place.place_id,
        //     }
        // );
    };

    return (
        <div className={"ms-container"}>
            <div className={"ms-content"}>
                <h1 className={"ms-content__title"}>Mihin muutetaan</h1>
                <p className={"ms-content__text"}>Anna osoite, mistä muutto alkaa. Näet saatavilla olevat muuttopäivät ja tarkennetun hinnan osoitteiden syöttämisen jälkeen.</p>
                <div className={'ms-form-container'}>
                    <div className={'ms-input-group'}>
                        <label htmlFor="end_address" className="ms-input-group__label">
                            Katuosoite mihin muutetaan: *
                        </label>
                        <input
                            className={`ms-input-group__input ${
                                state.hasError && !address.end_address ? "is-invalid" : ""
                            }`}
                            type="text"
                            id="end_address"
                            placeholder="Esimerkikatu 1, Helsinki"
                            ref={ref}
                            defaultValue={address.end_address}
                        />
                    </div>

                    <div className={'ms-input-group'}>
                        <label htmlFor="address_number" className="ms-input-group__label">Talon numero, rappu ja ovinumero: *</label>
                        <div className="input_wrap">
                            <input
                                className={`ms-input-group__input ${state.hasError && !state.address_number ? 'is-invalid' : ''}`}
                                onChange={(val: any) => onInputChange('address_number', val)}
                                type="text"
                                id="address_number"
                                value={state.address_number}
                                placeholder="32"/>
                        </div>
                    </div>

                    <div className={'ms-input-group'}>
                        <label htmlFor="door_code" className="ms-input-group__label">Lisätietoa (Esim. ovikoodi):</label>
                        <input
                            className="ms-input-group__input"
                            onChange={(val: any) => onInputChange('door_code', val)}
                            type="text"
                            id="door_code"
                            placeholder="Ovikodi"
                            value={state.door_code}
                        />
                    </div>

                    <div className={'ms-input-group'}>
                        <label htmlFor="floor" className="ms-input-group__label">Valitse kerros: *</label>
                        <select
                            className={`ms-input-group__select ${state.hasError && !state.floor ? 'is-invalid' : ''}`}
                            onChange={(val: any) => onInputChange('floor', val)}
                            id="floor"
                            value={state.floor}
                            aria-label="Valitse kerros">
                            <option selected>-</option>
                            <option value="a">Maa-taso</option>
                            <option value="b">Rivitalo 1 kerros</option>
                            <option value="c">Omakotitalo 1 kerros</option>
                            <option value="d">Rivitalo 2 kerros</option>
                            <option value="e">Omakotitalo 2 kerros</option>
                            <option value="1">Kerros 1</option>
                            <option value="2">Kerros 2</option>
                            <option value="3">Kerros 3</option>
                            <option value="4">Kerros 4</option>
                            <option value="5">Kerros 5</option>
                            <option value="6">Kerros 6</option>
                            <option value="7">Kerros 7</option>
                            <option value="8">Kerros 8</option>
                            <option value="9">Kerros 9</option>
                            <option value="10">Kerros 10</option>
                            <option value="11">Kerros 11</option>
                            <option value="12">Kerros 12</option>
                            <option value="13">Kerros 13</option>
                            <option value="14">Kerros 14</option>
                            <option value="15">Kerros 15</option>
                            <option value="16">Kerros 16</option>
                            <option value="17">Kerros 17</option>
                            <option value="18">Kerros 18</option>
                            <option value="19">Kerros 19</option>
                            <option value="20">Kerros 20</option>
                            <option value="21">Kerros 21</option>
                            <option value="22">Kerros 22</option>
                            <option value="23">Kerros 23</option>
                            <option value="24">Kerros 24</option>
                            <option value="25">Kerros 25</option>
                            <option value="26">Kerros 26</option>
                            <option value="27">Kerros 27</option>
                            <option value="28">Kerros 28</option>
                            <option value="29">Kerros 29</option>
                            <option value="30">Kerros 30</option>
                            <option value="31">Kerros 31</option>
                            <option value="32">Kerros 32</option>
                            <option value="33">Kerros 33</option>
                            <option value="34">Kerros 34</option>
                            <option value="35">Kerros 35</option>
                            <option value="36">Kerros 36</option>
                            <option value="37">Kerros 37</option>
                            <option value="38">Kerros 38</option>
                            <option value="39">Kerros 39</option>
                        </select>
                    </div>

                    <div className={'ms-input-group'}>
                        <label htmlFor="elevator" className="ms-input-group__label">Hissin koko: *</label>
                        <select
                            className={`ms-input-group__select ${state.hasError && !state.elevator ? 'is-invalid' : ''}`}
                            onChange={(val: any) => onInputChange('elevator', val)}
                            id="elevator"
                            value={state.elevator}
                            aria-label="Hissin koko">
                            <option value="">-</option>
                            <option value="1">Ei hissiä</option>
                            <option value="2">Pieni hissi (alle 1m2)</option>
                            <option value="3">Iso hisi (1m2 tai isompi)</option>
                            <option value="4">Uudiskohde</option>
                        </select>
                    </div>

                    <div className={'ms-input-group'}>
                        <label
                            htmlFor="end_outdoor_distance"
                            className="ms-input-group__label">
                            Kuinka lähelle muuttoautolla pääsee (m): *
                        </label>
                        <input
                            className={`ms-input-group__input ${state.hasError && !state.outdoor_distance ? 'is-invalid' : ''}`}
                            onChange={(val: any) => onInputChange('outdoor_distance', val)}
                            type="number"
                            value={state.outdoor_distance}
                            min={0}
                            id="outdoor_distance"
                            placeholder="5"/>
                    </div>

                    <div className={'ms-input-group'}>
                        <label htmlFor="storage" className="ms-input-group__label">Varasto: *</label>
                        <select
                            className={`ms-input-group__select ${state.hasError && !state.storage ? 'is-invalid' : ''}`}
                            onChange={(val: any) => onInputChange('storage', val)}
                            id="storage"
                            value={state.storage}
                            aria-label="Storage">
                            <option selected>-</option>
                            <option value="1">Varastoa ei ole</option>
                            <option value="2">Kellarikomero / Ulkovarasto</option>
                            <option value="3">Vintti / Ullakko</option>
                        </select>
                    </div>

                    {
                        state.storage === "3" &&
                        <div className="ms-input-group">
                            <label htmlFor="storage_floor" className="ms-input-group__label">Varaston kerros: *</label>
                            <select
                                className={`ms-input-group__select ${state.hasError && !state.storage_floor ? 'is-invalid' : ''}`}
                                onChange={(val: any) => onInputChange('storage_floor', val)}
                                id="storage_floor"
                                value={state.storage_floor}
                                aria-label="Varaston kerros">
                                <option selected>-</option>
                                <option value="1">Kerros 1</option>
                                <option value="2">Kerros 2</option>
                                <option value="3">Kerros 3</option>
                                <option value="4">Kerros 4</option>
                                <option value="5">Kerros 5</option>
                                <option value="6">Kerros 6</option>
                                <option value="7">Kerros 7</option>
                                <option value="8">Kerros 8</option>
                                <option value="9">Kerros 9</option>
                                <option value="10">Kerros 10</option>
                            </select>
                        </div>
                    }

                    <div className={'ms-input-group'}>
                        <label htmlFor="data_time" className="ms-input-group__label">Vuokrauksen alkamispäivä:</label>
                        <DatePicker
                            selected={state.date}
                            onSelect={onDateChange}
                            onChange={onDateChange}
                            value={state.date}
                            minDate={new Date()}
                            // filterDate={isWeekDay}
                            excludeDates={getDisabledDates()}
                            className={`ms-input-group__input ${state.hasError && !state.date ? 'is-invalid' : ''}`}
                            placeholderText={'dd.mm.yyyy'}
                            readonly={true}
                        />
                    </div>
                </div>
            </div>

            <div className="ms-step-nav">
                <BackButton/>
                <button type="button" className="ms-button" onClick={onNext}>Eteenpäin</button>
            </div>
        </div>
    );
}

export default EndBookingRequestDetails;
