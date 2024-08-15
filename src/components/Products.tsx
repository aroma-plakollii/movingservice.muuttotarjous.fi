import React, {useContext, useEffect, useState} from 'react';
import {getCompanyByCode, getProducts} from "../services/MovingService";
import MovingContext, {Product} from "../MovingContext";
import {productImagesMap} from "../config";
import productImage from './../../public/assets/images/product-1.png'

function Products() {
    const {contextState, setContextState} = useContext(MovingContext);
    const [state, setState] = useState({
        company_code: window.name ? window.name : '',
    });
    useEffect(() => {
        const getProducts_ = async () => {
            const products = await getProducts('');
            setContextState({
                ...contextState, products
            })
        };

        getProducts_();
    }, []);


    const selectProduct = (productId: string) => {
        setContextState({
            ...contextState,
            movingServiceForm: {
                ...contextState.movingServiceForm,
                productId
            },
            step: contextState.step + 1
        })
    };

    return (
        <div className={'products'}>
            <div className={"ms-container"}>
                <div className="product-list">
                    {contextState.products.map((product: Product, index: number) => {
                        return (
                            <div className="product-list__item" key={index} onClick={() => selectProduct(product.id)}>
                                <div className="product-list__item__image-holder">
                                    <img src={product.image} alt=""/>
                                </div>
                                <div className={'product-list__item__content'}>
                                    <div className="product-list__item__content__title">{product.name}</div>
                                    <div className="product-list__item__content__description">{product.description}</div>
                                    <a href={void(0)} className="product-list__item__content__link">Valiste</a>
                                </div>
                            </div>
                        );
                    })}
                </div>


            </div>
        </div>
    );
}

export default Products;
