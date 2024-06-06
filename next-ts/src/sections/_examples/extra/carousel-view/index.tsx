'use client';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import CardContent from '@mui/material/CardContent';

import { _mock } from 'src/_mock';

import CarouselAnimation from './carousel-animation';


// ----------------------------------------------------------------------

const _carouselsExample = [...Array(20)].map((_, index) => ({
  id: _mock.id(index),
  title: _mock.postTitle(index),
  coverUrl: _mock.image.cover(index),
  description: _mock.description(index),
}));


export default function CarouselView() {
  return (
      <Container>
        <Stack spacing={1}>
          <Card>
            <CardContent>
              <CarouselAnimation data={_carouselsExample.slice(5, 10)} />
            </CardContent>
          </Card>
        </Stack>
      </Container>
  );
}
