@echo off
set PATH=C:\Program Files\Git\cmd;%PATH%
cd /d K:\ULTNEXUS
git add -A
git commit -m "Add comprehensive README with full project vision, 14-phase roadmap, architecture docs, and 28 feature requirements"
git push origin main
