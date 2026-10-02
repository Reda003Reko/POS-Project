import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { domain } from "../store/index";
export default function LoginPage() {
  const mySchema = Yup.object({
    email: Yup.string().required().email(),
    password: Yup.string().required(),
  });
  const navigate = useNavigate();
  const sendData = (values) => {
    let data = {
      identifier: values.email,
      password: values.password,
    };
    let endPoint = "/api/auth/local";
    let url = domain + endPoint;
    axios
      .post(url, data)
      .then((res) => {
        let jwt = res.data.jwt;
        localStorage.setItem("token", jwt);
        if (res.data.user.system_role == "admin") {
          navigate("/admin");
        } else if (res.data.user.system_role == "cashier") {
          navigate("/cashier");
        } else if (res.data.user.system_role == "kitchen") {
          navigate("/kitchen");
        }
      })
      .catch((err) => {
        toast.error("Wrong email or password");
      });
  };

  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-slate-950 px-4 py-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#ea7d12_0,_transparent_30%),radial-gradient(circle_at_bottom_left,_#0f766e_0,_transparent_34%)] opacity-75" />
      <div className="relative grid w-full max-w-4xl overflow-hidden rounded-3xl border border-white/15 bg-white shadow-2xl lg:grid-cols-[1fr_1.1fr]">
        <section className="hidden flex-col justify-between bg-slate-900 p-10 text-white lg:flex"><div><span className="rounded-full bg-brand-500/20 px-3 py-1 text-xs font-bold text-brand-100">RESTAURANT POS</span><h1 className="mt-6 text-4xl font-extrabold leading-tight">Run service with calm, clear control.</h1><p className="mt-4 max-w-xs text-sm leading-6 text-slate-300">A focused workspace for your cashier, kitchen and restaurant team.</p></div><p className="text-sm text-slate-400">Savor POS · Simple service, every shift</p></section>
      <Formik
        onSubmit={sendData}
        initialValues={{ email: "", password: "" }}
        validationSchema={mySchema}
      >
        <Form className="flex min-h-105 flex-col gap-4 p-7 sm:p-10">
          <div><p className="text-sm font-bold text-brand-600">WELCOME BACK</p><h1 className="mt-2 text-3xl font-extrabold text-slate-900">Sign in to Savor</h1><p className="mt-2 text-sm text-slate-500">Enter your account details to continue.</p></div>
          <label className="mt-3 text-sm font-bold text-slate-700">Email address
          <Field
            name="email"
            type="email"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-brand-400 focus:bg-white"
            placeholder="name@restaurant.com"
          />
          </label><ErrorMessage name="email" component={"p"} className="-mt-2 text-xs font-medium text-red-600" />
          <label className="text-sm font-bold text-slate-700">Password
          <Field
            name="password"
            type="password"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-brand-400 focus:bg-white"
            placeholder="••••••••"
          />
          </label>
          <ErrorMessage
            name="password"
            component={"p"}
            className="-mt-2 text-xs font-medium text-red-600"
          />
          <button type="submit" className="mt-2 w-full rounded-xl bg-brand-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-amber-200 transition hover:bg-brand-600 active:scale-[.98]">
            Sign in →
          </button>
          <p className="text-center text-xs text-slate-400">Secure access for restaurant staff</p>
        </Form>
      </Formik>
      </div>
      <Toaster />
    </div>
  );
}
