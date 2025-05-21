const Dashboard = () => {
  const slogans = [
    {
      title: "A Fresh Approach to Learning",
      subText:
        "Code Summit is the go-to platform to improve coding skills, gain knowledge, and prepare for technical interviews effectively.",
    },
    {
      title: "Code Smart, Not Hard",
      subText:
        "Master the fundamentals and advanced topics with curated learning paths built for success.",
    },
    {
      title: "Your Gateway to Tech Excellence",
      subText:
        "From beginner to pro, Code Summit supports your journey with structured guidance and practice.",
    },
    {
      title: "Level Up Your Logic",
      subText:
        "Sharpen problem-solving skills with real-world coding challenges and instant feedback.",
    },
    {
      title: "Where Coders Evolve",
      subText:
        "Grow your skills with hands-on experience, peer learning, and industry-standard practices.",
    },
    {
      title: "Interview Like a Pro",
      subText:
        "Prepare with top-tier questions, mock interviews, and expert tips to land your dream job.",
    },
    {
      title: "Build. Break. Learn.",
      subText:
        "Experience learning through building projects, breaking down problems, and continuous improvement.",
    },
    {
      title: "Fuel Your Coding Passion",
      subText:
        "Stay motivated with achievements, milestones, and a thriving coding community.",
    },
    {
      title: "Code with Confidence",
      subText:
        "Learn at your own pace, gain clarity, and grow with confidence in your skills.",
    },
    {
      title: "Tech Careers Start Here",
      subText:
        "Get ready for tech roles with practical training and interview preparation that works.",
    },
    {
      title: "From Confused to Confident",
      subText:
        "Code Summit makes complex topics simple with bite-sized lessons and real-world examples.",
    },
    {
      title: "The Smarter Way to Learn Code",
      subText:
        "Forget passive learning—engage with interactive content and real-time practice.",
    },
    {
      title: "Push Your Coding Limits",
      subText:
        "Challenge yourself with advanced problems and improve your coding endurance.",
    },
    {
      title: "Crack Coding Interviews Easily",
      subText:
        "Get access to curated DSA questions, patterns, and mock interviews used by top companies.",
    },
    {
      title: "Practice That Pays Off",
      subText:
        "Every question, quiz, and code review is designed to boost your performance.",
    },
    {
      title: "Transform Learning into Results",
      subText:
        "Bridge the gap between knowledge and real-world application with project-based learning.",
    },
    {
      title: "Tech Skills for Tomorrow",
      subText:
        "Stay ahead with updated content on emerging technologies and tools.",
    },
    {
      title: "One Platform, Endless Growth",
      subText:
        "Whether you're learning front-end, back-end, or full-stack, we’ve got you covered.",
    },
    {
      title: "The Coding Playground",
      subText:
        "Experiment, build, fail, and learn—all in a safe and supportive environment.",
    },
    {
      title: "Because Practice Makes Perfect",
      subText:
        "Consistency meets smart practice with personalized learning plans.",
    },
    {
      title: "Master Coding with Mentorship",
      subText:
        "Learn from mentors and peers who’ve been through the same path and succeeded.",
    },
    {
      title: "Coding Simplified",
      subText:
        "We break down complex problems into digestible, easy-to-understand concepts.",
    },
    {
      title: "Your Coding Companion",
      subText:
        "Wherever you are in your journey, Code Summit is here to support your growth.",
    },
    {
      title: "Learn Code. Build Dreams.",
      subText:
        "Transform ideas into impactful software with skills gained at Code Summit.",
    },
    {
      title: "Your Daily Dose of Code",
      subText:
        "Stay consistent and engaged with daily practice challenges and micro-lessons.",
    },
    {
      title: "Grow Faster, Code Smarter",
      subText:
        "Accelerate your learning with tools built by developers, for developers.",
    },
    {
      title: "Redefining Online Coding Education",
      subText:
        "Not just tutorials—real growth through structured learning and hands-on projects.",
    },
    {
      title: "Ace the Tech Interviews",
      subText:
        "Access high-quality DSA prep and system design content made for cracking interviews.",
    },
    {
      title: "Built for Curious Minds",
      subText:
        "If you're passionate about learning, you'll thrive at Code Summit.",
    },
    {
      title: "Think. Code. Repeat.",
      subText:
        "Boost cognitive skills and become a better developer through repetition and challenges.",
    },
    {
      title: "Master the Art of Debugging",
      subText:
        "Learn to find and fix bugs fast with real-world problem scenarios.",
    },
    {
      title: "Your Launchpad to Big Tech",
      subText:
        "Train like candidates from Google, Meta, and Amazon—get interview-ready now.",
    },
    {
      title: "Power Up Your Portfolio",
      subText:
        "Work on projects that speak volumes to recruiters and hiring managers.",
    },
    {
      title: "Never Code Alone",
      subText:
        "Join a vibrant community of learners, mentors, and tech enthusiasts.",
    },
    {
      title: "Hands-on Learning, Real Impact",
      subText: "Go beyond theory—build real apps and get immediate feedback.",
    },
    {
      title: "Structured for Success",
      subText:
        "Every path is designed to help you progress from novice to ninja.",
    },
    {
      title: "Learn Like You Mean It",
      subText:
        "Stay focused with gamified modules, streaks, and personal goals.",
    },
    {
      title: "From Fundamentals to Advanced",
      subText:
        "All topics under one roof—from data types to distributed systems.",
    },
    {
      title: "Sharpen Your Skill Stack",
      subText: "Full-stack, front-end, back-end—we help you master them all.",
    },
    {
      title: "Code Your Way to Confidence",
      subText:
        "Improve with every keystroke through intentional and targeted practice.",
    },
    {
      title: "Inspired by Real Developers",
      subText: "Content created by industry experts with years of experience.",
    },
    {
      title: "Stay Ahead of the Curve",
      subText:
        "Keep up with fast-changing tech with up-to-date tutorials and challenges.",
    },
    {
      title: "Build Habits That Stick",
      subText:
        "Daily streaks, rewards, and reminders to keep your learning on track.",
    },
    {
      title: "No Fluff, Just Code",
      subText:
        "Straight to the point learning—no unnecessary filler, just pure value.",
    },
    {
      title: "Turn Effort Into Excellence",
      subText:
        "With the right platform, your consistent efforts will pay off big.",
    },
    {
      title: "Every Developer Starts Somewhere",
      subText:
        "Begin your journey with guided tutorials and a community to back you up.",
    },
    {
      title: "It’s Never Too Late to Learn",
      subText:
        "Whether you're switching careers or just starting, we’re here to help.",
    },
    {
      title: "Real Prep. Real Progress.",
      subText:
        "No more generic content—prepare with targeted resources and actionable feedback.",
    },
    {
      title: "Your Path to Proficiency",
      subText:
        "Step-by-step learning plans tailored to your goals and skill level.",
    },
    {
      title: "Create. Compete. Conquer.",
      subText:
        "Join coding competitions and show off your skills to the world.",
    },
  ];

  const randomNumber = Math.floor(Math.random() * slogans.length);
  const title = slogans[randomNumber].title;
  const midpoint = Math.floor(title.length / 2);
  const firstHalf = title.slice(0, midpoint);
  const secondHalf = title.slice(midpoint);

  return (
    <div className="h-screen flex justify-center">
      <div className=" h-full container flex flex-col  py-24">
        <div className="flex flex-col w-full items-center gap-2">
          <h1 className="text-6xl font-extrabold tracking-wider">
            <span>{firstHalf}</span>
            <span className="text-brand">{secondHalf}</span>
          </h1>
          <h2 className="text-muted-foreground text-2xl tracking-wide">{slogans[randomNumber].subText}</h2>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
