import React, { useState, useEffect } from 'react';
// @mui
import { Container } from '@mui/material';
// components
import Page from '../components/Page';
import Markdown from '../components/Markdown';

// components
import TopSection from '../components/TopSection';

// text
import DefiningSchemaMD from '../texts/definingSchema.md';

// ----------------------------------------------------------------------

export default function CreatingGraphQL() {
  const [convertText, setConvertText] = useState('')

  // Fetch Terms of Use
	useEffect(() => {
		fetch(DefiningSchemaMD).then(res => res.text()).then(text => setConvertText(text))
	})
  return (
    <Page title="Defining Schema">
      <TopSection title="GraphQL" subtitle="Defining Schema" description="GraphQL is running on localhost:3000/graphql" />
      <Container maxWidth="xl">
        <Markdown children={convertText} />
      </Container>
    </Page>
  );
}
