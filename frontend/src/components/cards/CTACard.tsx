import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";

const CTACard = () => {
  return (
    <div className="py-8 min-w-1/2 bg-bg-accent/80 border-1 border-muted-foreground/50 rounded-lg flex flex-col gap-4 shadow-2xl xl:px-0 px-4">
      <div className="sm:text-3xl text-2xl font-bold tracking-wide">
        Ready to Level Up Your Coding Skills?
      </div>
      <div className="text-muted-foreground sm:text-lg text-base tracking-tight">
        Join thousands of new developers who are mastering DSA with CodeSummit.
      </div>
      <div>
        <Link to="/signup">
          <Button
            size={"lg"}
            className="bg-brand dark:text-foreground text-background sm:text-lg hover:bg-brand/80 hover:scale-110 transition delay-150 duration-300 ease-in-out cursor-pointer"
          >
            Start Learning Now
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CTACard;
