import { useState } from 'react';
import { useRouter } from 'next/router';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function AddProperty() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    rent: '',
    bedrooms: '',
    bathrooms: '',
  });
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/properties/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert('Property added successfully!');
      router.push('/'); // Redirect to the home page
    } else {
      const errorData = await res.json();
      alert(`Error adding property: ${errorData.error || 'Something went wrong'}`);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add New Property
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            id="name"
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            id="address"
            name="address"
            label="Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            id="rent"
            name="rent"
            label="Rent"
            type="number"
            value={formData.rent}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            id="bedrooms"
            name="bedrooms"
            label="Bedrooms"
            type="number"
            value={formData.bedrooms}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            id="bathrooms"
            name="bathrooms"
            label="Bathrooms"
            type="number"
            value={formData.bathrooms}
            onChange={handleChange}
          />
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" type="submit">
              Add Property
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}