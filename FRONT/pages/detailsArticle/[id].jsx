import { useCallback, useContext, useState } from "react"
import { AppContext } from "../../src/components/AppContext"
import Layout from "../../src/components/Layout"
import useApi from "../../src/components/useApi"
import Text from "../../src/components/Text"
import Link from "next/link"
import Button from "../../src/components/Button"
import { Formik } from "formik"
import FormField from "../../src/components/formUI/FormField"
import Popup from "../../src/components/Popup"
import { makeClient } from "../../src/services/makeClient"

// /!\ WARNING : this has been coded by Avetis 🤣💀
export const getServerSideProps = async (context) => {
  return {
    props: {
      query: context.query,
    },
  }
}

const Id = ({ query }) => {
  const { jwt, logout, id, username: pseudo } = useContext(AppContext)

  const detailsArticle = useApi(
    { pictures: [{}] },
    "get",
    `/api/v1/articles/find/${query.id}`
  )

  return (
    <Layout
      title="Kingdhome"
      islogged={!jwt}
      logout={logout}
      id={id}
      username={pseudo}
    >
      <div className="pt-6">
        {/* Image gallery */}
        <div className="mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
          <div className="hidden aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block">
            <img
              src={detailsArticle.pictures[2]}
              alt={detailsArticle.pictures[2]}
              className="w-full h-full object-center object-cover"
            />
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
              <img
                src={detailsArticle.pictures[0]}
                alt={detailsArticle.pictures[0]}
                className="w-full h-full object-center object-cover"
              />
            </div>
            <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
              <img
                src={detailsArticle.pictures[3]}
                alt={detailsArticle.pictures[3]}
                className="w-full h-full object-center object-cover"
              />
            </div>
          </div>
          <div className="aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
            <img
              src={detailsArticle.pictures[1]}
              alt={detailsArticle.pictures[1]}
              className="w-full h-full object-center object-cover"
            />
          </div>
        </div>

        {/* detailsArticle info */}
        <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8 ">
            <Text variant="detail_name" size="xl">
              {detailsArticle.name}
            </Text>
            <Text variant="detail_category" size="xl">
              {detailsArticle.category}
            </Text>
            {/* Description and details */}
            <div className="space-y-6">
              <Text variant="detail_description" size="md">
                {detailsArticle.description}
              </Text>
            </div>
          </div>

          {/* Options */}
          <div className="mt-4 lg:mt-0 lg:row-span-3">
            <h2 className="sr-only">Article information</h2>
            <Text variant="detail_price" size="xl">
              {detailsArticle.price}$
            </Text>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <Text variant="detail_rating" size="lg">
                  {detailsArticle.rating}⭐
                </Text>
                <Link href="https://kingdhome-api.herokuapp.com/swagger-ui.html#/comment-controller">
                  <a>
                    <Text variant="link">Reviews</Text>
                  </a>
                </Link>
              </div>
            </div>
            <Link href="https://kingdhome-api.herokuapp.com/swagger-ui.html#/shopping-cart-controller">
              <a>
                <Button variant="btnValidation" size="lg">
                  Add to bag
                </Button>
              </a>
            </Link>
          </div>

          <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8"></div>
        </div>
      </div>
    </Layout>
  )
}

export default Id
