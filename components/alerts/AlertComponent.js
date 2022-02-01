import React from 'react';
import { AlertDialog, Button } from 'native-base';

const AlertComponent = (props) => {

    return (

        <AlertDialog isOpen={props.alertOpen}>
            <AlertDialog.Content>
                <AlertDialog.Body>
                    {props.text}
                </AlertDialog.Body>
                <AlertDialog.Footer>
                    <Button.Group space='md'>
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

export default AlertComponent;