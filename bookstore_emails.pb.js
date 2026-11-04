/// <reference path="../pb_data/types.d.ts" />

/* BassNotes branded transactional emails:
   - New Account Created (on users create)
   - Password Reset (branded built-in)
   - Order Confirmation (on customer_orders create)
   - Digital Download Delivery (on digital_purchases create)
*/

// New Account Created
onRecordAfterCreateSuccess((e) => {
  const BRAND = "BassNotes Publishing House";
  const SUPPORT_EMAIL = "hello@bassnotespublishing.com";
  const appUrl = $app.settings().meta.appURL;
  const email = e.record.getString("email");
  const name = e.record.getString("name") || "Reader";
  if (!email) {
    e.next();
    return;
  }
  const shell = (subject, bodyHtml) => `
  <div style="max-width:560px;margin:0 auto;font-family:'Open Sans',Arial,sans-serif;background:#ffffff;border:1px solid #e6e8eb;border-radius:12px;overflow:hidden">
    <div style="background:#0a3d62;padding:24px 32px">
      <h1 style="margin:0;color:#ffffff;font-size:22px;letter-spacing:0.02em">BassNotes</h1>
      <p style="margin:4px 0 0;color:#e39b3a;font-size:12px;text-transform:uppercase;letter-spacing:0.2em">Publishing House</p>
    </div>
    <div style="padding:32px;color:#1a1a1a">
      <h2 style="margin:0 0 16px;font-size:20px;color:#0a3d62">${subject}</h2>
      ${bodyHtml}
    </div>
    <div style="background:#f4f6f8;padding:20px 32px;text-align:center;color:#5c6570;font-size:12px">
      <p style="margin:0">© ${new Date().getFullYear()} Bass Notes Publishing. All Rights Reserved.</p>
      <p style="margin:6px 0 0">Questions? <a href="mailto:${SUPPORT_EMAIL}" style="color:#0a3d62">${SUPPORT_EMAIL}</a></p>
    </div>
  </div>`;
  const message = new MailerMessage({
    from: { name: BRAND },
    to: [{ address: email }],
    subject: `Welcome to ${BRAND}`,
    html: shell(
      "Welcome to the BassNotes family",
      `<p style="font-size:16px;line-height:1.6">Hi ${name},</p>
       <p style="font-size:16px;line-height:1.6">Your BassNotes account is ready. You can now browse the bookstore, build a wishlist, and access your digital library after purchase.</p>
       <p style="font-size:16px;line-height:1.6">Stories that live beyond the page — we are glad you are here.</p>
       <p style="margin-top:24px"><a href="${appUrl}/bookstore" style="display:inline-block;background:#0a3d62;color:#ffffff;padding:12px 28px;border-radius:9999px;text-decoration:none;font-weight:700;font-size:14px;text-transform:uppercase;letter-spacing:0.1em">Browse the Bookstore</a></p>`,
    ),
  });
  try {
    $app.newMailClient().send(message);
  } catch (err) {
    $app.logger().error("welcome email failed", "to", email, "err", String(err));
  }
  e.next();
}, "users");

// Branded password reset
onMailerRecordPasswordResetSend((e) => {
  const BRAND = "BassNotes Publishing House";
  const SUPPORT_EMAIL = "hello@bassnotespublishing.com";
  const appUrl = $app.settings().meta.appURL;
  const link = `${appUrl}/_/#/auth/confirm-password-reset/${e.meta.token}`;
  const shell = (subject, bodyHtml) => `
  <div style="max-width:560px;margin:0 auto;font-family:'Open Sans',Arial,sans-serif;background:#ffffff;border:1px solid #e6e8eb;border-radius:12px;overflow:hidden">
    <div style="background:#0a3d62;padding:24px 32px">
      <h1 style="margin:0;color:#ffffff;font-size:22px;letter-spacing:0.02em">BassNotes</h1>
      <p style="margin:4px 0 0;color:#e39b3a;font-size:12px;text-transform:uppercase;letter-spacing:0.2em">Publishing House</p>
    </div>
    <div style="padding:32px;color:#1a1a1a">
      <h2 style="margin:0 0 16px;font-size:20px;color:#0a3d62">${subject}</h2>
      ${bodyHtml}
    </div>
    <div style="background:#f4f6f8;padding:20px 32px;text-align:center;color:#5c6570;font-size:12px">
      <p style="margin:0">© ${new Date().getFullYear()} Bass Notes Publishing. All Rights Reserved.</p>
      <p style="margin:6px 0 0">Questions? <a href="mailto:${SUPPORT_EMAIL}" style="color:#0a3d62">${SUPPORT_EMAIL}</a></p>
    </div>
  </div>`;
  e.message.from.name = BRAND;
  e.message.subject = `Reset your ${BRAND} password`;
  e.message.html = shell(
    "Reset your password",
    `<p style="font-size:16px;line-height:1.6">We received a request to reset your BassNotes password.</p>
     <p style="font-size:16px;line-height:1.6">Click the button below to set a new password. This link is valid for 30 minutes.</p>
     <p style="margin-top:24px"><a href="${link}" style="display:inline-block;background:#0a3d62;color:#ffffff;padding:12px 28px;border-radius:9999px;text-decoration:none;font-weight:700;font-size:14px;text-transform:uppercase;letter-spacing:0.1em">Reset Password</a></p>
     <p style="font-size:14px;color:#5c6570;margin-top:20px">If you did not request this, you can safely ignore this email.</p>`,
  );
  e.next();
}, "users");

// Order Confirmation
onRecordAfterCreateSuccess((e) => {
  const BRAND = "BassNotes Publishing House";
  const SUPPORT_EMAIL = "hello@bassnotespublishing.com";
  const appUrl = $app.settings().meta.appURL;
  const shell = (subject, bodyHtml) => `
  <div style="max-width:560px;margin:0 auto;font-family:'Open Sans',Arial,sans-serif;background:#ffffff;border:1px solid #e6e8eb;border-radius:12px;overflow:hidden">
    <div style="background:#0a3d62;padding:24px 32px">
      <h1 style="margin:0;color:#ffffff;font-size:22px;letter-spacing:0.02em">BassNotes</h1>
      <p style="margin:4px 0 0;color:#e39b3a;font-size:12px;text-transform:uppercase;letter-spacing:0.2em">Publishing House</p>
    </div>
    <div style="padding:32px;color:#1a1a1a">
      <h2 style="margin:0 0 16px;font-size:20px;color:#0a3d62">${subject}</h2>
      ${bodyHtml}
    </div>
    <div style="background:#f4f6f8;padding:20px 32px;text-align:center;color:#5c6570;font-size:12px">
      <p style="margin:0">© ${new Date().getFullYear()} Bass Notes Publishing. All Rights Reserved.</p>
      <p style="margin:6px 0 0">Questions? <a href="mailto:${SUPPORT_EMAIL}" style="color:#0a3d62">${SUPPORT_EMAIL}</a></p>
    </div>
  </div>`;
  const total = e.record.getInt("total_cents");
  const status = e.record.getString("status") || "processing";
  const totalFmt = "$" + (total / 100).toFixed(2);
  const ownerRel = e.record.get("owner");
  const ownerId = Array.isArray(ownerRel) ? ownerRel[0] : ownerRel;
  if (!ownerId) {
    e.next();
    return;
  }
  try {
    const ownerRec = $app.findRecordById("users", ownerId);
    const email = ownerRec.getString("email");
    if (email) {
      const message = new MailerMessage({
        from: { name: BRAND },
        to: [{ address: email }],
        subject: `Your ${BRAND} order confirmation`,
        html: shell(
          "Order confirmed",
          `<p style="font-size:16px;line-height:1.6">Thank you for your order!</p>
           <p style="font-size:16px;line-height:1.6">We have received your order and it is now <strong>${status}</strong>.</p>
           <p style="font-size:16px;line-height:1.6"><strong>Order total:</strong> ${totalFmt}</p>
           <p style="font-size:14px;color:#5c6570;margin-top:20px">You can view your order history and digital downloads anytime in your BassNotes account dashboard.</p>`,
        ),
      });
      try {
        $app.newMailClient().send(message);
      } catch (err) {
        $app.logger().error("order confirmation email failed", "to", email, "err", String(err));
      }
    }
  } catch (err) {
    $app.logger().error("order confirmation hook failed", "err", String(err));
  }
  e.next();
}, "customer_orders");

// Digital Download Delivery
onRecordAfterCreateSuccess((e) => {
  const BRAND = "BassNotes Publishing House";
  const SUPPORT_EMAIL = "hello@bassnotespublishing.com";
  const appUrl = $app.settings().meta.appURL;
  const shell = (subject, bodyHtml) => `
  <div style="max-width:560px;margin:0 auto;font-family:'Open Sans',Arial,sans-serif;background:#ffffff;border:1px solid #e6e8eb;border-radius:12px;overflow:hidden">
    <div style="background:#0a3d62;padding:24px 32px">
      <h1 style="margin:0;color:#ffffff;font-size:22px;letter-spacing:0.02em">BassNotes</h1>
      <p style="margin:4px 0 0;color:#e39b3a;font-size:12px;text-transform:uppercase;letter-spacing:0.2em">Publishing House</p>
    </div>
    <div style="padding:32px;color:#1a1a1a">
      <h2 style="margin:0 0 16px;font-size:20px;color:#0a3d62">${subject}</h2>
      ${bodyHtml}
    </div>
    <div style="background:#f4f6f8;padding:20px 32px;text-align:center;color:#5c6570;font-size:12px">
      <p style="margin:0">© ${new Date().getFullYear()} Bass Notes Publishing. All Rights Reserved.</p>
      <p style="margin:6px 0 0">Questions? <a href="mailto:${SUPPORT_EMAIL}" style="color:#0a3d62">${SUPPORT_EMAIL}</a></p>
    </div>
  </div>`;
  const title = e.record.getString("product_title");
  const ownerRel = e.record.get("owner");
  const ownerId = Array.isArray(ownerRel) ? ownerRel[0] : ownerRel;
  if (!ownerId) {
    e.next();
    return;
  }
  try {
    const ownerRec = $app.findRecordById("users", ownerId);
    const email = ownerRec.getString("email");
    if (email) {
      const libraryUrl = `${appUrl}/account/library`;
      const message = new MailerMessage({
        from: { name: BRAND },
        to: [{ address: email }],
        subject: `Your digital download is ready — ${title}`,
        html: shell(
          "Your eBook is ready",
          `<p style="font-size:16px;line-height:1.6">Your digital purchase of <strong>${title}</strong> is ready to download.</p>
           <p style="font-size:16px;line-height:1.6">Your secure download is waiting in your BassNotes library.</p>
           <p style="margin-top:24px"><a href="${libraryUrl}" style="display:inline-block;background:#0a3d62;color:#ffffff;padding:12px 28px;border-radius:9999px;text-decoration:none;font-weight:700;font-size:14px;text-transform:uppercase;letter-spacing:0.1em">Go to My Library</a></p>
           <p style="font-size:14px;color:#5c6570;margin-top:20px">Your digital files are stored securely and accessible only from your account.</p>`,
        ),
      });
      try {
        $app.newMailClient().send(message);
      } catch (err) {
        $app.logger().error("digital delivery email failed", "to", email, "err", String(err));
      }
    }
  } catch (err) {
    $app.logger().error("digital purchase hook failed", "err", String(err));
  }
  e.next();
}, "digital_purchases");
