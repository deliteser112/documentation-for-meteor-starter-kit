import React, { useState, useEffect } from 'react';
// @mui
import { Container } from '@mui/material';
// components
import Page from '../components/Page';
import Markdown from '../components/Markdown';

// components
import TopSection from '../components/TopSection';

// text
import LoginMD from '../texts/login.md';

// ----------------------------------------------------------------------

export default function Login() {
  const [convertText, setConvertText] = useState('')

  // Fetch Terms of Use
	useEffect(() => {
		fetch(LoginMD).then(res => res.text()).then(text => setConvertText(text))
	})
  return (
    <Page title="Login">
      <TopSection title="Accounts" subtitle="Login" description="MST is using Material UI v5.8.0" />
      <Container maxWidth="xl">
        <Markdown children={convertText} />
      </Container>
    </Page>
  );
}
