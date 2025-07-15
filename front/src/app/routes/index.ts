export const routes = {
  // Accesos públicos
  public: {
    login: "/",
    loginClient: "/loginclient",
    registerClient: "/registerclient",
    googleSuccess: "/auth/success",
  },
  
  client: {
    subscription: "/user/client-subscription",
    profileClient: "/profileclient",
    clientSubscription: "/user/client-subscription",
  },
  
  // Users
  user: {
    profile: "/user/profile",
    reports: "/user/reports",
    reportsemployee: "/user/reportsemployee",
    support: "/user/support",
    chat: "/user/chat",
    companysubscription: "/user/company-subscription",
    clientsubscription: "/user/client-subscription",
    ordercancel: "/user/ordercancel",
  },
  
  payment: {
    cartPaymentSuccess: "/payment/cart/success",
    cartPaymentCancelled: "/payment/cart/cancelled",
    subscriptioPaymentSuccess: "/payment/subscription/success",
    subscriptioPaymentCancelled: "/payment/subscription/cancelled",
    unsubscribe: "/payment/subscription/unsubscribe",
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
      tablecategory: "/manager/add/tablecategory",
      category: "/manager/add/addcategory",
      tablesubcategory: "/manager/add/tablesubcategory",
      subcategory: "/manager/add/addsubcategory",
      tableproduct: "/manager/add/tableproduct",
      product: "/manager/add/addproduct",
      tablebrand: "/manager/add/tablebrand",
      brand: "/manager/add/addbrand",
      tablesize: "/manager/add/tablesize",
      size: "/manager/add/addsize",
      tablecolor: "/manager/add/tablecolor",
      color: "/manager/add/addcolor",
      
    },

  // Settings manager
  settings: {
      createEmployee: "/manager/settings/createemployee",
      prices: "/manager/settings/prices",
      shipping: "/manager/settings/shipping",
      shippingUpload: "/manager/settings/shippingupload",
    },

  // Cashier
  cashier: {
      cuts: "/manager/cashier/cuts",
      audits: "/manager/cashier/audits",
      overview: "/manager/cashier/overview",
    },
  },
};