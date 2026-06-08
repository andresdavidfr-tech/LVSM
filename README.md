<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/33da0998-4df1-4221-84ca-c16ae2370d6b

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Image storage (Amazon S3)

Product images are served from a public S3 bucket with a fallback URL per image.
Setup steps (bucket policy, key structure, env vars): see
[docs/IMAGE_STORAGE.md](docs/IMAGE_STORAGE.md).
