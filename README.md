# Nosh static Netlify site

This version is intentionally dependency-free so Netlify deployment cannot fail because of Node/npm package installation.

## Deploy to Netlify

1. Push this folder to a GitHub repository.
2. Import the repository into Netlify.
3. Leave **Build command** empty.
4. Set **Publish directory** to `.` (the included `netlify.toml` already does this).
5. Deploy.

No environment variables are required.

The site uses only HTML/CSS plus the supplied Nosh assets. The reservation form does not claim online booking; submitting it opens the restaurant phone number for confirmation.
