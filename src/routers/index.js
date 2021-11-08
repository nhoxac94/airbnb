import Home from "containers/client/Home/Home"


export const clientRouters = [
    {
        path: "/",
        component : Home,
        exact: true,
        isPrivate: false,
    }
]

// export const adminRouters = [
//     {
//         path: "/",
//         component : Home,
//         exact: true,
//         isPrivate: false,
//     }
// ]
