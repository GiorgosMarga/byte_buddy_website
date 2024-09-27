// components/WaveAnimation.js

export default function WaveAnimation() {
    return (
      <div className="relative flex justify-center items-center min-h-screen bg-gray-100 overflow-hidden">
        <div className="absolute inset-0 bg-red-500 wave-animation" />
        <div className="absolute inset-0 bg-red-300 wave-animation" style={{ animationDelay: '1.5s' }} />
        <div className="absolute inset-0 bg-red-200 wave-animation" style={{ animationDelay: '3s' }} />
      </div>
    );
  }
  