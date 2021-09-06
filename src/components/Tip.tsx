import Box from '../lib';

const Tip = ({ children, ...otherProps }) => (
    <Box
        backgroundColor="blue--100"
        border="normal"
        borderColor="blue--200"
        borderRadius="normal"
        color="blue--500"
        padding="normal"
        {...otherProps}
    >
        {children}
    </Box>
);

export default Tip;
