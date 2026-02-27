import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import BrutalistNav from "@/components/BrutalistNav";
import BrutalistFooter from "@/components/BrutalistFooter";
import BrutalistButton from "@/components/BrutalistButton";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <BrutalistNav />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="label-micro text-muted-foreground mb-4">Error</p>
          <h1 className="text-[8rem] leading-none mb-4">404</h1>
          <p className="text-lg text-muted-foreground mb-8">Route not found</p>
          <Link to="/">
            <BrutalistButton>Return Home</BrutalistButton>
          </Link>
        </div>
      </div>
      <BrutalistFooter />
    </div>
  );
};

export default NotFound;
