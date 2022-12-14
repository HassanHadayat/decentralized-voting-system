import React, { Component } from "react";
import { Stack, Button } from "react-bootstrap";
import "./test.css";
class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="test">
        <div class="row">
          <div class="col-4">.col-4</div>
          <div class="col-4">.col-4</div>
          <div class="col-4">.col-4</div>
        </div>

        <div class="row">
          <div class="col-sm-4">.col-sm-4</div>
          <div class="col-sm-4">.col-sm-4</div>
          <div class="col-sm-4">.col-sm-4</div>
        </div>

        <div class="row">
          <div class="col-md-4">.col-md-4</div>
          <div class="col-md-4">.col-md-4</div>
          <div class="col-md-4">.col-md-4</div>
        </div>

        <div class="row">
          <div class="col-lg-4">.col-lg-4</div>
          <div class="col-lg-4">.col-lg-4</div>
          <div class="col-lg-4">.col-lg-4</div>
        </div>

        <div class="row">
          <div class="col-xl-4">.col-xl-4</div>
          <div class="col-xl-4">.col-xl-4</div>
          <div class="col-xl-4">.col-xl-4</div>
        </div>
      </div>
    );
  }
}
export default Test;
