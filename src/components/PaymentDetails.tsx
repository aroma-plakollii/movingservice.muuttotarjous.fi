import React, {useContext, useEffect, useRef, useState} from 'react';
import MovingContext, {Company, PaymentMethod, UnitAvailable, Coupon, Product} from "../MovingContext";
import {
    bookUnit, createBooking,
    getCompanies,
    getCompaniesPriceCalculated,
    getPaymentMethods,
    getUnitsAvailable,
    checkCoupon,
    payRightAway
} from "../services/MovingService";
import Loader from "./shared/Loader";
import BackButton from "./shared/BackButton";
import {stringify} from "querystring";
var moment = require('moment');

function PaymentDetails() {
    const {contextState, setContextState} = useContext(MovingContext);
    const [state, setState] = useState({
        loading: false,
        firstName: null,
        lastName: null,
        email: null,
        phone: null,
        paymentMethod: null,
        hasError: false,
    });

    const [coupon, setCoupon] = useState({
        showCouponForm: false,
        couponCode: '',
        couponError: '',
        discountPrice: 0,
        couponIsValid: false
    });

    const [couponError, setCouponError] = useState('');

    const firstNameInputRef: any = useRef(null);
    const lastNameInputRef: any = useRef(null);
    const emailInputRef: any = useRef(null);
    const phoneInputRef: any = useRef(null);
    const paymentMethodInputRef: any = useRef(null);

    useEffect(() => {
        const getPaymentMethods_ = async () => {
            const paymentMethods = await getPaymentMethods();
            console.log(contextState)
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

    const validateCoupon = async () => {
        const data = {
            coupon_code: coupon.couponCode,
            site: "movingservice"
        }

        const res = await checkCoupon(data);

        if (res.error) {
            setCoupon({
                ...coupon,
                discountPrice: 0,
                couponError: res.error
            });
        } else {
            const totalPrice = Number(contextState.movingServiceForm.priceDetails.totalPrice);
            if (res.is_percentage === 1) {
                const discountPercent = Number(res.price) / 100;
                const discountAmount = totalPrice * discountPercent;
                setCoupon({
                    ...coupon,
                    discountPrice: totalPrice - discountAmount,
                    couponError: '',
                    couponIsValid: true,
                });
            } else {
                setCoupon({
                    ...coupon,
                    discountPrice: totalPrice - Number(res.price),
                    couponError: '',
                    couponIsValid: true,
                });
            }
        }
    }

    const submitForm = async (e: any) => {
        e.preventDefault();
        setState({...state, loading: true});
        const startDate = moment(contextState.movingServiceForm.timeAddressForm.date);
        const endDate = moment(contextState.movingServiceForm.timeAddressForm.date);
        // const product = contextState.products.find((product:Product) => product.id === contextState.movingServiceForm.productId);

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

        const company = contextState.companies.find(x => x.id === contextState.movingServiceForm.companyId);
        const unit = contextState.unitsAvailable.find(x => x.id === contextState.movingServiceForm.unitId);

        const data = {
            company_id: contextState.movingServiceForm.companyId,
            price: contextState.movingServiceForm.priceDetails.totalPrice,

            start_date: startDate.format('YYYY-MM-DD HH:mm:ss'),
            end_date: endDate.format('YYYY-MM-DD HH:mm:ss'),

            unit_id: contextState.movingServiceForm.unitId,
            product_id: contextState.movingServiceForm.productId,

            first_name: contextState.movingServiceForm.paymentDetails.firstName,
            last_name: contextState.movingServiceForm.paymentDetails.lastName,

            email: contextState.movingServiceForm.paymentDetails.email,
            phone: contextState.movingServiceForm.paymentDetails.phone,
            //payment_method: contextState.movingServiceForm.paymentDetails.paymentMethod,

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

            coupon_code: coupon.couponCode,
        };

        const res = await createBooking(data);

        if (res) {
            setContextState({
                ...contextState,
                step: contextState.step + 1
            })

            setState({...state, loading: false});
        }
    };

    const onPayRightAway = async (e: any) => {
        e.preventDefault();
        setState({...state, loading: true});
        const startDate = moment(contextState.movingServiceForm.timeAddressForm.date);
        const endDate = moment(contextState.movingServiceForm.timeAddressForm.date);
        const product = contextState.products.find((product:Product) => product.id === contextState.movingServiceForm.productId);

        startDate.set({
            hour: contextState.movingServiceForm.timeAddressForm.time,
            minute: 0,
            minutes: 0,
        })

        endDate.set({
            hour: contextState.movingServiceForm.timeAddressForm.time,
            minute: 0,
            minutes: 0,
        }).add(product?.duration, 'hours')

        const company = contextState.companies.find(x => x.id === contextState.movingServiceForm.companyId);
        const unit = contextState.unitsAvailable.find(x => x.id === contextState.movingServiceForm.unitId);

        const data = {
            company_id: contextState.movingServiceForm.companyId,
            price: contextState.movingServiceForm.priceDetails.totalPrice,

            start_date: startDate.format('YYYY-MM-DD HH:mm:ss'),
            end_date: endDate.format('YYYY-MM-DD HH:mm:ss'),

            unit_id: contextState.movingServiceForm.unitId,
            product_id: contextState.movingServiceForm.productId,

            first_name: contextState.movingServiceForm.paymentDetails.firstName,
            last_name: contextState.movingServiceForm.paymentDetails.lastName,

            email: contextState.movingServiceForm.paymentDetails.email,
            phone: contextState.movingServiceForm.paymentDetails.phone,
            //payment_method: contextState.movingServiceForm.paymentDetails.paymentMethod,

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

            coupon_code: coupon.couponCode,
        };

        const res = await payRightAway(data);

        if (res) {
            window.location.href = res;

            setContextState({
                ...contextState,
                step: contextState.step + 1
            })

            setState({...state, loading: false});
        }
    };

    const getTime = () => {
        const date = moment(contextState.movingServiceForm.timeAddressForm.date);
        date.set({
            hour: contextState.movingServiceForm.timeAddressForm.time,
            minute: 0,
            minutes: 0,
        });

        return `${moment(date).format("HH:mm")}h - ${moment(date).add(2, "hours").format("HH:mm")}`;
    };

    const getProductName = () => {
        return contextState.products.find(x => x.id === contextState.movingServiceForm.productId)?.name;
    };

    const getVanPersons = () => {
        return contextState.unitsAvailable.find(x => x.id === contextState.movingServiceForm.unitId)?.persons;
    };

    if (state.loading) {
        return <>
            <div className="loader-container">
                <Loader color='#74c92c' width={50}/>
            </div>
        </>
    }

    const getFloorName = (floor: any) => {
        let response: string;

        switch (floor) {
            case 'a':
                response = 'Maa-taso';
                break;
            case 'b':
                response = 'Rivitalo 1 kerros';
                break;
            case 'c':
                response = 'Omakotitalo 1 kerros';
                break;
            case 'd':
                response = 'Rivitalo 2 kerros';
                break;
            case 'e':
                response = 'Omakotitalo 2 kerros';
                break;
            default:
                response = `Kerros ${floor}`;
                break;
        }

        return response;
    }

    const getElevatorName = (elevator: any) => {
        let response: string;

        switch (elevator) {
            case '1':
                response = 'Ei hissiä';
                break;
            case '2':
                response = 'Pieni hissi (alle 1m2)';
                break;
            case '3':
                response = 'Iso hisi (1m2 tai isompi)';
                break;
            case '4':
                response = 'Uudiskohde';
                break;
            default:
                response = ``;
                break;
        }

        return response;
    }

    const getStorageName = (storage: any) => {
        let response: string;

        switch (storage) {
            case '1':
                response = 'Varastoa ei ole';
                break;
            case '2':
                response = 'Kellarikaappi / ulkovarasto';
                break;
            case '3':
                response = 'Vintti / Ullakko';
                break;
            default:
                response = ``;
                break;
        }

        return response;
    }

    const cancelCoupon = () => {
        setCoupon({
          showCouponForm: false,
          couponCode: '',
          couponError: '',
          discountPrice: 0,
          couponIsValid: false
        })
    }

    return (

        <>
            <div className={'ms-container'}>
                <div className={"ms-content"}>
                    <h1 className={"ms-content__title"} style={{marginBottom: '20px'}}>Tilauksen tiedot</h1>

                    <dt>
                        Koko nimi: <b>{contextState.movingServiceForm.paymentDetails.firstName} {contextState.movingServiceForm.paymentDetails.lastName}</b>
                    </dt>
                    <dt>
                        Email: <b>{contextState.movingServiceForm.paymentDetails.email}</b>
                    </dt>
                    <dt>
                        Puhelinnumero: <b> {contextState.movingServiceForm.paymentDetails.phone}</b>
                    </dt>

                    <hr className={'divider'} style={{margin: '35px 0', width: '97%'}}/>

                    <dt>
                        Muuttopäivä: <b>{moment(contextState.movingServiceForm.timeAddressForm.date).format('DD.MM.yyyy')}</b>
                    </dt>
                    <dt>Aloitusaika: <b>{getTime()}h</b></dt>
                    <dt>Tuote: <b>{getProductName()}</b></dt>
                    <dt> Asunnon pinta-ala (m2): <b>{contextState.movingServiceForm.timeAddressForm.startAddress.flat_squarem}</b></dt>
                    {coupon.discountPrice !== 0 ? <dt className='discount-price'>Alennushinta: <span>{contextState.movingServiceForm.priceDetails.totalPrice}&euro;</span> <b>{coupon.discountPrice}&euro;</b></dt> : <dt>Maksettava summa: <b>{contextState.movingServiceForm.priceDetails.totalPrice}&euro;</b></dt>}

                    <hr className={'divider'} style={{margin: '35px 0', width: '97%'}}/>

                    <div className={'two-columns'}>
                        <div className={'left'}>
                            <dt>
                                Katuosoite mistä muutto alkaa:
                            </dt>
                            <dt>
                                <b>
                                    {contextState.movingServiceForm.timeAddressForm.startAddress.name}
                                </b>
                            </dt>
                            <dt>Talon numero, rappu ja ovinumero: <b>{contextState.movingServiceForm.timeAddressForm.startAddress.address_number}</b></dt>
                            <dt>Lisätietoa (Esim. ovikoodi): <b>{contextState.movingServiceForm.timeAddressForm.startAddress.door_code}</b></dt>
                            <dt>
                                Valitse kerros: <b>{getFloorName(contextState.movingServiceForm.timeAddressForm.startAddress.floor)}</b>
                            </dt>
                            <dt>
                                Kuinka lähelle muuttoautolla pääsee (m): <b>{contextState.movingServiceForm.timeAddressForm.startAddress.outdoor_distance}</b>
                            </dt>
                            <dt>
                                Hissin koko: <b>{getElevatorName(contextState.movingServiceForm.timeAddressForm.startAddress.elevator)}</b>
                            </dt>
                            <dt>
                                Varasto: <b>{getStorageName(contextState.movingServiceForm.timeAddressForm.startAddress.storage)}</b>
                            </dt>
                            {
                                contextState.movingServiceForm.timeAddressForm.startAddress.storage_area &&
                                <dt>
                                    Varaston koko (m2): <b>{contextState.movingServiceForm.timeAddressForm.startAddress.storage_area}</b>
                                </dt>
                            }
                            {
                                contextState.movingServiceForm.timeAddressForm.startAddress.storage_floor &&
                                <dt>
                                    Varaston kerros: <b>{getFloorName(contextState.movingServiceForm.timeAddressForm.startAddress.storage_floor)}</b>
                                </dt>
                            }
                        </div>
                        <div className={'right'}>
                            <dt className="">
                                Katuosoite mihin muutetaan:
                            </dt>
                            <dt className="col-md-9 col-8">
                                <b>
                                    {contextState.movingServiceForm.timeAddressForm.endAddress.name}
                                </b>
                            </dt>

                            <dt>Talon numero, rappu ja ovinumero: <b>{contextState.movingServiceForm.timeAddressForm.endAddress.address_number}</b></dt>
                            <dt>Lisätietoa (Esim. ovikoodi): <b>{contextState.movingServiceForm.timeAddressForm.endAddress.door_code}</b></dt>
                            <dt className="">
                                Valitse kerros: <b>{getFloorName(contextState.movingServiceForm.timeAddressForm.endAddress.floor)}</b>
                            </dt>
                            <dt>
                                Kuinka lähelle muuttoautolla pääsee (m): <b>{contextState.movingServiceForm.timeAddressForm.endAddress.outdoor_distance}</b>
                            </dt>
                            <dt>
                                Hissin koko: <b>{getElevatorName(contextState.movingServiceForm.timeAddressForm.endAddress.elevator)}</b>
                            </dt>
                            <dt>
                                Varasto: <b>{getStorageName(contextState.movingServiceForm.timeAddressForm.endAddress.storage)}</b>
                            </dt>
                            {
                                contextState.movingServiceForm.timeAddressForm.endAddress.storage_area &&
                                <dt>
                                    Varaston koko (m2): <b>{contextState.movingServiceForm.timeAddressForm.endAddress.storage_area}</b>
                                </dt>
                            }
                            {
                                contextState.movingServiceForm.timeAddressForm.endAddress.storage_floor &&
                                <dt>
                                    Varaston kerros: <b>{getFloorName(contextState.movingServiceForm.timeAddressForm.endAddress.storage_floor)}</b>
                                </dt>
                            }
                        </div>
                    </div>

                    <hr className={'divider'} style={{margin: '35px 0', width: '100%'}}/>

                    {!coupon.couponIsValid && <button type="button" className="ms-link" onClick={() => setCoupon({
                        ...coupon,
                        showCouponForm: !coupon.showCouponForm
                    })}>Käytä kuponki</button>}

                    <div className='ms-coupon'>
                        {coupon.showCouponForm && !coupon.couponIsValid &&
                            <div className='ms-coupon__form'>
                                <input type='text' className='ms-input-group__input' onChange={(e: any) => setCoupon({
                                    ...coupon,
                                    couponCode: e.target.value
                                })}/>
                                <button type="button" className="ms-button" onClick={validateCoupon}>Käyttää</button>
                            </div>
                        }

                        {coupon.couponError && (
                            <p style={{ color: "red" }}>{coupon.couponError}</p>
                        )}
                        {coupon.couponIsValid === true && (
                            <div className='ms-coupon__is-valid'>
                                <p>Käytetty kuponki: <span>{coupon.couponCode}</span></p>
                                <button className="ms-button" style={{backgroundColor: "#6c757d"}} onClick={cancelCoupon}><span>x</span> Peruuttaa</button>
                            </div>

                        )}
                    </div>

                    <hr className={'divider'} style={{margin: '35px 0', width: '100%'}}/>
                </div>

                <div className="ms-step-nav ms-step-nav__buttons">
                    <div className='ms-payment-buttons'>
                        <BackButton/>
                        <button type="button" className="ms-button pay-right-away-button" onClick={onPayRightAway}>Maksan heti/osamaksu/lasku</button>
                    </div>

                    <button type="button" className="ms-button pay-later-button" onClick={submitForm}>Maksan muuton yhteydessä (maksulinkillä)</button>

                </div>
            </div>
        </>

    );
}

export default PaymentDetails;
