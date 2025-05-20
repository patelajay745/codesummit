import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div className="flex  min-h-screen w-full px-4">
      <div className="flex flex-col container mx-auto">
        <div className="flex flex-col space-y-6 items-center justify-center text-center py-16">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-brand font-extrabold max-w-3xl">
            Master Data Structure & Algorithms
          </h1>
          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/60 tracking-wide max-w-5xl">
            The perfect platform for new developers to learn, practice, and
            excel in DSA problems. Build your coding skills from the ground up.
          </h3>
          <div className="flex flex-wrap sm:flex-nowrap gap-4  p-4 justify-center">
            <Button
              size={"lg"}
              className="bg-brand w-full sm:w-auto px-8 py-2 text-lg"
            >
              Get Started – It's Free
            </Button>
            <Button
              size={"lg"}
              className="bg-foreground w-full sm:w-auto px-8 py-2 text-lg"
            >
              I Already Have an Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
