# JobConnect – Online Job Portal

JobConnect is a responsive, beginner-friendly job portal frontend prototype.

## Features that work
- Browse six sample job listings.
- Search by job title, company, category or location.
- Filter by category.
- Open a job details dialog.
- Submit a demo application with a name.
- Prevent duplicate applications for the same listing in the same browser.
- View the application confirmation and status.
- Add a job through the employer form.
- Custom job listings and applications are stored in the browser's localStorage.

## Important limitations
This is a frontend-only demo. It does not include a real backend, user accounts, secure authentication, cloud database, actual resume upload, recruiter accounts, or cross-device application tracking. Demo data is stored only in the current browser. Do not enter sensitive personal information.

## Run locally
No installation is required.

1. Extract the ZIP file.
2. Open `index.html` in a modern browser.

Optional local server:
```bash
python -m http.server 8000
```
Then visit http://localhost:8000

## Deploy
### Netlify
1. Extract the ZIP file.
2. Open https://app.netlify.com/drop
3. Drag the extracted `JobConnect` folder onto the page.
4. Wait for deployment and copy the public website URL.

### GitHub
1. Create a new **Public** repository named `jobconnect`.
2. Upload `index.html`, `styles.css`, `app.js`, and `README.md` to the repository root.
3. Commit the files.

### Vercel
Import the public GitHub repository in Vercel. No build command is required; set the output directory to `.`.

## AI assistance
If AI tools were used while building or modifying this project, disclose them accurately in the challenge submission. Test all features yourself and describe any fixes you personally made.
