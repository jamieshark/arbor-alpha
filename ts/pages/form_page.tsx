import React = require('external/react');

import {
    ArborTextInput,
    ArborCheckboxInput,
    ArborRadioInput,
    ArborSelectInput
} from 'modules/clean/react/arbor/elements/arbor_inputs';

interface ArborFormPageProps extends React.Props<ArborFormPage> {
    inputStates: any;
    toggleCheckbox: any;
    setRadioValue: any;
    onInputChange: any;
}

export class ArborFormPage extends React.Component<ArborFormPageProps, any> {
    constructor(props:any) {
        super(props);
    }

    public render () {
        return (
            <div className='grid__section'>
                <div className='grid__container '>
                    <div className='grid__item grid__item--stack'>
                        <h1 className='type--title-1'>Forms</h1>
                    </div>
                </div>
                <hr className='divider--section divider' />
                <div className='grid__container grid__container--p-large  grid--x-bookend'>
                    <div className='grid__item grid__item--1-2 demo__element'>
                        <ArborTextInput name='email' labelText='Email' placeholderText='beep@boop.com' />
                    </div>
                    <div className='grid__item grid__item--1-4 grid__item--stack'>
                        <h2 className='type--copy-large'>Standard Field</h2>
                        <p className='type--copy-small'>Stuff about forms</p>
                    </div>
                </div>
                <hr className='divider--section divider' />
                <div className='grid__container grid__container--p-large  grid--x-bookend'>
                    <div className='grid__item grid__item--1-2 demo__element'>
                        <ArborTextInput
                            name='email'
                            labelText='Email'
                            value='123'
                            isValid={false}
                            errorText='Input is incorrect' />
                    </div>
                    <div className='grid__item grid__item--1-4 grid__item--stack'>
                        <h2 className='type--copy-large'>Error Field</h2>
                        <p className='type--copy-small'>Stuff about forms</p>
                    </div>
                </div>
                <hr className='divider--section divider' />
                <div className='grid__container grid__container--p-large  grid--x-bookend'>
                    <div className='grid__item grid__item--1-2 demo__element'>
                        <ArborTextInput
                            name='email'
                            labelText='Email'
                            value='beep@boop.com'
                            isValid={true}
                            errorText='Input is incorrect' />
                    </div>
                    <div className='grid__item grid__item--1-4 grid__item--stack'>
                        <h2 className='type--copy-large'>Success Field</h2>
                        <p className='type--copy-small'>Stuff about forms</p>
                    </div>
                </div>
                <hr className='divider--section divider' />
                <div className='grid__container grid__container--p-large  grid--x-bookend'>
                    <div className='grid__item grid__item--1-2 demo__element'>
                        <ArborTextInput
                            name='email'
                            labelText='Email'
                            value='beep@boop.com'
                            disabled={true}
                            errorText='Input is incorrect' />
                    </div>
                    <div className='grid__item grid__item--1-4 grid__item--stack'>
                        <h2 className='type--copy-large'>Disabled field</h2>
                        <p className='type--copy-small'>Stuff about forms</p>
                    </div>
                </div>
                <hr className='divider--section divider' />
                <div className='grid__container grid__container--p-large  grid--x-bookend'>
                    <div className='grid__item grid__item--1-2 demo__element'>
                        <div className='grid__item--stack'>
                            <ArborCheckboxInput
                                name='checkbox1'
                                checked={this.props.inputStates.checkbox1}
                                onClick={this.props.toggleCheckbox}
                                labelClassName='demo__input--large'
                                labelText='I\'m big and still centered' />
                            <ArborCheckboxInput
                                name='checkbox2'
                                required={true}
                                checked={this.props.inputStates.checkbox2}
                                onClick={this.props.toggleCheckbox}
                                labelText='You should definitely click me'
                                errorText='Or else. :|' />
                            <ArborCheckboxInput
                                name='checkers'
                                checked={false}
                                disabled={true}
                                labelText='can\'t touch me' />
                        </div>
                    </div>
                    <div className='grid__item grid__item--1-4 grid__item--stack'>
                        <h2 className='type--copy-large'>Checkbox</h2>
                        <p className='type--copy-small'>Stuff about forms</p>
                    </div>
                </div>
                <hr className='divider--section divider' />
                <div className='grid__container grid__container--p-large  grid--x-bookend'>
                    <div className='grid__item grid__item--1-2 demo__element'>
                        <div className='grid__item--stack'>
                            <ArborRadioInput
                                name='radio1'
                                value='bloop'
                                checked={this.props.inputStates.radio1 === 'bloop'}
                                onClick={this.props.setRadioValue}
                                labelText='click me' />
                            <ArborRadioInput
                                name='radio1'
                                value='bleep'
                                checked={this.props.inputStates.radio1 === 'bleep'}
                                labelClassName='input__label--large'
                                onClick={this.props.setRadioValue}
                                labelText='You should definitely click me' />
                            <ArborRadioInput
                                name='radio1'
                                value='blaap'
                                disabled={true}
                                labelText='can\'t touch me' />
                        </div>
                    </div>
                    <div className='grid__item grid__item--1-4 grid__item--stack'>
                        <h2 className='type--copy-large'>Radio button</h2>
                    </div>
                </div>
                <hr className='divider--section divider' />
                <div className='grid__container grid__container--p-large  grid--x-bookend'>
                    <div className='grid__item grid__item--1-2 demo__element'>
                        <div className='grid__item--stack grid__item--1-2'>
                            <ArborSelectInput
                                className='tree-selector'
                                labelText={'Trees'}
                                name='select'
                                onChange={this.props.onInputChange}
                                value={this.props.inputStates.select}
                            >
                                <option key="1" value="alder">
                                    Alder
                                </option>
                                <option key="2" value="elm">
                                    Elm
                                </option>
                                <option key="3" value="oak">
                                    Oak
                                </option>
                            </ArborSelectInput>
                        </div>
                    </div>
                    <div className='grid__item grid__item--1-4 grid__item--stack'>
                        <h2 className='type--copy-large'>Select dropdown</h2>
                    </div>
                </div>
            </div>
        );
    }
}
