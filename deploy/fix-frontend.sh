#!/bin/bash
TOKEN="2|wH2Cd0YrcyUpdLzyHtX3bGPtBzfHmig3wG7DDA1K6ca2ff95"
API="http://localhost:8000/api/v1"
FRONTEND_UUID="bqnwtqq88is3ou6rt8wlmue1"

# Get the UUID of the NEXT_PUBLIC_API_URL env var
ENV_JSON=$(curl -s -H "Authorization: Bearer $TOKEN" -H "Accept: application/json" "$API/applications/$FRONTEND_UUID/envs")
ENV_UUID=$(echo "$ENV_JSON" | jq -r '.[] | select(.key=="NEXT_PUBLIC_API_URL") | .uuid' | head -n 1)

echo "Env UUID: $ENV_UUID"

# Update the value
curl -s -X PATCH -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d "{\"value\":\"https://api.ultnexus.com/content\"}" \
  "$API/applications/$FRONTEND_UUID/envs/$ENV_UUID"

# Trigger a redeploy
curl -s -X POST -H "Authorization: Bearer $TOKEN" \
  -H "Accept: application/json" \
  "$API/deploy?uuid=$FRONTEND_UUID"

echo "Deployed!"
