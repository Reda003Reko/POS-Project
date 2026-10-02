import { useEffect, useState } from "react";
import { domain, useCart, useModal } from "../store";
import axios from "axios";
import toast from "react-hot-toast";

export default function Modal() {
  const { modal, setModal } = useModal();
  const [total, setTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [tax, setTax] = useState(0);

  const { cart, setCart } = useCart();
  const [given, setGiven] = useState(0);

  const saveOrder = () => {
    let user = JSON.parse(sessionStorage.getItem("User"));
    // console.log(user);
    let postOrder = {
      data: {
        // user: user.documentId,
        total: total,
        orderStatus: "Under Process",
      },
    };

    let url = domain + "/api/orders";
    axios.post(url, postOrder).then((res) => {
      let orderId = res.data.data.documentId;

      cart.forEach(async (item) => {
        let url2 = domain + "/api/order-items";
        let postOrder = {
          data: {
            order: orderId,
            product: item.documentId,
            qty: item.qty,
          },
        };
        await axios.post(url2, postOrder);
      });

      toast.success("Order Saved");
      setCart([]);
      setModal(false);
    });
  };

  useEffect(() => {
    let newSubTotal = 0;
    cart.forEach((el) => {
      return (newSubTotal = newSubTotal + el.price * el.qty);
    });
    setSubTotal(newSubTotal);

    let newTax = 0.15 * newSubTotal;
    setTax(newTax);

    let newTotal = newSubTotal + newTax;
    setTotal(newTotal);
  }, [cart]);

  return (
    <div
      onClick={() => setModal(false)}
      className="w-full h-dvh bg-black/50 fixed top-0 left-0 flex justify-center items-center"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-[400px] bg-white border rounded-2xl shadow flex  flex-col gap-3 p-4"
      >
        <h1 className="text-center text-2xl">Checkout</h1>
        <p>Total :{total} $ </p>
        <input
          onChange={(event) => setGiven(event.target.value)}
          className="input"
          placeholder="Enter Your given Money !"
        />
        <button
          onClick={saveOrder}
          className="btn btn-success w-full cursor-pointer"
          disabled={given < total ? true : false}
        >
          Save Order
        </button>
        <p className="bg-red-200">Remain :{given == 0 ? 0 : given - total} $</p>
      </div>
    </div>
  );
}
