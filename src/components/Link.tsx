import Box from '../lib';

const Link = ({ children, ...otherProps }) => (
    <Box
        as="a"
        color="blue--500"
        fontWeight="bold"
        transitionProperty="color"
        hoverProps={{
            color: 'red--500',
        }}
        {...otherProps}
    >
        {children}
    </Box>
);

export default Link;
