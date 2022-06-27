import { Field } from "formik"

const FormFieldSelect = (props) => {
  const { children, ...otherProps } = props

  return (
    <Field {...otherProps}>
      {({ field, meta: { touched, error } }) => (
        <div className="relative z-0 w-full mb-6 group">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
            {children}
          </label>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            {...field}
            {...otherProps}
          >
            <option defaultValue="">Choose a Color</option>
            <option value="blue">Blue</option>
            <option value="red">Red</option>
            <option value="yellow">Yellow</option>
            <option value="green">Green</option>
            <option value="gray">Gray</option>
            <option value="Black">Black</option>
            <option value="White">White</option>
          </select>

          {touched && error ? (
            <p className="text-red-400 p-2 text-sm">{error}</p>
          ) : null}
        </div>
      )}
    </Field>
  )
}

export default FormFieldSelect
