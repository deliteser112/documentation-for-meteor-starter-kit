import React, { useState, useEffect } from 'react';
// @mui
import { Container } from '@mui/material';
// components
import Page from '../components/Page';
import Markdown from '../components/Markdown';

// components
import TopSection from '../components/TopSection';

// text
import SignUpMD from '../texts/signup.md';

// ----------------------------------------------------------------------

export default function SignUp() {
  const [convertText, setConvertText] = useState('')

  // Fetch Terms of Use
	useEffect(() => {
		fetch(SignUpMD).then(res => res.text()).then(text => setConvertText(text))
	})
  return (
    <Page title="SignUp">
      <TopSection title="Accounts" subtitle="SignUp" description="MST is using Material UI v5.8.0" />
      <Container maxWidth="xl">
        <Markdown children={convertText} />
      </Container>
    </Page>
  );
}
