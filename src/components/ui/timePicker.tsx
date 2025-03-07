// import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"

export default function TimePicker() {
  return (
    <div>
      {/* <h2 className="text-lg font-semibold">Select Time</h2>
      <p className="text-sm text-gray-500">Choose a suitable time</p> */}

      <div className=" space-y-4">
        <div className="flex items-center space-x-2">
          {/* <ClockIcon className="w-5 h-5 text-gray-600" /> */}
          <div className="grid w-full items-center ">
            <label htmlFor="" className="text-sm font-semibold">Timer</label>
            <Input type="time" id="time" aria-label="Choose time" className="w-full border rounded-md py-5 " />
          </div>
        </div>
      </div>

      {/* <Button className="w-full mt-4">Save Time</Button> */}
    </div>
  )
}

// function ClockIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <circle cx="12" cy="12" r="10" />
//       <polyline points="12 6 12 12 16 14" />
//     </svg>
//   )
// }
