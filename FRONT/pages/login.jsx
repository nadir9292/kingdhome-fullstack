import Layout from "../src/components/Layout"
import { Formik } from "formik"
import FormField from "../src/components/formUI/FormField"
import Button from "../src/components/Button"
import Text from "../src/components/Text"
import {
  usernameValidator,
  passwordValidator,
} from "../src/components/validators/validators"
import * as yup from "yup"
import { useCallback, useContext, useState } from "react"
import { makeClient } from "../src/services/makeClient"
import { AppContext } from "../src/components/AppContext"
import { useRouter } from "next/router"
import Popup from "../src/components/Popup"
import Link from "next/link"

const initialValues = {
  username: "",
  password: "",
}

const validationSchema = yup.object().shape({
  username: usernameValidator.required(),
  password: passwordValidator.required(),
})

const Login = () => {
  const router = useRouter()

  const redirect = () => {
    router.reload()
  }

  const { jwt, logout, username } = useContext(AppContext)

  const [error, setError] = useState(null)

  const { savejwt } = useContext(AppContext)

  const [buttonPopup, setButtonPopup] = useState(false)

  const handleFormSubmit = useCallback(async ({ username, password }) => {
    setError(null)
    try {
      const {
        data: { jwt, id, username: pseudo },
      } = await makeClient().post("/api/v1/auth/signin", { username, password })

      if (!jwt) {
        throw new Error("Missing jwt.")
      }

      redirect()
      savejwt(jwt, id, pseudo)
    } catch (err) {
      const { response: { data } = {} } = err
      if (data.error) {
        setError(data.error)
        return
      }
      setError("Oops, something went wrong.")
    }
  }, [])

  return (
    <Layout
      title="Kingdhome"
      islogged={!jwt}
      logout={logout}
      username={username}
    >
      <div className="max-w-2xl  mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-4xl lg:px-8">
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {({ isSubmitting, isValid, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Text variant="login_register" size="xl">
                Welcome
              </Text>
              <FormField name="username" type="text" placeholder=" ">
                Username
              </FormField>
              <FormField name="password" type="password" placeholder=" ">
                Password
              </FormField>
              <Text variant="info" sizes="sm">
                Don't have an account ?&nbsp;
                <Link href="/register">
                  <a>
                    <Text variant="link">Sign Up</Text>
                  </a>
                </Link>
              </Text>
              <Button
                type="submit"
                onClick={() => setButtonPopup(true)}
                disabled={isSubmitting || !isValid}
                variant="btnValidation"
                size="lg"
              >
                Sign Up
              </Button>
              {!error ? (
                <Popup
                  variant="login_success"
                  trigger={buttonPopup}
                  setTrigger={setButtonPopup}
                >
                  <Text variant="popup">Welcome 😊</Text>
                </Popup>
              ) : (
                <Popup
                  variant="login_error"
                  trigger={buttonPopup}
                  setTrigger={setButtonPopup}
                >
                  <Text variant="popup">Bad credential 💀</Text>
                </Popup>
              )}
            </form>
          )}
        </Formik>
      </div>
    </Layout>
  )
}

export default Login
