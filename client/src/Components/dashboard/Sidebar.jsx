import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../../assets/Logo";
import { logoutUser } from "../../Redux/userAction";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
    toast.success("Déconnexion réussie !");
  };

  const menuItems = [
    { path: "/dashboard", icon: "dashboard", label: "Tableau de bord" },
    { path: "/dashboard/users", icon: "users", label: "Utilisateurs" },
    { path: "/dashboard/categories", icon: "categories", label: "Catégories" },
    {
      path: "/dashboard/subcategories",
      icon: "subcategories",
      label: "Sous-catégories",
    },
    { path: "/dashboard/produits", icon: "products", label: "Produits" },
    { path: "/dashboard/orders", icon: "orders", label: "Commandes" },
    { path: "/dashboard/messages", icon: "messages", label: "Messages" },
  ];

  const getIcon = (iconName) => {
    const icons = {
      dashboard: (
        <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
      ),
      users: (
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
      ),
      categories: (
        <>
          <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
        </>
      ),
      subcategories: (
        <>
          <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
          <path d="M10 10h4v4h-4z" fillOpacity="0.3" />
        </>
      ),
      products: (
        <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z" />
      ),
      orders: (
        <path d="M13 2v8h8c0-4.42-3.58-8-8-8zm2 6V4.34c1.7.6 3.05 1.95 3.66 3.66H15zm-8.56 3l-.95-2H2v2h2.22s1.89 4.07 2.12 4.42c-1.1.59-1.84 1.75-1.84 3.08C4.5 20.43 6.07 22 8 22c1.76 0 3.22-1.3 3.46-3h2.08c.24 1.7 1.7 3 3.46 3 1.93 0 3.5-1.57 3.5-3.5 0-1.04-.46-1.97-1.18-2.61C20.37 14.54 21 12.84 21 11H6.44zM8 20c-.83 0-1.5-.67-1.5-1.5S7.17 17 8 17s1.5.67 1.5 1.5S8.83 20 8 20zm9 0c-.83 0-1.5-.67-1.5-1.5S16.17 17 17 17s1.5.67 1.5 1.5S17.83 20 17 20zm.74-5.34l-.29.37c-.14-.46-.52-.8-.99-.8-.58 0-1.05.47-1.05 1.05 0 .59.47 1.05 1.05 1.05.75 0 1.02-.76 1.03-.78.01-.02.08-.14.14-.27.13-.26.55-1.1.55-1.1l-.44-.27z" />
      ),
      messages: (
        <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
      ),
      logout: (
        <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
      ),
    };

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-5 h-5 mr-3 text-gray-500"
      >
        {icons[iconName]}
      </svg>
    );
  };

  return (
    <nav className="fixed top-0 left-0 bottom-0 lg-w-2 bg-white shadow-md flex flex-col z-10">
      <Link to="/" className="p-4 border-b">
        <img src={Logo} alt="Logo" />
      </Link>

      <div className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className="flex items-center p-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
              >
                {getIcon(item.icon)}
                <span className="ml-3">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="flex items-center w-full p-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
        >
          {getIcon("logout")}
          <span className="ml-3">Déconnexion</span>
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
