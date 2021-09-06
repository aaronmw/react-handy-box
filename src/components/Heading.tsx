import Box from '../lib';

const LEVEL_TO_PROP_MAP = {
    1: {
        fontSize: 'xxlarge',
        fontWeight: 'bold',
    },
    2: {
        fontSize: 'xlarge',
    },
    3: {
        fontSize: 'large',
        color: 'gray--400',
    },
};

const Heading = ({ children, level }) => (
    <Box {...LEVEL_TO_PROP_MAP[level]}>{children}</Box>
);

export default Heading;
