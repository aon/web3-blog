import Footer from "../footer";
import NavBar from "../navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex mt-14 flex-grow p-5 lg:py-14">{children}</main>
      <Footer />
    </div>
  );
}
