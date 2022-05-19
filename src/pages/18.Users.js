import React, { useState, useEffect } from 'react';
// @mui
import { Container } from '@mui/material';
// components
import Page from '../components/Page';
import Markdown from '../components/Markdown';

// components
import TopSection from '../components/TopSection';

// text
import UsersMD from '../texts/users.md';

// ----------------------------------------------------------------------

export default function Users() {
  const [convertText, setConvertText] = useState('')

  // Fetch Terms of Use
	useEffect(() => {
		fetch(UsersMD).then(res => res.text()).then(text => setConvertText(text))
	})
  return (
    <Page title="Users">
      <TopSection title="Admin" subtitle="Users" description="MST is using Material UI v5.8.0" />
      <Container maxWidth="xl">
        <Markdown children={convertText} />
      </Container>
    </Page>
  );
}
