import classNames from "classnames"

const className = "font-bold"

const variants = {
  login_success: "bg-green-500 popup px-4 py-2 rounded mt-5 shadow-lg",
  login_error: "bg-red-500 popup px-4 py-2 rounded mt-5 shadow-lg",
}

const Popup = (props) => {
  const { variant, size, ...otherProps } = props

  return props.trigger ? (
    <div {...otherProps} className={classNames(className, variants[variant])}>
      <div className="popup-inner">{props.children}</div>
    </div>
  ) : (
    ""
  )
}

export default Popup
