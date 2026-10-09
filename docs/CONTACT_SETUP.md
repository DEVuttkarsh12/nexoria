# Contact form delivery

The forms on the homepage and pricing page send to `/api/contact`. That Vercel Function validates submissions and sends a plain-text email to `info@zykken.com` through Resend. The visitor's email is set as Reply-To. The browser only shows success after Resend accepts the message; otherwise it keeps the visitor's form data and offers a direct email link.

To activate live delivery:

1. In Resend, verify `zykken.com` as a sending domain using the DNS records it provides. The domain uses Hostinger name servers, so add those records in Hostinger DNS. Keep the existing Hostinger MX records for incoming mail. The domain was verified on September 26, 2026.
2. Create a Resend API key with permission to send email. Add it as `RESEND_API_KEY` in the Vercel project hosting `zykken.com`, for Production (and Preview if desired). Keep the key server-side; do not commit it.
3. Add `RESEND_FROM_EMAIL` in Vercel as `Zykken Website <website@zykken.com>` (or another sender on the verified domain). The destination is fixed in the server code to `info@zykken.com`.
4. Redeploy. Submit one real test from each form and confirm receipt in `info@zykken.com`, including Spam/Junk. Check the Resend delivery log if a message is accepted but not visible in the mailbox.

For local development, copy `.env.example` to `.env.local`, fill in your own key, and run `node --env-file=.env.local scripts/dev-server.cjs`. This starts a loopback-only preview at `http://127.0.0.1:4174/` with the same contact handler. Alternatively, `vercel dev` works after linking the correct Vercel project. Never use a production key in an untrusted environment. Without a key—or without a verified sending domain—the form deliberately reports an error instead of pretending to send.

Run the server-side tests with `node --test tests/contact.test.cjs`.
