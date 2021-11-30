import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


import { adminRouters, clientRouters, loginRouters } from "routers";
import PageNotFound from "containers/share/PageNotFound/PageNotFound";
import LoginLayout from "layout/Login/LoginLayout";
import AdminLayout from "layout/Admin/AdminLayout";
import ClientLayout from "layout/Client/ClientLayout";

function App() {
  const renderLayout = (routes, Layout) => {
    return routes.map((routes, idx) => {
      const { path, component, exact, isPrivate } = routes;
      return (
        <Layout
          key={component}
          path={path}
          exact={exact}
          component={component}
          isPrivate={isPrivate}
        />
      );
    });
  };
  return (
    <div className="App">
      <Router>
        <Switch>
          {renderLayout(clientRouters, ClientLayout)}
          {renderLayout(loginRouters, LoginLayout)}
          {renderLayout(adminRouters, AdminLayout)}

         
          <Route path="*" component={PageNotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
