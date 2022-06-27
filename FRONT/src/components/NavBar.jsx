import { Dialog, Transition, Menu } from "@headlessui/react"
import { Fragment, useState } from "react"
import {
  MenuIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  XIcon,
  LogoutIcon,
  AdjustmentsIcon,
  PlusIcon,
} from "@heroicons/react/outline"
import Image from "next/image"
import Link from "next/link"
import Text from "./Text"
import useApi from "../../src/components/useApi"

const NavBar = (props) => {
  const [open, setOpen] = useState(false)
  const { islogged, logout, id: userId, username } = props
  const articleInCart = useApi(
    { articles: [{}] },
    "get",
    `/api/v1/shoppingCart/findByUsername/${username}`
  )

  return (
    <>
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 flex z-40">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
                <div className="px-4 pt-5 pb-2 flex">
                  <button
                    type="button"
                    className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                {islogged ? (
                  <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                    you must be logged in, to see your profile
                  </div>
                ) : (
                  <div className="border-t border-gray-200  ">
                    <div className="flex flex-row p-4">
                      <EditInactiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                      <Link
                        href={{
                          pathname: `./detailsProfil/${userId}`,
                        }}
                      >
                        <a>Edit my profil</a>
                      </Link>
                    </div>
                    <div className="flex flex-row px-4 pb-2">
                      <EditInactiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                      <Link href="https://kingdhome-api.herokuapp.com/swagger-ui.html#/auth-controller">
                        <a>Change my password</a>
                      </Link>
                    </div>
                  </div>
                )}

                <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                  {islogged ? (
                    <>
                      <div className="flow-root">
                        <Link
                          href="/login"
                          className="-m-2 p-2 block font-medium text-gray-900"
                        >
                          <a>Sign in</a>
                        </Link>
                      </div>
                      <div className="flow-root">
                        <Link
                          href="/register"
                          className="-m-2 p-2 block font-medium text-gray-900"
                        >
                          <a>Create account</a>
                        </Link>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex flex-row">
                        <PlusIcon className="mr-2 h-5 w-5 text-gray-500" />
                        <Link href="/addArticle">
                          <a>Add an article</a>
                        </Link>
                      </div>
                      <div className="flex flex-row">
                        <EditInactiveIcon className="mr-2 h-5 w-5 text-gray-500" />
                        <Link href="https://kingdhome-api.herokuapp.com/swagger-ui.html#/article-controller">
                          <a>Modify an article</a>
                        </Link>
                      </div>
                      <div className="flex flex-row text-red-500">
                        <XIcon className="mr-2 h-5 w-5 " />
                        <Link href="https://kingdhome-api.herokuapp.com/swagger-ui.html#/article-controller">
                          <a>Delete an article</a>
                        </Link>
                      </div>
                      <div className="flex flex-row text-red-500 py-5">
                        <LogoutIcon className="mr-2 h-5 w-5 " />
                        <button onClick={logout}>Log Out</button>
                      </div>
                    </>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      {/* Mobile menu */}

      <header className="relative ">
        <nav aria-label="Top" className=" mx-auto px-2 sm:px-3 lg:px-4 ">
          <div className="h-16 flex items-center ">
            <button
              type="button"
              className="p-2 rounded-md text-gray-400 lg:hidden"
              onClick={() => setOpen(true)}
            >
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Logo */}
            <div className="flex flex-row items-center hover:scale-105">
              <Link href="/">
                <a>
                  <Image priority src="/logo.png" width={250} height={65} />
                </a>
              </Link>
            </div>

            <div className="ml-auto flex items-center">
              {islogged ? (
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <Link href="/login">
                    <a>
                      <Text variant="nav_bar_text" size="lg">
                        Sign in
                      </Text>
                    </a>
                  </Link>
                  <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  <Link href="/register">
                    <a>
                      <Text variant="nav_bar_text" size="lg">
                        Create account
                      </Text>
                    </a>
                  </Link>
                </div>
              ) : (
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6 ">
                  <Menu
                    as="div"
                    className="z-40 relative inline-block text-left "
                  >
                    <Menu.Button className="inline-flex w-full justify-center px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                      <UserCircleIcon className="flex-shrink-0 h-6 w-6 text-zinc-200  hover:text-zinc-300 mr-2" />
                      <Text variant="nav_bar_text" size="lg">
                        {username}
                      </Text>
                    </Menu.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-zinc-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1 ">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href={{
                                  pathname: `./detailsProfil/${userId}`,
                                }}
                              >
                                <a>
                                  <button
                                    className={`${
                                      active
                                        ? "bg-orange-500 text-white"
                                        : "text-gray-900"
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                  >
                                    {active ? (
                                      <EditActiveIcon
                                        className="mr-2 h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    ) : (
                                      <EditInactiveIcon
                                        className="mr-2 h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    )}
                                    Edit my profil
                                  </button>
                                </a>
                              </Link>
                            )}
                          </Menu.Item>
                        </div>
                        <div className="px-1 py-1 ">
                          <Menu.Item>
                            {({ active }) => (
                              <Link href="https://kingdhome-api.herokuapp.com/swagger-ui.html#/auth-controller">
                                <a>
                                  <button
                                    className={`${
                                      active
                                        ? "bg-orange-500 text-white"
                                        : "text-gray-900"
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                  >
                                    {active ? (
                                      <EditActiveIcon
                                        className="mr-2 h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    ) : (
                                      <EditInactiveIcon
                                        className="mr-2 h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    )}
                                    Change my password
                                  </button>
                                </a>
                              </Link>
                            )}
                          </Menu.Item>
                        </div>
                        <div className="px-1 py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={logout}
                                className={`${
                                  active
                                    ? "bg-orange-500 text-white"
                                    : "text-red-400"
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                              >
                                {active ? (
                                  <LogoutIcon
                                    className="mr-2 h-5 w-5 text-zinc-100"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <LogoutIcon
                                    className="mr-2 h-5 w-5 text-red-400"
                                    aria-hidden="true"
                                  />
                                )}
                                Log Out
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                  <Menu
                    as="div"
                    className="z-40 relative inline-block text-left "
                  >
                    <Menu.Button className="inline-flex w-full justify-center px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                      <AdjustmentsIcon className="flex-shrink-0 h-6 w-6 text-zinc-200  hover:text-zinc-300" />
                      <Text variant="nav_bar_text" size="lg">
                        Manage article
                      </Text>
                    </Menu.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-zinc-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1 ">
                          <Menu.Item>
                            {({ active }) => (
                              <Link href="/addArticle">
                                <a>
                                  <button
                                    className={`${
                                      active
                                        ? "bg-orange-500 text-white"
                                        : "text-gray-900"
                                    } group flex w-full items-center rounded-md px-1 py-1 text-sm`}
                                  >
                                    {active ? (
                                      <PlusIcon
                                        className="mr-2 h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    ) : (
                                      <PlusIcon
                                        className="mr-2 h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    )}
                                    Add an arcticle
                                  </button>
                                </a>
                              </Link>
                            )}
                          </Menu.Item>
                        </div>
                        <div className="px-1 py-1 ">
                          <Menu.Item>
                            {({ active }) => (
                              <Link href="https://kingdhome-api.herokuapp.com/swagger-ui.html#/article-controller">
                                <a>
                                  <button
                                    className={`${
                                      active
                                        ? "bg-orange-500 text-white"
                                        : "text-gray-900"
                                    } group flex w-full items-center rounded-md px-1 py-1 text-sm`}
                                  >
                                    {active ? (
                                      <EditInactiveIcon
                                        className="mr-2 h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    ) : (
                                      <EditInactiveIcon
                                        className="mr-2 h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    )}
                                    Modify an arcticle
                                  </button>
                                </a>
                              </Link>
                            )}
                          </Menu.Item>
                        </div>
                        <div className="px-1 py-1 ">
                          <Menu.Item>
                            {({ active }) => (
                              <Link href="https://kingdhome-api.herokuapp.com/swagger-ui.html#/article-controller">
                                <a>
                                  <button
                                    className={`${
                                      active
                                        ? "bg-orange-500 text-white"
                                        : "text-red-400"
                                    } group flex w-full items-center rounded-md px-1 py-1 text-sm`}
                                  >
                                    {active ? (
                                      <XIcon
                                        className="mr-2 h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    ) : (
                                      <XIcon
                                        className="mr-2 h-5 w-5 text-red-400"
                                        aria-hidden="true"
                                      />
                                    )}
                                    Delete an article
                                  </button>
                                </a>
                              </Link>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              )}
              {/* Cart */}
              {!islogged ? (
                <div className="ml-4 lg:ml-6 flex flex-row">
                  <Link href="/shoppingCart">
                    <a>
                      <Text variant="nav_bar_text" size="lg">
                        <ShoppingBagIcon className="flex-shrink-0 h-6 w-6 mr-1 text-zinc-100 hover:text-zinc-300" />
                      </Text>
                    </a>
                  </Link>
                  <Text variant="nav_bar_text" size="lg">
                    {articleInCart.articles.length}
                  </Text>
                  <span className="sr-only">items in cart, view bag</span>
                </div>
              ) : (
                <h1></h1>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}

function EditInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
    </svg>
  )
}

export default NavBar
