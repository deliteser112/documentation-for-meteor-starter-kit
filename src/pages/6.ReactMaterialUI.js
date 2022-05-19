import React, { useState, useEffect } from 'react';
// @mui
import { Container } from '@mui/material';
// components
import Page from '../components/Page';
import Markdown from '../components/Markdown';

// components
import TopSection from '../components/TopSection';

// text
import ReactMaterialUIMD from '../texts/reactMaterialUI.md';

// ----------------------------------------------------------------------

export default function ReactMaterialUI() {
  const [convertText, setConvertText] = useState('')

  // Fetch Terms of Use
	useEffect(() => {
		fetch(ReactMaterialUIMD).then(res => res.text()).then(text => setConvertText(text))
	})
  return (
    <Page title="React Material UI">
      <TopSection title="React" subtitle="React Material UI" description="MST is using React Material UI v5.8.0" />
      <Container maxWidth="xl">
        <Markdown children={convertText} />
      </Container>
    </Page>
  );
}
