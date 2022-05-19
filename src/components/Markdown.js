import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
// markdown plugins
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Typography, Divider, Button } from '@mui/material';
//
import Image from './Image';

// ----------------------------------------------------------------------

const MarkdownStyle = styled('div')(({ theme }) => {
  const isLight = theme.palette.mode === 'light';

  return {
    '& *': {
      textIndent: '20px',
      marginBottom: '20px',
      lineHeight: 2,
      fontFamily: 'system-ui'
    },
    // List
    '& ul, & ol': {
      ...theme.typography.body1,
      paddingLeft: theme.spacing(5),
      '& li': {
        textIndent: '0 !important',
        lineHeight: 2,
      },
    },

    // Blockquote
    '& blockquote': {
      position: 'relative',
      padding: theme.spacing(1),
      paddingLeft: theme.spacing(3),
      margin: theme.spacing(1, 0),
      borderLeft: '5px solid #00AB55',
      backgroundColor: theme.palette.background.neutral,
      color: `${theme.palette.text.secondary} !important`,
      [theme.breakpoints.up('md')]: {
        width: '80%',
      },
      '& p': {
        lineHeight: '32px',
        marginBottom: '30px'
      },
      '& p, & span': {
        marginBottom: '0 !important',
        fontSize: 'inherit !important',
        fontFamily: 'Georgia, serif !important',
        color: `${theme.palette.text.secondary} !important`,
      },
    },

    '& .badge': {
      borderRadius: 2,
      padding: theme.spacing(0.2, 1),
      backgroundColor: "#FFF7CD"
    },

    // Code Block
    // '& pre, & pre > code': {
    //   fontSize: 16,
    //   overflowX: 'auto',
    //   whiteSpace: 'pre',
    //   padding: theme.spacing(2),
    //   color: theme.palette.common.white,
    //   borderRadius: theme.shape.borderRadius,
    //   backgroundColor: isLight ? theme.palette.grey[900] : theme.palette.grey[500_16],
    // },

    '& code': {
      fontSize: 14,
      borderRadius: 4,
      whiteSpace: 'pre',
      padding: theme.spacing(0.2, 0.5),
      color: theme.palette.warning[isLight ? 'darker' : 'lighter'],
      backgroundColor: theme.palette.warning[isLight ? 'lighter' : 'darker'],
      '&.hljs': { padding: 0, backgroundColor: 'transparent' },
    },
  };
});

// ----------------------------------------------------------------------

export default function Markdown({ ...other }) {
  return (
    <MarkdownStyle>
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
        components={components}
        {...other}
      />
    </MarkdownStyle>
  );
}

// ----------------------------------------------------------------------

const components = {
  h1: ({ ...props }) => <Typography variant="h1" {...props} />,
  h2: ({ ...props }) => <Typography variant="h2" {...props} />,
  h3: ({ ...props }) => <Typography variant="h3" {...props} />,
  h4: ({ ...props }) => <Typography variant="h4" {...props} />,
  h5: ({ ...props }) => <Typography variant="h5" {...props} />,
  h6: ({ ...props }) => <Typography variant="h6" {...props} />,
  hr: ({ ...props }) => <Divider sx={{ my: 3 }} {...props} />,
  button: ({ ...props }) => <Button {...props} />,
  img: ({ ...props }) => <Image alt={props.alt} ratio="16/9" sx={{ borderRadius: 2, my: 5 }} {...props} />,
  a: ({ ...props }) =>
    props.href.includes('http') ? <Link target="_blank" rel="noopener" {...props} /> : <Link {...props} />,
  code({ className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '');
    return (
      <SyntaxHighlighter
        children={String(children).replace(/\n$/, '')}
        // style={dark}
        language={match[1]}
        PreTag="div"
        {...props}
      />
    );
  },
};
