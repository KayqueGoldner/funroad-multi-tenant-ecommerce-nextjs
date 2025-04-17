import { Navbar } from "./navbar";
import { Footer } from "./footer";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1 bg-[#F4F4F0]">{children}</div>
      <Footer />
    </div>
  );
};

export default HomeLayout;
