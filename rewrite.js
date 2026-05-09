const fs = require('fs');

const path = '/Users/rounakkukreja/Documents/birthday-wish/frontend/src/components/AdminDashboard.jsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Move components out
const componentsRegex = /  const renderTabButton = \(\[...\].*?const ImageInput =.*?  \);\n/s;
// actually I'll just extract them manually
let newContent = content.replace(
  "const AdminDashboard = ({ onExit }) => {",
`const TabButton = ({ activeTab, setActiveTab, id, label, Icon }) => (
  <button
    onClick={() => setActiveTab(id)}
    style={{
      flex: 1,
      padding: '12px',
      background: activeTab === id ? 'rgba(255,107,157,0.2)' : 'rgba(255,255,255,0.05)',
      color: activeTab === id ? '#ff6b9d' : 'rgba(255,255,255,0.6)',
      border: \`1px solid \${activeTab === id ? 'rgba(255,107,157,0.5)' : 'transparent'}\`,
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

const InputField = ({ label, name, type = 'text', placeholder, formData, handleChange }) => (
  <div style={{ marginBottom: '20px' }}>
    <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>{label}</label>
    <input 
      type={type} 
      name={name} 
      value={formData[name] || ''} 
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

const ImageInput = ({ label, name, placeholder, formData, handleChange, setFormData }) => (
  <div 
    onDragOver={(e) => { e.preventDefault(); e.currentTarget.style.borderColor = '#c77dff'; e.currentTarget.style.background = 'rgba(199, 125, 255, 0.1)'; }}
    onDragLeave={(e) => { e.preventDefault(); e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
    onDrop={(e) => {
      e.preventDefault();
      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
      e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
      const file = e.dataTransfer.files[0];
      if (file) {
        compressImage(file, (dataUrl) => {
          setFormData(prev => ({ ...prev, [name]: dataUrl }));
        });
      }
    }}
    style={{ marginBottom: '24px', background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', transition: 'all 0.3s' }}
  >
    <label style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '600', marginBottom: '12px', color: 'rgba(255,255,255,0.9)', fontSize: '0.9rem' }}>
      <span>{label}</span>
      <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', fontWeight: 'normal' }}>Drag & Drop file</span>
    </label>
    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
      <div style={{ flex: 1, position: 'relative' }}>
        <input 
          type="text" 
          name={name} 
          value={formData[name] || ''} 
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

const AdminDashboard = ({ onExit }) => {`
);

// Delete the old declarations
const startIdx = newContent.indexOf('  const renderTabButton = (id, label, Icon) => (');
const endIdx = newContent.indexOf('  return (');
if (startIdx !== -1 && endIdx !== -1) {
  newContent = newContent.substring(0, startIdx) + newContent.substring(endIdx);
}

// Update the tab buttons
newContent = newContent.replace(
  /\{renderTabButton\('general', 'Titles', Settings\)\}/,
  '<TabButton activeTab={activeTab} setActiveTab={setActiveTab} id="general" label="Titles" Icon={Settings} />'
);
newContent = newContent.replace(
  /\{renderTabButton\('messages', 'All Text', MessageSquare\)\}/,
  '<TabButton activeTab={activeTab} setActiveTab={setActiveTab} id="messages" label="All Text" Icon={MessageSquare} />'
);
newContent = newContent.replace(
  /\{renderTabButton\('images', 'Images', ImageIcon\)\}/,
  '<TabButton activeTab={activeTab} setActiveTab={setActiveTab} id="images" label="Images" Icon={ImageIcon} />'
);
newContent = newContent.replace(
  /\{renderTabButton\('audio', 'Music', Music\)\}/,
  '<TabButton activeTab={activeTab} setActiveTab={setActiveTab} id="audio" label="Music" Icon={Music} />'
);

// Add minHeight to scrollable content
newContent = newContent.replace(
  /overflowY: 'auto', flex: 1 \}\}>/,
  "overflowY: 'auto', flex: 1, minHeight: '500px' }}>"
);

// Add transition to motion.divs
newContent = newContent.replace(
  /exit=\{\{ opacity: 0, x: 10 \}\}/g,
  "exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.15 }}"
);

// Append formData, handleChange, setFormData to InputField and ImageInput
newContent = newContent.replace(
  /<InputField([^>]+)>/g,
  "<InputField$1 formData={formData} handleChange={handleChange} />"
);
newContent = newContent.replace(
  /<ImageInput([^>]+)>/g,
  "<ImageInput$1 formData={formData} handleChange={handleChange} setFormData={setFormData} />"
);

fs.writeFileSync(path, newContent, 'utf8');
console.log("Done");
