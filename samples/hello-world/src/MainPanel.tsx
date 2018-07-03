/*
* This file demonstrates a basic ReactXP app.
*/

import RX = require('reactxp');

interface MainPanelProps {
    onPressNavigate: () => void;
}

const styles = {
    scroll: RX.Styles.createScrollViewStyle({
        alignSelf: 'stretch',
        backgroundColor: '#f5fcff'
    }),
    container: RX.Styles.createViewStyle({
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center'
    }),
    helloWorld: RX.Styles.createTextStyle({
        fontSize: 48,
        fontWeight: 'bold',
        marginBottom: 28
    }),
    welcome: RX.Styles.createTextStyle({
        fontSize: 32,
        marginBottom: 12
    }),
    instructions: RX.Styles.createTextStyle({
        fontSize: 16,
        color: '#aaa',
        marginBottom: 16
    }),
    docLink: RX.Styles.createLinkStyle({
        fontSize: 16,
        color: 'blue',
        marginBottom: 16
    }),
    roundButton: RX.Styles.createViewStyle({
        margin: 16,
        borderRadius: 16,
        backgroundColor: '#7d88a9'
    }),
    buttonText: RX.Styles.createTextStyle({
        fontSize: 16,
        marginVertical: 6,
        marginHorizontal: 12,
        color: 'white'
    })
};

class MainPanel extends RX.Component<MainPanelProps, null> {
    private _translationValue: RX.Animated.Value;
    private _animatedStyle: RX.Types.AnimatedTextStyleRuleSet;

    private _mountedButton: RX.Button;

    private _popupId = 'myPopup';
    private _popupDisplayed = false;

    constructor(props: MainPanelProps) {
        super(props);

        this._translationValue = RX.Animated.createValue(-100);
        this._animatedStyle = RX.Styles.createAnimatedTextStyle({
            transform: [
                {
                    translateY: this._translationValue
                }
            ]
        });
    }

    componentDidMount() {
        let animation = RX.Animated.timing(this._translationValue, {
            toValue: 0,
            easing: RX.Animated.Easing.OutBack(),
            duration: 500
        }
        );

        animation.start();
    }

    private _onButtonRef = (button: RX.Button) => {
        this._mountedButton = button;
    }

    private _displayPopup = () => {
        let popupOptions: RX.Types.PopupOptions = {
            getAnchor: () => this._mountedButton,
            renderPopup: this._renderPopupView,
            positionPriorities: ['bottom', 'top', 'right', 'left'],
            onDismiss: () => {
                this._popupDisplayed = false;
            }
        };

        RX.Popup.show(popupOptions, this._popupId, 500);
        this._popupDisplayed = true;
    }

    private _renderPopupView(anchorPosition: any, anchorOffset: any, popupWidth: any, popupHeight: any) {
        return (
            <RX.View>
                <RX.Text
                    style={RX.Styles.createTextStyle({
                        backgroundColor: 'teal',
                        borderRadius: 3,
                        padding: 8,
                    })}
                >
                    Popup content
                </RX.Text>
            </RX.View>
        )
    }

    render() {
        console.log(this._popupDisplayed);

        return (
            <RX.View style={styles.container}>
                <RX.Button
                    ref={this._onButtonRef}
                    onPress={this._displayPopup}
                >
                    Pop!
                </RX.Button>

                <RX.Animated.Text style={[styles.helloWorld, this._animatedStyle]}>
                    Hello World
                </RX.Animated.Text>
            </RX.View>
        );
    }
}

export = MainPanel;
