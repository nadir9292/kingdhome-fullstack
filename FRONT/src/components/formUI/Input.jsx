import classNames from "classnames"

const Input = (props) => {
  const { className, ...otherProps } = props

  return <input {...otherProps} className={classNames("mt-2", className)} />
}

export default Input
