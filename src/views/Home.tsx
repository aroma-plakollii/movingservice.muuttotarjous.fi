import React, {useContext} from 'react';
// import ProductType from '../components/NewDesign/ProductType';
import MovingContext from '../MovingContext';
import Products from "../components/Products";
// import Companies from "../components/Companies";
// import Units from "../components/Units";
// import PaymentDetails from "../components/PaymentDetails";
// import StartBookingDetails from "../components/StartBookingDetails";
// import EndBookingDetails from "../components/EndBookingDetails";
// import PersonalDetails from "../components/PersonalDetails";
import ThankYou from "../components/ThankYou";
import StartBookingRequestDetails from "../components/StartBookingRequestDetails";
import EndBookingRequestDetails from "../components/EndBookingRequestDetails";
import PersonalBookingRequestDetails from "../components/PersonalBookingRequestDetails";
// import PersonalDetails from "../components/NewDesign/PersonalDetails";
// import Units from "../components/NewDesign/Units";
import ProductType from "../components/AnotherNewDesign/ProductType";
import Units from "../components/AnotherNewDesign/Units";
import PersonalDetails from "../components/AnotherNewDesign/PersonalDetails";

function Home() {
    const {contextState} = useContext(MovingContext);
    return (
        <>
            {
                contextState.step === 1 && <ProductType />
            }
            {
                contextState.step === 2 && <Units />
            }
            {
                contextState.step === 3 && <PersonalDetails />
            }
            {
                contextState.step === 4 && <ThankYou/>
            }
            {/*{*/}
            {/*    contextState.step === 3 && <EndBookingDetails/>*/}
            {/*}*/}
            {/*{*/}
            {/*    contextState.step === 4 && <Companies/>*/}
            {/*}*/}
            {
                // contextState.step === 5 && <Units/>
            }
            {
                contextState.step === 6 && <PersonalDetails/>
            }
            {/*{*/}
            {/*    contextState.step === 7 && <PaymentDetails/>*/}
            {/*}*/}
            {
                contextState.step === 8 && <ThankYou/>
            }
            {
                contextState.step === 9 && <Products/>
            }
            {
                contextState.step === 10 && <StartBookingRequestDetails/>
            }
            {
                contextState.step === 11 && <EndBookingRequestDetails/>
            }
            {
                contextState.step === 12 && <PersonalBookingRequestDetails/>
            }
        </>
    );
}

export default Home;
