'use client';
import { Input, Button, Card, Field, ThemeProvider, theme } from 'reablocks';
import { useForm, Controller } from 'react-hook-form';

export const BasicForm = () => {
  const { control, handleSubmit, formState: { isSubmitting } } = useForm();

  return (
    <ThemeProvider theme={theme}>
      <Card>
        <form onSubmit={handleSubmit(values => console.log('values', values))}>
          <Field>
            <Controller
              name="email"
              control={control}
              render={({ field: { value, onBlur, onChange } }) => (
                <Input
                  name="email"
                  disabled={isSubmitting}
                  placeholder="Enter your email address..."
                  value={value}
                  type="email"
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />
          </Field>
          <Field>
            <Controller
              name="password"
              control={control}
              render={({ field: { value, onBlur, onChange } }) => (
                <Input
                  name="password"
                  disabled={isSubmitting}
                  placeholder="Enter your password..."
                  value={value}
                  type="password"
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />
          </Field>
          <Button
            type="submit"
            fullWidth
            variant="filled"
            color="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </Card>
      </ThemeProvider>
  )
}
