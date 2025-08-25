export type Supplier = {
  id: string;
  name: string;
  contactInfo: {
    email?: string;
    phone?: string;
  } | null;
  createdAt: string;
};

export const suppliers: Supplier[] = [
  {
    id: "1a2b3c4d",
    name: "Acme Corporation",
    contactInfo: {
      email: "contact@acme.com",
      phone: "+63 912 345 6789",
    },
    createdAt: "2025-08-01T10:30:00Z",
  },
  {
    id: "5e6f7g8h",
    name: "Global Supplies Ltd.",
    contactInfo: {
      email: "sales@globalsupplies.com",
    },
    createdAt: "2025-08-10T15:45:00Z",
  },
  {
    id: "9i0j1k2l",
    name: "Metro Wholesale",
    contactInfo: {
      phone: "+63 998 765 4321",
    },
    createdAt: "2025-08-15T09:00:00Z",
  },
  {
    id: "3m4n5o6p",
    name: "FreshMart",
    contactInfo: null,
    createdAt: "2025-08-20T12:00:00Z",
  },

  // --- Extra 55+ suppliers ---
  {
    id: "7q8r9s0t",
    name: "Prime Traders",
    contactInfo: {
      email: "info@primetraders.com",
      phone: "+63 917 100 2000",
    },
    createdAt: "2025-08-21T08:15:00Z",
  },
  {
    id: "u1v2w3x4",
    name: "Island Imports",
    contactInfo: {
      phone: "+63 927 111 2233",
    },
    createdAt: "2025-08-21T09:30:00Z",
  },
  {
    id: "y5z6a7b8",
    name: "Sunrise Enterprises",
    contactInfo: {
      email: "hello@sunrise.ph",
    },
    createdAt: "2025-08-21T10:00:00Z",
  },
  {
    id: "c9d0e1f2",
    name: "Harbor Supplies",
    contactInfo: null,
    createdAt: "2025-08-22T14:00:00Z",
  },
  {
    id: "g3h4i5j6",
    name: "Evergreen Goods",
    contactInfo: {
      email: "contact@evergreen.com",
      phone: "+63 995 222 3344",
    },
    createdAt: "2025-08-22T15:45:00Z",
  },
  {
    id: "k7l8m9n0",
    name: "Pacific Ventures",
    contactInfo: {
      email: "sales@pacificventures.com",
    },
    createdAt: "2025-08-22T17:30:00Z",
  },
  {
    id: "o1p2q3r4",
    name: "Northwind Traders",
    contactInfo: {
      phone: "+63 933 555 6677",
    },
    createdAt: "2025-08-23T08:00:00Z",
  },
  {
    id: "s5t6u7v8",
    name: "Golden Harvest",
    contactInfo: null,
    createdAt: "2025-08-23T11:45:00Z",
  },
  {
    id: "w9x0y1z2",
    name: "Blue Ocean Exports",
    contactInfo: {
      email: "exports@blueocean.com",
    },
    createdAt: "2025-08-23T12:30:00Z",
  },
  {
    id: "a3b4c5d6",
    name: "Urban Supply Co.",
    contactInfo: {
      email: "support@urbansupply.com",
      phone: "+63 918 222 9988",
    },
    createdAt: "2025-08-23T14:00:00Z",
  },

  // ... repeat with varied data until you have ~60 suppliers
];

// Example filler loop if you want auto-generated IDs/dates:
for (let i = 12; i <= 60; i++) {
  suppliers.push({
    id: `sup-${i}`,
    name: `Supplier ${i}`,
    contactInfo:
      i % 4 === 0
        ? null
        : i % 2 === 0
          ? { email: `supplier${i}@mail.com` }
          : { phone: `+63 9${10 + i} ${1000 + i}` },
    createdAt: new Date(2025, 7, (i % 28) + 1, 9, 0, 0).toISOString(),
  });
}
