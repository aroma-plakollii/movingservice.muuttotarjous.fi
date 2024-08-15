import * as React from 'react';

export interface Product {
    id: string,
    type_id: number,
    name: string,
    description: string,
    duration: number,
    image: string,
    type: string
}

export interface Company {
    id: string
    name: string
    business_number: string
    company_code: string
    description: string
    owner_first_name: string
    owner_last_name: string
    email: string
    phone: string
    address: string
    register_date: string
    termination_date: string,
    api_key: string,
    private_key: string,
    is_featured: boolean;
    product_id:string
    company_id:string
    price: string
    saturday_price: string
    sunday_price: string
    discount_price: string
    price_per_m2: string
    included_m2: string
    no_elevator: string
    small_elevator: string
    big_elevator: string
    new_building: string
    price_per_km: string
    included_km: string
    basement_storage_price_per_m2: string
    included_m2_basement_storage: string
    roof_storage_price_per_m2: string
    included_m2_roof_storage: string
    included_meters_outdoor: string
    outdoor_price_per_meter: string
    client_distance: number;
    road_price: number;
    pre_price: number;
}

export interface Unit{
    id: number,
    price: number,
    roadPrice: number,
    pre_price: number,
    discounted_price: number
}

export interface Region {
    'id': number,
    'region_id': string,
    'name': string
}

export interface Coupon{
    company_name: string,
    quantity: number,
    code: [],
    price: number,
    available_at: string,
    used: [],
    status: number,
    is_percentage: number,
}

export interface UnitAvailable {
    id: string,
    company_id: string,
    price: string,
    persons: string,
    capacity: string,
    availability: string,
    max_shift: string,
    unit_code: string,
    start_time: string,
    end_time: string,
    bookings: any,
    hours: any,
    image: any,
    capacity_info: string,
    unit_description: string
}

export interface PaymentMethod {
    name: string;
    selected_value: string;
}

export interface IProductType {
    id: number;

    name: string;
}

interface Address {
    name?: string;
    city?: string;
    placeId?: string;
    address_number?: string;
    door_code?: string;
    flat_squarem?: number | string;
    floor?: number | string;
    outdoor_distance?: number | string;
    elevator?: string | string;
    storage?: string | string;
    storage_area?: number | string;
    storage_floor?: number | string;
}

export interface MovingServiceForm {
    productId: string;
    companyId: string;
    regionId: string;
    unitId: string;
    productType: string;
    capacity_info: string;
    timeAddressForm: {
        startAddress: Address;
        endAddress: Address;
        date: any;
        time: string;
    },
    paymentDetails: {
        firstName: string;
        lastName: string;
        phone: string;
        email: string;
        paymentMethod: string;
    },
    priceDetails: {
        price: number,
        roadPrice: number,
        totalPrice: number,
        discountPrice: number,
        discountedPrice: number,
    }
}

export interface MovingServiceState {
    step: number;
    products: Product[];
    companies: Company[];
    regions:  Region[];
    unitsAvailable: UnitAvailable[];
    paymentMethods: PaymentMethod[];
    movingServiceForm: MovingServiceForm;
    productDescription: string,
    coupons: Coupon
}

interface MovingContext {
    contextState: MovingServiceState,
    setContextState: (x: MovingServiceState) => void
}

const MovingContext = React.createContext({} as MovingContext);

export default MovingContext;
