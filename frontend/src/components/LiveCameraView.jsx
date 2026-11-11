import { useState, useRef, useEffect } from "react";
import { Camera, Users, CheckCircle2, VideoOff, Power } from "lucide-react";

export default function LiveCameraView() {
  const [isCameraStarted, setIsCameraStarted] = useState(false);
  const [error, setError] = useState("");
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [occupancy, setOccupancy] = useState(0);

  // Ye useEffect tab chalega jab camera start hoga aur stream aayegi
  useEffect(() => {
    if (isCameraStarted && videoRef.current && streamRef.current) {
      const video = videoRef.current;
      video.srcObject = streamRef.current;
      video.setAttribute("playsinline", "true");
      
      // Mobile browsers mein video play karne ka sahi tarika
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Video play failed:", error);
        });
      }
    }
  }, [isCameraStarted]);

  const startCamera = async () => {
    setError("");
    
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError("Your browser does not support camera access or you are not on HTTPS.");
      return;
    }

    try {
      // Camera stream request karo
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user" } 
      });
      
      streamRef.current = stream;
      setIsCameraStarted(true);
      
      // Simulated AI count (0 to 3)
      setInterval(() => {
        setOccupancy(Math.floor(Math.random() * 3));
      }, 5000);

    } catch (err) {
      console.error("Camera Error:", err);
      setError(`Camera Error: ${err.message}. Please allow permissions.`);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setIsCameraStarted(false);
    setOccupancy(0);
  };

  const isOccupied = occupancy > 0;

  return (
    <div className="ai-detector-card" style={{ marginTop: 30, padding: "30px" }}>
      
      <div className="ai-header" style={{ marginBottom: "20px" }}>
        <div className="ai-title" style={{ fontSize: "20px" }}>
          <Camera size={24} className="ai-icon-pulse" />
          <span>Camera Feed & Detection</span>
        </div>
        
        {isCameraStarted && (
          <button onClick={stopCamera} style={{ background: "#DC2626", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "8px", fontWeight: "700", cursor: "pointer", display: "flex", gap: "6px", alignItems: "center" }}>
            <Power size={16} /> Turn Off Camera
          </button>
        )}
      </div>

      {error && (
        <div style={{ background: "#FEE2E2", color: "#DC2626", padding: "12px", borderRadius: "8px", marginBottom: "20px", fontWeight: "600" }}>
          {error}
        </div>
      )}

      {!isCameraStarted ? (
        <div style={{ textAlign: "center", padding: "80px 20px", background: "rgba(0,0,0,0.2)", borderRadius: "16px" }}>
          <VideoOff size={64} style={{ opacity: 0.5, marginBottom: "20px", margin: "0 auto" }} />
          <h3 style={{ fontSize: "24px", marginBottom: "10px", color: "#fff" }}>Camera is Offline</h3>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.7)", marginBottom: "30px" }}>
            Click below to allow your device camera.
          </p>
          <button onClick={startCamera} style={{ background: "#16A34A", color: "#fff", border: "none", padding: "16px 40px", borderRadius: "12px", fontSize: "18px", fontWeight: "800", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "10px", boxShadow: "0 4px 15px rgba(22, 163, 74, 0.4)" }}>
            <Power size={22} /> Turn On Camera
          </button>
        </div>
      ) : (
        <div className="camera-split-layout">
          
          <div className="camera-video-wrapper">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted 
              style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scaleX(-1)" }}
            />
          </div>

          <div className="camera-status-panel">
            <div style={{ marginBottom: "20px" }}>
              <span className={`status-pill ${isOccupied ? 'red' : 'green'} big`} style={{ fontSize: "14px", padding: "6px 14px" }}>
                <span className="dot"></span>
                {isOccupied ? 'Occupied' : 'Available'}
              </span>
            </div>

            <h3 style={{ fontSize: "28px", color: "#fff", marginBottom: "10px", lineHeight: "1.2" }}>
              {isOccupied ? "Room is Occupied" : "Room is Empty"}
            </h3>
            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.7)", marginBottom: "30px" }}>
              {isOccupied ? "People detected in the room." : "No people detected. Room is available."}
            </p>

            <div style={{ marginTop: "auto" }}>
              <div style={{ background: "#fff", padding: "20px", borderRadius: "14px", display: "flex", alignItems: "center", gap: "16px" }}>
                {isOccupied ? <Users size={40} color="#DC2626" /> : <CheckCircle2 size={40} color="#16A34A" />}
                <div>
                  <div style={{ fontSize: "32px", fontWeight: "800", color: isOccupied ? "#DC2626" : "#16A34A", lineHeight: "1" }}>
                    {occupancy}
                  </div>
                  <div style={{ fontSize: "13px", fontWeight: "700", color: "#64748B", textTransform: "uppercase", marginTop: "4px" }}>
                    People Detected
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}