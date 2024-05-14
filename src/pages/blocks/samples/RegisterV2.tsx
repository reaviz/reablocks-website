import { Block } from "reablocks";
import { Button } from "reablocks";
import { Card } from "reablocks";
import { Divider } from "reablocks";
import { Input } from "reablocks";
import { motion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";

export const RegisterV2 = () => {
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
        <div className="mb-5 flex flex-col items-center justify-center pt-2">
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
            Welcome to Reablocks
          </h4>
          <p className="text-panel-secondary-content text-center font-sans text-base">
            Welcome! Let's get started by creating your account. Please provide
            your email address and choose a secure password to begin accessing
            our platform's features.
          </p>
        </div>
        <form
          className="text-sm"
          onSubmit={handleSubmit((values) => console.log("values", values))}
        >
          <div className="grid grid-cols-2 gap-2.5">
            <Block label="First Name">
              <Controller
                name="firstName"
                control={control}
                render={({ field: { value, onBlur, onChange } }) => (
                  <Input
                    name="firstName"
                    disabled={isSubmitting}
                    placeholder="enter first name"
                    value={value}
                    type="text"
                    onChange={onChange}
                    onBlur={onBlur}
                    fullWidth
                  />
                )}
              />
            </Block>
            <Block label="Last Name">
              <Controller
                name="lastName"
                control={control}
                render={({ field: { value, onBlur, onChange } }) => (
                  <Input
                    name="lastName"
                    disabled={isSubmitting}
                    placeholder="enter last name"
                    value={value}
                    type="text"
                    onChange={onChange}
                    onBlur={onBlur}
                    fullWidth
                  />
                )}
              />
            </Block>
          </div>
          <Block label="Email">
            <Controller
              name="email"
              control={control}
              render={({ field: { value, onBlur, onChange } }) => (
                <Input
                  name="email"
                  disabled={isSubmitting}
                  placeholder="jon@goodcode.us"
                  value={value}
                  type="email"
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />
          </Block>
          <Block label="Password">
            <Controller
              name="password"
              control={control}
              render={({ field: { value, onBlur, onChange } }) => (
                <Input
                  name="password"
                  disabled={isSubmitting}
                  placeholder="enter password"
                  value={value}
                  type="password"
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />
          </Block>
          <Block label="Confirm Password">
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field: { value, onBlur, onChange } }) => (
                <Input
                  name="confirmPassword"
                  disabled={isSubmitting}
                  placeholder="re-enter password"
                  value={value}
                  type="password"
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />
          </Block>
          <Button
            type="submit"
            fullWidth
            variant="filled"
            color="primary"
            className="bg-button-gradient hover:bg-button-gradient-hover focus:bg-button-gradient-focus light:bg-none light:bg-primary light:hover:bg-none light:hover:bg-primary-hover light:focus:bg-primary-hover mb-2 mt-5 flex items-center gap-2 self-stretch !text-lg transition-colors focus:outline-none"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Account →"}
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
          <Divider className="mb-5 mt-5" variant="secondary" />
          <div className="text-panel-secondary-content mt-5 flex items-center justify-center gap-2 text-sm">
            Already have an account?
            <a
              href="#"
              className="text-lg text-primary hover:text-primary-hover"
            >
              Sign in
            </a>
          </div>
        </form>
      </Card>
    </motion.div>
  );
};
