import { Field } from "formik"
import TextArea from "./TextArea"

const FormField = (props) => {
  const { children, className, ...otherProps } = props

  return (
    <Field {...otherProps}>
      {({ field, meta: { touched, error } }) => (
        <div className={className}>
          <label className="block font-bold mt-2">
            {children}
            <TextArea className="w-full" {...field} {...otherProps} />
          </label>
          {touched && error ? (
            <p className="text-red-500 p-2 text-sm">{error}</p>
          ) : null}
        </div>
      )}
    </Field>
  )
}

export default FormField
