"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  ArrowRight,
  LogIn,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/product-card";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/components/ui/use-toast";

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    isLoading,
    isAuthenticated,
  } = useCart();
  const { toast } = useToast();
  const [promoCode, setPromoCode] = useState("");

  // Mock recommended products
  const recommendedProducts = [
    {
      id: "4",
      name: "Protein Bars",
      description: "High protein snack bars",
      price: 4.99,
      originalPrice: 12.99,
      expiryDate: "2025-03-22",
      discountPercentage: 62,
      imageSrc: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "5",
      name: "Greek Yogurt",
      description: "Creamy Greek yogurt",
      price: 0.99,
      originalPrice: 2.99,
      expiryDate: "2025-03-18",
      discountPercentage: 67,
      imageSrc: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "6",
      name: "Fresh Bread",
      description: "Artisan sourdough bread",
      price: 1.99,
      originalPrice: 4.99,
      expiryDate: "2025-03-17",
      discountPercentage: 60,
      imageSrc: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "7",
      name: "Organic Eggs",
      description: "Free-range organic eggs",
      price: 2.49,
      originalPrice: 5.99,
      expiryDate: "2025-03-19",
      discountPercentage: 58,
      imageSrc: "/placeholder.svg?height=300&width=300",
    },
  ];

  const handleUpdateQuantity = async (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      await updateQuantity(id, newQuantity);
      toast({
        title: "Cart updated",
        description: "Item quantity has been updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update quantity. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleRemoveItem = async (id: number) => {
    try {
      await removeFromCart(id);
      toast({
        title: "Item removed",
        description: "Item has been removed from your cart.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove item. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleApplyPromoCode = () => {
    if (!promoCode) {
      toast({
        title: "Error",
        description: "Please enter a promo code.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Promo code applied",
      description: `Promo code "${promoCode}" has been applied to your order.`,
    });
  };

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => {
    const price = item.product_detail?.price || 0;
    return total + price * item.quantity;
  }, 0);

  const originalTotal = cartItems.reduce((total, item) => {
    const originalPrice = item.product_detail?.original_price || 0;
    return total + originalPrice * item.quantity;
  }, 0);

  const savings = originalTotal - subtotal;
  const shipping = subtotal >= 35 ? 0 : 4.99;
  const total = subtotal + shipping;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container px-4 md:px-6 py-6 md:py-10">
          <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

          {!isAuthenticated ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <ShoppingBag className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">
                Please log in to view your cart
              </h2>
              <p className="text-muted-foreground mb-6">
                You need to be logged in to add items to your cart and complete
                purchases.
              </p>
              <Button asChild size="lg" className="mr-2">
                <Link href="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  Log In
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/register">Register</Link>
              </Button>
            </div>
          ) : isLoading ? (
            <div className="text-center py-12">
              <p>Loading your cart...</p>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <ShoppingBag className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">
                Your cart is empty
              </h2>
              <p className="text-muted-foreground mb-6">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Button asChild size="lg">
                <Link href="/categories">Start Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <div className="rounded-lg border shadow-sm">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">
                      Cart Items ({cartItems.length})
                    </h2>
                    <div className="space-y-6">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex gap-4">
                          <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                            <Image
                              src={
                                item.product_detail?.image || "/placeholder.svg"
                              }
                              alt={item.product_detail?.name || "Product"}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium">
                              {item.product_detail?.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {item.product_detail?.description}
                            </p>
                            {item.product_detail?.expiry_date && (
                              <p className="text-sm text-muted-foreground">
                                Expires on{" "}
                                {new Date(
                                  item.product_detail.expiry_date
                                ).toLocaleDateString()}
                              </p>
                            )}
                            <div className="flex items-center gap-2 mt-1">
                              <span className="font-semibold">
                                $
                                {item.product_detail?.price?.toFixed(2) ||
                                  "0.00"}
                              </span>
                              <span className="text-sm text-muted-foreground line-through">
                                $
                                {item.product_detail?.original_price?.toFixed(
                                  2
                                ) || "0.00"}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <div className="flex items-center">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-r-none"
                                onClick={() =>
                                  handleUpdateQuantity(
                                    item.id,
                                    item.quantity - 1
                                  )
                                }
                              >
                                <Minus className="h-3 w-3" />
                                <span className="sr-only">
                                  Decrease quantity
                                </span>
                              </Button>
                              <div className="h-8 px-3 flex items-center justify-center border-y">
                                {item.quantity}
                              </div>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-l-none"
                                onClick={() =>
                                  handleUpdateQuantity(
                                    item.id,
                                    item.quantity + 1
                                  )
                                }
                              >
                                <Plus className="h-3 w-3" />
                                <span className="sr-only">
                                  Increase quantity
                                </span>
                              </Button>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2 text-muted-foreground"
                              onClick={() => handleRemoveItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 rounded-lg border shadow-sm">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">
                      Have a promo code?
                    </h2>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter promo code"
                        className="max-w-xs"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                      />
                      <Button onClick={handleApplyPromoCode}>Apply</Button>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="rounded-lg border shadow-sm sticky top-20">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">
                      Order Summary
                    </h2>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-green-600">
                        <span>You save</span>
                        <span>${savings.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        <span>
                          {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                        </span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {shipping > 0 && (
                          <p>
                            Add ${(35 - subtotal).toFixed(2)} more to qualify
                            for free shipping
                          </p>
                        )}
                      </div>
                    </div>
                    <Button asChild className="w-full mt-6" size="lg">
                      <Link href="/checkout">
                        Proceed to Checkout
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <div className="mt-4 text-center">
                      <Link
                        href="/categories"
                        className="text-sm text-primary hover:underline"
                      >
                        Continue Shopping
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Recommended products */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Recommended Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
