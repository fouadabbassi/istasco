import { Link } from "react-router-dom";
import { LogoFooter } from "../assets/LogoFooter";

const Footer = () => {
  return (
    <div>
      <footer className="bg-[#000] font-sans tracking-wide">
        <div className="py-14 px-6 sm:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
            <div className="p-4">
              <Link to={"/"}>
                <img src={LogoFooter} alt="logo" className="w-full mb-8" />
              </Link>
              <p className="text-gray-300 text-md">
                votre partenaire de confiance en matière d’équipements de
                protection individuelle (EPI).
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-8 p-4 text-white">
                Navigation
              </h4>
              <ul className="pl-4 space-y-4">
                <li>
                  <Link
                    to={"/"}
                    className="text-gray-300 hover:text-white text-sm"
                  >
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/#about"}
                    className="text-gray-300 hover:text-white text-sm"
                  >
                    À propos de nous
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/produits"}
                    className="text-gray-300 hover:text-white text-sm"
                  >
                    Produits
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/#contact"}
                    className="text-gray-300 hover:text-white text-sm"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2 w-100 h-100">
              <iframe
                width="100%"
                height="100%"
                src="https://maps.google.com/maps?q=ISTAS Maroc, 51 Rue al khalil, Casablanca 20000&z=15&output=embed"
              ></iframe>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-8 p-4 text-white">
                Contactez-nous
              </h4>
              <div className="pl-4 space-y-4">
                <p className="text-gray-300 text-sm">
                  51 Rue al khalil, Casablanca 20000, Casablanca
                </p>
                <p className="text-gray-300 text-sm">istas.maroc@gmail.com</p>
                <p className="text-gray-300 text-sm">
                  05 22 62 73 50
                  <br /> 05 22 63 77 05
                  <br /> 06 62 07 33 17
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center py-5 bg-[#021528]">
          <p className="text-gray-300 text-sm">
            © ISTASco. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Footer
