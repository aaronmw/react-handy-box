import Box from '../lib';

const Paragraph = ({ children, ...otherProps }) => (
    <Box as="p" {...otherProps}>
        {children}
    </Box>
);

export default Paragraph;
