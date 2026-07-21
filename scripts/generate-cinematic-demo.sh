#!/usr/bin/env bash
# 60s cinematic product demo with layered AAC soundtrack (never silent).
# Usage: generate-cinematic-demo.sh PRODUCT TITLE HOOK PAIN ACT1 ACT2 PROOF [CTA]
set -euo pipefail

PRODUCT="${1:?}"
TITLE="${2:?}"
HOOK="${3:-Agents fail in production.}"
PAIN="${4:-No reliability layer.}"
ACT1="${5:-One product API.}"
ACT2="${6:-CLI SDK MCP Cloud}"
PROOF="${7:-Open source. Metered cloud.}"
CTA="${8:-npm i @talocode/${PRODUCT}}"

OUT_DIR="${OUT_DIR:-$(pwd)/release-assets}"
mkdir -p "$OUT_DIR"
WORK=$(mktemp -d /tmp/talocode-demo-XXXXXX)
trap 'rm -rf "$WORK"' EXIT

PLATE_A="${PLATE_A:-/workspace/projects/talocode-skills/assets/demo-plates/workspace.jpg}"
PLATE_B="${PLATE_B:-/workspace/projects/talocode-skills/assets/demo-plates/abstract.jpg}"
FONT="${FONT:-/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf}"
FONTB="${FONTB:-/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf}"
test -f "$FONT" || FONT=$(find /usr/share/fonts -name '*.ttf' 2>/dev/null | head -1)
test -f "$FONTB" || FONTB=$FONT

# escape single quotes for drawtext
esc() { printf '%s' "$1" | sed "s/'/'\\\\\\''/g"; }

scene() {
  local n=$1 img=$2 t1=$3 t2=$4 t3=$5
  local e1 e2 e3
  e1=$(esc "$t1"); e2=$(esc "$t2"); e3=$(esc "$t3")
  # 10s @ 24fps, gentle zoom, dark overlay + captions
  ffmpeg -y -hide_banner -loglevel error -loop 1 -i "$img" \
    -vf "scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,\
zoompan=z='min(1.0+0.0006*on,1.12)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=240:s=1280x720:fps=24,\
drawbox=x=0:y=ih-220:w=iw:h=220:color=black@0.55:t=fill,\
drawtext=fontfile=${FONTB}:text='${e1}':fontcolor=0x7dd3fc:fontsize=42:x=48:y=h-190:borderw=1:bordercolor=black@0.6,\
drawtext=fontfile=${FONT}:text='${e2}':fontcolor=white:fontsize=28:x=48:y=h-130:borderw=1:bordercolor=black@0.6,\
drawtext=fontfile=${FONT}:text='${e3}':fontcolor=0x94a3b8:fontsize=22:x=48:y=h-80:borderw=1:bordercolor=black@0.5" \
    -t 10 -c:v libx264 -pix_fmt yuv420p -an "$WORK/s${n}.mp4"
}

scene 1 "$PLATE_A" "$TITLE" "$HOOK" "talocode · agent infrastructure"
scene 2 "$PLATE_B" "The pain" "$PAIN" "Builders feel this every day"
scene 3 "$PLATE_A" "The fix" "$ACT1" "$TITLE"
scene 4 "$PLATE_B" "In practice" "$ACT2" "CLI · SDK · MCP · Cloud"
scene 5 "$PLATE_A" "Proof" "$PROOF" "Open source · metered power"
scene 6 "$PLATE_B" "Ship it" "$CTA" "github.com/talocode/${PRODUCT}"

printf "file '%s'\n" "$WORK"/s{1,2,3,4,5,6}.mp4 > "$WORK/list.txt"
ffmpeg -y -hide_banner -loglevel error -f concat -safe 0 -i "$WORK/list.txt" -c copy "$WORK/video.mp4"

# Layered 60s score: bass + pulse + mid + high + pink bed
ffmpeg -y -hide_banner -loglevel error \
  -f lavfi -i "sine=f=49:d=60" \
  -f lavfi -i "sine=f=98:d=60" \
  -f lavfi -i "sine=f=196:d=60" \
  -f lavfi -i "sine=f=294:d=60" \
  -f lavfi -i "sine=f=392:d=60" \
  -f lavfi -i "anoisesrc=color=pink:amplitude=0.018:d=60" \
  -filter_complex "\
[0:a]volume=0.17,lowpass=f=120[a0];\
[1:a]volume=0.11,tremolo=f=1.2:d=0.65,lowpass=f=220[a1];\
[2:a]volume=0.07,tremolo=f=0.4:d=0.5,aecho=0.8:0.88:50:0.28[a2];\
[3:a]volume=0.05,tremolo=f=3.2:d=0.4,highpass=f=180[a3];\
[4:a]volume=0.04,highpass=f=280,tremolo=f=0.22:d=0.55[a4];\
[5:a]volume=0.28,lowpass=f=900,highpass=f=60[a5];\
[a0][a1][a2][a3][a4][a5]amix=inputs=6:duration=first:dropout_transition=2,alimiter=limit=0.88[aout]" \
  -map "[aout]" -c:a aac -b:a 192k "$WORK/score.m4a"

# Optional VO if espeak present
VO_ARGS=()
if command -v espeak-ng >/dev/null 2>&1 || command -v espeak >/dev/null 2>&1; then
  ESP=$(command -v espeak-ng || command -v espeak)
  "$ESP" -s 140 -v en-us+m3 -w "$WORK/vo.wav" \
    "${TITLE}. ${HOOK} ${ACT1}. Install with npm i at talocode slash ${PRODUCT}." 2>/dev/null || true
  if [ -f "$WORK/vo.wav" ] && [ -s "$WORK/vo.wav" ]; then
    ffmpeg -y -hide_banner -loglevel error -i "$WORK/score.m4a" -i "$WORK/vo.wav" \
      -filter_complex "[1:a]volume=1.05,apad=whole_dur=60[vo];[0:a]volume=0.5[sc];[sc][vo]amix=inputs=2:duration=first,alimiter=limit=0.9[a]" \
      -map "[a]" -t 60 -c:a aac -b:a 192k "$WORK/mix.m4a"
  else
    cp "$WORK/score.m4a" "$WORK/mix.m4a"
  fi
else
  cp "$WORK/score.m4a" "$WORK/mix.m4a"
fi

OUT="$OUT_DIR/${PRODUCT}-demo.mp4"
ffmpeg -y -hide_banner -loglevel error -i "$WORK/video.mp4" -i "$WORK/mix.m4a" \
  -c:v libx264 -pix_fmt yuv420p -c:a aac -b:a 192k -shortest -t 60 "$OUT"

DUR=$(ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 "$OUT")
AUD=$(ffprobe -v error -select_streams a -show_entries stream=codec_name -of csv=p=0 "$OUT" | head -1)
echo "Wrote $OUT duration=${DUR}s audio=${AUD:-NONE} size=$(stat -c%s "$OUT")"
if [ -z "${AUD:-}" ]; then
  echo "FATAL: missing audio track" >&2
  exit 2
fi
