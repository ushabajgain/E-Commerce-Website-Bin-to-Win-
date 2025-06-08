"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function StartServerButton() {
  const [isStarting, setIsStarting] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const { toast } = useToast();

  const startServer = async () => {
    setIsStarting(true);
    try {
      // First test if the server is already running
      try {
        const response = await fetch("http://localhost:8000/api/");
        if (response.ok) {
          setIsRunning(true);
          toast({
            title: "Server is already running",
            description:
              "The Django server is already running on http://localhost:8000",
          });
          return;
        }
      } catch (error) {
        // Server is not running, we'll start it
      }

      // Here you would typically make an API call to start the server
      // For this demo, we'll just simulate the server starting
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast({
        title: "Server started successfully",
        description:
          "The Django server is now running on http://localhost:8000",
      });

      setIsRunning(true);
    } catch (error) {
      console.error("Failed to start server:", error);
      toast({
        title: "Failed to start server",
        description:
          "There was an error starting the Django server. Check the console for details.",
        variant: "destructive",
      });
    } finally {
      setIsStarting(false);
    }
  };

  return (
    <Button
      onClick={startServer}
      disabled={isStarting || isRunning}
      className="w-full"
    >
      {isStarting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {isStarting
        ? "Starting Server..."
        : isRunning
        ? "Server Running"
        : "Start Django Server"}
    </Button>
  );
}
