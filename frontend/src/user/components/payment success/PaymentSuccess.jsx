import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../Spinner";
import SuccessAnimation from "../success_animation/SuccessAnimation";
import { updatePaymentThunk } from "../../../store/slice/paymentSlice";
import { Box, Step, StepLabel, Stepper, Typography } from "@mui/material";

const steps = ["Sign In", "Delivery Address", "Order Summary", "Payment"];

const PaymentSuccess = () => {
  const [activeStep, setActiveStep] = useState(0);
  const order = useSelector((state) => state.order.order);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("orderId");
  const razorpay_payment_id = searchParams.get("razorpay_payment_id");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
      dispatch(updatePaymentThunk({
        orderId: orderId,
        paymentId: razorpay_payment_id,
        jwt: jwt,
      }))
  }, [orderId, razorpay_payment_id]);

  return order ? (
    <Box sx={{ width: "100%", paddingTop:'50px' }}>
      <Stepper activeStep={4}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
        </React.Fragment>
      ) : (
        <>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
          </Box>
          <div className="flex justify-center h-[40vh] items-center">
      <div className=" flex flex-col items-center gap-3">
        <SuccessAnimation />
        <div className="font-semibold">Thank you for orderig!</div>
        <button className="bg-blue-500 py-2 px-3 rounded text-white active:scale-95 active:opacity-80 transition-all" 
        onClick={()=>navigate('/')}>
          Continue Shopping
        </button>
      </div>
    </div>
        </>
      )}
    </Box>
  ) : (
    <div className="flex justify-center h-[40vh] items-center">
      <Spinner />
      <span className="text-blue-700 font-semibold ml-2">Loading</span>
    </div>
  );
};
export default PaymentSuccess;





{/* <div className="flex justify-center h-[40vh] items-center">
      <div className=" flex flex-col items-center gap-3">
        <SuccessAnimation />
        <div className="font-semibold">Thank you for orderig!</div>
        <button className="bg-blue-500 py-2 px-3 rounded text-white active:scale-95 active:opacity-80 transition-all" 
        onClick={()=>navigate('/')}>
          Continue Shopping
        </button>
      </div>
    </div> */}