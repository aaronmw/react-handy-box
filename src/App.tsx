import Box, { Config as ReactHandyBoxConfig } from './lib';
import Heading from './components/Heading';
import Link from './components/Link';
import Paragraph from './components/Paragraph';
import Tip from './components/Tip';

function App() {
    return (
        <Box
            columns={['250px', '1fr']}
            gap="normal"
            height="100vh"
            padding="normal"
            width="100vw"
        >
            <Box
                border="normal"
                borderColor="gray--200"
                color="gray--400"
                padding="normal"
            >
                <Heading level={4}>Intro Shit</Heading>
                <Link href="#">WTF is this?</Link>
            </Box>
            <Box
                border="normal"
                borderColor="gray--200"
                padding="normal"
                rowGap="normal"
            >
                <Heading level={1}>react-handy-box</Heading>
                <Tip>I am some kind of helpful tip, I guess.</Tip>

                <Heading level={2}>WTF is this?</Heading>

                <Paragraph>
                    It's a box. A glorified <code>&lt;div&gt;</code> tag, with
                    its own baked-in allow-list of colors, spacings, sizes, etc.
                </Paragraph>
                <Paragraph>
                    If you're a designer or developer, it's probably going to
                    save you some time. Will it change the way you build UI?
                    Unlikely. Will it keep your stuff looking consistent, and
                    let you focus on actual functionality? That's more likely,
                    yes.
                </Paragraph>
            </Box>
        </Box>
    );
}

export default App;
