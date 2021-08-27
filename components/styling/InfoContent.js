import React from 'react';
import { Body, Card, CardItem, Content, Text } from 'native-base';
import { styles } from '../../styles/styles';

const InfoContent = (props) => {
    return (
        <Content style={styles(props).contentContainer}>
            <Card>
                <CardItem style={styles(props).infoContentStyle}>
                    <Body>
                        <Text>
                            {props.children}
                        </Text>
                    </Body>
                </CardItem>
            </Card>
        </Content>
    );
};

export default InfoContent;
