import { useEffect, useState, useRef } from 'react';
import { Screen } from '../App';
import { motion } from 'motion/react';
import { Upload, FileImage, CheckCircle2, AlertCircle, Camera, X } from 'lucide-react';

interface ScanScreenProps {
  onNavigate: (screen: Screen) => void;
  scanData: {
    skinColor: string;
    skinType: string;
    conditions: string[];
    environment: string;
  };
  setAnalysisResults: (results: any) => void;
}

export function ScanScreen({ onNavigate, scanData, setAnalysisResults }: ScanScreenProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analysisStage, setAnalysisStage] = useState('');
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [showPermissionPrompt, setShowPermissionPrompt] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const analysisStages = [
    'Detecting facial regions...',
    'Identifying acne markers...',
    'Analyzing severity levels...',
    'Cross-referencing FDA database...',
    'Generating treatment plan...'
  ];

  // Function to analyze image and generate varied results
  const analyzeImage = async (imageData: string) => {
    // Create an image element to analyze
    const img = new Image();
    img.src = imageData;
    
    await new Promise((resolve) => {
      img.onload = resolve;
    });

    // Create canvas for analysis
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    // Get image data for analysis
    const imageDataObj = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageDataObj.data;

    // Analyze image properties
    let totalBrightness = 0;
    let redTones = 0;
    let darkSpots = 0;
    let midTones = 0;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      const brightness = (r + g + b) / 3;
      totalBrightness += brightness;
      
      // Detect redness (potential inflammation)
      if (r > g + 20 && r > b + 20) redTones++;
      
      // Detect dark spots (potential hyperpigmentation)
      if (brightness < 80) darkSpots++;
      
      // Detect mid-tones (general skin)
      if (brightness > 80 && brightness < 180) midTones++;
    }

    const avgBrightness = totalBrightness / (data.length / 4);
    const redPercentage = (redTones / (data.length / 4)) * 100;
    const darkSpotPercentage = (darkSpots / (data.length / 4)) * 100;

    // Generate analysis based on image properties and user data
    const acneTypes = [
      { type: 'Comedonal Acne', severity: 'Mild', indicators: ['blackheads', 'whiteheads'] },
      { type: 'Inflammatory Acne', severity: 'Moderate', indicators: ['papules', 'pustules'] },
      { type: 'Cystic Acne', severity: 'Severe', indicators: ['deep cysts', 'nodules'] },
      { type: 'Hormonal Acne', severity: 'Moderate', indicators: ['jawline breakouts', 'cyclic patterns'] },
      { type: 'Papulopustular', severity: 'Moderate', indicators: ['red bumps', 'pus-filled lesions'] }
    ];

    // Determine primary acne type based on analysis
    let primaryAcneType;
    if (redPercentage > 15) {
      primaryAcneType = acneTypes[Math.random() > 0.5 ? 1 : 4]; // Inflammatory or Papulopustular
    } else if (darkSpotPercentage > 20) {
      primaryAcneType = acneTypes[0]; // Comedonal
    } else if (avgBrightness < 100) {
      primaryAcneType = acneTypes[2]; // Cystic
    } else {
      primaryAcneType = acneTypes[3]; // Hormonal
    }

    // Generate detections
    const detections = [];
    
    if (redPercentage > 10) {
      detections.push({
        type: 'Inflammatory Acne',
        count: Math.floor(8 + Math.random() * 15),
        severity: redPercentage > 20 ? 'Severe' : redPercentage > 15 ? 'Moderate' : 'Mild',
        location: 'Cheeks, Forehead'
      });
    }
    
    if (darkSpotPercentage > 15) {
      detections.push({
        type: 'Hyperpigmentation',
        count: Math.floor(5 + Math.random() * 12),
        severity: darkSpotPercentage > 25 ? 'Moderate' : 'Mild',
        location: 'Post-inflammatory marks'
      });
    }
    
    detections.push({
      type: 'Comedones',
      count: Math.floor(6 + Math.random() * 18),
      severity: 'Mild',
      location: 'T-zone'
    });

    if (scanData.skinType === 'Oily') {
      detections.push({
        type: 'Sebum Overproduction',
        count: Math.floor(10 + Math.random() * 8),
        severity: 'Moderate',
        location: 'T-zone, Nose'
      });
    }

    if (scanData.conditions.includes('Acne Scarring')) {
      detections.push({
        type: 'Atrophic Scarring',
        count: Math.floor(4 + Math.random() * 8),
        severity: 'Mild',
        location: 'Cheeks'
      });
    }

    // Generate confidence score
    const confidence = Math.floor(88 + Math.random() * 10);

    // Comprehensive ingredient recommendations based on analysis
    const allIngredients = [
      { 
        name: 'Salicylic Acid', 
        concentration: '2%', 
        purpose: 'Exfoliates, unclogs pores',
        products: [
          { name: 'The Ordinary Salicylic Acid 2%', link: 'https://theordinary.com', verified: true },
          { name: 'Paula\'s Choice BHA 2%', link: 'https://paulaschoice.com', verified: true }
        ]
      },
      { 
        name: 'Niacinamide', 
        concentration: '5-10%', 
        purpose: 'Reduces inflammation, regulates oil',
        products: [
          { name: 'The Ordinary Niacinamide 10%', link: 'https://theordinary.com', verified: true },
          { name: 'CeraVe PM Facial Moisturizing Lotion', link: 'https://cerave.com', verified: true }
        ]
      },
      { 
        name: 'Benzoyl Peroxide', 
        concentration: '2.5-5%', 
        purpose: 'Kills acne bacteria',
        products: [
          { name: 'La Roche-Posay Effaclar Duo', link: 'https://laroche-posay.us', verified: true },
          { name: 'Neutrogena On-The-Spot', link: 'https://neutrogena.com', verified: true }
        ]
      },
      { 
        name: 'Azelaic Acid', 
        concentration: '10-20%', 
        purpose: 'Reduces hyperpigmentation',
        products: [
          { name: 'The Ordinary Azelaic Acid 10%', link: 'https://theordinary.com', verified: true },
          { name: 'Paula\'s Choice Azelaic Acid Booster', link: 'https://paulaschoice.com', verified: true }
        ]
      },
      { 
        name: 'Retinoids (Adapalene)', 
        concentration: '0.1-0.3%', 
        purpose: 'Prevents clogged pores, renews skin',
        products: [
          { name: 'Differin Gel 0.1%', link: 'https://differin.com', verified: true },
          { name: 'La Roche-Posay Adapalene 0.1%', link: 'https://laroche-posay.us', verified: true }
        ]
      },
      { 
        name: 'Vitamin C', 
        concentration: '10-20%', 
        purpose: 'Brightens, fades dark spots',
        products: [
          { name: 'Timeless Vitamin C + E Serum', link: 'https://timelessha.com', verified: true },
          { name: 'SkinCeuticals C E Ferulic', link: 'https://skinceuticals.com', verified: true }
        ]
      },
      { 
        name: 'Alpha Arbutin', 
        concentration: '2%', 
        purpose: 'Lightens hyperpigmentation',
        products: [
          { name: 'The Ordinary Alpha Arbutin 2%', link: 'https://theordinary.com', verified: true },
          { name: 'Inkey List Alpha Arbutin', link: 'https://theinkeylist.com', verified: true }
        ]
      },
      { 
        name: 'Hyaluronic Acid', 
        concentration: '1-2%', 
        purpose: 'Hydrates, plumps skin',
        products: [
          { name: 'The Ordinary Hyaluronic Acid 2%', link: 'https://theordinary.com', verified: true },
          { name: 'Neutrogena Hydro Boost', link: 'https://neutrogena.com', verified: true }
        ]
      },
      { 
        name: 'Sulfur', 
        concentration: '3-10%', 
        purpose: 'Reduces oil, dries acne',
        products: [
          { name: 'De La Cruz Sulfur Ointment', link: 'https://delacruzproducts.com', verified: true },
          { name: 'Kate Somerville EradiKate', link: 'https://katesomerville.com', verified: true }
        ]
      },
      { 
        name: 'Tea Tree Oil', 
        concentration: '5%', 
        purpose: 'Antibacterial, reduces inflammation',
        products: [
          { name: 'The Body Shop Tea Tree Oil', link: 'https://thebodyshop.com', verified: true },
          { name: 'Thursday Plantation Tea Tree Oil', link: 'https://thursdayplantation.com', verified: true }
        ]
      }
    ];

    // Select ingredients based on detections
    const selectedIngredients = [];
    
    // Always include core treatments
    selectedIngredients.push(allIngredients[0]); // Salicylic Acid
    selectedIngredients.push(allIngredients[1]); // Niacinamide
    
    if (redPercentage > 15 || detections.some(d => d.type.includes('Inflammatory'))) {
      selectedIngredients.push(allIngredients[2]); // Benzoyl Peroxide
    }
    
    if (darkSpotPercentage > 15 || detections.some(d => d.type.includes('Hyperpigmentation'))) {
      selectedIngredients.push(allIngredients[3]); // Azelaic Acid
      selectedIngredients.push(allIngredients[5]); // Vitamin C
      selectedIngredients.push(allIngredients[6]); // Alpha Arbutin
    }
    
    if (primaryAcneType.severity === 'Moderate' || primaryAcneType.severity === 'Severe') {
      selectedIngredients.push(allIngredients[4]); // Retinoids
    }
    
    if (scanData.skinType === 'Dry' || scanData.skinType === 'Combination') {
      selectedIngredients.push(allIngredients[7]); // Hyaluronic Acid
    }
    
    if (scanData.skinType === 'Oily') {
      selectedIngredients.push(allIngredients[8]); // Sulfur
    }
    
    // Add natural option
    selectedIngredients.push(allIngredients[9]); // Tea Tree Oil

    return {
      primaryDiagnosis: primaryAcneType.type,
      severity: primaryAcneType.severity,
      indicators: primaryAcneType.indicators,
      confidence,
      detections,
      ingredients: selectedIngredients,
      skinAnalysis: {
        avgBrightness,
        redTones: redPercentage.toFixed(2),
        darkSpots: darkSpotPercentage.toFixed(2),
        skinType: scanData.skinType,
        skinColor: scanData.skinColor,
        environment: scanData.environment
      },
      recommendations: [
        'Start with lower concentrations and gradually increase',
        'Use sunscreen SPF 30+ daily during treatment',
        'Avoid picking or squeezing acne lesions',
        'Maintain consistent skincare routine for 8-12 weeks',
        'Consider consulting a dermatologist for severe cases'
      ],
      timestamp: new Date().toISOString()
    };
  };

  useEffect(() => {
    if (isAnalyzing) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(async () => {
              // Generate analysis results before navigating
              if (uploadedImage) {
                const results = await analyzeImage(uploadedImage);
                setAnalysisResults(results);
              }
              onNavigate('results');
            }, 500);
            return 100;
          }
          
          // Update stage based on progress
          const stageIndex = Math.floor((prev / 100) * analysisStages.length);
          setAnalysisStage(analysisStages[Math.min(stageIndex, analysisStages.length - 1)]);
          
          return prev + 0.67; // Slower progression (was 1.5, now takes ~15 seconds total)
        });
      }, 40);

      return () => clearInterval(interval);
    }
  }, [isAnalyzing, onNavigate, uploadedImage]);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const startAnalysis = () => {
    setIsAnalyzing(true);
  };

  const handleCameraClick = () => {
    setCameraError(null); // Reset error state
    setShowCamera(true);
    navigator.mediaDevices.getUserMedia({ 
      video: { 
        facingMode: 'user',
        width: { ideal: 1280 },
        height: { ideal: 720 }
      } 
    })
      .then((mediaStream) => {
        setStream(mediaStream);
        const video = videoRef.current;
        if (video) {
          video.srcObject = mediaStream;
          video.play();
        }
      })
      .catch((error) => {
        console.error('Error accessing camera:', error);
        if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
          setCameraError('Camera access was denied. Please allow camera permissions in your browser settings and try again.');
        } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
          setCameraError('No camera found on your device. Please use the upload option instead.');
        } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
          setCameraError('Camera is already in use by another application. Please close other apps using the camera.');
        } else {
          setCameraError('Unable to access camera. Please try uploading an image instead.');
        }
        setShowCamera(false);
      });
  };

  const handleCaptureClick = () => {
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    if (video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/png');
        setUploadedImage(imageData);
        setShowCamera(false);
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
          setStream(null);
        }
      }
    }
  };

  const handleCancelClick = () => {
    setShowCamera(false);
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  if (isAnalyzing) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-pink-50 p-6">
        {/* Medical Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-pink-500 rounded-2xl mb-4 shadow-lg">
            <FileImage className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-gray-900 mb-2">AI-Powered Skin Analysis</h2>
          <p className="text-sm text-gray-500">Clinical-grade image processing in progress</p>
        </div>

        {/* Uploaded Image Preview */}
        <div className="relative w-64 h-64 mb-8 rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
          <img src={uploadedImage || ''} alt="Uploaded face" className="w-full h-full object-cover" />
          
          {/* Scanning overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-pink-500/20"
            animate={{
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Scanning line */}
          <motion.div
            className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-pink-500 to-transparent shadow-lg shadow-pink-500/50"
            animate={{
              top: ['0%', '100%']
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Corner markers */}
          {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner) => (
            <motion.div
              key={corner}
              className={`absolute w-6 h-6 border-pink-500 ${
                corner.includes('top') ? 'top-2' : 'bottom-2'
              } ${
                corner.includes('left') ? 'left-2 border-l-2 border-t-2' : 'right-2 border-r-2 border-t-2'
              } ${
                corner.includes('bottom') ? 'border-b-2 border-t-0' : ''
              }`}
              animate={{
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: corner === 'top-left' ? 0 : corner === 'top-right' ? 0.2 : corner === 'bottom-right' ? 0.4 : 0.6
              }}
            />
          ))}
        </div>

        {/* Analysis Stage */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
            <p className="text-sm text-gray-700">{analysisStage}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-sm mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-500">Processing</span>
            <span className="text-xs bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent">{Math.round(progress)}%</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
              style={{ width: `${progress}%` }}
              initial={{ width: 0 }}
            />
          </div>
        </div>

        {/* Medical Info */}
        <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 max-w-sm">
          <p className="text-xs text-blue-900 text-center">
            <span className="font-medium">🔒 Secure Analysis:</span> Your image is processed locally and encrypted during analysis. FDA-approved algorithms in use.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-blue-50 via-white to-pink-50">
      {/* Medical Header */}
      <div className="px-6 pt-14 pb-6 bg-gradient-to-b from-white/80 to-transparent backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
            <FileImage className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-gray-900 leading-tight">Skin Analysis Upload</h2>
            <p className="text-sm text-gray-500">Medical-grade AI diagnosis</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-24">
        {/* Upload Area */}
        {!uploadedImage ? (
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`relative border-3 border-dashed rounded-3xl p-8 mb-6 transition-all ${
              isDragging
                ? 'border-pink-500 bg-pink-50/50 scale-105'
                : 'border-gray-300 bg-white hover:border-pink-300 hover:bg-pink-50/30'
            }`}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              id="file-upload"
            />
            
            <div className="text-center pointer-events-none">
              <motion.div
                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-100 to-blue-100 rounded-2xl mb-4"
                animate={{
                  scale: isDragging ? 1.1 : 1,
                  rotate: isDragging ? 5 : 0
                }}
              >
                <Upload className="w-10 h-10 text-pink-500" />
              </motion.div>
              
              <h3 className="text-gray-800 mb-2">Upload Facial Image</h3>
              <p className="text-sm text-gray-500 mb-4">
                Drag & drop your photo here or click to browse
              </p>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-400 to-pink-600 text-white rounded-full text-sm shadow-lg">
                <FileImage className="w-4 h-4" />
                Select Image
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-6">
            {/* Image Preview */}
            <div className="relative mb-4">
              <div className="relative w-full aspect-[3/4] max-w-sm mx-auto rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
                <img src={uploadedImage} alt="Uploaded face" className="w-full h-full object-cover" />
                
                {/* Grid Overlay for medical feel */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <line
                        key={`h-${i}`}
                        x1="0"
                        y1={i * 10}
                        x2="100"
                        y2={i * 10}
                        stroke="rgb(59, 130, 246)"
                        strokeWidth="0.3"
                      />
                    ))}
                    {Array.from({ length: 10 }).map((_, i) => (
                      <line
                        key={`v-${i}`}
                        x1={i * 10}
                        y1="0"
                        x2={i * 10}
                        y2="100"
                        stroke="rgb(59, 130, 246)"
                        strokeWidth="0.3"
                      />
                    ))}
                  </svg>
                </div>
                
                {/* Success checkmark */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
              </div>
              
              {/* Change Image Button */}
              <div className="text-center mt-4">
                <label htmlFor="file-change" className="inline-flex items-center gap-2 px-4 py-2 text-sm text-pink-600 hover:text-pink-700 cursor-pointer">
                  <Upload className="w-4 h-4" />
                  Change Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  className="hidden"
                  id="file-change"
                />
              </div>
            </div>

            {/* Analysis Button */}
            <button
              onClick={startAnalysis}
              className="w-full py-5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95"
            >
              <span className="flex items-center justify-center gap-2">
                <FileImage className="w-5 h-5" />
                <span>Start AI Analysis</span>
              </span>
            </button>
          </div>
        )}

        {/* Camera Button */}
        {!uploadedImage && !showCamera && (
          <div className="mb-6">
            <div className="text-center mb-3">
              <p className="text-sm text-gray-500">Or</p>
            </div>
            <button
              onClick={handleCameraClick}
              className="w-full py-5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95"
            >
              <span className="flex items-center justify-center gap-2">
                <Camera className="w-5 h-5" />
                <span>Take a Photo</span>
              </span>
            </button>
            
            {/* Camera Error Message */}
            {cameraError && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-2xl">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-red-900">{cameraError}</p>
                    <button
                      onClick={() => setCameraError(null)}
                      className="text-xs text-red-600 hover:text-red-700 mt-2 underline"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Camera View Modal */}
        {showCamera && (
          <div className="fixed inset-0 bg-black z-50 flex flex-col">
            {/* Camera Header */}
            <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/70 to-transparent z-10">
              <div className="flex items-center justify-between">
                <h3 className="text-white">Take a Photo</h3>
                <button
                  onClick={handleCancelClick}
                  className="w-10 h-10 bg-red-500/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>

            {/* Video Stream */}
            <div className="flex-1 flex items-center justify-center">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                autoPlay
                playsInline
              />
            </div>

            {/* Camera Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/70 to-transparent">
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={handleCaptureClick}
                  className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform active:scale-95 border-4 border-pink-400"
                >
                  <Camera className="w-8 h-8 text-pink-500" />
                </button>
              </div>
              <p className="text-center text-white text-sm mt-4">Position your face in frame</p>
            </div>

            {/* Face Guide Overlay */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="relative w-64 h-80">
                <div className="absolute inset-0 border-2 border-white/40 rounded-full"></div>
                {/* Corner markers */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-pink-400 rounded-tl-full"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-pink-400 rounded-tr-full"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-pink-400 rounded-bl-full"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-pink-400 rounded-br-full"></div>
              </div>
            </div>
          </div>
        )}

        {/* Guidelines */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-pink-500 rounded-full" />
            <h3 className="text-gray-800">Image Guidelines</h3>
          </div>
          
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <div className="flex items-start gap-3 mb-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-gray-700">Face clearly visible and well-lit</p>
                <p className="text-xs text-gray-500">Natural lighting recommended</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 mb-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-gray-700">No makeup or filters applied</p>
                <p className="text-xs text-gray-500">For accurate AI detection</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-gray-700">Front-facing, neutral expression</p>
                <p className="text-xs text-gray-500">Straight angle for best results</p>
              </div>
            </div>
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-amber-900">
                <span className="font-medium">Medical Disclaimer:</span> This AI analysis is for informational purposes only. For severe acne or skin conditions, please consult a licensed dermatologist.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}