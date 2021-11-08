import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "components/Footer/Footer";
import DatePickerCheck from "components/Header/DatePicker";

import Header from "components/Header/Header";
import Home from "containers/client/Home/Home";
import RoomDetails from "containers/client/RoomDetails.jsx/RoomDetails";
import Rooms from "containers/client/Rooms/Rooms";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          {/* <DatePickerCheck/>  */}
          {/* <Rooms/> */}
          {/* <RoomDetails/> */}
          {/* <Footer/> */}
          <Route path="/" exact component={Home} />
          <Route path="/location/:idLocation" exact component={Rooms} />
          <Route path="/rooms/:idRoom" exact component={RoomDetails} />

        </Switch>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
