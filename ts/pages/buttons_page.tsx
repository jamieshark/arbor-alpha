import React = require('external/react');
import * as ReactDOM from 'external/react-dom';
import cx = require('external/classnames');

import {ArborRadioInput} from 'modules/clean/react/arbor/elements/arbor_inputs';
import {ArborExpander} from 'modules/clean/react/arbor/elements/arbor_expander';
import {ArborButton} from 'modules/clean/react/arbor/elements/arbor_buttons';

interface ArborButtonsPageProps extends React.Props<ArborButtonsPage> {
    inputStates: any;
    setRadioValue: any;
    toggleCheckbox: any;
}

export class ArborButtonsPage extends React.Component<ArborButtonsPageProps, any> {
    constructor(props:any) {
        super(props);
    }

    public handleSnippetControl(event: Event) {
        event.preventDefault();

        let codeSnippetContainer: Element = ReactDOM.findDOMNode(this.refs['code-snippet'])!;
        codeSnippetContainer.classList.toggle('arbor-element__code-snippet--closed');
    }

    private dummyHandler() {
      alert("Clicked");
    }

    public componentDidUpdate() {
        let codeSnippetHTML: Element = ReactDOM.findDOMNode(this.refs['code-snippet-html'])!;
        let codeSnippetExample: Element = ReactDOM.findDOMNode(this.refs['code-snippet-example'])!;

        codeSnippetHTML.textContent = codeSnippetExample.innerHTML;
    }

    public render () {

        const button1ClassName = cx({
            'button': true,
            'button--primary': this.props.inputStates.button1Style === 'primary',
            'button--secondary': this.props.inputStates.button1Style === 'secondary',
            'button--text-only': this.props.inputStates.button1Style === 'text-only',
            'button--big': true,
            'button--big--wide': this.props.inputStates.button1Width === 'wide',
            'button--big--extra-wide': this.props.inputStates.button1Width === 'extra-wide'
        });

        let codeSnippet = '<button>Buy now</button>';

        return (
            <div className='grid__section'>
                <div className='grid__container '>
                    <div className='grid__item grid__item--stack'>
                        <h1 className='type--title-1'>Buttons</h1>
                    </div>
                </div>

                <div className='arbor-element grid__section'>
                    <div className='grid__container'>
                        <div className='grid__item grid__item--expand grid__item--medium--1-2 grid__item--medium--margin-right--4-24 arbor-element__meta'>
                            <p className='type--copy-small arbor-element__meta__description'>
                                Our <b>.button</b> class is used for primary links and page actions.
                                It can be applied to either <b>a</b> or <b>button</b> tags. All
                                additional button classes are additive.
                            </p>
                        </div>
                        <div className='grid__item grid__item--1-2 grid__item--medium--1-6 arbor-element__selector'>
                            <div className='grid__item--stack'>
                                <ArborRadioInput
                                    name='button1Style'
                                    value='primary'
                                    checked={this.props.inputStates.button1Style === 'primary'}
                                    onClick={this.props.setRadioValue}
                                    labelText='Primary'
                                    labelClassName='demo__element__input' />
                                <ArborRadioInput
                                    name='button1Style'
                                    value='secondary'
                                    checked={this.props.inputStates.button1Style === 'secondary'}
                                    onClick={this.props.setRadioValue}
                                    labelText='Secondary'
                                    labelClassName='demo__element__input' />
                            </div>
                            <div className='arbor-element__selector__divider'></div>
                        </div>
                        <div className='grid__item grid__item--1-2 grid__item--medium--1-6 arbor-element__selector'>
                            <div className='grid__item--stack'>
                                <ArborRadioInput
                                    name='button1Width'
                                    value='standard'
                                    checked={this.props.inputStates.button1Width === 'standard'}
                                    onClick={this.props.setRadioValue}
                                    labelText='Standard'
                                    labelClassName='demo__element__input' />
                                <ArborRadioInput
                                    name='button1Width'
                                    value='wide'
                                    checked={this.props.inputStates.button1Width === 'wide'}
                                    onClick={this.props.setRadioValue}
                                    labelText='Wide'
                                    labelClassName='demo__element__input' />
                                <ArborRadioInput
                                    name='button1Width'
                                    value='extra-wide'
                                    checked={this.props.inputStates.button1Width === 'extra-wide'}
                                    onClick={this.props.setRadioValue}
                                    labelText='Extra Wide'
                                    labelClassName='demo__element__input' />
                            </div>
                        </div>
                    </div>
                    <div className='grid__container arbor-element__example' ref='code-snippet-example'>
                        <ArborButton
                            className={button1ClassName}
                            ref='primaryButtonExample'
                            onClick={this.dummyHandler}
                        >
                            This is a button
                        </ArborButton>
                    </div>
                    <div className='grid__container'>
                        <ArborExpander expanderText='Snippet' indentContent={true}>
                            <pre className='arbor-element__code-snippet__code'>
                                <code className='html' ref='code-snippet-html'>
                                    {codeSnippet}
                                </code>
                            </pre>
                        </ArborExpander>
                    </div>
                </div>

                <hr className='divider--section divider' />
            </div>
        );
    }
}
