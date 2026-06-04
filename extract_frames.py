#!/usr/bin/env python3
import os
import sys
import glob

def print_help():
    print("Dental Unit Malta - Frame Extractor Utility")
    print("==========================================")
    print("Usage: python extract_frames.py [video_file] [resolution]")
    print("Examples:")
    print("  python extract_frames.py                  <- Auto-detects video and extracts at 1080p")
    print("  python extract_frames.py video.mp4 4k     <- Extracts at 4K resolution (3840x2160)")
    print("  python extract_frames.py video.mp4 1080p  <- Extracts at 1080p resolution (1920x1080)")
    print("")

def main():
    try:
        import cv2
    except ImportError:
        print("[-] Error: OpenCV is required to run this script.")
        print("    Please install it by running: pip install opencv-python")
        sys.exit(1)

    # 1. Resolve arguments
    video_path = None
    resolution_preset = "1080p"

    args = sys.argv[1:]
    if len(args) >= 1:
        if args[0] in ["--help", "-h", "/?"]:
            print_help()
            sys.exit(0)
        video_path = args[0]
    
    if len(args) >= 2:
        resolution_preset = args[1].lower()

    # Auto-detect video if not provided
    if not video_path:
        video_files = glob.glob("*.mp4") + glob.glob("*.mov") + glob.glob("*.avi") + glob.glob("*.mkv")
        if not video_files:
            print("[-] Error: No video files found in the current directory.")
            print("    Please copy your video file (.mp4, .mov, etc.) to this folder or specify it as an argument.")
            print_help()
            sys.exit(1)
        video_path = video_files[0]
        print(f"[+] Auto-detected video file: {video_path}")

    if not os.path.exists(video_path):
        print(f"[-] Error: Video file '{video_path}' does not exist.")
        sys.exit(1)

    # Determine resolution
    # 8K is extremely heavy, so we default to 1080p or 4K.
    width, height = 1920, 1080
    if resolution_preset == "4k":
        width, height = 3840, 2160
    elif resolution_preset == "8k":
        width, height = 7680, 4320
        print("[!] Warning: 8K resolution frames will consume substantial VRAM and could crash web browsers.")
    elif resolution_preset == "720p":
        width, height = 1280, 720

    print(f"[+] Target resolution: {width}x{height} ({resolution_preset})")

    # 2. Open video file
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        print(f"[-] Error: Could not open video file '{video_path}'.")
        sys.exit(1)

    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    duration = total_frames / fps if fps > 0 else 0
    print(f"[+] Video duration: {duration:.2f} seconds | Total video frames: {total_frames}")

    # We need exactly 300 frames
    target_count = 300
    if total_frames < target_count:
        print(f"[!] Warning: Video only has {total_frames} frames, which is less than the requested {target_count}.")
        print("    Frames will be repeated to reach 300.")
        frame_indices = [int(i * total_frames / target_count) for i in range(target_count)]
    else:
        frame_indices = [int(i * (total_frames - 1) / (target_count - 1)) for i in range(target_count)]

    # Create frames directory
    output_dir = os.path.join("public", "frames")
    os.makedirs(output_dir, exist_ok=True)
    print(f"[+] Output directory: {output_dir}")

    print(f"[+] Extracting {target_count} frames...")
    
    for i, idx in enumerate(frame_indices):
        cap.set(cv2.CAP_PROP_POS_FRAMES, idx)
        ret, frame = cap.read()
        if not ret:
            print(f"[-] Failed to read frame at index {idx}")
            continue

        # Resize frame
        resized_frame = cv2.resize(frame, (width, height), interpolation=cv2.INTER_CUBIC)

        # Output filename: ezgif-frame-001.jpg ... ezgif-frame-300.jpg
        frame_number = i + 1
        filename = f"ezgif-frame-{frame_number:03d}.jpg"
        filepath = os.path.join(output_dir, filename)

        # Save with high JPEG quality (85% gives excellent quality without bloated size)
        cv2.imwrite(filepath, resized_frame, [int(cv2.IMWRITE_JPEG_QUALITY), 85])

        # Progress indicator
        if (i + 1) % 30 == 0 or (i + 1) == target_count:
            print(f"    Progress: {i + 1}/{target_count} frames saved...")

    cap.release()
    print("[+] Frame extraction complete! All 300 frames saved successfully.")
    print("    You can now build/preview your project: npm run dev")

if __name__ == "__main__":
    main()
