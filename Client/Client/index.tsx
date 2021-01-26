import FourOhFour from "../../Components/FourOhFour";
import {
  FaDashcube,
  FaFileInvoiceDollar,
  FaPeopleCarry,
  FaShoppingCart,
  FaUserTie,
} from "react-icons/fa";
import Objects from "./Objects";

export default class App {
  context: any;

  constructor(context) {
    this.context = context;
  }

  appConfig = {
    actions: {
      filter: true,
      group: true,
      mobile: { displayAs: "bottom-navigation" },
    },
  };

  getActions = () => {
    return new Promise((resolve) => {
      resolve([
        {
          key: "overview",
          label: "Overview",
          component: FourOhFour,
          icon: FaDashcube,
        },
        {
          key: "products",
          label: "Products",
          component: Objects,
          icon: FaPeopleCarry,
          group: "Products",
        },
        {
          key: "sales",
          label: "Sales",
          component: Objects,
          icon: FaShoppingCart,
          group: "Products",
        }, {
          key: "orders",
          label: "Orders",
          component: Objects,
          icon: FaFileInvoiceDollar,
          group: "Products",
        },
        {
          key: "customers",
          label: "Customers",
          component: Objects,
          icon: FaUserTie,
          group: "Customers",
        },
      ]);
    });
  };
}
