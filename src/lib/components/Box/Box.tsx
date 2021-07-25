type BoxComponent = (props: { children: React.ReactNode }) => React.ReactNode;

const Box: BoxComponent = ({ children }) => <div>Box: {children}</div>;

export default Box;
