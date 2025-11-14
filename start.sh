echo "Starting Sports Connect Full Stack Application..."
echo

echo "Starting Backend Server..."
cd backend && npm run dev &
BACKEND_PID=$!

sleep 3

echo "Starting Frontend Server..."
cd .. && npm run dev:frontend &
FRONTEND_PID=$!

echo
echo "Both servers are starting..."
echo "Backend: http://localhost:3333"
echo "Frontend: http://localhost:8081"
echo " MongoDB Compass: mongodb://localhost:27017/sportsconnect"
echo
echo "Press Ctrl+C to stop all servers"

cleanup() {
    echo
    echo "Shutting down servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit 0
}

trap cleanup SIGINT

wait