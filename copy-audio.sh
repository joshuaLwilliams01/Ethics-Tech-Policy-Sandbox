#!/bin/bash
# Script to copy background-music.mp3 from Downloads to public folder

SOURCE="/Users/cristenwilliams/Downloads/background-music.mp3"
DEST="/Users/cristenwilliams/ethics-lab-p3/public/background-music.mp3"

# Create public folder if it doesn't exist
mkdir -p "$(dirname "$DEST")"

# Check if source file exists
if [ ! -f "$SOURCE" ]; then
  echo "Error: File not found at $SOURCE"
  echo "Please check the file name and location."
  exit 1
fi

# Copy the file
cp "$SOURCE" "$DEST"

# Verify copy
if [ -f "$DEST" ]; then
  echo "✓ Successfully copied background-music.mp3"
  echo "  From: $SOURCE"
  echo "  To:   $DEST"
  ls -lh "$DEST"
else
  echo "✗ Failed to copy file"
  exit 1
fi

