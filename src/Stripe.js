import React, { useState, useEffect, useRef } from "react";
import "./Stripe.css";

const Stripe = () => {
  const stripeBox = useRef(null);
  const stripeItems = useRef(null);
  const [open, setOpen] = useState(false);

  const openStripe = (targetElement) => {
    setOpen(true);

    const { width, height, left } = targetElement.getBoundingClientRect();
    stripeBox.current.style.height = `${height}px`;
    stripeBox.current.style.width = `${width}px`;
    stripeBox.current.style.left = `${left}px`;

    const stripeList =
      stripeItems.current.querySelectorAll(".dropdown-content");
    let beforeTarget = true;
    for (let element of stripeList) {
      if (element === targetElement) {
        element.classList.add("show");
        element.children[0].style.transform = `translateX(0%)`;
        beforeTarget = false;
      } else {
        element.classList.remove("show");
        element.children[0].style.transform = beforeTarget
          ? `translateX(-40%)`
          : `translateX(40%)`;
      }
    }
  };

  const keepStripeOpen = () => {
    if (open) {
      setOpen(true);
    }
  };

  const resetStripe = () => {
    stripeBox.current.style.height = "initial";
    stripeBox.current.style.width = "initial";
    stripeBox.current.style.left = "initial";
  };

  useEffect(() => {
    if (!open) {
      stripeBox.current.addEventListener("transitionend", resetStripe);

      const stripeList = [
        ...stripeItems.current.querySelectorAll(".dropdown-content"),
      ];
      stripeList.map((element) => {
        element.classList.remove("show");
        console.log(element.children);
        element.children[0].style.transform = `translateX(0%)`;
        console.log("test");
      });
    }
    return () =>
      stripeBox.current.removeEventListener("transitionend", resetStripe);
  });

  return (
    <div className="stripe-container">
      <nav
        className="stripe-navbar"
        ref={stripeItems}
        onMouseEnter={keepStripeOpen}
        onMouseLeave={() => setOpen(false)}
      >
        <StripeItem name="Sample Name" openStripe={openStripe}>
          <div id="example">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Accusantium ab dicta rerum aliquam excepturi, enim, illo dignissimos
            amet quaerat natus, eaque quasi! Reprehenderit minus voluptatum
            numquam ratione, deleniti ipsam. Minima.
          </div>
        </StripeItem>
        <StripeItem name="Second Sample" openStripe={openStripe}>
          <div id="example">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Accusantium ab dicta rerum aliquam excepturi, enim, illo dignissimos
            amet quaerat natus, eaque quasi! Reprehenderit minus voluptatum
            numquam ratione, deleniti ipsam. Minima. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Vitae rem quisquam obcaecati id. Ea
            nemo quod nihil a ex earum nesciunt quidem? Ut vel distinctio amet
            ipsam ad ipsa modi.
          </div>
        </StripeItem>
      </nav>
      <div
        className={open ? "stripe-box show" : "stripe-box"}
        ref={stripeBox}
        onMouseEnter={keepStripeOpen}
        onMouseLeave={() => setOpen(false)}
      ></div>
    </div>
  );
};

export default Stripe;

const StripeItem = ({ name, children, openStripe }) => {
  const initializeStripe = (e) => {
    const element = e.currentTarget;
    const timeoutId = setTimeout(() => {
      openStripe(element.querySelector(".dropdown-content"));
    }, 500);
    element.onmouseleave = () => {
      clearTimeout(timeoutId);
    };
  };

  return (
    <div className="stripe-item" onMouseEnter={initializeStripe}>
      <p className="stripe-toggle-btn">{name}</p>
      <div className="centering-stripe-content">
        <div className="dropdown-content">{children}</div>
      </div>
    </div>
  );
};
