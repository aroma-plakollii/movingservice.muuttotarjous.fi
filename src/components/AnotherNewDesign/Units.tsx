import {
    Container,
    Box,
    Typography,
    Grid,
    Tooltip,
    RadioGroup,
    FormControl,
    FormControlLabel,
    Radio,
    Button, CircularProgress
} from '@mui/material';
import React, {useContext, useEffect, useRef, useState} from 'react';
import MovingContext, {Company, Unit, UnitAvailable} from "../../MovingContext";
import {
    getUnitPriceCalculated,
    getUnitsAvailable2
} from "../../services/MovingService";
import Loader from "./../shared/Loader";
import BackButton from "./../shared/BackButton";
var moment = require('moment');

function Units() {
    const {contextState, setContextState} = useContext(MovingContext);
    const [state, setState] = useState({
        loading: true,
        time: contextState.movingServiceForm.timeAddressForm.time ? contextState.movingServiceForm.timeAddressForm.time : '',
        hasError: false,
        units: [] as Unit[],
        unitsAvailable : [] as UnitAvailable[],
    });
    const timeInputRef: any = useRef(null);

    useEffect(() => {
        postHeightToParent();
    }, []);

    useEffect(() => {
        const getUnitsAvailable_ = async () => {
            const units = await getUnitPriceCalculated(contextState.movingServiceForm);
            const startDate = moment(contextState.movingServiceForm.timeAddressForm.date).format('YYYY-MM-DD')
            const unitsAvailable = await getUnitsAvailable2(contextState.movingServiceForm.productId, contextState.movingServiceForm.regionId, startDate);

            setState({
                ...state, loading: false, units, unitsAvailable
            });

            setContextState({
                ...contextState, unitsAvailable,
                movingServiceForm: {
                    ...contextState.movingServiceForm,
                    capacity_info: unitsAvailable[0].capacity_info
                },
            })

            // if (!contextState.movingServiceForm.unitId) {
            //     setContextState({
            //         ...contextState, unitsAvailable ,
            //         movingServiceForm: {
            //             ...contextState.movingServiceForm,
            //             priceDetails: {
            //                 ...contextState.movingServiceForm.priceDetails,
            //                 price: units[0].pre_price,
            //                 roadPrice: units[0].road_price,
            //                 totalPrice: units[0].pre_price,
            //                 discountedPrice: units[0].discounted_price,
            //                 discountPrice: units[0].discounted_price
            //                 // totalPrice: Number(contextState.movingServiceForm.priceDetails.price) + Number(unitsAvailable[0].price)
            //             },
            //             unitId: unitsAvailable[0].id,
            //             companyId: unitsAvailable[0].company_id,
            //             capacity_info: unitsAvailable[0].capacity_info
            //         }
            //     });
            // }else {
            //
            // }
        };

        getUnitsAvailable_();
    }, [contextState.movingServiceForm.unitId]);

    const postHeightToParent = () => {
        const height = document.documentElement.scrollHeight;
        window.parent.postMessage(height, "*");
    }

    const selectUnit = (companyId: any, unitId: any,  price: number, roadPrice: number, discountedPrice: number) => {
        setContextState({
            ...contextState,
            movingServiceForm: {
                ...contextState.movingServiceForm,
                priceDetails: {
                    ...contextState.movingServiceForm.priceDetails,
                    price: price,
                    roadPrice: roadPrice,
                    // totalPrice: Number(contextState.movingServiceForm.priceDetails.price) + Number(unit.price)
                    totalPrice: price,
                    discountPrice: discountedPrice,
                    discountedPrice: discountedPrice,
                },
                unitId,
                companyId
            }
        })
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

    const onNext = () => {
        if (
            !contextState.movingServiceForm.timeAddressForm.time ||
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
            step: contextState.step + 1,
        });

        window.parent.postMessage('scrollToTop', "*");
    };

    const renderTimes = () => {
        const index = contextState.unitsAvailable.findIndex(
            (x) => x.id === contextState.movingServiceForm.unitId
        );
        const hours = contextState.unitsAvailable[index].hours;
        const hourKeys = Object.keys(hours);
        const now = moment();
        return (
            <RadioGroup key={index} sx={{display: 'flex', flexWrap: 'wrap', marginLeft: '0.7rem', flexDirection: 'row','@media screen and (max-width: 768px)': {marginTop: '0.9rem'}, '@media screen and (max-width: 576px)': {flexDirection: 'column', alignItems: 'center' }}}>
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
                            <FormControl key={x} onClick={() => {
                                if (!isDisabled) {
                                    onTimeChange(x);
                                }
                            }}>
                                <FormControlLabel value={value} disabled={!hours[x] ? true : false} sx={{
                                    border: contextState.movingServiceForm.timeAddressForm.time === x ? '1px solid #74C92C' : '1px solid #ccc',
                                    background: contextState.movingServiceForm.timeAddressForm.time === x ? '#74C92C' : '',
                                    color: contextState.movingServiceForm.timeAddressForm.time === x ? 'white' : '',
                                    padding: '0.5rem 1.5rem',
                                    marginRight: '1rem',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        border: '1px solid #74C92C',
                                        background: '#74C92C',
                                        color: 'white'
                                    },
                                    '&:focus': {
                                        border: '1px solid #74C92C',
                                    },
                                    '&.Mui-disabled': {
                                        opacity: 0.5,
                                        cursor: 'not-allowed',
                                        '&:hover': {
                                            borderColor: '#cecece !important',
                                            background: 'transparent !important',
                                        },
                                    },
                                    label: {
                                        marginRight: '0 !important',
                                        marginLeft: '0 !important',
                                    },
                                    '@media screen and (max-width: 768px)': {
                                        marginBottom: '0.3rem'
                                    }
                                }} control={<Radio sx={{display: 'none'}}/>} label={value} />
                                </FormControl>
                        );
                    }
                })}
            </RadioGroup >
        );
    };

    if (state.loading) {
        return(
            <Box sx={{width: '100%', height: '845px', display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                <CircularProgress color="success" />
            </Box>
        )
    }

    return (
        <Container sx={{display: 'flex', justifyContent: "center", alignItems: 'center', marginY: '1.5rem',
            '@media screen and (max-width: 348px)': {
                padding: '0.2rem'
            }}}>
            <Box sx={{width: '85%',borderRadius: '12px', boxShadow: '0px 13px 47px -30px rgba(87,87,87,0.58)', border: 'solid 1px #d3d3d366', padding: '3rem 3rem' , mb: '40px',
                '@media screen and (max-width: 992px)': {
                    width: '90%',
                    padding: '2rem 2rem'
                },
                '@media screen and (max-width: 348px)': {
                    width: '99%',
                    padding: '1rem 1rem 1.5rem 1rem'
                }}}>
                <Box sx={{width: '90%', marginX: 'auto !important', '@media screen and (max-width: 403px)': {width: '100%',}}}>
                    <Typography variant="h5" component="h1" sx={{marginBottom: '1.5rem'}}>
                        Valitse kuljetus
                    </Typography>

                    <Grid container spacing={2}>
                        {state.units.length === 0 || state.unitsAvailable.length === 0 ?
                            (
                                <Typography sx={{width: '96%', margin: '1.5rem auto', textAlign: 'justify'}}>
                                    Valitettavasti valitsemananne aikana ei ole saatavilla palveluitamme. Pahoittelemme mahdollista hankaluutta.
                                    Voitte ystävällisesti tarkistaa muita aikoja varaussivullamme, jotta löydätte sopivan vaihtoehdon. Kiitos kärsivällisyydestänne
                                    ja ymmärryksestänne!
                                </Typography>
                            ) : contextState.unitsAvailable.map((x: UnitAvailable) => {
                            const hours = x.hours;
                            const hourKeys = Object.keys(hours);
                            const selectedUnit = state.units.find((unit: any) => unit.unit_id === x.id);
                            const pre_price = selectedUnit ? selectedUnit.pre_price : 0;
                            const roadPrice = selectedUnit ? selectedUnit.roadPrice : 0;
                            const discountedPrice = selectedUnit ? selectedUnit.discounted_price : 0;

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
                                <>
                                    <Grid item sx={{ cursor: 'pointer', width: '100%', '@media screen and (min-width: 992px)': { width: '50%' } }}>
                                        <Box sx={{ padding: '1.5rem 1rem', border: '1px solid #ccc', position: 'relative', overflow: 'hidden',
                                            '@media screen and (max-width: 576px)': {pb: '1rem'}}}
                                             className={`units__list__item-3 ${contextState.movingServiceForm.unitId === x.id ? 'active' : ''}`}
                                             onClick={() => selectUnit(x.company_id, x.id, pre_price, roadPrice, discountedPrice)}
                                        >
                                            <Box sx={{display: 'flex',justifyContent: 'space-between',alignItems: 'center'}}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    paddingLeft: '1.5rem',
                                                    '@media screen and (max-width: 576px)': {paddingLeft: '0'}
                                                }}>
                                                    <img className="vehicle-2" src={x.image}/>
                                                    <span className={'capacity'} style={{wordBreak: 'break-word'}}>
                                                {x.capacity_info}
                                            </span>
                                                </Box>
                                                <Box>
                                                    {!shouldShowPrice ? '' : (
                                                        <>
                                                            {/*<Typography variant="body1" sx={{*/}
                                                            {/*        '@media screen and (min-width: 992px)': {*/}
                                                            {/*            display: 'none',*/}
                                                            {/*        },}}>*/}
                                                            {/*            <span className={'capacity'}*/}
                                                            {/*                  style={{wordBreak: 'break-word'}}>*/}
                                                            {/*                {x.capacity_info}*/}
                                                            {/*            </span>*/}
                                                            {/*</Typography>*/}
                                                            {discountedPrice > 0 ? (<Box sx={{
                                                                    display: 'flex',
                                                                    justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                                                                    <Typography sx={{fontWeight: 'normal', color: 'grey', textDecoration: 'line-through',fontSize: '13px'}}>{pre_price}&euro;</Typography>
                                                                    <Typography sx={{fontWeight: 'bold', fontSize: '15px'}}>{discountedPrice}&euro;</Typography>
                                                                </Box>) :
                                                                (<Typography sx={{fontWeight: 'bold', fontSize: '15px'}}>{pre_price}&euro;
                                                                </Typography>)}
                                                        </>
                                                    )}
                                                </Box>
                                            </Box>
                                            <Typography sx={{fontSize: '15px', mt: '13px', wordBreak: 'break-word', display: 'none',
                                                '@media screen and (max-width: 576px)': {display: 'block'}}}>{x.capacity_info}</Typography>
                                            {contextState.movingServiceForm.unitId === x.id && (
                                                contextState.unitsAvailable
                                                    .filter((unit) => unit.id === contextState.movingServiceForm.unitId)
                                                    .map((selectedUnit) => (
                                                        <Typography sx={{ fontSize: '14px', borderTop: '1px solid #d0cdcd', mt: '1rem', '@media screen and (min-width: 992px)': {display: 'none'} }} dangerouslySetInnerHTML={{ __html: selectedUnit.unit_description }} key={selectedUnit.id} />
                                                    ))
                                            )}
                                        </Box>
                                    </Grid>
                                </>
                            );
                        })}
                    </Grid>

                    {
                        state.hasError && !state.time &&
                        <Typography sx={{color: '#d32f2f', marginTop: '1rem'}} >Valitse alkamisaika - se on pakollinen tieto.</Typography>
                    }

                    {
                        contextState.movingServiceForm.unitId && state.unitsAvailable.length > 0 ?
                            (<Box sx={{width: '100%', marginTop: '1rem'}}>
                                {contextState.movingServiceForm.unitId && (
                                    contextState.unitsAvailable
                                        .filter((unit) => unit.id === contextState.movingServiceForm.unitId)
                                        .map((selectedUnit) => (
                                            <Typography sx={{ fontSize: '14px', '@media screen and (max-width: 992px)': {display: 'none'} }} dangerouslySetInnerHTML={{ __html: selectedUnit.unit_description }} key={selectedUnit.id} />
                                        ))
                                )}
                                <Typography sx={{marginY: '1rem', '@media screen and (max-width: 768px)': {marginBottom: '0 !important' }}}>
                                    Valitse aloitusaikataulu:
                                </Typography>
                            {renderTimes()}
                        </Box>) : ''
                    }

                    <Box sx={{width: '100%', margin: '2rem auto 0 auto !important', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #d0cdcd', pt: '1rem'}}>
                        <BackButton/>
                        {state.units.length === 0 || state.unitsAvailable.length === 0 ? '' :
                            <Button variant="contained" sx={{backgroundColor: '#74c92c', boxShadow: 'none' , fontSize: '15px',textTransform: 'none', paddingX: '1.5rem',
                                '&:hover': {
                                    backgroundColor: '#6ebd24',
                                }, '@media screen and (max-width: 768px)': {paddingX: '1rem'}}} onClick={onNext} >
                                Eteenpäin
                            </Button>
                        }
                    </Box>

                </Box>
            </Box>
        </Container>
    );
}

export default Units;