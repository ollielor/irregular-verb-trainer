import React from 'react';
import { Stack, VStack, Text } from 'native-base';
import Subheading from '../styling/Subheading';
import { styles } from '../../styles/styles';

const InfoContent = (props) => {
    return (
        <Stack style={styles(props).contentContainer} direction='row'>
            <VStack style={styles(props).infoContentStyle} p='2'>
                {props.heading &&
                    <Subheading>
                        {props.heading}
                    </Subheading>
                }
                <Text pb={props.centered ? '0' : '17'} textAlign={props.centered ? 'center' : null}>
                    {props.children}
                </Text>
            </VStack>
        </Stack>
    );
};

export default InfoContent;
