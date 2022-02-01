import React from 'react';
import { AlertDialog, Button } from 'native-base';

const SettingsAlertComponent = (props) => {

    return (

        <AlertDialog isOpen={props.alertOpen}>
            <AlertDialog.Content>
                <AlertDialog.Body>
                    Et ole tallentanut omia verbejäsi. Oletko varma, että haluat jatkaa?
                </AlertDialog.Body>
                <AlertDialog.Footer>
                    <Button.Group space={2}>
                        <Button
                            variant="unstyled"
                            colorScheme=""
                            onPress={() => props.setAlertOpen(false)}
                        >
                            Ei
                        </Button>
                        <Button bg='#4E00C5' onPress={props.confirm} colorScheme=''>
                            Kyllä
                        </Button>
                    </Button.Group>
                </AlertDialog.Footer>
            </AlertDialog.Content>
        </AlertDialog>

    );
};

export default SettingsAlertComponent;