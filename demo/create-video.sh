#!/bin/bash

# Talocode Skills Demo Video Generator
# Creates a professional terminal-style demo video

OUTPUT="/root/projects/talocode-skills/demo/talocode-skills-demo-v0.1.0.mp4"
TEMP_DIR="/root/projects/talocode-skills/demo/temp"

mkdir -p "$TEMP_DIR"

# Colors
BG="0x0D1117"
PRIMARY="0x58C4DD"
SECONDARY="0x83C167"
ACCENT="0xFFFF00"
TEXT="0xFFFFFF"
DIM="0x8B949E"
GREEN="0x3FB950"
BLUE="0x58A6FF"

FONT="/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FONT_REGULAR="/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"

# Scene 1: Opening (4 seconds)
echo "Creating Scene 1: Opening..."
ffmpeg -y -f lavfi -i "color=c=$BG:s=1920x1080:d=4" \
  -vf "\
drawtext=text='Talocode Skills':fontsize=80:fontcolor=$PRIMARY:x=(w-text_w)/2:y=350:fontfile=$FONT,\
drawtext=text='Reusable AI-agent skills for shipping':fontsize=32:fontcolor=$TEXT:x=(w-text_w)/2:y=480:fontfile=$FONT_REGULAR,\
drawtext=text='open-source tools with discipline.':fontsize=32:fontcolor=$TEXT:x=(w-text_w)/2:y=530:fontfile=$FONT_REGULAR" \
  -c:v libx264 -pix_fmt yuv420p "$TEMP_DIR/scene1.mp4" 2>&1 | tail -3

# Scene 2: Install command (5 seconds)
echo "Creating Scene 2: Install command..."
ffmpeg -y -f lavfi -i "color=c=$BG:s=1920x1080:d=5" \
  -vf "\
drawtext=text='$':fontsize=36:fontcolor=$GREEN:x=400:y=450:fontfile=$FONT_REGULAR,\
drawtext=text='npx skills add talocode/skills':fontsize=36:fontcolor=$TEXT:x=440:y=450:fontfile=$FONT_REGULAR,\
drawtext=text='✓ Installed 4 skills':fontsize=28:fontcolor=$SECONDARY:x=400:y=550:fontfile=$FONT_REGULAR,\
drawtext=text='  talocode-release':fontsize=24:fontcolor=$DIM:x=430:y=600:fontfile=$FONT_REGULAR,\
drawtext=text='  talocode-local-first-cli':fontsize=24:fontcolor=$DIM:x=430:y=640:fontfile=$FONT_REGULAR,\
drawtext=text='  talocode-remotion-demo':fontsize=24:fontcolor=$DIM:x=430:y=680:fontfile=$FONT_REGULAR,\
drawtext=text='  talocode-open-source-positioning':fontsize=24:fontcolor=$DIM:x=430:y=720:fontfile=$FONT_REGULAR" \
  -c:v libx264 -pix_fmt yuv420p "$TEMP_DIR/scene2.mp4" 2>&1 | tail -3

# Scene 3: Skills list (5 seconds)
echo "Creating Scene 3: Skills list..."
ffmpeg -y -f lavfi -i "color=c=$BG:s=1920x1080:d=5" \
  -vf "\
drawtext=text='What gets installed':fontsize=48:fontcolor=$PRIMARY:x=(w-text_w)/2:y=200:fontfile=$FONT,\
drawtext=text='━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━':fontsize=24:fontcolor=$DIM:x=(w-text_w)/2:y=280:fontfile=$FONT_REGULAR,\
drawtext=text='talocode-release':fontsize=32:fontcolor=$ACCENT:x=400:y=350:fontfile=$FONT,\
drawtext=text='Full release discipline for npm packages':fontsize=24:fontcolor=$DIM:x=400:y=400:fontfile=$FONT_REGULAR,\
drawtext=text='talocode-local-first-cli':fontsize=32:fontcolor=$ACCENT:x=400:y=470:fontfile=$FONT,\
drawtext=text='Building local-first open-source CLIs':fontsize=24:fontcolor=$DIM:x=400:y=520:fontfile=$FONT_REGULAR,\
drawtext=text='talocode-remotion-demo':fontsize=32:fontcolor=$ACCENT:x=400:y=590:fontfile=$FONT,\
drawtext=text='Creating release demo videos':fontsize=24:fontcolor=$DIM:x=400:y=640:fontfile=$FONT_REGULAR,\
drawtext=text='talocode-open-source-positioning':fontsize=32:fontcolor=$ACCENT:x=400:y=710:fontfile=$FONT,\
drawtext=text='Messaging and positioning for open-source':fontsize=24:fontcolor=$DIM:x=400:y=760:fontfile=$FONT_REGULAR" \
  -c:v libx264 -pix_fmt yuv420p "$TEMP_DIR/scene3.mp4" 2>&1 | tail -3

# Scene 4: Why it matters (5 seconds)
echo "Creating Scene 4: Why it matters..."
ffmpeg -y -f lavfi -i "color=c=$BG:s=1920x1080:d=5" \
  -vf "\
drawtext=text='Why it matters':fontsize=48:fontcolor=$PRIMARY:x=(w-text_w)/2:y=250:fontfile=$FONT,\
drawtext=text='Give your agents more than tasks.':fontsize=36:fontcolor=$TEXT:x=(w-text_w)/2:y=400:fontfile=$FONT_REGULAR,\
drawtext=text='Give them release discipline,':fontsize=30:fontcolor=$SECONDARY:x=(w-text_w)/2:y=500:fontfile=$FONT_REGULAR,\
drawtext=text='local-first rules, demo standards,':fontsize=30:fontcolor=$SECONDARY:x=(w-text_w)/2:y=550:fontfile=$FONT_REGULAR,\
drawtext=text='and positioning culture.':fontsize=30:fontcolor=$SECONDARY:x=(w-text_w)/2:y=600:fontfile=$FONT_REGULAR" \
  -c:v libx264 -pix_fmt yuv420p "$TEMP_DIR/scene4.mp4" 2>&1 | tail -3

# Scene 5: Specific skill install (5 seconds)
echo "Creating Scene 5: Specific skill install..."
ffmpeg -y -f lavfi -i "color=c=$BG:s=1920x1080:d=5" \
  -vf "\
drawtext=text='$':fontsize=36:fontcolor=$GREEN:x=400:y=350:fontfile=$FONT_REGULAR,\
drawtext=text='npx skills add talocode/skills/talocode-release':fontsize=36:fontcolor=$TEXT:x=440:y=350:fontfile=$FONT_REGULAR,\
drawtext=text='✓ Installed talocode-release':fontsize=28:fontcolor=$SECONDARY:x=400:y=450:fontfile=$FONT_REGULAR,\
drawtext=text='Use it when preparing npm packages,':fontsize=28:fontcolor=$DIM:x=400:y=550:fontfile=$FONT_REGULAR,\
drawtext=text='GitHub releases, changelogs, tags,':fontsize=28:fontcolor=$DIM:x=400:y=600:fontfile=$FONT_REGULAR,\
drawtext=text='demo videos, and announcement checklists.':fontsize=28:fontcolor=$DIM:x=400:y=650:fontfile=$FONT_REGULAR" \
  -c:v libx264 -pix_fmt yuv420p "$TEMP_DIR/scene5.mp4" 2>&1 | tail -3

# Scene 6: Closing (5 seconds)
echo "Creating Scene 6: Closing..."
ffmpeg -y -f lavfi -i "color=c=$BG:s=1920x1080:d=5" \
  -vf "\
drawtext=text='Talocode Skills':fontsize=72:fontcolor=$PRIMARY:x=(w-text_w)/2:y=300:fontfile=$FONT,\
drawtext=text='Ship. Validate. Document. Demo. Release. Announce. Repeat.':fontsize=28:fontcolor=$TEXT:x=(w-text_w)/2:y=420:fontfile=$FONT_REGULAR,\
drawtext=text='github.com/talocode/skills':fontsize=32:fontcolor=$BLUE:x=(w-text_w)/2:y=550:fontfile=$FONT_REGULAR" \
  -c:v libx264 -pix_fmt yuv420p "$TEMP_DIR/scene6.mp4" 2>&1 | tail -3

# Concatenate all scenes
echo "Concatenating scenes..."
cat > "$TEMP_DIR/concat.txt" << EOF
file 'scene1.mp4'
file 'scene2.mp4'
file 'scene3.mp4'
file 'scene4.mp4'
file 'scene5.mp4'
file 'scene6.mp4'
EOF

ffmpeg -y -f concat -safe 0 -i "$TEMP_DIR/concat.txt" -c copy "$TEMP_DIR/video_no_audio.mp4" 2>&1 | tail -3

# Generate simple background tone (440Hz sine wave, very low volume)
echo "Generating background audio..."
ffmpeg -y -f lavfi -i "sine=frequency=440:duration=29" -af "volume=0.03" -c:a aac "$TEMP_DIR/bg_audio.m4a" 2>&1 | tail -3

# Combine video and audio
echo "Combining video and audio..."
ffmpeg -y -i "$TEMP_DIR/video_no_audio.mp4" -i "$TEMP_DIR/bg_audio.m4a" \
  -c:v copy -c:a aac -shortest "$OUTPUT" 2>&1 | tail -3

# Clean up
rm -rf "$TEMP_DIR"

echo "Demo video created: $OUTPUT"
ls -lh "$OUTPUT"
