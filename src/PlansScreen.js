import React, { useEffect, useState } from "react";
import "./css/PlansScreen.css";
import db from "./firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";

function PlanScreen() {
  const [products, setProducts] = useState({});
  const user = useSelector(selectUser);

  useEffect(() => {
    async function fetchData() {
      var temp = {};
      const productsSnapshot = await getDocs(
        query(collection(db, "products"), where("active", "==", true))
      );
      productsSnapshot.forEach(async function (product) {
        temp[product.id] = product.data();
        const priceSnap = await getDocs(
          collection(db, "products", product.id, "prices")
        );
        priceSnap.forEach((price) => {
          temp[product.id].prices = {
            priceId: price.id,
            priceData: price.data(),
          };
        });
      });

      setProducts(temp);
    }
    fetchData();
  }, []);

  const loadCheckout = async function (priceId) {
    const customerDoc = doc(db, "customers", user.uid,"checkout_sessions");
    const docRef = await setDoc(customerDoc, {
      price: priceId,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    });
    
    docRef.onSnapshot(customerDoc, (snap) => {
      const { error, url } = snap.data();
      if (error) {
        alert(`An error occured: ${error.message}`);
      }
      if (url) {
        window.location.assign(url);
      }
    });
  };

  return (
    <div className="plansScreen">
      {Object.entries(products).map(([productId, productData]) => {
        return (
          <div className="planScreen_plan" key={productId}>
            <div className="plansScreen_info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button
              onClick={() => {
                loadCheckout(productData.prices.priceId);
              }}
            >
              Subscribe
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default PlanScreen;
