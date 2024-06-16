import { Step, StepLabel, Stepper } from "@mui/material"

const steps = ['Palced', 'Order Confirmed', 'Shipped', 'Out for delivery', 'Delivered'];

const OrderTracker = ({activeStep}) => {
  return (
    <div className="w-full">
        <Stepper activeStep={activeStep} alternativeLabel>
            {steps.flatMap(label => 
                <Step key={label}>
                    <StepLabel sx={{color: '#9155FD', fontSize: '44px'}}>{label}</StepLabel>
                </Step>
            )}
        </Stepper>
    </div>
  )
}
export default OrderTracker