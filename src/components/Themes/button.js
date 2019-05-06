import React, { Component } from 'react';
import { StateContext } from './themes';

class ThemedButton extends Component {
    static contextType = StateContext;
    render() {
        const [{ theme }, dispatch] = this.context;
        return (
            <Button
                primaryColor={theme.primary}
                onClick={() => dispatch({
                    type: 'changeTheme',
                    newTheme: { primary: 'blue' }
                })}
            >
                Make me blue!
      </Button>
        );
    }
}