import { Block } from "reablocks";
import { Button } from "reablocks";
import { Card } from "reablocks";
import { Divider } from "reablocks";
import { Input } from "reablocks";
import { motion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";

export const LoginBasic = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm md:max-w-[600px]"
    >
      <Card className="w-full p-12">
        <div className="mb-14 flex flex-col items-center justify-center pt-2">
          <svg
            className="mb-2 h-11 w-auto"
            width="260"
            height="341"
            viewBox="0 0 260 341"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M260 341L184.393 212.394C223.901 194.37 250.261 155.399 250.261 113.017C250.261 81.84 239.039 55.0472 217.083 33.1257C195.127 11.2043 168.301 0 136.585 0H0V62.8413H136.585C161.95 62.8413 182.932 85.25 182.932 113.017C182.932 140.784 161.95 163.68 136.585 163.68H81.0277V163.734H0V341H67.329V222.624H118.546L187.314 341H260Z"
              fill="url(#paint0_linear_1_129)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_1_129"
                x1="294.975"
                y1="233.607"
                x2="-46.0838"
                y2="159.958"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#1352FF" />
                <stop offset="0.354721" stop-color="#009BFF" />
                <stop offset="0.62382" stop-color="#105EFF" />
                <stop offset="1" stop-color="#090E43" />
              </linearGradient>
            </defs>
          </svg>
          <h4 className="mb-0 font-sans text-2xl font-bold">
            Log In or create account
          </h4>
          <span className="text-panel-secondary-content font-sans text-base">
            Welcome to Reablocks, powered by Good Code
          </span>
        </div>
        <form
          onSubmit={handleSubmit((values) => console.log("values", values))}
        >
          <Block label="Email" className="mb-5">
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="email"
                  placeholder="user@goodcode.us"
                  disabled={isSubmitting}
                />
              )}
            />
          </Block>
          <Button
            type="submit"
            variant="filled"
            color="primary"
            disabled={isSubmitting}
            className="bg-button-gradient hover:bg-button-gradient-hover focus:bg-button-gradient-focus light:bg-none light:bg-primary light:hover:bg-none light:hover:bg-primary-hover light:focus:bg-primary-hover mt-7 flex items-center gap-2 self-stretch rounded-sm px-4 py-2 !text-lg transition-colors focus:outline-none"
            startAdornment={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="16"
                fill="none"
              >
                <g clip-path="url(#a)">
                  <path
                    fill="#fff"
                    d="M7.833 4.667 6.9 5.6l1.733 1.733h-6.8v1.334h6.8L6.9 10.4l.933.933L11.167 8 7.833 4.667Zm6 8H8.5V14h5.333c.734 0 1.334-.6 1.334-1.333V3.333c0-.733-.6-1.333-1.334-1.333H8.5v1.333h5.333v9.334Z"
                  />
                </g>
                <defs>
                  <clipPath id="a">
                    <path fill="#fff" d="M.5 0h16v16H.5z" />
                  </clipPath>
                </defs>
              </svg>
            }
            fullWidth
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
          <Divider className="my-7" variant="secondary" />
          <Button
            variant="outline"
            startAdornment={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="currentColor"
              >
                <path d="M13.1667 8.66665H9.16671V12.6666H7.83337V8.66665H3.83337V7.33331H7.83337V3.33331H9.16671V7.33331H13.1667V8.66665Z" />
              </svg>
            }
            fullWidth
          >
            Sign up
          </Button>
          <div className="text-panel-secondary-content mt-5 flex items-center justify-center gap-2 text-sm">
            By signing in, you agree to our
            <a
              href="#"
              className="text-lg text-primary hover:text-primary-hover"
            >
              terms of service
            </a>
            and
            <a
              href="#"
              className="text-lg text-primary hover:text-primary-hover"
            >
              privacy policy
            </a>
          </div>
        </form>
      </Card>
    </motion.div>
  );
};
