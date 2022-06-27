import classNames from "classnames"

const Input = (props) => {
  const { className, ...otherProps } = props

  return (
    <textarea
      {...otherProps}
      className={classNames(
        "rounded block mt-2 border-2 border-gray-400 py-1 px-2 bg-zinc-100",
        className
      )}
    />
  )
}

export default Input
