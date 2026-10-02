import axios from "axios";
import { useEffect, useState } from "react";
import { domain } from "../../store";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function InsidePage() {
  const [order, setOrder] = useState([]);

  const getOrders = () => {
    let url = domain + "/api/orders";

    axios
      .get(url, {
        params: {
          populate: {
            order_items: {
              populate: "*",
            },
          },
          filters: {
            orderStatus: {
              $eq: "Under Process",
            },
          },
        },
      })
      .then((res) => {
        setOrder(res.data.data);
      });
  };

  const orderUpdate = (id) => {
    let url = domain + `/api/orders/${id}`;
    let dataToUpdate = {
      data: {
        orderStatus: "Ready",
      },
    };
    axios.put(url, dataToUpdate).then(() => {
      toast.success("Order Has Been Delivered");
      getOrders();
    });
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="min-h-dvh bg-slate-50 p-4 sm:p-7">
      <header className="mx-auto mb-7 flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm font-bold text-brand-600">KITCHEN STATION</p><h1 className="mt-1 text-3xl font-extrabold text-slate-900">Inside kitchen</h1></div><Link to="/kitchen" className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-bold text-slate-600 shadow-sm hover:border-brand-400 hover:text-brand-700">← Back to kitchen</Link></header>
      {order.length == 0 && <div className="empty-state"><div><span className="text-6xl">🍽️</span><h2 className="mt-4">No orders yet</h2><p>New orders will appear here as soon as they are sent from the cashier.</p></div></div>}
      <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {order.map((el) => {
          return (
            <div key={el.documentId} className="soft-card p-5">
              <div>
                <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-700">IN PROGRESS</span>
                <div className="flex justify-between">
                  <h2 className="text-lg font-bold">Order #{el.documentId?.slice(-5)}</h2>
                  <span className="text-xl font-bold text-brand-600">
                    {el.total} $
                  </span>
                </div>
                <ul className="mt-6 flex flex-col gap-2 text-xs">
                  {el.order_items.map((item) => (
                    <li key={item.documentId}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-4 me-2 inline-block text-success"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>
                        {item.qty} - {item.product.name}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <button
                    onClick={() => orderUpdate(el.documentId)}
                    className="w-full rounded-xl bg-brand-500 py-3 text-sm font-bold text-white shadow-lg shadow-amber-100 hover:bg-brand-600"
                  >
                    Order Ready
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
