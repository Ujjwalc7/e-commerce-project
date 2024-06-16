import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import CheckoutAddressForm from "../../components/forms/CheckoutAddressForm";
import OrderSummary from "../../components/order summary/OrderSummary";
import PaymentSuccess from "../../components/payment success/PaymentSuccess";

const steps = ["Sign In", "Delivery Address", "Order Summary", "Payment"];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const loggedIn = useSelector((state) => state.auth.isAuthenticated);
  const userAddresses = useSelector(state=>state.auth.user); //bring user adresss
  const { step } = useParams();
  const navigate = useNavigate();
  return (
    <Box sx={{ width: "100%", paddingTop:'50px' }}>
      <Stepper activeStep={parseInt(step)}>
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
        <React.Fragment>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
          </Box>
          <div className="w-full h-full flex justify-center items-center max-md:px-4">
            {step == 0 &&
              (!loggedIn ? (
                <div className="w-full h-[50vh]">
                  <button
                    onClick={() => navigate("/login")}
                    className="flex items-center bg-blue-600 text-white px-3 py-2 rounded active:opacity-80"
                  >
                    Login
                  </button>
                </div>
              ) : (
                <div className="w-full h-[35vh] flex justify-center items-center">
                  <button
                    onClick={() => navigate("/checkout/step/1")}
                    className="flex items-center bg-blue-600 text-white px-3 py-2 rounded active:opacity-80"
                  >
                    Next
                    <ArrowRightAltIcon />
                  </button>
                </div>
              ))}
            {step == 1 &&
              (!loggedIn ? (
                <div className="w-full h-[50vh]">
                  <button
                    onClick={() => navigate("/login")}
                    className="flex items-center bg-blue-600 text-white px-3 py-2 rounded active:opacity-80"
                  >
                    Login
                  </button>
                </div>
              ) : (
                <CheckoutAddressForm />
              ))}
            {step == 2 &&
            (!loggedIn ? (
              <div className="w-full h-[50vh]">
                  <button
                    onClick={() => navigate("/login")}
                    className="flex items-center bg-blue-600 text-white px-3 py-2 rounded active:opacity-80"
                  >
                    Login
                  </button>
                </div>
            ):(
              <OrderSummary/>
            ))}
            {step == 4 &&
            (!loggedIn ? (
              <div className="w-full h-[50vh]">
                  <button
                    onClick={() => navigate("/login")}
                    className="flex items-center bg-blue-600 text-white px-3 py-2 rounded active:opacity-80"
                  >
                    Login
                  </button>
                </div>
            ):(
              <PaymentSuccess/>
            ))}
          </div>
        </React.Fragment>
      )}
    </Box>
  );
}
