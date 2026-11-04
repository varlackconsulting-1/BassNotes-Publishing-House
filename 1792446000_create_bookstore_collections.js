/// <reference path="../pb_data/types.d.ts" />

migrate(
  (app) => {
    const users = app.findCollectionByNameOrId("users");

    // ---- book_reviews: public reads, owner-only writes ----
    let reviews;
    try {
      reviews = app.findCollectionByNameOrId("book_reviews");
    } catch (_) {
      reviews = new Collection({
        type: "base",
        name: "book_reviews",
        listRule: "",
        viewRule: "",
        createRule: "@request.auth.id != ''",
        updateRule: "@request.auth.id != '' && @request.auth.id = owner",
        deleteRule: "@request.auth.id != '' && @request.auth.id = owner",
        fields: [
          { name: "product_id", type: "text", required: true, max: 120 },
          { name: "product_title", type: "text", max: 200 },
          { name: "rating", type: "number", required: true, min: 1, max: 5 },
          { name: "title", type: "text", max: 200 },
          { name: "body", type: "text", max: 4000 },
          {
            name: "owner",
            type: "relation",
            required: true,
            maxSelect: 1,
            collectionId: users.id,
            cascadeDelete: true,
          },
          { name: "created", type: "autodate", onCreate: true, onUpdate: false },
          { name: "updated", type: "autodate", onCreate: true, onUpdate: true },
        ],
        indexes: [
          "CREATE INDEX idx_book_reviews_product ON book_reviews (product_id)",
        ],
      });
      app.save(reviews);
    }

    // ---- wishlist: owner-only ----
    let wishlist;
    try {
      wishlist = app.findCollectionByNameOrId("wishlist");
    } catch (_) {
      wishlist = new Collection({
        type: "base",
        name: "wishlist",
        listRule: "@request.auth.id != '' && @request.auth.id = owner",
        viewRule: "@request.auth.id != '' && @request.auth.id = owner",
        createRule: "@request.auth.id != ''",
        updateRule: "@request.auth.id != '' && @request.auth.id = owner",
        deleteRule: "@request.auth.id != '' && @request.auth.id = owner",
        fields: [
          { name: "product_id", type: "text", required: true, max: 120 },
          { name: "variant_id", type: "text", max: 120 },
          { name: "product_title", type: "text", max: 200 },
          { name: "cover_url", type: "url" },
          { name: "price_cents", type: "number", min: 0 },
          {
            name: "owner",
            type: "relation",
            required: true,
            maxSelect: 1,
            collectionId: users.id,
            cascadeDelete: true,
          },
          { name: "created", type: "autodate", onCreate: true, onUpdate: false },
          { name: "updated", type: "autodate", onCreate: true, onUpdate: true },
        ],
      });
      app.save(wishlist);
    }

    // ---- customer_addresses: owner-only ----
    let addresses;
    try {
      addresses = app.findCollectionByNameOrId("customer_addresses");
    } catch (_) {
      addresses = new Collection({
        type: "base",
        name: "customer_addresses",
        listRule: "@request.auth.id != '' && @request.auth.id = owner",
        viewRule: "@request.auth.id != '' && @request.auth.id = owner",
        createRule: "@request.auth.id != ''",
        updateRule: "@request.auth.id != '' && @request.auth.id = owner",
        deleteRule: "@request.auth.id != '' && @request.auth.id = owner",
        fields: [
          {
            name: "address_type",
            type: "select",
            required: true,
            maxSelect: 1,
            values: ["shipping", "billing"],
          },
          { name: "label", type: "text", max: 80 },
          { name: "full_name", type: "text", required: true, max: 160 },
          { name: "line1", type: "text", required: true, max: 200 },
          { name: "line2", type: "text", max: 200 },
          { name: "city", type: "text", required: true, max: 120 },
          { name: "state", type: "text", required: true, max: 120 },
          { name: "postal_code", type: "text", required: true, max: 40 },
          { name: "country", type: "text", required: true, max: 80 },
          { name: "phone", type: "text", max: 60 },
          { name: "is_default", type: "bool" },
          {
            name: "owner",
            type: "relation",
            required: true,
            maxSelect: 1,
            collectionId: users.id,
            cascadeDelete: true,
          },
          { name: "created", type: "autodate", onCreate: true, onUpdate: false },
          { name: "updated", type: "autodate", onCreate: true, onUpdate: true },
        ],
      });
      app.save(addresses);
    }

    // ---- customer_orders: owner-only mirror of store orders ----
    let orders;
    try {
      orders = app.findCollectionByNameOrId("customer_orders");
    } catch (_) {
      orders = new Collection({
        type: "base",
        name: "customer_orders",
        listRule: "@request.auth.id != '' && @request.auth.id = owner",
        viewRule: "@request.auth.id != '' && @request.auth.id = owner",
        createRule: "@request.auth.id != ''",
        updateRule: "@request.auth.id != '' && @request.auth.id = owner",
        deleteRule: null,
        fields: [
          { name: "store_order_id", type: "text", max: 120 },
          { name: "items", type: "json", maxSize: 2000000 },
          { name: "total_cents", type: "number", min: 0 },
          { name: "currency", type: "text", max: 10 },
          { name: "status", type: "text", max: 60 },
          { name: "is_digital_only", type: "bool" },
          {
            name: "owner",
            type: "relation",
            required: true,
            maxSelect: 1,
            collectionId: users.id,
            cascadeDelete: true,
          },
          { name: "created", type: "autodate", onCreate: true, onUpdate: false },
          { name: "updated", type: "autodate", onCreate: true, onUpdate: true },
        ],
        indexes: [
          "CREATE INDEX idx_customer_orders_owner ON customer_orders (owner)",
        ],
      });
      app.save(orders);
    }

    // ---- digital_purchases: secure owner-only library items ----
    let digital;
    try {
      digital = app.findCollectionByNameOrId("digital_purchases");
    } catch (_) {
      digital = new Collection({
        type: "base",
        name: "digital_purchases",
        listRule: "@request.auth.id != '' && @request.auth.id = owner",
        viewRule: "@request.auth.id != '' && @request.auth.id = owner",
        createRule: "@request.auth.id != ''",
        updateRule: null,
        deleteRule: null,
        fields: [
          { name: "product_id", type: "text", required: true, max: 120 },
          { name: "variant_id", type: "text", max: 120 },
          { name: "product_title", type: "text", required: true, max: 200 },
          { name: "cover_url", type: "url" },
          {
            name: "file",
            type: "file",
            maxSelect: 1,
            maxSize: 104857600,
            mimeTypes: [
              "application/pdf",
              "application/epub+zip",
              "application/octet-stream",
              "application/x-mobipocket-ebook",
            ],
            protected: true,
          },
          { name: "download_token", type: "text", max: 120 },
          {
            name: "owner",
            type: "relation",
            required: true,
            maxSelect: 1,
            collectionId: users.id,
            cascadeDelete: true,
          },
          { name: "created", type: "autodate", onCreate: true, onUpdate: false },
          { name: "updated", type: "autodate", onCreate: true, onUpdate: true },
        ],
        indexes: [
          "CREATE INDEX idx_digital_purchases_owner ON digital_purchases (owner)",
        ],
      });
      app.save(digital);
    }

    // ---- discount_codes: admin-managed, public read for validation ----
    let discounts;
    try {
      discounts = app.findCollectionByNameOrId("discount_codes");
    } catch (_) {
      discounts = new Collection({
        type: "base",
        name: "discount_codes",
        listRule: "",
        viewRule: "",
        createRule: null,
        updateRule: null,
        deleteRule: null,
        fields: [
          { name: "code", type: "text", required: true, max: 60 },
          {
            name: "type",
            type: "select",
            required: true,
            maxSelect: 1,
            values: ["percent", "fixed"],
          },
          { name: "value", type: "number", required: true, min: 0 },
          { name: "active", type: "bool" },
          { name: "max_uses", type: "number", min: 0 },
          { name: "uses", type: "number", min: 0 },
          { name: "created", type: "autodate", onCreate: true, onUpdate: false },
          { name: "updated", type: "autodate", onCreate: true, onUpdate: true },
        ],
        indexes: [
          "CREATE UNIQUE INDEX idx_discount_codes_code ON discount_codes (code) WHERE code != ''",
        ],
      });
      app.save(discounts);
    }
  },
  (app) => {
    const names = [
      "book_reviews",
      "wishlist",
      "customer_addresses",
      "customer_orders",
      "digital_purchases",
      "discount_codes",
    ];
    names.forEach((name) => {
      try {
        const col = app.findCollectionByNameOrId(name);
        app.delete(col);
      } catch (e) {
        if (e.message && e.message.includes("no rows in result set")) return;
      }
    });
  },
);
