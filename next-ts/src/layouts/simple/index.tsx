import Container from "@mui/material/Container";

import Header from '../common/header-simple';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function SimpleLayout({ children }: Props) {
  return (
    <Container
        sx={{
          pb: 10,
          pt: { xs: 5, md: 5 },
          position: 'relative',
        }}
      >
        {children}
      </Container>
  );
}
