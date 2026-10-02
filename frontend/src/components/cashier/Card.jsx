import noImg from "../../icons/no_img.webp";
import { useCart } from "../../store";
import { domain } from "../../store/index";
export default function Card({ item }) {
  const { cart, setCart } = useCart();

  const addToCart = () => {
    let newItem = { ...item, qty: 1 };
    let idItem = newItem.documentId;
    let itemIndex = cart.findIndex((el) => {
      return el.documentId == idItem;
    });
    if (itemIndex == -1) {
      setCart([...cart, newItem]);
    } else {
      let copy = [...cart];
      copy[itemIndex].qty++;
      setCart(copy);
    }
  };

  return (
    <div className="group rounded-[26px] border border-slate-100 bg-white p-3 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-brand-100 hover:shadow-xl">
      <div className="w-full h-[140px] sm:h-[190px] rounded-[22px] overflow-hidden bg-slate-50">
        <img
          src={item.img ? domain + item.img?.url : noImg}
          alt={item.name}
          className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="pt-3 px-1 min-h-0 flex flex-col sm:min-h-[92px] sm:pt-4">
        <h3 className="text-sm font-bold text-slate-900 transition duration-300 group-hover:text-brand-600">
          {item.name}
        </h3>

        <p className="text-[11px] text-slate-400 mt-1 whitespace-nowrap overflow-hidden text-ellipsis">
          {item.desc}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4">
          <span className="text-brand-600 font-bold text-sm">
            {item.price} $
          </span>

          <button
            onClick={addToCart}
            className="w-8 h-8 rounded-xl bg-brand-500 text-white text-lg leading-none shadow-md transition duration-300 hover:bg-brand-600 hover:scale-110 active:scale-95"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
