/// <reference path="../pb_data/types.d.ts" />

migrate(
  (app) => {
    let collection;
    try {
      collection = app.findCollectionByNameOrId("partner_inquiries");
    } catch (_) {
      collection = new Collection({
        type: "base",
        name: "partner_inquiries",
        // Public create so prospective partners can submit without an account.
        // Reads/writes are admin-only (null) — inquiries are handled privately.
        listRule: null,
        viewRule: null,
        createRule: "",
        updateRule: null,
        deleteRule: null,
        fields: [
          { name: "name", type: "text", required: true, max: 120 },
          { name: "email", type: "email", required: true },
          { name: "organization", type: "text", max: 160 },
          { name: "partner_type", type: "text", max: 120 },
          { name: "message", type: "text", required: true, max: 4000 },
          { name: "source", type: "text", max: 80 },
          { name: "created", type: "autodate", onCreate: true, onUpdate: false },
          { name: "updated", type: "autodate", onCreate: true, onUpdate: true },
        ],
        indexes: ["CREATE INDEX idx_partner_inquiries_created ON partner_inquiries (created)"],
      });
      app.save(collection);
    }
  },
  (app) => {
    try {
      const collection = app.findCollectionByNameOrId("partner_inquiries");
      app.delete(collection);
    } catch (e) {
      if (e.message && e.message.includes("no rows in result set")) {
        return;
      }
      throw e;
    }
  },
);
