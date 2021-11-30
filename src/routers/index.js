import LocationManagement from "containers/admin/LocationManagement/LocationManagement"
import ReviewsManagement from "containers/admin/LocationManagement/ReviewsManagement"
import RoomManagement from "containers/admin/LocationManagement/RoomManagement"
import UserManagement from "containers/admin/UserManagement/UserManagement"
import Login from "containers/auth/Login"
import SignUp from "containers/auth/SignUp"
import Home from "containers/client/Home/Home"
import RoomDetails from "containers/client/RoomDetails.jsx/RoomDetails"
import Rooms from "containers/client/Rooms/Rooms"
import UserInformation from "containers/client/UserInformation/UserInformation"


export const clientRouters = [
    {
        path: "/",
        component : Home,
        exact: true,
        isPrivate: false,
    },
    {
        path: "/location/:idLocation",
        component : Rooms,
        exact: true,
        isPrivate: false,
    },
    {
        path: "/rooms/:idRoom",
        component : RoomDetails,
        exact: true,
        isPrivate: false,
    },
    {
        path: "/informationUser",
        component : UserInformation,
        exact: true,
        isPrivate: false,
    },
    

]

export const adminRouters = [
    {
        path: "/admin/location",
        component : LocationManagement,
        exact: true,
        isPrivate: true,
    },
    {
        path: "/admin/user",
        component : UserManagement,
        exact: true,
        isPrivate: true,
    },
    {
        path: "/admin/location/:idLocation",
        component : RoomManagement,
        exact: true,
        isPrivate: true,
    },
    {
        path: "/rooms/reviews/:idRoom",
        component : ReviewsManagement,
        exact: true,
        isPrivate: true,
    },

]

export const loginRouters = [
    {
        path: "/login",
        component : Login,
        exact: true,
        isPrivate: false,
    },
    {
        path: "/sign-up",
        component : SignUp,
        exact: true,
        isPrivate: false,
    }
]
