import React, { useEffect, useState } from 'react';
import { AlertDialog, Button } from 'native-base';

import { useNavigation } from '@react-navigation/native';

const SettingsAlertComponent = (props) => {

   const navigation = useNavigation();
   const [isOpen, setIsOpen] = useState(false);
   const [confirmed, setConfirmed] = useState(false);
   const [destination, setDestination] = useState('');

        return (
        
            <AlertDialog isOpen={props.alertOpen}>
            <AlertDialog.Content>
            <AlertDialog.Body>
            Et ole tallentanut asetuksiasi. Oletko varma, että haluat jatkaa?
            </AlertDialog.Body>
            <AlertDialog.Footer>
            <Button.Group space={2}>
                <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={() => props.setAlertOpen(false)}
                >
                Ei
                </Button>
                <Button bg='#4E00C5' onPress={props.confirm}>
                Kyllä
                </Button>
            </Button.Group>
            </AlertDialog.Footer>
            </AlertDialog.Content>
            </AlertDialog>

        );
};

export default SettingsAlertComponent;