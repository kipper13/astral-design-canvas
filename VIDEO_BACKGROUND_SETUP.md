# 🎬 Video Background Setup Guide

Your portfolio now supports professional video backgrounds! Here's how to set them up:

## 📁 Quick Setup

### 1. **Add Your Video Files**
Place your video files in the `public` directory:
```
public/
├── videos/
│   ├── hero-video.mp4      # Main video file
│   ├── hero-video.webm     # WebM version (optional, better compression)
│   └── hero-poster.jpg     # Poster image for loading
└── images/
    └── hero-fallback.jpg   # Fallback image for reduced motion users
```

### 2. **Enable Video Background**
In `src/components/HeroSection.tsx`, change the configuration:

```typescript
const heroConfig: HeroConfig = {
  backgroundType: 'video', // ← Change from 'gradient' to 'video'
  videoAsset: 'hero',      // Uses the video from video-assets.ts
  videoOverlay: 'gradient', // Optional overlay for better text readability
  videoOverlayOpacity: 0.3
};
```

### 3. **Configure Video Assets**
Update `src/utils/video-assets.ts` with your video paths:

```typescript
export const videoAssets = {
  hero: {
    src: '/videos/your-hero-video.mp4',
    webm: '/videos/your-hero-video.webm', // Optional WebM version
    poster: '/images/your-poster.jpg',
    fallback: '/images/your-fallback.jpg'
  }
};
```

## 🎯 Video Specifications

### **Recommended Format**
- **Format**: MP4 (H.264) + WebM (VP9) for best compatibility
- **Resolution**: 1920x1080 for desktop, 1280x720 for mobile
- **Frame Rate**: 24-30 FPS
- **Bitrate**: 2-5 Mbps for 1080p
- **Duration**: 10-30 seconds (loops automatically)
- **File Size**: Under 10MB for web performance

### **Optimization Tips**
1. **Compress your video** for web delivery
2. **Create a poster image** from a good frame
3. **Provide WebM version** for better compression
4. **Keep it short** - looping videos work best
5. **Test on mobile** devices for performance

## 🛠️ Video Optimization Commands

### Using FFmpeg (recommended):

```bash
# Compress video for web
ffmpeg -i input.mp4 -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 128k hero-video.mp4

# Create WebM version
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -b:a 128k -c:a libopus hero-video.webm

# Extract poster frame at 3 seconds
ffmpeg -i hero-video.mp4 -ss 00:00:03.000 -vframes 1 hero-poster.jpg

# Resize to 1920x1080
ffmpeg -i input.mp4 -vf scale=1920:1080 -c:a copy hero-video.mp4
```

## ⚙️ Features & Options

### **Automatic Performance Detection**
The system automatically:
- ✅ Falls back to images for users with reduced motion preferences
- ✅ Detects slow connections and disables video
- ✅ Checks device memory and adjusts accordingly
- ✅ Provides graceful fallbacks for unsupported browsers

### **Customizable Overlays**
```typescript
videoOverlay: 'gradient' | 'dark' | 'light' | 'none'
videoOverlayOpacity: 0.3 // 0 = transparent, 1 = opaque
```

### **Control Options**
```typescript
{
  autoPlay: true,        // Auto-start video
  muted: true,          // Muted by default (required for autoplay)
  loop: true,           // Loop the video
  controls: false,      // Show/hide video controls
  playsInline: true     // Required for mobile
}
```

## 📱 Mobile Considerations

- Videos autoplay muted on mobile (iOS/Android requirement)
- Reduced motion users see fallback images automatically
- Slower connections automatically use image backgrounds
- Touch devices get optimized playback controls

## 🎨 Background Types Available

1. **Video Background**: `backgroundType: 'video'`
2. **Image Background**: `backgroundType: 'image'` 
3. **Gradient Background**: `backgroundType: 'gradient'` (current default)

## 🚀 Going Live

1. Upload your optimized video files to `public/videos/`
2. Add poster and fallback images to `public/images/`
3. Update the configuration in `HeroSection.tsx`
4. Test on different devices and connection speeds
5. Deploy and enjoy your cinematic portfolio!

## 💡 Creative Ideas

- **Coding Animation**: Screen recording of code being typed
- **Design Process**: Time-lapse of your design workflow  
- **Portfolio Showcase**: Smooth transitions between your projects
- **Abstract Motion**: Geometric shapes or particles in motion
- **Brand Video**: Custom animation with your personal branding

---

**Need help?** The video system includes comprehensive error handling, performance optimization, and accessibility features out of the box! 🎉