export const routes = {
  // Accesos públicos
  public: {
    login: "/",
    loginClient: "/loginclient",
    registerClient: "/registerclient",
  },
  
  client: {
    subscription: "/user/client-subscription",
    profileClient: "/profileclient",
    clientSubscription: "/user/client-subscription",
  },

  // Users
  user: {
    profile: "/user/profile",
    sales: "/user/sales",
    support: "/user/support",
    chat: "/user/chat",
    companySubscription: "/user/company-subscription",
  },

  // Shop
  shop: {
    categories: "/shop/categories",
    products: "/shop/products",
    subcategories: "/shop/subcategories",
  },

  // 🛠️ Manager (configuraciones y control total)
  manager: {
    // Add
    add: {
      category: "/manager/add/addcategory",
      subcategory: "/manager/add/addsubcategory",
      product: "/manager/add/addproduct",
      brand: "/manager/add/addbrand",
      size: "/manager/add/addsize",
      color: "/manager/add/addcolor",
    },

  // Settings manager
  settings: {
      createEmployee: "/manager/settings/createemployee",
      prices: "/manager/settings/prices",
      pricesUpload: "/manager/settings/pricesupload",
      shipping: "/manager/settings/shipping",
      shippingUpload: "/manager/settings/shippingupload",
    },

  // Cashier
  cashier: {
      newCash: "/manager/cashier/newcash",
      newShift: "/manager/cashier/newshift",
      overview: "/manager/cashier/overview",
    },
  },
};