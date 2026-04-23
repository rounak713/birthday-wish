import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useConfig } from '../hooks/useConfig';
import { Save, RefreshCw, X, Image as ImageIcon, Music, Settings, CheckCircle, Play, Square } from 'lucide-react';
import { useSound } from './SoundContext';

const AdminDashboard = ({ onExit }) => {
  const { config, updateConfig, resetConfig } = useConfig();
  const { playMusic, stopMusic } = useSound();
  const [activeTab, setActiveTab] = useState('general');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isPlayingTest, setIsPlayingTest] = useState(false);

  const [formData, setFormData] = useState({
    // General
    passcodePin: config.passcode?.pin || '',
    passcodeTitle: config.passcode?.title || '',
    welcomeTitle: config.welcome?.title || '',
    trapTitle: config.trap?.title || '',
    
    // Images
    passcodePhoto: config.passcode?.photoUrl || '',
    welcomeImage: config.welcome?.image || '',
    trapImage: config.trap?.image || '',
    cakeImage: config.cake?.image || '',
    hbBg: config.happyBirthday?.backgroundImage || '',
    hbPhoto1: config.happyBirthday?.photo1 || '',
    hbPhoto2: config.happyBirthday?.photo2 || '',
    hbSnoopy: config.happyBirthday?.snoopyImage || '',
    memoryBg: config.memories?.backgroundImage || '',
    
    // Audio
    bgMusic: config.sounds?.backgroundMusic || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const newConfig = JSON.parse(JSON.stringify(config));
    
    if (!newConfig.passcode) newConfig.passcode = {};
    newConfig.passcode.pin = formData.passcodePin;
    newConfig.passcode.title = formData.passcodeTitle;
    
    if (!newConfig.welcome) newConfig.welcome = {};
    newConfig.welcome.title = formData.welcomeTitle;

    if (!newConfig.trap) newConfig.trap = {};
    newConfig.trap.title = formData.trapTitle;

    newConfig.passcode.photoUrl = formData.passcodePhoto;
    newConfig.welcome.image = formData.welcomeImage;
    newConfig.trap.image = formData.trapImage;
    if (!newConfig.cake) newConfig.cake = {};
    newConfig.cake.image = formData.cakeImage;
    
    if (!newConfig.happyBirthday) newConfig.happyBirthday = {};
    newConfig.happyBirthday.backgroundImage = formData.hbBg;
    newConfig.happyBirthday.photo1 = formData.hbPhoto1;
    newConfig.happyBirthday.photo2 = formData.hbPhoto2;
    newConfig.happyBirthday.snoopyImage = formData.hbSnoopy;

    if (!newConfig.memories) newConfig.memories = {};
    newConfig.memories.backgroundImage = formData.memoryBg;

    if (!newConfig.sounds) newConfig.sounds = {};
    newConfig.sounds.backgroundMusic = formData.bgMusic;

    updateConfig(newConfig);
    
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset ALL configurations to the factory defaults?")) {
      resetConfig();
      onExit();
    }
  };

  const handleTestAudio = () => {
    if (isPlayingTest) {
      stopMusic();
      setIsPlayingTest(false);
    } else {
      // Temporarily save to local config to test
      const tempConfig = JSON.parse(JSON.stringify(config));
      if (!tempConfig.sounds) tempConfig.sounds = {};
      tempConfig.sounds.backgroundMusic = formData.bgMusic;
      updateConfig(tempConfig);
      
      playMusic();
      setIsPlayingTest(true);
    }
  };

  const renderTabButton = (id, label, Icon) => (
    <button
      onClick={() => setActiveTab(id)}
      style={{
        flex: 1,
        padding: '12px',
        background: activeTab === id ? 'rgba(255,107,157,0.2)' : 'rgba(255,255,255,0.05)',
        color: activeTab === id ? '#ff6b9d' : 'rgba(255,255,255,0.6)',
        border: `1px solid ${activeTab === id ? 'rgba(255,107,157,0.5)' : 'transparent'}`,
        borderRadius: '12px',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        transition: 'all 0.2s',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      <Icon size={18} />
      <span className="hide-on-mobile">{label}</span>
    </button>
  );

  const InputField = ({ label, name, type = 'text', placeholder }) => (
    <div style={{ marginBottom: '20px' }}>
      <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>{label}</label>
      <input 
        type={type} 
        name={name} 
        value={formData[name]} 
        onChange={handleChange} 
        placeholder={placeholder}
        style={{ 
          width: '100%', 
          padding: '14px 16px', 
          borderRadius: '12px', 
          border: '1px solid rgba(255,255,255,0.1)', 
          background: 'rgba(0,0,0,0.2)',
          color: '#ffffff',
          fontSize: '1rem',
          outline: 'none',
          transition: 'border-color 0.2s',
          fontFamily: "'Inter', sans-serif"
        }} 
        onFocus={(e) => e.target.style.borderColor = '#ff6b9d'}
        onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
      />
    </div>
  );

  const ImageInput = ({ label, name, placeholder }) => (
    <div style={{ marginBottom: '24px', background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
      <label style={{ display: 'block', fontWeight: '600', marginBottom: '12px', color: 'rgba(255,255,255,0.9)', fontSize: '0.9rem' }}>{label}</label>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <input 
            type="text" 
            name={name} 
            value={formData[name]} 
            onChange={handleChange} 
            placeholder={placeholder}
            style={{ 
              width: '100%', 
              padding: '12px 16px', 
              borderRadius: '10px', 
              border: '1px solid rgba(255,255,255,0.1)', 
              background: 'rgba(0,0,0,0.3)',
              color: '#ffffff',
              fontSize: '0.95rem',
              outline: 'none',
              fontFamily: "'Inter', sans-serif"
            }} 
            onFocus={(e) => e.target.style.borderColor = '#c77dff'}
            onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
          />
        </div>
        {formData[name] && (
          <div style={{ 
            width: 46, height: 46, borderRadius: '8px', overflow: 'hidden', 
            background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
          }}>
            <img src={formData[name]} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => e.target.style.display = 'none'} />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(10,6,30,0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <motion.div 
        initial={{ y: 30, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 20, scale: 0.95 }}
        transition={{ type: 'spring', bounce: 0.4 }}
        style={{ 
          width: '100%', 
          maxWidth: '740px', 
          maxHeight: '90vh',
          background: 'linear-gradient(145deg, rgba(30,20,50,0.9), rgba(15,10,25,0.95))', 
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '24px', 
          boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div style={{ padding: '24px 32px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', margin: 0, color: '#ffffff', background: 'linear-gradient(135deg, #ff6b9d, #c77dff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Site Customization</h1>
            <p style={{ margin: '4px 0 0 0', color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', fontFamily: "'Inter', sans-serif" }}>Real-time configuration editor</p>
          </div>
          <button onClick={onExit} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white', transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'} onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}>
            <X size={20} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '12px', padding: '20px 32px', background: 'rgba(0,0,0,0.2)' }}>
          {renderTabButton('general', 'General', Settings)}
          {renderTabButton('images', 'Images', ImageIcon)}
          {renderTabButton('audio', 'Music', Music)}
        </div>

        {/* Scrollable Content */}
        <div style={{ padding: '24px 32px', overflowY: 'auto', flex: 1 }}>
          <AnimatePresence mode="wait">
            {activeTab === 'general' && (
              <motion.div key="general" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
                <h3 style={{ marginBottom: '24px', color: '#ffffff', fontFamily: "'Playfair Display', serif", fontSize: '1.4rem' }}>Text & Passcode</h3>
                
                <InputField label="Secret PIN to Enter Site" name="passcodePin" placeholder="e.g. 1234" />
                <InputField label="Passcode Screen Title" name="passcodeTitle" placeholder="Enter your pin..." />
                <InputField label="Welcome Screen Title" name="welcomeTitle" placeholder="Are you ready?" />
                <InputField label="Trap Screen Title" name="trapTitle" placeholder="HOW DARE YOU!" />
              </motion.div>
            )}

            {activeTab === 'images' && (
              <motion.div key="images" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
                <h3 style={{ marginBottom: '24px', color: '#ffffff', fontFamily: "'Playfair Display', serif", fontSize: '1.4rem' }}>Media Links</h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', marginBottom: '24px', marginTop: '-16px' }}>Paste direct links ending in .jpg or .png</p>
                
                <ImageInput label="Passcode Polaroid Photo" name="passcodePhoto" placeholder="https://..." />
                <ImageInput label="Welcome Screen Bear (Transparent PNG)" name="welcomeImage" placeholder="Leave blank for default" />
                <ImageInput label="Trap Screen Bunny (Transparent PNG)" name="trapImage" placeholder="Leave blank for default" />
                <ImageInput label="Cake Illustration (Transparent PNG)" name="cakeImage" placeholder="Leave blank for default" />
                <ImageInput label="Happy Birthday Screen Background" name="hbBg" placeholder="https://..." />
                <ImageInput label="Happy Birthday Photo 1 (Top Left)" name="hbPhoto1" placeholder="https://..." />
                <ImageInput label="Happy Birthday Photo 2 (Bottom Right)" name="hbPhoto2" placeholder="https://..." />
                <ImageInput label="Snoopy Character Image (Transparent PNG)" name="hbSnoopy" placeholder="Leave blank for default" />
                <ImageInput label="Memory Screen Background (Kiss marks)" name="memoryBg" placeholder="https://..." />
              </motion.div>
            )}

            {activeTab === 'audio' && (
              <motion.div key="audio" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
                <h3 style={{ marginBottom: '24px', color: '#ffffff', fontFamily: "'Playfair Display', serif", fontSize: '1.4rem' }}>Background Music</h3>
                
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '12px', color: 'rgba(255,255,255,0.9)', fontSize: '0.9rem' }}>Music File URL (.mp3)</label>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <input 
                      type="text" 
                      name="bgMusic" 
                      value={formData.bgMusic} 
                      onChange={handleChange} 
                      style={{ flex: 1, padding: '14px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: '#ffffff', fontSize: '1rem', outline: 'none' }} 
                      placeholder="https://..." 
                    />
                    <button 
                      onClick={handleTestAudio}
                      style={{
                        padding: '0 20px', borderRadius: '12px', border: 'none',
                        background: isPlayingTest ? 'rgba(255,71,87,0.2)' : 'rgba(6,214,160,0.2)',
                        color: isPlayingTest ? '#ff4757' : '#06d6a0',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
                        fontWeight: 'bold', transition: 'all 0.2s'
                      }}
                    >
                      {isPlayingTest ? <><Square size={16} fill="currentColor" /> Stop</> : <><Play size={16} fill="currentColor" /> Test</>}
                    </button>
                  </div>
                  <p style={{ margin: '16px 0 0 0', fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>
                    Paste a direct link to an MP3 file. You can test it before saving.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Actions */}
        <div style={{ padding: '24px 32px', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)', display: 'flex', gap: '16px' }}>
          <button 
            onClick={handleSave}
            style={{ 
              flex: 1, padding: '16px', background: showSuccess ? '#06d6a0' : 'linear-gradient(135deg, #ff6b9d, #c77dff)', 
              color: 'white', border: 'none', borderRadius: '12px', fontSize: '1.05rem', 
              fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', 
              justifyContent: 'center', gap: '8px', transition: 'all 0.3s', boxShadow: showSuccess ? '0 8px 20px rgba(6,214,160,0.3)' : '0 8px 20px rgba(255,107,157,0.3)'
            }}
          >
            {showSuccess ? <><CheckCircle size={20} /> Saved successfully!</> : <><Save size={20} /> Save Changes</>}
          </button>
          
          <button 
            onClick={handleReset}
            style={{ 
              padding: '16px 24px', background: 'transparent', color: '#ff4757', 
              border: '1px solid rgba(255,71,87,0.3)', borderRadius: '12px', fontSize: '0.95rem', 
              fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', 
              justifyContent: 'center', gap: '8px', transition: 'all 0.2s'
            }}
            onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,71,87,0.1)'; e.currentTarget.style.borderColor = '#ff4757'; }}
            onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,71,87,0.3)'; }}
            title="Reset to factory defaults"
          >
            <RefreshCw size={18} /> <span className="hide-on-mobile">Reset Defaults</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminDashboard;
