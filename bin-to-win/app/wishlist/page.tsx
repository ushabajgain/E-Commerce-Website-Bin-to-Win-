"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, ShoppingCart, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/components/ui/use-toast";

export default function WishlistPage() {
  // Mock wishlist items
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: "1",
      name: "Organic Pasta",
      description: "Premium Italian pasta",
      price: 2.99,
      originalPrice: 7.99,
      expiryDate: "2025-03-20",
      discountPercentage: 63,
      imageSrc: "/placeholder.svg?height=300&width=300",
    },
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
      id: "7",
      name: "Organic Eggs",
      description: "Free-range organic eggs",
      price: 2.49,
      originalPrice: 5.99,
      expiryDate: "2025-03-19",
      discountPercentage: 58,
      imageSrc: "/placeholder.svg?height=300&width=300",
    },
  ]);

  // Mock recommended products
  const recommendedProducts = [
    {
      id: "2",
      name: "Chocolate Cookies",
      description: "Crunchy chocolate chip cookies",
      price: 1.49,
      originalPrice: 4.99,
      expiryDate: "2025-03-19",
      discountPercentage: 70,
      imageSrc: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "3",
      name: "Almond Milk",
      description: "Unsweetened almond milk",
      price: 1.99,
      originalPrice: 3.99,
      expiryDate: "2025-03-21",
      discountPercentage: 50,
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
  ];

  const { addToCart, isAuthenticated } = useCart();
  const { toast } = useToast();
  const [addingToCart, setAddingToCart] = useState<Record<string, boolean>>({});
  const router = useRouter();

  const removeFromWishlist = (id: string) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
  };

  const handleAddToCart = async (item: any) => {
    if (!isAuthenticated) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to add items to your cart",
        variant: "destructive",
      });

      router.push("/login");
      return;
    }

    try {
      setAddingToCart((prev) => ({ ...prev, [item.id]: true }));
      await addToCart(Number(item.id), 1);
      toast({
        title: "Added to cart",
        description: `${item.name} has been added to your cart.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
      console.error("Error adding to cart:", error);
    } finally {
      setAddingToCart((prev) => ({ ...prev, [item.id]: false }));
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container px-4 md:px-6 py-6 md:py-10">
          <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>

          {wishlistItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <Heart className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">
                Your wishlist is empty
              </h2>
              <p className="text-muted-foreground mb-6">
                Save items you like by clicking the heart icon on any product.
              </p>
              <Button asChild size="lg">
                <Link href="/categories">Browse Products</Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-6">
              {wishlistItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg"
                >
                  <div className="relative w-full md:w-48 h-48 rounded-md overflow-hidden flex-shrink-0">
                    <Link href={`/product/${item.id}`}>
                      <Image
                        src={item.imageSrc || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </Link>
                  </div>
                  <div className="flex-1 flex flex-col">
                    <div className="flex-1">
                      <Link
                        href={`/product/${item.id}`}
                        className="hover:underline"
                      >
                        <h2 className="text-xl font-semibold">{item.name}</h2>
                      </Link>
                      <p className="text-muted-foreground mt-1">
                        {item.description}
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Expires on{" "}
                        {new Date(item.expiryDate).toLocaleDateString()}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="font-bold text-lg">
                          ${item.price.toFixed(2)}
                        </span>
                        <span className="text-muted-foreground line-through">
                          ${item.originalPrice.toFixed(2)}
                        </span>
                        <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs font-bold">
                          {item.discountPercentage}% OFF
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Button asChild>
                        <Link href={`/product/${item.id}`}>
                          <ShoppingBag className="mr-2 h-4 w-4" />
                          View Product
                        </Link>
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => handleAddToCart(item)}
                        disabled={addingToCart[item.id]}
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        {addingToCart[item.id] ? "Adding..." : "Add to Cart"}
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeFromWishlist(item.id)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove from wishlist</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Recommended Products */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
