import { AppContext } from "../src/components/AppContext"
import Layout from "../src/components/Layout"
import { Formik } from "formik"
import FormField from "../src/components/formUI/FormField"
import Button from "../src/components/Button"
import Text from "../src/components/Text"
import {
  categoryValidator,
  descriptionValidator,
  priceValidator,
  rateValidator,
  quantityValidator,
  usernameValidator,
} from "../src/components/validators/validators"
import * as yup from "yup"
import { useCallback, useContext, useState } from "react"
import { makeClient } from "../src/services/makeClient"
import Popup from "../src/components/Popup"
import FormFieldSelect from "../src/components/formUI/FormFielsSelect"

const initialValues = {
  category: "",
  color: [],
  description: "",
  favorites: false,
  name: "",
  pictures: [],
  price: 0,
  quantity: 0,
  rating: 0,
}

const validationSchema = yup.object().shape({
  category: categoryValidator.required(),
  description: descriptionValidator.required(),
  name: usernameValidator.required(),
  price: priceValidator.required(),
  quantity: quantityValidator.required(),
  rating: rateValidator.required(),
})

const AddArticle = () => {
  const { jwt, logout, id, username } = useContext(AppContext)
  const [buttonPopup, setButtonPopup] = useState(false)
  const [error, setError] = useState(null)
  const handleFormSubmit = useCallback(
    async ({
      category,
      color,
      description,
      favorites,
      name,
      pictures,
      price,
      quantity,
      rating,
    }) => {
      setError(null)
      try {
        const { data } = await makeClient().post("/api/v1/articles/add", {
          category,
          color,
          description,
          favorites,
          name,
          pictures,
          price,
          quantity,
          rating,
        })
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
                Add an item
              </Text>
              <FormField name="name" type="text" placeholder=" ">
                Name
              </FormField>
              <FormField name="category" type="text" placeholder=" ">
                Category
              </FormField>
              <FormField name="description" type="text" placeholder=" ">
                Description
              </FormField>
              <FormField name="price" type="text" placeholder=" ">
                Price
              </FormField>
              <FormField name="quantity" type="text" placeholder=" ">
                Quantity
              </FormField>
              <FormField name="rating" type="text" placeholder=" ">
                Rating
              </FormField>
              <Text>
                Exemple :&nbsp;
                <span className="text-orange-500 text-justify">
                  https://www.lago.it/wp-content/uploads/2021/04/tavolo-in-legno.jpg
                </span>
              </Text>
              <FormField name="pictures[0]" type="text" placeholder=" ">
                Picture link n°1
              </FormField>
              <FormField name="pictures[1]" type="text" placeholder=" ">
                Picture link n°2
              </FormField>
              <FormField name="pictures[2]" type="text" placeholder=" ">
                Picture link n°3
              </FormField>
              <FormField name="pictures[3]" type="text" placeholder=" ">
                Picture link n°4
              </FormField>
              <FormFieldSelect name="color[0]" type="text" placeholder=" ">
                Color n°1
              </FormFieldSelect>
              <FormFieldSelect name="color[1]" type="text" placeholder=" ">
                Color n°2
              </FormFieldSelect>
              <FormFieldSelect name="color[2]" type="text" placeholder=" ">
                Color n°3
              </FormFieldSelect>
              <Button
                type="submit"
                onClick={() => setButtonPopup(true)}
                disabled={isSubmitting || !isValid}
                variant="btnValidation"
                size="lg"
              >
                Add
              </Button>
              {!error ? (
                <Popup
                  variant="login_success"
                  trigger={buttonPopup}
                  setTrigger={setButtonPopup}
                >
                  <Text variant="popup">Article added !</Text>
                </Popup>
              ) : (
                <Popup
                  variant="login_error"
                  trigger={buttonPopup}
                  setTrigger={setButtonPopup}
                >
                  <Text variant="popup">Error !</Text>
                </Popup>
              )}
            </form>
          )}
        </Formik>
      </div>
    </Layout>
  )
}

export default AddArticle
