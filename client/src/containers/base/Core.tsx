import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import AuthModalContainer from '../auth/AuthModalContainer';
import {RootState} from '../../modules';
import OpaqueLayer from '../../components/common/OpaqueLayer';

interface OwnProps {};
interface StateProps {
    layer: boolean;
}
interface DispatchProps {};
type CoreProps = OwnProps & StateProps & DispatchProps;

const Core: React.FC<CoreProps> = ({layer}) => {
    return (
        <>
            <OpaqueLayer visible={layer}/>
            <AuthModalContainer/>
        </>
    );
}

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
    state => ({
        layer: state.core.layer,
    }),
)(Core);