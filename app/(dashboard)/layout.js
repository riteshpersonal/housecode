import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";

export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
