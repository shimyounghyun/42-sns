import * as React from 'react';
import styled from 'styled-components';
import QuillEditor from '../editor/QuillEditor';
import LabelInput from '../common/LabelInput';
import useInput from '../../lib/hooks/useInput';

const {useState} = React;

interface RegisterExtraProps {}

const RegisterExtra: React.FC<RegisterExtraProps> = () => {
    const [title, setTitle] = useInput('');
    return (
        <ExtraBlock>
            <LabelInput
                name="title"
                label="제목을 입력해주세요."
                placeholder="일본 후쿠오카 여행!"
                value={title}
                onChange={setTitle}
                autoComplete="off"
                size={100}
            />
          <QuillEditor
          />
        </ExtraBlock>
    );
}

const ExtraBlock = styled.div`
    display:flex;
    flex-direction:column;
`;

export default RegisterExtra;