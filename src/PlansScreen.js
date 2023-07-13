import React, { useEffect, useState } from "react";
import "./css/PlansScreen.css";
import db from "./firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";

function PlanScreen() {
  const [products, setProducts] = useState({});
  const [subscription, setSubscription] = useState();
  const [buttonClicked, setButtonClicked]= useState("");
  const user = useSelector(selectUser);


  useEffect(()=>{
    async function fetchData(){
      const subscriptionSnapshot = await getDocs(
        collection(db, "customers", user.uid, "subscriptions")
      );
      subscriptionSnapshot.forEach(async (subscriptionDoc)=>{
        const subscriptionSnap = await getDoc(doc(db,"customers",user.uid,"subscriptions",subscriptionDoc.id));
        setSubscription(subscriptionSnap.data().role);
      })
    }
    fetchData();
  },[]);

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
    const docRef = await addDoc(collection(db,"customers", user.uid, "checkout_sessions"), {
      price: priceId,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    });
    onSnapshot(docRef, (snap) => {
      const { error, url } = snap.data();
      if (error) {
        // Show an error to your customer and
        // inspect your Cloud Function logs in the Firebase console.
        alert(`An error occured: ${error.message}`);
      }
      if (url) {
        // We have a Stripe Checkout URL, let's redirect.
        window.location.assign(url);
      }
    })
  };

  return (
    <div className="plansScreen">
      {Object.entries(products).map(([productId, productData]) => {
        return (
          <div className="planScreen_plan" key={productId} id={productData.role}>
            <div className="plansScreen_info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button
              onClick={() => {
                loadCheckout(productData.prices.priceId);
              }}
              className={subscription === productData.role ? "planbtn_disabled": "planbtn_active"}
            >
              {subscription === productData.role ? "Current Plan": "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default PlanScreen;
