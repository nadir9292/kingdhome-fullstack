import { Field } from "formik"
import Input from "./Input"

const FormField = (props) => {
  const { children, ...otherProps } = props

  return (
    <Field {...otherProps}>
      {({ field, meta: { touched, error } }) => (
        <div className="relative z-0 w-full mb-6 group">
          <Input
            className="block py-2.5 px-0 w-full text-xl text-zinc-100 bg-transparent  border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            {...field}
            {...otherProps}
          />
          <label className="peer-focus:font-medium absolute text-xl text-zinc-100  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            {children}
          </label>
          {touched && error ? (
            <p className="text-red-400 p-2 text-sm">{error}</p>
          ) : null}
        </div>
      )}
    </Field>
  )
}

export default FormField
