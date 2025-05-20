function Footer() {
  return (
    <section className="flex justify-center flex-col items-center px-6">
      {/* <div className="container border-b-1 border-foreground/10 w-full  flex-col md:flex-row py-8 gap-6 hidden sm:flex">
        <div className="flex flex-col gap-2 md:max-w-1/4 w-full">
          <Link to="/">
            <Logo />
          </Link>
          <div className="text-muted-foreground">
            Elevate your coding skills with structured DSA practice designed for
            new developers.
          </div>
        </div>
        <div className="flex flex-col sm:flex-row w-full justify-between gap-6">
          <div className="flex flex-col gap-2 text-muted-foreground">
            <div className="font-bold text-foreground">Platform</div>
            <Link to="/">
              <div>Home</div>
            </Link>
            <Link to="/singin">
              <div>Login</div>
            </Link>
            <Link to="/signup">
              <div>SignUp</div>
            </Link>
          </div>
          <div className="flex flex-col gap-2 text-muted-foreground">
            <div className="font-bold text-foreground">Resources</div>
            <div>Documentation</div>
            <div>Blog</div>
            <div>DSA Guide</div>
          </div>
          <div className="flex flex-col gap-2 text-muted-foreground">
            <div className="font-bold text-foreground">Legal</div>
            <div>Privacy Policy</div>
            <div>Terms of Service</div>
            <div>Cookie Policy</div>
          </div>
        </div>
      </div> */}
      <div className="flex items-center justify-center text-muted-foreground py-8 text-center text-sm px-4">
        © 2025 CodeSummit. All rights reserved.
      </div>
    </section>
  );
}

export default Footer;
