#!/bin/bash

# ==============================
# 🚀 Unified Runner for Flask + React App (Auto Cleanup Version)
# ==============================

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🔍 Checking backend database...${NC}"

# Navigate to backend directory
cd backend

# Ensure DB folder exists
mkdir -p db

# Initialize DB if not exists
if [ ! -f "db/database.db" ]; then
    echo -e "${YELLOW}🧱 Database not found — initializing...${NC}"
    python init_db.py
else
    echo -e "${GREEN}✅ Database already exists.${NC}"
fi

# Stop any existing Flask backend running on port 5000
if lsof -i :5000 >/dev/null 2>&1; then
    echo -e "${YELLOW}🛑 Stopping old Flask backend on port 5000...${NC}"
    pkill -f app.py 2>/dev/null
    sleep 2
fi

# ✅ Launch Flask in a new Terminal tab and remember its PID
echo -e "${YELLOW}🚀 Starting Flask backend in new terminal tab...${NC}"
osascript <<EOF
tell application "Terminal"
    set newTab to do script "cd '$(pwd)'; source ~/.zshrc; python app.py"
    delay 2
    set customTitle to "Flask Backend"
    set customTitle of front window to customTitle
end tell
EOF

# Give Flask a few seconds to start
sleep 4

# Go back to project root
cd ..

# ✅ Start React frontend
echo -e "${YELLOW}🚀 Starting React frontend...${NC}"
cd frontend

# When React exits, automatically stop Flask
trap 'echo -e "${YELLOW}\n🛑 Stopping Flask backend...${NC}"; pkill -f app.py; echo -e "${GREEN}✅ Flask backend stopped. You can close its tab now.${NC}"' EXIT

npm start
