#!/usr/bin/env bash
# Generate a 60s Talocode product demo with multi-layer score.
# Usage: generate-compelling-demo.sh <product> <Title> <hook> <pain> <action1> <action2> <proof> <cta>
set -euo pipefail

PRODUCT="${1:?product slug e.g. retrylane}"
TITLE="${2:?Title e.g. RetryLane}"
HOOK="${3:-Agents fail silently.}"
PAIN="${4:-Retries without policy burn money.}"
ACT1="${5:-Classify. Backoff. Circuit break.}"
ACT2="${6:-One CLI. One API.}"
PROOF="${7:-Deterministic. No LLM required.}"
CTA="${8:-npm i @talocode/${PRODUCT}}"

OUT_DIR="${OUT_DIR:-$(pwd)/release-assets}"
mkdir -p "$OUT_DIR" /tmp/talocode-demo-$$
WORK=/tmp/talocode-demo-$$
FONT="${FONT:-/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf}"
FONTB="${FONTB:-/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf}"
test -f "$FONT" || FONT=$(find /usr/share/fonts -name '*.ttf' 2>/dev/null | head -1)
test -f "$FONTB" || FONTB=$FONT

scene() {
  local n=$1 bg=$2 t1=$3 t2=$4 t3=$5
  ffmpeg -y -hide_banner -loglevel error -f lavfi -i "color=c=${bg}:s=1920x1080:d=10" \
    -vf "drawtext=fontfile=${FONTB}:text='${t1}':fontcolor=0x7dd3fc:fontsize=72:x=(w-text_w)/2:y=h/2-120,\
drawtext=fontfile=${FONT}:text='${t2}':fontcolor=0xf8fafc:fontsize=40:x=(w-text_w)/2:y=h/2,\
drawtext=fontfile=${FONT}:text='${t3}':fontcolor=0x94a3b8:fontsize=32:x=(w-text_w)/2:y=h/2+80" \
    -c:v libx264 -pix_fmt yuv420p -t 10 "$WORK/s${n}.mp4"
}

# 6×10s = 60s storyboard
scene 1 0x0b1220 "$TITLE" "$HOOK" "talocode · agent infrastructure"
scene 2 0x1a0a0a "The pain" "$PAIN" "Builders feel this every day"
scene 3 0x0a1628 "The fix" "$ACT1" "$TITLE"
scene 4 0x0f1f14 "In practice" "$ACT2" "CLI · SDK · MCP · Cloud"
scene 5 0x12101f "Proof" "$PROOF" "Open source · metered cloud"
scene 6 0x0b1220 "Ship it" "$CTA" "github.com/talocode/${PRODUCT}"

printf "file '%s'\n" "$WORK"/s1.mp4 "$WORK"/s2.mp4 "$WORK"/s3.mp4 "$WORK"/s4.mp4 "$WORK"/s5.mp4 "$WORK"/s6.mp4 > "$WORK/list.txt"
ffmpeg -y -hide_banner -loglevel error -f concat -safe 0 -i "$WORK/list.txt" -c copy "$WORK/video.mp4"

# Multi-layer interesting score (60s): bass pad + mid pulse + high shimmer + soft noise bed
ffmpeg -y -hide_banner -loglevel error \
  -f lavfi -i "sine=f=49:d=60" \
  -f lavfi -i "sine=f=98:d=60" \
  -f lavfi -i "sine=f=196:d=60" \
  -f lavfi -i "sine=f=392:d=60" \
  -f lavfi -i "anoisesrc=color=pink:amplitude=0.02:d=60" \
  -filter_complex "\
[0:a]volume=0.16,lowpass=f=140[a0];\
[1:a]volume=0.10,tremolo=f=0.4:d=0.55[a1];\
[2:a]volume=0.06,tremolo=f=3.5:d=0.4,aecho=0.8:0.88:55:0.3[a2];\
[3:a]volume=0.04,highpass=f=250,tremolo=f=0.25:d=0.5[a3];\
[4:a]volume=0.25,lowpass=f=800[a4];\
[a0][a1][a2][a3][a4]amix=inputs=5:duration=first:dropout_transition=0,alimiter=limit=0.88[aout]" \
  -map "[aout]" -c:a aac -b:a 192k "$WORK/score.m4a"

OUT="$OUT_DIR/${PRODUCT}-demo.mp4"
ffmpeg -y -hide_banner -loglevel error -i "$WORK/video.mp4" -i "$WORK/score.m4a" \
  -c:v libx264 -pix_fmt yuv420p -c:a aac -b:a 192k -shortest -t 60 "$OUT"

DUR=$(ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 "$OUT")
HAS_A=$(ffprobe -v error -select_streams a -show_entries stream=codec_type -of csv=p=0 "$OUT" | head -1)
echo "Wrote $OUT duration=${DUR}s audio=${HAS_A}"
rm -rf "$WORK"
