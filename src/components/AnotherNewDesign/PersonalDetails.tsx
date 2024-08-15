import {
    Container,
    Box,
    Typography,
    FormControl,
    Button,
    InputLabel,
    Select,
    Stack,
    OutlinedInput,
    List,
    MenuItem,
    FormControlLabel,
    FormLabel,
    Divider,
    Radio,
    RadioGroup,
    ListItem, CircularProgress
} from '@mui/material';
import React, {useContext, useEffect, useRef, useState} from 'react';
import MovingContext, {IProductType, PaymentMethod, Product, UnitAvailable} from "../../MovingContext";
import {
    checkCoupon, createBooking,
    getCompanies, getExtraPriceCalculated,
    getPaymentMethods,
    getProductTypes,
    getUnitsAvailable, payRightAway
} from "../../services/MovingService";
import Loader from "./../shared/Loader";
import BackButton from "./../shared/BackButton";
var moment = require('moment');

const PersonalDetails = () => {
    const {contextState, setContextState} = useContext(MovingContext);
    const [state, setState] = useState({
        loading: true,
        firstName: contextState.movingServiceForm.paymentDetails ? contextState.movingServiceForm.paymentDetails.firstName : '',
        lastName: contextState.movingServiceForm.paymentDetails ? contextState.movingServiceForm.paymentDetails.lastName : '',
        email: contextState.movingServiceForm.paymentDetails ? contextState.movingServiceForm.paymentDetails.email : '',
        phone: contextState.movingServiceForm.paymentDetails ? contextState.movingServiceForm.paymentDetails.phone : '',
        startAddress: {
            address_number: contextState.movingServiceForm?.timeAddressForm ? contextState.movingServiceForm.timeAddressForm.startAddress.address_number : '',
            door_code: contextState.movingServiceForm?.timeAddressForm ? contextState.movingServiceForm.timeAddressForm.startAddress.door_code : '',
            flat_squarem: contextState.movingServiceForm?.timeAddressForm ? contextState.movingServiceForm.timeAddressForm.startAddress.flat_squarem : '',
            floor: contextState.movingServiceForm?.timeAddressForm ? contextState.movingServiceForm.timeAddressForm.startAddress.floor : '',
            outdoor_distance: contextState.movingServiceForm?.timeAddressForm ? contextState.movingServiceForm.timeAddressForm.startAddress.outdoor_distance : '',
            elevator: contextState.movingServiceForm?.timeAddressForm ? contextState.movingServiceForm.timeAddressForm.startAddress.elevator : '',
            storage: contextState.movingServiceForm?.timeAddressForm ? contextState.movingServiceForm.timeAddressForm.startAddress.storage : '',
            storage_area: contextState.movingServiceForm?.timeAddressForm ? contextState.movingServiceForm.timeAddressForm.startAddress.storage_area : '',
            storage_floor: contextState.movingServiceForm?.timeAddressForm ? contextState.movingServiceForm.timeAddressForm.startAddress.storage_floor : '',
        },
        endAddress: {
            address_number: contextState.movingServiceForm.timeAddressForm.endAddress ? contextState.movingServiceForm.timeAddressForm.endAddress.address_number : '',
            door_code: contextState.movingServiceForm.timeAddressForm.endAddress ? contextState.movingServiceForm.timeAddressForm.endAddress.door_code : '',
            flat_squarem: contextState.movingServiceForm.timeAddressForm.endAddress ? contextState.movingServiceForm.timeAddressForm.endAddress.flat_squarem : '',
            floor: contextState.movingServiceForm.timeAddressForm.endAddress ? contextState.movingServiceForm.timeAddressForm.endAddress.floor : '',
            outdoor_distance: contextState.movingServiceForm.timeAddressForm.endAddress ? contextState.movingServiceForm.timeAddressForm.endAddress.outdoor_distance : '',
            elevator: contextState.movingServiceForm.timeAddressForm.endAddress ? contextState.movingServiceForm.timeAddressForm.endAddress.elevator : '',
            storage: contextState.movingServiceForm.timeAddressForm.endAddress ? contextState.movingServiceForm.timeAddressForm.endAddress.storage : '',
            storage_area: contextState.movingServiceForm.timeAddressForm.endAddress ? contextState.movingServiceForm.timeAddressForm.endAddress.storage_area : '',
            storage_floor: contextState.movingServiceForm.timeAddressForm.endAddress ? contextState.movingServiceForm.timeAddressForm.endAddress.storage_floor : '',
        },
        productTypes: [] as IProductType[],
    });
    const [errors, setErrors] = useState({
        firstName: false,
        lastName: false,
        email: false,
        phone: false,
        start_address_number: false,
        end_address_number: false,
    });

    const [paymentInProgress, setPaymentInProgress] = useState(false);

    const [coupon, setCoupon] = useState({
        showCouponForm: true,
        couponCode: '',
        couponError: '',
        discountPrice: 0,
        couponIsValid: false
    });

    useEffect(() => {
        postHeightToParent();
    }, []);

    useEffect(() => {
        const __init = async () => {
            const productTypes = await getProductTypes();

            setState({...state, productTypes, loading: false});
        };

        __init();
    }, [state.startAddress.storage, state.endAddress.storage]);

    useEffect(() => {
        const updateContextAndCalculatePrice = async () => {
            const res = await getExtraPriceCalculated(contextState.movingServiceForm);

            if (res) {
                setContextState({
                    ...contextState,
                    movingServiceForm: {
                        ...contextState.movingServiceForm,
                        priceDetails: {
                            ...contextState.movingServiceForm.priceDetails,
                            totalPrice: res.totalPrice,
                            discountPrice: res.discountedPrice
                        }
                    }
                });
            }
        };

        updateContextAndCalculatePrice();
    }, [
        state.startAddress.address_number,
        state.startAddress.door_code,
        state.startAddress.flat_squarem,
        state.startAddress.floor,
        state.startAddress.outdoor_distance,
        state.startAddress.elevator,
        state.startAddress.storage,
        state.startAddress.storage_area,
        state.startAddress.storage_floor,
        state.endAddress.address_number,
        state.endAddress.door_code,
        state.endAddress.flat_squarem,
        state.endAddress.floor,
        state.endAddress.outdoor_distance,
        state.endAddress.elevator,
        state.endAddress.storage,
        state.endAddress.storage_area,
        state.endAddress.storage_floor
    ]);

    const postHeightToParent = () => {
        const height = document.documentElement.scrollHeight;
        window.parent.postMessage(height, "*");
    }

    const onInputChange = (key: string, val: any) => {
        const value = val.target ? val.target.value : '';
        setState({
            ...state,
            [key]: value
        });
        setErrors({...errors, [key]: !value ? true : false });
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

    const onInputStartAddressChange = async (key: string, val: any) => {
        const value = val.target ? val.target.value : '';

        setState({
            ...state,
            startAddress: {
                ...state.startAddress,
                [key]: value
            }
        });
        setErrors({...errors, start_address_number: !value ? true : false });
        updateContextStartTimeAddressFormKey(key, value);
    };

    const updateContextStartTimeAddressFormKey = (key: string, value: any) => {
        setContextState({
            ...contextState,
            movingServiceForm: {
                ...contextState.movingServiceForm,
                timeAddressForm: {
                    ...contextState.movingServiceForm.timeAddressForm,
                    'startAddress': {
                        ...contextState.movingServiceForm.timeAddressForm['startAddress'],
                        [key]: value
                    }
                }
            }
        })
    };

    const onInputEndAddressChange = (key: string, val: any) => {
        const value = val.target ? val.target.value : '';

        setState({
            ...state,
            endAddress: {
                ...state.endAddress,
                [key]: value
            }
        });
        setErrors({...errors, end_address_number: !value ? true : false });
        updateContextEndTimeAddressFormKey(key, value);
    };

    const updateContextEndTimeAddressFormKey = (key: string, value: any) => {
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

    const getServiceName = () => {
        const productType = state.productTypes.find((productType: any) => productType.id === contextState.movingServiceForm.productType);
        const productTypeName = productType?.name ? productType?.name : '';

        return productTypeName;
    }

    const getProductName = () => {
        const product = contextState.products.find((product: any) => product.id === contextState.movingServiceForm.productId);
        const productName = product?.name ? product.name : '';

        return productName;
    }

    const getTime = () => {
        const date = moment(contextState.movingServiceForm.timeAddressForm.date);
        date.set({
            hour: contextState.movingServiceForm.timeAddressForm.time,
            minute: 0,
            minutes: 0,
        });

        return `${moment(date).format("HH:mm")}h - ${moment(date).add(2, "hours").format("HH:mm")}`;
    };

    const validateCoupon = async () => {
        const data = {
            coupon_code: coupon.couponCode,
            company_id: contextState.movingServiceForm.companyId
        }

        const res = await checkCoupon(data);

        if (res.error) {
            setCoupon({
                ...coupon,
                discountPrice: 0,
                couponError: res.error
            });
        } else {
            const price = contextState.movingServiceForm.priceDetails.discountPrice > 0 ? Number(contextState.movingServiceForm.priceDetails.discountPrice) : Number(contextState.movingServiceForm.priceDetails.totalPrice);
            if (res.is_percentage === 1) {
                const discountPercent = Number(res.price) / 100;
                const discountAmount = price * discountPercent;
                const roundedDiscountedAmount = Number(discountAmount.toFixed(2));
                const result = price - roundedDiscountedAmount;
                const roundedResult = Number(result.toFixed(2));
                setCoupon({
                    ...coupon,
                    showCouponForm: false,
                    discountPrice: roundedResult,
                    couponError: '',
                    couponIsValid: true,
                });
            } else {
                setCoupon({
                    ...coupon,
                    showCouponForm: false,
                    discountPrice: price - Number(res.price),
                    couponError: '',
                    couponIsValid: true,
                });
            }
        }
    }

    const cancelCoupon = () => {
        setCoupon({
            showCouponForm: true,
            couponCode: '',
            couponError: '',
            discountPrice: 0,
            couponIsValid: false
        })
    }

    const submitForm = async (e: any) => {

        e.preventDefault();
        console.log(paymentInProgress)

        if (paymentInProgress) {
            return;
        }

        setPaymentInProgress(true);

        if (
            !state.firstName || !state.lastName || !state.email || !state.phone
            || !state.startAddress.address_number || !state.endAddress.address_number
        ) {
            setErrors({
                ...errors,
                firstName: !state.firstName ? true : false,
                lastName: !state.lastName ? true : false,
                email: !state.email ? true : false,
                phone: !state.phone ? true : false,
                start_address_number: !state.startAddress.address_number ? true : false,
                end_address_number: !state.endAddress.address_number ? true : false,
            });
            setPaymentInProgress(false);
            return;
        }

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
            company_id: contextState.movingServiceForm.companyId,
            price: contextState.movingServiceForm.priceDetails.discountPrice !== 0 ? contextState.movingServiceForm.priceDetails.discountPrice : contextState.movingServiceForm.priceDetails.totalPrice,

            start_date: startDate.format('YYYY-MM-DD HH:mm:ss'),
            end_date: endDate.format('YYYY-MM-DD HH:mm:ss'),

            unit_id: contextState.movingServiceForm.unitId,
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

            coupon_code: coupon.couponCode,
        };

        try {
            const res = await createBooking(data);

            if (res) {
                setContextState({
                    ...contextState,
                    step: contextState.step + 1
                });
            }
        } finally {
            setPaymentInProgress(false);
            setState({ ...state, loading: false });
        }
    };

    const onPayRightAway = async (e: any) => {
        e.preventDefault();

        if (paymentInProgress) {
            return;
        }

        setPaymentInProgress(true);

        if (
            !state.firstName || !state.lastName || !state.email || !state.phone
            || !state.startAddress.address_number || !state.endAddress.address_number
        ) {
            setErrors({
                ...errors,
                firstName: !state.firstName ? true : false,
                lastName: !state.lastName ? true : false,
                email: !state.email ? true : false,
                phone: !state.phone ? true : false,
                start_address_number: !state.startAddress.address_number ? true : false,
                end_address_number: !state.endAddress.address_number ? true : false,
            });
            setPaymentInProgress(false);

            return;
        }

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

        const data = {
            company_id: contextState.movingServiceForm.companyId,
            price: contextState.movingServiceForm.priceDetails.discountPrice !== 0 ? contextState.movingServiceForm.priceDetails.discountPrice : contextState.movingServiceForm.priceDetails.totalPrice,

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

        try {
            const res = await payRightAway(data);

            if (res) {
                window.open(res, '_blank');

                setContextState({
                    ...contextState,
                    step: contextState.step + 1
                });
            }
        } finally {
            setPaymentInProgress(false);
            setState({ ...state, loading: false });
        }
    };

    if (state.loading) {
        return(
            <Box sx={{width: '100%', height: '100vh', display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                <CircularProgress color="success" />
            </Box>
        )
    }


    return (
            <Container sx={{display: 'flex', alignItems: "center", flexDirection: 'column', marginTop: '1rem'}}>
                <Box sx={{width: '90%',borderRadius: '12px', boxShadow: '0px 13px 47px -30px rgba(87,87,87,0.58)', border: 'solid 1px #d3d3d366', padding: '3rem 3rem 1.5rem 3rem', mb: '40px',
                        '@media screen and (max-width: 768px)': { padding: '1.5rem'}}}>

                    <Box sx={{
                        display: 'flex',
                        '@media screen and (max-width: 768px)': {flexDirection: 'column'}}}>

                        <Box sx={{width: '60%', '@media screen and (max-width: 768px)': {width: '100%'}}}>
                            <Stack
                                spacing={2}
                                component="form"
                                sx={{border: '1px solid #d3cfcf', borderRadius: '10px', padding: '1.5rem 2rem', marginBottom: '2.5rem',
                                    '@media screen and (max-width: 348px)': {
                                        padding: '1.5rem 1rem',
                                    }}}
                            >
                                <Box>
                                    <Typography variant="h6" component="h1" sx={{marginBottom: '0.5rem'}}>
                                        Henkilökohtaiset tiedot
                                    </Typography>
                                </Box>

                                <FormControl>
                                    <InputLabel
                                        htmlFor="firstName"
                                        id="firstName"
                                        sx={{
                                            top: '-3px',
                                            fontSize: '14px',
                                            '&.Mui-focused': {
                                                color: 'green',
                                            },
                                            '@media screen and (max-width: 348px)': {
                                                fontSize: '13px',
                                            }
                                        }}
                                    >
                                        Etunimi
                                    </InputLabel>
                                    <OutlinedInput
                                        error={errors.firstName}
                                        id="firstName"
                                        label="Etunimi"
                                        onChange={(val: any) => onInputChange('firstName', val)}
                                        value={state.firstName}
                                        sx={{
                                            backgroundColor: 'white',
                                            height: '2.9rem',
                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#74c92c',
                                            },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#74c92c',
                                            },
                                            '@media screen and (max-width: 348px)': {
                                                fontSize: '13px',
                                            }
                                        }}
                                    />
                                </FormControl>

                                <FormControl>
                                    <InputLabel
                                        htmlFor="lastName"
                                        id="lastName"
                                        sx={{
                                            top: '-3px',
                                            fontSize: '15px',
                                            '&.Mui-focused': {
                                                color: 'green',
                                            },
                                            '@media screen and (max-width: 348px)': {
                                                fontSize: '13px',
                                            }
                                        }}
                                    >
                                        Sukunimi
                                    </InputLabel>
                                    <OutlinedInput
                                        error={errors.lastName}
                                        id="lastName"
                                        label="Sukunimi"
                                        onChange={(val: any) => onInputChange('lastName', val)}
                                        value={state.lastName}
                                        sx={{
                                            backgroundColor: 'white',
                                            height: '2.9rem',
                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#74c92c',
                                            },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#74c92c',
                                            },
                                            '@media screen and (max-width: 348px)': {
                                                fontSize: '13px',
                                            }
                                        }}
                                    />
                                </FormControl>

                                <FormControl>
                                    <InputLabel
                                        htmlFor="email"
                                        id="email"
                                        sx={{
                                            top: '-3px',
                                            fontSize: '15px',
                                            '&.Mui-focused': {
                                                color: 'green',
                                            },
                                            '@media screen and (max-width: 348px)': {
                                                fontSize: '13px',
                                            }
                                        }}
                                    >
                                        Email
                                    </InputLabel>
                                    <OutlinedInput
                                        error={errors.email}
                                        id="email"
                                        label="Email"
                                        onChange={(val: any) => onInputChange('email', val)}
                                        value={state.email}
                                        sx={{
                                            backgroundColor: 'white',
                                            height: '2.9rem',
                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#74c92c',
                                            },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#74c92c',
                                            },
                                            '@media screen and (max-width: 348px)': {
                                                fontSize: '13px',
                                            }
                                        }}
                                    />
                                </FormControl>

                                <FormControl>
                                    <InputLabel
                                        htmlFor="phone"
                                        id="phone"
                                        sx={{
                                            top: '-3px',
                                            fontSize: '15px',
                                            '&.Mui-focused': {
                                                color: 'green',
                                            },
                                            '@media screen and (max-width: 348px)': {
                                                fontSize: '13px',
                                            }
                                        }}
                                    >
                                        Puhelinnumero
                                    </InputLabel>
                                    <OutlinedInput
                                        error={errors.phone}
                                        id="phone"
                                        label="Puhelinnumero"
                                        onChange={(val: any) => onInputChange('phone', val)}
                                        value={state.phone}
                                        sx={{
                                            backgroundColor: 'white',
                                            height: '2.9rem',
                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#74c92c',
                                            },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#74c92c',
                                            },
                                            '@media screen and (max-width: 348px)': {
                                                fontSize: '13px',
                                            }
                                        }}
                                    />
                                </FormControl>
                            </Stack >

                            <Box sx={{border: '1px solid #d3cfcf', borderRadius: '10px', padding: '1.5rem 2rem',
                                '@media screen and (max-width: 348px)': {
                                    padding: '1.5rem 1rem'
                                }}}>
                                <Box>
                                    <Typography variant="h6" component="h1" sx={{marginBottom: '0.5rem'}}>
                                        Tilauksen tiedot
                                    </Typography>
                                </Box>

                                <List>
                                    <ListItem  sx={{display: 'block', padding: '0'}}>
                                        <Box sx={{display: 'flex', '@media screen and (max-width: 576px)': {flexDirection: 'column'},}}> <Typography sx={{width: '35%',fontSize: '15px', marginRight: '5rem'}}>Palvelun tiedot:</Typography> <Typography sx={{fontWeight: 'bold', fontSize: '15px'}}>{getServiceName()}</Typography> </Box>
                                        <Divider sx={{marginY: '0.5rem'}}/>
                                        <Box sx={{display: 'flex', '@media screen and (max-width: 576px)': {flexDirection: 'column'}}}><Typography sx={{width: '35%',fontSize: '15px', marginRight: '5rem'}}>Palvelu:</Typography> <Typography sx={{fontWeight: 'bold', fontSize: '15px'}}>{getProductName()}</Typography> </Box>
                                        <Divider sx={{marginY: '0.5rem'}}/>
                                        <Box sx={{display: 'flex', '@media screen and (max-width: 576px)': {flexDirection: 'column'}}}><Typography sx={{width: '35%',fontSize: '15px', marginRight: '5rem'}}>Muuttopäivä:</Typography> <Typography sx={{fontWeight: 'bold', fontSize: '15px'}}>{moment(contextState.movingServiceForm.timeAddressForm.date).format('DD.MM.yyyy')}</Typography></Box>
                                        <Divider sx={{marginY: '0.5rem'}}/>
                                        <Box sx={{display: 'flex', '@media screen and (max-width: 576px)': {flexDirection: 'column'} }}><Typography sx={{width: '35%',fontSize: '15px', marginRight: '5rem'}}>Aloitusaika:</Typography> <Typography sx={{fontWeight: 'bold', fontSize: '15px'}}>{getTime()}h</Typography> </Box>
                                        <Divider sx={{marginY: '0.5rem'}}/>
                                        <Box sx={{display: 'flex', '@media screen and (max-width: 576px)': {flexDirection: 'column'}}}><Typography sx={{width: '35%',fontSize: '15px', marginRight: '5rem'}}>{contextState.movingServiceForm.priceDetails.discountPrice > 0 ? 'Alennushinta:' : 'Maksettava summa:'}</Typography>
                                            {contextState.movingServiceForm.priceDetails.discountedPrice > 0 ?
                                                (<Box sx={{display: 'flex', alignItems: 'center'}}>
                                                    <Typography sx={{fontWeight: 'normal', color: 'grey', textDecoration: 'line-through',fontSize: '13px', mr: '7px'}}>{contextState.movingServiceForm.priceDetails.totalPrice}&euro;</Typography>
                                                    <Typography sx={{fontWeight: 'bold', fontSize: '15px'}}>{coupon.discountPrice !== 0 ? coupon.discountPrice : contextState.movingServiceForm.priceDetails.discountPrice}&euro;</Typography>
                                                </Box>) :
                                                (coupon.discountPrice !== 0 ?
                                                    (<Box sx={{display: 'flex', alignItems: 'center',}}>
                                                        <Typography sx={{fontWeight: 'normal', color: 'grey', textDecoration: 'line-through',fontSize: '13px', mr: '7px'}}>{contextState.movingServiceForm.priceDetails.totalPrice}&euro;</Typography>
                                                        <Typography sx={{fontWeight: 'bold', fontSize: '15px'}}>{coupon.discountPrice !== 0 ? coupon.discountPrice : contextState.movingServiceForm.priceDetails.totalPrice}&euro;</Typography>
                                                    </Box>) :
                                                    (<Typography sx={{fontWeight: 'bold', fontSize: '15px', marginBottom: '1.5rem'}}>{contextState.movingServiceForm.priceDetails.totalPrice}&euro;
                                                    </Typography>))
                                            }
                                        </Box>
                                        <Divider sx={{marginY: '0.5rem'}}/>
                                    </ListItem>
                                </List>

                                <Stack
                                    spacing={2}
                                    component="form"
                                >
                                    <List>
                                        <Box>
                                            <Typography sx={{fontSize: '15px', marginY: '0.5rem'}}>Katuosoite mistä muutto alkaa:</Typography>
                                            <Typography sx={{fontWeight: 'bold', fontSize: '15px'}}>{contextState.movingServiceForm.timeAddressForm.startAddress.name}</Typography>
                                        </Box>
                                    </List>
                                    <FormControl>
                                        <InputLabel
                                            htmlFor="phone"
                                            id="phone"
                                            sx={{
                                                top: '-3px',
                                                fontSize: '15px',
                                                '&.Mui-focused': {
                                                    color: 'green',
                                                },
                                                '@media screen and (max-width: 348px)': {
                                                    fontSize: '13px',
                                                }
                                            }}
                                        >
                                            Talon numero, rappu ja ovinumero:*
                                        </InputLabel>
                                        <OutlinedInput
                                            error={errors.start_address_number}
                                            id="address_number"
                                            label="Talon numero, rappu ja ovinumero:*"
                                            onChange={(val: any) => onInputStartAddressChange('address_number', val)}
                                            value={state.startAddress.address_number}
                                            sx={{
                                                backgroundColor: 'white',
                                                height: '2.9rem',
                                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#74c92c',
                                                },
                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#74c92c',
                                                },
                                                '@media screen and (max-width: 348px)': {
                                                    fontSize: '13px',
                                                }
                                            }}
                                        />
                                    </FormControl>

                                    <FormControl>
                                        <InputLabel
                                            htmlFor="phone"
                                            id="phone"
                                            sx={{
                                                top: '-3px',
                                                fontSize: '15px',
                                                '&.Mui-focused': {
                                                    color: 'green',
                                                },
                                                '@media screen and (max-width: 348px)': {
                                                    fontSize: '13px',
                                                }
                                            }}
                                        >
                                            Lisätietoa (Esim. ovikoodi):*
                                        </InputLabel>
                                        <OutlinedInput
                                            id="door_code"
                                            label="Lisätietoa (Esim. ovikoodi):*"
                                            onChange={(val: any) => onInputStartAddressChange('door_code', val)}
                                            value={state.startAddress.door_code}
                                            sx={{
                                                backgroundColor: 'white',
                                                height: '2.9rem',
                                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#74c92c',
                                                },
                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#74c92c',
                                                },
                                                '@media screen and (max-width: 348px)': {
                                                    fontSize: '13px',
                                                }
                                            }}
                                        />
                                    </FormControl>

                                    <List>
                                        <Box>
                                            <Typography sx={{fontSize: '15px', marginY: '0.5rem'}}>Katuosoite mihin muutetaan:</Typography>
                                            <Typography sx={{fontWeight: 'bold', fontSize: '15px'}}>{contextState.movingServiceForm.timeAddressForm.endAddress.name}</Typography>
                                        </Box>
                                    </List>

                                    <FormControl>
                                        <InputLabel
                                            htmlFor="phone"
                                            id="phone"
                                            sx={{
                                                top: '-3px',
                                                fontSize: '15px',
                                                '&.Mui-focused': {
                                                    color: 'green',
                                                },
                                                '@media screen and (max-width: 348px)': {
                                                    fontSize: '13px',
                                                }
                                            }}
                                        >
                                            Talon numero, rappu ja ovinumero*
                                        </InputLabel>
                                        <OutlinedInput
                                            error={errors.end_address_number}
                                            id="address_number"
                                            label="Talon numero, rappu ja ovinumero*"
                                            onChange={(val: any) => onInputEndAddressChange('address_number', val)}
                                            value={state.endAddress.address_number}
                                            sx={{
                                                backgroundColor: 'white',
                                                height: '2.9rem',
                                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#74c92c',
                                                },
                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#74c92c',
                                                },
                                                '@media screen and (max-width: 348px)': {
                                                    fontSize: '13px',
                                                }
                                            }}
                                        />
                                    </FormControl>

                                    <FormControl>
                                        <InputLabel
                                            htmlFor="phone"
                                            id="phone"
                                            sx={{
                                                top: '-3px',
                                                fontSize: '15px',
                                                '&.Mui-focused': {
                                                    color: 'green',
                                                },
                                                '@media screen and (max-width: 348px)': {
                                                    fontSize: '13px',
                                                }
                                            }}
                                        >
                                            Lisätietoa (Esim. ovikoodi):*
                                        </InputLabel>
                                        <OutlinedInput
                                            id="door_code"
                                            label="Lisätietoa (Esim. ovikoodi):*"
                                            onChange={(val: any) => onInputEndAddressChange('door_code', val)}
                                            value={state.endAddress.door_code}
                                            sx={{
                                                backgroundColor: 'white',
                                                height: '2.9rem',
                                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#74c92c',
                                                },
                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#74c92c',
                                                },
                                                '@media screen and (max-width: 348px)': {
                                                    fontSize: '13px',
                                                }
                                            }}
                                        />
                                    </FormControl>

                                    <Divider sx={{margin: '2rem 0 0.5rem 0 !important'}} />

                                    <Box sx={{marginBottom: '1rem !important'}}>
                                        <Typography variant="h6" component="h1" sx={{marginBottom: '0.5rem'}}>
                                            Mistä muutetaan
                                        </Typography>
                                        <Typography sx={{fontSize: '14px', textAlign: 'justify','@media screen and (max-width: 576px)': {textAlign: 'left'}}}>
                                            Anna osoite, mistä muutto alkaa. Näet saatavilla olevat muuttopäivät ja tarkennetun hinnan osoitteiden syöttämisen jälkeen
                                        </Typography>
                                    </Box>

                                    <FormControl>
                                        <InputLabel
                                            htmlFor="flat_squarem"
                                            id="flat_squarem"
                                            sx={{
                                                top: '-3px',
                                                fontSize: '15px',
                                                '&.Mui-focused': {
                                                    color: 'green',
                                                },
                                                '@media screen and (max-width: 348px)': {
                                                    fontSize: '13px',
                                                }
                                            }}
                                        >
                                            Asunnon pinta-ala (m2):*
                                        </InputLabel>
                                        <OutlinedInput
                                            id="flat_squarem"
                                            label="Asunnon pinta-ala (m2):*"
                                            onChange={(val: any) => onInputStartAddressChange('flat_squarem', val)}
                                            value={state.startAddress.flat_squarem}
                                            sx={{
                                                backgroundColor: 'white',
                                                height: '2.9rem',
                                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#74c92c',
                                                },
                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#74c92c',
                                                },
                                                '@media screen and (max-width: 348px)': {
                                                    fontSize: '13px',
                                                }
                                            }}
                                        />
                                    </FormControl>

                                    <FormControl>
                                        <InputLabel id="floor"
                                                    sx={{
                                                        top: '-3px',
                                                        fontSize: '15px',
                                                        '&.Mui-focused': {
                                                            color: 'green',
                                                        },
                                                        '@media screen and (max-width: 348px)': {
                                                            fontSize: '13px',
                                                        }
                                                    }}>Valitse kerros:*</InputLabel>
                                        <Select
                                            labelId="floor"
                                            id="floor"
                                            value={state.startAddress.floor}
                                            label="Valitse kerros:*"
                                            onChange={(val: any) => onInputStartAddressChange('floor', val)}
                                            sx={{
                                                backgroundColor: 'white',
                                                height: '2.9rem',
                                                '&:hover .MuiOutlinedInput-notchedOutline, &.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#74c92c',
                                                },
                                                '&:hover .MuiInputLabel-root': {
                                                    color: '#74c92c', // Change the color for the focused label
                                                },
                                                '@media screen and (max-width: 348px)': {
                                                    fontSize: '13px',
                                                }
                                            }}
                                        >
                                            <MenuItem value="a" sx={{'@media screen and (max-width: 348px)': {fontSize: '13px',}}}>Maa-taso</MenuItem>
                                            <MenuItem value="b" sx={{'@media screen and (max-width: 348px)': {fontSize: '13px',}}}>Rivitalo 1 kerros</MenuItem>
                                            <MenuItem value="c" sx={{'@media screen and (max-width: 348px)': {fontSize: '13px',}}}>Omakotitalo 1 kerros</MenuItem>
                                            <MenuItem value="d" sx={{'@media screen and (max-width: 348px)': {fontSize: '13px',}}}>Rivitalo 2 kerros</MenuItem>
                                            <MenuItem value="e" sx={{'@media screen and (max-width: 348px)': {fontSize: '13px',}}}>Omakotitalo 2 kerros</MenuItem>
                                            {
                                                Array.from({ length: 40 }, (_, index) => (
                                                    <MenuItem key={index + 1} value={(index + 1).toString()} sx={{'@media screen and (max-width: 348px)': {fontSize: '13px',}}}>
                                                        {`Kerros ${index + 1}`}
                                                    </MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>

                                    <FormControl>
                                        <InputLabel
                                            htmlFor="outdoor_distance"
                                            id="outdoor_distance"
                                            sx={{
                                                top: '-3px',
                                                fontSize: '15px',
                                                '&.Mui-focused': {
                                                    color: 'green',
                                                },
                                                '@media screen and (max-width: 348px)': {
                                                    fontSize: '13px',
                                                }
                                            }}
                                        >
                                            Kuinka lähelle muuttoautolla pääsee (m):*
                                        </InputLabel>
                                        <OutlinedInput
                                            id="flat_squarem"
                                            label="AKuinka lähelle muuttoautolla pääsee (m):*"
                                            onChange={(val: any) => onInputStartAddressChange('outdoor_distance', val)}
                                            value={state.startAddress.outdoor_distance}
                                            sx={{
                                                backgroundColor: 'white',
                                                height: '2.9rem',
                                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#74c92c',
                                                },
                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#74c92c',
                                                },
                                                '@media screen and (max-width: 348px)': {
                                                    fontSize: '13px',
                                                }
                                            }}
                                        />
                                    </FormControl>

                                    <FormControl sx={{marginTop: '1.5rem !important'}}>
                                        <FormLabel sx={{ fontSize: '16px', '&.Mui-focused': { color: '#2e7d32'}, }}>Hissin koko:*</FormLabel>
                                        <RadioGroup
                                            value={state.startAddress.elevator}
                                            onChange={(val: any) => onInputStartAddressChange('elevator', val)}
                                            sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',' @media screen and (max-width: 576px)':{gridTemplateColumns: 'repeat(1, 1fr)'}}}
                                        >
                                            <FormControlLabel
                                                value="1"
                                                control={<Radio  color="success" sx={{ fontSize: '12px !important' }} />}
                                                label={<Typography sx={{ fontSize: '14px' }}>Ei hissiä</Typography>}
                                            />
                                            <FormControlLabel
                                                value="2"
                                                control={<Radio  color="success"  sx={{ fontSize: '12px' }} />}
                                                label={<Typography sx={{ fontSize: '14px' }}>Pieni hissi (alle 1m2)</Typography>}
                                            />
                                            <FormControlLabel
                                                value="3"
                                                control={<Radio color="success" sx={{fontSize: '12px' }} />}
                                                label={<Typography sx={{ fontSize: '14px' }}>Iso hisi (1m2 tai isompi)</Typography>}
                                            />
                                            <FormControlLabel
                                                value="4"
                                                control={<Radio  color="success" sx={{fontSize: '12px'}} />}
                                                label={<Typography sx={{ fontSize: '14px' }}>Uudiskohde</Typography>}
                                            />
                                        </RadioGroup>
                                    </FormControl>

                                    <FormControl sx={{marginTop: '1rem !important'}}>
                                        <FormLabel sx={{ fontSize: '16px', '&.Mui-focused': { color: '#2e7d32'}, }}>Varasto:*</FormLabel>
                                        <RadioGroup
                                            value={state.startAddress.storage}
                                            onChange={(val: any) => onInputStartAddressChange('storage', val)}
                                            sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',' @media screen and (max-width: 576px)':{gridTemplateColumns: 'repeat(1, 1fr)'} }}
                                        >
                                            <FormControlLabel value="1" control={<Radio color="success" sx={{fontSize: '12px' }}/>}
                                                              label={<Typography sx={{ fontSize: '14px'}}>Varastoa ei ole</Typography>}/>
                                            <FormControlLabel value="2" control={<Radio color="success" sx={{fontSize: '12px' }}/>}
                                                              label={<Typography sx={{ fontSize: '14px'}}>Kellarikomero / Ulkovarasto</Typography>}/>
                                            <FormControlLabel value="3" control={<Radio color="success" sx={{fontSize: '12px' }}/>}
                                                              label={<Typography sx={{ fontSize: '14px' }}>Vintti / Ullakko</Typography>}/>
                                        </RadioGroup>
                                    </FormControl>

                                    {
                                        (contextState.movingServiceForm.timeAddressForm.startAddress.storage === "2" || contextState.movingServiceForm.timeAddressForm.startAddress.storage === "3") &&

                                        <FormControl>
                                            <InputLabel
                                                htmlFor="storage_area"
                                                id="storage_area"
                                                sx={{
                                                    top: '-3px',
                                                    fontSize: '15px',
                                                    '&.Mui-focused': {
                                                        color: 'green',
                                                    },
                                                    '@media screen and (max-width: 348px)': {
                                                        fontSize: '13px',
                                                    }
                                                }}
                                            >
                                                Varaston koko (m2):*
                                            </InputLabel>
                                            <OutlinedInput
                                                id="storage_area"
                                                label="Varaston koko (m2):*"
                                                onChange={(val: any) => onInputStartAddressChange('storage_area', val)}
                                                value={state.startAddress.storage_area}
                                                sx={{
                                                    backgroundColor: 'white',
                                                    height: '2.9rem',
                                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#74c92c',
                                                    },
                                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#74c92c',
                                                    },
                                                    '@media screen and (max-width: 348px)': {
                                                        fontSize: '13px',
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                    }

                                    {
                                        contextState.movingServiceForm.timeAddressForm.startAddress.storage === "3" &&

                                        <FormControl>
                                            <InputLabel id="storage_floor"
                                                        sx={{
                                                            top: '-3px',
                                                            fontSize: '15px',
                                                            '&.Mui-focused': {
                                                                color: 'green',
                                                            },
                                                            '@media screen and (max-width: 348px)': {
                                                                fontSize: '13px',
                                                            }
                                                        }}>Varaston kerros:*</InputLabel>
                                            <Select
                                                labelId="storage_floor"
                                                id="storage_floor"
                                                value={state.startAddress.storage_floor}
                                                label="Varaston kerros:*"
                                                onChange={(val: any) => onInputStartAddressChange('storage_floor', val)}
                                                sx={{
                                                    backgroundColor: 'white',
                                                    height: '2.9rem',
                                                    '&:hover .MuiOutlinedInput-notchedOutline, &.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#74c92c',
                                                    },
                                                    '&:hover .MuiInputLabel-root': {
                                                        color: '#74c92c', // Change the color for the focused label
                                                    },
                                                    '@media screen and (max-width: 348px)': {
                                                        fontSize: '13px',
                                                    }
                                                }}
                                            >
                                                {
                                                    Array.from({ length: 10 }, (_, index) => (
                                                        <MenuItem key={index + 1} value={(index + 1).toString()} sx={{'@media screen and (max-width: 348px)': {fontSize: '13px',}}}>
                                                            {`Kerros ${index + 1}`}
                                                        </MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        </FormControl>
                                    }

                                    <Divider sx={{margin: '2rem 0 0.5rem 0 !important'}} />

                                    <Box sx={{marginBottom: '1rem !important'}}>
                                        <Typography variant="h6" component="h1" sx={{marginBottom: '0.5rem'}}>
                                            Mihin muutetaan
                                        </Typography>
                                        <Typography sx={{fontSize: '14px', textAlign: 'justify','@media screen and (max-width: 576px)': {textAlign: 'left'}}}>
                                            Anna osoite, mistä muutto alkaa. Näet saatavilla olevat muuttopäivät ja tarkennetun hinnan osoitteiden syöttämisen jälkeen
                                        </Typography>
                                    </Box>

                                    <FormControl>
                                        <InputLabel id="floor"
                                                    sx={{
                                                        top: '-3px',
                                                        fontSize: '15px',
                                                        '&.Mui-focused': {
                                                            color: 'green',
                                                        },
                                                        '@media screen and (max-width: 348px)': {
                                                            fontSize: '13px',
                                                        }
                                                    }}>Valitse kerros:*</InputLabel>
                                        <Select
                                            labelId="floor"
                                            id="floor"
                                            value={state.endAddress.floor}
                                            label="Valitse kerros:*"
                                            onChange={(val: any) => onInputEndAddressChange('floor', val)}
                                            sx={{
                                                backgroundColor: 'white',
                                                height: '2.9rem',
                                                '&:hover .MuiOutlinedInput-notchedOutline, &.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#74c92c',
                                                },
                                                '&:hover .MuiInputLabel-root': {
                                                    color: '#74c92c', // Change the color for the focused label
                                                },
                                                '@media screen and (max-width: 348px)': {
                                                    fontSize: '13px',
                                                }
                                            }}
                                        >
                                            <MenuItem value="a" sx={{'@media screen and (max-width: 348px)': {fontSize: '13px',}}}>Maa-taso</MenuItem>
                                            <MenuItem value="b" sx={{'@media screen and (max-width: 348px)': {fontSize: '13px',}}}>Rivitalo 1 kerros</MenuItem>
                                            <MenuItem value="c" sx={{'@media screen and (max-width: 348px)': {fontSize: '13px',}}}>Omakotitalo 1 kerros</MenuItem>
                                            <MenuItem value="d" sx={{'@media screen and (max-width: 348px)': {fontSize: '13px',}}}>Rivitalo 2 kerros</MenuItem>
                                            <MenuItem value="e" sx={{'@media screen and (max-width: 348px)': {fontSize: '13px',}}}>Omakotitalo 2 kerros</MenuItem>
                                            {
                                                Array.from({ length: 40 }, (_, index) => (
                                                    <MenuItem key={index + 1} value={(index + 1).toString()} sx={{'@media screen and (max-width: 348px)': {fontSize: '13px',}}}>
                                                        {`Kerros ${index + 1}`}
                                                    </MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>

                                    <FormControl sx={{marginTop: '1.5rem !important'}}>
                                        <FormLabel sx={{ fontSize: '16px', '&.Mui-focused': { color: '#2e7d32'}, }}>Hissin koko:*</FormLabel>
                                        <RadioGroup
                                            value={state.endAddress.elevator}
                                            onChange={(val: any) => onInputEndAddressChange('elevator', val)}
                                            sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',' @media screen and (max-width: 576px)':{gridTemplateColumns: 'repeat(1, 1fr)'} }}
                                        >
                                            <FormControlLabel
                                                value="1"
                                                control={<Radio  color="success" sx={{ fontSize: '12px !important' }} />}
                                                label={<Typography sx={{ fontSize: '14px' }}>Ei hissiä</Typography>}
                                            />
                                            <FormControlLabel
                                                value="2"
                                                control={<Radio  color="success"  sx={{ fontSize: '12px' }} />}
                                                label={<Typography sx={{ fontSize: '14px' }}>Pieni hissi (alle 1m2)</Typography>}
                                            />
                                            <FormControlLabel
                                                value="3"
                                                control={<Radio color="success" sx={{fontSize: '12px' }} />}
                                                label={<Typography sx={{ fontSize: '14px' }}>Iso hisi (1m2 tai isompi)</Typography>}
                                            />
                                            <FormControlLabel
                                                value="4"
                                                control={<Radio  color="success" sx={{fontSize: '12px'}} />}
                                                label={<Typography sx={{ fontSize: '14px' }}>Uudiskohde</Typography>}
                                            />
                                        </RadioGroup>
                                    </FormControl>

                                    <FormControl>
                                        <InputLabel
                                            htmlFor="outdoor_distance"
                                            id="outdoor_distance"
                                            sx={{
                                                top: '-3px',
                                                fontSize: '15px',
                                                '&.Mui-focused': {
                                                    color: 'green',
                                                },
                                                '@media screen and (max-width: 348px)': {
                                                    fontSize: '13px',
                                                }
                                            }}
                                        >
                                            Kuinka lähelle muuttoautolla pääsee (m):*
                                        </InputLabel>
                                        <OutlinedInput
                                            id="flat_squarem"
                                            label="AKuinka lähelle muuttoautolla pääsee (m):*"
                                            onChange={(val: any) => onInputEndAddressChange('outdoor_distance', val)}
                                            value={state.endAddress.outdoor_distance}
                                            sx={{
                                                backgroundColor: 'white',
                                                height: '2.9rem',
                                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#74c92c',
                                                },
                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#74c92c',
                                                },
                                                '@media screen and (max-width: 348px)': {
                                                    fontSize: '13px',
                                                }
                                            }}
                                        />
                                    </FormControl>

                                    <FormControl sx={{marginTop: '1.5rem !important'}}>
                                        <FormLabel sx={{ fontSize: '16px', '&.Mui-focused': { color: '#2e7d32'}, }}>Varasto:*</FormLabel>
                                        <RadioGroup
                                            value={state.endAddress.storage}
                                            onChange={(val: any) => onInputEndAddressChange('storage', val)}
                                            sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',' @media screen and (max-width: 576px)':{gridTemplateColumns: 'repeat(1, 1fr)'} }}
                                        >
                                            <FormControlLabel value="1" control={<Radio color="success" sx={{fontSize: '12px' }}/>}
                                                              label={<Typography sx={{ fontSize: '14px'}}>Varastoa ei ole</Typography>}/>
                                            <FormControlLabel value="2" control={<Radio color="success" sx={{fontSize: '12px' }}/>}
                                                              label={<Typography sx={{ fontSize: '14px'}}>Kellarikomero / Ulkovarasto</Typography>}/>
                                            <FormControlLabel value="3" control={<Radio color="success" sx={{fontSize: '12px' }}/>}
                                                              label={<Typography sx={{ fontSize: '14px' }}>Vintti / Ullakko</Typography>}/>
                                        </RadioGroup>
                                    </FormControl>

                                    {
                                        contextState.movingServiceForm.timeAddressForm.endAddress.storage === "3" &&

                                        <FormControl>
                                            <InputLabel id="storage_floor"
                                                        sx={{
                                                            top: '-3px',
                                                            fontSize: '15px',
                                                            '&.Mui-focused': {
                                                                color: 'green',
                                                            },
                                                            '@media screen and (max-width: 348px)': {
                                                                fontSize: '13px',
                                                            }
                                                        }}>Varaston kerros:*</InputLabel>
                                            <Select
                                                labelId="storage_floor"
                                                id="storage_floor"
                                                value={state.endAddress.storage_floor}
                                                label="Varaston kerros"
                                                onChange={(val: any) => onInputEndAddressChange('storage_floor', val)}
                                                sx={{
                                                    backgroundColor: 'white',
                                                    height: '2.9rem',
                                                    '&:hover .MuiOutlinedInput-notchedOutline, &.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#74c92c',
                                                    },
                                                    '&:hover .MuiInputLabel-root': {
                                                        color: '#74c92c', // Change the color for the focused label
                                                    },
                                                    '@media screen and (max-width: 348px)': {
                                                        fontSize: '13px',
                                                    }
                                                }}
                                            >
                                                {
                                                    Array.from({ length: 10 }, (_, index) => (
                                                        <MenuItem key={index + 1} value={(index + 1).toString()} sx={{'@media screen and (max-width: 348px)': {fontSize: '13px',}}}>
                                                            {`Kerros ${index + 1}`}
                                                        </MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        </FormControl>
                                    }
                                </Stack>
                            </Box>
                        </Box>

                        <Box sx={{width: '40%', height : `${coupon.couponError ? '17.8rem': '16rem'}`, borderRadius: '10px', border: '1px solid #d3cfcf', marginLeft: '1.5rem !important', padding: '1.5rem 2rem','@media screen and (max-width: 768px)': {width: '100%', margin: '2rem 0 0 0 !important', padding: '0', border: 'none'}}}>
                            {coupon.showCouponForm && !coupon.couponIsValid &&
                            <FormControl sx={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '1.5rem'}}>
                                <InputLabel
                                    htmlFor="outdoor_distance"
                                    id="outdoor_distance"
                                    sx={{
                                        top: '-3px',
                                        fontSize: '15px',
                                        '&.Mui-focused': {
                                            color: 'green',
                                        },
                                        '@media screen and (max-width: 348px)': {
                                            fontSize: '13px',
                                        }
                                    }}
                                >
                                    Käytä kuponki
                                </InputLabel>
                                <OutlinedInput
                                    id="flat_squarem"
                                    label="AKäytä kuponki"
                                    onChange={(e: any) => setCoupon({ ...coupon, couponCode: e.target.value})}
                                    value={coupon.couponCode}
                                    sx={{
                                        width:' 68%',
                                        backgroundColor: 'white',
                                        height: '2.9rem',
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#74c92c',
                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#74c92c',
                                        },
                                        '@media screen and (max-width: 348px)': {
                                            fontSize: '13px',
                                        }
                                    }}
                                />
                                <Button sx={{width: '28%',backgroundColor: '#74c92c', boxShadow: 'none', fontSize: '15px',textTransform: 'none',paddingX: '1rem', color: 'white', '&:hover': {
                                        backgroundColor: '#6ebd24',
                                    },}}
                                    onClick={validateCoupon}>
                                        Käyttää
                                </Button>
                            </FormControl>}

                            {coupon.couponError && (
                                <Typography sx={{ color: "red", mb: '10px', fontSize: '14px'}}>{coupon.couponError}</Typography>
                            )}
                            {coupon.couponIsValid === true && (
                                <Box sx={{display: "flex", gap: '15px', alignItems: 'center'}}>
                                    <Typography>Käytetty kuponki: <span>{coupon.couponCode}</span></Typography>
                                    <Button sx={{width: '28%',backgroundColor: '#6c757d', boxShadow: 'none', fontSize: '15px',textTransform: 'none',paddingX: '1rem', color: 'white', '&:hover': {
                                            backgroundColor: '#6c757d',
                                        },}} onClick={cancelCoupon}><span>x</span> Peruuttaa</Button>
                                </Box>

                            )}

                            <Box>
                                <Typography sx={{fontSize: '15px', marginRight: '5rem'}}>{contextState.movingServiceForm.priceDetails.discountPrice > 0 ? 'Alennushinta:' : 'Maksettava summa:'}</Typography>
                                {contextState.movingServiceForm.priceDetails.discountedPrice > 0 ?
                                    (<Box sx={{display: 'flex', alignItems: 'center', marginBottom: '1.5rem'}}>
                                        <Typography sx={{fontWeight: 'normal', color: 'grey', textDecoration: 'line-through',fontSize: '15px', mr: '7px'}}>{contextState.movingServiceForm.priceDetails.totalPrice}&euro;</Typography>
                                        <Typography sx={{fontWeight: 'bold', fontSize: '17px'}}>{coupon.discountPrice !== 0 ? coupon.discountPrice : contextState.movingServiceForm.priceDetails.discountPrice}&euro;</Typography>
                                    </Box>) :
                                    (coupon.discountPrice !== 0 ?
                                            (<Box sx={{display: 'flex', alignItems: 'center', marginBottom: '1.5rem'}}>
                                                <Typography sx={{fontWeight: 'normal', color: 'grey', textDecoration: 'line-through',fontSize: '15px', mr: '7px'}}>{contextState.movingServiceForm.priceDetails.totalPrice}&euro;</Typography>
                                                <Typography sx={{fontWeight: 'bold', fontSize: '17px'}}>{coupon.discountPrice !== 0 ? coupon.discountPrice : contextState.movingServiceForm.priceDetails.totalPrice}&euro;</Typography>
                                            </Box>) :
                                            (<Typography sx={{fontWeight: 'bold', fontSize: '17px', marginBottom: '1.5rem'}}>{contextState.movingServiceForm.priceDetails.totalPrice}&euro;
                                    </Typography>))
                                }
                            </Box>

                            <Button variant="contained" sx={{ width: '100%',backgroundColor: '#74c92c', boxShadow: 'none' , fontSize: '15px',textTransform: 'none', padding: '0.7rem !important', marginBottom: '1rem',
                                '&:hover': {
                                    backgroundColor: '#6ebd24',
                                },}} onClick={onPayRightAway} >
                                Maksan heti/osamaksu/lasku
                            </Button>
                            <Button variant="contained" sx={{ width: '100%',backgroundColor: '#74c92c', boxShadow: 'none' , fontSize: '15px',textTransform: 'none', padding: '0.7rem !important' ,'@media screen and (max-width: 1052px)': {padding: '0.7rem 0.2rem !important'},'@media screen and (max-width: 1007px)': {padding: '0.2rem !important'},
                                '@media screen and (max-width: 768px)': {padding: '0.7rem 0 !important'},'@media screen and (max-width: 382px)': {padding: '0.2rem 0.4rem !important'},
                                '&:hover': {
                                    backgroundColor: '#6ebd24',
                                },}} onClick={submitForm} >
                                Maksan muuton yhteydessä (maksulinkillä)
                            </Button>
                        </Box>

                    </Box>
                    <Box sx={{mt: '1.5rem', borderTop: '1px solid #d0cdcd', pt: '1rem'}}>
                        <BackButton />
                    </Box>
                </Box>
            </Container>
    )
}

export default PersonalDetails;