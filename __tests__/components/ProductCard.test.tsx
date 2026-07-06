import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import ProductCard from "@/components/product/ProductCard";
import cartReducer from "@/redux/slices/cartSlice";
import wishlistReducer from "@/redux/slices/wishlistSlice";
import type { Product } from "@/types/product";

const product: Product = {
  id: "brake-pad-1",
  src: "1.jpg",
  title: "لنت ترمز جلو پژو ۲۰۶",
  price: "۲۰۰,۰۰۰",
  car: "پژو 206",
  brand: "ایساکو",
  discount: 10,
  instock: true,
  category: "brake-pad",
  imageUrl: "/assets/products-list/brake-pad/1.jpg",
};

function renderWithStore(ui: React.ReactElement) {
  const store = configureStore({
    reducer: { cart: cartReducer, wishlist: wishlistReducer },
  });
  return render(<Provider store={store}>{ui}</Provider>);
}

describe("ProductCard", () => {
  it("renders the product title and car name", () => {
    renderWithStore(<ProductCard product={product} onAddToCart={jest.fn()} />);
    expect(screen.getByText(product.title)).toBeInTheDocument();
    expect(screen.getByText("پژو 206")).toBeInTheDocument();
  });

  it("shows both the original and discounted price when a discount applies", () => {
    renderWithStore(<ProductCard product={product} onAddToCart={jest.fn()} />);
    // original: ۲۰۰,۰۰۰ تومان -> parsed 200000; 10% off -> 180000
    expect(screen.getByText(/۲۰۰٬۰۰۰ تومان/)).toBeInTheDocument();
    expect(screen.getByText(/۱۸۰٬۰۰۰ تومان/)).toBeInTheDocument();
  });

  it("calls onAddToCart with the product when the button is clicked", async () => {
    const handleAddToCart = jest.fn();
    renderWithStore(<ProductCard product={product} onAddToCart={handleAddToCart} />);

    await userEvent.click(screen.getByRole("button", { name: "افزودن به سبد خرید" }));
    expect(handleAddToCart).toHaveBeenCalledWith(product);
  });

  it("disables the add-to-cart button and shows 'ناموجود' when out of stock", () => {
    renderWithStore(
      <ProductCard product={{ ...product, instock: false }} onAddToCart={jest.fn()} />
    );
    const button = screen.getByRole("button", { name: "ناموجود" });
    expect(button).toBeDisabled();
  });

  it("toggles the wishlist heart icon when clicked", async () => {
    renderWithStore(<ProductCard product={product} onAddToCart={jest.fn()} />);
    const wishlistButton = screen.getByRole("button", {
      name: "افزودن به علاقه‌مندی‌ها",
    });
    await userEvent.click(wishlistButton);
    expect(
      screen.getByRole("button", { name: "حذف از علاقه‌مندی‌ها" })
    ).toBeInTheDocument();
  });
});
