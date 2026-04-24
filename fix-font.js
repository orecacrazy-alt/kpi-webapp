const fs = require('fs');
const file = 'src/components/evaluation/HrInitForm.tsx';
let content = fs.readFileSync(file, 'utf8');

const replacements = {
  'text-\\[11px\\]': 'text-[13px]',
  'text-\\[12px\\]': 'text-sm',
  'text-xs': 'text-sm',
  'text-\\[13px\\]': 'text-[15px]',
  'text-sm': 'text-base',
  'text-\\[15px\\]': 'text-[17px]',
  'text-base': 'text-lg',
  'text-\\[18px\\]': 'text-xl',
  'text-lg': 'text-xl'
};

// Use a combined regex to only replace each match once
const regex = new RegExp(Object.keys(replacements).join('|'), 'g');
content = content.replace(regex, (match) => {
  return replacements[match];
});

fs.writeFileSync(file, content);
console.log("Done");
