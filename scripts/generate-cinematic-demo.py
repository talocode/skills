#!/usr/bin/env python3
"""Generate a 60s cinematic Talocode product demo with multi-layer soundtrack + optional VO.

Always:
  - ~60s H.264 MP4
  - AAC audio stream (layered score, never silent)
  - Multi-scene cinematic plates + kinetic captions
"""
from __future__ import annotations

import argparse
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path


def run(cmd: list[str]) -> None:
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        sys.stderr.write(r.stderr or r.stdout or "ffmpeg failed\n")
        raise SystemExit(r.returncode)


def which(name: str) -> str | None:
    return shutil.which(name)


def make_score(path: Path, duration: float = 60.0) -> None:
    """Multi-layer original score: bass + pulse + arpeggio-ish + pink bed."""
    d = f"{duration}"
    # Use separate sine generators + noise; mix to stereo AAC
    run(
        [
            "ffmpeg",
            "-y",
            "-hide_banner",
            "-loglevel",
            "error",
            "-f",
            "lavfi",
            "-i",
            f"sine=frequency=48:duration={d}",
            "-f",
            "lavfi",
            "-i",
            f"sine=frequency=96:duration={d}",
            "-f",
            "lavfi",
            "-i",
            f"sine=frequency=192:duration={d}",
            "-f",
            "lavfi",
            "-i",
            f"sine=frequency=288:duration={d}",
            "-f",
            "lavfi",
            "-i",
            f"sine=frequency=384:duration={d}",
            "-f",
            "lavfi",
            "-i",
            f"anoisesrc=color=pink:amplitude=0.015:duration={d}",
            "-filter_complex",
            # bass drone
            "[0:a]volume=0.18,lowpass=f=100[a0];"
            # sub harmonic pulse via tremolo
            "[1:a]volume=0.12,tremolo=f=1.5:d=0.7,lowpass=f=200[a1];"
            # mid shimmer
            "[2:a]volume=0.07,tremolo=f=0.33:d=0.5,aecho=0.8:0.9:40:0.3[a2];"
            # fifth
            "[3:a]volume=0.05,tremolo=f=5:d=0.35,highpass=f=150[a3];"
            # high sparkle
            "[4:a]volume=0.035,tremolo=f=0.2:d=0.6,highpass=f=300,aecho=0.6:0.7:80:0.2[a4];"
            # atmosphere
            "[5:a]volume=0.35,lowpass=f=1200,highpass=f=80[a5];"
            "[a0][a1][a2][a3][a4][a5]amix=inputs=6:duration=first:dropout_transition=2,"
            "alimiter=limit=0.9,acompressor=threshold=-18dB:ratio=3:attack=20:release=200[aout]",
            "-map",
            "[aout]",
            "-c:a",
            "aac",
            "-b:a",
            "192k",
            str(path),
        ]
    )


def make_vo(path: Path, text: str) -> bool:
    """Optional short voiceover via espeak-ng → wav → aac."""
    espeak = which("espeak-ng") or which("espeak")
    if not espeak:
        return False
    wav = path.with_suffix(".wav")
    subprocess.run(
        [espeak, "-s", "145", "-v", "en-us+m3", "-w", str(wav), text],
        check=False,
        capture_output=True,
    )
    if not wav.exists() or wav.stat().st_size < 100:
        return False
    run(
        [
            "ffmpeg",
            "-y",
            "-hide_banner",
            "-loglevel",
            "error",
            "-i",
            str(wav),
            "-c:a",
            "aac",
            "-b:a",
            "128k",
            str(path),
        ]
    )
    return path.exists()


def scene_from_image(
    image: Path,
    out: Path,
    title: str,
    line: str,
    sub: str,
    duration: float,
    font: str,
    fontb: str,
    zoom_end: float,
) -> None:
    # escape drawtext special chars
    def esc(s: str) -> str:
        return (
            s.replace("\\", "\\\\")
            .replace(":", "\\:")
            .replace("'", "\u2019")
            .replace("%", "\\%")
        )

    t1, t2, t3 = esc(title), esc(line), esc(sub)
    # Ken Burns on still + caption stack
    vf = (
        f"scale=1920:1080:force_original_aspect_ratio=increase,"
        f"crop=1920:1080,"
        f"zoompan=z='min(zoom+0.0008\\,{zoom_end})':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d={int(duration * 25)}:s=1920x1080:fps=25,"
        f"drawbox=x=0:y=0:w=iw:h=ih:color=black@0.35:t=fill,"
        f"drawtext=fontfile={fontb}:text='{t1}':fontcolor=0x7dd3fc:fontsize=70:"
        f"x=(w-text_w)/2:y=h/2-130:borderw=2:bordercolor=black@0.4,"
        f"drawtext=fontfile={font}:text='{t2}':fontcolor=white:fontsize=38:"
        f"x=(w-text_w)/2:y=h/2-20:borderw=2:bordercolor=black@0.5,"
        f"drawtext=fontfile={font}:text='{t3}':fontcolor=0xcbd5e1:fontsize=30:"
        f"x=(w-text_w)/2:y=h/2+50:borderw=1:bordercolor=black@0.4"
    )
    run(
        [
            "ffmpeg",
            "-y",
            "-hide_banner",
            "-loglevel",
            "error",
            "-loop",
            "1",
            "-i",
            str(image),
            "-vf",
            vf,
            "-t",
            str(duration),
            "-c:v",
            "libx264",
            "-pix_fmt",
            "yuv420p",
            "-an",
            str(out),
        ]
    )


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("product")
    ap.add_argument("title")
    ap.add_argument("--hook", default="Agents fail in production.")
    ap.add_argument("--pain", default="No retries. No traces. No gates.")
    ap.add_argument("--act1", default="One product API.")
    ap.add_argument("--act2", default="CLI · SDK · MCP · Cloud")
    ap.add_argument("--proof", default="Open source. Metered cloud.")
    ap.add_argument("--cta", default=None)
    ap.add_argument("--out", default=None)
    ap.add_argument("--plate-a", required=True, help="Cinematic still A (workspace)")
    ap.add_argument("--plate-b", required=True, help="Cinematic still B (abstract)")
    ap.add_argument("--voice", action="store_true", help="Add espeak VO if available")
    args = ap.parse_args()

    product = args.product
    title = args.title
    cta = args.cta or f"npm i @talocode/{product}"
    out = Path(args.out or f"release-assets/{product}-demo.mp4")
    out.parent.mkdir(parents=True, exist_ok=True)

    font = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
    fontb = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
    if not Path(font).exists():
        fonts = list(Path("/usr/share/fonts").rglob("*.ttf"))
        font = fontb = str(fonts[0]) if fonts else font

    plate_a = Path(args.plate_a)
    plate_b = Path(args.plate_b)
    if not plate_a.exists() or not plate_b.exists():
        raise SystemExit("plate images missing")

    with tempfile.TemporaryDirectory(prefix="talocode-cine-") as td:
        td_path = Path(td)
        scenes = [
            (plate_a, title, args.hook, "talocode · agent infrastructure", 1.08),
            (plate_b, "The pain", args.pain, "Builders feel this every day", 1.12),
            (plate_a, "The fix", args.act1, title, 1.1),
            (plate_b, "In practice", args.act2, "CLI · SDK · MCP · Cloud", 1.15),
            (plate_a, "Proof", args.proof, "Open source · metered power", 1.1),
            (plate_b, "Ship it", cta, f"github.com/talocode/{product}", 1.2),
        ]
        clips = []
        for i, (img, t1, t2, t3, z) in enumerate(scenes, 1):
            clip = td_path / f"s{i}.mp4"
            scene_from_image(img, clip, t1, t2, t3, 10.0, font, fontb, z)
            clips.append(clip)

        list_file = td_path / "list.txt"
        list_file.write_text("".join(f"file '{c}'\n" for c in clips))
        video = td_path / "video.mp4"
        run(
            [
                "ffmpeg",
                "-y",
                "-hide_banner",
                "-loglevel",
                "error",
                "-f",
                "concat",
                "-safe",
                "0",
                "-i",
                str(list_file),
                "-c",
                "copy",
                str(video),
            ]
        )

        score = td_path / "score.m4a"
        make_score(score, 60.0)

        vo = td_path / "vo.m4a"
        has_vo = False
        if args.voice:
            has_vo = make_vo(
                vo,
                f"{title}. {args.hook} {args.act1} Install with npm i at talocode slash {product}.",
            )

        # Mix: score full length; VO ducked under for first ~12s if present
        final_audio = td_path / "mix.m4a"
        if has_vo:
            run(
                [
                    "ffmpeg",
                    "-y",
                    "-hide_banner",
                    "-loglevel",
                    "error",
                    "-i",
                    str(score),
                    "-i",
                    str(vo),
                    "-filter_complex",
                    "[1:a]volume=1.1,apad=whole_dur=60[vo];"
                    "[0:a]volume=0.55[sc];"
                    "[sc][vo]amix=inputs=2:duration=first:dropout_transition=2,alimiter=limit=0.92[a]",
                    "-map",
                    "[a]",
                    "-t",
                    "60",
                    "-c:a",
                    "aac",
                    "-b:a",
                    "192k",
                    str(final_audio),
                ]
            )
        else:
            shutil.copy(score, final_audio)

        run(
            [
                "ffmpeg",
                "-y",
                "-hide_banner",
                "-loglevel",
                "error",
                "-i",
                str(video),
                "-i",
                str(final_audio),
                "-c:v",
                "libx264",
                "-pix_fmt",
                "yuv420p",
                "-c:a",
                "aac",
                "-b:a",
                "192k",
                "-shortest",
                "-t",
                "60",
                str(out),
            ]
        )

    # validate
    probe = subprocess.run(
        [
            "ffprobe",
            "-v",
            "error",
            "-show_entries",
            "format=duration",
            "-of",
            "default=nw=1:nk=1",
            str(out),
        ],
        capture_output=True,
        text=True,
    )
    astream = subprocess.run(
        [
            "ffprobe",
            "-v",
            "error",
            "-select_streams",
            "a",
            "-show_entries",
            "stream=codec_name",
            "-of",
            "csv=p=0",
            str(out),
        ],
        capture_output=True,
        text=True,
    )
    print(
        f"Wrote {out} duration={probe.stdout.strip()}s audio={astream.stdout.strip() or 'NONE'} size={out.stat().st_size}"
    )
    if not astream.stdout.strip():
        raise SystemExit("FATAL: no audio stream — demo rejected")


if __name__ == "__main__":
    main()
