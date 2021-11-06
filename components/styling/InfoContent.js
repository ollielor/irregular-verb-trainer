import React from 'react';
import { Stack, HStack, Text } from 'native-base';
import { styles } from '../../styles/styles';

const InfoContent = (props) => {
    return (
            <Stack style={styles(props).contentContainer} direction='row'>
                <HStack style={styles(props).infoContentStyle} p='2'>
                        <Text>
                            {props.children}
                        </Text>
                    </HStack>
            </Stack>
    );
};

export default InfoContent;
