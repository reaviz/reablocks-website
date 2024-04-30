import * as React from "react"
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    fill="currentColor"
    {...props}
  >
    <path d="M11 2c-4.973 0-9 4.043-9 9.036A9.03 9.03 0 0 0 8.818 19.8a1.224 1.224 0 0 1-.068-.43v-1.536H7.625c-.607 0-1.17-.27-1.418-.768-.292-.542-.337-1.378-1.08-1.898-.225-.18-.045-.361.203-.339.472.135.854.452 1.214.926.36.475.518.588 1.193.588.315 0 .81-.023 1.26-.091.247-.633.675-1.197 1.193-1.468-3.015-.362-4.455-1.853-4.455-3.886 0-.881.382-1.717 1.012-2.44-.202-.7-.472-2.146.09-2.71 1.351 0 2.16.88 2.363 1.106a6.904 6.904 0 0 1 2.182-.362c.788 0 1.508.136 2.182.362.203-.226 1.013-1.107 2.363-1.107.54.542.292 2.01.067 2.711.63.7.99 1.559.99 2.44 0 2.033-1.417 3.524-4.41 3.84.833.43 1.419 1.65 1.419 2.553v2.058c0 .067-.023.135-.023.203A8.998 8.998 0 0 0 20 11.036C20 6.043 15.973 2 11 2Z" />
  </svg>
)
export default SvgComponent