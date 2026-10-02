import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "./Card";
import { domain, useSearch } from "../../store/index";

export default function MainCashier() {
  const [products, setProducts] = useState([]);
  const [catTitle, setCatTitle] = useState([]);
  const params = useParams();

  const getCategoryItems = () => {
    let categoryId = params.categories;
    axios
      .get(domain + `/api/categories/${categoryId}`, {
        params: {
          populate: {
            products: {
              populate: "*",
            },
          },
        },
      })
      .then((res) => {
        setProducts(res.data.data.products);
        setCatTitle(res.data.data.name);
      });
  };

  useEffect(() => {
    getCategoryItems();
  }, [params]);

  // ......................
  // search
  const { searchValue, setSearchValue } = useSearch();

  useEffect(() => {
    let url = domain + "/api/products";

    if (searchValue) {
      axios
        .get(url, {
          params: {
            populate: "*",
            filters: {
              name: {
                $contains: searchValue,
              },
            },
          },
        })
        .then((res) => {
          setProducts(res.data.data);
          setCatTitle("RESULTS");
        });
    } else {
      getCategoryItems();
    }
  }, [searchValue]);

  return (
    // title
    <section className="bg-white px-4 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-6">
      <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center lg:mb-7">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
          {catTitle}
        </h1>

        <div className="hidden items-center gap-3 sm:flex">
          <button className="h-9 px-5 rounded-xl border border-slate-100 text-xs text-slate-500 transition duration-300 hover:bg-brand-50 hover:text-brand-600 hover:border-brand-100">
            Filter
          </button>

          <button className="h-9 px-5 rounded-xl border border-slate-100 text-xs text-slate-500 transition duration-300 hover:bg-brand-50 hover:text-brand-600 hover:border-brand-100">
            Sort By
          </button>
        </div>
      </div>

      {/* card */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3 2xl:grid-cols-4">
        {products?.map((el) => (
          <Card key={el.documentId} item={el} />
        ))}
      </div>
    </section>
  );
}
