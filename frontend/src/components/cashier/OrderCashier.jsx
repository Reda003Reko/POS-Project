import { useEffect, useState } from "react";
import recycleBin from "../../icons/delete.svg";
import { useCart, useModal } from "../../store";
import { domain } from "../../store/index";

export default function OrderCashier() {
  const { cart, setCart } = useCart();

  let decreaseQty = (idItem) => {
    let itemIndex = cart.findIndex((el) => {
      return el.documentId == idItem;
    });
    let copy = [...cart];
    if (copy[itemIndex].qty == 1) {
      copy.splice(itemIndex, 1);
    } else {
      copy[itemIndex].qty--;
    }
    setCart(copy);
  };

  let increaseQty = (idItem) => {
    let itemIndex = cart.findIndex((el) => {
      return el.documentId == idItem;
    });
    let copy = [...cart];
    copy[itemIndex].qty++;
    setCart(copy);
  };

  const [subTotal, setSubTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

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

  const removeAllOrders = () => {
    setCart([]);
  };

  const { modal, setModal } = useModal();

  return (
    <aside className="flex w-full shrink-0 flex-col overflow-hidden border-t border-slate-200 bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-10px_28px_rgba(15,23,42,.08)] md:h-full md:w-[300px] md:border-t-0 md:border-l-2 md:border-brand-400 md:shadow-none xl:w-[330px]">
      <div className="shrink-0 border-b border-slate-100 px-4 py-3 md:p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold md:text-lg md:font-semibold">
            Current Order
          </h2>
          <img
            onClick={removeAllOrders}
            src={recycleBin}
            alt="Clear order"
            className="h-5 w-5 cursor-pointer"
          />
        </div>

        <div className="mt-3 hidden grid-cols-2 rounded-xl bg-slate-50 p-1 text-[10px] md:mt-4 md:grid">
          <button className="rounded-lg bg-white py-2.5 font-medium text-emerald-500 shadow-sm">
            Dine In
          </button>
          <button className="rounded-lg py-2.5 text-slate-400">
            Take Away
          </button>
        </div>
      </div>

      <div className="max-h-[22vh] min-h-0 space-y-3 overflow-y-auto px-4 py-3 md:max-h-none md:min-h-0 md:flex-1 md:space-y-4 md:p-4">
        {cart.length === 0 && (
          <p className="py-3 text-center text-sm text-slate-400 md:py-8">
            No items yet
          </p>
        )}

        {cart.map((el) => {
          return (
            <div key={el.documentId} className="flex items-center gap-3">
              <img
                src={domain + el.img?.url}
                alt={el.name}
                className="h-10 w-10 rounded-xl object-cover md:h-11 md:w-11"
              />

              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium md:text-[11px]">
                  {el.name}
                </p>
                <p className="mt-0.5 text-xs font-semibold text-emerald-500 md:text-[10px]">
                  {el.price * el.qty} $
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-2 py-1.5 text-xs md:text-[10px]">
                <button
                  onClick={() => decreaseQty(el.documentId)}
                  className="cursor-pointer px-1 text-slate-400"
                >
                  −
                </button>
                <span className="w-4 text-center">{el.qty}</span>
                <button
                  onClick={() => increaseQty(el.documentId)}
                  className="cursor-pointer px-1 text-emerald-500"
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="shrink-0 border-t border-slate-100 bg-white px-4 pt-3 pb-3 md:p-5">
        <div className="hidden space-y-2 border-b border-slate-100 pb-3 text-[9px] uppercase tracking-widest text-slate-400 md:block">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="text-slate-600">{subTotal} $</span>
          </div>
          <div className="flex justify-between">
            <span>Service Tax (15%)</span>
            <span className="text-slate-600">{tax} $</span>
          </div>
        </div>

        <div className="flex items-center justify-between md:mt-4">
          <span className="text-sm font-semibold">Total Due</span>
          <span className="text-lg font-bold text-emerald-500 md:text-xl">
            {total} $
          </span>
        </div>

        <button
          onClick={() => setModal(true)}
          className="mt-3 w-full rounded-xl bg-emerald-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-100 md:mt-4 md:py-3 md:text-[10px] md:tracking-widest"
        >
          Proceed to Checkout
        </button>
      </div>
    </aside>
  );
}
