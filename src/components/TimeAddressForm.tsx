import React, {useContext, useEffect, useState} from 'react';
import MovingContext from "../MovingContext";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByPlaceId } from 'react-google-places-autocomplete';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {GMAPKEY} from "../config";
import Loader from "./shared/Loader";
import BackButton from "./shared/BackButton";

function TimeAddressForm() {
    const {contextState, setContextState} = useContext(MovingContext);
    const [state, setState] = useState({
        loading: false,
        startAddress: null,
        endAddress: null,
        date: null,
        time: null,
        hasError: false
    });

    useEffect(() => {

    }, []);

    const onStartAddressChange = async (val: any) => {
        const geoCode = await geocodeByPlaceId(val.value.place_id);
        let city = '';
        if (geoCode && geoCode.length > 0) {
            geoCode[0].address_components.forEach(addressComponent => {
                if (addressComponent.types[0] === 'locality') {
                    city = addressComponent.long_name;
                }
            })
        }
        setState({
            ...state,
            startAddress: val
        });
        updateContextTimeAddressFormKey(
            'startAddress',
            {
                name: val.value.description,
                city,
                placeId: val.value.place_id,
            }
        );
    };

    const onEndAddressChange = async (val: any) => {
        const geoCode = await geocodeByPlaceId(val.value.place_id);
        let city = '';
        if (geoCode && geoCode.length > 0) {
            geoCode[0].address_components.forEach(addressComponent => {
                if (addressComponent.types[0] === 'locality') {
                    city = addressComponent.long_name;
                }
            })
        }
        setState({
            ...state,
            endAddress: val
        });
        updateContextTimeAddressFormKey(
            'endAddress',
            {
                name: val.value.description,
                city,
                placeId: val.value.place_id,
            }
        );
    };

    const onDateChange = (val: any) => {
        setState({
            ...state,
            date: val
        });
        updateContextTimeAddressFormKey('date', val);
    };

    const updateContextTimeAddressFormKey = (key: string, value: any) => {
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

    const isWeekDay = (date: Date) => {
        const day = date.getDay();
        return day !== 0 && day !== 6;
    };

    const getDisabledDates = (): Date[] => {
        return [new Date(2022, 2, 16)];
    };

    const submitTimeAddress = () => {
        if (
            !state.startAddress ||
            !state.endAddress ||
            !state.date
        ) {
            setState({
                ...state,
                hasError: true
            });
            return;
        }

        setState({
            ...state,
            hasError: false,
            loading: true
        });

        setContextState({
            ...contextState,
            step: 3
        });
    };

    return (
        <>
            <div className="search-companies">
                <h1 className="title">Varaa Kätevästi. Kuljeta helposti.</h1>
                <form className="row g-3">
                    <div className="col-12">
                        <label htmlFor="start_address" className="form-label">Katuosoite ja talon numero mistä muutto alkaa: *</label>
                        <div className="input_wrap">
                            <GooglePlacesAutocomplete
                                apiKey={GMAPKEY}
                                selectProps={{
                                    value: state.startAddress,
                                    onChange: onStartAddressChange,
                                    placeholder: 'Esimerkikatu 1, Helsinki',

                                }}
                                apiOptions={
                                    {
                                        language: 'fi',
                                        region: 'fi'
                                    }
                                }
                                autocompletionRequest={{
                                    componentRestrictions: { country: 'fi' },
                                    types: ['address'],
                                }}
                            />
                            {
                                state.hasError && !state.startAddress && <span className={'d-block text-danger pt-2'}>Valitse osoite avattavasta luettelosta kirjoittaessasi</span>
                            }
                        </div>
                    </div>
                    <div className="col-12">
                        <label htmlFor="end_address" className="form-label">
                            Katuosoite ja talon numero mihin muutetaan: *
                        </label>
                        <div className="input_wrap">
                            <GooglePlacesAutocomplete
                                apiKey={GMAPKEY}
                                selectProps={{
                                    value: state.endAddress,
                                    onChange: onEndAddressChange,
                                    placeholder: 'Esimerkikatu 1, Helsinki',
                                }}
                                apiOptions={{ language: 'fi', region: 'fi' }}
                                autocompletionRequest={{
                                    componentRestrictions: { country: 'fi' },
                                    types: ['address']
                                }}
                            />
                            {
                                state.hasError && !state.endAddress && <span className={'d-block text-danger pt-2'}>Valitse osoite avattavasta luettelosta kirjoittaessasi</span>
                            }
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <label htmlFor="data_time" className="form-label">Vuokrauksen alkamispäivä:</label>
                        <br/>
                        <DatePicker
                            selected={state.date}
                            onSelect={onDateChange}
                            onChange={onDateChange}
                            minDate={new Date()}
                            filterDate={isWeekDay}
                            excludeDates={getDisabledDates()}
                            className={`muutto-datepicker form-control ${state.hasError && !state.date ? 'is-invalid' : ''}`}
                            placeholderText={'dd.mm.yyyy'}
                        />
                    </div>
                    <div className="d-flex justify-content-between gap-2 mt-4">
                        <BackButton/>
                        <button type="button" className="btn btn-lg btn-primary" onClick={submitTimeAddress}>
                            {
                                state.loading ? <Loader /> : 'Eteenpäin'
                            }
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default TimeAddressForm;
