import React = require('external/react');
import cx = require('external/classnames');

import {
    ArborCheckboxInput,
    ArborRadioInput,
    ArborTextInput
} from 'modules/clean/react/arbor/elements/arbor_inputs';

import {ArborExpander} from 'modules/clean/react/arbor/elements/arbor_expander';
import {ArborTabs} from 'modules/clean/react/arbor/elements/arbor_tabs';

interface ArborGridPageProps extends React.Props<ArborGridPage> {
    onTabClick: any;
    toggleCheckbox: any;
    setRadioValue: any;
    onInputChange: any;
    inputStates: any;
    tabArray: Array<any>;
    subNavStates: any;
}

export class ArborGridPage extends React.Component<ArborGridPageProps, any> {
    constructor(props:any) {
        super(props);

        this.state = {
            visibleGrid: 'desktop'
        };
    }

    // return lowest fraction column class
    public getLowestFraction(x0:any) {
        const eps = 1.0E-15;
        let h:any;
        let h1:any;
        let h2:any;
        let k:any;
        let k1:any;
        let k2:any;
        let a:any;
        let x:any;

        x = x0;
        a = Math.floor(x);
        h1 = 1;
        k1 = 0;
        h = a;
        k = 1;

        while (x-a > eps*k*k) {
            x = 1/(x-a);
            a = Math.floor(x);
            h2 = h1; h1 = h;
            k2 = k1; k1 = k;
            h = h2 + a*h1;
            k = k2 + a*k1;
        }

        return h + '-' + k;
    }

    private blockMassProduction(
        numBlocks: number,
        colWidth: string | Array<any>,
        includeClassName: boolean = false
    ) {
        const blocks:any = [];
        let bodyText:any = null;
        let colClass:any = typeof colWidth === 'string' ? colWidth : null;
        // iterate through the number of blocks we want to make
        for (let i: number = 0; i < numBlocks; i++) {
            // for the grid builder, which provides the numerator of the
            // column width through an array
            // if the column width is specified in the input states,
            // use that value
            // otherwise, use the default column class
            if (colWidth instanceof Array && colWidth[i]) {
                let numerator = colWidth[i];
                colClass = this.getLowestFraction(numerator / 24);
            }

            let variableBlockCN = cx({
                'grid__item': true,
                'grid__item--tall': true,
                [`grid__item--${colClass}`]: colWidth[i] || typeof colWidth === 'string'
            });

            if (includeClassName) {
                bodyText = '.grid__item--' + colClass;

                if (colClass === null) {
                    bodyText = '.grid__item';
                }
            }
            blocks.push(
                <div className={variableBlockCN} key={i}>
                    {bodyText}
                </div>
            );
        }
        return blocks;
    }

    public renderGridLines () {
        // LOL HACKY CLASS NAME ARGUMENT
        return (
            <div className='grid__container demo__grid-lines'>
                {this.blockMassProduction(24, '1-12 grid__item--large--1-24')}
            </div>
        );
    }

    public validateColNumber(e:any, val:any) {
        if (val > 24) {
            return false;
        } else {
            return true;
        }
    }

    public renderAlignmentRadioGroup(alignmentDirection:any, radioGroupName:any) {
        let alignmentArray = ['top', 'middle', 'bottom', 'stretch', 'baseline'];
        if (alignmentDirection === 'x') {
            alignmentArray = ['left', 'center', 'right', 'bookend', 'spaced'];
        }

        let radioGroup:any = [];
        for (let i: number = 0; i < alignmentArray.length; i++) {
            radioGroup.push(
                <ArborRadioInput
                    name={radioGroupName}
                    value={alignmentArray[i]}
                    checked={this.props.inputStates[radioGroupName] === alignmentArray[i]}
                    onClick={this.props.setRadioValue}
                    labelText={alignmentArray[i]+' align'}
                    labelClassName='demo__element__input' />
            );
        }

        return (
            <div className='grid__item grid__item--medium--shrink grid__item--stack'>
                <p className='type--copy-aside'>{alignmentDirection} alignment</p>
                {radioGroup}
            </div>
        );
    }
    public renderGridBuilderColOptions() {
        let inputs:any = [];

        if (this.props.inputStates.gridNumColumns > 24) {
            inputs.push(
                <img className='demo__icon' src='/static/images/arbor/demo-assets/ng.svg' />
            );
        } else {
            for (let i: number = 0; i < this.props.inputStates.gridNumColumns; i++) {
                inputs.push(
                    <div className='grid__item--shrink grid__item--stack'>
                        <ArborTextInput
                            type='number'
                            name={`col${i}width`}
                            labelClassName='demo__element__input'
                            labelText={`Col ${i+1}`}
                            onChange={this.props.onInputChange}
                            validateHandler={this.validateColNumber}
                            value={this.props.inputStates[`col${i}width`]} />
                    </div>
                );
            }
        }

        return (
            <div className='grid__container grid--x-bookend'>
                <h3 className='grid__item type--title-3'>Column Options</h3>
                <div className='grid__item grid--x-bookend'>
                    <h4 className='grid__item type--title-4'>Column Widths</h4>
                    {inputs}
                </div>
            </div>
        );
    }

    public renderGridBuilderRowOptions() {
        // users can customize row alignment, number of columns in a row
        return (
            <div className='grid__container grid--x-bookend'>
                <h3 className='grid__item type--title-3'>Row Options</h3>
                <div className='grid__item grid__item--stack'>
                    <h4 className='type--title-4'>Number of Columns</h4>
                    <ArborTextInput
                        type='number'
                        name='gridNumColumns'
                        labelClassName='demo__element__input'
                        labelText='Up to 24'
                        onChange={this.props.onInputChange}
                        value={this.props.inputStates.gridNumColumns}
                        placeholder='number of grids' />
                </div>
                <div className='grid__item grid__item--medium--5-12 grid__item--stack'>
                    {this.renderAlignmentRadioGroup('x', 'gridXAlign')}
                </div>
                <div className='grid__item grid__item--medium--5-12 grid__item--stack'>
                    {this.renderAlignmentRadioGroup('y', 'gridYAlign')}
                </div>
            </div>
        );
    }

    public renderGridBuilderResult() {
        const gridBuilderRowClassNames = cx({
            'grid__container': true,
            'demo__grid-builder__result': true,
            [`grid--x-${this.props.inputStates.gridXAlign}`]: true,
            [`grid--y-${this.props.inputStates.gridYAlign}`]: true
        });

        let gridBuilderColClasses:any = [];

        for (let i: number = 0; i < this.props.inputStates.gridNumColumns; i++) {
            gridBuilderColClasses.push(this.props.inputStates[`col${i}width`]);
        }

        let blocks:any = null;

        if (this.props.inputStates.gridNumColumns <= 24) {
            // 'true' arg displays class name in block
            blocks = this.blockMassProduction(this.props.inputStates.gridNumColumns,
                                                gridBuilderColClasses, true);
        }
        return (
            <div className={gridBuilderRowClassNames}>
                {blocks}
            </div>
        );
    }

    public renderMediaOptions() {
        return (
            <div className='grid__container grid--x-bookend'>
                <h3 className='grid__item type--title-3'>Alignment Options</h3>
                <div className='grid__item grid__item--medium--1-4 grid--y-top grid__item--stack'>
                    <h4 className='type--copy-standard'>Stacked?</h4>
                    <ArborRadioInput
                        name='alignmentStack'
                        value='side'
                        checked={this.props.inputStates.alignmentStack === 'side'}
                        onClick={this.props.setRadioValue}
                        labelText='Side-by-side'
                        labelClassName='demo__element__input' />
                    <ArborRadioInput
                        name='alignmentStack'
                        value='stack'
                        checked={this.props.inputStates.alignmentStack === 'stack'}
                        onClick={this.props.setRadioValue}
                        labelText='Stacked'
                        labelClassName='demo__element__input' />
                    <h4 className='type--copy-standard'>Swap image and caption</h4>
                    <ArborCheckboxInput
                        labelText='SWAP!'
                        labelClassName='demo__element__input'
                        name='alignmentSwap'
                        checked={this.props.inputStates.alignmentSwap}
                        onClick={this.props.toggleCheckbox} />
                    <h4 className='type--copy-standard'>Container</h4>
                    {this.renderAlignmentRadioGroup('x', 'alignmentContainer')}
                </div>
                <div className='grid__item grid__item--medium--1-3 grid--y-top'>
                    <h4 className='grid__item type--copy-standard'>Image</h4>
                    <div className='grid__item grid--x-bookend demo__radio-columns'>
                        {this.renderAlignmentRadioGroup('x', 'alignmentImageX')}
                        {this.renderAlignmentRadioGroup('y', 'alignmentImageY')}
                    </div>
                </div>
                <div className='grid__item grid__item--medium--1-3 grid--y-top'>
                    <h4 className='grid__item type--copy-standard'>Caption</h4>
                    <div className='grid__item grid--x-bookend demo__radio-columns'>
                        {this.renderAlignmentRadioGroup('x', 'alignmentCaptionX')}
                        {this.renderAlignmentRadioGroup('y', 'alignmentCaptionY')}
                    </div>
                    <h4 className='grid__item type--copy-standard'>Width of caption (out of 24)</h4>
                    <ArborTextInput
                        type='number'
                        name='alignmentCaptionWidth'
                        labelClassName='demo__element__input'
                        onChange={this.props.onInputChange}
                        validateHandler={this.validateColNumber}
                        value={this.props.inputStates.alignmentCaptionWidth} />
                </div>
            </div>
        );
    }
    public renderAlignmentBuilderSection() {
        let captionWidthClass:any = null;

        if (this.props.inputStates.alignmentCaptionWidth) {
            const numerator = this.props.inputStates.alignmentCaptionWidth;
            captionWidthClass = this.getLowestFraction(numerator / 24);
        }

        const containerClassName = cx({
            'demo__alignment': true,
            'demo__alignment--tall': true,
            'grid__container': true,
            [`grid--x-${this.props.inputStates.alignmentContainer}`]: true
        });

        const imageClassName = cx({
            'media__image': true,
            'media--expand': this.props.inputStates.alignmentStack === 'stack',
            [`media--y-${this.props.inputStates.alignmentImageY}`]: true,
            [`media--x-${this.props.inputStates.alignmentImageX}`]: true,
        });

        const captionClassName = cx({
            'media__caption': true,
            'media--fluid': this.props.inputStates.alignmentStack === 'side' && !captionWidthClass,
            [`media--y-${this.props.inputStates.alignmentCaptionY}`]: true,
            [`media--x-${this.props.inputStates.alignmentCaptionX}`]: true,
            [`media__caption--${captionWidthClass}`]: captionWidthClass,
            'media--first': this.props.inputStates.alignmentSwap
        });

        return (
            <div className='grid__section'>
                <div className='grid__container grid--x-bookend'>
                    <h1 className='grid__item demo__title type--copy-large'>Alignment Examples</h1>
                    <div className='grid__container grid--x-bookend demo__alignment'>
                        <div className='demo__alignment__col grid__item grid__item--medium--1-4 grid--x-center'>
                            <div className='grid__item--5-6 grid__item--stack grid--x-bookend'>
                                <div className='grid__item grid__item--shrink'>
                                    <h1 className='grid__item type--copy-large'>Basic</h1>
                                    <div className='grid__item grid--x-spaced'>
                                        <h3 className='demo__title type--title-1'>$0</h3>
                                        <p className='type--copy-small grid--self-middle'>
                                            / user / month
                                        </p>
                                    </div>
                                    <ul className='demo__feature-list grid__item grid__item--stack grid--y-middle'>
                                        <li>Bacon</li>
                                        <li>Bacon</li>
                                        <li>Bacon</li>
                                        <li>Bacon</li>
                                    </ul>
                                </div>
                                <div className='demo__alignment__cta grid__item--shrink grid__item--stack grid--x-right'>
                                    <button className='button button--big button--secondary'>
                                        Button
                                     </button>
                                </div>
                            </div>
                        </div>
                        <div className='demo__alignment__col grid__item grid__item--medium--1-4 grid--x-center'>
                            <div className='grid__item--5-6 grid__item--stack grid--x-bookend'>
                                <div className='grid__item grid__item--shrink'>
                                    <h1 className='grid__item type--copy-large'>Pro</h1>
                                    <div className='grid__item grid--x-spaced'>
                                        <h3 className='demo__title type--title-1'>$0</h3>
                                        <p className='type--copy-small grid--self-middle'>
                                            / user / month
                                        </p>
                                    </div>
                                    <ul className='demo__feature-list grid__item grid__item--stack grid--y-middle'>
                                        <li>Bacon</li>
                                        <li>Bacon</li>
                                        <li>Bacon</li>
                                        <li>Bacon</li>
                                        <li>Bacon</li>
                                        <li>Bacon</li>
                                        <li>Bacon</li>
                                        <li>Bacon</li>
                                    </ul>
                                </div>
                                <div className='demo__alignment__cta grid__item--shrink grid__item--stack grid--x-right'>
                                    <button className='button button--big button--primary'>
                                        Button
                                     </button>
                                </div>
                            </div>
                        </div>
                        <div className='demo__alignment__col grid__item grid__item--medium--1-4 grid--x-center'>
                            <div className='grid__item--5-6 grid__item--stack grid--x-bookend'>
                                <div className='grid__item grid__item--shrink'>
                                    <h1 className='grid__item type--copy-large'>Business</h1>
                                    <div className='grid__item grid--x-spaced'>
                                        <h3 className='demo__title type--title-1'>$0</h3>
                                        <p className='type--copy-small grid--self-middle'>/ user / month</p>
                                    </div>
                                    <ul className='demo__feature-list grid__item grid__item--stack grid--y-middle'>
                                        <li>Bacon</li>
                                        <li>Bacon</li>
                                        <li>Bacon</li>
                                        <li>Bacon</li>
                                    </ul>
                                </div>
                                <div className='demo__alignment__cta grid__item--shrink grid__item--stack grid--x-right'>
                                    <button className='button button--big button--primary'>Button</button>
                                    <p className='demo__alignment__tagline type--copy-mini'>taglines are best lines</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className='divider divider--section' />
                <div className='grid__container grid--x-bookend'>
                    <div className='grid__item grid__item--medium--5-12 grid__item--stack'>
                        <h1 className='demo__title type--copy-large'>Alignment Builder</h1>
                        <ul className='type--copy-small'>
                            <li>
                                This builder renders a row that contains an image asset and some
                                copy.
                            </li>
                            <li>
                                Media classes are just a subset of classes that borrow from how grid
                                items and containers work. By default, captions take up the entire
                                width and items will take up the size of their natural dimensions.
                            </li>
                            <li>
                                These sizes can be adjusted by specifying a width for the caption,
                                and then container itself can be used for alignment classes, similar
                                to the way the grid columns and rows behave.
                            </li>
                            <li>
                                The image can also be aligned along the x-axis if the items are
                                stacked.
                            </li>
                            <li>
                                Similar to grids, media alignments are also responsive. So a caption
                                with the classes `media--y-center media--large-y-top` will appear
                                aligned to the middle until it hits a large breakpoint, where it
                                will appear to the top.
                            </li>
                            <li>
                                This alignment playground is a bit of overkill in terms of the
                                options, and typically, things will be vertically aligned or center
                                aligned. But in case you need something specific, this can help
                                visualize what the end goal is.
                            </li>
                        </ul>
                    </div>
                    <div className='grid__item grid__item--medium--1-3'>
                        <aside className='grid__item demo__aside'>
                            <img className='demo__icon--success'
                                src='/static/images/arbor/inputs/icon-success.svg' />
                            <p>
                                Rhe class `grid--vcjc` is a nice shortcut to horizontally and
                                vertically center something in a container.
                            </p>
                            <p>
                                Rhe class `grid__item--stack` is a nice shortcut to stack everything
                                that a div contains. Useful for copy blocks.
                            </p>
                        </aside>
                        <aside className='grid__item demo__aside'>
                            <img className='demo__icon--success'
                                src='/static/images/arbor/inputs/icon-success.svg' />
                            <p>
                                Instead of using the row to align all your column blocks,
                                columns can also align themselves using the classes:
                                <ul>
                                    <li>grid--self-top</li>
                                    <li>grid--self-middle</li>
                                    <li>grid--self-bottom</li>
                                    <li>grid--self-baseline</li>
                                </ul>
                            </p>
                            <p>
                                These are also responsive classes, so a column with the class
                                `grid--self-top grid--large--self-middle` will be aligned at the top
                                of its parent until it hits large, where it will be in the middle.
                            </p>
                        </aside>
                    </div>
                </div>
                <hr className='divider divider--section' />
                {this.renderMediaOptions()}
                <div className={containerClassName}>
                    <div className={imageClassName}>
                        <img src='/static/images/arbor/demo-assets/koi-fish.svg' />
                    </div>
                    <div className={captionClassName}>
                        <h3 className='demo__title type--title-3'>Here are some fish</h3>
                        <p className='type--copy-small'>
                            Bacon ipsum dolor amet ham doner tail tri-tip shoulder bresaola, bacon
                            sirloin ground round kevin porchetta. Fatback hamburger prosciutto
                            chicken tenderloin sausage cow filet mignon drumstick pancetta brisket
                            capicola t-bone sirloin turducken. Pork belly sausage shankle ham hock
                            tail, sirloin strip steak shoulder. Pork chop pork spare ribs meatball
                            prosciutto short ribs chicken ribeye. Shankle flank drumstick turkey
                            pork, doner brisket ham beef ribs chuck. Salami turducken pork tail ham
                            hock filet mignon.
                        </p>
                    </div>
                </div>
                <div className='grid__container'>
                    <ArborExpander expanderText='Snippet' indentContent={true}>
                        <pre className='arbor-element__code-snippet__code'>
                            <code className='html' ref='code-snippet-html'>
                                <div className='grid__section'>
                                    {containerClassName}
                                </div>
                                <div className='grid__section'>
                                    {imageClassName}
                                </div>
                                <div className='grid__section'>
                                    {captionClassName}
                                </div>
                            </code>
                        </pre>
                    </ArborExpander>
                </div>
            </div>

        );
    }
    public renderGridBuilderSection() {
        const gridDemoClassNames = cx({
            'grid__container': true,
            'demo__grid': true,
            'demo__grid--wlines': this.props.inputStates.showGridLines
        });
        return (
            <div className='grid__section'>
                <div className='grid__container grid--x-bookend'>
                    <div className='grid__item grid__item--medium--3-4 grid__item--stack'>
                        <h1 className='demo__title type--copy-large'>Grid Builder</h1>
                        <ul className='type--copy-small'>
                            <li>
                                This builder renders one row that renders a variable number of
                                columns, up to 24.
                            </li>
                            <li>
                                By default, items take up the whole width of a container. Individual
                                item widths can be also specified as a fraction of 24 columns (a
                                number that can be configured when the mixin is called). <em>Ex:
                                </em> For an item that takes up 50%, you would type 12 in the box.
                            </li>
                            <li>
                                Item fractions are automatically reduced in the class, to prevent
                                repeated properties / classes when multiple grids are used. For
                                example, instead of multiple iterations of <em>item--12-24</em>,
                                etc, we have <strong>item--1-2</strong>.
                            </li>
                            <li>
                                The container alignment can also be changed.
                                <strong>Bookend</strong> means that the first and last blocks will
                                stick to the edges of the row, and the remaining 'whitespace' is
                                distributed amongst the rest of the blocks. <strong>Spaced</strong>
                                means that the 'whitespace' is distributed amongst the blocks with a
                                bit of space on the sides as well.
                            </li>
                            <li>
                                If the widths of your items add up to more than 1, they'll wrap and
                                start a new row.
                            </li>
                        </ul>
                    </div>
                    <aside className='grid__item grid__item--medium--1-4 grid--vcjc demo__aside'>
                        <img className='demo__icon--success'
                            src='/static/images/arbor/inputs/icon-success.svg' />
                        <p>
                            For the purposes of this builder, don't do more than 24 columns. It
                            looks weird.
                        </p>
                    </aside>
                </div>
                <hr className='divider divider--section' />
                <div className='grid__container grid--x-bookend'>
                    <div className='grid__item grid__item--medium--5-12 grid--y-top'>
                        {this.renderGridBuilderRowOptions()}
                    </div>
                    <div className='grid__item grid__item--medium--5-12 grid--y-top'>
                        {this.renderGridBuilderColOptions()}
                    </div>
                    <div className='grid__item'>
                        <ArborCheckboxInput
                            labelText='Show grid lines'
                            labelClassName='demo__element__input'
                            name='showGridLines'
                            checked={this.props.inputStates.showGridLines}
                            onClick={this.props.toggleCheckbox} />
                    </div>
                </div>
                <hr className='divider divider--section' />
                <div className={gridDemoClassNames}>
                    {this.renderGridLines()}
                    {this.renderGridBuilderResult()}
                </div>
            </div>
        );
    }

    public renderDividerSection() {
        return (
            <div className='grid__section'>
                <div className='grid__container grid--x-bookend'>
                    <div className='grid__item grid__item--medium--1-2 demo__element demo__divider'>
                        <div className='grid__container'>
                            <hr className='divider' />
                        </div>
                        <div className='grid__container'>
                            <hr className='divider divider--1-4' />
                        </div>
                        <div className='grid__container'>
                            <hr className='divider divider--1-6' />
                        </div>
                        <div className='grid__container'>
                            <hr className='divider divider--1-12' />
                        </div>
                    </div>
                    <div className='grid__item grid__item--medium--5-12 grid__item--stack'>
                        <h1 className='demo__title type--copy-large'>
                            Content Dividers
                            </h1>
                        <p className='type--copy-small'>
                            Width increments by columns
                            </p>
                        <p className='type--copy-small'>
                            Comes with default sizes of (1/24, 1/12, 1/6, 1/4)
                            </p>
                        <p className='type--copy-small'>
                            Has top and bottom margin of 50px ('Large')
                            </p>
                    </div>
                </div>
                <hr className='divider divider--section' />
                <div className='grid__container grid__container--p-large'>
                    <div className='grid__item grid__item--stack'>
                        <h1 className='demo__title type--copy-large'>Plank or section divider</h1>
                        <p className='type--copy-small'>
                            Used at full-width to separate section when content changes
                            significantly
                        </p>
                        <p className='type--copy-small'>
                            Opacity is at 15% instead of 30% (as compared to content dividers)
                        </p>
                    </div>
                </div>
                <div className='grid__section demo__element'>
                    <hr className='divider divider--section' />
                </div>
            </div>
        );
    }

    public renderSpacingSection() {
        return (
            <div className='grid__container grid--x-bookend'>
                <div className='grid__item grid__item--medium--1-2 demo__element'>
                    <div className='grid__container grid__container--p-large grid--y-middle grid--x-bookend'>
                        <div className='demo__spacing demo__spacing--jumbo' />
                        <p className='type--copy-aside'>100px - Jumbo</p>
                    </div>
                    <div className='grid__container grid__container--p-large grid--y-middle grid--x-bookend'>
                        <div className='demo__spacing demo__spacing--large' />
                        <p className='type--copy-aside'>50px - Large</p>
                    </div>
                    <div className='grid__container grid__container--p-large grid--y-middle grid--x-bookend'>
                        <div className='demo__spacing demo__spacing--medium' />
                        <p className='type--copy-aside'>30px - Medium</p>
                    </div>
                    <div className='grid__container grid__container--p-large grid--y-middle grid--x-bookend'>
                        <div className='demo__spacing demo__spacing--small' />
                        <p className='type--copy-aside'>20px - Small</p>
                    </div>
                    <div className='grid__container grid__container--p-large grid--y-middle grid--x-bookend'>
                        <div className='demo__spacing demo__spacing--micro' />
                        <p className='type--copy-aside'>10px - Micro</p>
                    </div>
                </div>
                <div className='grid__item grid__item--medium--5-12 grid__item--stack'>
                    <h1 className='demo__title type--copy-large'>
                        Vertical Spacing
                    </h1>
                    <p className='type--copy-small'>
                        Commonly used vertical settings
                    </p>
                    <p className='type--copy-small'>
                        These do not cover all situations
                    </p>
                    <p className='type--copy-small'>
                        Spacings can be stacked in combinations (i.e. 50+20=70)
                    </p>
                </div>
            </div>
        );
    }

    public renderLayoutSection() {
        const gridDemoClassNames = cx({
            'grid__section': true,
            'demo__grid': true,
            'demo__grid--wlines': this.props.inputStates.showGridLines
        });
        return (
            <div className='grid__section'>
                <div className='grid__container grid--x-bookend'>
                    <div className='grid__item grid__item--stack'>
                        <h1 className='demo__title type--copy-large'>Sections</h1>
                        <p className='type--copy-small'>
                            Grid sections are full-width elements that are useful for layouts that
                            contain things like hero images or full-width headers / footers.
                        </p>
                        <p className='type--copy-small'>
                            Sections are not restrained by a max-width property and will take up the
                            full width of its parent. Sections are best placed to house containers
                            and items within the body. As you might expect, sections that are nested
                            within sections will also take up the full-width.
                        </p>
                    </div>
                </div>
                <hr className='divider divider--section' />
                <div className='grid__section'>
                    <div className='grid__item demo__section demo__element'>
                        <div className='grid__section demo__color--gray-30'>
                            <div className='grid__item grid--x-center'>
                                section
                            </div>
                            <div className='grid__section demo__color--gray-30'>
                                <div className='grid__item grid--x-center'>
                                    section
                                </div>
                            </div>
                        </div>
                        <div className='grid__section demo__color--gray-30'>
                            <div className='grid__item grid--x-center'>
                                section
                            </div>
                            <div className='grid__container demo__color--blue-30'>
                                <div className='grid__item grid--x-center'>
                                    container
                                </div>
                            </div>
                        </div>
                        <div className='grid__section demo__color--gray-30'>
                            <div className='grid__item grid--x-center'>
                                section
                            </div>
                            <div className='grid__item--fluid grid--x-center demo__color--blue-30'>
                                item
                            </div>
                            <div className='grid__item--fluid grid--x-center demo__color--blue-30'>
                                item
                            </div>
                            <div className='grid__item--fluid grid--x-center demo__color--blue-30'>
                                item
                            </div>
                            <div className='grid__item--fluid grid--x-center demo__color--blue-30'>
                                item
                            </div>
                        </div>
                    </div>
                </div>
                <hr className='divider divider--section' />
                <div className='grid__container grid--x-bookend'>
                    <div className='grid__item grid__item--stack'>
                        <h1 className='demo__title type--copy-large'>Containers</h1>
                        <p className='type--copy-small'>
                            Grid containers multipurpose elements that can either be restricted to a
                            max width or they can take up the full width of a parent. Containers are
                            somewhat analogous to "rows." They're useful for content blocks, assets,
                            and parts of a page that should be kept within a certain width.
                        </p>
                        <p className='type--copy-small'>
                           Containers can be nested inside items where they'll take up the full
                           width of that item. Sections that are housed within containers are now
                           restrained to the max width of that container.
                        </p>
                    </div>
                </div>
                <hr className='divider divider--section' />
                <div className='grid__section'>
                    <div className='grid__item demo__section demo__element'>
                        <div className='grid__container demo__color--blue-30'>
                            <div className='grid__item grid--x-center'>
                                container
                            </div>
                            <div className='grid__section demo__color--gray-30'>
                                <div className='grid__item grid--x-center'>
                                    section
                                </div>
                            </div>
                        </div>
                        <div className='grid__container demo__color--blue-30'>
                            <div className='grid__item grid--x-center'>
                                container
                            </div>
                            <div className='grid__container demo__color--blue-30'>
                                <div className='grid__item grid--x-center'>
                                    container
                                </div>
                            </div>
                        </div>
                        <div className='grid__container demo__color--blue-30'>
                            <div className='grid__item grid--x-center'>
                                container
                            </div>
                            <div className='grid__item--fluid grid--x-center demo__color--blue-30'>
                                item
                            </div>
                            <div className='grid__item--fluid grid--x-center demo__color--blue-30'>
                                item
                            </div>
                            <div className='grid__item--fluid grid--x-center demo__color--blue-30'>
                                item
                            </div>
                            <div className='grid__item--fluid grid--x-center demo__color--blue-30'>
                                item
                            </div>
                        </div>
                    </div>
                </div>
                <hr className='divider divider--section' />
                <div className='grid__container grid--x-bookend'>
                    <div className='grid__item grid__item--medium--1-2 demo__section demo__element'>
                        <div className='grid__container demo__color--blue-30'>
                            <div className='grid__item grid--x-center'>
                                container
                            </div>
                            <div className='grid__item grid__item--border grid--x-center demo__color--blue-30'>
                                item
                            </div>
                            <div className='grid__item grid__item--border grid--x-center demo__color--blue-30'>
                                item
                            </div>
                            <div className='grid__item grid__item--border grid--x-center demo__color--blue-30'>
                                item
                            </div>
                        </div>
                        <div className='grid__container grid--x-bookend demo__color--blue-30'>
                            <div className='grid__item grid--x-center'>
                                container
                            </div>
                            <div className='grid__item grid__item--border grid__item--1-4 grid--x-center demo__color--blue-30'>
                                item (1 / 4)
                            </div>
                            <div className='grid__item grid__item--border grid__item--1-4 grid--x-center demo__color--blue-30'>
                                item (1 / 4)
                            </div>
                            <div className='grid__item grid__item--border grid__item--1-4 grid--x-center demo__color--blue-30'>
                                item (1 / 4)
                            </div>
                        </div>
                        <div className='grid__container grid--x-bookend demo__color--blue-30'>
                            <div className='grid__item grid--x-center'>
                                container
                            </div>
                            <div className='grid__item--shrink grid--x-center demo__color--blue-30'>
                                items
                            </div>
                            <div className='grid__item--shrink grid--x-center demo__color--blue-30'>
                                that
                            </div>
                            <div className='grid__item--shrink grid--x-center demo__color--blue-30'>
                                shrink
                            </div>
                        </div>
                        <div className='grid__container grid--x-bookend demo__color--blue-30'>
                            <div className='grid__item grid--x-center'>
                                container
                            </div>
                            <div className='grid__item--fluid grid--x-center demo__color--blue-30'>
                                items
                            </div>
                            <div className='grid__item--fluid grid--x-center demo__color--blue-30'>
                                that
                            </div>
                            <div className='grid__item--fluid grid--x-center demo__color--blue-30'>
                                are
                            </div>
                            <div className='grid__item--fluid grid--x-center demo__color--blue-30'>
                                fluid
                            </div>
                        </div>
                        <div className='grid__container grid--x-bookend demo__color--blue-30'>
                            <div className='grid__item grid--x-center'>
                                container
                            </div>
                            <div className='grid__item grid__item--border grid__item--1-4 grid__item--large--1-2 grid--x-center demo__color--blue-30'>
                                item: small (1 / 4), large (1 / 2)
                            </div>
                            <div className='grid__item grid__item--border grid__item--1-4 grid--x-center demo__color--blue-30'>
                                item: small (1 / 4)
                            </div>
                        </div>
                    </div>
                    <div className='grid__item grid__item--medium--5-12 grid__item--stack'>
                        <h1 className='demo__title type--copy-large'>Items</h1>
                        <p className='type--copy-small'>
                            Grid items are the basic building blocks. Items have a few different
                            ways of knowing how to take up space. By default, items take up the full
                            width of its container. This is in the spirit of mobile-first
                            development, so that things stack automatically.
                        </p>
                        <p className='type--copy-small'>
                            Items can also take up a specific width depending on a relative number
                            of units it takes up on the grid's total number of columns available. So
                            for example, the default number of columns that are rendered with our
                            grid is 24. This means that any fraction of 24 is available as a
                            relative width for an item to take up. To avoid repeated classes,
                            fractions are also reduced to their lowest value. So if you'd want
                            12-24, you'd instead go with 1-2.
                        </p>
                        <p className='type--copy-small'>
                            Items can also take on a few special behaviors. The modifier '--shrink'
                            will have an item only take up the amount of space its containing
                            content needs. The modifier '--fluid' will have an item split up the
                            space of a container evenly with other 'fluid' items. So if you had 5
                            items with 'item--fluid,' they'd each take up 1/5 of the container. The
                            modifier '--expand' will (similarly to the default behavior) have an
                            item take up the
                            entire width of a container.
                        </p>
                        <p className='type--copy-small'>
                            Each of these item behaviors also have an associated breakpoint
                            depending on the breakpoint names you declare. For example, and item
                            that has the classes, 'item item--1-4 item--medium--1-2 item--large--
                            expand' will take up 25% of the container until a medium breakpoint,
                            then it'll switch to 50% until it hits large, which it will then take up
                            100% of its container. Note that fluid items DO NOT automatically stack
                            on mobile.
                        </p>
                    </div>
                </div>
                <hr className='divider divider--section' />
                <div className='grid__container'>
                    <div className='grid__item grid__item--stack'>
                        <h1 className='demo__title type--copy-large'>Desktop Grid</h1>
                        <ArborCheckboxInput
                            labelClassName='demo__element__input'
                            labelText='Show grid lines'
                            name='showGridLines'
                            checked={this.props.inputStates.showGridLines}
                            onClick={this.props.toggleCheckbox}
                        />
                    </div>
                    <div className={gridDemoClassNames}>
                        {this.renderGridLines()}
                        <div className='grid__container grid__container--p-large grid--x-bookend'>
                            {this.blockMassProduction(5, '1-6')}
                        </div>
                        <div className='grid__container grid__container--p-large grid--x-bookend'>
                            {this.blockMassProduction(4, '5-24')}
                        </div>
                        <div className='grid__container grid__container--p-large grid--x-bookend'>
                            {this.blockMassProduction(3, '7-24')}
                        </div>
                        <div className='grid__container grid__container--p-large grid--x-bookend'>
                            <div className='grid__item grid__item--tall grid__item--3-8'>
                            </div>
                            <div className='grid__item grid__item--tall grid__item--13-24'>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    public render () {

        return (
            <div className='grid__section'>
                <div className='grid__container'>
                    <div className='grid__item grid__item--stack'>
                        <h1 className='type--title-1'>Grid and layout</h1>
                        <p className='type--copy-standard'>
                            Thew new grid system was created from the group up to allow for maximum
                            design flexiblity with a 24 column grid. We also follow a mobile first
                            development conventions, to allow us start with simple stacked mobile
                            layouts, easly build up to more complex layout on larger breakpoints.
                            The goal was to create a system that cleanly expresses layout intent
                            with clearly defined classes.
                        </p>
                    </div>
                </div>
                <ArborTabs
                    tabArray={this.props.tabArray}
                    onTabClick={this.props.onTabClick}
                    subNavKey='layout'
                    activeTabIndex={this.props.subNavStates.layout}>
                    {this.renderLayoutSection()}
                    {this.renderSpacingSection()}
                    {this.renderDividerSection()}
                    {this.renderGridBuilderSection()}
                    {this.renderAlignmentBuilderSection()}
                </ArborTabs>
            </div>
        );
    }
}
