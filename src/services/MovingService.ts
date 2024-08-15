import axios from "axios";
import {API} from "../config";
import {MovingServiceForm} from "../MovingContext";

export const getProducts = async (company_code: string) => {
    try {
        const response = await axios.get(`${API}/ms-products`,);

        return response.data;
    } catch (e) {
        return [];
    }
};

export const getCompanies = async (movingServiceForm: MovingServiceForm) => {
    try {
        const response = await axios.get(`${API}/api/companies/pricing`, {
            params: {
                product_id: movingServiceForm.productId,
                start_address: movingServiceForm.timeAddressForm.startAddress.name,
                start_city: movingServiceForm.timeAddressForm.startAddress.city,
                end_address: movingServiceForm.timeAddressForm.endAddress.name,
                end_city: movingServiceForm.timeAddressForm.endAddress.city,
            }
        });

        return response.data;
    } catch (e) {
        return [];
    }
};

export const getCompaniesPriceCalculated = async (movingServiceForm: MovingServiceForm) => {

    try {
        const response = await axios.post(`${API}/ms-companies/pricing`, movingServiceForm);

        return response.data;
    } catch (e) {
        return [];
    }
};

export const getCompanyPriceCalculated = async (movingServiceForm: MovingServiceForm) => {
    try {
        const response = await axios.post(`${API}/api/companies/company-pricing`, movingServiceForm);

        return response.data;

    } catch (e) {
        return [];
    }
};

export const getUnitPriceCalculated = async (movingServiceForm: MovingServiceForm) => {
    try {
        const response = await axios.post(`${API}/ms-units/pricing`, movingServiceForm);

        return response.data;

    } catch (e) {
        return [];
    }
};

export const getExtraPriceCalculated = async (movingServiceForm: MovingServiceForm) => {
    try {
        const response = await axios.post(`${API}/ms-units/extra-pricing`, movingServiceForm);

        return response.data;

    } catch (e) {
        return [];
    }
};

export const createBooking = async (data: any) => {

    try {
        const response = await axios.post(`${API}/ms-bookings/create`, data);

        return response.data;
    }
    catch (e) {
        return [];
    }
}

export const payRightAway = async (data: any) => {
    try {
        const response = await axios.post(`${API}/ms-bookings/create/pay-right-away`, data);

        return response.data;
    }
    catch (e) {
        return [];
    }
}

export const bookUnit = async (data: any) => {
    try {
        const response = await axios.post(`${API}/api/companies/pricingv2`, data);

        return response.data;
    } catch (e) {
        return [];
    }
};

export const getUnitsAvailable = async (companyId: string, productId: string, start_date: string) => {
    try {
        const response = await axios.post(`${API}/ms-units/available`, {
            company_id: companyId,
            product_id: productId,
            start_date: start_date
        });

        return response.data;
    } catch (e) {
        return [];
    }
};

export const getUnitsAvailable2 = async (productId: string, region_id: string, start_date: string) => {
    try {
        const response = await axios.post(`${API}/ms-units/available`, {
            product_id: productId,
            region_id: region_id,
            start_date: start_date,

        });

        return response.data;
    } catch (e) {
        return [];
    }
};

export const getAvailableCompanies = async (start_date: string, product_id: string) => {
    try {
        const response = await axios.post(`${API}/ms-units/available-for-all-companies`, {
            start_date: start_date,
            product_id: product_id
        });

        return response.data;
    } catch (e) {
        return [];
    }
};

export const getUnitProductDescription = async (companyId: string, productId: string) => {
    try {
        const response = await axios.post(`${API}/ms-products/unit-product-details`, {
            company_id: companyId,
            product_id: productId
        });

        return response.data;
    } catch (e) {
        return [];
    }
};

export const getPaymentMethods = async () => {
    try {
        const response = await axios.get(`${API}/api/payment-methods`);

        return response.data;
    } catch (e) {
        return [];
    }
};

export const getUnits = async (productId: string, companyId: string, start_address: string, end_address: string) => {
    try {
        const response = await axios.get(`${API}/api/units`, {
            params: {
                product_id: productId,
                start_address: start_address,
                end_address: end_address,
            }
        });

        return response.data;
    } catch (e) {
        return [];
    }
};

export const getCompanyByCode = async (companyCode: string) => {
    try {
        const response = await axios.post(`${API}/api/company-by-code`, {
            company_code: companyCode
        });

        return response.data;
    } catch (e) {
        return [];
    }
};

export const checkCoupon = async (data: any) => {

    try {
        const response = await axios.post(`${API}/check-coupon`, data);

        return response.data;
    }
    catch (e: any) {
        return e;
    }
}

export const createBookingRequest = async (data: any) => {

    try {
        const response = await axios.post(`${API}/booking-request-create`, data);

        return response.data;
    }
    catch (e) {
        return [];
    }
}

export const getALLCompanies = async () => {
    try {
        const response = await axios.get(`${API}/ms-companies`);

        return response.data;
    } catch (e) {
        return [];
    }
};

export const getProductTypes = async () => {
    try {
        const response = await axios.get(`${API}/ms-product-types`);

        return response.data;
    } catch (e) {
        return [];
    }
};


export const getRegions = async () => {
    try {
        const response = await axios.get(`${API}/regions`);

        return response.data;
    } catch (e) {
        return [];
    }
};
