import Navbar from "./Navbar";
import BankImage from "../carImage.jpg";
import Footer from "./footer";

function About() {
  return (
    <div className="bg-white">
      <Navbar />
      <div className="py-5 py-md-16">
        <div className="container-md px-4">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <img
                src={BankImage}
                alt="img"
                className="w-full rounded-lg"
                style={{ height: "auto" }}
              />
            </div>
            <div className="md:w-1/2 md:pl-10">
              <h2 className="text-primary font-bold mb-4 text-5xl">
                Welcome to <span className="text-dark">enovateBank</span>
              </h2>
              <p className="text-gray-600 mb-4 text-xl">
                We are a team of finance and technology experts who have come
                together to create a revolutionary banking experience. Our
                platform leverages cutting-edge technology to provide secure and
                reliable banking services to our customers.
              </p>
              <p className="text-gray-600 mb-4 text-xl">
                Our mission is to make banking more accessible and convenient
                for everyone. We offer a range of products and services that are
                tailored to meet the unique needs of each customer. Our platform
                is designed to provide a seamless and hassle-free banking
                experience.
              </p>
              <p className="text-primary mb-4 text-xl">
                At enovateBank, we believe in putting our customers first. We
                are constantly working to improve our platform and provide
                innovative solutions that meet the evolving needs of our
                customers.
              </p>
              <p className="text-white bg-primary rounded-lg p-4 mb-0 text-xl">
                Thank you for choosing enovateBank. We look forward to being
                your trusted financial partner and helping you achieve your
                financial goals.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;
