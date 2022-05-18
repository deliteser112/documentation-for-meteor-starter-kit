import PropTypes from 'prop-types';
// icons
// @mui
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// components
import Image from './Image';

// ----------------------------------------------------------------------
const RootStyle = styled(Box)(({
  position: 'relative'
}))

const TitleStyle = styled(Box)(({
  position: 'absolute',
  top: '40%',
  left: '10%',
  transform: 'translate(0, -50%)',
  zIndex: 1,
  color: 'white'
}))

TopSection.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  description: PropTypes.string,
};

export default function TopSection({ title, subtitle, description }) {
  return (
    <RootStyle>
      <TitleStyle>
        <Typography variant="h3">{title} | {subtitle}</Typography>
        <Typography variant="h6">{description}</Typography>
      </TitleStyle>
      <Image alt={title} sx={{ width: '100%' }} src="/assets/doc-back.png" />
    </RootStyle>
  );
}
