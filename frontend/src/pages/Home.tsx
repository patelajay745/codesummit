import HowItWorksCard from "@/components/cards/HowItWorksCard";
import LandinPageCard from "@/components/cards/LandinPageCard";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div className="flex  min-h-screen w-full px-4 pb-5">
      <div className="flex flex-col container mx-auto ">
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
              className="bg-brand w-full sm:w-auto px-8 py-2 text-lg hover:bg-brand/80"
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

        <div className="flex flex-col gap-10 items-center justify-center text-center  sm:py-10 py-5">
          <h1 className="sm:text-4xl font-bold tracking-tight text-2xl">
            Why Choose CodeSummit?
          </h1>

          <div className="w-full flex sm:flex-wrap flex-wrap justify-between gap-3 sm:gap-0">
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

          <div className="w-full flex sm:flex-wrap flex-wrap justify-between gap-3 sm:gap-0">
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
      </div>
    </div>
  );
};

export default Home;
