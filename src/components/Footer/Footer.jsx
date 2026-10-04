import React from "react";

function Footer() {
  return (
    <footer className=" py-20">
      <div className="max-w-[1200px] mx-auto flex justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-semibold">My Ecom</h1>
          <p className="mt-2">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam
            placeat vitae deleniti incidunt veritatis modi iste saepe ex impedit
            quam atque enim omnis quo veniam quis molestiae, commodi cupiditate
            aut.
          </p>
          <button className="px-2 py-1 bg-blue-800 text-white rounded-lg mt-5">
            Learn More
          </button>
        </div>
        <div className="flex-1 ml-20">
          <h3 className="text-xl font-semibold">Usefull Links</h3>

          <ul className="mt-3">
            <li className="mt-3 cursor-pointer">Home</li>
            <li className="mt-3 cursor-pointer">About</li>
            <li className="mt-3 cursor-pointer">Shop</li>
            <li className="mt-3 cursor-pointer">Conatct</li>
          </ul>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold">Contact Us</h3>
          <iframe
            className="mt-3"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224569.11690785276!2d76.82526905399864!3d28.422501875151813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19d582e38859%3A0x2cf5fe8e5c64b1e!2sGurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1777284394275!5m2!1sen!2sin"
            width="100%"
            height="200"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
