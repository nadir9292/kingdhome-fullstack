import { useContext } from "react"
import { AppContext } from "../src/components/AppContext"
import Layout from "../src/components/Layout"
import useApi from "../src/components/useApi"
import Text from "../src/components/Text"
import Button from "../src/components/Button"
import Link from "next/link"

const ShoppingCart = () => {
  const { jwt, logout, id, username } = useContext(AppContext)

  const shoppingCart = useApi(
    { articles: [{ pictures: [{}] }] },
    "get",
    `/api/v1/shoppingCart/findByUsername/${username}`
  )

  return (
    <Layout
      isShow
      title="Kingdhome"
      islogged={!jwt}
      logout={logout}
      id={id}
      username={username}
    >
      <div className="max-w-2xl  mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-4xl lg:px-8">
        <table className="w-full whitespace-nowrap">
          <tbody>
            {shoppingCart.articles.map(
              ({ id, price, name, description, pictures }, index) => (
                <tr
                  key={index}
                  className="text-sm leading-none text-gray-600 h-16 border-b-2 border-gray-300"
                >
                  <td>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-700 rounded-sm flex items-center justify-center">
                        <img
                          src={pictures[0]}
                          alt={pictures[0]}
                          className="w-full h-full object-center object-cover lg:w-full lg:h-full "
                        />
                      </div>
                      <div className="pl-2">
                        <Text variant="card_name" size="lg">
                          {name}
                        </Text>
                        <Text variant="card_description" size="lg">
                          {description}
                        </Text>
                      </div>
                    </div>
                  </td>
                  <td>
                    <Text>{price}$</Text>
                  </td>
                  <td>
                    <select
                      name="quantity"
                      className=" border border-gray-300 ml-2 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option defaultValue="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </td>
                  <td>
                    <Button variant="btnDelete" size="md">
                      <Text variant="nav_bar_text" size="md">
                        DELETE
                      </Text>
                    </Button>
                  </td>
                </tr>
              )
            )}
            <tr className=" leading-none text-gray-600 h-32 border-gray-300">
              <td>
                <div className="flex items-center">
                  <Text variant="card_name" size="lg">
                    TOTAL
                  </Text>
                </div>
              </td>
              <td>
                <Text>{shoppingCart.total}$</Text>
              </td>
              <td>
                <Link href="https://kingdhome-api.herokuapp.com/swagger-ui.html#/payment-controller">
                  <a>
                    <Button variant="btnValidation" size="lg">
                      <Text variant="nav_bar_text" size="md">
                        BUY
                      </Text>
                    </Button>
                  </a>
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  )
}

export default ShoppingCart
