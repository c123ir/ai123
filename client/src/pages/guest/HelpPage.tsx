import React, { useState } from 'react';
import { TextField } from '@mui/material';

const HelpPage: React.FC = () => {
  const [name, setName] = useState('');

  return (
    <div>
      <TextField
        label="نام و نام خانوادگی"
        variant="outlined"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        InputProps={{
          dir: "rtl"
        }}
      />
    </div>
  );
};

export default HelpPage; 