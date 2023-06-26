import App from './App'
import React, {createContext, useState, useEffect} from 'react'
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
import { UpdateDepositsPage } from './pages/DepositsPage/UpdateDepositsPage';
import { ViewUserPage } from './pages/UserPages/ViewUserPage';
import { AddUserPage } from './pages/UserPages/AddUserPage';
import { UpdateUserPage } from './pages/UserPages/UpdateUserPage';
import { ProductsPage } from './pages/ProductsPage/ProductsPage';
import { ViewProductsPage } from './pages/ProductsPage/ViewProductsPage';
import { AddProductsPage } from './pages/ProductsPage/AddProductsPage';
import { UpdateProductsPage } from './pages/ProductsPage/UpdateProductsPage';



export const AuthContext = createContext();
const role = localStorage.getItem('role')


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
            errorElement: <NotFoundPage/>,
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
                    element:  <Menu></Menu>,
                    children: [
                        {
                            path: '',
                            element:  <MenuPage></MenuPage>,
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
                                        },
                                        {
                                            path: 'update/:id',
                                            element: <UpdateDepositsPage></UpdateDepositsPage>
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
                                            path: 'update/:id',
                                            element: <UpdateProductsPage></UpdateProductsPage>
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
        <AuthContext.Provider value={{ loggedIn, setLoggedIn, dataUser, setDataUser}}>
            <RouterProvider router={routes} />
        </AuthContext.Provider>
    )
}