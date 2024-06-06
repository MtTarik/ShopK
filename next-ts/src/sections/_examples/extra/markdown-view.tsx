'use client';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

import { paths } from 'src/routes/paths';

import Markdown from 'src/components/markdown';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ComponentHero from 'src/sections/_examples/component-hero';

// ----------------------------------------------------------------------



const mardownContent = `
import React from 'react';
import { Container, Typography, Button } from '@mui/material';

const MyPage = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h1" gutterBottom>
        Welcome to My Page
      </Typography>
      <Typography variant="body1" paragraph>
        This is a sample page created using MUI (Material-UI).
      </Typography>
      <Button variant="contained" color="primary">
        Click Me
      </Button>
    </Container>
  );
};

export default MyPage;
`;

export default function MarkdownView() {
  return (
    <>
      <ComponentHero>
        <CustomBreadcrumbs
          heading="Markdown"
          links={[{ name: 'Components', href: paths.components }, { name: 'Markdown' }]}
          moreLink={['https://www.npmjs.com/package/react-markdown']}
        />
      </ComponentHero>

      <Container sx={{ my: 10 }}>
        <Stack spacing={3} direction={{ xs: 'column', md: 'row' }}>


          <Card>
            <CardHeader title="Mardown content" sx={{ pb: 3 }} />
            <Divider sx={{ borderStyle: 'dashed' }} />
            <CardContent>
              <Markdown children={mardownContent} />
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </>
  );
}
