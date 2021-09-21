import React from 'react';

const withComponent = (Wrapper, Wrapped) => (props) => {
    return (
        <Wrapper>
            <Wrapped {...props} />
        </Wrapper>
    );
};

export default withComponent;
