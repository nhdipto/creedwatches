"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/context/store";
import { BagIcon, CloseIcon, MinusIcon, PlusIcon } from "@/components/icons";

function formatTk(n: number) {
  return n.toLocaleString("en-IN");
}

export function CartDrawer() {
  const { cartOpen, closeCart, cart, updateQuantity, removeFromCart } = useStore();
  const router = useRouter();

  const subtotal = cart.reduce((sum, line) => sum + line.price * line.quantity, 0);

  return (
    <>
      <div
        onClick={closeCart}
        aria-hidden
        className={
          "fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300 " +
          (cartOpen ? "opacity-100" : "pointer-events-none opacity-0")
        }
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={
          "fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 " +
          (cartOpen ? "translate-x-0" : "translate-x-full")
        }
      >
        <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4">
          <h2 className="text-lg font-medium tracking-wide">
            Your Cart ({cart.length})
          </h2>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="p-1 text-zinc-600 hover:text-zinc-900"
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <BagIcon className="h-10 w-10 text-zinc-300" />
            <p className="text-sm text-zinc-500">Your cart is empty.</p>
            <Link
              href="/shop"
              onClick={closeCart}
              className="border border-zinc-900 px-6 py-3 text-xs font-medium uppercase tracking-widest transition-colors hover:bg-zinc-900 hover:text-white"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <ul className="flex-1 divide-y divide-zinc-100 overflow-y-auto">
            {cart.map((item) => (
              <li key={item.id} className="flex gap-4 px-5 py-4">
                {item.image ? (
                  <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-zinc-100">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-24 w-20 shrink-0 items-center justify-center bg-zinc-100 text-xs text-zinc-400">
                    Watch
                  </div>
                )}
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm leading-snug">{item.title}</p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Remove ${item.title}`}
                      className="text-zinc-400 hover:text-zinc-900"
                    >
                      <CloseIcon className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center border border-zinc-300">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                        className="px-2 py-1.5 text-zinc-600 hover:text-zinc-900"
                      >
                        <MinusIcon className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                        className="px-2 py-1.5 text-zinc-600 hover:text-zinc-900"
                      >
                        <PlusIcon className="h-3 w-3" />
                      </button>
                    </div>
                    <p className="text-sm font-medium">
                      Tk {formatTk(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {cart.length > 0 && (
          <footer className="border-t border-zinc-200 px-5 py-5">
            <div className="flex items-center justify-between text-sm">
              <span>Subtotal</span>
              <span className="text-base font-medium">Tk {formatTk(subtotal)}</span>
            </div>
            <p className="mt-1 text-xs text-zinc-500">
              Delivery fee & bKash payment handled at checkout.
            </p>
            <button
              onClick={() => {
                closeCart();
                router.push("/checkout");
              }}
              className="mt-4 block w-full bg-zinc-950 py-3.5 text-center text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-zinc-800"
            >
              Checkout
            </button>
          </footer>
        )}
      </aside>
    </>
  );
}
