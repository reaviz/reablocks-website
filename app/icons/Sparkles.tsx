import * as React from "react"
const SvgComponent = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={19}
    height={18}
    fill="none"
    {...props}
  >
    <path
      stroke="#87AEFF"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.216 12.501c-.119.285-.173.59-.21.896l-.506 4.04-.505-4.04c-.038-.306-.092-.611-.211-.896-.558-1.333-1.873-2.553-3.222-2.938L1.626 9l3.938-.563c1.494-.427 2.947-1.88 3.375-3.374L9.5 1.124l.563 3.938c.427 1.494 1.88 2.947 3.374 3.375L16.814 9l-3.375.563c-1.35.385-2.664 1.605-3.222 2.938Z"
    />
  </svg>
)
export default SvgComponent
