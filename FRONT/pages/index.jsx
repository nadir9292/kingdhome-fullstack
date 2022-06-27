import Layout from "../src/components/Layout"
import { useContext } from "react"
import { AppContext } from "../src/components/AppContext"
import useApi from "../src/components/useApi"
import Text from "../src/components/Text"
import Link from "next/link"
import SearchBar from "../src/components/SearchBar"
import Pagination from "../src/components/Pagination"

const Index = () => {
  const { jwt, logout, id, username } = useContext(AppContext)
  const articles = useApi(
    { content: [] },
    "get",
    "/api/v1/articles/allpage?size=8&page=0"
  )
  const searchData = useApi([], "get", "/api/v1/articles/all")

  return (
    <Layout
      title="Kingdhome"
      islogged={!jwt}
      logout={logout}
      id={id}
      username={username}
    >
      <div className="max-w-2xl  mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <SearchBar data={searchData} />
        <div className="mt-6 grid  grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ">
          {articles.content.map(
            ({ id, name, category, price, rating, pictures }, index) => (
              <div key={index} className="group relative hover:scale-105">
                <div className="w-full min-h-80  aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none ">
                  <img
                    src={pictures[0]}
                    alt={pictures[0]}
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full "
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <Link
                      href={{
                        pathname: `./detailsArticle/${id}`,
                      }}
                    >
                      <a>
                        <span aria-hidden="true" className="absolute inset-0" />
                        <Text variant="card_name" size="md">
                          {name}
                        </Text>
                        <Text variant="card_category" size="md">
                          {category}
                        </Text>
                      </a>
                    </Link>
                    <Text variant="card_price" size="md">
                      {price}$
                    </Text>
                  </div>
                  <Text variant="card_rating" size="lg">
                    ⭐{rating}
                  </Text>
                </div>
              </div>
            )
          )}
        </div>
        <Pagination />
      </div>
    </Layout>
  )
}

export default Index
