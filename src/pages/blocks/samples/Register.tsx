import { Block } from 'reablocks';
import { Button } from 'reablocks';
import { Card } from 'reablocks';
import { Divider } from 'reablocks';
import { Input } from 'reablocks';
import { motion } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';

import logo from 'reablocks';

export const Register = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm();

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm md:max-w-[600px]"
    >
      <Card className="w-full p-12">
        <div className="flex flex-col pt-2 mb-5">
          <div>
            <img src={logo} alt="Logo" className="h-11 mb-2" />
          </div>
          <h4 className="text-2xl font-sans font-bold mb-0">
            Welcome to Reablocks
          </h4>
          <p className="text-base text-panel-secondary-content font-sans">
            Welcome! Let's get started by creating your account. Please provide
            your email address and choose a secure password to begin accessing
            our platform's features.
          </p>
        </div>
        <form
          className="text-sm"
          onSubmit={handleSubmit(values => console.log('values', values))}
        >
          <Block label="Name">
            <Controller
              name="name"
              control={control}
              render={({ field: { value, onBlur, onChange } }) => (
                <Input
                  name="name"
                  disabled={isSubmitting}
                  placeholder="Jon Doe"
                  value={value}
                  type="text"
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />
          </Block>
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
            className="mt-5 mb-2 flex items-center gap-2 self-stretch !text-lg bg-button-gradient hover:bg-button-gradient-hover focus:bg-button-gradient-focus light:bg-none light:bg-primary light:hover:bg-none light:hover:bg-primary-hover light:focus:bg-primary-hover focus:outline-none transition-colors"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing up...' : 'Sign up →'}
          </Button>
          <div className="mt-5 text-sm text-panel-secondary-content flex items-center justify-center gap-2">
            By signing in, you agree to our
            <a
              href="#"
              className="text-primary hover:text-primary-hover text-lg"
            >
              terms of service
            </a>
            and
            <a
              href="#"
              className="text-primary hover:text-primary-hover text-lg"
            >
              privacy policy
            </a>
          </div>
          <Divider className="mt-5 mb-5" variant="secondary" />
          <div className="mt-5 text-panel-secondary-content text-sm flex items-center justify-center gap-2">
            Already have an account?
            <a
              href="#"
              className="text-primary hover:text-primary-hover text-lg"
            >
              Sign in
            </a>
          </div>
        </form>
      </Card>
    </motion.div>
  );
};
