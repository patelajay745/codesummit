const BackgroundDrop = () => {
  return (
    <>
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_106.31%_135.80%_at_29.77%_59.72%,_rgba(255,255,255,0.96)_48%,_#D0E8F9_86%)] shadow-[inset_0px_4px_100px_0px_rgba(0,0,0,0.05)] dark:hidden"></div>

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_106.31%_135.80%_at_29.77%_59.72%,_rgba(27,21,21,0.96)_48%,_#125E98_86%)] shadow-[inset_0px_4px_100px_0px_rgba(0,0,0,0.25)] hidden dark:block"></div>
      </div>
    </>
  );
};

export default BackgroundDrop;
