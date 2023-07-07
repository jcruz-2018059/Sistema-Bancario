import App from './App'
import { createContext, useState, useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HomePage } from './pages/HomePage/HomePage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { LoginPage } from './pages/UserPages/LoginPage';
import { MenuPage } from './collections/MenuPage';
import { Menu } from './pages/MenuPage/Menu';
import { UserPage } from './pages/UserPages/UserPage';
import { AccountPage } from './pages/UserPages/AccountPage';
import { AccountUpdate } from './pages/UserPages/AccountUpdate';
import { WelcomePage } from './pages/HomePage/WelcomePage';
import { DepositsPage } from './pages/DepositsPage/DepositsPage';
import { ViewDepositsPage } from './pages/DepositsPage/ViewDepositsPage';
import { AddDepositsPage } from './pages/DepositsPage/AddDepositsPage';
import { ViewUserPage } from './pages/UserPages/ViewUserPage';
import { AddUserPage } from './pages/UserPages/AddUserPage';
import { UpdateUserPage } from './pages/UserPages/UpdateUserPage';
import { ProductsPage } from './pages/ProductsPage/ProductsPage';
import { ViewProductsPage } from './pages/ProductsPage/ViewProductsPage';
import { AddProductsPage } from './pages/ProductsPage/AddProductsPage';
import { UpdateProductsPage } from './pages/ProductsPage/UpdateProductsPage';
import { FavoritesPage } from './pages/FavoritsPage/FavoritesPage';
import { ViewFavoritesPage } from './pages/FavoritsPage/ViewFavoritesPage';
import { AddFavoritesPage } from './pages/FavoritsPage/AddFavoritesPage';
import { UpdateFavoritesPage } from './pages/FavoritsPage/UpdateFavoritesPage';
import { MovementsPage } from './pages/MovementsPage/MovementsPage';
import { ViewMovementsPage } from './pages/MovementsPage/ViewMovementsPage';
import { ViewUserMovementsPage } from './pages/MovementsPage/ViewUserMovementsPage'
import { ViewHistoryPage } from './pages/MovementsPage/ViewHistoryPage';
import { TransferPage } from './pages/MovementsPage/TransferPage';
import { AddAdminPage } from './pages/UserPages/AddAdminPage';
import { BuyProductPage } from './pages/ProductsPage/BuyProductPage';



export const AuthContext = createContext();



export const Index = () => {
    const [dataUser, setDataUser] = useState({
        name: '',
        username: '',
        role: ''
    })
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        let token = localStorage.getItem('token')
        if (token) setLoggedIn(true)
    }, [])

    useEffect(() => {
        let data = dataUser
        if (data) setDataUser(data);
    }, [dataUser])

    const routes = createBrowserRouter([
        {
            path: '/',
            element: <App></App>,
            errorElement: <NotFoundPage />,
            children: [
                {
                    path: '/',
                    element: <HomePage></HomePage>
                },
                {
                    path: '/login',
                    element: <LoginPage></LoginPage>
                },
                {
                    path: '/start',
                    element: loggedIn ? <Menu></Menu> : <LoginPage></LoginPage>,
                    children: [
                        {
                            path: '',
                            element: <MenuPage></MenuPage>,
                            children: [
                                {
                                    path: 'account',
                                    element: <UserPage></UserPage>,
                                    children: [
                                        {
                                            path: '',
                                            element: <AccountPage></AccountPage>
                                        },
                                        {
                                            path: 'update/:id',
                                            element: <AccountUpdate></AccountUpdate>
                                        }
                                    ]
                                },
                                {
                                    path: 'users',
                                    element: <UserPage></UserPage>,
                                    children: [
                                        {
                                            path: '',
                                            element: <ViewUserPage></ViewUserPage>
                                        },
                                        {
                                            path: 'add',
                                            element: <AddUserPage></AddUserPage>
                                        },
                                        {
                                            path: 'addAdmin',
                                            element: <AddAdminPage></AddAdminPage>
                                        },
                                        {
                                            path: 'update/:id',
                                            element: <UpdateUserPage></UpdateUserPage>
                                        }
                                    ]
                                },
                                {
                                    path: '',
                                    element: <WelcomePage></WelcomePage>
                                },
                                {
                                    path: 'deposits',
                                    element: <DepositsPage></DepositsPage>,
                                    children: [
                                        {
                                            path: '',
                                            element: <ViewDepositsPage></ViewDepositsPage>
                                        },
                                        {
                                            path: 'add',
                                            element: <AddDepositsPage></AddDepositsPage>
                                        }
                                    ]
                                },
                                {
                                    path: 'products',
                                    element: <ProductsPage></ProductsPage>,
                                    children: [
                                        {
                                            path: '',
                                            element: <ViewProductsPage></ViewProductsPage>
                                        },
                                        {
                                            path: 'add',
                                            element: <AddProductsPage></AddProductsPage>
                                        },
                                        {
                                            path: 'buy/:id',
                                            element: <BuyProductPage></BuyProductPage>
                                        },
                                        {
                                            path: 'update/:id',
                                            element: <UpdateProductsPage></UpdateProductsPage>
                                        }
                                    ]
                                },
                                {
                                    path: 'favorites',
                                    element: <FavoritesPage></FavoritesPage>,
                                    children: [
                                        {
                                            path: '',
                                            element: <ViewFavoritesPage></ViewFavoritesPage>
                                        },
                                        {
                                            path: 'add',
                                            element: <AddFavoritesPage></AddFavoritesPage>
                                        },
                                        {
                                            path: 'update/:id',
                                            element: <UpdateFavoritesPage></UpdateFavoritesPage>
                                        },
                                    ]
                                },
                                {
                                    path: 'movements',
                                    element: <MovementsPage></MovementsPage>,
                                    children: [
                                        {
                                            path: '',
                                            element: <ViewMovementsPage></ViewMovementsPage>
                                        },
                                        {
                                            path: ':id',
                                            element: <ViewUserMovementsPage></ViewUserMovementsPage>
                                        },
                                        {
                                            path: 'history',
                                            element: <ViewHistoryPage></ViewHistoryPage>
                                        },
                                        {
                                            path: 'transfer',
                                            element: <TransferPage></TransferPage>
                                        }
                                    ]
                                }

                            ]
                        }
                    ]
                }
            ]
        }
    ])

    return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn, dataUser, setDataUser }}>
            <RouterProvider router={routes} />
        </AuthContext.Provider>
    )
}