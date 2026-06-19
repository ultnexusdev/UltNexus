#!/bin/bash
TOKEN="2|wH2Cd0YrcyUpdLzyHtX3bGPtBzfHmig3wG7DDA1K6ca2ff95"
API="http://localhost:8000/api/v1"
BACKEND_UUID="salsm9zaorpnjj8j7ltpatz5"
FRONTEND_UUID="bqnwtqq88is3ou6rt8wlmue1"

echo "=== Fixing paths ==="
curl -s -X PATCH -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -H "Accept: application/json" -d '{"base_directory":"/backend", "dockerfile_location":"/Dockerfile"}' "$API/applications/$BACKEND_UUID"
echo ""

curl -s -X PATCH -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -H "Accept: application/json" -d '{"base_directory":"/frontend", "dockerfile_location":"/Dockerfile"}' "$API/applications/$FRONTEND_UUID"
echo ""

echo "=== Triggering Deployments ==="
curl -s -X POST -H "Authorization: Bearer $TOKEN" -H "Accept: application/json" "$API/deploy?uuid=$BACKEND_UUID"
echo ""
curl -s -X POST -H "Authorization: Bearer $TOKEN" -H "Accept: application/json" "$API/deploy?uuid=$FRONTEND_UUID"
echo ""
