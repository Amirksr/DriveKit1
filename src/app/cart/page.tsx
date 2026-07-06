"use client";

import Image from "next/image";
import { FaMinus, FaPlus, FaRegTrashAlt } from "react-icons/fa";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { decreaseQuantity, increaseQuantity, removeFromCart } from "@/redux/slices/cartSlice";

export default function CartPage() {
  const cart = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  const total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h4 className="mb-4 text-xl font-bold text-gray-900">سبد خرید شما</h4>

            {cart.length === 0 ? (
              <p className="rounded-xl bg-gray-50 p-6 text-center text-gray-500">
                سبد خرید خالی است.
              </p>
            ) : (
              <div className="flex flex-col gap-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-4 rounded-xl border border-gray-100 p-4 shadow-sm sm:flex-row sm:items-center"
                  >
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-50">
                      <Image src={item.image} alt={item.name} fill className="object-contain" />
                    </div>

                    <div className="flex-1">
                      <h6 className="font-semibold text-gray-900">{item.name}</h6>
                      <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                        <span className="text-sm text-gray-500">
                          قیمت واحد: {item.price.toLocaleString("fa-IR")} تومان
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => dispatch(decreaseQuantity(item.id))}
                            disabled={item.quantity <= 1}
                            aria-label="کاهش تعداد"
                            className="grid h-8 w-8 place-items-center rounded-md bg-gray-100 disabled:opacity-40"
                          >
                            <FaMinus size={12} />
                          </button>
                          <span className="w-6 text-center">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => dispatch(increaseQuantity(item.id))}
                            aria-label="افزایش تعداد"
                            className="grid h-8 w-8 place-items-center rounded-md bg-gray-100"
                          >
                            <FaPlus size={12} />
                          </button>
                          <button
                            type="button"
                            onClick={() => dispatch(removeFromCart(item.id))}
                            aria-label="حذف از سبد خرید"
                            className="grid h-8 w-8 place-items-center rounded-md bg-red-50 text-red-500 hover:bg-red-100"
                          >
                            <FaRegTrashAlt size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-4">
            <div className="rounded-xl border border-gray-100 p-5 shadow-sm">
              <h5 className="mb-3 font-bold text-gray-900">خلاصه سفارش</h5>
              <hr className="mb-3 border-gray-100" />
              <p className="mb-1 text-sm text-gray-600">تعداد اقلام: {totalQuantity}</p>
              <p className="mb-4 text-sm text-gray-600">
                جمع کل: {total.toLocaleString("fa-IR")} تومان
              </p>
              <button
                type="button"
                disabled={cart.length === 0}
                className="w-full rounded-lg bg-brand-500 py-3 font-semibold text-white transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                ادامه فرایند خرید
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
