import React, { useState, useEffect, useRef } from "react";
import Stripe from "./Stripe.js";
import "./App.css";

export default function App({ children }) {
  return (
    <>
      <header id="header-root">
        <div className="container-fluid" id="header-contents">
          <div>Left Content</div>
          <Stripe />
          <div>Right Content</div>
        </div>
      </header>

      {/* <div className="navbar">
        <div class="cont">
          <div className="single">
            <p>Name</p>
            <div>
              <div class="dropdown"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-box-container">
        <div className="flexible-box"></div>
      </div> */}
    </>
  );
}
