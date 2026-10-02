import axios from "axios";
import { useEffect, useState } from "react";
import { domain } from "../../store";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function OutsidePage() {
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
              $in: ["Under Process", "Ready"],
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
        orderStatus: "Delivered",
      },
    };
    axios.put(url, dataToUpdate).then(() => {
      toast.success("Order is Ready");
      getOrders();
    });
  };

  useEffect(() => {
    getOrders();
  }, []);

  const underProcessOrders = order.filter(
    (el) => el.orderStatus == "Under Process",
  );
  const readyOrders = order.filter((el) => el.orderStatus == "Ready");

  return (
    <div className="min-h-dvh bg-slate-50 p-4 sm:p-7">
      <header className="mx-auto mb-7 flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm font-bold text-cyan-700">SERVICE STATION</p><h1 className="mt-1 text-3xl font-extrabold text-slate-900">Outside kitchen</h1></div><Link to="/kitchen" className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-bold text-slate-600 shadow-sm hover:border-cyan-500 hover:text-cyan-700">← Back to kitchen</Link></header>
      {order.length == 0 && <div className="empty-state"><div><span className="text-6xl">🛎️</span><h2 className="mt-4">No orders here</h2><p>Orders that are ready for service will appear on this board.</p></div></div>}
      {order.length > 0 && <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
        {underProcessOrders.length > 0 && <div className="flex flex-col gap-4">
          <h2 className="text-center text-2xl font-bold text-slate-800">Under process orders</h2>
          {underProcessOrders.map((el) => {
            return (
                <div
                  key={el.documentId}
                  className="soft-card p-5"
                >
                  <div className="card-body">
                    <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-700">PREPARING</span>
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
                    <div className="mt-6"></div>
                  </div>
                </div>
            );
          })}
        </div>}
        {readyOrders.length > 0 && <div className="flex flex-col gap-4">
          <h2 className="text-center text-2xl font-bold text-slate-800">Ready orders</h2>
          {readyOrders.map((el) => {
            return (
                <div
                  key={el.documentId}
                  className="soft-card p-5"
                >
                  <div className="card-body">
                    <span className="rounded-full bg-cyan-100 px-2.5 py-1 text-xs font-bold text-cyan-700">READY TO SERVE</span>
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
                        className="w-full rounded-xl bg-cyan-700 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-100 hover:bg-cyan-800"
                      >
                        Order Delivered
                      </button>
                    </div>
                  </div>
                </div>
            );
          })}
        </div>}
      </div>}
    </div>
  );
}
