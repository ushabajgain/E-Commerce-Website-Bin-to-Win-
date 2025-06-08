"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Package,
  User,
  CreditCard,
  Heart,
  LogOut,
  Settings,
  ShoppingBag,
  LogIn,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/hooks/use-auth";

export default function AccountPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  // Mock order data
  const orders = [
    {
      id: "ORD-12345",
      date: "2025-03-15",
      status: "Delivered",
      total: 45.97,
      items: 3,
    },
    {
      id: "ORD-12346",
      date: "2025-03-10",
      status: "Shipped",
      total: 29.98,
      items: 2,
    },
    {
      id: "ORD-12347",
      date: "2025-03-05",
      status: "Processing",
      total: 15.99,
      items: 1,
    },
    {
      id: "ORD-12348",
      date: "2025-02-28",
      status: "Delivered",
      total: 67.45,
      items: 4,
    },
    {
      id: "ORD-12349",
      date: "2025-02-20",
      status: "Delivered",
      total: 22.99,
      items: 2,
    },
  ];

  // Mock wishlist data
  const wishlist = [
    {
      id: "1",
      name: "Organic Pasta",
      price: 2.99,
      originalPrice: 7.99,
      expiryDate: "2025-03-20",
      imageSrc: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "4",
      name: "Protein Bars",
      price: 4.99,
      originalPrice: 12.99,
      expiryDate: "2025-03-22",
      imageSrc: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "7",
      name: "Organic Eggs",
      price: 2.49,
      originalPrice: 5.99,
      expiryDate: "2025-03-19",
      imageSrc: "/placeholder.svg?height=80&width=80",
    },
  ];

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsLoading(false);
    // Show success message or notification
  };

  const handleLogout = () => {
    logout();
  };

  // If not logged in, show login prompt
  if (!user) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <div className="container flex items-center justify-center min-h-[80vh]">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
                <User className="h-10 w-10 text-muted-foreground" />
              </div>
              <h1 className="text-3xl font-bold mb-2">
                Account Access Required
              </h1>
              <p className="text-muted-foreground mb-6 max-w-md">
                Please log in or create an account to view your profile, orders,
                and wishlist.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="min-w-40">
                  <Link href="/login">
                    <LogIn className="mr-2 h-5 w-5" />
                    Log In
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="min-w-40"
                >
                  <Link href="/register">Create Account</Link>
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container px-4 md:px-6 py-6 md:py-10">
          <div className="flex flex-col md:flex-row gap-8">
            <aside className="md:w-64 flex-shrink-0">
              <div className="sticky top-20">
                <div className="rounded-lg border shadow-sm p-6 mb-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-3">
                      <User className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="font-semibold text-lg">
                      {user.first_name} {user.last_name}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>

                <nav className="space-y-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href="/account">
                      <User className="mr-2 h-5 w-5" />
                      My Account
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href="/account/orders">
                      <Package className="mr-2 h-5 w-5" />
                      Orders
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href="/wishlist">
                      <Heart className="mr-2 h-5 w-5" />
                      Wishlist
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href="/account/payment">
                      <CreditCard className="mr-2 h-5 w-5" />
                      Payment Methods
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href="/account/settings">
                      <Settings className="mr-2 h-5 w-5" />
                      Settings
                    </Link>
                  </Button>
                  <Separator className="my-2" />
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-red-500"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-5 w-5" />
                    Logout
                  </Button>
                </nav>
              </div>
            </aside>

            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-6">My Account</h1>

              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 mb-6">
                  <TabsTrigger
                    value="profile"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none py-3"
                  >
                    Profile
                  </TabsTrigger>
                  <TabsTrigger
                    value="orders"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none py-3"
                  >
                    Orders
                  </TabsTrigger>
                  <TabsTrigger
                    value="wishlist"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none py-3"
                  >
                    Wishlist
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>
                        Update your personal details and address information.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form
                        onSubmit={handleUpdateProfile}
                        className="space-y-6"
                      >
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">
                            Contact Details
                          </h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="name">Full name</Label>
                              <Input
                                id="name"
                                defaultValue={user.first_name}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="email">Email</Label>
                              <Input
                                id="email"
                                type="email"
                                defaultValue={user.email}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="phone">Phone number</Label>
                              <Input
                                id="phone"
                                type="tel"
                                defaultValue={user.phone}
                                required
                              />
                            </div>
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Address</h3>
                          <div className="grid gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="address">Street address</Label>
                              <Input
                                id="address"
                                defaultValue={user.address}
                                required
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="city">City</Label>
                                <Input
                                  id="city"
                                  defaultValue={user.city}
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="postal-code">Postal code</Label>
                                <Input
                                  id="postal-code"
                                  defaultValue={user.postalCode}
                                  required
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="country">Country</Label>
                              <Input
                                id="country"
                                defaultValue={user.country}
                                required
                              />
                            </div>
                          </div>
                        </div>

                        <Button type="submit" disabled={isLoading}>
                          {isLoading ? "Saving..." : "Save Changes"}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="orders">
                  <Card>
                    <CardHeader>
                      <CardTitle>Order History</CardTitle>
                      <CardDescription>
                        View and track your recent orders.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Items</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                            <TableHead></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {orders.map((order) => (
                            <TableRow key={order.id}>
                              <TableCell className="font-medium">
                                {order.id}
                              </TableCell>
                              <TableCell>
                                {new Date(order.date).toLocaleDateString()}
                              </TableCell>
                              <TableCell>
                                <span
                                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                    order.status === "Delivered"
                                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                      : order.status === "Processing"
                                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                  }`}
                                >
                                  {order.status}
                                </span>
                              </TableCell>
                              <TableCell>{order.items}</TableCell>
                              <TableCell className="text-right">
                                ${order.total.toFixed(2)}
                              </TableCell>
                              <TableCell>
                                <Button variant="ghost" size="sm" asChild>
                                  <Link href={`/account/orders/${order.id}`}>
                                    View
                                  </Link>
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" asChild className="w-full">
                        <Link href="/account/orders">View All Orders</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="wishlist">
                  <Card>
                    <CardHeader>
                      <CardTitle>Wishlist</CardTitle>
                      <CardDescription>
                        Products you've saved for later.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {wishlist.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-4 p-4 border rounded-lg"
                          >
                            <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                              <Link href={`/products/${item.id}`}>
                                <img
                                  src={item.imageSrc || "/placeholder.svg"}
                                  alt={item.name}
                                  className="object-cover w-full h-full"
                                />
                              </Link>
                            </div>
                            <div className="flex-1 min-w-0">
                              <Link
                                href={`/products/${item.id}`}
                                className="hover:underline"
                              >
                                <h3 className="font-medium">{item.name}</h3>
                              </Link>
                              <p className="text-sm text-muted-foreground">
                                Expires on{" "}
                                {new Date(item.expiryDate).toLocaleDateString()}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="font-semibold">
                                  ${item.price.toFixed(2)}
                                </span>
                                <span className="text-sm text-muted-foreground line-through">
                                  ${item.originalPrice.toFixed(2)}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button size="sm" asChild>
                                <Link href={`/products/${item.id}`}>
                                  <ShoppingBag className="h-4 w-4 mr-1" />
                                  View
                                </Link>
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" asChild className="w-full">
                        <Link href="/wishlist">View Full Wishlist</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
