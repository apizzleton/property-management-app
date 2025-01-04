import { useState, useEffect } from 'react';
import Link from 'next/link';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function Home() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const res = await fetch('/api/properties');
      const data = await res.json();
      setProperties(data);
    };
    fetchProperties();
  }, []);

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Property List
        </Typography>
        <Button variant="contained" color="primary" component={Link} href="/add-property">
          Add New Property
        </Button>
        {properties.length === 0 ? (
          <Typography variant="body1">No properties found.</Typography>
        ) : (
          <List>
            {properties.map((property) => (
              <ListItem key={property.id} divider>
                <ListItemText
                  primary={property.name}
                  secondary={`${property.address}${property.rent ? ` - Rent: $${property.rent}` : ''}`}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Container>
  );
}