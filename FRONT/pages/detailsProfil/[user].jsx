import { useContext, useCallback, useState } from "react"
import { AppContext } from "../../src/components/AppContext"
import Layout from "../../src/components/Layout"
import Text from "../../src/components/Text"
import { Formik } from "formik"
import {
  usernameValidator,
  sexeValidator,
  postalCodeValidator,
} from "../../src/components/validators/validators"
import * as yup from "yup"
import Button from "../../src/components/Button"
import FormField from "../../src/components/formUI/FormField"
import Popup from "../../src/components/Popup"
import { makeClient } from "../../src/services/makeClient"

// /!\ WARNING : this has been coded by Avetis 🤣💀💀
export const getServerSideProps = async (context) => {
  return {
    props: {
      query: context.query,
    },
  }
}

const initialValues = {
  firstname: "",
  lastname: "",
  sexe: "",
  address: {
    city: "",
    postalCode: "",
    street: "",
  },
}

const validationSchema = yup.object().shape({})

const User = ({ query }) => {
  const { jwt, logout, id, username } = useContext(AppContext)
  const [buttonPopup, setButtonPopup] = useState(false)
  const [error, setError] = useState(null)

  const handleFormSubmit = useCallback(
    async ({
      address: { city, postalCode, street },
      firstname,
      lastname,
      sexe,
    }) => {
      setError(null)
      try {
        const { data } = await makeClient({}).put(
          `/api/v1/user/updateInfos/${id}`,
          {
            address: { city, postalCode, street },
            firstname,
            lastname,
            sexe,
          }
        )
      } catch (err) {
        const { response: { data } = {} } = err
        if (data.error) {
          setError(data.error)
          return
        }
        setError("Oops, something went wrong.")
      }
    },
    []
  )

  return (
    <Layout
      title="Kingdhome"
      islogged={!jwt}
      logout={logout}
      id={id}
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
                Edit my profile
              </Text>
              <FormField name="firstname" placeholder=" " type="text">
                Firstname
              </FormField>
              <FormField name="lastname" placeholder=" " type="text">
                Lastname
              </FormField>
              <FormField name="sexe" placeholder=" " type="text">
                Sexe
              </FormField>
              <FormField name="address.city" placeholder=" " type="text">
                City
              </FormField>
              <FormField name="address.postalCode" placeholder=" " type="text">
                PostalCode
              </FormField>
              <FormField name="address.street" placeholder=" " type="text">
                Street
              </FormField>
              <Button
                type="submit"
                onClick={() => setButtonPopup(true)}
                disabled={isSubmitting || !isValid}
                variant="btnValidation"
                size="lg"
              >
                Edit
              </Button>
              <Popup
                trigger={buttonPopup}
                setTrigger={setButtonPopup}
                variant="login_success"
              >
                <Text variant="popup">Your porfile has been modified 😊.</Text>
              </Popup>
            </form>
          )}
        </Formik>
      </div>
    </Layout>
  )
}

export default User
