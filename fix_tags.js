const fs = require('fs');
const path = '/Users/rounakkukreja/Documents/birthday-wish/frontend/src/components/AdminDashboard.jsx';
let content = fs.readFileSync(path, 'utf8');

// Replace "/ formData=" with " formData="
content = content.replace(/\/ formData=/g, " formData=");

// And we need to make sure the tags are closed. The regex $1 included the `/`.
// But wait, the original replace added ` />` at the end!
// So it became: <InputField... / formData=... />
// Which is a syntax error because of the bare `/` in the middle of the tag.
// If I just remove the bare `/ `, it should be fine.

// Let's do a more robust replace:
content = content.replace(/\/ formData=/g, "formData=");

fs.writeFileSync(path, content, 'utf8');
console.log("Fixed tags");
