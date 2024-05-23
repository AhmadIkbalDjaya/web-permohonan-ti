import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

export default function Ppl() {
  const { data, setData, post, progress } = useForm({
    name: '',
    avatar: null,
  });

  function submit(e) {
    e.preventDefault();
    post('/users');
  }

  return (
    <>
      <Head title="Ppl" />
      <Typography variant="h4" component="h1" gutterBottom>
        Ppl
      </Typography>
      <Box component="form" onSubmit={submit} sx={{ mt: 2 }}>
        <TextField
          label="Name"
          fullWidth
          variant="outlined"
          value={data.name}
          onChange={(e) => setData('name', e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          component="label"
          sx={{ mb: 2 }}
        >
          Upload Avatar
          <input
            type="file"
            hidden
            onChange={(e) => setData('avatar', e.target.files[0])}
          />
        </Button>
        {progress && (
          <LinearProgress
            variant="determinate"
            value={progress.percentage}
            sx={{ mb: 2 }}
          />
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </Box>
    </>
  );
}
