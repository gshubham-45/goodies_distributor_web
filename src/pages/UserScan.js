import React, { useEffect, useRef, useState } from 'react';
import './UserScan.css';
import { Html5Qrcode } from 'html5-qrcode';
import axios from 'axios';

const UserScan = () => {
  const [gpn, setGpn] = useState('');
  const [scanResult, setScanResult] = useState('');
  const [scanning, setScanning] = useState(false);
  const html5QrCodeRef = useRef(null);
  const scanTimeoutRef = useRef(null);

  const startScanner = async () => {
    setScanResult('');
    setScanning(true);

    const qrRegionId = 'qr-reader';
    const config = { fps: 10, qrbox: 250 };

    const qrCodeScanner = new Html5Qrcode(qrRegionId);
    html5QrCodeRef.current = qrCodeScanner;

    try {
      await qrCodeScanner.start(
        { facingMode: 'environment' },
        config,
        async (decodedText) => {
          clearTimeout(scanTimeoutRef.current);
          await qrCodeScanner.stop();
          setScanning(false);

          setScanResult(`✅ Scanned successfully!
Event ID: ${decodedText}
GPN: ${gpn}
You can collect goodies 🎁`);

          // Send to backend
        //   try {
        //     await axios.post('http://localhost:8080/api/scan', {
        //       eventId: decodedText,
        //       gpn,
        //     });
        //   } catch (err) {
        //     console.error('Backend logging failed', err);
        //     setScanResult('❌ Scan sent to server failed.');
        //   }
        // },
        // (errorMessage) => {
        //   // Ignore decode errors
         }
      );

      // Timeout after 40 seconds
      scanTimeoutRef.current = setTimeout(async () => {
        await qrCodeScanner.stop();
        setScanning(false);
        setScanResult('⏱️ Scan timed out. Please retry.');
      }, 30000);
    } catch (err) {
      console.error('Camera error:', err);
      setScanResult('❌ Unable to start camera. Please allow access.');
      setScanning(false);
    }
  };

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      if (html5QrCodeRef.current) {
        html5QrCodeRef.current.stop().catch(() => {});
      }
      clearTimeout(scanTimeoutRef.current);
    };
  }, []);

  return (
    <div className="user-scan-container">
      <h2>Goodies QR Code Scanner</h2>
      <input
        type="text"
        placeholder="Enter your GPN"
        value={gpn}
        onChange={(e) => setGpn(e.target.value)}
        className="gpn-input"
      />

      <button
        className="start-scan-button"
        onClick={startScanner}
        disabled={!gpn || scanning}
      >
        {scanning ? 'Scanning...' : 'Start Scanner'}
      </button>

      <div id="qr-reader" className="scanner-area" />

      {scanResult && (
        <div className="scan-result">
          {scanResult.split('\n').map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserScan;
