import classNames from "classnames"

const className = "font-bold"

const variants = {
  primary:
    "inline-flex items-center m-1 border border-transparent rounded-lg shadow-lg   font-large text-zinc-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
  secondary:
    "inline-flex items-center m-1 rounded-lg font-large text-zinc-200 focus:outline-none focus:ring-2 hover:scale-110 focus:ring-offset-2 focus:ring-indigo-500",
  btnValidation:
    "w-full flex items-center justify-center mt-5 border border-transparent rounded-lg shadow-lg  font-medium text-zinc-200 bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-700",
  btnDelete:
    "focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900",
}

const sizes = {
  sm: "py-1 px-1.5 text-xs",
  md: "py-1.5 px-3 text-md",
  lg: "py-2.5 px-5 text-lg",
}

const Button = (props) => {
  const { variant, size, ...otherProps } = props

  return (
    <button
      {...otherProps}
      className={classNames(className, variants[variant], sizes[size])}
    />
  )
}

export default Button
