// "use client"
// import { DeviceSettings, VideoPreview, useCall } from "@stream-io/video-react-sdk";
// import React, { useEffect, useState } from "react";
// import { Button } from "./ui/button";

// const MeetingSetup = ({setIsSetupComplete}: {setIsSetupComplete : (value: boolean)=> void}) => {
//   const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false);

//   const call = useCall();

//   useEffect(() => {
//     if (isMicCamToggledOn) {
//       call?.camera.disable();
//       call?.microphone.disable();
//     } else {
//       call?.camera.enable();
//       call?.microphone.enable();
//     }
//   }, [isMicCamToggledOn, call?.camera, call?.microphone]);

//   return (
//     <>
//       <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
//         <h1 className="text-2xl font-bold">Setup</h1>
//         <VideoPreview />
//         <div>
//             <label className="flex items-center gap-2 justify-center font-medium">
//                 <input type="checkbox" checked={isMicCamToggledOn} onChange={(e)=> setIsMicCamToggledOn(e.target.checked)}/>
//                 Join with mic and camera off
//             </label>
//             {/* <DeviceSettings /> */}
//         </div>
//         <Button className="bg-green-500" onClick={()=>{
//             call?.join()
//             setIsSetupComplete(true)
//         }}>Join meeting</Button>
//       </div>
//     </>
//   );
// };

// export default MeetingSetup;
import React from 'react'

const MeetingSetup = ({setIsSetupComplete}: {setIsSetupComplete: (value: boolean)=> void}) => {
  return (
    <div>MeetingSetup</div>
  )
}

export default MeetingSetup