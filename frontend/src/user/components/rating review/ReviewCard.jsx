import { Avatar, Box, Grid, Rating } from "@mui/material"

const ReviewCard = () => {
  return (
        <div className="flex gap-2 border px-4 py-4">
                <div>
                    <Avatar className="text-white" sx={{width:44, height:44, bgcolor:'#9155fb'}}>R</Avatar>
                </div>

            <div className="w-full flex-grow overflow-hidden">
                <div className="space-y-2">
                    <div>
                        <p>Taam</p>
                        <p>April 5, 2022</p>
                    </div>
                </div>

                <Rating value={4} name="half-rating"/>
                <p className=" text-wrap break-words ">Lorem, ipsutur quibusdias, doloredoloredoloredoloredoloredoloredoloredolore sunt.</p>
            </div>
        </div>
  )
}
export default ReviewCard