"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart, Heart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/components/ui/use-toast";

export function NavbarActions() {
  const { cartCount, isAuthenticated } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const handleCartClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isAuthenticated) {
      e.preventDefault();
      toast({
        title: "Login Required",
        description: "Please log in to view your cart",
        variant: "destructive",
      });
      router.push("/login");
    }
  };

  const handleWishlistClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isAuthenticated) {
      e.preventDefault();
      toast({
        title: "Login Required",
        description: "Please log in to view your wishlist",
        variant: "destructive",
      });
      router.push("/login");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon" asChild>
        <Link href="/wishlist" onClick={handleWishlistClick}>
          <Heart className="h-5 w-5" />
          <span className="sr-only">Wishlist</span>
        </Link>
      </Button>
      <Button variant="ghost" size="icon" asChild className="relative">
        <Link href="/cart" onClick={handleCartClick}>
          <ShoppingCart className="h-5 w-5" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full h-5 w-5 text-xs flex items-center justify-center">
              {cartCount > 99 ? "99+" : cartCount}
            </span>
          )}
          <span className="sr-only">Cart</span>
        </Link>
      </Button>
      <Button variant="ghost" size="icon" asChild className="hidden md:flex">
        <Link href={user ? "/account" : "/login"}>
          <User className="h-5 w-5" />
          <span className="sr-only">{user ? "Account" : "Login"}</span>
        </Link>
      </Button>
    </div>
  );
}
