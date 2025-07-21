import CTACard from "@/components/cards/CTACard";
import HowItWorksCard from "@/components/cards/HowItWorksCard";
import LandinPageCard from "@/components/cards/LandinPageCard";
import { Button } from "@/components/ui/button";
import Footer from "@/sections/Footer";
import { Link } from "@tanstack/react-router";

const Home = () => {
  return (
    <>
      <div className="flex min-h-screen w-full px-4 pb-5 max-w-7xl mx-auto">
        <div className="flex flex-col 2xl:container mx-auto">
          <div className="flex flex-col space-y-6 items-center justify-center text-center py-16">
            <h1 className="2xl:text-6xl lg:text-5xl text-3xl font-bold text-brand 2xl:max-w-2xl max-w-xl mx-auto">
              Master Data Structure & Algorithms
            </h1>
            <h3 className="2xl:text-2xl text-xl text-foreground/60 tracking-wide 2xl:max-w-5xl max-w-2xl mx-auto">
              The perfect platform for new developers to learn, practice, and
              excel in DSA problems.
            </h3>
            <div className="flex flex-wrap sm:flex-nowrap gap-4 p-4 justify-center">
              <Link to="/signup">
                <Button
                  size="lg"
                  className="bg-brand px-8 py-2 text-lg hover:bg-brand/80 hover:scale-105 transition delay-150 duration-300 ease-in-out cursor-pointer w-auto sm:w-auto"
                >
                  Get Started – It's Free
                </Button>
              </Link>
              <Link to="/signin">
                <Button
                  size="lg"
                  className="dark:bg-foreground bg-text-secondary px-8 py-2 text-lg hover:scale-105 transition delay-150 duration-300 ease-in-out cursor-pointer w-auto sm:w-auto"
                >
                  Already a Member?
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-10 items-center justify-center text-center py-10 sm:py-5">
            <h1 className="text-4xl sm:text-2xl font-bold tracking-tight">
              Why Choose CodeSummit?
            </h1>

            <div className="w-full flex flex-wrap justify-between gap-5">
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

          <div className="flex flex-col gap-10 items-center justify-center text-center py-10 sm:py-5">
            <h1 className="text-4xl sm:text-2xl font-bold tracking-tight">
              How It Works?
            </h1>

            <div className="w-full flex justify-between flex-wrap sm:flex-nowrap gap-3 sm:gap-0 items-center">
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

          <div className="flex flex-col gap-10 items-center justify-center text-center py-10 sm:py-5">
            <CTACard />
          </div>
        </div>
      </div>
      <div className="border-t border-foreground/25 dark:border-foreground/10 mb-5" />
      <Footer />
    </>
  );
};

export default Home;
