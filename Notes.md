# 🚀 Project Boilerplate Info

This project was originally cloned from a public boilerplate repository.

To start fresh and make it my own project, I removed the original Git history using:

```bash
# In PowerShell
Remove-Item -Recurse -Force .git

# Then reinitialize Git
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
