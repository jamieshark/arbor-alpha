import React = require('external/react');

interface ArborOverviewPageProps extends React.Props<ArborOverviewPage> {
    navArray: any;
}

export class ArborOverviewPage extends React.Component<ArborOverviewPageProps, any> {
    public render () {
        return (
            <div className='grid__section'>
                <div className='grid__container'>
                    <div className='grid__item'>
                        <h1 className='type--title-1'>🌲 Arbor 1.0.0‑alpha</h1>
                        <h2 className='type--title-3'>
                            Marketing Pattern Library and Scss Framework
                        </h2>
                    </div>
                    <hr className="divider" />
                    <div className='grid__item'>
                         <article className="demo__element">
                            <h3 className='demo__title type--title-2'>Designers</h3>
                            <p className="type--copy-standard">
                                Arbor was designed by and for designers to allow for more dynamic
                                layouts for our marketing and growth pages. It also adhers closely
                                our our brand guidelines to ensure consistency in typography and
                                color pallets.
                            </p>
                         </article>
                    </div>
                    <hr className="divider" />
                    <div className='grid__item'>
                         <article className="demo__element">
                            <h3 className='demo__title type--title-2'>Developers</h3>
                            <p className="type--copy-standard">
                                Arbor was built with Modularity and flexiblty in mind. As a Sass
                                framework, mixins and variables allow developers to customize every
                                aspect of the CSS output. Importing `arbor/core` generated zero
                                lines of CSS, while each mixin can be fully customized, from the
                                class names to avoid collisions, to the indivdual settings to allow
                                for customizations.
                            </p>
                         </article>
                    </div>
                    <hr className="divider" />
                </div>
            </div>
        );
    }
}
