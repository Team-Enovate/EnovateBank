import Navbar from "./Navbar";
import Banner from "./Banner";
import banner from "../bg_banner.jpg";
import Footer from "./footer";


export default function Home() {
  return (
    <div
      className="bg-center bg-cover"
      style={{ backgroundImage: `url(${banner})` }}
    >
      <Navbar></Navbar>
      <Banner></Banner>
      <Footer></Footer>
    </div>
  );
}
