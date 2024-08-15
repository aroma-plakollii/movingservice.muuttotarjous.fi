import { Select, MenuItem,Container, FormControl , InputLabel, Box, Stack, Typography, Button, CircularProgress } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import React, {useContext, useEffect, useRef, useState} from 'react';
import MovingContext, {Company, PaymentMethod, IProductType, UnitAvailable, Region} from "../../MovingContext";
import {getProducts, getProductTypes, getRegions} from "../../services/MovingService";
import Autocomplete from "react-google-autocomplete";
import {GMAPKEY} from "../../config";
var moment = require('moment');

const ProductType = () => {
    const {contextState, setContextState} = useContext(MovingContext);
    const [state, setState] = useState({
        loading: true,
        productTypes: [] as IProductType[],
        regions: [] as Region[],
        date: contextState.movingServiceForm.timeAddressForm ? contextState.movingServiceForm.timeAddressForm.date : '',
        productType: contextState.movingServiceForm ? contextState.movingServiceForm.productType : '',
        productId: contextState.movingServiceForm ? contextState.movingServiceForm.productId : '',
        regionId: contextState.movingServiceForm ? contextState.movingServiceForm.regionId : '',
    });

    const [startAddress, setStartAddress] = useState({
        start_address: contextState.movingServiceForm?.timeAddressForm?.startAddress
            ? contextState.movingServiceForm.timeAddressForm.startAddress?.name
            : "",
        city: contextState.movingServiceForm?.timeAddressForm?.startAddress
            ? contextState.movingServiceForm?.timeAddressForm.startAddress?.city
            : "",
        placeId: contextState.movingServiceForm?.timeAddressForm?.startAddress
            ? contextState.movingServiceForm?.timeAddressForm?.startAddress?.placeId
            : "",
    });

    const [endAddress, setEndAddress] = useState({
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

    const [isFocusedStart, setIsFocusedStart] = useState(false);
    const [isFocusedEnd, setIsFocusedEnd] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [errors, setErrors] = useState({
        date: false,
        productType: false,
        productId: false,
        regionId: false,
        startAddress: false,
        endAddress: false
    });

    useEffect(() => {
        postHeightToParent();
    }, []);

    useEffect(() => {
        const getProducts_ = async () => {
            const products = await getProducts('');
            const regions = await getRegions();
            const productTypes = await getProductTypes();
            const date = state.date ? state.date : dayjs();
            const uusimaaRegion = regions.find((region : any) => region.name === 'Uusimaa');
            const regionId = state.regionId ? state.regionId : uusimaaRegion.id;

            setContextState({
                ...contextState,
                movingServiceForm: {
                    ...contextState.movingServiceForm,
                    timeAddressForm: {
                        ...contextState.movingServiceForm.timeAddressForm,
                        date: date
                    },
                    regionId: regionId.toString(),
                },
                products,
                regions
            });

            setState({...state, productTypes, regions, loading: false, date: date, regionId});
        }

        getProducts_();

    }, [contextState.movingServiceForm?.timeAddressForm?.startAddress, contextState.movingServiceForm?.timeAddressForm?.endAddress]);

    const postHeightToParent = () => {
        const height = document.documentElement.scrollHeight;
        window.parent.postMessage(height, "*");
    }

    const onSelectChange = (key: string, val: any) => {
        const value = val.target ? val.target.value : '';

        setState({
            ...state,
            [key]: value
        });
        setErrors({...errors, [key]: !value ? true : false });
        selectProduct(key, value);
    };

    const selectProduct = (key: string, val: any) => {
        setContextState({
            ...contextState,
            movingServiceForm: {
                ...contextState.movingServiceForm,
                unitId: '',
                [key]: val,
                timeAddressForm: {
                    ...contextState.movingServiceForm.timeAddressForm,
                    time: ''
                }
            }
        });
        setErrors({...errors, [key]: !val ? true : false });
    };
    const onStartAddressChange = (place:any) => {
        let city = "";
        place.address_components.forEach((addressComponent: any) => {
            if (addressComponent.types.includes("locality")) {
                city = addressComponent.long_name;
            }
        });

        setStartAddress({
            ...startAddress,
            start_address: place.formatted_address,
            city,
            placeId: place.place_id,
        });
        setErrors({...errors, startAddress: !place.formatted_address ? true : false });
        setIsFocusedStart(true);
    };

    const handleStartInputChange = (event: any) => {
        if (!event.target.value) {
            setStartAddress({
                start_address: "",
                city: "",
                placeId: "",
            });
            setErrors({ ...errors, startAddress: true });
            setIsFocusedStart(false);
        }
    };

    const onEndAddressChange = (place:any) => {
        let city = "";
        place.address_components.forEach((addressComponent: any) => {
            if (addressComponent.types.includes("locality")) {
                city = addressComponent.long_name;
            }
        });

        setEndAddress({
            ...startAddress,
            end_address: place.formatted_address,
            city,
            placeId: place.place_id,
        });
        setErrors({...errors, endAddress: !place.formatted_address ? true : false });
        setIsFocusedEnd(true);
    };

    const handleEndInputChange = (event: any) => {
        if (!event.target.value) {
            setEndAddress({
                end_address: "",
                city: "",
                placeId: "",
            });
            setErrors({ ...errors, endAddress: true });
            setIsFocusedStart(false);
        }
    };

    const onDateChange = (val: any) => {
        console.log(val)
        setState({
            ...state,
            date: val
        });
        setErrors({...errors, date: !val ? true : false });
        updateContextDate(val);
    };


    const updateContextDate = (val: any) => {
        setContextState({
            ...contextState,
            movingServiceForm: {
                ...contextState.movingServiceForm,
                timeAddressForm: {
                    ...contextState.movingServiceForm.timeAddressForm,
                    date: val.format()
                }
            }
        });
    };

    const renderProducts = (type: string) => {
        const productsByType = contextState.products.filter(product => product.type_id.toString() === type.toString());
        return (
            productsByType.map((product: any) => (
                <MenuItem
                    key={product.id}
                    value={product.id}
                    sx={{'@media screen and (max-width: 348px)': {
                            fontSize: '13px'
                        }}}
                >
                    {product.name}
                </MenuItem>
            ))
        );
    }

    const renderProductTypes = () => {
        return state.productTypes.map((productType) => (
            <MenuItem
                key={productType.id}
                value={productType.id}
                sx={{'@media screen and (max-width: 348px)': {
                        fontSize: '13px'
                    }}}
            >
                {productType.name}
            </MenuItem>
        ));
    };

    const renderRegions = () => {
        return state.regions.map((region) => (
            <MenuItem
                key={region.id}
                value={region.id}
                sx={{'@media screen and (max-width: 348px)': {
                        fontSize: '13px'
                    }}}
            >
                {region.name}
            </MenuItem>
        ));
    };

    const onNext = () => {
        console.log(errors, startAddress, endAddress)
        if (
            !state.date ||
            !state.productType ||
            !state.productId ||
            !startAddress.start_address ||
            !endAddress.end_address
        ) {
            setErrors({
                ...errors,
                date: !state.date ? true : false,
                productType: !state.productType ? true : false,
                productId: !state.productId ? true : false,
                startAddress: !startAddress.start_address ? true : false,
                endAddress: !endAddress.end_address ? true : false,
            });
            return;
        }

        setContextState({
            ...contextState,
            step: contextState.step + 1,
            movingServiceForm: {
                ...contextState.movingServiceForm,
                timeAddressForm: {
                    ...contextState.movingServiceForm.timeAddressForm,
                    startAddress: {
                        ...contextState.movingServiceForm.timeAddressForm.startAddress,
                        name: startAddress.start_address,
                        city: startAddress.city,
                        placeId: startAddress.placeId,
                    },
                    endAddress: {
                        ...contextState.movingServiceForm.timeAddressForm.endAddress,
                        name: endAddress.end_address,
                        city: endAddress.city,
                        placeId: endAddress.placeId,
                    },
                }
            }
        });

        window.parent.postMessage('scrollToTop', "*");
    }

    if (state.loading) {
        return(
            <Box sx={{width: '100%', height: '800px', display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                <CircularProgress color="success" />
            </Box>
        )
    }

    return (
        <Container sx={{display: 'flex', justifyContent: "center", alignItems: 'center', height: '100vh',
            '@media screen and (max-width: 348px)': {
                padding: '0.2rem'
            }}}>
            <Box sx={{width: '70%',borderRadius: '12px', boxShadow: '0px 13px 47px -30px rgba(87,87,87,0.58)', border: 'solid 1px #d3d3d366', padding: '3rem 3rem',
                    '@media screen and (max-width: 1200px)': {
                        width: '60%',
                    },
                    '@media screen and (max-width: 992px)': {
                        width: '70%',
                    },
                    '@media screen and (max-width: 768px)': {
                        width: '85%',
                    },
                    '@media screen and (max-width: 576px)': {
                        width: '95%',
                        padding: '2rem 2rem'
                    },
                    '@media screen and (max-width: 348px)': {
                        width: '99%',
                        padding: '1rem 1rem 1.5rem 1rem'
                    }}}>
                <Stack
                    spacing={2}
                    component="form"
                >
                    <Box sx={{
                        width: '80%', marginX: 'auto !important',
                        '@media screen and (max-width: 576px)': {
                            width: '100%',
                        }
                    }}>
                        <Typography variant="h5" component="h1" sx={{marginBottom: '1.5rem'}}>
                            Palvelun tiedot
                        </Typography>
                    </Box>

                    <FormControl sx={{
                        width: '80%', marginX: 'auto !important',
                        '@media screen and (max-width: 576px)': {
                            width: '100%',
                        },
                    }}>
                        <InputLabel id="product-type-label"
                                    sx={{
                                        fontSize: '15px',
                                        '&.Mui-focused': {
                                            color: 'green',
                                        },
                                        '@media screen and (max-width: 768px)': {
                                            top: '-1px',
                                            fontSize: '14px',
                                        },
                                        '@media screen and (max-width: 348px)': {
                                            fontSize: '13px',
                                            paddingLeft: '0'
                                        }
                                    }}>Palvelu</InputLabel>
                        <Select
                            error={errors.productType}
                            labelId="product-type-label"
                            id="demo-simple-select-product-type"
                            value={state.productType}
                            label="Palvelu"
                            onChange={(val: any) => onSelectChange('productType', val)}
                            sx={{
                                height: '3.1rem',
                                '&:hover .MuiOutlinedInput-notchedOutline, &.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#74c92c',
                                },
                                '&:hover .MuiInputLabel-root': {
                                    color: '#74c92c', // Change the color for the focused label
                                },
                                '@media screen and (max-width: 768px)': {
                                    height: '3rem',
                                },
                                '@media screen and (max-width: 348px)': {
                                    '& .MuiInputLabel-root': {
                                        fontSize: '13px',
                                        paddingLeft: '0'
                                    },
                                    fontSize: '13px',
                                    paddingLeft: '0'
                                }
                            }}
                        >
                            {renderProductTypes()}
                        </Select>
                    </FormControl>

                    <FormControl sx={{
                        width: '80%', marginX: 'auto !important',
                        '@media screen and (max-width: 576px)': {
                            width: '100%',
                        }
                    }}>
                        <InputLabel id="product-label"
                                    sx={{
                                        fontSize: '15px',
                                        '&:hover, &.Mui-focused': {
                                            color: 'green',
                                        },
                                        '@media screen and (max-width: 768px)': {
                                            top: '-1px',
                                            fontSize: '14px',
                                        },
                                        '@media screen and (max-width: 348px)': {
                                            fontSize: '13px',
                                            paddingLeft: '0'
                                        }
                                    }}>Tuote</InputLabel>
                        <Select
                            error={errors.productId}
                            labelId="product-label"
                            id="demo-simple-select-product"
                            value={state.productId ? state.productId : ''}
                            label="Tuote"
                            onChange={(val: any) => onSelectChange('productId', val)}
                            sx={{
                                height: '3.1rem',
                                '&:hover .MuiOutlinedInput-notchedOutline, &.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#74c92c',
                                },
                                '&:hover .MuiInputLabel-root': {
                                    color: '#74c92c', // Change the color for the focused label
                                },
                                '@media screen and (max-width: 768px)': {
                                    height: '3rem',
                                },
                                '@media screen and (max-width: 348px)': {
                                    fontSize: '13px',
                                    paddingLeft: '0'
                                }
                            }}
                        >
                            {state.productType && renderProducts(state.productType)}
                        </Select>
                    </FormControl>

                    <FormControl sx={{
                        width: '80%', marginX: 'auto !important',
                        '@media screen and (max-width: 576px)': {
                            width: '100%',
                        },
                    }}>
                        <InputLabel id="product-type-label"
                                    sx={{
                                        fontSize: '15px',
                                        '&.Mui-focused': {
                                            color: 'green',
                                        },
                                        '@media screen and (max-width: 768px)': {
                                            top: '-1px',
                                            fontSize: '14px',
                                        }
                                    }}>Alue</InputLabel>
                        <Select
                            error={errors.regionId}
                            labelId="region-label"
                            id="demo-simple-select-product-type"
                            value={state.regionId}
                            label="Alue"
                            onChange={(val: any) => onSelectChange('regionId', val)}
                            sx={{
                                height: '3.1rem',
                                '&:hover .MuiOutlinedInput-notchedOutline, &.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#74c92c',
                                },
                                '&:hover .MuiInputLabel-root': {
                                    color: '#74c92c', // Change the color for the focused label
                                },
                                '@media screen and (max-width: 768px)': {
                                    height: '3rem',
                                },
                                '@media screen and (max-width: 348px)': {
                                    '& .MuiInputLabel-root': {
                                        fontSize: '13px',
                                        paddingLeft: '0'
                                    },
                                    fontSize: '13px',
                                    paddingLeft: '0'
                                }
                            }}
                        >
                            {renderRegions()}
                        </Select>
                    </FormControl>

                    <FormControl sx={{
                        width: '80%', marginX: 'auto !important',
                        '@media screen and (max-width: 576px)': {
                            width: '100%'
                        }
                    }}>
                        <div className="custom-outlined-input">
                            <Autocomplete
                                apiKey={GMAPKEY}
                                onPlaceSelected={onStartAddressChange}
                                options={{
                                    types: ["address"],
                                    componentRestrictions: {country: "fi"},
                                }}
                                defaultValue={startAddress.start_address}
                                inputRef={inputRef}
                                onChange={handleStartInputChange}
                                onFocus={() => setIsFocusedStart(true)}
                                onBlur={() => setIsFocusedStart(!!inputRef.current?.value)}
                                className={`pac-target-input ${isFocusedEnd ? 'is-focused' : ''} ${errors.startAddress ? 'hasError' : ''}`}
                                placeholder=" "
                            />
                            <label htmlFor="autocomplete"
                                   className={`${isFocusedStart || startAddress.start_address != '' ? 'is-focused' : ''} ${isFocusedStart ? 'is-focusedC' : ''} ${errors.startAddress ? 'hasError' : ''}`}>
                                Katuosoite mistä muutto alkaa: *
                            </label>
                        </div>
                    </FormControl>

                    <FormControl sx={{
                        width: '80%', marginX: 'auto !important',
                        '@media screen and (max-width: 576px)': {
                            width: '100%',
                        }
                    }}>
                        <div className="custom-outlined-input">
                            <Autocomplete
                                apiKey={GMAPKEY}
                                onPlaceSelected={onEndAddressChange}
                                options={{
                                    types: ["address"],
                                    componentRestrictions: {country: "fi"}
                                }}
                                defaultValue={endAddress.end_address}
                                inputRef={inputRef}
                                onChange={handleEndInputChange}
                                onFocus={() => setIsFocusedEnd(true)}
                                onBlur={() => setIsFocusedEnd(!!inputRef.current?.value)}
                                className={`pac-target-input ${isFocusedEnd ? 'is-focused' : ''} ${errors.endAddress ? 'hasError' : ''}`}
                                placeholder=" " // Set to space to hide the placeholder text
                            />
                            <label htmlFor="autocomplete"
                                   className={`${isFocusedEnd || endAddress.end_address != '' ? 'is-focused' : ''} ${isFocusedEnd ? 'is-focusedC' : ''} ${errors.endAddress ? 'hasError' : ''}`}>
                                Katuosoite mihin muutetaan: *
                            </label>
                        </div>
                    </FormControl>

                    <FormControl sx={{
                        width: '80%', marginX: 'auto !important',
                        '@media screen and (max-width: 576px)': {
                            width: '100%',
                        }
                    }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker
                                    label="Vuokrauksen alkamispäivä:"
                                    value={dayjs(state.date)}
                                    onChange={onDateChange}
                                    format={'DD/MM/YYYY'}
                                    disablePast
                                    sx={{
                                        width: '100%',
                                        border: errors.date ? '1px solid red' : 'none',
                                        borderRadius: '10px',
                                        '&:hover .MuiOutlinedInput-notchedOutline, &.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#74c92c',
                                        },
                                        '& .MuiInputLabel-root.Mui-focused, &:hover .MuiInputLabel-root': {
                                            color: '#74c92c',
                                        },
                                        '& input': {
                                            height: '1rem',
                                            fontSize: '15px',
                                        },
                                        '@media screen and (max-width: 768px)': {
                                            '& input': {
                                                fontSize: '14px',
                                                height: '0.9rem',
                                            }
                                        },
                                        '@media screen and (max-width: 348px)': {
                                            '& input': {
                                                fontSize: '13px',
                                            }
                                        }
                                    }}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </FormControl>
                </Stack>

                <Box sx={{
                    width: '80%', margin: '1rem auto 0 auto !important', textAlign: 'right',
                    '@media screen and (max-width: 576px)': {
                        width: '100%',
                    }
                }}>
                    <Button variant="contained" sx={{
                        backgroundColor: '#74c92c',
                        boxShadow: 'none',
                        width: '100%',
                        height: '3.1rem',
                        fontSize: '15px',
                        textTransform: 'none',
                        '&:hover': {
                            backgroundColor: '#6ebd24',
                        },
                        '@media screen and (max-width: 768px)': {
                            fontSize: '14px',
                            height: '3rem',
                        }
                    }} onClick={onNext} >
                        Eteenpäin
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}

export default ProductType;