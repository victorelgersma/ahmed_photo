#!/bin/bash

input="$1"

if [ -z "$input" ]; then
  echo "Usage: $0 input.jpg"
  exit 1
fi

if [ ! -f "$input" ]; then
  echo "File not found: $input"
  exit 1
fi

# Extract extension & base
ext="${input##*.}"

# Create date + hash filename
date=$(date +"%Y-%m-%d")
hash=$(openssl rand -hex 3)  # 6 hex chars
output="${date}-${hash}.webp"

# Convert to WebP (quality 90, adjust if you want)
cwebp -q 90 "$input" -o "$output"

echo "Created: $output"
