import React, { Component } from "react";
import { Spin } from "antd";
import "./Loader.scss";
export default class Loader extends Component {
  render() {
    return (
      <div className="text-center loader">
        <Spin size="large" className='spinner' />
      </div>
    );
  }
}
