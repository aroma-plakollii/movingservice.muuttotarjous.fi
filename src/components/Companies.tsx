import React, {useContext, useEffect, useState} from 'react';
import MovingContext, {Company} from "../MovingContext";
import {
    getCompanies,
    getCompaniesPriceCalculated,
    getCompanyByCode,
    getCompanyPriceCalculated,
    getAvailableCompanies, getALLCompanies
} from "../services/MovingService";
import Loader from "./shared/Loader";
import BackButton from "./shared/BackButton";
import DatePicker from "react-datepicker";
var moment = require('moment');

interface AvailableCompany {
    id: string;
}

function Companies() {
    const {contextState, setContextState} = useContext(MovingContext);
    const [state, setState] = useState({
        loading: true,
        date: contextState.movingServiceForm.timeAddressForm.date
            ? moment(contextState.movingServiceForm.timeAddressForm.date).format('YYYY-MM-DDTHH:mm:ss.SSS')
            : '',
    });

    const [availableCompanies, setAvailableCompanies] = useState<AvailableCompany[]>([])

    useEffect(() => {
        const getCompanies_ = async () => {
            // const companies = await getCompaniesPriceCalculated(contextState.movingServiceForm);
            const startDate = moment(contextState.movingServiceForm.timeAddressForm.date).format('YYYY-MM-DD')
            const availableCompanies = await getAvailableCompanies(startDate, contextState.movingServiceForm.productId);
            const companies = await getALLCompanies();

            console.log(availableCompanies)

            const availableCompanyIds = availableCompanies.map((company : any) => company.company_id);

            const filteredCompanies = companies.filter((company : any) => availableCompanyIds.includes(company.id));

            setContextState({
                ...contextState, companies: filteredCompanies
            });
            setState({
                ...state, loading: false
            });
            setAvailableCompanies(availableCompanies)
        };

        const getPreSelectedCompany = async (companyCode: string) => {
            const companyId = await getCompanyByCode(companyCode);
            console.log(companyId)

            setContextState({
                ...contextState,
                movingServiceForm: {
                    ...contextState.movingServiceForm, companyId
                },
            });

            const company = contextState.companies.find((company: any) => company.id === companyId);
            // const company = await getCompanyPriceCalculated(contextState.movingServiceForm);

            if (company) {
                selectCompany(company.id);
            } else {
                // Handle the case where the company is not found
                console.log('Company not found');
            }
        };

        window.name ? getPreSelectedCompany(window.name) : getCompanies_();
    }
    , [state.date]);

    // const selectCompany = (companyId: string, price: number, roadPrice: number) => {
    //     setContextState({
    //         ...contextState,
    //         movingServiceForm: {
    //             ...contextState.movingServiceForm,
    //             companyId,
    //             priceDetails: {
    //                 ...contextState.movingServiceForm.priceDetails,
    //                 price,
    //                 roadPrice
    //             },
    //             unitId: ''
    //         },
    //         step: 5
    //     })
    // };

    const selectCompany = (companyId: string) => {
        console.log(companyId)
        setContextState({
            ...contextState,
            movingServiceForm: {
                ...contextState.movingServiceForm,
                companyId,
                unitId: ''
            },
            step: 5
        })
    };

    const showSelectedDate = (date: Date) =>  moment(state.date).format('DD');

    const previousDate = (date: Date) =>  {
        return moment(state.date).subtract(1, 'd').format('DD')
    };

    const nextDate = (date: Date) => {
        return moment(state.date).add(1, 'd').format('DD')
    };

    const onNext = () => {
        // let newDate = moment(state.date).add(1, 'd');
        let newDate = moment(new Date(state.date)).add(1, 'days').toDate();

        setState({
            ...state,
            loading: true,
            date: newDate
        })

        setContextState({
            ...contextState,
            movingServiceForm: {
                ...contextState.movingServiceForm,
                timeAddressForm: {
                    ...contextState.movingServiceForm.timeAddressForm,
                    date: newDate
                }
            }
        });
    }

    const onPrev = () => {
        let newDate = moment(new Date(state.date)).subtract(1, 'days').toDate();

        // Check if the new date is less than the current date
        if (moment(newDate).isBefore(moment(), 'day')) {
            return;
        }

        setState({
            ...state,
            loading: true,
            date: newDate
        })

        setContextState({
            ...contextState,
            movingServiceForm: {
                ...contextState.movingServiceForm,
                timeAddressForm: {
                    ...contextState.movingServiceForm.timeAddressForm,
                    date: newDate
                }
            }
        });

    }

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

    if (state.loading) {
        return <>
                <div className="loader-container">
                    <Loader color='#74c92c' width={50}/>
                </div>
        </>
    }

    return (
        <div className="ms-container">
            <div className="ms-rental-date">
                <p className="ms-rental-date__title">Vuokrauksen alkamispäivä: {moment(state.date).format('DD-MM-yyyy')}</p>
                <div className="ms-pagination-container">
                    <div className="ms-pagination">

                        <li className="ms-pagination__page-item" onClick={onPrev}>
                            <a className="ms-pagination__page-link" href="javascript:void(0)" aria-label="Previous" style={{borderTopLeftRadius: '5px', borderBottomLeftRadius: '5px'}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                     fill="currentColor" className="bi bi-caret-left-fill" viewBox="0 0 16 16">
                                    <path
                                        d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
                                </svg>
                            </a>
                        </li>

                        <li className="ms-pagination__page-item" onClick={onPrev}>
                            <a className="ms-pagination__page-link" href="javascript:void(0)">{previousDate(new Date(state.date))}</a>
                        </li>

                        <li className="ms-pagination__page-item">
                            <a className="ms-pagination__page-link active" href="javascript:void(0)">{showSelectedDate(new Date(state.date))}</a>
                        </li>

                        <li className="ms-pagination__page-item" onClick={onNext}>
                            <a className="ms-pagination__page-link" href="javascript:void(0)">{nextDate(new Date(state.date))}</a>
                        </li>

                        <li className="ms-pagination__page-item" onClick={onNext}>
                            <a className="ms-pagination__page-link" href="javascript:void(0)" aria-label="Next" style={{borderTopRightRadius: '5px', borderBottomRightRadius: '5px'}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                     fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                                    <path
                                        d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                                </svg>
                            </a>
                        </li>
                    </div>
                </div>
            </div>

            <h1 className="ms-title">Muuttotarjoukset</h1>

            <div className="company-list">
                {
                    contextState.companies.filter((company) => {
                        // return true if the id of the company exists in availableCompanies
                        return availableCompanies.some((available: any) => available.company_id === company.id);
                    }).map((company: Company, index: number) => {
                        if (!company.is_featured) return;
                        return (
                                <div className="company-list__item" key={`company-${index}`}>
                                    <div className="company-list__item__content">
                                            <div className="company-list__item__content__name">
                                                {company.name}
                                            </div>
                                            {/*<div className="company-list__item__content__price">*/}
                                            {/*    {company.pre_price} €*/}
                                            {/*</div>*/}
                                        {/*<button type="button" className="ms-button" onClick={() => selectCompany(company.company_id, company.pre_price, company.road_price)}>Näytä</button>*/}
                                        <button type="button" className="ms-button" onClick={() => selectCompany(company.id)}>Näytä</button>
                                        {/*<div className='company-list__item__content__description'>*/}
                                        {/*    <span className="tooltip__description" dangerouslySetInnerHTML={{ __html: company.description }} />*/}
                                        {/*</div>*/}
                                    </div>
                                </div>
                        );
                    })
                }
            </div>

            <hr className="ms-divider"/>

            <h1 className="ms-title">Kuljettaja ja muuttoauto</h1>

            <div className="company-list">
            {
                contextState.companies.filter((company) => {
                    // return true if the id of the company exists in availableCompanies
                    return availableCompanies.some((available: any) => available.company_id === company.id);
                }).map((company: Company, index: number) => {
                    if (company.is_featured) return;
                    return (
                        <div className="company-list__item" key={`company-${index}`} onClick={() => selectCompany(company.id)}>
                            <div className="company-list__item__content">
                                <div className="company-list__item__content__name">
                                    {company.name}
                                </div>
                                {/*<div className="company-list__item__content__price">*/}
                                {/*    {company.pre_price} €*/}
                                {/*</div>*/}
                                <button type="button" className="ms-button" onClick={() => selectCompany(company.id)}>Näytä</button>
                            </div>
                        </div>
                    );
                })
            }
            </div>

            <div className="ms-step-nav">
                <BackButton/>
            </div>
        </div>
    );
}

export default Companies;
