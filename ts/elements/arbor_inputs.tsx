import React = require('external/react');
import cx = require('external/classnames');


// TODO: Validation, accessibility

/*
 * Labeled input component
 */
interface ArborLabeledInputProps extends React.Props<ArborLabeledInput> {
    htmlFor: string;
    labelText?: JSX.Element | string;
    labelBeforeElement?: boolean;
    className?: string;
    containerClassName?: string;
    showError?: boolean;
    errorText?: JSX.Element | string;
}

export class ArborLabeledInput extends React.Component<ArborLabeledInputProps, any> {
    render() {
        const labelClasses = cx({
            'input__label': true,
            'input__label--before': Boolean(this.props.labelBeforeElement),
        }, this.props.className);
        const containerClass = cx({
            'input__label-container': true,
            'input__label-container--stack': Boolean(this.props.labelBeforeElement),
        }, this.props.containerClassName);

        const errorClasses = cx({
            'input__label--error': true
        });

        let afterLabel : JSX.Element | null = (
            <label className={labelClasses} htmlFor={this.props.htmlFor}>
                {this.props.labelText}
            </label>
        );
        let beforeLabel: JSX.Element | null = null;

        if (this.props.labelBeforeElement) {
            beforeLabel = afterLabel;
            afterLabel = null;
        }

        let errorLabel: JSX.Element | null = null;
        if (this.props.errorText && this.props.showError) {
            errorLabel = <label className={errorClasses} htmlFor={this.props.htmlFor}>{this.props.errorText}</label>;
        }

        return (
            <div className={containerClass}>
                {beforeLabel}
                {this.props.children}
                {afterLabel}
                {errorLabel}
            </div>
        );
    }
}

/*
 * Text Input
 */
interface ArborTextInputProps extends React.Props<ArborTextInput> {
    name: string;
    id?: string;
    type?: string;
    value?: string;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    errorText?: string | JSX.Element;
    placeholderText?: string;
    pattern?: string;
    labelText?: string | JSX.Element;
    labelClassName?: string;
    onChange?: any;
    validateHandler?: any;
    isValid?: boolean;
}

export class ArborTextInput extends React.Component<ArborTextInputProps, any> {
    public componentWillMount () {
        this.setState({
            isValid: this.props.isValid
        });
    }

    public handleOnChange(e:any) {
        if (!!this.props.validateHandler) {
            // calls a validation handler if there is one
            let isValid = this.props.validateHandler(e, e.target.value);
            if (!isValid) {
                e.preventDefault();
            }
            this.setState({
                isValid: isValid
            });
        }

        if (!!this.props.onChange) {
            this.props.onChange(e, e.target.name, e.target.value);
        }
        return;
    }
    public render() {
        const {
            name,
            id,
            disabled,
            labelText,
            errorText,
            value,
            placeholderText,
            pattern,
            labelClassName
        } = this.props;

        let type = this.props.type || 'text';

        const inputClasses = cx({
            'input__text': true,
            'input__text--error': this.state.isValid === false,
            'input__text--valid': this.state.isValid === true,
        }, this.props.className);

        return (
            <ArborLabeledInput
                className={labelClassName}
                labelText={labelText}
                htmlFor={name}
                showError={this.state.isValid === false}
                errorText={errorText}
                labelBeforeElement={true}>
                <input
                    className={inputClasses}
                    type={type}
                    name={name}
                    id={id}
                    value={value}
                    pattern={pattern}
                    placeholder={placeholderText}
                    disabled={disabled}
                    onChange={this.handleOnChange.bind(this)} />
            </ArborLabeledInput>
        );
    }
}

/*
 * Checkbox Input
 */
// checkboxes use the prop `onClick` to handle its state of checked or not
// the event listener provides the name of the checkbox and its checked state as arguments
// so the parent handler can access these values
// therefore, the store should have an entry for the checkbox such as { 'myCheckboxName' : true }
// and an onClick handler for a checkbox with 'myCheckboxName' as its name attr might look something like
// toggleCheckbox: (e, checkboxName, checked) => {
//      console.log({checkboxName: checkboxName, checked: !checked});
// }
// OUTPUTS: { checkboxName: 'myCheckboxName', checked: false }
interface ArborCheckboxProps extends React.Props<ArborCheckboxInput> {
    name: string;
    disabled?: boolean;
    required?: boolean;
    checked: boolean;
    onClick?: any;
    onChange?: React.FormEventHandler;
    errorText?: string | JSX.Element;
    labelText?: string | JSX.Element;
    className?: string;
    labelClassName?: string;
}

export class ArborCheckboxInput extends React.Component<ArborCheckboxProps, any> {
    public handleCheckboxClick(e:any) {
        if (this.props.disabled) {
            e.stopPropagation();
            return;
        }

        if (!!this.props.onClick) {
            this.props.onClick(e, this.props.name, this.props.checked);
        }
        return;
    }
    public render() {

        const {
            name,
            disabled,
            required,
            checked,
            onChange,
            errorText,
            labelText
        } = this.props;

        const inputClassName = cx({
            'input__checkbox': true,
            'input__checkbox--valid': checked,
            'input__checkbox--disabled': Boolean(disabled),
        }, this.props.className);

        const labelClassName = cx(this.props.labelClassName);

        return (
            <ArborLabeledInput
                className={labelClassName}
                labelText={labelText}
                htmlFor={name}
                showError={required && !checked}
                errorText={errorText}>
                <div className={inputClassName} onClick={this.handleCheckboxClick.bind(this)}></div>
                <input
                  ref='checkbox'
                  type='checkbox'
                  name={name}
                  id={name}
                  checked={checked}
                  onChange={onChange}
                  disabled={disabled}
                />
            </ArborLabeledInput>
        );
    }
}

/*
 * Radio Input
 */
// radios use the prop `onClick` to handle its value state the event listener provides the name of
// the radio group and the currently selected value as arguments so the parent handler can access
// these values therefore, the store should have an entry for the checkbox such as { 'myRadioGroup'
// : 'foo' } and an onClick handler for a radio group with 'myRadioGroup' as its name attr might
// look something like readRadioValue: (e, radioName, val) => { console.log({radioGroup: radioName,
// value: val});
// }
// OUTPUTS: { radioGroup: 'myRadioGroup', value: 'foo' }
interface ArborRadioProps extends React.Props<ArborRadioInput> {
    name: string;
    disabled?: boolean;
    required?: boolean;
    value: string;
    checked?: boolean;
    onClick?: any;
    onChange?: React.FormEventHandler;
    className?: string;
    errorText?: string | JSX.Element;
    labelText?: string | JSX.Element;
    labelClassName?: string;
}

export class ArborRadioInput extends React.Component<ArborRadioProps, any> {
    public handleRadioClick(e:any) {
        if (this.props.disabled) {
            e.stopPropagation();
            return;
        }

        if (!!this.props.onClick) {
            this.props.onClick(e, this.props.name, this.props.value);
        }
        return;
    }
    public render() {

        const {
            name,
            disabled,
            required,
            value,
            checked,
            onChange,
            errorText,
            labelText
        } = this.props;

        const inputClassName = cx({
            'input__radio': true,
            'input__radio--valid': Boolean(checked),
            'input__radio--disabled': Boolean(disabled),
        }, this.props.className);

        const labelClassName = cx(this.props.labelClassName);

        return (
            <ArborLabeledInput
                className={labelClassName}
                labelText={labelText}
                htmlFor={name}
                showError={required && !value}
                errorText={errorText}>
                <div
                    tabIndex={0}
                    role='radio'
                    className={inputClassName}
                    onClick={this.handleRadioClick.bind(this)}>
                </div>
                <input
                  ref='radio'
                  type='radio'
                  name={name}
                  id={name}
                  value={value}
                  checked={checked}
                  onChange={onChange}
                  disabled={disabled}
                />
            </ArborLabeledInput>
        );
    }
}

/*
 * Select input component
 */
interface ArborSelectInputProps extends React.Props<ArborSelectInput> {
    className?: string;
    errorText?: string | JSX.Element;
    labelClassName?: string;
    labelText?: string | JSX.Element;
    name: string;
    onChange?: (e: Event, name: string|undefined, value: string|undefined) => void;
    value?: string;
    disabled?: boolean;
}

export class ArborSelectInput extends React.Component<ArborSelectInputProps, void> {


    public handleSelectChange(e:any) {
        if (this.props.disabled) {
            e.stopPropagation();
            return;
        }

        if (!!this.props.onChange) {
            this.props.onChange(e, this.props.name, this.props.value);
        }
        return;
    }

    public render() {
        const { name, labelClassName, className, labelText, disabled, errorText } = this.props;

        const inputClassName = cx({
            'input__select': true
        }, className);
        return (
            <ArborLabeledInput
                className={labelClassName}
                errorText={errorText}
                htmlFor={name}
                labelBeforeElement={true}
                labelText={labelText}
            >
                <select
                    className={inputClassName}
                    id={name}
                    name={name}
                    disabled={disabled}
                    onChange={this.handleSelectChange.bind(this)}
                    value={this.props.value}
                >
                    {this.props.children}
                </select>
            </ArborLabeledInput>
        );
    }

}
