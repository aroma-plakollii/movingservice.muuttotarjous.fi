import React, {useContext, useEffect, useRef, useState} from 'react';
import MovingContext, {Company, UnitAvailable} from "../MovingContext";
import {
    getUnitPriceCalculated,
    getUnitsAvailable
} from "../services/MovingService";
import Loader from "./shared/Loader";
import BackButton from "./shared/BackButton";
var moment = require('moment');

function Units() {
    const {contextState, setContextState} = useContext(MovingContext);
    const [state, setState] = useState({
        loading: true,
        time: contextState.movingServiceForm.timeAddressForm.time ? contextState.movingServiceForm.timeAddressForm.time : '',
        hasError: false,
    });
    const timeInputRef: any = useRef(null);

    useEffect(() => {
        const getUnitsAvailable_ = async () => {
            const units = await getUnitPriceCalculated(contextState.movingServiceForm);
            const startDate = moment(contextState.movingServiceForm.timeAddressForm.date).format('YYYY-MM-DD')
            const unitsAvailable = await getUnitsAvailable(contextState.movingServiceForm.companyId, contextState.movingServiceForm.productId, startDate);

            setContextState({
                ...contextState, unitsAvailable ,
                productDescription: units.description,
                 movingServiceForm: {
                    ...contextState.movingServiceForm,
                    priceDetails: {
                        ...contextState.movingServiceForm.priceDetails,
                        price: units[0].pre_price,
                        roadPrice: units[0].road_price,
                        totalPrice: units[0].pre_price
                        // totalPrice: Number(contextState.movingServiceForm.priceDetails.price) + Number(unitsAvailable[0].price)
                    },
                    unitId: unitsAvailable[0].id
                }
            });

            setState({
                ...state, loading: false
            });
        };

        getUnitsAvailable_();
    }, []);

    const selectUnit = (unitId: any,  price: number, roadPrice: number) => {
        console.log(unitId, roadPrice, price)
        setContextState({
            ...contextState,
            movingServiceForm: {
                ...contextState.movingServiceForm,
                priceDetails: {
                    ...contextState.movingServiceForm.priceDetails,
                    price: price,
                    roadPrice: roadPrice,
                    // totalPrice: Number(contextState.movingServiceForm.priceDetails.price) + Number(unit.price)
                    totalPrice: price
                },
                unitId
            }
        })

        console.log(contextState.movingServiceForm)
    };

    const onTimeChange = (val: any) => {
        setState({
            ...state,
            time: val
        });

        updateContextTimeAddressFormKey('time', val);
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

    const submitUnit = () => {
        if (
            !state.time ||
            !contextState.movingServiceForm.unitId
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
            step: 6
        });
    };

    const renderTimes = () => {
        const index = contextState.unitsAvailable.findIndex(
            (x) => x.id === contextState.movingServiceForm.unitId
        );
        const hours = contextState.unitsAvailable[index].hours;
        const hourKeys = Object.keys(hours);
        const now = moment();
        return (
            <div className="radio-group" key={index}>
                {hourKeys.map((x, index:number) => {
                    if (index % 4 === 0) {
                        let isDisabled = false;
                        if (!hours[x]) isDisabled = true;
                        now.set({
                            hour: x,
                            minute: 0,
                            minutes: 0,
                        });
                        const value = `${now.format("HH:mm")}h - ${now.add(2, "hours").format("HH:mm")}h`;

                        return (
                            <label key={x} className="radio" onClick={() => {
                                if (!isDisabled) {
                                    onTimeChange(x);
                                }
                            }}>
                                <input
                                    type="radio"
                                    name="time"
                                    value={value}
                                    className="radio-input"
                                    disabled={!hours[x] ? true : false}
                                />
                                <span className="radio-label">{value}</span>
                            </label>
                        );
                    }
                })}
            </div>
        );
    };

    if (state.loading) {
        return <>
            <div className="loader-container">
                <Loader color='#74c92c' width={50}/>
            </div>
        </>
    }

    return (
        <div className={'ms-container'}>
            <h1 className="ms-title">Valitse kuljetus</h1>
            <div dangerouslySetInnerHTML={{ __html: contextState.productDescription }} />

            <div className={'units'}>
                <div className={'units__list'}>
                    {contextState.unitsAvailable.map((x: UnitAvailable) => {
                        const hours = x.hours;
                        const hourKeys = Object.keys(hours);
                        const shouldShowPrice = hourKeys.some((key, index) => {
                            const isFirstThreeHours = index % 4 < 3;
                            const isHourDisabled = !hours[key];
                            const remainingHours = hourKeys.slice(-3);

                            if (isFirstThreeHours && !isHourDisabled) {
                                return true;
                            } else if (((index + 1) % 4 === 0 || remainingHours.every((key) => !hours[key])) && isHourDisabled) {
                                for (let i = index - 2; i <= index; i++) {
                                    if (hours[hourKeys[i]]) {
                                        return true;
                                    }
                                }
                            }

                            return false;
                        });

                        // const price = (Number(contextState.movingServiceForm.priceDetails.price) + Number(x.price)) + ' €';

                        return (
                            <div
                                className={`units__list__item ${contextState.movingServiceForm.unitId === x.id ? 'active' : ''}`}
                                onClick={() => selectUnit(x.id, contextState.movingServiceForm.priceDetails.price, contextState.movingServiceForm.priceDetails.roadPrice)}
                            >
                                <div className="left">
                                    <img className="vehicle" src={x.image} />
                                    <span>
                                        {x.persons} Henkilöt, {x.capacity} m<sup>3</sup>
                                    </span>
                                </div>
                                <div className="right">
                                    {!shouldShowPrice ? '' : (
                                        <span className="price">{contextState.movingServiceForm.priceDetails.price} €</span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {
                state.hasError && !state.time &&
                <p className={'error'}>Valitse alkamisaika - se on pakollinen tieto.</p>
            }

            {
                contextState.movingServiceForm.unitId &&
                <div className="units_list__times">
                    <span className={'units_list__times__label'}>Valitse aloitusaikataulu:</span>
                    {renderTimes()}
                </div>
            }

            <div className="ms-step-nav">
                <BackButton/>
                <button type="button" className="ms-button" onClick={submitUnit}>Eteenpäin</button>
            </div>
        </div>
    );
}

export default Units;
