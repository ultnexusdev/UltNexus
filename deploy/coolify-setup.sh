#!/bin/bash
TOKEN="2|wH2Cd0YrcyUpdLzyHtX3bGPtBzfHmig3wG7DDA1K6ca2ff95"
API="http://localhost:8000/api/v1"
BACKEND_UUID="salsm9zaorpnjj8j7ltpatz5"
FRONTEND_UUID="bqnwtqq88is3ou6rt8wlmue1"

echo "=== Adding Backend Environment Variables ==="
for pair in \
  "DATABASE_URL|file:./data/dev.db" \
  "TMDB_API_KEY|46e81eba8e29374341acb2fedb03adf6" \
  "TMDB_READ_ACCESS_TOKEN|eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NmU4MWViYThlMjkzNzQzNDFhY2IyZmVkYjAzYWRmNiIsIm5iZiI6MTc4MTgxMzY2Ny42NzM5OTk4LCJzdWIiOiI2YTM0NTFhMzk4MWU1MGEyMjI2YzU4OWIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ZIYBuSELKcw3gBDqtQ7gAOiw1EX6dllM0rn5uQTxgDM" \
  "GOOGLE_BOOKS_API_KEY|AIzaSyDOXpNVVdwDOyzXabd21rgx9r4um8PWy3k" \
  "NODE_ENV|production"; do
  KEY=$(echo "$pair" | cut -d'|' -f1)
  VAL=$(echo "$pair" | cut -d'|' -f2)
  echo "  Adding $KEY..."
  curl -s -X POST \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d "{\"key\":\"$KEY\",\"value\":\"$VAL\",\"is_preview\":false}" \
    "$API/applications/$BACKEND_UUID/envs"
  echo ""
done

echo ""
echo "=== Adding Frontend Environment Variables ==="
echo "  Adding NEXT_PUBLIC_API_URL..."
curl -s -X POST \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d "{\"key\":\"NEXT_PUBLIC_API_URL\",\"value\":\"http://ultnexus-backend:4000/content\",\"is_preview\":false}" \
  "$API/applications/$FRONTEND_UUID/envs"
echo ""

echo ""
echo "=== Setting Domains ==="
echo "  Setting backend domain..."
curl -s -X PATCH \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d "{\"domains\":\"http://api.ultnexus.com\"}" \
  "$API/applications/$BACKEND_UUID"
echo ""

echo "  Setting frontend domain..."
curl -s -X PATCH \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d "{\"domains\":\"http://ultnexus.com,http://www.ultnexus.com\"}" \
  "$API/applications/$FRONTEND_UUID"
echo ""

echo ""
echo "=== ALL DONE ==="
