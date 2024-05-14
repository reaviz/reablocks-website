import { Block } from "reablocks";
import { Button } from "reablocks";
import { Card } from "reablocks";
import { Divider } from "reablocks";
import { Input } from "reablocks";
import { Stack } from "reablocks";
import { motion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";

import bg from "reablocks";

export const ForgotPasswordFull = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  return (
    <Card
      className="w-full grow p-5"
      contentClassName="w-full grid grid-cols-2"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex h-full w-full flex-col items-start p-7"
      >
        <svg
          className="h-11"
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
        <div className="flex w-full grow flex-col justify-center pr-14">
          <h4 className="mb-0 font-sans text-2xl font-bold">
            Forgot Password?
          </h4>
          <span className="text-panel-secondary-content font-sans text-base">
            Forgot your password? No worries! Simply enter your email address
            below, and we'll send you instructions on how to reset it.
          </span>
          <form
            className="my-7"
            onSubmit={handleSubmit((values) => console.log("values", values))}
          >
            <Block labelClassName="text-sm font-medium mb-1" label="Email">
              <Controller
                name="email"
                control={control}
                render={({ field: { value, onBlur, onChange } }) => (
                  <Input
                    name="email"
                    disabled={isSubmitting}
                    placeholder="user@goodcode.us"
                    value={value}
                    type="email"
                    onChange={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
            </Block>
            <Stack direction="column">
              <Button
                type="submit"
                fullWidth
                variant="filled"
                color="primary"
                className="bg-button-gradient hover:bg-button-gradient-hover focus:bg-button-gradient-focus light:bg-none light:bg-primary light:hover:bg-none light:hover:bg-primary-hover light:focus:bg-primary-hover mt-7 flex items-center gap-2 self-stretch rounded-sm px-4 py-2 !text-lg transition-colors focus:outline-none"
                disabled={isSubmitting}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M7.33333 4.66667L6.4 5.6L8.13333 7.33333H1.33333V8.66667H8.13333L6.4 10.4L7.33333 11.3333L10.6667 8L7.33333 4.66667ZM13.3333 12.6667H8V14H13.3333C14.0667 14 14.6667 13.4 14.6667 12.6667V3.33333C14.6667 2.6 14.0667 2 13.3333 2H8V3.33333H13.3333V12.6667Z"
                    fill="white"
                  />
                </svg>
                {isSubmitting ? "Resetting..." : "Reset Password"}
              </Button>
              <Divider variant="secondary" />
              <a href="#" className="text-lg font-semibold text-primary">
                Return to login
              </a>
            </Stack>
          </form>
        </div>
      </motion.div>
      <div className="relative h-full w-full overflow-hidden">
        <img src={bg} className="absolute h-full" />
      </div>
    </Card>
  );
};