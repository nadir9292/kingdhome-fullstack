import { useContext, useEffect, useState } from "react"
import { makeClient } from "../services/makeClient"
import { AppContext } from "./AppContext"

const useApi = (defaultValue, method, ...args) => {
  const [result, setResult] = useState(defaultValue)
  const { jwt } = useContext(AppContext)
  const deps = JSON.stringify(args)

  useEffect(() => {
    ;(async () => {
      const { data } = await makeClient({
        headers: { authentification: jwt },
      })[method](...args)

      setResult(data)
    })()
  }, [jwt, deps, method])

  return result
}

export default useApi
