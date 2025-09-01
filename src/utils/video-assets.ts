// Video optimization utilities for better performance

export interface VideoAsset {
  src: string;
  poster?: string;
  webm?: string;
  fallback?: string;
  size?: 'small' | 'medium' | 'large';
  quality?: 'low' | 'medium' | 'high';
}

// Predefined video assets - Your video configuration
export const videoAssets: Record<string, VideoAsset> = {
  hero: {
    src: '/videos/hero-video-assets.mp4', // Updated to match actual filename
    poster: '/images/hero-poster.jpg', // Optional: Add a poster image
    fallback: '/images/hero-fallback.jpg', // Optional: Add a fallback image
    size: 'large',
    quality: 'high'
  },
  // Add more video assets as needed
  portfolio: {
    src: '/videos/portfolio-demo.mp4',
    webm: '/videos/portfolio-demo.webm', 
    poster: '/images/portfolio-poster.jpg',
    fallback: '/images/portfolio-fallback.jpg',
    size: 'medium',
    quality: 'medium'
  }
};

// Video optimization recommendations
export const videoOptimizationTips = {
  format: {
    recommended: ['MP4 (H.264)', 'WebM (VP9)'],
    notes: 'MP4 for compatibility, WebM for better compression'
  },
  resolution: {
    mobile: '720p (1280x720)',
    desktop: '1080p (1920x1080)',
    notes: 'Use responsive video sources for different screen sizes'
  },
  compression: {
    bitrate: '2-5 Mbps for 1080p',
    fps: '24-30 fps',
    notes: 'Balance quality vs file size'
  },
  optimization: [
    'Use a poster image for faster initial load',
    'Compress videos using tools like FFmpeg',
    'Provide WebM alternative for modern browsers',
    'Keep videos under 10MB for web use',
    'Use preload="metadata" for faster page loads'
  ]
};

// Utility function to get optimized video sources
export const getVideoSources = (assetKey: string): VideoAsset | null => {
  return videoAssets[assetKey] || null;
};

// Utility to check if video is supported
export const isVideoSupported = (): boolean => {
  const video = document.createElement('video');
  return !!(video.canPlayType && 
    (video.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/no/, '') ||
     video.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/no/, '')));
};

// Performance check for video backgrounds
export const shouldUseVideoBackground = (): boolean => {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return false;

  // Check connection speed (if supported)
  const connection = (navigator as any).connection;
  if (connection) {
    const slowConnections = ['slow-2g', '2g', '3g'];
    if (slowConnections.includes(connection.effectiveType)) return false;
    
    // If data saver is enabled
    if (connection.saveData) return false;
  }

  // Check device memory (if supported)
  const deviceMemory = (navigator as any).deviceMemory;
  if (deviceMemory && deviceMemory < 4) return false; // Less than 4GB RAM

  return isVideoSupported();
};

// FFmpeg command examples for video optimization
export const ffmpegCommands = {
  compress: `
    # Compress video for web use
    ffmpeg -i input.mp4 -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 128k output.mp4
  `,
  webm: `
    # Convert to WebM format
    ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -b:a 128k -c:a libopus output.webm
  `,
  poster: `
    # Extract poster frame at 5 seconds
    ffmpeg -i input.mp4 -ss 00:00:05.000 -vframes 1 poster.jpg
  `,
  resize: `
    # Resize video to 1920x1080
    ffmpeg -i input.mp4 -vf scale=1920:1080 -c:a copy output.mp4
  `
};