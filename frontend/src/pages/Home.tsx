import CTACard from "@/components/cards/CTACard";
import HowItWorksCard from "@/components/cards/HowItWorksCard";
import LandinPageCard from "@/components/cards/LandinPageCard";
import { Button } from "@/components/ui/button";
import Footer from "@/sections/Footer";
import { Link } from "@tanstack/react-router";

const Home = () => {
  return (
    <>
      <div className="flex  min-h-screen w-full px-4 pb-5">
        <div className="flex flex-col container mx-auto  ">
          <div className="flex flex-col space-y-6 items-center justify-center text-center py-16">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-brand font-extrabold max-w-2/3">
              Master Data Structure & Algorithms
            </h1>
            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/60 tracking-wide xl:max-w-5xl max-w-3/4">
              The perfect platform for new developers to learn, practice, and
              excel in DSA problems. Build your coding skills from the ground
              up.
            </h3>
            <div className="flex flex-wrap sm:flex-nowrap gap-4  p-4 justify-center">
              <Link to="/signup">
                <Button
                  size={"lg"}
                  className="bg-brand w-full sm:w-auto px-8 py-2 text-lg hover:bg-brand/80 hover:scale-105 transition delay-150 duration-300 ease-in-out cursor-pointer"
                >
                  Get Started – It's Free
                </Button>
              </Link>
              <Link to="/singin">
                <Button
                  size={"lg"}
                  className="dark:bg-foreground bg-text-secondary w-full sm:w-auto px-8 py-2 text-lg hover:scale-105 transition delay-150 duration-300 ease-in-out cursor-pointer"
                >
                  I Already Have an Account
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-10 items-center justify-center text-center  sm:py-10 py-5">
            <h1 className="sm:text-4xl font-bold tracking-tight text-2xl">
              Why Choose CodeSummit?
            </h1>

            <div className="w-full flex gap-5 flex-wrap xl:justify-between justify-center">
              <LandinPageCard
                title="Beginner Friendly"
                description="Curated problems specifically designed for newcomers to DSA concepts."
              />
              <LandinPageCard
                title="Step-by-Step Learning"
                description="Curated problems specifically designed for newcomers to DSA concepts."
              />
              <LandinPageCard
                title="Practical Examples"
                description="Learn algorithms with real-world examples that demonstrate practical applications."
              />
            </div>
          </div>

          <div className="flex flex-col gap-10 items-center justify-center text-center sm:py-10 py-5">
            <h1 className="sm:text-4xl font-bold tracking-tight text-2xl">
              How It Works?
            </h1>

            <div className="w-full flex sm:flex-nowrap flex-wrap justify-between gap-3 sm:gap-0  items-center">
              <HowItWorksCard
                stepNumber="1"
                title="Create Account"
                description="Sign up for free and create your developer profile"
              />
              <HowItWorksCard
                stepNumber="2"
                title="Choose Topics"
                description="Select from various DSA topics to practice"
              />
              <HowItWorksCard
                stepNumber="3"
                title="Solve Problems"
                description="Work through problems of increasing difficulty"
              />
              <HowItWorksCard
                stepNumber="4"
                title="Track Progress"
                description="Monitor your improvement and learning journey"
              />
            </div>
          </div>

          <div className="flex flex-col gap-10 items-center justify-center text-center sm:py-10 py-5">
            <CTACard />
          </div>
        </div>
      </div>
      <div className="border-t-1 dark:border-foreground/10 border-foreground/25 mb-5" />
      <Footer />
    </>
  );
};

export default Home;
